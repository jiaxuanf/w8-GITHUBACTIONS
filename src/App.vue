<template>
  <div>
    <h1>JX'S FIVE STARS RESTAURANT</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped>
h1 {
  color: purple;
  background-color: rgb(188, 194, 200);
  text-align: center;
}
router-link {
  flex-grow: 1;
  flex-basis: 700px;
  text-align: center;
  width: 100px;
  border: 1px solid #222;
  margin: 100px;
  padding-left: 200px;
  padding-right: 200px;
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
