import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type BuildingId = 'studio' | 'gallery' | 'archive' | 'office' | 'signal';

export interface BuildingInfo {
  id: BuildingId;
  name: string;
  subtitle: string;
  position: THREE.Vector3;
  color: number;
}

export const BUILDINGS: BuildingInfo[] = [
  {
    id: 'studio',
    name: 'The Studio',
    subtitle: 'Storefront • Bio & Skills',
    position: new THREE.Vector3(-10, 0, -8),
    color: 0xF5A65B // Warm Amber
  },
  {
    id: 'gallery',
    name: 'The Gallery',
    subtitle: 'Glass Structure • Projects',
    position: new THREE.Vector3(10, 0, -8),
    color: 0x3B82F6 // Glass Blue
  },
  {
    id: 'office',
    name: 'The Office Tower',
    subtitle: 'Tallest Skyscraper • Career',
    position: new THREE.Vector3(0, 0, 0),
    color: 0x8B8FD9 // Lavender / Slate
  },
  {
    id: 'archive',
    name: 'The Archive',
    subtitle: 'Brick Vault • Writings',
    position: new THREE.Vector3(-10, 0, 8),
    color: 0xA855F7 // Archive Purple
  },
  {
    id: 'signal',
    name: 'The Signal Tower',
    subtitle: 'Thin Spire • Contact',
    position: new THREE.Vector3(10, 0, 8),
    color: 0xEF4444 // Red Signal Beacon
  }
];

interface DistrictCanvas3DProps {
  activeBuilding: BuildingId | null;
  onSelectBuilding: (id: BuildingId) => void;
  onTransitioningChange?: (isTransitioning: boolean) => void;
}

