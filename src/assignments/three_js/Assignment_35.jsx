import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Assignment_35.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Assignment_35() {
  const mountRef = useRef(null);

  useEffect(() => {
    const canvas = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const points = [];
    points.push(new THREE.Vector3(-4.5, -4.0, -1.5));
    points.push(new THREE.Vector3(4.5, -4.0, -1.5));

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    let model = null;
    loader.load(
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf",
      function (gltf) {
        model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, 0);
        scene.add(model);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    camera.position.z = 5;

    let previousTime = 0;

    function animate(currentTime) {
      const delta = currentTime - previousTime;
      const speed = delta / 1000;
      const step = speed * 1;
      cube.rotation.x += step;
      cube.rotation.y += step;

      if (model) {
        model.rotation.y += step;
      }

      renderer.render(scene, camera);
      previousTime = currentTime;
      requestAnimationFrame(animate);
    }
    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div id="title">Cube</div>
      <canvas ref={mountRef} style={{ display: "block" }} />
    </>
  );
}

export default Assignment_35;
