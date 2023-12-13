import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function SpinningWheel() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set white background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 1.6;
    camera.position.y = .4;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Cube setup
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0x777777 }); // Lighter gray cube
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Lighting setup
    const lightIntensity = 2
    const light = new THREE.SpotLight(0xffffff, lightIntensity);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true; // Enable auto rotation
    controls.autoRotateSpeed = 5; // Adjust rotation speed
    controlsRef.current = controls;

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update(); // Only required if controls.enableDamping = true or autoRotate = true
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();

    // Cleanup on unmount
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (controls) {
        controls.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%',}}
      onMouseDown={(e) => {
        // When the mouse is pressed, disable auto-rotation
        if (controlsRef.current) {
          controlsRef.current.autoRotate = false;
        }
      }}
      onMouseUp={(e) => {
        // When the mouse is released, enable auto-rotation
        if (controlsRef.current) {
          controlsRef.current.autoRotate = true;
        }
      }}
    />
  );
}

export default SpinningWheel;
