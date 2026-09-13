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
    subtitle: 'Bio, Skills & Philosophy',
    position: new THREE.Vector3(-10, 0, -8),
    color: 0x3b82f6 // Blue highlight
  },
  {
    id: 'gallery',
    name: 'The Gallery',
    subtitle: 'Selected Featured Projects',
    position: new THREE.Vector3(10, 0, -8),
    color: 0x10b981 // Emerald green highlight
  },
  {
    id: 'office',
    name: 'Office Tower',
    subtitle: 'Career Timeline & Roles',
    position: new THREE.Vector3(0, 0, 0),
    color: 0xffb703 // Signature Amber highlight
  },
  {
    id: 'archive',
    name: 'The Archive',
    subtitle: 'Blog & Technical Writings',
    position: new THREE.Vector3(-10, 0, 8),
    color: 0x8b5cf6 // Purple highlight
  },
  {
    id: 'signal',
    name: 'Signal Tower',
    subtitle: 'Contact & Broadcast Station',
    position: new THREE.Vector3(10, 0, 8),
    color: 0xef4444 // Red/Amber signal beacon
  }
];

interface DistrictCanvas3DProps {
  activeBuilding: BuildingId | null;
  onSelectBuilding: (id: BuildingId) => void;
  isDuskMode?: boolean;
}

