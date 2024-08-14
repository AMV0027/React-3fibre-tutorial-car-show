import { MeshReflectorMaterial } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { RepeatWrapping, TextureLoader } from 'three';

// Import your texture files
import TextDiffuse from './materials/road/ThreeLaneRoadWet01_1K_BaseColor.png';
import TextNormal from './materials/road/ThreeLaneRoadWet01_1K_Normal.png';
import TextRoughness from './materials/road/ThreeLaneRoadWet01_1K_Roughness.png';

function Ground() {
  // Load textures using useLoader
  const [baseColor, roughness, normal] = useLoader(TextureLoader, [
    TextDiffuse,
    TextRoughness,
    TextNormal
  ]);

  useEffect(() => {
    // Set wrapping and repeat properties for the textures
    [baseColor, roughness, normal].forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(5, 5);
      texture.rotation = 80.1;
    });

    // Ensure correct encoding for the normal map
    normal.encoding = THREE.LinearEncoding;
  }, [baseColor, roughness, normal]);

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime() * 0.128;
    roughness.offset.set(t, 0);
    normal.offset.set(t, 0);
    baseColor.offset.set(t, 0);
  });

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        dithering={true}
        map={baseColor}  // Base color map (diffuse)
        normalMap={normal}  // Normal map
        normalScale={[0.3, 0.3]}  // Reduced normal scale for a more subtle effect
        roughnessMap={roughness}  // Roughness map
        color={[0.02, 0.02, 0.02]}  // Slightly darker color
        roughness={1}  // Increased roughness for less shininess
        blur={[300, 700]}
        mixBlur={8}
        mixStrength={10}
        mixContrast={1}
        resolution={1024 + 1024}
        mirror={0}
        depthScale={0.5}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}

export default Ground;
