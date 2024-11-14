// src/components/PhoneModel.js

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Phone() {
  const phoneRef = useRef();

  // Load the GLTF model
  const { scene } = useGLTF('/models/smartphone3.glb');

  // Load the texture for the screen image
  const screenTexture = useTexture('/images/image.png');
  screenTexture.flipY = false; // Fix the upside-down texture issue
  //remove mirror effect
   

  // Oscillate rotation over time
  useFrame(({ clock }) => {
    if (phoneRef.current) {
      const rotationAngle = Math.sin(clock.getElapsedTime()) * 0.1;
      phoneRef.current.rotation.y = rotationAngle;
    }
  });

  useEffect(() => {
    if (scene) {
      const screenMesh = scene.getObjectByName('Screen');
      if (screenMesh) {
        screenMesh.material = new THREE.MeshBasicMaterial({ map: screenTexture });
        screenMesh.material.needsUpdate = true;
        console.log('Screen texture applied with corrected orientation.');
      } else {
        console.warn('Screen mesh not found in the model.');
      }
    }
  }, [scene, screenTexture]);

  return <primitive ref={phoneRef} object={scene} scale={[1.5, 1.5, 1.5]} />;
}

const PhoneModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 65 }}
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
