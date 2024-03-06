/**
 * @file And audio visualizer using three.js adapted from a number of examples and resources online.
 *
 * @see The original inspiration: 3D sphere audio visualizer.
 * {@link https://codepen.io/prakhar625/pen/zddKRj Codepen}
 *
 * @see An article showing how to use React and the Web Audio API.
 * {@link https://dev.to/ssk14/visualizing-audio-as-a-waveform-in-react-o67}
 *
 * @see Dynamic audio-reactive visuals with particles in three.js.
 * {@link https://tympanus.net/codrops/2023/12/19/creating-audio-reactive-visuals-with-dynamic-particles-in-three-js/}
 */

import { useState, useEffect } from "react";
import * as THREE from "three";
import { createNoise2D, createNoise3D } from "simplex-noise"

// The following are helpers for the 3D sphere audio visualizer.
const fractionate = (arg: number, min: number, max: number) => (arg - min) / (max - min);

const modulate = (
  arg: number,
  min: number,
  max: number,
  outMin: number,
  outMax: number
) => {
  const fr = fractionate(arg, min, max);
  const delta = outMax - outMin;
  return outMin + (fr * delta);
}

const avg = (arr: Uint8Array) => arr.reduce((sum, val) => sum += val) / arr.length;

// Adapted from the 3D sphere audio visualizer
const visualize = (analyzer: AnalyserNode, height: number, width: number) => {
  const scene = new THREE.Scene();
  const group = new THREE.Group()
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  camera.position.z = 100;
  camera.lookAt(scene.position);

  const noise2D = createNoise2D();
  const noise3D = createNoise3D();

  const planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x6904ce,
    side: THREE.DoubleSide,
    wireframe: true
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, 30, 0);
  group.add(plane);

  const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
  plane2.rotation.x = -0.5 * Math.PI;
  plane2.position.set(0, -30, 0);
  group.add(plane2);

  const icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
  const lambertMaterial = new THREE.MeshLambertMaterial({
    color: 0xff00ee,
    wireframe: true
  });

  const ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  ball.position.set(0, 0, 0);
  group.add(ball);

  const ambientLight = new THREE.AmbientLight(0xaaaaaa);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.intensity = 0.9;
  spotLight.position.set(-10, 40, 20);
  spotLight.lookAt(ball.position);
  spotLight.castShadow = true;
  scene.add(spotLight);

  scene.add(group);

  const bufwidth = analyzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufwidth);

  // FIXME: this uses deprecated APIs and will not work on the latest version
  // of three.js
  const makeRoughBall = (mesh: THREE.Mesh, bassFr: number, treFr: number, time: number) => {
    // mesh.geometry.vertices.forEach((vertex, i) => {
    //   const offset = mesh.geometry.parameters.radius;
    //   const amp = 7;
    //   vertex.normalize();
    //   const rf = 0.00001;
    //   const distance = (offset + bassFr) + noise3D(vertex.x + time * rf * 7, vertex.y + time * rf * 8, vertex.z + time * rf * 9) * amp * treFr;
    //   vertex.multiplyScalar(distance);
    // });
    // mesh.geometry.verticesNeedUpdate = true;
    // mesh.geometry.normalsNeedUpdate = true;
    // mesh.geometry.computeVertexNormals();
    // mesh.geometry.computeTangents();
  }

  // FIXME: this uses deprecated APIs and will not work on the latest version
  // of three.js
  const makeRoughGround = (mesh: THREE.Mesh, distortionFr: number, time: number) => {
    // mesh.geometry.vertices.forEach(function(vertex, i) {
    //   const amp = 2;
    //   const distance = (noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
    //   vertex.z = distance;
    // });
    // mesh.geometry.verticesNeedUpdate = true;
    // mesh.geometry.normalsNeedUpdate = true;
    // mesh.geometry.computeVertexNormals();
    // mesh.geometry.computeFaceNormals();
  }

  const animate = (time: DOMHighResTimeStamp = performance.now()) => {
    analyzer.getByteFrequencyData(dataArray);

    const lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
    const upperHalfArray = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

    const overallAvg = avg(dataArray);
    const lowerMax = Math.max(...lowerHalfArray);
    const lowerAvg = avg(lowerHalfArray);
    const upperMax = Math.max(...upperHalfArray);
    const upperAvg = avg(upperHalfArray);

    const lowerMaxFr = lowerMax / lowerHalfArray.length;
    const lowerAvgFr = lowerAvg / lowerHalfArray.length;
    const upperMaxFr = upperMax / upperHalfArray.length;
    const upperAvgFr = upperAvg / upperHalfArray.length;

    group.rotation.y += 0.05

    makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 4), time);
    makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4), time);
    makeRoughBall(
      ball,
      modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
      modulate(upperAvgFr, 0, 1, 0, 4),
      time
    );

    renderer.render(scene, camera);
    requestAnimationFrame(animate)
  }

  animate();
};

type Props = {
  height?: number,
  width?: number,
  analyzer: AnalyserNode
}

export default function AudioVisualizer({ analyzer, height = 100, width = 100 }: Props) {
  "use client";

  return (
    <span>Audio player initialized!</span>
  )
}
