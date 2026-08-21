"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    const goldColor = new THREE.Color(0xc8a961);
    const accentColor = new THREE.Color(0xe94560);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      // Spread particles in a sphere
      const radius = Math.random() * 15 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Color variation: gold, white, accent
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.4) color = goldColor;
      else if (colorChoice < 0.6) color = accentColor;
      else color = whiteColor;

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create connecting lines (constellation effect)
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(300 * 6); // 300 lines max
    let lineCount = 0;

    for (let i = 0; i < particlesCount && lineCount < 300; i += 8) {
      for (let j = i + 8; j < particlesCount && lineCount < 300; j += 8) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 3) {
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
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc8a961,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 8;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      particles.rotation.y = elapsed * 0.05 + mouseX * 0.3;
      particles.rotation.x = elapsed * 0.02 + mouseY * 0.2;

      lines.rotation.y = elapsed * 0.05 + mouseX * 0.3;
      lines.rotation.x = elapsed * 0.02 + mouseY * 0.2;

      // Subtle floating motion
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < Math.min(particlesCount, 100); i++) {
        const i3 = i * 3;
        posAttr.array[i3 + 1] += Math.sin(elapsed + i * 0.1) * 0.001;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
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
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
