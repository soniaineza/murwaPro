"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CinematicBackgroundProps {
  theme?: "gold" | "emerald" | "purple" | "red";
  particleCount?: number;
  speed?: number;
}

export function CinematicBackground({ theme = "gold", particleCount = 1500, speed = 0.03 }: CinematicBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Theme colors
    const themeColors = {
      gold: { primary: 0xc8a961, secondary: 0xe94560, tertiary: 0xffffff },
      emerald: { primary: 0x10b981, secondary: 0x06b6d4, tertiary: 0xffffff },
      purple: { primary: 0x8b5cf6, secondary: 0xec4899, tertiary: 0xffffff },
      red: { primary: 0xe94560, secondary: 0xc8a961, tertiary: 0xffffff },
    };

    const colors = themeColors[theme];

    // Particles
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(colors.primary);
    const color2 = new THREE.Color(colors.secondary);
    const color3 = new THREE.Color(colors.tertiary);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 12 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      const color = r < 0.4 ? color1 : r < 0.7 ? color2 : color3;
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(200 * 6);
    let lineCount = 0;

    for (let i = 0; i < particleCount && lineCount < 200; i += 10) {
      for (let j = i + 10; j < particleCount && lineCount < 200; j += 10) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 2.5) {
          const idx = lineCount * 6;
          linePositions[idx] = positions[i * 3];
          linePositions[idx + 1] = positions[i * 3 + 1];
          linePositions[idx + 2] = positions[i * 3 + 2];
          linePositions[idx + 3] = positions[j * 3];
          linePositions[idx + 4] = positions[j * 3 + 1];
          linePositions[idx + 5] = positions[j * 3 + 2];
          lineCount++;
        }
      }
    }

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: colors.primary, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 7;

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      particles.rotation.y = elapsed * speed + mouseX * 0.2;
      particles.rotation.x = elapsed * speed * 0.5 + mouseY * 0.15;
      lines.rotation.y = elapsed * speed + mouseX * 0.2;
      lines.rotation.x = elapsed * speed * 0.5 + mouseY * 0.15;

      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < Math.min(particleCount, 80); i++) {
        posAttr.array[i * 3 + 1] += Math.sin(elapsed + i * 0.1) * 0.0008;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [theme, particleCount, speed]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.5 }} />;
}
