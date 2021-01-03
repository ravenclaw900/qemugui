<template>
  <div id="actionBar">
    <router-link to="/new" class="actionItem">
      <img src="@/assets/new.png" />
      New
    </router-link>
    <router-link to="/image" class="actionItem">
      <img src="@/assets/image.png" />
      Images
    </router-link>
    <router-link to="/delete" class="actionItem">
      <img src="@/assets/delete.png" />
      Delete
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
#actionBar {
  background-color: rgb(212, 212, 212);
  height: 63px;
  display: flex;
  justify-content: space-around;
}
.actionItem {
  height: 100%;
  width: 60px;
  font-size: small;
  text-align: center;
  img {
    &:active {
      opacity: 0.6;
    }
  }
}
</style>
