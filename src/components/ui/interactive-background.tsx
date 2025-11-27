"use client";

import { useEffect, useRef, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const initPoints = useCallback((width: number, height: number) => {
    // More points for taller pages
    const numPoints = Math.min(Math.floor((width * height) / 15000), 200);
    pointsRef.current = Array.from({ length: numPoints }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getDocumentHeight = () => {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        window.innerHeight
      );
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = getDocumentHeight();
      
      dimensionsRef.current = { width, height };
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPoints(width, height);
    };

    // Initial resize
    resize();
    
    // Resize again after a short delay to catch dynamically loaded content
    const resizeTimeout = setTimeout(resize, 100);

    const handleMouseMove = (e: MouseEvent) => {
      // Convert page coordinates to account for scroll
      mouseRef.current = { x: e.pageX, y: e.pageY };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Use ResizeObserver to detect content changes
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(document.body);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      
      ctx.clearRect(0, 0, width, height);

      const points = pointsRef.current;
      const mouse = mouseRef.current;

      points.forEach((point, i) => {
        // Calculate distance to mouse (using page coordinates)
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Mouse attraction/repulsion
        if (dist < 250 && dist > 0) {
          const force = (250 - dist) / 250;
          point.vx += (dx / dist) * force * 0.08;
          point.vy += (dy / dist) * force * 0.08;
        }

        // Return to base position gently
        point.vx += (point.baseX - point.x) * 0.002;
        point.vy += (point.baseY - point.y) * 0.002;

        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Damping
        point.vx *= 0.95;
        point.vy *= 0.95;

        // Keep in bounds
        if (point.x < 0) point.x = 0;
        if (point.x > width) point.x = width;
        if (point.y < 0) point.y = 0;
        if (point.y > height) point.y = height;

        // Draw connections between nearby points
        for (let j = i + 1; j < points.length; j++) {
          const other = points[j];
          const cdx = other.x - point.x;
          const cdy = other.y - point.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 120) {
            const opacity = (1 - cdist / 120) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(60, 80, 120, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw connection to mouse when nearby
        if (dist < 250) {
          const opacity = (1 - dist / 250) * 0.4;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(60, 80, 120, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw point with glow effect near mouse
        const pointSize = dist < 250 ? 2 + (1 - dist / 250) * 2 : 2;
        const pointOpacity = dist < 250 ? 0.5 + (1 - dist / 250) * 0.5 : 0.3;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(60, 80, 120, ${pointOpacity})`;
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 200
        );
        gradient.addColorStop(0, "rgba(60, 80, 120, 0.15)");
        gradient.addColorStop(0.3, "rgba(50, 70, 110, 0.08)");
        gradient.addColorStop(0.6, "rgba(40, 60, 100, 0.04)");
        gradient.addColorStop(1, "rgba(60, 80, 120, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initPoints]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, top: 0, left: 0 }}
    />
  );
}
