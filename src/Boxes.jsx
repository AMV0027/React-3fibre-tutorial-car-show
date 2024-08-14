import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';

function Box({ color }) {
  const box = useRef();
  const time = useRef(0);
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
  const [position, setPosition] = useState(() => resetPosition());

  useEffect(() => {
    setPosition(resetPosition());
  }, []);

  function resetPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;
    
    return v;
  }

  useFrame((state, delta) => {
    time.current += delta * 1.2;
    let newZ = position.z - time.current;

    if (newZ < -10) {
      setPosition(resetPosition());
      time.current = 0;
    }

    box.current.position.set(position.x, position.y, newZ);
    box.current.rotation.x += delta * xRotSpeed;
    box.current.rotation.y += delta * yRotSpeed;
  });

  return (
    <mesh ref={box} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
}

export function Boxes() {
  const [arr] = useState(() => Array(100).fill(0));

  return (
    <>
      {arr.map((_, i) => (
        <Box key={i} color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />
      ))}
    </>
  );
}
