import React, { useState, useRef } from "react";
import { MapPin } from "lucide-react";

const points = [1, 2, 3, 4, 5, 6];

const DraggableCanvas: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const start = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    start.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`w-full h-screen overflow-hidden bg-gray-100 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      {/* Draggable Content */}
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        className="relative w-[1200px] h-[400px] flex items-center justify-center"
      >
        {/* Line */}
        <div className="absolute w-full h-1 bg-blue-500" />

        {/* Circles */}
        <div className="flex gap-16 z-10">
          {points.map((_, i) => (
            <div
              key={i}
              className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg"
            >
              <MapPin size={28} color="white" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraggableCanvas;
