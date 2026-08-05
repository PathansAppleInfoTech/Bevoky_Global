import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 160;

function Bubbles() {
  const pointsRef = useRef(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = [];
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 6 - 2;
      positions.set([x, y, z], i * 3);
      seeds.push({
        speed: 0.15 + Math.random() * 0.35,
        drift: 0.15 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        size: 0.02 + Math.random() * 0.06,
      });
    }
    return { positions, seeds };
  }, []);

  const sizes = useMemo(() => {
    const arr = new Float32Array(COUNT);
    seeds.forEach((s, i) => (arr[i] = s.size * 34));
    return arr;
  }, [seeds]);

  useFrame((state, delta) => {
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      const s = seeds[i];
      let y = pos.getY(i) + s.speed * delta;
      let x = pos.getX(i) + Math.sin(state.clock.elapsedTime * 0.4 + s.phase) * s.drift * delta;
      if (y > 5.5) y = -5.5;
      pos.setY(i, y);
      pos.setX(i, x);
    }
    pos.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f2c168"
        size={0.065}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GoldenDust() {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(110 * 3);
    for (let i = 0; i < 110; i++) {
      arr.set(
        [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8 - 3],
        i * 3
      );
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f2951f"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField({ className }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#1c130a', 6, 13]} />
          <ambientLight intensity={0.4} />
          <Bubbles />
          <GoldenDust />
        </Suspense>
      </Canvas>
    </div>
  );
}