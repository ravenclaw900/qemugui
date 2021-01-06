<template>
  <ActionBar />
  <VMList />
  <SettingsPane />
</template>

<script>
import VMList from "@/components/VMList.vue";
import SettingsPane from "@/components/SettingsPane.vue";
import ActionBar from "@/components/ActionBar.vue";
import data from "store";

console.log(data);

export default {
  components: {
    VMList,
    SettingsPane,
    ActionBar,
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
  overflow: hidden;
  font-family: sans-serif;
}
.floatChild {
  height: 92%;
  float: left;
}
a {
  display: inline-block;
  cursor: default;
  color: black;
  text-decoration: none;
}
.slider {
  appearance: none;
  background: rgb(185, 185, 185);
  height: 3px;
  outline: none;
  width: 80%;
  &::-webkit-slider-thumb {
    appearance: none;
    background-color: white;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 1px solid rgb(201, 201, 201);
    &:active {
      background-color: rgb(240, 240, 240);
    }
  }
}
.sliderBox {
  width: 10%;
}
form {
  width: 100%;
  text-align: center;
}
ul {
  list-style: none;
}
</style>
