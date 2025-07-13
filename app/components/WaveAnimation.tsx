'use client';

import React, { useRef, useEffect } from 'react';

const WAVE_CONFIGS = [
  { amplitude: 60, frequency: 0.02, speed: 0.6, opacity: 0.4, color: 'fill-sky-400', yOffset: 20 },
  { amplitude: 80, frequency: 0.015, speed: 0.8, opacity: 0.35, color: 'fill-blue-500', yOffset: 40 },
  { amplitude: 100, frequency: 0.01, speed: 1, opacity: 0.3, color: 'fill-blue-400', yOffset: 60 },
  { amplitude: 120, frequency: 0.008, speed: 0.7, opacity: 0.25, color: 'fill-cyan-400', yOffset: 80 },
  { amplitude: 140, frequency: 0.006, speed: 0.5, opacity: 0.2, color: 'fill-cyan-300', yOffset: 100 },
];

export default function WaveAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive sizing
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    let running = true;
    startTimeRef.current = null;

    function animate(now: number) {
      if (!running) return;
      if (!svgRef.current) return;
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = (now - startTimeRef.current) / 1000;
      const svg = svgRef.current;
      // Animate waves
      WAVE_CONFIGS.forEach((config, i) => {
        const path = svg.getElementById(`wave-path-${i}`) as SVGPathElement | null;
        if (!path) return;
        const { width, height } = dimensions;
        let pathData = `M 0 ${height / 2 + config.yOffset}`;
        for (let x = 0; x <= width; x += 8) {
          const y =
            height / 2 + config.yOffset +
            Math.sin(x * config.frequency + elapsed * config.speed) * config.amplitude +
            Math.sin(x * config.frequency * 1.8 + elapsed * config.speed * 1.5) * (config.amplitude * 0.6) +
            Math.sin(x * config.frequency * 0.5 + elapsed * config.speed * 0.9) * (config.amplitude * 0.4) +
            Math.cos(x * config.frequency * 2.2 + elapsed * config.speed * 1.2) * (config.amplitude * 0.3);
          pathData += ` L ${x} ${y}`;
        }
        pathData += ` L ${width} ${height} L 0 ${height} Z`;
        path.setAttribute('d', pathData);
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden absolute left-0 top-0">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full block"
        style={{ display: 'block', position: 'absolute', left: 0, top: 0 }}
      >
        {WAVE_CONFIGS.map((config, i) => (
          <path
            key={i}
            id={`wave-path-${i}`}
            className={config.color}
            style={{ opacity: config.opacity, transition: 'opacity 0.3s' }}
            d={`M 0 ${dimensions.height} L 0 ${dimensions.height} L ${dimensions.width} ${dimensions.height} Z`}
          />
        ))}
      </svg>
    </div>
  );
}
