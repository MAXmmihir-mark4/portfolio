import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Color, Group, Points, Vector3 } from "three";
import { useReducedMotion } from "framer-motion";

function Core({ reduced }: { reduced: boolean }) {
  const core = useRef<Group>(null);
  const stars = useRef<Points>(null);
  const target = useMemo(() => new Vector3(), []);
  const positions = useMemo(() => {
    const p = new Float32Array(4600 * 3);
    for (let i = 0; i < 4600; i++) {
      const y = 1 - (i / 4599) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = i * Math.PI * (3 - Math.sqrt(5));
      const radius = 1.52 + Math.sin(i * 7.19) * 0.035;
      p.set([Math.cos(a) * r * radius, y * radius, Math.sin(a) * r * radius], i * 3);
    }
    return p;
  }, []);
  const dust = useMemo(() => {
    const p = new Float32Array(450 * 3);
    for (let i = 0; i < 450; i++)
      p.set([Math.sin(i * 127.1) * 7, Math.cos(i * 311.7) * 4, Math.sin(i * 74.7) * 4 - 2], i * 3);
    return p;
  }, []);
  const colors = useMemo(() => ({ silver: new Color("#a3bee9"), deep: new Color("#3d75bb") }), []);
  // Three.js accepts sRGB colors; scene palette mirrors the CSS core tokens.
  useFrame(({ pointer, camera, clock }, rawDelta) => {
    if (reduced) return;
    const dt = Math.min(rawDelta, 0.05);
    if (core.current) {
      core.current.rotation.y += dt * 0.12;
      core.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.12;
      core.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.07;
    }
    if (stars.current) stars.current.rotation.z += dt * 0.008;
    target.set(pointer.x * 0.28, pointer.y * 0.18, 6.4);
    camera.position.lerp(target, 1 - Math.exp(-2 * dt));
    camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 5]} intensity={3} />
      <Environment resolution={128}>
        <Lightformer intensity={3} position={[0, 4, 2]} scale={[8, 5, 1]} />
        <Lightformer intensity={2} position={[-4, 0, 2]} scale={[4, 6, 1]} color={colors.silver} />
      </Environment>
      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={colors.deep}
          size={0.018}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
      <group ref={core} rotation={[0.1, 0, -0.2]}>
        <mesh>
          <sphereGeometry args={[1.48, 48, 48]} />
          <meshPhysicalMaterial
            color={colors.silver}
            metalness={0.6}
            roughness={0.32}
            transparent
            opacity={0.11}
            depthWrite={false}
          />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial color={colors.deep} size={0.018} transparent opacity={0.8} />
        </points>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.44, i * 0.65, i * 0.5]}>
            <torusGeometry args={[1.94 + i * 0.15, 0.011, 8, 180]} />
            <meshStandardMaterial color={colors.silver} metalness={0.75} roughness={0.22} />
          </mesh>
        ))}
        <mesh rotation={[1.15, 0.3, 0.1]}>
          <torusGeometry args={[2.46, 0.003, 6, 180]} />
          <meshBasicMaterial color={colors.deep} transparent opacity={0.28} />
        </mesh>
      </group>
    </>
  );
}
export default function Universe() {
  const reduced = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.4], fov: 43 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={reduced ? "demand" : "always"}
      aria-label="Rotating particle AI core with orbital rings"
    >
      <Core reduced={!!reduced} />
    </Canvas>
  );
}
