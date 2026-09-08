import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LowPolyMeshProps {
  rotX: number; // -1 to 1
  rotY: number; // -1 to 1
  isPinching: boolean;
  onWebGLUnsupported?: () => void;
}

export const LowPolyMesh: React.FC<LowPolyMeshProps> = ({ 
  rotX, 
  rotY, 
  isPinching,
  onWebGLUnsupported 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rotTargetRef = useRef({ x: 0, y: 0 });

  // Update target rotation from props
  useEffect(() => {
    rotTargetRef.current = {
      x: rotY * 0.8, // Pitch
      y: rotX * 1.2  // Yaw
    };
  }, [rotX, rotY]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        onWebGLUnsupported?.();
        return;
      }
    } catch (e) {
      onWebGLUnsupported?.();
      return;
    }

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Low-Poly Faceted Mesh (Subdivided Icosahedron for paper-fold geometry)
    const geometry = new THREE.IcosahedronGeometry(2.2, 1);
    
    // Deform vertices slightly to produce organic facial/mask facet planes
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      
      // Elongate into face/head silhouette
      pos.setY(i, vy * 1.25);
      // Pinch jaw/chin
      if (vy < -0.5) {
        pos.setX(i, vx * 0.75);
      }
      // Push nose/brow ridge forward
      if (vz > 0 && Math.abs(vx) < 0.6) {
        pos.setZ(i, vz * 1.15);
      }
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      color: 0x7952ff,
      roughness: 0.35,
      metalness: 0.45,
      flatShading: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Wireframe Cage Accent
    const wireGeo = new THREE.WireframeGeometry(geometry);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.18 });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    mesh.add(wireMesh);

    // 5. Lighting Setup for dramatic facet contrasts
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x7952ff, 3.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00e5ff, 4.0);
    cyanRimLight.position.set(-5, -3, -3);
    scene.add(cyanRimLight);

    const warmFill = new THREE.PointLight(0xff6b81, 2.0, 10);
    warmFill.position.set(0, -4, 3);
    scene.add(warmFill);

    // 6. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (mesh) {
        // Smooth lerp to hand/mouse target
        mesh.rotation.x += (rotTargetRef.current.x - mesh.rotation.x) * 0.08;
        mesh.rotation.y += (rotTargetRef.current.y - mesh.rotation.y) * 0.08;

        // Subtle idle breathing
        mesh.position.y = Math.sin(elapsed * 1.5) * 0.08;

        // Pinch scale effect
        const targetScale = isPinching ? 1.12 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isPinching, onWebGLUnsupported]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};
