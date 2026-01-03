---
title: Projects
description: Technical projects by Mo'men Mahmoud (moex0) - Cyber range, APT emulation, and security research.
---

## Ludus Cyber Range
**Feb 2025 - Apr 2025**

Built a scalable home cyber range using **Ludus** (built on Proxmox) to automate full enterprise infrastructure deployment.

**What I built:**
- Leveraged **Ansible** and **Packer** for image automation, host configuration, and tool setup
- Deploy **20-30 machine** enterprise environments within hours instead of weeks
- Integrated security tools: **ELK**, **Splunk**, **ElasticDefend EDR**, and **SCCM** for realistic simulations

**What I use it for:**
- End-to-end attack simulations and investigations
- Testing and validating custom detection rules against real telemetry and attacker behavior
- Strengthening DFIR skills and understanding of attacker mindset through repeated emulation

---

## APT29 End-to-End Adversary Emulation
**May 2024 - Jul 2024**

Full adversary emulation and investigation project simulating **APT29 (SVR)** techniques.

**Infrastructure:**
- Architected a multi-subnet environment with DMZ, IT subnet, and Blue Team stack
- Deployed **Elastic/Splunk SIEM**, **PfSense**, **Velociraptor**, and **Wazuh**

**Emulation:**
- Simulated APT29 attack techniques exploiting **TeamCity CVE-2024-27198** vulnerabilities based on CISA reports
- Conducted post-attack end-to-end investigation

**Output:**
- Created practice scenarios with investigation questions to advance practitioners' skills in threat hunting, forensics, and detection engineering
- Wrote a technical article documenting the methodology of approaching this kind of investigation in the real world

[Read the write-up →](/blog/investigating-apt29-teamcity-cve-2024-27198)

---

## Security Training Content

Developed hands-on training content across multiple platforms:

- **TryHackMe:** Defensive security training modules covering SOC operations, incident response, and threat detection
- **CyberDefenders:** APT emulation scenarios and CCD certification content
- **BlackHat MEA 2024:** Practical threat hunting methodologies training

---

## CTF Development

Create Capture The Flag challenges to help others learn security concepts through hands-on practice.
