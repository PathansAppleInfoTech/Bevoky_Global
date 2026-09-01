import { useEffect, useRef } from "react";
import styles from "./BubbleField.module.css";

const rand = (min, max) => Math.random() * (max - min) + min;

const STREAM_COUNT = 18;
const MAX_BUBBLES = 110;
const TARGET_FPS = 30;
const FRAME_TIME = 1000 / TARGET_FPS;

function bubbleSize() {
  return 0.6 + Math.pow(Math.random(), 2.4) * 3;
}

function createStreams(width) {
  return Array.from({ length: STREAM_COUNT }, () => ({
    x: rand(0, width),
    interval: rand(0.18, 0.65),
    timer: rand(0, 0.6),
    jitter: rand(2, 7),
  }));
}

function spawnBubble(stream, height) {
  return {
    x: stream.x,
    y: height + rand(0, 25),

    baseX: stream.x,

    radius: bubbleSize(),

    speed: rand(45, 80),
    acceleration: rand(25, 55),

    age: 0,

    wobblePhase: Math.random() * Math.PI * 2,
    wobbleFreq: rand(2, 3.5),
    wobbleAmp: rand(0.4, 1.4),

    opacity: rand(0.16, 0.32),

    highlight: Math.random() > 0.4,

    life: 1,
  };
}

export default function BubbleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Lower DPR = significantly less canvas work.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    let streams = [];
    let bubbles = [];

    let lastTime = performance.now();
    let accumulator = 0;

    let animationFrame;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      streams = createStreams(width);

      // Don't keep old bubbles after resizing.
      bubbles.length = 0;
    }

    resize();

    function spawnBubbles(delta) {
      for (const stream of streams) {
        stream.timer -= delta;

        if (
          stream.timer <= 0 &&
          bubbles.length < MAX_BUBBLES
        ) {
          stream.timer = stream.interval;

          bubbles.push(
            spawnBubble(stream, height)
          );
        }
      }
    }

    function updateBubbles(delta) {
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];

        b.age += delta;

        const speed =
          b.speed +
          b.acceleration * Math.min(b.age, 1.5);

        b.y -= speed * delta;

        b.x =
          b.baseX +
          Math.sin(
            b.age * b.wobbleFreq +
            b.wobblePhase
          ) *
          b.wobbleAmp;

        // Fade near top
        if (b.y < height * 0.18) {
          b.life = Math.max(
            0,
            b.y / (height * 0.18)
          );
        }

        if (
          b.y < -20 ||
          b.life <= 0.01
        ) {
          bubbles.splice(i, 1);
        }
      }
    }

    function drawBubble(b) {
      const alpha = b.opacity * b.life;

      // Avoid save/restore.
      ctx.translate(b.x, b.y);

      const radius = b.radius;

      // Very cheap bubble rendering.
      ctx.beginPath();
      ctx.arc(
        0,
        0,
        radius,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle = `rgba(
        255,
        244,
        214,
        ${alpha}
      )`;

      ctx.lineWidth = Math.max(
        0.45,
        radius * 0.12
      );

      ctx.stroke();

      // Small highlight only for larger bubbles.
      if (
        b.highlight &&
        radius > 1.1
      ) {
        ctx.beginPath();

        ctx.arc(
          -radius * 0.3,
          -radius * 0.3,
          Math.max(
            0.3,
            radius * 0.14
          ),
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(
          255,
          255,
          255,
          ${alpha * 1.3}
        )`;

        ctx.fill();
      }

      ctx.translate(-b.x, -b.y);
    }

    function animate(now) {
      animationFrame =
        requestAnimationFrame(animate);

      const elapsed =
        now - lastTime;

      lastTime = now;

      // Throttle actual drawing to ~30 FPS.
      accumulator += elapsed;

      if (accumulator < FRAME_TIME) {
        return;
      }

      // Prevent huge jumps after inactive tabs.
      const delta = Math.min(
        accumulator / 1000,
        0.05
      );

      accumulator = 0;

      spawnBubbles(delta);

      updateBubbles(delta);

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      for (const bubble of bubbles) {
        drawBubble(bubble);
      }
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(
          animationFrame
        );

        lastTime = performance.now();
        accumulator = 0;
      } else {
        lastTime = performance.now();

        animationFrame =
          requestAnimationFrame(animate);
      }
    }

    window.addEventListener(
      "resize",
      resize
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}