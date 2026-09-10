# TrueNAS Server (`truenas-core-host`)

## 1. Device Overview & Physical Placement

| Attribute | Specification |
| :--- | :--- |
| **Node ID** | `truenas-core-host` |
| **Device Name** | TrueNAS Server |
| **Role** | Central Storage (ZFS), Core Docker Apps, Media Streaming & Personal Cloud |
| **Chassis** | Corsair Carbide Series 175R RGB ATX Mid-Tower |
| **Physical Placement** | Floor level, leftmost position next to central vacuum unit |
| **3D Coordinates [X, Y, Z]** | `[-0.450 m, 0.100 m, 0.225 m]` (center) |
| **Dimensions (W × D × H)** | 210 mm × 418 mm × 450 mm |
| **3D Model File** | [`models/truenas-core-host.glb`](../models/truenas-core-host.glb) |

---

## 2. Hardware Architecture

```
+-------------------------------------------------------------------------+
|                  CORSAIR CARBIDE 175R RGB MID-TOWER                     |
|                                                                         |
|  +------------------------+  +---------------------------------------+  |
|  | Intel Core i5-8500T    |  | 16 GB DDR4-2666 MHz Non-ECC RAM       |  |
|  | 6 Cores / 6 Threads    |  | (15.1 GiB Usable for ZFS ARC & Apps)   |  |
|  | 2.10 GHz (3.50 GHz Max)|  +---------------------------------------+  |
|  | 35W Low-Power TDP      |  +---------------------------------------+  |
|  | Intel UHD Graphics 630 |  | Realtek RTL8111H / Intel I219-V GbE   |  |
|  +------------------------+  | Dedicated 1 Gbps Link -> SG108 Port 2 |  |
|  +-------------------------------------------------------------------+  |
|  | ZFS Storage Pools (Mirror / RAIDZ1 Data Arrays + NVMe App Pool)   |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
```

* **Processor:** Intel Core i5-8500T (Coffee Lake, 14nm)
  * Cores / Threads: 6 Cores / 6 Threads
  * Clock Speed: 2.10 GHz Base, 3.50 GHz Turbo Boost
  * TDP: 35 Watts (Energy-efficient low-power profile suitable for 24/7 server operation)
  * Integrated GPU: Intel UHD Graphics 630 (features Intel QuickSync Video engine passed through to Jellyfin for hardware video transcoding)
* **Memory:** 16 GB DDR4 (15.1 GiB usable)
  * Dynamic ZFS Adaptive Replacement Cache (ARC) allocation: Up to 8 GiB
  * Applications & Containers allocation: ~6-7 GiB
* **Networking:** 1x Gigabit Ethernet (1000BASE-T RJ45) connected to TP-Link TL-SG108 (Port 2)
* **Power Supply:** 450W 80+ Bronze ATX Power Supply with active PFC

---

## 3. Operating System & Kernel Environment

* **Operating System:** TrueNAS SCALE (Debian GNU/Linux 12 "Bookworm")
* **Kernel Version:** `6.12.15-production+truenas`
* **Architecture:** `x86_64`
* **Reported Uptime:** 8 weeks, 6 days (High stability, continuous production uptime)
* **Filesystem Engine:** OpenZFS 2.2.x with native encryption, zstandard (zstd) compression, and scheduled scrubs.

```

### 4.1 Production Applications Breakdown

| Application Name | Version | Runtime Status | Internal Port | Description & Service Role |
| :--- | :--- | :--- | :--- | :--- |
| **Nextcloud** | `2.3.62` | **RUNNING** | `9001:80` | Private cloud storage platform providing cross-device file synchronization, WebDAV, Calendar (CalDAV), Contacts (CardDAV), and office document editing. Backed by PostgreSQL and Redis. |
| **Immich** | `1.14.36` | **RUNNING** | `2283:3001` | High-performance self-hosted photo and video backup system. Features machine learning for face recognition, CLIP semantic visual search, reverse geocoding, and mobile background upload sync. |
| **Immich-Relay** | `1.4.4` | **RUNNING** | `3003:3000` | Companion reverse-proxy relay and streaming cache service optimizing high-bitrate video streaming and asset delivery for external Immich mobile clients. |
| **Gitea** | `1.6.30` | **RUNNING** | `3000:3000`, `2222:22` | Lightweight self-hosted Git version control service providing repository hosting, pull request workflows, issue tracking, and webhooks integrated with Proxmox CI/CD runners. |
| **FileBrowser Quantum** | `1.1.29` | **RUNNING** | `8082:80` | High-speed web-based filesystem explorer and manager allowing direct administrative browsing, uploading, and file manipulation across TrueNAS datasets without mounting SMB. |
| **Cloudflared** | `2.0.19` | **RUNNING** | Host Daemon | Zero-Trust Cloudflare Tunnel connector daemon establishing secure outbound encrypted tunnels to Cloudflare edge nodes, exposing selected local services without open inbound WAN ports. |
| **Calibre-Web** | `1.0.0` | **RUNNING** | `8083:8083` | Clean web interface for browsing, reading, and downloading digital e-books from the Calibre database with built-in OPDS catalog server for e-readers. |
| **Authentik** | `1.3.39` | **RUNNING** | `9000:9000`, `9443:9443` | Centralized Identity Provider (IdP) and Single Sign-On (SSO) solution managing user authentication, OAuth2/OIDC flows, LDAP outposts, and multi-factor authentication (MFA/WebAuthn). |
| **Jellyfin** | `1.3.12` | **RUNNING** | `8096:8096` | Open-source media streaming server providing on-demand movies, music, and TV shows. Utilizes Intel QuickSync Video (QSV) via `/dev/dri/renderD128` for real-time hardware transcoding. |
| **RomM** | `1.2.22` | **STOPPED** | `8084:8080` | Retro video game ROM manager and metadata scraper (curating retro game libraries, box art, and emulators). Currently held in a stopped state for storage maintenance. |

### 4.2 Standalone Docker Containers

home assistnat

---

## 5. Storage Subsystem & ZFS Pool Topology

| Pool Name | Topology | Usable Capacity | Used | Available | Usage | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **HDD** | 1 × MIRROR (2 wide \| 3.64 TiB) | 3.51 TiB | 2.47 TiB | 1.04 TiB | 70.4% | Online |
| **SSD** | 1 × DISK (1 wide \| 238.47 GiB) | 230.64 GiB | 141.12 GiB | 89.53 GiB | 61.2% | Online |

### Storage Details

* **HDD Pool:**
  * **Topology:** 1 × MIRROR (2 wide | 3.64 TiB raw)
  * **Usage:** 3.51 TiB usable | 2.47 TiB used | 1.04 TiB available (70.4% full)
  * **Health & Scrub:** Status Online, 0 errors, Scheduled Scrub enabled (Last scrub completed)
* **SSD Pool:**
  * **Topology:** 1 × DISK (1 wide | 238.47 GiB raw)
  * **Usage:** 230.64 GiB usable | 141.12 GiB used | 89.53 GiB available (61.2% full)
  * **Health & Scrub:** Status Online, 0 errors, Scheduled Scrub enabled (Last scrub completed)