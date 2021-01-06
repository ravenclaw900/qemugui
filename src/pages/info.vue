<template>
  <InfoDisplay header="General">
    <li>Name: {{ $route.params.name }}</li>
    <li>Platform: {{ config.platform }}</li>
    <li v-if="isArm">Machine: {{ config.machine }}</li>
    <li>Operating System: {{ config.os }}</li>
  </InfoDisplay>
  <InfoDisplay header="System">
    <li>Memory: {{ config.memory }} MB</li>
  </InfoDisplay>
  <InfoDisplay header="Storage" v-if="config.hasOwnProperty('disk')">
    <li>Format: {{ config.format }}</li>
    <li v-if="config.hasOwnProperty('installer')">
      CDROM (Installer): {{ config.installer }}
    </li>
    <li>Size: {{ config.size / 1024 / 1024 / 1024 }} GB</li>
  </InfoDisplay>
</template>

<script>
import InfoDisplay from "@/components/InfoDisplay.vue";
import data from "store";

export default {
  components: {
    InfoDisplay,
  },
  computed: {
    config() {
      return data.get(this.$route.params.name);
    },
    isArm() {
      if (
        this.config.platform === "arm" ||
        this.config.platform === "aarch64"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
