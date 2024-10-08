import { useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelPath from './models/car/scene.gltf';

function Car() {
  // Ensure the correct path is used, considering the 'public' directory
  const gltf = useLoader(GLTFLoader, modelPath);

  useEffect(() => {
    // Set scale and position of the model
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.04, 0);

    // Traverse through the model and set shadows and environment map intensity
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 1;
      }
    });
  }, [gltf]);

  useFrame((state, delta) => {
    let t= state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0];
    group.children[0].rotation.x = t*2;
    group.children[2].rotation.x = t*2;
    group.children[4].rotation.x = t*2;
    group.children[6].rotation.x = t*2;
  })

  return <primitive object={gltf.scene} />;
}

export default Car;
