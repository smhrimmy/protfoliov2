import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PersonaCityCanvasProps {
  isNight: boolean;
  weather: 'sunny' | 'rain' | 'snow';
  activeSection: string;
  onBuildingSelect: (section: string) => void;
}

export const PersonaCityCanvas: React.FC<PersonaCityCanvasProps> = ({
  isNight,
  weather,
  activeSection,
  onBuildingSelect
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isNightRef = useRef(isNight);
  const weatherRef = useRef(weather);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => { isNightRef.current = isNight; }, [isNight]);
  useEffect(() => { weatherRef.current = weather; }, [weather]);
  useEffect(() => { activeSectionRef.current = activeSection; }, [activeSection]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const bgDay = new THREE.Color(0xF6F5F2);
    const bgNight = new THREE.Color(0x10162E);
    scene.background = isNight ? bgNight : bgDay;

    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 1000);
    camera.position.set(22, 24, 28);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(
      isNight ? 0x223355 : 0xffffff,
      isNight ? 0.8 : 1.4
    );
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(
      isNight ? 0x6688cc : 0xfffaed,
      isNight ? 0.9 : 1.8
    );
    sunLight.position.set(15, 25, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // 3. Ground City Base & Grid Layout
    const groundGeo = new THREE.BoxGeometry(26, 0.4, 26);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x1B2340 : 0xE7E4DD,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.set(0, -0.2, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // Street Road Markings
    const roadGeo = new THREE.PlaneGeometry(24, 24);
    const roadMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x121A2E : 0xD7D5CF,
      roughness: 0.9
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.01;
    scene.add(road);

    // 4. 3D City Buildings & Interactive Hotspots
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    interface BuildingData {
      name: string;
      id: string;
      posX: number;
      posZ: number;
      width: number;
      height: number;
      depth: number;
      color: number;
      accentColor: number;
    }

    const buildings: BuildingData[] = [
      { id: 'hero', name: 'Persona Studio HQ', posX: -5, posZ: -4, width: 4.5, height: 7, depth: 4.5, color: 0xFDCA3D, accentColor: 0xE8B520 },
      { id: 'projects', name: 'Project Showcase Tower', posX: 4.5, posZ: -5, width: 4, height: 9.5, depth: 4, color: 0x34BFFF, accentColor: 0x2D88DD },
      { id: 'skills', name: 'Engineering Lab', posX: -5.5, posZ: 4.5, width: 4, height: 5.5, depth: 4, color: 0xFF6B6B, accentColor: 0xE04848 },
      { id: 'whiteboard', name: 'Interactive Whiteboard Pavilion', posX: 4.5, posZ: 4.5, width: 4.2, height: 4.8, depth: 4.2, color: 0x51CF66, accentColor: 0x37B24D },
      { id: 'contact', name: 'Contact Station', posX: 0, posZ: 0, width: 3.5, height: 4, depth: 3.5, color: 0xCC5DE8, accentColor: 0xB197FC }
    ];

    const buildingMeshes: { mesh: THREE.Mesh; id: string; material: THREE.MeshStandardMaterial }[] = [];

    buildings.forEach((b) => {
      const bGeo = new THREE.BoxGeometry(b.width, b.height, b.depth);
      const bMat = new THREE.MeshStandardMaterial({
        color: b.color,
        roughness: 0.3,
        metalness: 0.2
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(b.posX, b.height / 2, b.posZ);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      bMesh.userData = { id: b.id, name: b.name };

      // Add roof crown
      const roofGeo = new THREE.BoxGeometry(b.width * 0.85, 0.6, b.depth * 0.85);
      const roofMat = new THREE.MeshStandardMaterial({ color: b.accentColor });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = b.height / 2 + 0.3;
      bMesh.add(roof);

      // Add glowing windows for night mode
      for (let i = 0; i < 4; i++) {
        const windowGeo = new THREE.PlaneGeometry(0.6, 0.6);
        const windowMat = new THREE.MeshBasicMaterial({
          color: isNight ? 0xFFE58A : 0xFFFFFF,
          transparent: true,
          opacity: 0.85
        });
        const win = new THREE.Mesh(windowGeo, windowMat);
        win.position.set((i % 2 === 0 ? 0.8 : -0.8), (i < 2 ? 1 : -1), b.depth / 2 + 0.01);
        bMesh.add(win);
      }

      cityGroup.add(bMesh);
      buildingMeshes.push({ mesh: bMesh, id: b.id, material: bMat });
    });

    // 5. Weather Systems (Rain & Snow Particles)
    const particleCount = 400;
    const rainGeo = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      rainPositions[i] = (Math.random() - 0.5) * 30;
      rainPositions[i + 1] = Math.random() * 25;
      rainPositions[i + 2] = (Math.random() - 0.5) * 30;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));

    const rainMat = new THREE.PointsMaterial({
      color: 0x89CFF0,
      size: 0.15,
      transparent: true,
      opacity: 0.7
    });
    const weatherParticles = new THREE.Points(rainGeo, rainMat);
    scene.add(weatherParticles);

    // 6. Raycasting & Mouse Hover Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingMeshes.map(b => b.mesh));

      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    };

    const handlePointerClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingMeshes.map(b => b.mesh));

      if (intersects.length > 0) {
        const hitBuilding = intersects[0].object;
        if (hitBuilding.userData?.id) {
          onBuildingSelect(hitBuilding.userData.id);
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('click', handlePointerClick);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Target Camera positions per active section
    const getCameraTarget = (sec: string) => {
      switch (sec) {
        case 'projects': return { x: 12, y: 15, z: 12, lookX: 4.5, lookY: 4, lookZ: -5 };
        case 'skills': return { x: -12, y: 14, z: 18, lookX: -5.5, lookY: 3, lookZ: 4.5 };
        case 'whiteboard': return { x: 12, y: 14, z: 18, lookX: 4.5, lookY: 2.5, lookZ: 4.5 };
        case 'contact': return { x: 8, y: 12, z: 8, lookX: 0, lookY: 2, lookZ: 0 };
        case 'hero':
        default: return { x: 22, y: 24, z: 28, lookX: 0, lookY: 2, lookZ: 0 };
      }
    };

    // 7. 60 FPS Animation Loop
    let animId: number;
    const currentLookAt = new THREE.Vector3(0, 2, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Update background and lighting dynamically if night changes
      scene.background = isNightRef.current ? bgNight : bgDay;
      ambientLight.color.setHex(isNightRef.current ? 0x223355 : 0xffffff);

      // Weather Particles Animation
      if (weatherRef.current !== 'sunny') {
        weatherParticles.visible = true;
        const positions = weatherParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < particleCount * 3; i += 3) {
          positions[i] -= weatherRef.current === 'rain' ? 0.35 : 0.1;
          if (positions[i] < 0) positions[i] = 25;
        }
        weatherParticles.geometry.attributes.position.needsUpdate = true;
      } else {
        weatherParticles.visible = false;
      }

      // Smooth Camera Transition Lerp
      const targetCam = getCameraTarget(activeSectionRef.current);
      camera.position.x += (targetCam.x - camera.position.x) * 0.04;
      camera.position.y += (targetCam.y - camera.position.y) * 0.04;
      camera.position.z += (targetCam.z - camera.position.z) * 0.04;

      currentLookAt.x += (targetCam.lookX - currentLookAt.x) * 0.04;
      currentLookAt.y += (targetCam.lookY - currentLookAt.y) * 0.04;
      currentLookAt.z += (targetCam.lookZ - currentLookAt.z) * 0.04;

      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('click', handlePointerClick);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0" />;
};
