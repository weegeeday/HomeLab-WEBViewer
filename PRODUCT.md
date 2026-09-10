# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Homelab administrator (Simon) and visitors exploring the physical and logical architecture of a homelab setup.

## Product Purpose
Provide an interactive, spatial 3D web explorer for the Blender homelab scene (`models/scene.blend`). On hover, instantly display what each device is running ("short and simple"). On click, enable deep inspection of verified hardware specs, LXC microservices, Docker applications, network links, and PoE power budgets.

## Positioning
Spatial 3D 1:1 homelab visualizer combining real WebGL model rendering with verified infrastructure telemetry and application mapping.

## Operating Context
Desktop & mobile browser environment used for inspecting homelab device placements (server table, white wall shelf, wire rack, ceiling APs), checking LXC/Docker service status, verifying IP assignments, and auditing PoE budget distribution.

## Capabilities and Constraints
- Vue 3 + Three.js (GLTFLoader) rendering exported 3D scene (`scene.glb`).
- Fact-only dataset strictly derived from local repository documentation (`devices/*.md`).
- Raycasting hover detection with instant service popovers.
- Smooth camera orbit controls, zoom-to-device interpolation, camera view presets, and wireframe toggle.
- Strictly de-sloped UI (zero indigo-violet gradients, zero emoji spam, zero backdrop-filter blur slop, zero fabricated numbers).

## Brand Commitments
- Name: HomeLab WebViewer
- Aesthetic: Obsidian craftsman dark mode with JetBrains Mono / SFMono technical typography.

## Evidence on Hand
- Blender scene: `models/scene.blend`
- GLB model assets: `models/*.glb`
- Device specifications: `devices/*.md` (Proxmox VE, TrueNAS SCALE, UniFi Cloud Gateway Ultra, TP-Link 8-Port Switch, TP-Link 5-Port PoE+ Switch, UniFi U6+, UniFi AC Pro, Philips Hue Hub)

## Product Principles
1. **Fact-First Spatial Telemetry**: Present 100% verified hardware and software details without hallucinating stats, IPs, or firmwares.
2. **Instant Spatial Context**: Hovering any device in the 3D scene immediately conveys its running workloads.
3. **Craftsman Utility**: Clean, responsive design that prioritizes high-density technical information over decorative fluff.