export const DistrictCanvas3D: React.FC<DistrictCanvas3DProps> = ({
  activeBuilding,
  onSelectBuilding
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<BuildingId | null>(null);

  // Store active building ref for animation frame loop access without re-binding listeners
  const activeBuildingRef = useRef(activeBuilding);
  useEffect(() => {
    activeBuildingRef.current = activeBuilding;
  }, [activeBuilding]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d111a);
    scene.fog = new THREE.FogExp2(0x0d111a, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    const initialCamPos = new THREE.Vector3(26, 26, 26);
    const initialLookAt = new THREE.Vector3(0, 0, 0);

    camera.position.copy(initialCamPos);
    camera.lookAt(initialLookAt);

    // Current camera target position and lookAt vector for lerp smooth dolly
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
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x232d3f, 1.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffb703, 2.5);
    directionalLight.position.set(20, 35, 15);
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

    const fillLight = new THREE.DirectionalLight(0x3b82f6, 1.0);
    fillLight.position.set(-20, 15, -15);
    scene.add(fillLight);

    // Ground Plane with grid texture
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x161b26,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid lines on ground
    const gridHelper = new THREE.GridHelper(60, 30, 0xffb703, 0x223046);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Buildings parent group & lookup map for raycasting
    const buildingMeshes: Map<BuildingId, THREE.Group> = new Map();
    const raycastTargets: THREE.Mesh[] = [];

    // Beacon mesh light ref for animation loop
    let beaconLight: THREE.PointLight | null = null;
    let beaconMesh: THREE.Mesh | null = null;

    // Build the 5 Buildings
    BUILDINGS.forEach((bInfo) => {
      const bGroup = new THREE.Group();
      bGroup.position.copy(bInfo.position);

      if (bInfo.id === 'office') {
        // Office Tower (Center Skyscraper)
        const baseGeo = new THREE.BoxGeometry(6, 18, 6);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.3,
          metalness: 0.7
        });
        const mainBuilding = new THREE.Mesh(baseGeo, baseMat);
        mainBuilding.position.y = 9;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Windows rows grid on tower
        const windowMat = new THREE.MeshStandardMaterial({
          color: 0xffb703,
          emissive: 0xffb703,
          emissiveIntensity: 0.8
        });
        for (let y = 3; y < 16; y += 2.5) {
          for (let x = -2; x <= 2; x += 2) {
            const win = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.1), windowMat);
            win.position.set(x, y, 3.05);
            bGroup.add(win);
            const winBack = win.clone();
            winBack.position.set(x, y, -3.05);
            bGroup.add(winBack);
          }
        }
      } else if (bInfo.id === 'studio') {
        // Studio Building (Low-rise architectural block)
        const bodyGeo = new THREE.BoxGeometry(7, 6, 7);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x273549,
          roughness: 0.4,
          metalness: 0.5
        });
        const mainBuilding = new THREE.Mesh(bodyGeo, bodyMat);
        mainBuilding.position.y = 3;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Glass overhang roof studio
        const glassGeo = new THREE.BoxGeometry(7.5, 0.8, 7.5);
        const glassMat = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          emissive: 0x1d4ed8,
          emissiveIntensity: 0.5,
          roughness: 0.2
        });
        const glassRoof = new THREE.Mesh(glassGeo, glassMat);
        glassRoof.position.y = 6.4;
        bGroup.add(glassRoof);
      } else if (bInfo.id === 'gallery') {
        // Gallery Building (Modern art pavilion)
        const mainGeo = new THREE.BoxGeometry(8, 7, 6);
        const mainMat = new THREE.MeshStandardMaterial({
          color: 0x1f2937,
          roughness: 0.5,
          metalness: 0.4
        });
        const mainBuilding = new THREE.Mesh(mainGeo, mainMat);
        mainBuilding.position.y = 3.5;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Glowing art portal frames
        const frameGeo = new THREE.BoxGeometry(4, 4, 0.2);
        const frameMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x10b981,
          emissiveIntensity: 0.9
        });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.position.set(0, 3.5, 3.1);
        bGroup.add(frame);
      } else if (bInfo.id === 'archive') {
        // Archive Building (Library Vault)
        const vaultGeo = new THREE.CylinderGeometry(4, 4, 8, 8);
        const vaultMat = new THREE.MeshStandardMaterial({
          color: 0x2e1065,
          roughness: 0.6,
          metalness: 0.3
        });
        const mainBuilding = new THREE.Mesh(vaultGeo, vaultMat);
        mainBuilding.position.y = 4;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Vault ring glow
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          emissive: 0xa855f7,
          emissiveIntensity: 0.8
        });
        const ring = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.2, 8, 16), ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 5;
        bGroup.add(ring);
      } else if (bInfo.id === 'signal') {
        // Signal Tower (Comms mast with glowing beacon)
        const baseGeo = new THREE.BoxGeometry(5, 5, 5);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0x3f0f16,
          roughness: 0.4,
          metalness: 0.6
        });
        const mainBuilding = new THREE.Mesh(baseGeo, baseMat);
        mainBuilding.position.y = 2.5;
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        mainBuilding.userData = { buildingId: bInfo.id };
        bGroup.add(mainBuilding);
        raycastTargets.push(mainBuilding);

        // Antenna Spire
        const spireGeo = new THREE.CylinderGeometry(0.2, 0.6, 12, 8);
        const spireMat = new THREE.MeshStandardMaterial({
          color: 0x64748b,
          metalness: 0.9,
          roughness: 0.2
        });
        const spire = new THREE.Mesh(spireGeo, spireMat);
        spire.position.y = 11;
        bGroup.add(spire);

        // Glowing Signal Beacon at tip
        const beaconGeo = new THREE.SphereGeometry(0.8, 16, 16);
        const beaconMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xef4444,
          emissiveIntensity: 1.5
        });
        beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
        beaconMesh.position.y = 17;
        bGroup.add(beaconMesh);

        beaconLight = new THREE.PointLight(0xef4444, 3, 15);
        beaconLight.position.y = 17;
        bGroup.add(beaconLight);
      }

      scene.add(bGroup);
      buildingMeshes.set(bInfo.id, bGroup);
    });

    // Environmental Particles (Floating Evening Dust)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 50;
      particlePos[i + 1] = Math.random() * 25 + 1;
      particlePos[i + 2] = (Math.random() - 0.5) * 50;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffb703,
      size: 0.3,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Raycaster & Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastTargets);

      if (intersects.length > 0) {
        const hitBuildingId = intersects[0].object.userData.buildingId as BuildingId;
        if (hitBuildingId) {
          setHoveredBuilding(hitBuildingId);
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
        const hitBuildingId = intersects[0].object.userData.buildingId as BuildingId;
        if (hitBuildingId) {
          onSelectBuilding(hitBuildingId);
        }
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('click', onClick);

    // Resize Handler
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

      // Animate Signal Beacon Pulse
      if (beaconLight && beaconMesh) {
        const pulse = Math.sin(elapsedTime * 4) * 0.5 + 1;
        beaconLight.intensity = pulse * 3.5;
        (beaconMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 1.5;
      }

      // Animate Particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] -= 0.02;
        if (positions[i] < 0) positions[i] = 25;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Camera Lerp Dolly Logic based on active building state
      const currentActive = activeBuildingRef.current;
      if (currentActive) {
        const targetB = BUILDINGS.find((b) => b.id === currentActive);
        if (targetB) {
          // Dolly close to selected building
          targetCamPos.set(targetB.position.x + 10, targetB.position.y + 10, targetB.position.z + 10);
          targetLookAt.copy(targetB.position);
        }
      } else {
        // Wide establishing shot
        targetCamPos.copy(initialCamPos);
        targetLookAt.copy(initialLookAt);
      }

      camera.position.lerp(targetCamPos, 0.05);
      currentLookAt.lerp(targetLookAt, 0.05);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
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
  }, [onSelectBuilding]);

  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Building Hover Overlay Label */}
      {hoveredBuilding && !activeBuilding && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <div className="district-glass-amber px-6 py-3 rounded-full border border-[#ffb703]/50 shadow-2xl flex items-center gap-3 animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb703] animate-ping" />
            <span className="district-heading text-sm font-semibold tracking-wider text-[#ffb703] uppercase">
              {BUILDINGS.find((b) => b.id === hoveredBuilding)?.name} — Click to Enter Room
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
