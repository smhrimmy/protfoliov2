import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Cyberdeck3DSceneProps {
  activeTab: string;
}

export const Cyberdeck3DScene: React.FC<Cyberdeck3DSceneProps> = ({ activeTab }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<string>(activeTab);

  // Keep activeTabRef up to date without triggering re-render/re-mount of Three.js canvas
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Initialize Three.js Scene, Camera, Renderer ONCE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5EFE6);
    scene.fog = new THREE.FogExp2(0xF5EFE6, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.8, 6.5);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Optimized Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.6);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const deskSpotLight = new THREE.SpotLight(0xff923e, 2.2);
    deskSpotLight.position.set(0, 4, 1);
    deskSpotLight.angle = Math.PI / 3;
    deskSpotLight.penumbra = 0.5;
    scene.add(deskSpotLight);

    // 3. Fallback Procedural Workstation + Persistent GLTF Loader
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Procedural Fallback Mesh (Instant Display)
    const deskGeo = new THREE.BoxGeometry(4.5, 0.15, 2.2);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x2b2118, roughness: 0.4 });
    const deskMesh = new THREE.Mesh(deskGeo, deskMat);
    deskMesh.position.set(0, 0.75, 0);
    deskMesh.receiveShadow = true;
    deskMesh.castShadow = true;
    mainGroup.add(deskMesh);

    const monitorGeo = new THREE.BoxGeometry(2.4, 1.4, 0.08);
    const monitorMat = new THREE.MeshStandardMaterial({ color: 0x091434, roughness: 0.2 });
    const monitor = new THREE.Mesh(monitorGeo, monitorMat);
    monitor.position.set(0, 1.75, -0.6);
    mainGroup.add(monitor);

    const displayGeo = new THREE.PlaneGeometry(2.3, 1.3);
    const displayMat = new THREE.MeshBasicMaterial({ color: 0x34bfff });
    const display = new THREE.Mesh(displayGeo, displayMat);
    display.position.set(0, 1.75, -0.55);
    mainGroup.add(display);

    const laptopGeo = new THREE.BoxGeometry(1.2, 0.05, 0.8);
    const laptopMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const laptop = new THREE.Mesh(laptopGeo, laptopMat);
    laptop.position.set(-0.9, 0.86, 0.4);
    mainGroup.add(laptop);

    const chairGeo = new THREE.BoxGeometry(0.9, 0.9, 0.1);
    const chairMat = new THREE.MeshStandardMaterial({ color: 0xff923e });
    const chair = new THREE.Mesh(chairGeo, chairMat);
    chair.position.set(0, 1.2, 1.1);
    mainGroup.add(chair);

    // Load GLTF Model asynchronously once without clearing canvas prematurely
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/theme-26/models/room/model.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        mainGroup.clear();
        mainGroup.add(model);

        // Load character model into room
        gltfLoader.load('/theme-26/models/character/model.glb', (charGltf) => {
          const charModel = charGltf.scene;
          charModel.position.set(0, 0, 0);
          mainGroup.add(charModel);
        }, undefined, () => {});
      },
      undefined,
      (err) => {
        console.warn('Using procedural 3D room fallback:', err);
      }
    );

    // 4. Smooth Mouse Parallax & Window Resize
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Target Camera Configurations
    const getTargetConfig = (tab: string) => {
      switch (tab) {
        case 'about':
          return { posX: -1.5, posY: 1.7, posZ: 2.8, lookX: 0, lookY: 1.3, lookZ: 0 };
        case 'work':
          return { posX: 0, posY: 1.75, posZ: 2.3, lookX: 0, lookY: 1.6, lookZ: -0.5 };
        case 'contact':
          return { posX: 1.4, posY: 1.1, posZ: 2.0, lookX: 0, lookY: 0.8, lookZ: 0 };
        case 'home':
        default:
          return { posX: 0, posY: 2.8, posZ: 6.5, lookX: 0, lookY: 1.2, lookZ: 0 };
      }
    };

    // 5. Continuous 60 FPS Animation Loop
    let animId: number;
    const currentLookAt = new THREE.Vector3(0, 1.2, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const target = getTargetConfig(activeTabRef.current);

      // Smooth exponential lerp (0.04) for ultra-smooth movement
      camera.position.x += (target.posX + mouseX - camera.position.x) * 0.04;
      camera.position.y += (target.posY - mouseY - camera.position.y) * 0.04;
      camera.position.z += (target.posZ - camera.position.z) * 0.04;

      currentLookAt.x += (target.lookX - currentLookAt.x) * 0.04;
      currentLookAt.y += (target.lookY - currentLookAt.y) * 0.04;
      currentLookAt.z += (target.lookZ - currentLookAt.z) * 0.04;

      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Run ONCE on mount to ensure persistent smooth 3D rendering

  return <div ref={containerRef} id="main-canvas" className="fixed inset-0 z-0 pointer-events-none" />;
};
