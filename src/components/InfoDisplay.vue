<template>
  <div class="VMInfoDiv">
    <div class="VMInfoHeader">
      <strong>{{ header }}</strong>
    </div>
    <ul>
      <slot />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    header: String
  }
};
</script>

<style lang="scss" scoped>
.VMInfoDiv,
.VMInfoHeader {
  background-color: rgb(250, 250, 250);
  width: 100%;
}
.VMInfoDiv {
  border-bottom: 1px solid rgb(224, 224, 224);
  text-align: left;
}
.VMInfoHeader {
  text-align: center;
  &:hover {
    background-color: rgb(228, 241, 255);
  }
}
</style>
