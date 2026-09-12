"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || reduceMotion) return;

    document.body.classList.add("custom-cursor-active");

    function handleMove(e) {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    }

    function handleOver(e) {
      const interactive = e.target.closest(
        "a, button, input, textarea, select, [data-cursor-hover]"
      );
      ringRef.current?.classList.toggle(
        "cursor-ring--active",
        Boolean(interactive)
      );
    }

    let raf;
    function tick() {
      // Ring trails the pointer with a spring-like lag.
      current.current.x += (target.current.x - current.current.x) * 0.2;
      current.current.y += (target.current.y - current.current.y) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    }
    tick();

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
