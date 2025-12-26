"use client";

import React, { useRef, useEffect } from "react";
// @ts-ignore
import { Renderer, Camera, Transform, Program, Mesh, Plane } from "ogl";

type HeroFluidBackgroundProps = {
  hue?: number;
  saturation?: number;
  chroma?: number;
  className?: string;
};

const vertexShader = /* glsl */ `
  precision mediump float;
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform vec2 u_pointer_position;
  uniform float u_scroll_progress;
  uniform float u_hue;
  uniform float u_saturation;
  uniform float u_chroma;

  vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
    vec2 sine_acc = vec2(0.);
    vec2 res = vec2(0.);
    float scale = 8.;

    for (int j = 0; j < 15; j++) {
      uv = rotate(uv, 1.);
      sine_acc = rotate(sine_acc, 1.);
      vec2 layer = uv * scale + float(j) + sine_acc - t;
      sine_acc += sin(layer) + 2.4 * p;
      res += (.5 + .5 * cos(layer)) / scale;
      scale *= (1.2);
    }
    return res.x + res.y;
  }

  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  void main() {
    // usar todo el rango de vUv (sin escalar a .5 para que no parezca recuadro)
    vec2 uv = vUv;
    uv.x *= u_ratio;

    vec2 pointer = vUv - u_pointer_position;
    pointer.x *= u_ratio;
    float p = clamp(length(pointer), 0., 1.);
    p = .5 * pow(1. - p, 2.);

    float t = .001 * u_time;
    vec3 color = vec3(0.);

    float noise = neuro_shape(uv, t, p);
    noise = 1.2 * pow(noise, 3.);
    noise += pow(noise, 10.);
    noise = max(.0, noise - .5);

    // sin recorte radial fuerte, para que llene todo el fondo
    noise *= 1.0;

    float normalizedHue = u_hue / 360.0;
    vec3 hsl = vec3(
      normalizedHue + 0.1 * sin(3.0 * u_scroll_progress + 1.5),
      u_saturation,
      u_chroma * 0.5 + 0.2 * sin(2.0 * u_scroll_progress)
    );

    color = hsl2rgb(hsl);
    color = color * noise;

    gl_FragColor = vec4(color, noise);
  }
`;

export function HeroFluidBackground({
  hue = 200,
  saturation = 0.8,
  chroma = 0.6,
  className,
}: HeroFluidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const meshRef = useRef<Mesh | null>(null);

  const animationRef = useRef<number | null>(null);

  const pointerRef = useRef({
    x: 0,
    y: 0,
    tX: 0,
    tY: 0,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const initOGL = () => {
      if (!canvasRef.current) return;

      const renderer = new Renderer({
        canvas: canvasRef.current,
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
      rendererRef.current = renderer;

      const camera = new Camera(renderer.gl);
      camera.position.z = 1;
      cameraRef.current = camera;

      const scene = new Transform();
      sceneRef.current = scene;

      const geometry = new Plane(renderer.gl);

      const program = new Program(renderer.gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_ratio: { value: window.innerWidth / window.innerHeight },
          u_pointer_position: { value: [0, 0] },
          u_scroll_progress: { value: 0 },
          u_hue: { value: hue },
          u_saturation: { value: saturation },
          u_chroma: { value: chroma },
        },
      });

      const mesh = new Mesh(renderer.gl, { geometry, program });
      mesh.setParent(scene);
      meshRef.current = mesh;
    };

    const resize = () => {
      if (!rendererRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      rendererRef.current.setSize(width, height);
      if (cameraRef.current) {
        cameraRef.current.perspective({
          aspect: width / height,
        });
      }
      if (meshRef.current) {
        meshRef.current.program.uniforms.u_ratio.value = width / height;
      }
    };

    const handlePointer = (x: number, y: number) => {
      pointerRef.current.tX = x;
      pointerRef.current.tY = y;
    };

    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onClick = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);

    const render = () => {
      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      const mesh = meshRef.current;
      if (!renderer || !scene || !camera || !mesh) return;

      const pointer = pointerRef.current;
      pointer.x += (pointer.tX - pointer.x) * 0.2;
      pointer.y += (pointer.tY - pointer.y) * 0.2;

      const uniforms = mesh.program.uniforms;
      uniforms.u_time.value = performance.now();
      uniforms.u_pointer_position.value = [
        pointer.x / window.innerWidth,
        1 - pointer.y / window.innerHeight,
      ];
      uniforms.u_scroll_progress.value =
        window.scrollY / (2 * window.innerHeight);

      renderer.render({ scene, camera });
      animationRef.current = requestAnimationFrame(render);
    };

    initOGL();
    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("click", onClick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("click", onClick);
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      meshRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const uniforms = meshRef.current.program.uniforms;
    uniforms.u_hue.value = hue;
    uniforms.u_saturation.value = saturation;
    uniforms.u_chroma.value = chroma;
  }, [hue, saturation, chroma]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none opacity-95 ${className || ""}`}
    />
  );
}