<template>
  <div>
    <ul id="routes">
    <li> <router-link to="/" exact>Home</router-link> </li>
    <li><router-link to="/orders" exact>Orders</router-link></li>
    <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <ul id="itemsList">
      <li v-for="item in items" v-bind:key="item.id">
        <h3 class="itemName">{{ item.name }}</h3>
        <img v-bind:src="item.imageURL" />
        <p id="price">${{ item.price }}</p>
        <qtyCounter v-on:counter="onCounter" v-bind:item="item"></qtyCounter>
      </li>
    </ul>
    <basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></basket>
  </div>
</template>


<script>
import QuantityCounter from "./QuantityCounter.vue";
import Basket from "./Basket.vue";
import database from "../firebase.js";

export default {
  data() {
    return {
      itemsSelected: [],
      items: [],
    };
  },
  components: {
    qtyCounter: QuantityCounter,
    basket: Basket,
  },
  methods: {
    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          if (item_name == item.name && count > 0) {
            this.itemsSelected.splice(i, 1);
            this.itemsSelected.push([item.name, count, item.price]);
          } else if (item_name == item.name && count == 0) {
            this.itemsSelected.splice(i, 1);
          } else if (
            item_name != item.name &&
            i == this.itemsSelected.length - 1
          ) {
            this.itemsSelected.push([item.name, 1, item.price]);
          }
        }
      }
    },
    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.items.push(doc.data());
          });
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>