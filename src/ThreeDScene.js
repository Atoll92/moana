import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const ThreeDScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
      // Create a blue gradient background
      const color1 = new THREE.Color(0x1e4877); // Deep blue
      const color2 = new THREE.Color(0x4584b4); // Lighter blue
      scene.background = new THREE.Color(0x4584b4);
  
      // Apply fog for underwater depth
      scene.fog = new THREE.Fog(color1, 0.15, 100);
  
      // Create gradient texture for background
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = window.innerHeight;
  
      const context = canvas.getContext('2d');
      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, color1.getStyle());
      gradient.addColorStop(1, color2.getStyle());
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      const texture = new THREE.CanvasTexture(canvas);
      scene.background = texture;
  
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
  
      // Add ambient light with a soft blue hue
      const ambientLight = new THREE.AmbientLight(0x204080, 1); // Dim blue light
      scene.add(ambientLight);

      const ambientLight2 = new THREE.AmbientLight(0xffffff, 1); // Ambient light for overall brightness
      scene.add(ambientLight2);
  
      // Add a directional light for highlights
      const directionalLight = new THREE.DirectionalLight(0x88cfff, 0.5); // Soft blue light
      directionalLight.position.set(0, 1, 0.5).normalize();
      scene.add(directionalLight);

      // Load the 3DS model with TDSLoader
      const loader = new TDSLoader();
      loader.setPath('/models/');  // Set the path to your models folder
      loader.load('REALE_L.3DS', (object) => {
        object.scale.set(0.1, 0.1, 0.1); // Scale the model to an appropriate size
        object.rotation.x = 3 * Math.PI /2;
  
        // Apply materials/textures if needed
        object.traverse((child) => {
          if (child.isMesh) {
            child.material.side = THREE.DoubleSide; // Example: Apply DoubleSide to materials
          }
        });
  
        scene.add(object);
      });

    // Set camera position
    camera.position.z = 800;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.0005; // Rotate the scene slowly for a better view
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