export const DistrictCanvas3D: React.FC<DistrictCanvas3DProps> = ({
  activeBuilding,
  onSelectBuilding,
  onTransitioningChange
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<BuildingId | null>(null);

  // Store refs to access in animation loop without listener re-binding
  const activeBuildingRef = useRef(activeBuilding);
  const hoveredBuildingRef = useRef(hoveredBuilding);
  const mouseOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    activeBuildingRef.current = activeBuilding;
  }, [activeBuilding]);

  useEffect(() => {
    hoveredBuildingRef.current = hoveredBuilding;
  }, [hoveredBuilding]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0E1330); // Palette Option A: Deep Navy
    scene.fog = new THREE.FogExp2(0x0E1330, 0.014);

    // 3/4 Isometric Perspective Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    const initialCamPos = new THREE.Vector3(26, 26, 26);
    const initialLookAt = new THREE.Vector3(0, 0, 0);

    camera.position.copy(initialCamPos);
    camera.lookAt(initialLookAt);

    // Camera target position & lookAt vectors for 900ms eased dolly
    const targetCamPos = new THREE.Vector3().copy(initialCamPos);
    const currentLookAt = new THREE.Vector3().copy(initialLookAt);
    const targetLookAt = new THREE.Vector3().copy(initialLookAt);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0x232E52, 1.8);
    scene.add(ambientLight);

    // Palette A: Soft Lavender Rim Light (#8B8FD9) & Warm Amber Directional Light (#F5A65B)
    const directionalLight = new THREE.DirectionalLight(0xF5A65B, 2.6);
    directionalLight.position.set(22, 36, 18);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -25;
    directionalLight.shadow.camera.right = 25;
    directionalLight.shadow.camera.top = 25;
    directionalLight.shadow.camera.bottom = -25;
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0x8B8FD9, 1.2);
    rimLight.position.set(-20, 18, -18);
    scene.add(rimLight);

    // Ground Plane with grid rhythm
    const groundGeo = new THREE.PlaneGeometry(65, 65);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x141A3D,
      roughness: 0.85,
      metalness: 0.15
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(65, 32, 0xF5A65B, 0x222C54);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Lookup structures for raycasting and building lift animations
    const buildingGroups: Map<BuildingId, THREE.Group> = new Map();
    const raycastTargets: THREE.Mesh[] = [];
    const cyclingWindowMats: THREE.MeshStandardMaterial[] = [];

    let beaconLight: THREE.PointLight | null = null;
    let beaconMesh: THREE.Mesh | null = null;

    // Construct the 5 Buildings
    BUILDINGS.forEach((bInfo) => {
      const bGroup = new THREE.Group();
      bGroup.position.copy(bInfo.position);
      bGroup.userData = { initialY: bInfo.position.y };

      if (bInfo.id === 'studio') {
        // 1. The Studio (Small storefront, warm window light)
        const bodyGeo = new THREE.BoxGeometry(7, 5.5, 7);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x242D54,
          roughness: 0.45,
          metalness: 0.4
        });
        const mainBuilding = new THREE.Mesh(bodyGeo, bodyMat);
        mainBuilding.position.y = 2.75;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Storefront Canopy / Warm Window Light
        const windowMat = new THREE.MeshStandardMaterial({
          color: 0xF5A65B,
          emissive: 0xF5A65B,
          emissiveIntensity: 0.9
        });
        cyclingWindowMats.push(windowMat);

        const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(5, 2.5, 0.15), windowMat);
        windowMesh.position.set(0, 2.2, 3.55);
        bGroup.add(windowMesh);

        const awning = new THREE.Mesh(
          new THREE.BoxGeometry(6, 0.4, 1.5),
          new THREE.MeshStandardMaterial({ color: 0xF5A65B, roughness: 0.3 })
        );
        awning.position.set(0, 3.8, 4.0);
        bGroup.add(awning);
      } else if (bInfo.id === 'gallery') {
        // 2. The Gallery (Tall glass-fronted structure)
        const mainGeo = new THREE.BoxGeometry(8, 9, 6.5);
        const mainMat = new THREE.MeshStandardMaterial({
          color: 0x1C2548,
          roughness: 0.3,
          metalness: 0.6
        });
        const mainBuilding = new THREE.Mesh(mainGeo, mainMat);
        mainBuilding.position.y = 4.5;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Glass Front Panel
        const glassMat = new THREE.MeshStandardMaterial({
          color: 0x3B82F6,
          emissive: 0x1D4ED8,
          emissiveIntensity: 0.6,
          roughness: 0.1,
          transparent: true,
          opacity: 0.85
        });
        const glassFront = new THREE.Mesh(new THREE.BoxGeometry(7, 7.5, 0.2), glassMat);
        glassFront.position.set(0, 4.5, 3.35);
        bGroup.add(glassFront);
      } else if (bInfo.id === 'archive') {
        // 3. The Archive (Narrow brick tower, stacked windows)
        const vaultGeo = new THREE.BoxGeometry(5.5, 12, 5.5);
        const vaultMat = new THREE.MeshStandardMaterial({
          color: 0x32224A,
          roughness: 0.7,
          metalness: 0.2
        });
        const mainBuilding = new THREE.Mesh(vaultGeo, vaultMat);
        mainBuilding.position.y = 6;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Stacked windows
        const windowMat = new THREE.MeshStandardMaterial({
          color: 0x8B8FD9,
          emissive: 0x8B8FD9,
          emissiveIntensity: 0.7
        });
        cyclingWindowMats.push(windowMat);

        for (let y = 2; y <= 10; y += 2.2) {
          const win = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.1), windowMat);
          win.position.set(0, y, 2.8);
          bGroup.add(win);
        }
      } else if (bInfo.id === 'office') {
        // 4. The Office Tower (Tallest structure, floor-by-floor lit windows)
        const towerGeo = new THREE.BoxGeometry(6.5, 20, 6.5);
        const towerMat = new THREE.MeshStandardMaterial({
          color: 0x1B2342,
          roughness: 0.35,
          metalness: 0.65
        });
        const mainBuilding = new THREE.Mesh(towerGeo, towerMat);
        mainBuilding.position.y = 10;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Floor-by-floor lit windows
        const windowMat = new THREE.MeshStandardMaterial({
          color: 0xF5A65B,
          emissive: 0xF5A65B,
          emissiveIntensity: 0.85
        });
        cyclingWindowMats.push(windowMat);

        for (let y = 3; y < 18; y += 2.8) {
          for (let x = -2; x <= 2; x += 2) {
            const win = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 0.1), windowMat);
            win.position.set(x, y, 3.3);
            bGroup.add(win);
            const winBack = win.clone();
            winBack.position.set(x, y, -3.3);
            bGroup.add(winBack);
          }
        }
      } else if (bInfo.id === 'signal') {
        // 5. The Signal Tower (Thin spire, blinking beacon)
        const baseGeo = new THREE.BoxGeometry(5, 5, 5);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0x451A24,
          roughness: 0.5,
          metalness: 0.5
        });
        const mainBuilding = new THREE.Mesh(baseGeo, baseMat);
        mainBuilding.position.y = 2.5;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Thin spire antenna
        const spireGeo = new THREE.CylinderGeometry(0.15, 0.5, 14, 8);
        const spireMat = new THREE.MeshStandardMaterial({
          color: 0x8B8FD9,
          metalness: 0.8,
          roughness: 0.2
        });
        const spire = new THREE.Mesh(spireGeo, spireMat);
        spire.position.y = 12;
        bGroup.add(spire);

        // Blinking Signal Beacon at tip
        const beaconGeo = new THREE.SphereGeometry(0.7, 16, 16);
        const beaconMat = new THREE.MeshStandardMaterial({
          color: 0xEF4444,
          emissive: 0xEF4444,
          emissiveIntensity: 1.6
        });
        beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
        beaconMesh.position.y = 19;
        bGroup.add(beaconMesh);

        beaconLight = new THREE.PointLight(0xEF4444, 3.5, 18);
        beaconLight.position.y = 19;
        bGroup.add(beaconLight);
      }

      scene.add(bGroup);
      buildingGroups.set(bInfo.id, bGroup);
    });

    // Sparse low-opacity particle drift (dust/snow)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 55;
      particlePos[i + 1] = Math.random() * 28 + 1;
      particlePos[i + 2] = (Math.random() - 0.5) * 55;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8B8FD9,
      size: 0.25,
      transparent: true,
      opacity: 0.45
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Raycaster & Pointer Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      // Mouse Parallax Drift (±5°)
      mouseOffsetRef.current = {
        x: mouse.x * 2.5,
        y: mouse.y * 2.5
      };

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastTargets);

      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.buildingId as BuildingId;
        if (hitId) {
          setHoveredBuilding(hitId);
          container.style.cursor = 'pointer';
          return;
        }
      }

      setHoveredBuilding(null);
      container.style.cursor = 'default';
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastTargets);

      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.buildingId as BuildingId;
        if (hitId) {
          if (onTransitioningChange) onTransitioningChange(true);
          onSelectBuilding(hitId);
        }
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('click', onClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // 1. Signal Tower Beacon Pulse
      if (beaconLight && beaconMesh) {
        const pulse = Math.sin(elapsedTime * 3.5) * 0.5 + 1;
        beaconLight.intensity = pulse * 4.0;
        (beaconMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 1.8;
      }

      // 2. Slow Window Light Color Cycle (Warm #F5A65B <-> Cool #8B8FD9)
      cyclingWindowMats.forEach((mat, idx) => {
        const cycle = Math.sin(elapsedTime * 0.8 + idx) * 0.5 + 0.5;
        mat.emissiveIntensity = 0.6 + cycle * 0.4;
      });

      // 3. Sparse Particle Drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] -= 0.015;
        if (positions[i] < 0) positions[i] = 28;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // 4. Hover Lift (lifts 4px / +0.4 Y-axis in 3D)
      const currentHover = hoveredBuildingRef.current;
      BUILDINGS.forEach((bInfo) => {
        const group = buildingGroups.get(bInfo.id);
        if (group) {
          const isHovered = currentHover === bInfo.id;
          const targetY = isHovered ? 0.4 : 0;
          group.position.y += (targetY - group.position.y) * 0.1;
        }
      });

      // 5. 900ms Eased Camera Push-in Dolly & Mouse Parallax
      const currentActive = activeBuildingRef.current;
      if (currentActive) {
        const targetB = BUILDINGS.find((b) => b.id === currentActive);
        if (targetB) {
          targetCamPos.set(targetB.position.x + 9, targetB.position.y + 9, targetB.position.z + 9);
          targetLookAt.copy(targetB.position);
        }
      } else {
        // Wide establishing shot with mouse parallax (±5°)
        const offset = mouseOffsetRef.current;
        targetCamPos.set(initialCamPos.x + offset.x, initialCamPos.y + offset.y, initialCamPos.z);
        targetLookAt.copy(initialLookAt);
      }

      camera.position.lerp(targetCamPos, 0.06);
      currentLookAt.lerp(targetLookAt, 0.06);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectBuilding, onTransitioningChange]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      {/* Building Hover Overlay Label */}
      {hoveredBuilding && !activeBuilding && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-all duration-300">
          <div className="district-glass-amber px-6 py-3 rounded-full border border-[#F5A65B]/60 shadow-2xl flex items-center gap-3 animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A65B] animate-ping" />
            <span className="district-heading text-sm font-semibold tracking-wider text-[#F5A65B] uppercase">
              {BUILDINGS.find((b) => b.id === hoveredBuilding)?.name} — Click to Enter
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
