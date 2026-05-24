let particles = [];
let numParticles = 250;
let knobValue = 0;
let smoothKnobValue = 0;
let tippingPoint = 950;
let eventState = -1;

// 串口变量
let port;
let connectBtn;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // 1. 初始化串口对象
  port = createSerial();

  // 2. 绑定连接按钮
  connectBtn = select('#connect-btn');
  connectBtn.mousePressed(() => {
    if (!port.opened()) {
      port.open(9600);
    }
  });

  // 3. 初始化粒子系统
  for (let i = 0; i < numParticles; i++) {
    particles.push(new AntParticle(i));
  }
}

function draw() {

  // --- A. 输入处理 ---
  if (port.opened()) {

    let data = port.readUntil("\n");

    if (data.length > 0) {
      let val = int(trim(data));

      if (!isNaN(val)) {
        knobValue = 1023 - val;
        console.log("serial:", val, "knob:", knobValue);
      }
    }

    select('#status-text').html("DEVICE: CONNECTED & STABLE");

  } else {

    // 降级方案：未连接硬件时使用鼠标模拟
    knobValue = constrain(map(mouseX, 0, width, 0, 1023), 0, 1023);

    select('#status-text').html("MOUSE SIMULATION");
  }

  // --- B. 逻辑计算 ---
  smoothKnobValue = lerp(smoothKnobValue, knobValue, 0.1);

  let isTipped = smoothKnobValue > tippingPoint;

  updateUI();

  if (isTipped) {

    if (frameCount % 40 == 0) {
      eventState = floor(random(3));
    }

  } else {

    eventState = -1;
  }

  // --- C. 环境渲染 ---
  if (isTipped) {

    let flash = [
      color(255),
      color(230, 240, 255),
      color(250, 235, 255)
    ];

    background(flash[frameCount % 3]);

  } else {

    background(0);
  }

  // ASCII 背景
  push();

  translate(0, 0, -600);

  let asciiCol = isTipped
    ? color(50, 50, 50, 80)
    : color(0, 255, 0, 100);

  drawASCIIHeadArray(smoothKnobValue, asciiCol);

  pop();

  // 参考网格
  drawStaticGrid(smoothKnobValue);

  // 镜头旋转
  rotateX(PI / 4);
  rotateZ(frameCount * 0.005);

  // --- D. 核心对象渲染 ---
  for (let p of particles) {
    p.update(smoothKnobValue, eventState);
    p.show(smoothKnobValue, isTipped);
  }

  // 酸性丝线
  if (!isTipped) {
    drawAcidGeometry(smoothKnobValue);
  }
}

// --- 以下为辅助功能函数 ---

function drawASCIIHeadArray(val, col) {

  let chars = [".", "+", "*", "0"];

  let spacing = 150;

  textAlign(CENTER, CENTER);

  textSize(14);

  fill(col);

  for (let i = -4; i < 4; i++) {

    for (let j = -3; j < 3; j++) {

      push();

      let x = i * spacing + noise(frameCount * 0.01, i) * 30;
      let y = j * spacing + noise(frameCount * 0.01, j + 100) * 30;

      translate(x, y, 0);

      let c = chars[floor(map(val, 0, 1023, 0, 3))];

      text(c, 0, -20);
      text(c, -15, 0);
      text(c, 15, 0);
      text("-", 0, 20);

      pop();
    }
  }
}

function drawAcidGeometry(val) {

  let numLines = 50;

  let radius = map(val, 0, 850, 50, 250);

  noFill();

  strokeWeight(1);

  for (let i = 0; i < numLines; i++) {

    let inter = map(i, 0, numLines, 0, 1);

    let c = lerpColor(
      color(0, 255, 255),
      color(255, 0, 150),
      inter
    );

    stroke(c, 150);

    let angle = map(i, 0, numLines, 0, TWO_PI);

    let noiseVal = noise(frameCount * 0.02, i * 0.1);

    push();

    rotateZ(angle + frameCount * 0.01);

    line(
      radius * noiseVal,
      0,
      radius + 50 * noiseVal,
      50
    );

    pop();
  }
}

class AntParticle {

  constructor(id) {

    this.id = id;

    this.pos = createVector(
      random(-50, 50),
      random(-50, 50),
      random(-50, 50)
    );

    this.vel = p5.Vector.random3D().mult(2);

    this.noiseSeed = random(1000);

    this.baseColor = id % 2 == 0
      ? color(0, 255, 255)
      : color(255, 0, 150);
  }

  update(val, event) {

    if (event === -1) {

      let lateralMove =
        (noise(frameCount * 0.02 + this.id) - 0.5) * 15;

      let swing = sin(frameCount * 0.04) * 10;

      this.pos.x += lateralMove + swing;

      let gravity = this.pos.copy().mult(-0.08);

      this.vel.add(gravity);

      let n = noise(
        this.pos.x * 0.01,
        this.pos.y * 0.01,
        frameCount * 0.02 + this.noiseSeed
      );

      this.vel.add(
        p5.Vector.fromAngle(n * TWO_PI).mult(0.5)
      );

      this.pos.add(this.vel);

      this.pos.limit(600);

      this.vel.limit(map(val, 0, 850, 2, 5));

    } else {

      this.applyExplosion(event, val);
    }
  }

  applyExplosion(type, val) {

    let speed = map(val, tippingPoint, 1023, 1, 6);

    this.pos.add(
      p5.Vector.random3D().mult(speed)
    );

    this.pos.limit(700);
  }

  show(val, tipped) {

    push();

    translate(this.pos.x, this.pos.y, this.pos.z);

    if (tipped) {

      stroke(
        this.id % 2 == 0
          ? color(0, 100, 255)
          : color(255, 0, 100)
      );

      strokeWeight(2);

      let len = map(val, 850, 1023, 200, 2000);

      line(0, 0, -len, 0, 0, len);

      if (random(1) > 0.9) {

        noStroke();

        fill(this.baseColor);

        box(random(10, 40));
      }

    } else {

      noStroke();

      fill(this.baseColor);

      box(map(val, 0, 850, 2, 8));
    }

    pop();
  }
}

function drawStaticGrid(val) {

  push();

  let isTipped = smoothKnobValue > tippingPoint;

  let opacity = map(val, 0, 1023, 20, 60);

  stroke(
    isTipped
      ? color(150, 80)
      : color(0, 255, 0, opacity)
  );

  strokeWeight(0.5);

  for (let i = -10; i <= 10; i++) {

    line(
      i * 100,
      -1000,
      -100,
      i * 100,
      1000,
      -100
    );

    line(
      -1000,
      i * 100,
      -100,
      1000,
      i * 100,
      -100
    );
  }

  pop();
}

function updateUI() {

  let conformity = floor(
    map(smoothKnobValue, 0, 1023, 0, 100)
  );

  let isTipped = smoothKnobValue > tippingPoint;

  select('#conformity-rate').html(conformity + "%");

  select('#individuality-rate').html(
    (100 - conformity) + "%"
  );

  let alertMsg = select('#alert-msg');

  if (isTipped) {

    alertMsg.html(
      "ERROR: SEQUENCE OVERLOAD // SYSTEM PURGE"
    );

    alertMsg.style('color', '#ff0000');

  } else {

    alertMsg.html(
      "Continuous Rotation: Reverting to Collective Sequence..."
    );

    alertMsg.style('color', '#00ff00');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}