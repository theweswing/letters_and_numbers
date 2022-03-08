import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto'
import { Bar } from "react-chartjs-2";

function LetterOriginalityChart({user,data}){

  function convertAnalytics(data){
    let analytics = {
      labels: [],
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [
          {
            label: "% of today's users with this word",
            data: [],
            // you can set indiviual colors for each bar
            backgroundColor: [
            //   "#35D801",
            ],
            borderWidth: 1,
          }
      ]
}
    let userWord = data.userAnswer
    let total = data.total
    let arr = []
    for (const [key,value] of Object.entries(data.talliedData)) {
        arr.push({word: key, pop: value})
    }
    console.log(arr)
    arr.sort((a,b) => comparePop(a,b))
    arr.forEach((entry) => {
        populateChart(arr,entry,analytics,total,userWord)
    })
    let userIndex = analytics.labels.find(word => word == userWord)
    let wordSaved = analytics.labels[userIndex]
    let popSaved = analytics.datasets[0].data[userIndex]
    analytics.labels =  analytics.labels.slice(0,5)
    analytics.datasets[0].data = analytics.datasets[0].data.slice(0,5)
    if(analytics.labels.includes(userWord) == false){
        analytics.labels.push(wordSaved)
        analytics.datasets[0].data.push(popSaved)
    }
    return analytics
  }

  function comparePop(a,b){
    if (a.pop < b.pop) {
        return 1;
      }
      if (a.pop > b.pop) {
        return -1;
      }
      // a must be equal to b
      return 0;
  }

  function populateChart(arr,entry,analytics,total,userWord){
      if (entry.word == userWord){
        analytics.labels.push(entry.word)
        analytics.datasets[0].data.push((entry.pop / total) *100)
        analytics.datasets[0].backgroundColor.push("#E1f35a")
      }
      if(entry.word != "overallAnswers" && entry.word != "blankInvalid" && entry.word != userWord){
        analytics.labels.push(entry.word)
        analytics.datasets[0].data.push((entry.pop / total) *100)
        analytics.datasets[0].backgroundColor.push("#35D801")
      }
  }

      return (
        <div xs={12} lg={6} width={100} height={100}>
          <Bar xs={12} lg={6}
            data={convertAnalytics(data)}
            options={{
                indexAxis: 'y',
              plugins: {
                title: {
                  display: true,
                  text: "Most Common Solutions"
                },
                legend: {
                  display: true,
                  position: "bottom"
               }
              }
            }}
          />
        </div>
      );
}

export default LetterOriginalityChart