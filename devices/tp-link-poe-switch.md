# TP-Link 5-Port PoE+ Switch (`tp-link-poe-switch`)

## 1. Device Overview & Physical Placement

| Attribute | Specification |
| :--- | :--- |
| **Node ID** | `tp-link-poe-switch` |
| **Device Name** | TP-Link TL-SG1005P 5-Port Gigabit Desktop PoE+ Switch |
| **Manufacturer** | TP-Link Technologies Co., Ltd. |
| **Role** | Dedicated Power over Ethernet (PoE+) distribution for ceiling wireless access points |
| **Form Factor** | Compact unmanaged desktop switch with rugged steel casing |
| **Physical Placement** | Upper white wall shelf, left side of the switch cluster |
| **3D Coordinates [X, Y, Z]** | `[-0.080 m, 0.150 m, 1.437 m]` (center) |
| **Dimensions (W × D × H)** | 99.8 mm × 98.0 mm × 25.0 mm |
| **3D Model File** | [`models/tp-link-poe-switch.glb`](../models/tp-link-poe-switch.glb) |


### 3.1 Power Budget Allocation Table

| Port # | Connected Device | PoE Standard | Typical Power Draw | Max Peak Draw | Budget Margin Remaining | Status |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **Port 1** | **UniFi U6+** (Wi-Fi 6 AP) | 802.3af (PoE) | ~6.5 W | 9.0 W | 56.0 W | **ACTIVE** |
| **Port 2** | **UniFi AC Pro** (Wi-Fi 5 AP)| 802.3af/at (PoE) | ~7.0 W | 9.0 W | 47.0 W | **ACTIVE** |

