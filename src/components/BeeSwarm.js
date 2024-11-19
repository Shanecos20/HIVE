// src/components/BeeSwarm.js

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Bee from './Bee';
import './BeeSwarm.css';

const BeeSwarm = () => {
  const [bees, setBees] = useState([]);

  useEffect(() => {
    // Spawn three bees with random initial positions
    const spawnBees = () => {
      const newBees = Array.from({ length: 3 }).map((_, index) => ({
        id: `bee-${Date.now()}-${index}`,
        initialPosition: {
          x: (Math.random() - 0.5) * 5,
          y: Math.random() * 2 + 1,
          z: (Math.random() - 0.5) * 5,
        },
      }));
      setBees(newBees);
    };

    spawnBees();
  }, []);

  return (
    <div className="bee-swarm">
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // Allow interactions with underlying content
        }}
      >
        <ambientLight />
        {bees.map((bee) => (
          <Bee key={bee.id} initialPosition={bee.initialPosition} />
        ))}
      </Canvas>
    </div>
  );
};

export default BeeSwarm;
