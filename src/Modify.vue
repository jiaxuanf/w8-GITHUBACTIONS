<template>
  <div>
    <li v-for="(data,index) in datapacket" v-bind:key="data.index">
      {{ data[0] }} : {{ data[1] }}
      index is: {{index}}
      <br />
      <textarea
        placeholder="0"
        type="number"
        min="0"
        v-model="modifiedInput[index][1]"
      >
      </textarea>
    </li>
    <button v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import database from "./firebase.js";
export default {
  data() {
    return {
      datapacket: [],
      modifiedInput: [],
    };
  },
  components: {},
  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .doc(this.$route.params.docID)
        .get()
        .then((doc) => {
          this.datapacket.push(["Prawn omelette", doc.data()["Prawn omelette"]])
          this.datapacket.push(["Dry Beef Hor Fun", doc.data()["Dry Beef Hor Fun"]])
          this.datapacket.push(["Sambal KangKung", doc.data()["Sambal KangKung"]])
          this.datapacket.push(["Pork Fried Rice", doc.data()["Pork Fried Rice"]])
          this.datapacket.push(["Mapo Tofu", doc.data()["Mapo Tofu"]])
          this.datapacket.push(["Cereal Prawn", doc.data()["Cereal Prawn"]])
        });
      this.docId = this.$route.params.docID;
      console.log("data is: ");
      console.log(this.datapacket);
    },
    updateOrder: function () {
      database.collection("orders").doc(this.$route.params.docID).update({
        [this.modifiedInput[0][0]] : this.modifiedInput[0][1],
        [this.modifiedInput[1][0]] : this.modifiedInput[1][1],
        [this.modifiedInput[2][0]] : this.modifiedInput[2][1],
        [this.modifiedInput[3][0]] : this.modifiedInput[3][1],
        [this.modifiedInput[4][0]] : this.modifiedInput[4][1],
        [this.modifiedInput[5][0]] : this.modifiedInput[5][1]
      }).then(() => {this.$router.push({
            path: '/orders'})
        });
      
    },
  },
  created() {
    this.fetchItems();
    this.modifiedInput = this.datapacket;
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
button {
  width: 200px;
  height: 40px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  font-size: 20px;
}
</style>