<template>
  <div id="vmList" class="floatChild">
    <router-link
      v-for="(item, index) in tabs"
      :key="index"
      :to="`/info/${item}`"
      @dblclick="startVM(index)"
      class="vmItem"
    >
      <h2>{{ item }}</h2>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { execFile } from "child_process";
import { remote } from "electron";
import { join } from "path";
import { readFile, writeFile } from "fs-extra";
import Store from "electron-store";

const data = new Store({ watch: true });

export default defineComponent({
  data() {
    return {
      tabs: [] as string[]
    };
  },
  methods: {
    startVM(index: number) {
      const name = this.tabs[index];
      execFile(join(remote.app.getPath("documents"), "QEMU", name, "run"));
      if (data.has(`${name}.installer`)) {
        data.delete(`${name}.installer`);
        readFile(
          join(remote.app.getPath("documents"), "QEMU", name, "run"),
          (err, buf) => {
            const lines = buf.toString();
            const file = lines.split(" ");
            file.splice(file.indexOf("-cdrom"), 2);
            file[file.indexOf("-boot") + 1] = "c";
            writeFile(
              join(remote.app.getPath("documents"), "QEMU", name, "run"),
              file.join(" ")
            );
          }
        );
      }
    }
  },
  created() {
    this.tabs = [];
    for (const item of data) {
      this.tabs.push(item[0]);
    }
    data.onDidAnyChange(() => remote.getCurrentWindow().reload());
  }
});
</script>

<style lang="scss" scoped>
#vmList {
  background-color: rgb(224, 224, 224);
  width: 30%;
  overflow: auto;
}
.vmItem {
  background-color: rgb(248, 248, 248);
  height: 70px;
  width: 99.7%;
  padding-top: 10px;
  margin-bottom: 2px;
  &:hover {
    background-color: azure;
  }
  &.router-link-exact-active {
    background-color: rgb(200, 200, 200);
  }
}
</style>
