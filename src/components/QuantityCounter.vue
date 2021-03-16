<template>
  <div>
    <button id="qtyButton" v-on:click="decrease()">-</button>
    <span style="font-weight: 500px; font-size: 40px; vertical-align: middle">
      {{ counter }}
    </span>
    <button id="qtyButton" v-on:click="increase()">+</button>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increase: function () {
      if (this.counter < 10) {
        this.counter += 1;
      } else {
        alert("You cannot buy more than 10 items.");
      }
      this.$emit("counter", this.item, this.counter);
    },
    decrease: function () {
      if (this.counter > 0) {
        this.counter -= 1;
      }
      this.$emit("counter", this.item, this.counter);
    },
  },
};
</script>

<style scoped>
#qtyButton {
  border-radius: 10px;
  background-color: rgb(246, 213, 247);
  border-width: thin;
  font-weight: 300px;
  font-size: 23px;
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>
