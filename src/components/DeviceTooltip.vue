<template>
  <div 
    v-if="device" 
    class="device-tooltip" 
    :style="tooltipStyle"
  >
    <div class="tooltip-header">
      <span class="device-name">{{ device.name }}</span>
    </div>
    <p class="running-text">{{ device.runningSummary }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  hoverData: {
    type: Object,
    default: null
  }
});

const device = computed(() => props.hoverData?.device || null);

const tooltipStyle = computed(() => {
  if (!props.hoverData) return {};

  let posX = props.hoverData.screenX + 16;
  let posY = props.hoverData.screenY + 16;

  const tooltipWidth = 260;
  const tooltipHeight = 80;

  if (posX + tooltipWidth > window.innerWidth - 16) {
    posX = props.hoverData.screenX - tooltipWidth - 12;
  }

  if (posY + tooltipHeight > window.innerHeight - 16) {
    posY = props.hoverData.screenY - tooltipHeight - 12;
  }

  return {
    left: `${posX}px`,
    top: `${posY}px`
  };
});
</script>

<style scoped>
.device-tooltip {
  position: fixed;
  z-index: 1000;
  width: 260px;
  background: #11151c;
  border: 1px solid #28303d;
  border-radius: 6px;
  padding: 10px 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.tooltip-header {
  margin-bottom: 4px;
}

.device-name {
  font-size: 13px;
  font-weight: 600;
  color: #f1f5f9;
}

.running-text {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
  margin: 0;
}
</style>
