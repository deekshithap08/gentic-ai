import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sky, ContactShadows, Environment, Float, Text } from '@react-three/drei';
import { useInteriorTheme } from '../../context/ThemeContext';
import * as THREE from 'three';

interface VisualizerProps {
    layout: any;
    timeOfDay: number;
    showFurniture: boolean;
    furnitureMap: any;
    viewType: 'interior' | 'exterior';
}

const Room3D: React.FC<{ room: any; theme: any; showFurniture: boolean; furniture: any; isInterior: boolean }> = ({ room, theme, showFurniture, furniture, isInterior }) => {
    const { x, y } = room.position || { x: 0, y: 0 };
    const width = room.width;
    const length = room.length;
    const height = 10; // 10ft ceiling height
    const floor = room.floor || 0;
    const thickness = 0.5;

    const position: [number, number, number] = [
        x + width / 2,
        floor * height + 0.1, // Slight offset for floor
        y + length / 2
    ];

    return (
        <group position={position}>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[width, length]} />
                <meshStandardMaterial color={theme.floorColor} roughness={0.7} />
            </mesh>

            {/* Walls */}
            {/* Back Wall */}
            <mesh position={[0, height / 2, -length / 2]} castShadow receiveShadow>
                <boxGeometry args={[width, height, thickness]} />
                <meshStandardMaterial color={theme.wallColor} transparent opacity={isInterior ? 0.7 : 1} />
            </mesh>
            {/* Front Wall */}
            <mesh position={[0, height / 2, length / 2]} castShadow receiveShadow>
                <boxGeometry args={[width, height, thickness]} />
                <meshStandardMaterial color={theme.wallColor} transparent opacity={isInterior ? 0.3 : 1} />
            </mesh>
            {/* Left Wall */}
            <mesh position={[-width / 2, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[thickness, height, length]} />
                <meshStandardMaterial color={theme.wallColor} transparent opacity={isInterior ? 0.7 : 1} />
            </mesh>
            {/* Right Wall */}
            <mesh position={[width / 2, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[thickness, height, length]} />
                <meshStandardMaterial color={theme.wallColor} transparent opacity={isInterior ? 0.3 : 1} />
            </mesh>

            {/* Room Label */}
            {isInterior && (
                <Text
                    position={[0, height + 1, 0]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    rotation={[0, 0, 0]}
                >
                    {room.name}
                </Text>
            )}

            {/* Furniture */}
            {showFurniture && furniture?.furniture?.map((item: any) => (
                <Furniture3D key={item.id} item={item} theme={theme} roomSize={{ width, length }} />
            ))}
        </group>
    );
};

const BuildingRoof: React.FC<{ layout: any; theme: any }> = ({ layout, theme }) => {
    const height = 10;
    const numFloors = Math.max(...layout.rooms.map((r: any) => r.floor || 0)) + 1;
    const totalHeight = numFloors * height;

    return (
        <group position={[layout.width / 2, totalHeight, layout.length / 2]}>
            <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0]} castShadow>
                <coneGeometry args={[layout.width * 0.7, 3, 4]} />
                <meshStandardMaterial color="#475569" />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
                <boxGeometry args={[layout.width, 0.5, layout.length]} />
                <meshStandardMaterial color="#cbd5e1" />
            </mesh>
        </group>
    );
};

const Furniture3D: React.FC<{ item: any; theme: any; roomSize: any }> = ({ item, theme, roomSize }) => {
    const posX = item.position.x - roomSize.width / 2 + item.width / 2;
    const posZ = item.position.y - roomSize.length / 2 + item.length / 2;

    let color = theme.furnitureColor;
    let size: [number, number, number] = [item.width, 2, item.length];

    if (item.type === 'Bed') {
        color = '#E2E8F0';
        size = [item.width, 1.5, item.length];
    } else if (item.type === 'Sofa') {
        color = '#475569';
        size = [item.width, 2.5, item.length];
    }

    return (
        <mesh position={[posX, size[1] / 2, posZ]} rotation={[0, item.rotation || 0, 0]}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

const BlueprintGrid: React.FC<{ width: number; length: number }> = ({ width, length }) => {
    return (
        <gridHelper args={[Math.max(width, length) * 2, 20, '#cbd5e1', '#f1f5f9']} position={[width / 2, 0, length / 2]} />
    );
};

const LayoutVisualizer3D: React.FC<VisualizerProps> = ({ layout, timeOfDay, showFurniture, furnitureMap, viewType }) => {
    const { currentTheme } = useInteriorTheme();
    const isInterior = viewType === 'interior';

    const sunPos = useMemo(() => {
        const angle = (timeOfDay / 24) * Math.PI * 2 - Math.PI / 2;
        return [Math.cos(angle) * 100, Math.sin(angle) * 100, 50] as [number, number, number];
    }, [timeOfDay]);

    return (
        <div className="bg-slate-900 w-full h-[600px] relative">
            <Canvas shadows>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[layout.width * 1.5, layout.width, layout.length * 1.5]} fov={50} />
                    <OrbitControls target={[layout.width / 2, 0, layout.length / 2]} maxPolarAngle={Math.PI / 2.1} />

                    <Sky sunPosition={sunPos} />
                    <Environment preset="city" />

                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={sunPos}
                        intensity={1.5}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[layout.width / 2, -0.1, layout.length / 2]} receiveShadow>
                        <planeGeometry args={[500, 500]} />
                        <meshStandardMaterial color="#f8fafc" />
                    </mesh>

                    <BlueprintGrid width={layout.width} length={layout.length} />

                    <group>
                        {layout.rooms.map((room: any) => (
                            <Room3D
                                key={room.id}
                                room={room}
                                theme={currentTheme}
                                showFurniture={showFurniture}
                                furniture={furnitureMap[room.id]}
                                isInterior={isInterior}
                            />
                        ))}
                        {!isInterior && <BuildingRoof layout={layout} theme={currentTheme} />}
                    </group>

                    <ContactShadows resolution={1024} scale={100} blur={2} opacity={0.5} far={10} color="#000000" />
                </Suspense>
            </Canvas>

            <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 text-[10px] font-bold uppercase text-slate-500">
                    {currentTheme.name} | {viewType.toUpperCase()} VIEW
                </div>
            </div>
        </div>
    );
};

export default LayoutVisualizer3D;
