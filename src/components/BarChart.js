import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
      datacollection: {
        labels: ["Cereal Prawn", "Dry Beef Hor Fun", "Mapo Tofu", "Pork Fried Rice", "Prawn omelette", "Sambal KangKung"],
        datasets: [{
          label: "Total Number of each dish",
          backgroundColor: ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo"],
          data: [0, 0, 0, 0, 0, 0]
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total Number of each dish"
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
          var counter = 0
          for (var food of this.datacollection.labels) {
            this.datacollection.datasets[0].data[counter] = this.datacollection.datasets[0].data[counter] + Number((doc.data()[food]))
            counter += 1
          }
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created() {
    this.fetchItems()
  }
}