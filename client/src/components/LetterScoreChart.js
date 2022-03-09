import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto'
import { Bar } from "react-chartjs-2";

function LetterScoreChart({user,data}){
console.log(data)
  function convertAnalytics(data){
    let analytics = {
      labels: ['2', '3', '4','5','6','7','8','9'],
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [
          {
            label: "% of today's users with this score",
            data: [],
            // you can set indiviual colors for each bar
            backgroundColor: [
              "#35D801",
              "#35D801",
              "#35D801",
              "#35D801",
              "#35D801",
              "#35D801",
              "#35D801",
              "#35D801",
            ],
            borderWidth: 1,
          }
      ]
}
    let userScore = parseInt(data.userScore)
    let index = userScore - 2
    analytics.datasets[0].backgroundColor[index] = "#E1f35a"
    analytics.datasets[0].data.push((data.two / data.total) * 100)
    analytics.datasets[0].data.push((data.three / data.total) * 100)
    analytics.datasets[0].data.push((data.four / data.total) * 100)
    analytics.datasets[0].data.push((data.five / data.total) * 100)
    analytics.datasets[0].data.push((data.six / data.total) * 100)
    analytics.datasets[0].data.push((data.seven / data.total) * 100)
    analytics.datasets[0].data.push((data.eight / data.total) * 100)
    analytics.datasets[0].data.push((data.nine / data.total) * 100)
    return analytics
  }

      return (
        <div xs={12} lg={6}>
          <Bar responsive="true" xs={12} lg={6}
            data={convertAnalytics(data)}
            options={{
                // indexAxis: 'y',
              plugins: {
                title: {
                  display: false,
                  text: "User Scores"
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

export default LetterScoreChart