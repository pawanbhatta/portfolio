import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import Loader from "../Loader";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <CanvasErrorBoundary
      label="tech ball"
      fallback={
        // Degrade to the flat icon: the tech stack still reads correctly
        // without WebGL.
        <div className="w-full h-full flex justify-center items-center">
          <img src={icon} alt="" className="w-16 h-16 object-contain" />
        </div>
      }
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} />
        </Suspense>

        <Preload all />
      </Canvas>
    </CanvasErrorBoundary>
  );
};

export default BallCanvas;
