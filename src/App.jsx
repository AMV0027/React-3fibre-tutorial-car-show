import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing'; // Ensure BlendFunction is imported
import React, { Suspense } from 'react';
import './App.css';
import { Boxes } from './Boxes';
import Car from './Car';
import Ground from './Ground';
import Ring from './Ring';

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      
      <color args={[0, 0, 0]} attach="background" />
      <ambientLight intensity={0.5} />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <group>
            <Environment map={texture} />
            <Car />
          </group>
        )}
      </CubeCamera>

      <Ring />
      <Boxes />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={260}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 5]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={260}
        angle={0.8}
        penumbra={0.8}
        position={[-5, 5, 5]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />

      <EffectComposer>
        <DepthOfField focusDistance={0.009} focalLength={4} bokehScale={5} height={400} />
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.8}
          width={200}
          height={200}
          kernelSize={4}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <div className='select-none absolute w-screen text-6xl top-10 z-10 text-white font-bold font-teko border-b-2 border-t-2 flex justify-center items-center'>
        <marquee behavior="" direction="">
          <span>3D CAR DEMO</span> <span className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-blue-400'>React Three Fibre</span> <span>AMV</span>
        </marquee>
      </div>
      <Canvas className="fullscreen-canvas">
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
