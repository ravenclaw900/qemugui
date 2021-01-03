<template>
  <form @submit.prevent="handleSubmit">
    <label for="vmList">Choose which VMs to delete:</label>
    <br />
    <label for="vmList"
      >This will delete the all scripts, virtual disks, and will remove the VM
      from the list</label
    >
    <ul name="vmList">
      <li v-for="(item, index) in names" :key="index">
        <input type="checkbox" :value="item" :name="item" v-model="checked" />
        <label :for="item">{{ item }}</label>
      </li>
    </ul>
    <input type="submit" value="Delete" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { remove } from "fs-extra";
import { join } from "path";
import { remote } from "electron";
import Store from "electron-store";

const data = new Store();

export default defineComponent({
  data() {
    return {
      checked: [] as string[]
    };
  },
  computed: {
    names() {
      const values: string[] = [];
      for (const item of data) {
        values.push(item[0]);
      }
      return values;
    }
  },
  methods: {
    handleSubmit() {
      for (const item of this.checked) {
        data.delete(item);
        remove(join(remote.app.getPath("documents"), "QEMU", item));
      }
      this.$router.push("/");
    }
  }
});
</script>
