// src/components/PhoneModel.js

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Phone() {
  const { scene } = useGLTF('/models/smartphone.glb');
  const phoneRef = useRef();

  // Oscillate rotation over time
  useFrame(({ clock }) => {
    if (phoneRef.current) {
      const rotationAngle = Math.sin(clock.getElapsedTime()) * 0.1; // Adjust the 0.1 to increase/decrease rotation angle
      phoneRef.current.rotation.y = rotationAngle;
    }
  });

  useEffect(() => {
    const screenMesh = scene.getObjectByName('');
    if (screenMesh) {
      screenMesh.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      screenMesh.material.needsUpdate = true;
      console.log('Screen material changed to green');
    } else {
      console.warn('Screen mesh not found in the model.');
    }
  }, [scene]);

  return <primitive ref={phoneRef} object={scene} scale={[1.5, 1.5, 1.5]} />;
}

const PhoneModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 80 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <Phone />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default PhoneModel;
