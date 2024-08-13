import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';


const ThreeDScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambient light for overall brightness
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light for shadows and depth
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);


    // Add a 3D model (example: a simple cube)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

      // Load the 3DS model with TDSLoader
      const loader = new TDSLoader();
      loader.setPath('/models/');  // Set the path to your models folder
      loader.load('REALE_L.3DS', (object) => {
        object.scale.set(0.1, 0.1, 0.1); // Scale the model to an appropriate size
  
        // Apply materials/textures if needed
        object.traverse((child) => {
          if (child.isMesh) {
            child.material.side = THREE.DoubleSide; // Example: Apply DoubleSide to materials
          }
        });
  
        scene.add(object);
      });

    // Set camera position
    camera.position.z = 500;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.005; // Rotate the scene slowly for a better view
        renderer.render(scene, camera);
      };
      animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeDScene;
