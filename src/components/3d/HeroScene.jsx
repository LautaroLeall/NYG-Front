import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

const HeroScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Asegurar que el fondo del Canvas sea transparente (alpha: true) */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />

        {/* Partículas doradas flotantes simulando gloria/historia cayendo sobre la foto */}
        <Sparkles
          count={300}
          scale={15}
          size={3}
          speed={0.3}
          color="#D4AF37"
          opacity={0.8}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
