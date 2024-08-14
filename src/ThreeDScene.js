import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';  // MTL loader for materials
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const ThreeDScene = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
      // Create a blue gradient background
      const color1 = new THREE.Color(0x1e4877); // Deep blue
      const color2 = new THREE.Color(0x4584b4); // Lighter blue
      scene.background = new THREE.Color(0x4584b4);
  
      // Apply fog for underwater depth
      scene.fog = new THREE.Fog(color1, 100, 500);
  
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

      // const ambientLight2 = new THREE.AmbientLight(0xffffff, 1); // Ambient light for overall brightness
      // scene.add(ambientLight2);
  
      // Add a directional light for highlights
      const directionalLight = new THREE.DirectionalLight(0x88cfff, 0.5); // Soft blue light
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

     

      if (projectId === 'lake-parime') {
    // Load the OBJ model with optional MTLLoader for materials
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    // Load materials if .mtl file exists
    mtlLoader.setPath('/models/');
    mtlLoader.load('lacv1c.mtl', (materials) => {
      materials.preload();  // Preload materials
      objLoader.setMaterials(materials);  // Apply materials to OBJLoader

      objLoader.setPath('/models/');
      objLoader.load('lacv1c.obj', (object) => {
        console.log("OBJ Model loaded:", object); // Check if model loaded correctly

        object.scale.set(100, 100, 100); // Adjust model scale
        // object.rotation.x = Math.PI / 2; // Adjust rotation if needed
        object.position.set(0, -120, 0); // Adjust position to be centered and slightly above the "ground"

        // Apply materials or textures if needed
        object.traverse((child) => {
          if (child.isMesh) {
            console.log("Mesh loaded:", child);
            child.material.side = THREE.DoubleSide;
          }
        });

        scene.add(object);
      });
    }, undefined, (error) => {
      console.error("Error loading MTL file:", error);
    });
  } else {
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
  }

    // Set camera position
    camera.position.z = 180;

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia) for smoother controls
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2; // Prevent the camera from rotating below the horizon
    controls.update();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.0005; // Rotate the scene slowly for a better view

      // Update controls for smooth interaction
      controls.update();

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

    //   // Animation loop
    //   const animate = () => {
    //     requestAnimationFrame(animate);
    //     renderer.render(scene, camera);
    //   };
    //   animate();

    // // Handle window resize
    // const handleResize = () => {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    // };
    // window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeDScene;
