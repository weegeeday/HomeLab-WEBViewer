<template>
  <div id="homelab-app">
    <!-- Clean 3D WebGL Canvas -->
    <SceneViewer
      ref="sceneViewerRef"
      @device-hover="handleDeviceHover"
    />

    <!-- Floating Hover Tooltip -->
    <DeviceTooltip :hoverData="hoverData" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SceneViewer from './components/SceneViewer.vue';
import DeviceTooltip from './components/DeviceTooltip.vue';

const sceneViewerRef = ref(null);
const hoverData = ref(null);

function handleDeviceHover(data) {
  hoverData.value = data;
}
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app, #homelab-app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #0e1117;
  color: #f1f5f9;
  -webkit-font-smoothing: antialiased;
}

#homelab-app {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
