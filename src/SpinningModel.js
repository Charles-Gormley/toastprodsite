import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function SpinningModel() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3.5;
    camera.position.y = 1.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    let model;
    const modelScale = 30;

    loader.load(
        '/70_microphone/scene.gltf',
        (gltf) => {
          model = gltf.scene;
          model.traverse((child) => {
            if (child.isMesh) {
              // Assuming the model has a MeshStandardMaterial or similar
              child.material.color.set(0xbcbcbc); // A light gray color
      
              // Optional: Increase metalness and roughness for more interaction with light
              child.material.metalness = 1;
              child.material.roughness = 0.4;
              
              // If the material is too dark, you may need to increase emissive intensity
              child.material.emissive = new THREE.Color(0x222222);
              child.material.emissiveIntensity = 1;
            }
          });
          scene.add(model);
          model.position.set(0, 0, 0); // Reset position
          model.scale.set(modelScale, modelScale, modelScale); // Adjust scale if necessary
          console.log('Model loaded successfully');
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
          console.error('An error happened', error);
        }
      );
      
    const lightIntensity = 2000;

    const lightBlue = new THREE.PointLight(0xadd8e6, 1, lightIntensity); // Light blue color
    lightBlue.position.set(-1, 1, 1); // Position it on one side of the origin
    scene.add(lightBlue);

    // Light pink light
    const lightPink = new THREE.PointLight(0xffb6c1, 1, lightIntensity); // Light pink color
    lightPink.position.set(1, -1, -1); // Position it on the opposite side of the origin
    scene.add(lightPink);

    //// Grid
    // const gridHelper = new THREE.GridHelper(10, 10);
    // scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3;
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += 0.00;
      }
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (controls) {
        controls.dispose();
      }
      if (model) scene.remove(model); // Cleanup model from the scene
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height:'80vh'}}
      onMouseDown={(e) => {
        if (controlsRef.current) {
          controlsRef.current.autoRotate = false;
        }
      }}
      onMouseUp={(e) => {
        if (controlsRef.current) {
          controlsRef.current.autoRotate = true;
        }
      }}
    />
  );
}

export default SpinningModel;
