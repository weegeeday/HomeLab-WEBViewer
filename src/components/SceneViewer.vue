<template>
  <div ref="canvasContainer" class="scene-container">
    <canvas ref="webglCanvas"></canvas>

    <!-- Simple Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-text">Loading 3D Homelab Scene...</div>
    </div>

    <!-- Minimal Bottom Bar with ONLY Reset Camera button -->
    <div class="bottom-bar">
      <button class="reset-btn" @click="resetCamera">Reset Camera</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { devicesData } from '../data/devices.js';

const emit = defineEmits(['device-hover', 'scene-loaded']);

const canvasContainer = ref(null);
const webglCanvas = ref(null);
const isLoading = ref(true);

let scene, camera, renderer, controls;
let gltfScene = null;
let raycaster, mouse;
let animationFrameId = null;

const deviceMeshMap = new Map();
const meshToDevice = new Map();
const originalMaterials = new Map();

let hoveredMesh = null;
let currentHighlightedMeshes = [];

// Front-facing camera starting position
const defaultCamPos = { x: 0.2, y: 1.15, z: -2.1 };
const defaultTargetPos = { x: 0.0, y: 0.85, z: 0.3 };

devicesData.forEach(dev => {
  dev.glbNodes.forEach(nodeName => {
    deviceMeshMap.set(nodeName, dev);
  });
});

onMounted(() => {
  initThreeJS();
  loadSceneModel();
  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', onMouseMove);
  if (webglCanvas.value) {
    webglCanvas.value.addEventListener('click', onClickCanvas);
  }
});

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousemove', onMouseMove);
  if (webglCanvas.value) {
    webglCanvas.value.removeEventListener('click', onClickCanvas);
  }
  if (renderer) renderer.dispose();
});

function initThreeJS() {
  const width = canvasContainer.value.clientWidth;
  const height = canvasContainer.value.clientHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e1117);

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(defaultCamPos.x, defaultCamPos.y, defaultCamPos.z);

  renderer = new THREE.WebGLRenderer({
    canvas: webglCanvas.value,
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 + 0.05;
  controls.target.set(defaultTargetPos.x, defaultTargetPos.y, defaultTargetPos.z);
  controls.update();

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
  mainLight.position.set(2, 4, -3);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
  fillLight.position.set(-2, 2, 2);
  scene.add(fillLight);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  animate();
}

function loadSceneModel() {
  const loader = new GLTFLoader();
  loader.load(
    '/models/scene.glb',
    (gltf) => {
      gltfScene = gltf.scene;

      gltfScene.traverse((child) => {
        if (child.isMesh) {
          let matchedDevice = deviceMeshMap.get(child.name);
          if (!matchedDevice && child.parent) {
            matchedDevice = deviceMeshMap.get(child.parent.name);
          }

          if (matchedDevice) {
            meshToDevice.set(child, matchedDevice);
            originalMaterials.set(child, {
              material: child.material.clone(),
              emissive: child.material.emissive ? child.material.emissive.clone() : null
            });
          }
        }
      });

      scene.add(gltfScene);
      isLoading.value = false;
      emit('scene-loaded');
    },
    undefined,
    (error) => {
      console.error('Error loading scene.glb:', error);
      isLoading.value = false;
    }
  );
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);
  if (controls) controls.update();
  if (renderer && scene && camera) renderer.render(scene, camera);
}

function onMouseMove(event) {
  if (!webglCanvas.value || !gltfScene) return;

  const rect = webglCanvas.value.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  ) {
    clearHighlight();
    emit('device-hover', null);
    return;
  }

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const interactiveMeshes = Array.from(meshToDevice.keys());
  const intersects = raycaster.intersectObjects(interactiveMeshes, true);

  if (intersects.length > 0) {
    const hitMesh = intersects[0].object;
    const device = meshToDevice.get(hitMesh);

    if (device) {
      if (hoveredMesh !== hitMesh) {
        clearHighlight();
        hoveredMesh = hitMesh;
        highlightDevice(device);
        webglCanvas.value.style.cursor = 'pointer';
      }

      // If device is a URL box, do NOT show hover tooltip text
      if (device.isUrlBox) {
        emit('device-hover', null);
      } else {
        emit('device-hover', {
          device,
          screenX: event.clientX,
          screenY: event.clientY
        });
      }
      return;
    }
  }

  clearHighlight();
  hoveredMesh = null;
  webglCanvas.value.style.cursor = 'default';
  emit('device-hover', null);
}

function onClickCanvas(event) {
  if (!webglCanvas.value || !gltfScene) return;

  const rect = webglCanvas.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const interactiveMeshes = Array.from(meshToDevice.keys());
  const intersects = raycaster.intersectObjects(interactiveMeshes, true);

  if (intersects.length > 0) {
    const hitMesh = intersects[0].object;
    const device = meshToDevice.get(hitMesh);
    if (device && device.url) {
      window.open(device.url, '_blank');
    }
  }
}

function highlightDevice(device) {
  currentHighlightedMeshes = [];
  meshToDevice.forEach((dev, mesh) => {
    if (dev.id === device.id) {
      currentHighlightedMeshes.push(mesh);
      if (mesh.material && mesh.material.emissive) {
        mesh.material.emissive.setHex(0x38bdf8);
        mesh.material.emissiveIntensity = 0.4;
      }
    }
  });
}

function clearHighlight() {
  currentHighlightedMeshes.forEach((mesh) => {
    const orig = originalMaterials.get(mesh);
    if (orig && mesh.material && mesh.material.emissive) {
      if (orig.emissive) {
        mesh.material.emissive.copy(orig.emissive);
      } else {
        mesh.material.emissive.setHex(0x000000);
      }
      mesh.material.emissiveIntensity = 0.0;
    }
  });
  currentHighlightedMeshes = [];
}

function resetCamera() {
  animateCameraTo(
    new THREE.Vector3(defaultCamPos.x, defaultCamPos.y, defaultCamPos.z),
    new THREE.Vector3(defaultTargetPos.x, defaultTargetPos.y, defaultTargetPos.z)
  );
}

function animateCameraTo(targetPos, targetLookAt, duration = 600) {
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  const startTime = performance.now();

  function updateCam(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1.0);
    const ease = 1 - Math.pow(1 - progress, 3);

    camera.position.lerpVectors(startPos, targetPos, ease);
    controls.target.lerpVectors(startTarget, targetLookAt, ease);
    controls.update();

    if (progress < 1.0) requestAnimationFrame(updateCam);
  }

  requestAnimationFrame(updateCam);
}

function handleResize() {
  if (!canvasContainer.value || !camera || !renderer) return;
  const width = canvasContainer.value.clientWidth;
  const height = canvasContainer.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

defineExpose({
  resetCamera
});
</script>

<style scoped>
.scene-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #0e1117;
  overflow: hidden;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: #0e1117;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.loading-text {
  color: #94a3b8;
  font-size: 14px;
}

.bottom-bar {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.reset-btn {
  background: #161b22;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.reset-btn:hover {
  background: #21262d;
  color: #ffffff;
  border-color: #8b949e;
}
</style>
