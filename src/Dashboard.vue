<template>
  <div>
    <ul id="routes">
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
      <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <h2> Charts </h2>
    <h1>Bar Chart</h1>
    <bar-chart></bar-chart>
    <h1>Line Chart</h1>
    <call-api></call-api>
  </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";
import CallAPI from "./components/CallAPI.vue"
export default {
  components: {
    "bar-chart": BarChart,
    "call-api": CallAPI
  },
};
</script>

<style scoped>
#routes {
  width: 100%;
  max-width: 100%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
h1 {
    font-size: 60px;
    background-color: rgb(124, 67, 44);
    color:rgb(224, 218, 209);
    text-align: center;
}
</style>