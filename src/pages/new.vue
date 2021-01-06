<template>
  <form @submit.prevent="handleSubmit">
    <VMSetupForm header="Name and Operating System">
      <label for="name">Name:</label>
      <input
        type="text"
        v-model="name"
        className="page1"
        name="name"
        required
      />
      <label for="platform">Platform:</label>
      <select v-model="platform" className="page1" name="platform">
        <option value="x86">x86 (i386)</option>
        <option value="x86_64">x86_64 (amd64)</option>
        <option value="arm">ARM32 (armhf)</option>
        <option value="aarch64">ARM64 (aarch64)</option>
        <option value="ppc">PowerPC (ppc64el)</option>
      </select>
      <select v-model="machine" v-if="useARM" className="page1">
        <option value="akita">Sharp SL-C1000 (Akita) PDA (PXA270)</option>
        <option value="ast2500-evb">Aspeed AST2500 EVB (ARM1176)</option>
        <option value="ast2600-evb">Aspeed AST2600 EVB (Cortex A7)</option>
        <option value="borzoi">Sharp SL-C3100 (Borzoi) PDA (PXA270)</option>
        <option value="canon-a1100">Canon PowerShot A1100 IS</option>
        <option value="cheetah">
          Palm Tungsten|E aka. Cheetah PDA (OMAP310)
        </option>
        <option value="collie">Sharp SL-5500 (Collie) PDA (SA-1110)</option>
        <option value="connex">Gumstix Connex (PXA255)</option>
        <option value="cubieboard">cubietech cubieboard (Cortex-A8)</option>
        <option value="emcraft-sf2">
          SmartFusion2 SOM kit from Emcraft (M2S010)
        </option>
        <option value="highbank">Calxeda Highbank (ECX-1000)</option>
        <option value="imx25-pdk">ARM i.MX25 PDK board (ARM926)</option>
        <option value="integratorcp">ARM Integrator/CP (ARM926EJ-S)</option>
        <option value="kzm">ARM KZM Emulation Baseboard (ARM1136)</option>
        <option value="lm3s6965evb">Stellaris LM3S6965EVB</option>
        <option value="lm3s811evb">Stellaris LM3S811EVB</option>
        <option value="mainstone">Mainstone II (PXA27x)</option>
        <option value="mcimx6ul-evk">
          Freescale i.MX6UL Evaluation Kit (Cortex A7)
        </option>
        <option value="mcimx7d-sabre">
          Freescale i.MX7 DUAL SABRE (Cortex A7)
        </option>
        <option value="microbit">BBC micro:bit</option>
        <option value="midway">Calxeda Midway (ECX-2000)</option>
        <option value="mps2-an385">
          ARM MPS2 with AN385 FPGA image for Cortex-M3
        </option>
        <option value="mps2-an505">
          ARM MPS2 with AN505 FPGA image for Cortex-M33
        </option>
        <option value="mps2-an511">
          ARM MPS2 with AN511 DesignStart FPGA image for Cortex-M3
        </option>
        <option value="mps2-an521">
          ARM MPS2 with AN521 FPGA image for dual Cortex-M33
        </option>
        <option value="musca-a">ARM Musca-A board (dual Cortex-M33)</option>
        <option value="musca-b1">ARM Musca-B1 board (dual Cortex-M33)</option>
        <option value="musicpal">
          Marvell 88w8618 / MusicPal (ARM926EJ-S)
        </option>
        <option value="n800">Nokia N800 tablet aka. RX-34 (OMAP2420)</option>
        <option value="n810">Nokia N810 tablet aka. RX-44 (OMAP2420)</option>
        <option value="netduino2">Netduino 2 Machine</option>
        <option value="netduinoplus2">Netduino Plus 2 Machine</option>
        <option value="nuri">Samsung NURI board (Exynos4210)</option>
        <option value="orangepi-pc">Orange Pi PC</option>
        <option value="palmetto-bmc">
          OpenPOWER Palmetto BMC (ARM926EJ-S)
        </option>
        <option value="raspi2">Raspberry Pi 2B</option>
        <option value="realview-eb">
          ARM RealView Emulation Baseboard (ARM926EJ-S)
        </option>
        <option value="realview-eb-mpcore">
          ARM RealView Emulation Baseboard (ARM11MPCore)
        </option>
        <option value="realview-pb-a8">
          ARM RealView Platform Baseboard for Cortex-A8
        </option>
        <option value="realview-pbx-a9">
          ARM RealView Platform Baseboard Explore for Cortex-A9
        </option>
        <option value="romulus-bmc">OpenPOWER Romulus BMC (ARM1176)</option>
        <option value="sabrelite">
          Freescale i.MX6 Quad SABRE Lite Board (Cortex A9)
        </option>
        <option value="smdkc210">Samsung SMDKC210 board (Exynos4210)</option>
        <option value="sonorapass-bmc">OCP SonoraPass BMC (ARM1176)</option>
        <option value="spitz">Sharp SL-C3000 (Spitz) PDA (PXA270)</option>
        <option value="swift-bmc">OpenPOWER Swift BMC (ARM1176)</option>
        <option value="sx1">Siemens SX1 (OMAP310) V2</option>
        <option value="sx1-v1">Siemens SX1 (OMAP310) V1</option>
        <option value="tacoma-bmc">OpenPOWER Tacoma BMC (Cortex A7)</option>
        <option value="terrier">Sharp SL-C3200 (Terrier) PDA (PXA270)</option>
        <option value="tosa">Sharp SL-6000 (Tosa) PDA (PXA255)</option>
        <option value="verdex">Gumstix Verdex (PXA270)</option>
        <option value="versatileab">ARM Versatile/AB (ARM926EJ-S)</option>
        <option value="versatilepb">ARM Versatile/PB (ARM926EJ-S)</option>
        <option value="vexpress-a15">
          ARM Versatile Express for Cortex-A15
        </option>
        <option value="vexpress-a9">ARM Versatile Express for Cortex-A9</option>
        <option value="virt">Generic ARM Virtual Machine</option>
        <option value="witherspoon-bmc">
          OpenPOWER Witherspoon BMC (ARM1176)
        </option>
        <option value="xilinx-zynq-a9">
          Xilinx Zynq Platform Baseboard for Cortex-A9
        </option>
        <option value="z2">Zipit Z2 (PXA27x)</option>
        <template v-if="platform === 'aarch64'">
          <option value="raspi3">Raspberry Pi 3B</option>
          <option value="sbsa-ref">SBSA Reference ARM Virtual Machine</option>
          <option value="xlnx-versal-virt">
            Xilinx Versal Virtual development board
          </option>
          <option value="xlnx-zcu102">
            Xilinx ZynqMP ZCU102 board with 4xA53s and 2xR5Fs
          </option>
        </template>
      </select>
      <br />
      <label for="type">Type:</label>
      <select v-model="os" className="page1" name="type">
        <option value="Linux">Linux</option>
        <template v-if="platform === 'x86_64'">
          <option value="macOS">macOS</option>
          <option value="Windows (64-bit)">Windows</option>
        </template>
        <option value="Windows (32-bit)" v-if="platform === 'x86'">
          Windows
        </option>
        <option v-if="platform === 'ppc'" value="Mac OS X">Mac OS X</option>
      </select>
    </VMSetupForm>
    <VMSetupForm header="Memory Size">
      <input
        type="range"
        min="4"
        max="8192"
        v-model.number="memory"
        class="slider"
      />
      <input
        type="number"
        min="4"
        v-model.number="memory"
        class="sliderBox"
        name="memory"
      />
      <label for="memory">MB</label>
    </VMSetupForm>
    <VMSetupForm header="Hard Disk">
      <input
        type="radio"
        name="diskSelect"
        id="nodisk"
        value="nodisk"
        v-model="disk"
        required
      />
      <label for="nodisk">Do not add a virtual hard disk</label>
      <br />
      <input
        type="radio"
        name="diskSelect"
        id="installer"
        value="installer"
        v-model="disk"
        required
      />
      <label for="installer"
        >Boot off of an installer image and create a virtual hard disk</label
      >
      <br />
      <input
        type="radio"
        name="diskSelect"
        id="convert"
        value="convert"
        v-model="disk"
        required
      />
      <label for="convert">Convert a virtual hard disk</label>
      <br />
      <input
        type="radio"
        name="diskSelect"
        id="exist"
        value="exist"
        v-model="disk"
        required
      />
      <label for="exist">Use an existing virtual hard disk</label>
      <template v-if="disk === 'exist' || disk === 'installer'">
        <br />
        <button id="uploadButton" @click.prevent="fileSelect()">
          {{ select }}
        </button>
      </template>
    </VMSetupForm>
    <input type="submit" value="Create" />
  </form>
