/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
    
    //check to see if topic for today already exist with date
    var theFirebaseURL = "https://g1t5-assignment-3.firebaseio.com/";
        var ref = new Firebase(theFirebaseURL);
        
        var recTopics = [];
        
        var dailyPostRef = ref.child("recTopic");
        
        var currentDateTime = new Date();
        
        var currentDateTimeStr = currentDateTime.toString();
        var nextDay = true;
        
        dailyPostRef.once("value", function(snapshot) {
        // The callback function will get called twice, once for "fred" and once for "barney"
        snapshot.forEach(function(childSnapshot) {
          // retrieve key
          var key = childSnapshot.key();
          
          // retrieve child data
          var childData = childSnapshot.val();
          
          //Sat Apr 02 2016
          var compareNow = currentDateTimeStr.substring(0, 15);
          var compareValueDate = childData.topicDateTime.substring(0, 15);
          
          if (compareNow === compareValueDate) {
              nextDay = false;
          }
          
          //console.log("child: " +childData.title);
          recTopics.push(childData.title);
          
            });
            
            console.log("size of recTopic: " +recTopics.length);
            console.log("next day?: " +nextDay);
            
            if (recTopics.length === 0) { //if length is empty (no data in db) or if the time exceeds 24hrs, do a new API call and push data in
            
            var theUrl = "https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=baa9272617b53fc371a5f2fe7bf8eab374e48b2a&outputMode=json&start=now-24h&end=now&return=enriched.url.title&maxResults=3&q.enriched.url.docSentiment.type=negative&q.enriched.url.docSentiment.score=%3C=0.5&q.enriched.url.title=singapore";

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = ProcessRequest;
            xmlHttp.open( "GET", theUrl, true );
            xmlHttp.send( null );

            function ProcessRequest() 
            {
                if ( xmlHttp.readyState === 4 && xmlHttp.status === 200 ) 
                {
                    if ( xmlHttp.responseText === "ERROR" ) 
                    {
                        console.log(xmlHttp.responseText);
                    }
                    else
                    {
                        
                        var info = JSON.parse(xmlHttp.responseText);
                        
                        console.log("status " +info.status);

                        console.log("Test output" +info.result.docs[0].source.enriched.url.title);
                        console.log("Test output" +info.result.docs[1].source.enriched.url.title);
                        console.log("Test output" +info.result.docs[2].source.enriched.url.title);

                        //bind data to html     
                        document.getElementById("recom1").innerHTML = info.result.docs[0].source.enriched.url.title;
                        document.getElementById("recom2").innerHTML = info.result.docs[1].source.enriched.url.title;
                        document.getElementById("recom3").innerHTML = info.result.docs[2].source.enriched.url.title;
                        
                        var newDailyPostRef = ref.child("recTopic");
                        
                        newDailyPostRef.remove();
                        
                        var todayDate = new Date();
                        var dateStr = todayDate.toString();
                        
                        newDailyPostRef.push().set({
                            title: info.result.docs[0].source.enriched.url.title,
                            topicDateTime: dateStr
                          });
                          
                        newDailyPostRef.push().set({
                            title: info.result.docs[1].source.enriched.url.title,
                            topicDateTime: dateStr
                          });
                          
                        newDailyPostRef.push().set({
                            title: info.result.docs[2].source.enriched.url.title,
                            topicDateTime: dateStr
                          });

                    }
                }
            }
            
        } else {
            
            //bind data to html     
            document.getElementById("recom1").innerHTML = recTopics[0];
            document.getElementById("recom2").innerHTML = recTopics[1];
            document.getElementById("recom3").innerHTML = recTopics[2];
            
        }
            
        });
        
        $('#postTopic').click(function(){
            
            var topic = $("#topic-text").val();
            
            var d = new Date();
            var date = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
            
            var topicRef = ref.child("topics");
            
            topicRef.push().set({
                title: topic,
                dateTime: date
              });
            
        });

});


