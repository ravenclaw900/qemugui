<template>
  <div id="imgContainer">
    <table id="imgTable">
      <thead>
        <tr>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file, index) in known" :key="index">
          <td @click="item = index" :class="index === item ? 'active' : ''">
            {{ baseName(file) }}
            <span class="path">{{ file }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class="buttonBar" @click="create = true">Create</button>
  <button class="buttonBar" @click="addDisk">Add</button>
  <button class="buttonBar" @click="refreshTable">Refresh</button>
  <div id="imgData">
    <template v-if="create">
      <form @submit.prevent="handleSubmit">
        <VMSetupForm header="File Location">
          <input type="text" v-model="file" class="longWidth" />
          <img
            src="@/assets/directory.png"
            id="fileSelect"
            @click="selectDir"
          />
        </VMSetupForm>
        <VMSetupForm header="File Size">
          <input
            type="range"
            min="1"
            max="1000"
            v-model.number="createSize"
            class="slider"
          />
          <input
            type="number"
            v-model.number="createSize"
            id="sizeBox"
            name="memory"
          />
          <label for="memory">GB</label>
        </VMSetupForm>
        <VMSetupForm header="Hard Disk File Type">
          <select v-model="createType" class="longWidth">
            <option value="qcow2">QEMU Copy-On-Write disk</option>
            <option value="raw">Raw Disk Image</option>
          </select>
        </VMSetupForm>
        <VMSetupForm header="For VM">
          <select v-model="createVM" class="longWidth">
            <option value="none">None</option>
            <option
              v-for="(item, index) in avalibleVM"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </VMSetupForm>
        <input type="submit" value="Create" />
      </form>
    </template>
    <template v-else>
      <label for="type">Type: </label>
      <select name="type" v-model="type" class="longWidth">
        <option value="qcow2">QEMU Copy-On-Write disk</option>
        <option value="raw">Raw Disk Image</option>
        <option value="other" disabled>Other</option>
      </select>
      <label for="location">Location: </label>
      <input type="text" name="location" v-model="location" class="longWidth" />
      <label for="size">Size: </label>
      <input
        type="range"
        min="1"
        max="1000"
        v-model.number="size"
        class="slider"
        name="size"
      />
      <input
        type="number"
        v-model.number="size"
        class="sliderBox"
        name="memory"
      />
      <label for="memory">GB</label>
      <p>
        Shrinking an image will delete all data beyond the shrunken image's end.
        Before performing such an operation, make sure there is no important
        data there.
      </p>
      <ul>
        <li>{{ virtualSize }}</li>
        <li>{{ actualSize }}</li>
      </ul>
      <label for="forVM">For: </label>
      <select v-model="vm" name="forVM" class="longWidth">
        <option value="none">None</option>
        <option v-for="(item, index) in avalibleVM" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { join, basename, dirname, extname } from "path";
import { glob } from "glob";
import { exec } from "child_process";
import { ensureDir, move, appendFile } from "fs-extra";
import { open, save } from "tauri/api/dialog";
import data from "store";

import VMSetupForm from "@/components/VMSetupForm.vue";

export default defineComponent({
  data() {
    return {
      known: [] as string[],
      knownOther: [] as string[],
      item: -1,
      vm: "none",
      info: {
        "virtual-size": 0,
        format: "",
        "actual-size": 0,
      },
      create: false,
      file: "~/Documents/QEMU/NewVirtualDisk.qcow2",
      createSize: 2,
      createType: "qcow2",
      createVM: "none",
    };
  },
  components: {
    VMSetupForm,
  },
  methods: {
    refreshTable() {
      glob(join("~/Documents/QEMU/**/*.+(qcow2|img)"), (err, files) => {
        this.known = this.knownOther.concat(files);
      });
    },
    baseName(file: string) {
      return basename(file);
    },
    addDisk() {
      open({
        filter: "qcow2;img;cloop;cow;dmg;nbd;hdd;qcow;qed;vdi;vhdx;vmdk;vvfat",
      }).then((val) => {
        this.knownOther.push(val as string);
        this.refreshTable();
      });
    },
    selectDir() {
      save().then((val) => (this.file = val));
    },
    handleSubmit() {
      ensureDir(dirname(this.file));
      exec(
        `qemu-img create ${this.file} -f ${this.createType} ${this.createSize}G`,
        (err) => console.warn(err)
      );
      if (this.createVM !== "none") {
        data.set(`${this.createVM}.disk`, this.file);
        data.set(`${this.createVM}.format`, this.info.format);
        data.set(`${this.createVM}.size`, this.info["virtual-size"]);
        appendFile(
          join("~/Documents/QEMU", this.createVM, "run"),
          ` -hda ${this.file}`
        );
      }
      this.$router.push("/");
    },
  },
  computed: {
    avalibleVM() {
      const avalibleList: string[] = [];
      data.each((element) => {
        const item = element[1];
        if (!("disk" in item)) {
          avalibleList.push(element[0]);
        }
      });
      return avalibleList;
    },
    location: {
      get(): string {
        return this.known[this.item];
      },
      set(val: string) {
        ensureDir(dirname(val));
        if (this.knownOther.includes(this.known[this.item])) {
          this.knownOther[this.item] = val;
        }
        move(this.known[this.item], val, () => this.refreshTable());
      },
    },
    type: {
      get(): string {
        if (this.info.format === "qcow2" || this.info.format === "raw") {
          return this.info.format;
        } else {
          return "other";
        }
      },
      set(val: string) {
        if (val === "raw") {
          exec(
            `qemu-img convert -O raw ${this.location} ${this.location}`,
            () =>
              (this.location = this.location.replace(
                extname(this.location),
                ".img"
              ))
          );
        } else if (val === "qcow2") {
          exec(
            `qemu-img convert -O qcow2 ${this.location} ${this.location}`,
            () =>
              (this.location = this.location.replace(
                extname(this.location),
                ".qcow2"
              ))
          );
        }
      },
    },
    size: {
      get(): number {
        return this.info["virtual-size"] / 1024 / 1024 / 1024;
      },
      set(val: number) {
        let shrink = " ";
        if (val < this.info["virtual-size"]) {
          shrink = " --shrink ";
        }
        exec(
          `qemu-img resize${shrink}${this.location} ${val}`,
          () => (this.info["virtual-size"] = val)
        );
      },
    },
    virtualSize(): string {
      return `Virtual Size: ${this.info["virtual-size"]} (${
        this.info["virtual-size"] / 1024 / 1024 / 1024
      } GiB)`;
    },
    actualSize(): string {
      return `Actual Size: ${this.info["actual-size"]} (${
        Math.round((this.info["actual-size"] / 1024 / 1024 / 1024) * 100) / 100
      } GiB)`;
    },
  },
  watch: {
    createType(val, oldVal) {
      if (val === "qcow2") {
        this.file = this.file.replace(".img", ".qcow2");
      } else if (val === "raw") {
        this.file = this.file.replace(".qcow2", ".img");
      }
    },
    createVM(val, oldVal) {
      const fileName = basename(this.file);
      this.file = join("~/Documents/QEMU", val, fileName);
    },
    vm(val, oldVal) {
      if (this.knownOther.includes(this.location)) {
        this.knownOther.splice(this.item, 1);
      }
      const fileName = basename(this.location);
      this.location = join("~/Documents/QEMU", val, fileName);
      if (val !== "none") {
        data.set(`${val}.disk`, this.file);
        data.set(`${val}.format`, this.info.format);
        data.set(`${val}.size`, this.info["virtual-size"]);
        appendFile(
          join("~/Documents/QEMU", val, "run"),
          ` -hda ${this.location} -boot h`
        );
      }
    },
    location(val, oldVal) {
      exec(`qemu-img info ${val} --output json`, (err, stdout) => {
        this.info = JSON.parse(stdout);
      });
    },
  },
  created() {
    this.refreshTable();
  },
});
</script>

<style lang="scss" scoped>
#imgContainer {
  height: 50%;
  width: 100%;
  overflow-y: auto;
}
#imgTable {
  width: 98%;
  border-collapse: collapse;
  margin: auto;
  border: 1px solid rgb(188, 188, 188);
  overflow-x: auto;
  thead {
    background-color: rgb(246, 246, 246);
    font-size: smaller;
  }
  tbody {
    tr {
      td {
        &.active {
          background-color: rgb(217, 217, 217);
        }
      }
      &:nth-child(odd) {
        background-color: white;
      }
      &:nth-child(even) {
        background-color: rgb(217, 220, 226);
      }
    }
  }
}
#imgData {
  width: 100%;
  height: 45%;
  overflow: auto;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  * {
    margin-top: 20px;
  }
}
.path {
  font-size: x-small;
  color: gray;
}
.buttonBar {
  margin-bottom: -25px;
  z-index: 1;
}
.longWidth {
  width: 90%;
}
#fileSelect {
  width: 25px;
  margin-left: 10px;
  margin-bottom: -4px;
  &:active {
    opacity: 0.6;
  }
}
#sizeBox {
  width: 10%;
}
</style>