</template>

<script lang="ts">
import { basename, join } from "path";
import { defineComponent } from "vue";
import { move, outputFileSync, appendFile, chmod } from "fs-extra";
import { open } from "tauri/api/dialog";
import VMSetupForm from "@/components/VMSetupForm.vue";
import data from "store";

export default defineComponent({
  data() {
    return {
      name: "",
      platform: "x86_64",
      machine: "virt",
      os: "Linux",
      memory: 1024,
      disk: "",
      file: "",
    };
  },
  components: {
    VMSetupForm,
  },
  methods: {
    fileSelect() {
      if (this.disk === "exist") {
        open({
          filter: "qcow2;img",
        });
      } else if (this.disk === "installer") {
        open({
          filter: "img;iso",
        });
      }
    },
    handleSubmit() {
      data.set(`${this.name}.platform`, this.platform);
      if (this.useARM) {
        data.set(`${this.name}.machine`, this.machine);
      }
      data.set(`${this.name}.os`, this.os);
      data.set(`${this.name}.memory`, this.memory);
      if (this.platform === "x86") {
        this.platform += "_64";
      }
      if (this.platform === "x86_64") {
        this.machine = "pc";
      } else if (this.platform === "ppc") {
        this.machine = "g3beige";
      }
      outputFileSync(
        join("~/Documents/QEMU", this.name, "run"),
        `qemu-system-${this.platform} -machine ${this.machine} -m ${this.memory}`
      );
      chmod(join("~/Documents/QEMU", this.name, "run"), "700");
      if (this.disk === "convert") {
        appendFile(join("~/Documents/QEMU", this.name, "run"), " -boot c");
        this.$router.push("/image");
      } else if (this.disk === "installer") {
        const movedFile = join(
          "~/Documents/QEMU",
          this.name,
          basename(this.file)
        );
        move(this.file, movedFile);
        data.set(`${this.name}.installer`, movedFile);
        appendFile(
          join("~/Documents/QEMU", this.name, "run"),
          ` -cdrom ${movedFile} -boot d`
        );
        this.$router.push("/image");
      } else if (this.disk === "exist") {
        const movedFile = join(
          "~/Documents/QEMU",
          this.name,
          basename(this.file)
        );
        move(this.file, movedFile);
        data.set(`${this.name}.disk`, movedFile);
        appendFile(
          join("~/Documents/QEMU", this.name, "run"),
          ` -hda ${movedFile} -boot c`
        );
      }
      if (this.disk !== "convert" && this.disk !== "installer") {
        this.$router.push("/");
      }
    },
  },
  computed: {
    useARM(): boolean {
      return this.platform === "arm" || this.platform === "aarch64";
    },
    select(): string {
      return basename(this.file) || "Select";
    },
  },
  watch: {
    os(val, oldVal) {
      if (val === "Linux" || val === "Mac OS X" || val === "Windows (32-bit)") {
        this.memory = 1024;
      } else if (val === "macOS") {
        this.memory = 4096;
      } else if (val === "Windows (64-bit)") {
        this.memory = 2048;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.page1 {
  width: 90%;
}
input {
  margin: 5px;
  outline: none;
}
select {
  margin: 5px;
  outline: none;
}
</style>
