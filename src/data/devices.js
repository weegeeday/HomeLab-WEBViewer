export const devicesData = [
  {
    id: "proxmox-host",
    glbNodes: ["proxmox-host"],
    name: "Proxmox VE Node",
    runningSummary: "Proxmox VE 9.1.9 | 11 LXC Containers (Gitea Runners, n8n, metube, discopanel, cloudflare-ddns, airupnp)"
  },
  {
    id: "truenas-core-host",
    glbNodes: ["truenas-core-host"],
    name: "TrueNAS Server",
    runningSummary: "TrueNAS SCALE | ZFS Storage | 9 Apps (Nextcloud, Immich, Jellyfin, Authentik, Gitea) + Home Assistant"
  },
  {
    id: "unifi-cloud-gateway-ultra",
    glbNodes: ["UCG_Ultra"],
    name: "Ubiquiti Cloud Gateway Ultra",
    runningSummary: "Core Router, Firewall (NGFW), IDS/IPS, VPN Server & UniFi Network SDN Controller"
  },
  {
    id: "tp-link-gigabit-switch",
    glbNodes: ["8port"],
    name: "TP-Link 8-Port Gigabit Switch",
    runningSummary: "Core L2 Gigabit switching distribution for servers, gateway, and switches"
  },
  {
    id: "tp-link-poe-switch",
    glbNodes: ["poe_test"],
    name: "TP-Link 5-Port PoE+ Switch",
    runningSummary: "Power over Ethernet distribution (Port 1 powering UniFi U6+ @ ~6.5W)"
  },
  {
    id: "unifi-ap-u6-plus",
    glbNodes: ["U6_"],
    name: "Ubiquiti UniFi U6+",
    runningSummary: "Wi-Fi 6 (802.11ax) Ceiling Access Point"
  },
  {
    id: "philips-hue-hub",
    glbNodes: ["Hue Bridge"],
    name: "Philips Hue Bridge v2",
    runningSummary: "Zigbee 3.0 Coordinator & Matter Bridge"
  },
  {
    id: "url-box-1",
    glbNodes: ["BBQ"],
    name: "URL Link 1",
    url: "https://barbequechickenalert.com",
    isUrlBox: true
  },
  {
    id: "url-box-2",
    glbNodes: ["BBQ2"],
    name: "URL Link 2",
    url: "https://barbequechickenalert.com",
    isUrlBox: true
  }
];
