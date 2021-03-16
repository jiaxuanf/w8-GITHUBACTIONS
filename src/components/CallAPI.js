import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    label: "west",
                    type: "line",
                    borderColor: "red",
                    data: [],
                    fill: false
                }, {
                    label: "national",
                    type: "line",
                    borderColor: "orange",
                    data: [],
                    fill: false
                }, {
                    label: "east",
                    type: "line",
                    borderColor: "yellow",
                    data: [],
                    fill: false
                }, {
                    label: "central",
                    type: "line",
                    borderColor: "green",
                    data: [],
                    fill: false
                }, {
                    label: "south",
                    type: "line",
                    borderColor: "blue",
                    data: [],
                    fill: false
                }, {
                    label: "north",
                    type: "line",
                    borderColor: "indigo",
                    data: [],
                    fill: false
                },
                ]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'PSI Twenty Four Hourly (By Region)'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function () {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
                .then(response => {
                    this.items = response.data.items
                    for (var item of this.items) {
                        this.timestamp = item["timestamp"]
                        this.datacollection.labels.push(this.timestamp)
                        this.results = item["readings"]['psi_twenty_four_hourly']
                        for (let key in this.results) {
                            if (key == "west") {
                                this.datacollection.datasets[0].data.push(this.results[key])
                            } else if (key == "national") {
                                this.datacollection.datasets[1].data.push(this.results[key])
                            } else if (key == "east") {
                                this.datacollection.datasets[2].data.push(this.results[key])
                            } else if (key == "central") {
                                this.datacollection.datasets[3].data.push(this.results[key])
                            } else if (key == "south") {
                                this.datacollection.datasets[4].data.push(this.results[key])
                            } else if (key == "north") {
                                this.datacollection.datasets[5].data.push(this.results[key])
                            }
                        }
                    }
                    this.renderChart(this.datacollection, this.options)
                })
        }
    },
    created() {
        this.fetchItems()
    }
}