---
title: Smooth Gaming on Linux
date: 2024-08-22
---

Gaming on Linux is a double-edged sword. On one hand, it offers complete control
over the environment in which games run. However, it doesn't reap the benefits
of the hardware vendors' default enhancements baked into Windows drivers and
applications. Achieving an optimal gaming environment on Linux often requires
some tweaking. In my case, it took considerable research and trial-and-error to
get the operating system environment to a point that I'm satisfied with.

## Current PC Specifications

- CPU: AMD Ryzen 7 5800X
- GPU: AMD Radeon RX 6700 XT
- OS: Fedora 40
- Monitor: Dell 165Hz AMD FreeSync Premium

![Garlt from the Witcher 3 game standing in front of a village](./images/witcher-3-mangohud.avif)

My primary objectives were twofold: to maximise the use of my hardware and
ensure a smooth gaming experience without excessive fan noise. I knew that my
current setup wasn't optimal as I could hear the fans spinning up and down
during gameplay, and the frame pacing wasn't as smooth as it was on Windows.

['MangoHud'](https://github.com/flightlessmango/MangoHud) became an invaluable
tool, not only for monitoring in-game performance but also for forcing certain
graphical settings on the fly. Alongside in-game monitoring, I used
[`amdgpu_top`](https://github.com/Umio-Yasuno/amdgpu_top) to delve deeper into
what the GPU was doing while gaming. For CPU monitoring, I used `cpupower` to
check the frequency governor being utilised and the frequencies.

I won't go into detail about the experimental process or how each tool was
employed; instead, I'll document my final setup:

- Ensured all PCIe 4.0 channels and Resizable BAR were enabled.
- Enabled Variable Refresh Rate (VRR) in Gnome.
- Made sure FreeSync was enabled on the monitor.
- Created a global MangoHud configuration that disabled Vsync and set frame
  limits.
- Created a gaming [`corectrl`](https://gitlab.com/corectrl/corectrl) profile
  that forced both the CPU and GPU into performance-based gaming modes.
- Disabled any in-game vsync or frame caps.
- Launched games from Steam using `gamemoderun mangohud %command%` to enable
  MangoHud and gamemode optimisations.

Here's my local **MangoHud.conf**, which simply limits the displayed information
to what I care about: frame rate, pacing, and hardware temperatures.

```text
vsync=1
fps_limit=162,83
fps_limit_method=early
throttling_status=1
show_fps_limit=1
```
