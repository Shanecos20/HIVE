// src/components/PhoneModel.js

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Phone() {
  const { scene } = useGLTF('/models/smartphone.glb');
  return <primitive object={scene} />;
}

const PhoneModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 30 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <Phone />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default PhoneModel;
