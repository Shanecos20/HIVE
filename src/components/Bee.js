// src/components/Bee.js

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Bee({ initialPosition }) {
  const { scene, animations } = useGLTF('/models/bee2.glb');
  const { actions, mixer } = useAnimations(animations, scene);
  const beeRef = useRef();
  const targetRef = useRef(generateRandomTarget()); // Use useRef for target
  const speed = 0.02; // Adjust speed as needed

  useEffect(() => {
    if (scene) {
      // Scale down the bee model
      scene.scale.set(0.1, 0.1, 0.1);
      // Set initial position
      scene.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
      // Assign ref
      beeRef.current = scene;
    }

    if (animations.length > 0) {
      // Get the first animation action
      const actionName = Object.keys(actions)[0];
      const action = actions[actionName];

      // Calculate start time based on frame rate
      const frameRate = 24; // Replace with your actual frame rate
      const startFrame = 60;
      const startTime = startFrame / frameRate;

      // Set the action's time to start at the desired frame
      action.reset();
      action.play();
      action.time = startTime;

      // Optionally, clamp the animation to only play the desired frames
      action.setLoop(THREE.LoopRepeat, Infinity); // Loop indefinitely
      action.clampWhenFinished = true;
      action.setEffectiveTimeScale(1);

      // Optionally, set the action's end time to stop at frame 120
      const endFrame = 120;
      const endTime = endFrame / frameRate;

      // In the animation loop, check and reset the time if it exceeds endTime
      mixer.addEventListener('loop', () => {
        if (action.time >= endTime) {
          action.time = startTime;
        }
      });
    }
  }, [scene, actions, animations, initialPosition, mixer]);

  useFrame(() => {
    if (beeRef.current) {
      const beePosition = beeRef.current.position;

      // Calculate direction to the target
      const direction = new THREE.Vector3(
        targetRef.current.x - beePosition.x,
        targetRef.current.y - beePosition.y,
        targetRef.current.z - beePosition.z
      );

      // Move towards the target
      if (direction.length() > 0.1) {
        direction.normalize().multiplyScalar(speed); // Control speed
        beeRef.current.position.add(direction);

        // Rotate the bee to face the target
        beeRef.current.lookAt(targetRef.current.x, targetRef.current.y, targetRef.current.z);
      } else {
        // Generate a new random target when the bee reaches the current one
        targetRef.current = generateRandomTarget();
      }
    }
  });

  return <primitive object={scene} />;
}

// Helper function to generate random target positions
function generateRandomTarget() {
  return {
    x: (Math.random() - 0.5) * 10,
    y: Math.random() * 2 + 1,
    z: (Math.random() - 0.5) * 10,
  };
}

export default Bee;
