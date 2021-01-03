<template>
  <span class="headerText">{{ header }}</span>
  <div class="vmSetupForm">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    header: String
  }
});
</script>

<style scoped>
.vmSetupForm {
  background-color: rgb(238, 238, 238);
  text-align: left;
  margin: auto;
  width: 90%;
  border-radius: 5px;
  border: 1px solid rgb(234, 234, 234);
  padding: 10px;
  font-size: medium;
}
.headerText {
  font-size: smaller;
  text-align: center;
  display: block;
}
</style>
