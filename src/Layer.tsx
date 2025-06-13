import React, { useRef, useEffect, useState } from "react";
import "./Layer.css";
import interact from './interact.js';

function Layer({ draggable, hide, debug, src, className, start = [0, 0], size = [1, 1], z = 0, hoverable = true, rotate = 0 }) {
  if (hide) return null;

  const top = start[1] * 100 + "%";
  const left = start[0] * 100 + "%";
  const height = size[1] * 100 + "%";
  const width = size[0] * 100 + "%";

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isOpaque, setIsOpaque] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false); // Ajout de l'état drag
  const [ghostOut, setGhostOut] = useState(false); // Pour l'animation de sortie du ghost

  // Prépare le canvas pour la lecture des pixels
  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (img && canvas) {
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(img, 0, 0);
      };
      if (img.complete) {
        img.onload && img.onload(new Event('load'));
      }
    }
  }, [src]);

  // Mémorise la position d'origine en pixels au montage
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setOrigin({ x: rect.left + window.scrollX, y: rect.top + window.scrollY });
    }
  }, []);

  // Gestion du hover et pointer-events via écoute globale
  useEffect(() => {
    if (!hoverable) {
      setIsHover(false);
      setIsOpaque(true);
      return;
    }
    function onMove(e) {
      const container = containerRef.current;
      const img = imgRef.current;
      const canvas = canvasRef.current;
      if (!container || !img || !canvas) return;
      const rect = container.getBoundingClientRect();
      // Vérifie si la souris est sur cette couche
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        // Position relative à l'image
        const x = ((e.clientX - rect.left) / rect.width) * img.naturalWidth;
        const y = ((e.clientY - rect.top) / rect.height) * img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        const opaque = pixel[3] > 10;
        setIsHover(opaque);
        setIsOpaque(opaque);
      } else {
        setIsHover(false);
        setIsOpaque(true);
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [hoverable]);

  // Ajoute la gestion du drag avec interact.js si draggable
  useEffect(() => {
    if (!draggable) return;
    const container = containerRef.current;
    if (!container) return;
    interact(container).draggable({
      listeners: {
        start (event) {
          setIsDragging(true); // Début du drag
        },
        move (event) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
          target.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          if (x !== 0 || y !== 0) {
            target.style.zIndex = '9999999999';
          } else {
            target.style.zIndex = z;
          }
        },
        end (event) {
          setIsDragging(false); // Fin du drag
          const target = event.target;
          const rect = target.getBoundingClientRect();
          const absX = rect.left + window.scrollX;
          const absY = rect.top + window.scrollY;
          const dx = absX - origin.x;
          const dy = absY - origin.y;
          const snapDistance = 60; // px
          if (Math.sqrt(dx*dx + dy*dy) < snapDistance) {
            target.style.transform = `rotate(${rotate}deg)`;
            target.setAttribute('data-x', 0);
            target.setAttribute('data-y', 0);
            target.style.zIndex = z;
          } else {
            target.style.zIndex = '9999999999';
          }
        },
      },
    });
    return () => {
      interact(container).unset();
    };
  }, [draggable, rotate, z, origin]);

  // Lorsqu'on arrête de drag, on déclenche l'animation de sortie du ghost
  useEffect(() => {
    if (!isDragging && ghostOut) {
      // Si déjà en animation de sortie, ne rien faire
      return;
    }
    if (!isDragging && !ghostOut) {
      setGhostOut(true);
      const timeout = setTimeout(() => {
        setGhostOut(false);
      }, 200); // durée de l'animation de sortie (ms)
      return () => clearTimeout(timeout);
    }
    if (isDragging) {
      setGhostOut(false);
    }
  }, [isDragging]);

  return (
    <>
      {/* Ghost layer à la position d'origine pendant le drag ou l'animation de sortie */}
      {(isDragging || ghostOut) && (
        <div
          className={`image-container ghost${ghostOut && !isDragging ? ' ghost-out' : ''} ${className}`}
          style={{
            left,
            top,
            height,
            width,
            zIndex: z,
            pointerEvents: "none",
            opacity: 0.4,
            position: "absolute",
            transform: `rotate(${rotate}deg)`
          }}
        >
          <img
            src={src}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
      <div
        ref={containerRef}
        className={`image-container ${className} ${hoverable && isHover ? "hover" : ""} ${isActive ? "active" : ""} ${debug ? "debug" : ""} ${draggable ? "draggable" : ""}`}
        style={{
          left,
          top,
          height,
          width,
          zIndex: z,
          pointerEvents: isOpaque ? "auto" : "none",
          transform: `rotate(${rotate}deg)`,
          position: "absolute"
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(false)}
      >
        <img
          ref={imgRef}
          src={src}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </>
  );
}

export default Layer;