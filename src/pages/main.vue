<template>
  <h3>Welcome to the QEMU GUI</h3>
  <p>
    The left part of the application window lists all created virtual machines.
    You can start virtual machines by double-clicking on them. You can create
    and manipulate VMs using the corresponding toolbar buttons.
  </p>
  <span id="installed" v-if="seen">
    QEMU does not seem to be installed. Please install it.
  </span>
</template>

<script lang="ts">
import { exec } from "child_process";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      seen: false,
    };
  },
  created() {
    exec("which -s qemu-system-x86_64").on("exit", (code) => {
      if (code !== 0) {
        this.seen = true;
      }
    });
  },
});
</script>

<style scoped>
h3,
p {
  user-select: none;
}
#installed {
  font-size: small;
  color: gray;
}
</style>
