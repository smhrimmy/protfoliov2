import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CyberMode, CYBER_MODES } from '../types/cyberdeck';

interface Cyberdeck3DSceneProps {
  activeTab: string;
  mode: CyberMode;
}

export const Cyberdeck3DScene: React.FC<Cyberdeck3DSceneProps> = ({ activeTab, mode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modeTokens = CYBER_MODES[mode] || CYBER_MODES['cyber-neon'];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050614, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.5, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.SpotLight(modeTokens.lightColor, 3.5);
    mainLight.position.set(0, 8, 4);
    mainLight.angle = Math.PI / 4;
    mainLight.penumbra = 0.8;
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0xff00ff, 2.5, 12);
    rimLight.position.set(-4, 3, -2);
    scene.add(rimLight);

    // 3. Desk & Workstation 3D Meshes
    const deskGroup = new THREE.Group();

    // Desk Surface
    const deskGeo = new THREE.BoxGeometry(7, 0.25, 3.5);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      roughness: 0.2,
      metalness: 0.8
    });
    const deskMesh = new THREE.Mesh(deskGeo, deskMat);
    deskMesh.position.set(0, -0.125, 0);
    deskGroup.add(deskMesh);

    // Desk Glowing Edge Strip
    const edgeGeo = new THREE.BoxGeometry(7.05, 0.05, 3.55);
    const edgeMat = new THREE.MeshBasicMaterial({
      color: modeTokens.wireframeColor,
      wireframe: true
    });
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
    edgeMesh.position.set(0, -0.1, 0);
    deskGroup.add(edgeMesh);

    // Primary Holographic Monitor Screen
    const monitorFrameGeo = new THREE.BoxGeometry(3.6, 2.2, 0.1);
    const monitorFrameMat = new THREE.MeshStandardMaterial({ color: 0x070a14, roughness: 0.3 });
    const monitorFrame = new THREE.Mesh(monitorFrameGeo, monitorFrameMat);
    monitorFrame.position.set(0, 1.35, -0.8);

    const screenGeo = new THREE.PlaneGeometry(3.4, 2.0);
    const screenMat = new THREE.MeshBasicMaterial({
      color: modeTokens.wireframeColor,
      wireframe: false,
      opacity: 0.15,
      transparent: true
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.35, -0.74);

    deskGroup.add(monitorFrame);
    deskGroup.add(screenMesh);

    // Cyberdeck Laptop
    const laptopBaseGeo = new THREE.BoxGeometry(1.6, 0.08, 1.1);
    const laptopBaseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2 });
    const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopBaseMat);
    laptopBase.position.set(0, 0.04, 0.6);
    deskGroup.add(laptopBase);

    // Keyboard Glow Plate
    const kbGeo = new THREE.PlaneGeometry(1.4, 0.7);
    const kbMat = new THREE.MeshBasicMaterial({
      color: modeTokens.wireframeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.rotation.x = -Math.PI / 2;
    kbMesh.position.set(0, 0.09, 0.65);
    deskGroup.add(kbMesh);

    // Floating Holographic Tech Orbs & Cube Matrix
    const orbGeo = new THREE.IcosahedronGeometry(0.5, 2);
    const orbMat = new THREE.MeshBasicMaterial({
      color: modeTokens.wireframeColor,
      wireframe: true
    });
    const floatingOrb = new THREE.Mesh(orbGeo, orbMat);
    floatingOrb.position.set(2.2, 1.8, -0.2);
    deskGroup.add(floatingOrb);

    const cubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const cubeMat = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true
    });
    const floatingCube = new THREE.Mesh(cubeGeo, cubeMat);
    floatingCube.position.set(-2.2, 1.6, 0.2);
    deskGroup.add(floatingCube);

    scene.add(deskGroup);

    // 4. Ambient 3D Particle Cloud
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = Math.random() * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: modeTokens.wireframeColor,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Parallax Mouse & Target Camera Positions
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Camera target positions based on activeTab
    const getTargetCameraPos = () => {
      switch (activeTab) {
        case 'dossier':
          return { x: 0, y: 1.8, z: 4.5, lookY: 1.4 };
        case 'skills':
          return { x: 2.2, y: 2.2, z: 5.5, lookY: 1.8 };
        case 'projects':
          return { x: 0, y: 3.2, z: 7.2, lookY: 1.0 };
        case 'experience':
          return { x: -2.0, y: 2.0, z: 5.2, lookY: 1.5 };
        case 'contact':
          return { x: 0, y: 1.2, z: 4.2, lookY: 0.5 };
        case 'start':
        default:
          return { x: 0, y: 3.5, z: 9.0, lookY: 1.0 };
      }
    };

    // 6. Animation Loop
    let animId: number;
    const targetPos = getTargetCameraPos();
    const currentPos = { ...camera.position };

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate floating 3D objects
      floatingOrb.rotation.x += 0.008;
      floatingOrb.rotation.y += 0.012;
      floatingCube.rotation.x += 0.01;
      floatingCube.rotation.z += 0.015;

      // Animate particle drift
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] -= 0.003;
        if (positions[i] < 0) positions[i] = 8;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Smooth camera transition toward target view
      const target = getTargetCameraPos();
      currentPos.x += (target.x + mouseX - currentPos.x) * 0.05;
      currentPos.y += (target.y - mouseY - currentPos.y) * 0.05;
      currentPos.z += (target.z - currentPos.z) * 0.05;

      camera.position.set(currentPos.x, currentPos.y, currentPos.z);
      camera.lookAt(0, target.lookY, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeTab, mode]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    />
  );
};
