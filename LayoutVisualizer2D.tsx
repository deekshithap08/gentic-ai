import React from 'react';

interface VisualizerProps {
    layout: any;
    showFurniture: boolean;
    currentFloor: number;
    furnitureMap?: any;
}

const LayoutVisualizer2D: React.FC<VisualizerProps> = ({ layout, showFurniture, currentFloor }) => {
    const scale = 5; // Pixels per foot

    // Filter rooms for current floor
    const floorRooms = layout.rooms.filter((r: any) => (r.floor || 0) === currentFloor);

    return (
        <div className="bg-white p-8 overflow-auto flex justify-center items-center min-h-[500px]">
            <div
                className="relative bg-slate-50 border-2 border-slate-300 shadow-inner"
                style={{
                    width: layout.width * scale,
                    height: layout.length * scale
                }}
            >
                {floorRooms.map((room: any) => (
                    <div
                        key={room.id}
                        className="absolute border border-slate-400 flex flex-col items-center justify-center p-2 group transition-all"
                        style={{
                            left: (room.position?.x || 0) * scale,
                            top: (room.position?.y || 0) * scale,
                            width: room.width * scale,
                            height: room.length * scale,
                            backgroundColor: room.color || '#F8FAFC'
                        }}
                    >
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tighter truncate w-full text-center">
                            {room.name}
                        </span>
                        <span className="text-[8px] text-slate-400">
                            {room.width}' x {room.length}'
                        </span>

                        {/* Subtle indication of furniture if enabled (simplified placeholder) */}
                        {showFurniture && (
                            <div className="absolute inset-0 bg-slate-400/5 pointer-events-none border border-slate-900/10 m-1"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LayoutVisualizer2D;
