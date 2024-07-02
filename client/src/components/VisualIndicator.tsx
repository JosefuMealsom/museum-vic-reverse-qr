import { useEffect, useRef, useState } from "react";

export default function VisualIndicator(props: { shouldAnimate: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawContext, setDrawContext] = useState<CanvasRenderingContext2D>();
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const requestRef = useRef<number>();
  const [squares, setSquares] = useState<{ scale: number; color: string }[]>([
    { scale: 0, color: "#F00" },
    { scale: -0.2, color: "#0F0" },
    { scale: -0.4, color: "#00F" },
    { scale: -0.6, color: "mask" },
  ]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    // Just a little hack so we can resize properly
    setTimeout(() => {
      const context = canvasEl.getContext("2d");

      if (!context) return;

      setDrawContext(context);

      const w = canvasEl.parentElement!.clientWidth;
      const h = canvasEl.parentElement!.clientHeight;

      canvasEl.width = w;
      canvasEl.height = h;

      setDimensions({ width: w, height: h });
    }, 100);
  }, []);

  useEffect(() => {
    if (props.shouldAnimate) {
      setSquares([
        { scale: 0, color: "#F00" },
        { scale: -0.2, color: "#0F0" },
        { scale: -0.4, color: "#00F" },
        { scale: -0.6, color: "mask" },
      ]);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current!);
    }

    return () => {
      cancelAnimationFrame(requestRef.current!);
    };
  }, [props.shouldAnimate]);

  function animate() {
    if (drawContext) {
      const { width: w, height: h } = dimensions;
      drawContext.clearRect(0, 0, w, h);

      for (const s of squares) {
        drawContext.save();
        drawContext.translate(w / 2, h / 2);
        drawContext.scale(Math.max(s.scale, 0), Math.max(s.scale, 0));
        drawContext.translate(-w / 2, -h / 2);
        const { color } = s;

        if (color === "mask") {
          drawContext.globalCompositeOperation = "destination-out";
        } else {
          drawContext.fillStyle = s.color;
        }

        drawContext.fillRect(0, 0, w, h);
        drawContext.restore();

        s.scale += 0.06;
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  }

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} />
    </div>
  );
}
