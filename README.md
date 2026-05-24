# Peer Pressure Simulator (从众效应模拟器)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=flat-square&logo=p5dotjs&logoColor=white)](https://p5js.org/) [![WebGL](https://img.shields.io/badge/WebGL-990000?style=flat-square&logo=webgl&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) [![Arduino](https://img.shields.io/badge/Arduino-00979D?style=flat-square&logo=arduino&logoColor=white)](https://www.arduino.cc/)

> [cite_start]**"An interactive web-based installation investigating how subtle social cues, peer expectations, and environmental contexts influence individual behaviour over time."** [cite: 11]

---

## 📌 Overview (概述)

[cite_start]本研究与交互艺术作品深入探讨了个体在社会环境中所承受的隐性群体压力与从众行为（Conformity） [cite: 4, 9, 74][cite_start]。项目将复杂的社会学与心理学动力学转化为一个可感知、可体验的动态计算系统 [cite: 74]。

[cite_start]传统叙事往往将同辈压力（Peer Pressure）视为一种即时发生的线性力量，而本项目则聚焦于其**“隐匿积累、重复演进、阈值爆发”**的非线性特质 [cite: 43, 92, 93][cite_start]——类似于物理学中的**金属疲劳（Metal Fatigue）**或材料在持续压力下的突变 [cite: 109, 110]。

---

## 👁️ Visual Abstract & Concept (视觉概念)

* [cite_start]**金属疲劳与熨斗灼痕 (Willie Cole 启发)** [cite: 109]
    压力以非线性方式在系统内部悄然累积，在未触及临界点前保持完全隐形 [cite: 110, 149]。这构成了项目核心的哲学隐喻：肉眼不可见的破坏性应力在结构内部不断沉积，直至超越阈值引发毫无预兆的断裂与崩溃 [cite: 110, 142]。
* **社会影响引擎与行为趋同** [cite: 67]
    系统融合了模拟自然界群体行为的蚂蚁蚁群算法（Ant Colony Simulation）、粘菌路径规划以及乌合之众的运动规律 [cite: 113]。基于 Agent-based 行为规则，每个智能体被赋予独立指数、从众阈值与环境敏感度 [cite: 68]。初始状态下，智能体呈现不稳定且有机的自由游离运动 [cite: 96]；随着压力沉积，局部交互开始传染，智能体在空间中被逐步收敛成高度同步的行进轨迹、几何“信息块”与拓扑连线 [cite: 97, 106, 115]。
* **临界溃决 (Tipping Point)** [cite: 22, 60]
    引入 Malcolm Gladwell 在《引爆点》中阐述的临界阈值动力学 [cite: 22, 69]，一旦累积的压力超越预设阈值，系统便从克制的分布式集体行为坍塌进极限超载状态 [cite: 99, 172]，通过高频震颤的几何形变、空间扭曲以及数据空间的戏剧化闪烁，产生极具张力的系统性溃决视觉效果 [cite: 99, 118]。

---

## 🛠️ System Design (系统设计)

[cite_start]项目构建了一个基于 **“观众-系统循环反馈 (Loop-and-Feedback)”** 的动态模型 [cite: 59]：

* [cite_start]**Agent State (智能体状态)**：包含独立指数、从众阈值及环境敏感度 [cite: 68]。
* [cite_start]**Network (网络拓扑)**：节点代表个人，边缘代表隐形连接与行为传染 [cite: 71, 106]。
* [cite_start]**Update Rule (更新规则)**：基于群体比例与递归反馈，模拟定量到定变量的突变时刻 [cite: 59, 60, 69]。
* [cite_start]**Output (可感爆发)**：超越临界点后，智能体被吸纳进大规模定向流，引发空间同步塌陷与粒子洪流 [cite: 150, 172, 173]。

---

## 💻 Tech Stack & Hardware (技术栈与硬件)

### Software & Graphics
* **Next.js**：用于构建极简主义黑白视觉风格的前端容器与画廊界面。
* [cite_start]**p5.js & WebGL**：生成式图形（Generative Graphics）与三维空间网格渲染 [cite: 95][cite_start]，剔除传统粒子特效，聚焦于数据美学（Data Aesthetics）风格的结构组织与运动特征 [cite: 104, 105]。
* [cite_start]**WebSerial API**：负责浏览器与底层硬件微控制器之间的无缝串行通信 [cite: 100]。

### Hardware Integration
* [cite_start]**Arduino**：微控制器核心 [cite: 100]。
* [cite_start]**Rotary Encoder (旋转编码器)**：作为交互的物理输入设备 [cite: 100][cite_start]。连续旋转物理旋钮的动作成为了遭受持续社会曝光与环境压力的直观隐喻 [cite: 101][cite_start]；物理输入并不直接操控某个特定智能体，而是作为催化剂加速网络系统内部同辈因数的隐匿沉积 [cite: 102, 103]。

---

## 📖 Theoretical Context (理论背景)

1.  [cite_start]**Deleuze & Guattari (1980)《千高原》**：引入“装配（Assemblage）”与“领土化（Territorialisation）”概念，剖析社会机制与环境脉络如何将个体固化在特定的角色与规范之中，进而引发深层的心理张力与焦虑 [cite: 15, 17, 18]。
2.  [cite_start]**Malcolm Gladwell (2000)《引爆点》**：对从众效应进行行为建模，表现定量到定变量的突变时刻 [cite: 22, 23]。
3.  [cite_start]**Erving Goffman (1959)《日常生活中的自我呈现》**：将个体的自我调节与从众行为视为一种环境期望下的戏剧化表演 [cite: 38]。

---

## 🚀 Getting Started (快速启动)

### 1. 硬件连接 (Hardware Setup)
将旋转编码器连接至 Arduino 对应引脚（如 D2、D3 支持中断），并烧录项目 `hardware/encoder.ino` 路径下的源码。

### 2. 本地运行 (Local Development)

```bash
# 克隆仓库
git clone [https://github.com/你的用户名/peer-pressure-simulator.git](https://github.com/你的用户名/peer-pressure-simulator.git)

# 进入目录并安装依赖
cd peer-pressure-simulator
npm install

# 启动开发服务器
npm run dev
