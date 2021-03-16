<template>
  <div>
    <p style="font-size: 25px; font-weight: bold">Menu:</p>
    <ul>
      <li v-for="item in itemsSelected" v-bind:key="item.index">
        <p>{{ item[0] }} x {{ item[1] }}</p>
      </li>
    </ul>
    <button
      class="totButton"
      v-on:click="
        findTotal();
        sendOrder();
      "
    >
      Calculate Total
    </button>
    <p class="totals" v-show="showTotals">Subtotal: ${{ subtotal }}</p>
    <p class="totals" v-show="showTotals">Grand Total: ${{ findGrandTotal }}</p>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  props: {
    itemsSelected: {
      type: Array,
    },
  },
  data() {
    return {
      subtotal: 0,
      grandTotal: 0,
      showTotals: false,
    };
  },
  methods: {
    findTotal: function () {
      var item;
      var currTot = 0;
      for (item of this.itemsSelected) {
        currTot += item[1] * item[2];
      }
      this.subtotal = currTot;
      this.showTotals = !this.showTotals;
    },
    sendOrder: function () {
      var item;
      var prawnOmelette = 0;
      var beef = 0;
      var sambal = 0;
      var porkRice = 0;
      var mapo = 0;
      var cereal = 0;
      for (item of this.itemsSelected) {
        console.log(item[0])
        var nameItem = item[0]
        var quantity = item[1]
        if (nameItem == "Prawn omelette") {
          prawnOmelette += quantity;
        } else if (nameItem == "Dry Beef Hor Fun") {
          beef += quantity;
        } else if (nameItem == "Sambal KangKung") {
          sambal += quantity;
        } else if (nameItem == "Pork Fried Rice") {
          porkRice += quantity;
        } else if (nameItem == "Mapo Tofu") {
          mapo += quantity;
        } else if (nameItem == "Cereal Prawn") {
          cereal += quantity;
        }
      }
      database
        .collection("orders")
        .add({
          "Prawn omelette": Number(prawnOmelette),
          "Dry Beef Hor Fun": Number(beef),
          "Sambal KangKung": Number(sambal),
          "Pork Fried Rice": Number(porkRice),
          "Mapo Tofu": Number(mapo),
          "Cereal Prawn": Number(cereal),
        })
        .then(() => {
          location.reload();
        });
    },
  },
  computed: {
    findGrandTotal: function () {
      return (this.subtotal * 1.07).toFixed(2);
    },
  },
};
</script>

<style scoped>
.totButton {
  border-radius: 10px;
  background-color: rgb(246, 213, 247);
  border-width: thin;
}

ul {
  font-size: 23px;
}

.totals {
  font-size: 25px;
  font-weight: bold;
}
button {
  font-size: 18px;
}
</style>