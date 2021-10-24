import React from 'react';
import Particles from 'react-particles-js';

const ParticleComponent = () => {
  return (
    <Particles
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: '-1000',
      }}
      params={{
        particles: {
          number: {
            value: 50,
          },
          size: {
            value: 3,
          },
        },
      }}
    />
  );
};

export default ParticleComponent;
