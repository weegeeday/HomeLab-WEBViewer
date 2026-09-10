# Proxmox VE Node (`proxmox-host`)

## 1. Device Overview & Physical Placement

| Attribute | Specification |
| :--- | :--- |
| **Node ID** | `proxmox-host` |
| **Device Name** | Proxmox VE Node |
| **Role** | Virtualization Hypervisor, LXC Microservices, CI/CD Build Farm & Automation Hub |
| **Chassis** | HP ProDesk 400 G5 SFF (Small Form Factor) |
| **Physical Placement** | Server Table (Floor level), next to TrueNAS Corsair mid-tower |
| **3D Coordinates [X, Y, Z]** | `[-0.150 m, 0.120 m, 0.135 m]` (center) |
| **Dimensions (W × D × H)** | 95 mm × 296 mm × 270 mm |
| **3D Model File** | [`models/proxmox-host.glb`](../models/proxmox-host.glb) |

---

## 2. Hardware Architecture & Live Telemetry

```
root@proxmox
------------
OS: Proxmox VE 9.1.9 x86_64
Host: HP ProDesk 400 G5 SFF
Kernel: Linux 6.17.2-1-pve
Uptime: 30 days, 5 hours, 12 mins
Packages: 761 (dpkg)
Shell: bash 5.2.37
Terminal: termproxy
CPU: Intel(R) Core(TM) i5-8500 (6) @ 4.10 GHz
GPU: Intel UHD Graphics 630 @ 1.10 GHz [Integrated]
Memory: 5.91 GiB / 7.60 GiB (78%)
Swap: 1.45 GiB / 15.60 GiB (9%)
Disk (/): 16.15 GiB / 67.82 GiB (24%) - ext4
Local IP (vmbr0): 192.168.1.221/24
Locale: en_US.UTF-8
```

* **Processor:** Intel Core i5-8500 (Coffee Lake, 14nm)
  * Cores / Threads: 6 physical cores / 6 execution threads
  * Frequency: 3.00 GHz base, 4.10 GHz maximum turbo boost
  * Cache: 9 MB Intel Smart Cache
  * Virtualization Extensions: Intel VT-x (hardware virtualization), VT-d (directed I/O passthrough), EPT
* **Memory:** 7.60 GiB total host memory (5.91 GiB used - 78%)
* **Swap Allocation:** 15.60 GiB total swap (1.45 GiB used - 9%)
* **Integrated Graphics:** Intel UHD Graphics 630 @ 1.10 GHz (Direct hardware `/dev/dri` acceleration passed into LXC workloads)
* **Storage Allocation:** `ext4` partition on `/dev/sda` (`16.15 GiB / 67.82 GiB` used - 24%)
* **Reported Host Uptime:** 30 days, 5 hours, 12 mins

---

## 3. Operating System & Hypervisor Stack

* **Hypervisor OS:** Proxmox VE 9.1.9 x86_64
* **Kernel Version:** `Linux 6.17.2-1-pve`
* **Shell Environment:** bash 5.2.37 (dpkg package count: 761)
* **Local Bridge:** `vmbr0` bound to 192.168.1.221/24

---

## 4. Installed LXC Containers & Services

Proxmox VE hosts 11 LXC containers for core microservices:

1. **5x Gitea CI/CD Runners** (`LXC`): Automated continuous integration build & test runners
2. **n8n** (`LXC`): Workflow automation engine for node-based API triggers
3. **metube** (`LXC`): Web-based YouTube video downloader tool
4. **discopanel** (`LXC`): Minecraft Server Manager
5. **cloudflare-ddns** (`LXC`): Dynamic DNS updater for Cloudflare domain records
6. **airupnp** (`LXC`): AirPlay bridge for UPnP/DLNA media rendering
