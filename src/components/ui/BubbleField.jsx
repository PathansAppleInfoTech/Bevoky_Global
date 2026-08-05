import { useEffect, useRef } from "react";
import styles from "./BubbleField.module.css";

const rand = (min, max) => Math.random() * (max - min) + min;

// Carbonation streams from fixed nucleation points, not random floaters
const STREAM_COUNT = 26;
const MAX_BUBBLES = 260;
const TARGET_FPS = 30;
const FRAME_TIME = 1000 / TARGET_FPS;

// Skews sizes small — real carbonation is mostly tiny, with rare larger ones
function bubbleSize() {
  return 0.6 + Math.pow(Math.random(), 2.4) * 3.2;
}

function createStreams(width) {
  return Array.from({ length: STREAM_COUNT }, () => ({
    x: rand(0, width),
    // how often this nucleation point releases a bubble
    interval: rand(0.12, 0.55),
    timer: rand(0, 0.4),
    jitter: rand(3, 9),
  }));
}

function spawnBubble(stream, height) {
  return {
    x: stream.x + rand(-stream.jitter, stream.jitter),
    y: height + rand(0, 30),
    baseX: stream.x,
    radius: bubbleSize(),
    // starts slow, accelerates as it rises (buoyancy)
    baseSpeed: rand(45, 90),
    accel: rand(35, 70),
    age: 0,
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleFreq: rand(2.2, 4),
    wobbleAmp: rand(0.6, 1.8),
    opacity: rand(0.18, 0.4),
    highlight: Math.random() > 0.35,
    popAt: rand(0.85, 1) * height * -1, // fades out near the very top
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
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let streams = [];
    let bubbles = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      streams = createStreams(width);
      bubbles = [];
    }

    resize();

    let last = 0;
    let raf;

    function animate(now) {
      if (now - last < FRAME_TIME) {
        raf = requestAnimationFrame(animate);
        return;
      }
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Emit new bubbles from each nucleation column
      for (const s of streams) {
        s.timer -= delta;
        if (s.timer <= 0 && bubbles.length < MAX_BUBBLES) {
          s.timer = s.interval;
          bubbles.push(spawnBubble(s, height));
        }
      }

      ctx.clearRect(0, 0, width, height);

      bubbles = bubbles.filter((b) => b.life > 0.01);

      for (const b of bubbles) {
        b.age += delta;

        // Accelerating rise — bubbles speed up as they ascend, like real carbonation
        const speed = b.baseSpeed + b.accel * Math.min(b.age, 1.4);
        b.y -= speed * delta;

        // Tight wobble around its column, not a wide random drift
        b.x =
          b.baseX +
          Math.sin(b.age * b.wobbleFreq + b.wobblePhase) * b.wobbleAmp;

        // Fade out over the last stretch near the top instead of popping instantly
        const fadeZoneStart = height * 0.18;
        if (b.y < fadeZoneStart) {
          b.life = Math.max(0, b.y / fadeZoneStart);
        }

        if (b.y < -20 || b.life <= 0.01) continue;

        const alpha = b.opacity * b.life;
        const stretch = 1 + Math.min(speed / 260, 0.55); // subtle motion streak

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.scale(1, stretch);

        // Rim-lit bubble: thin bright edge, near-hollow center — reads as
        // a carbonation bead rather than a filled soap bubble
        const grad = ctx.createRadialGradient(
          0, 0, b.radius * 0.15,
          0, 0, b.radius
        );
        grad.addColorStop(0, `rgba(255, 235, 190, 0)`);
        grad.addColorStop(0.72, `rgba(255, 225, 170, ${alpha * 0.12})`);
        grad.addColorStop(1, `rgba(255, 250, 235, ${alpha})`);

        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Crisp thin rim on top of the gradient for extra definition
        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 244, 214, ${alpha * 0.9})`;
        ctx.lineWidth = Math.max(0.4, b.radius * 0.14);
        ctx.stroke();

        // Tiny hot specular point, not a big soft highlight
        if (b.highlight && b.radius > 1.1) {
          ctx.beginPath();
          ctx.arc(
            -b.radius * 0.32,
            -b.radius * 0.32,
            Math.max(0.35, b.radius * 0.16),
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.4})`;
          ctx.fill();
        }

        ctx.restore();
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
