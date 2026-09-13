import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Cyberdeck3DSceneProps {
  activeTab: string;
}

export const Cyberdeck3DScene: React.FC<Cyberdeck3DSceneProps> = ({ activeTab }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<string>(activeTab);
  const characterMeshRef = useRef<THREE.Group | null>(null);

  // Keep activeTabRef synchronized
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene, Camera & Renderer Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5EFE6);
    scene.fog = new THREE.FogExp2(0xF5EFE6, 0.035);

    const camera = new THREE.PerspectiveCamera(
      window.innerWidth < 768 ? 60 : 45,
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
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const deskSpotLight = new THREE.SpotLight(0xff923e, 2.5);
    deskSpotLight.position.set(0, 4, 1);
    deskSpotLight.angle = Math.PI / 3;
    deskSpotLight.penumbra = 0.5;
    scene.add(deskSpotLight);

    // 3. Main Scene Container & Texture Loader
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const textureLoader = new THREE.TextureLoader();

    // Load textures for baked 3D models
    const roomBakedTexture = textureLoader.load('/theme-26/models/room/baked.jpg');
    roomBakedTexture.flipY = false;
    roomBakedTexture.colorSpace = THREE.SRGBColorSpace;
    const roomMaterial = new THREE.MeshBasicMaterial({ map: roomBakedTexture });

    const charHeadTexture = textureLoader.load('/theme-26/models/character/head-baked.jpg');
    charHeadTexture.flipY = false;
    charHeadTexture.colorSpace = THREE.SRGBColorSpace;
    const charHeadMaterial = new THREE.MeshBasicMaterial({ map: charHeadTexture });

    const faceTexture = textureLoader.load('/theme-26/models/character/faces/default.png');
    faceTexture.flipY = false;
    faceTexture.colorSpace = THREE.SRGBColorSpace;
    const faceMaterial = new THREE.MeshBasicMaterial({ map: faceTexture, transparent: true });

    // Procedural Fallback Mesh (renders instantly while GLTF loads)
    const fallbackGroup = new THREE.Group();
    
    const deskGeo = new THREE.BoxGeometry(4.5, 0.15, 2.2);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x2b2118, roughness: 0.4 });
    const deskMesh = new THREE.Mesh(deskGeo, deskMat);
    deskMesh.position.set(0, 0.75, 0);
    fallbackGroup.add(deskMesh);

    const monitorGeo = new THREE.BoxGeometry(2.4, 1.4, 0.08);
    const monitorMat = new THREE.MeshStandardMaterial({ color: 0x091434, roughness: 0.2 });
    const monitor = new THREE.Mesh(monitorGeo, monitorMat);
    monitor.position.set(0, 1.75, -0.6);
    fallbackGroup.add(monitor);

    const displayGeo = new THREE.PlaneGeometry(2.3, 1.3);
    const displayMat = new THREE.MeshBasicMaterial({ color: 0x34bfff });
    const display = new THREE.Mesh(displayGeo, displayMat);
    display.position.set(0, 1.75, -0.55);
    fallbackGroup.add(display);

    const laptopGeo = new THREE.BoxGeometry(1.2, 0.05, 0.8);
    const laptopMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const laptop = new THREE.Mesh(laptopGeo, laptopMat);
    laptop.position.set(-0.9, 0.86, 0.4);
    fallbackGroup.add(laptop);

    const chairGeo = new THREE.BoxGeometry(0.9, 0.9, 0.1);
    const chairMat = new THREE.MeshStandardMaterial({ color: 0xff923e });
    const chair = new THREE.Mesh(chairGeo, chairMat);
    chair.position.set(0, 1.2, 1.1);
    fallbackGroup.add(chair);

    mainGroup.add(fallbackGroup);

    // 4. Load GLTF 3D Room & Character Models
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      '/theme-26/models/room/model.glb',
      (gltf) => {
        const roomModel = gltf.scene;
        
        // Apply baked room material to room meshes
        roomModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = roomMaterial;
          }
        });

        // Hide fallback group once actual room model loads
        mainGroup.remove(fallbackGroup);
        mainGroup.add(roomModel);

        // Load character model inside room
        gltfLoader.load(
          '/theme-26/models/character/model.glb',
          (charGltf) => {
            const charModel = charGltf.scene;
            characterMeshRef.current = charModel;

            charModel.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const meshName = child.name.toLowerCase();
                if (meshName.includes('face')) {
                  (child as THREE.Mesh).material = faceMaterial;
                } else {
                  (child as THREE.Mesh).material = charHeadMaterial;
                }
              }
            });

            mainGroup.add(charModel);
          },
          undefined,
          (err) => console.warn('Character model load error:', err)
        );
      },
      undefined,
      (err) => console.warn('Room model load error:', err)
    );

    // 5. Responsive Camera & Window Handling
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const updateResponsiveCamera = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      if (width < 640) {
        camera.fov = 65;
      } else if (width < 1024) {
        camera.fov = 55;
      } else {
        camera.fov = 45;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', updateResponsiveCamera);
    updateResponsiveCamera();

    // 6. Camera Viewport Targets for All Devices
    const getTargetConfig = (tab: string) => {
      const isMobile = window.innerWidth < 768;

      switch (tab) {
        case 'about':
          return isMobile 
            ? { posX: 0, posY: 1.8, posZ: 3.8, lookX: 0, lookY: 1.2, lookZ: 0 }
            : { posX: -1.5, posY: 1.7, posZ: 2.8, lookX: 0, lookY: 1.3, lookZ: 0 };
        case 'work':
          return isMobile
            ? { posX: 0, posY: 2.0, posZ: 3.4, lookX: 0, lookY: 1.5, lookZ: -0.5 }
            : { posX: 0, posY: 1.75, posZ: 2.3, lookX: 0, lookY: 1.6, lookZ: -0.5 };
        case 'contact':
          return isMobile
            ? { posX: 0, posY: 1.4, posZ: 3.0, lookX: 0, lookY: 0.8, lookZ: 0 }
            : { posX: 1.4, posY: 1.1, posZ: 2.0, lookX: 0, lookY: 0.8, lookZ: 0 };
        case 'home':
        default:
          return isMobile
            ? { posX: 0, posY: 3.2, posZ: 8.2, lookX: 0, lookY: 1.0, lookZ: 0 }
            : { posX: 0, posY: 2.8, posZ: 6.5, lookX: 0, lookY: 1.2, lookZ: 0 };
      }
    };

    // 7. Smooth 60 FPS Animation & Idle Character Motion Loop
    let animId: number;
    const currentLookAt = new THREE.Vector3(0, 1.2, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Idle subtle breathing animation for character model so it never looks frozen/stuck
      if (characterMeshRef.current) {
        characterMeshRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.015;
        characterMeshRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.02;
      }

      const target = getTargetConfig(activeTabRef.current);

      // Smooth exponential lerp
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
      window.removeEventListener('resize', updateResponsiveCamera);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} id="main-canvas" className="fixed inset-0 z-0 pointer-events-none" />;
};
