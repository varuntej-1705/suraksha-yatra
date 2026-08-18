import React, { useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';
import { Sparkles } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

// Procedural 3D Robot Pet Component matching reference image
const RobotPetModel: React.FC<{ safetyTier: string }> = ({ safetyTier }) => {
  const group = React.useRef<THREE.Group>(null);
  const headRef = React.useRef<THREE.Group>(null);
  
  const getLightColor = () => {
    if (safetyTier === 'CRITICAL' || safetyTier === 'HIGH') return '#ff3030';
    if (safetyTier === 'MODERATE') return '#f5c84c';
    return '#00f0ff'; // Cyan for safe to match image
  };

  useFrame((state) => {
    if (!group.current || !headRef.current) return;
    
    // Smooth hovering animation
    group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.3;

    // Head tracking and frantic movement based on safety tier
    if (safetyTier === 'SAFE') {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(state.clock.elapsedTime) * 0.15, 0.05);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, Math.sin(state.clock.elapsedTime * 0.5) * 0.05, 0.05);
    } else if (safetyTier === 'MODERATE') {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(state.clock.elapsedTime * 4) * 0.3, 0.1);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.05);
    } else {
      // Frantic emergency movement
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(state.clock.elapsedTime * 15) * 0.4, 0.2);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, Math.sin(state.clock.elapsedTime * 10) * 0.2, 0.2);
    }
  });

  return (
    <group ref={group} scale={1.4}>
      {/* Robot Body */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow scale={[1.1, 1, 1]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.55, 0]} castShadow receiveShadow scale={[1.1, 1, 1]}>
        <cylinderGeometry args={[0.3, 0.2, 0.3, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.7, 0]} castShadow receiveShadow scale={[1.1, 1, 1]}>
        <sphereGeometry args={[0.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
      </mesh>

      {/* Chest panel outline (glowing) */}
      <mesh position={[0, -0.48, 0.29]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
        <planeGeometry args={[0.38, 0.3]} />
        <meshBasicMaterial color={getLightColor()} />
      </mesh>
      <mesh position={[0, -0.48, 0.295]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
        <planeGeometry args={[0.36, 0.28]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.45, -0.35, 0]} rotation={[0, 0, -Math.PI / 8]} castShadow>
        <capsuleGeometry args={[0.06, 0.25, 16, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh position={[0.45, -0.35, 0]} rotation={[0, 0, Math.PI / 8]} castShadow>
        <capsuleGeometry args={[0.06, 0.25, 16, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
      </mesh>
      
      {/* Robot Head */}
      <group ref={headRef} position={[0, 0.2, 0]}>
        {/* Head Base */}
        <mesh castShadow receiveShadow scale={[1.4, 0.9, 1.1]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
        </mesh>
        
        {/* Visor Screen (Black face) */}
        <mesh position={[0, 0.02, 0.25]} scale={[1.2, 0.75, 1]}>
          <sphereGeometry args={[0.33, 32, 16, 0, Math.PI, 0, Math.PI / 2.2]} />
          <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Eyes (Glowing) */}
        <mesh position={[-0.15, 0.05, 0.58]} rotation={[-0.05, -0.1, 0]}>
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial color={getLightColor()} />
        </mesh>
        <mesh position={[0.15, 0.05, 0.58]} rotation={[-0.05, 0.1, 0]}>
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial color={getLightColor()} />
        </mesh>

        {/* Mouth (Glowing slit) */}
        <mesh position={[0, -0.12, 0.59]} rotation={[-0.1, 0, 0]}>
          <planeGeometry args={[0.08, 0.02]} />
          <meshBasicMaterial color={getLightColor()} />
        </mesh>
        
        {/* Head Side Pods / Ears */}
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
        </mesh>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
        </mesh>

        {/* Top Antenna Bases */}
        <mesh position={[-0.2, 0.32, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
        </mesh>
        <mesh position={[0.2, 0.32, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
        </mesh>

        {/* Black Antenna Stems near ears */}
        <mesh position={[-0.42, 0.25, 0]} rotation={[0, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2]} />
          <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0.42, 0.25, 0]} rotation={[0, 0, 0.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2]} />
          <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
      
      {/* Square-ish Anti-gravity hover ring */}
      <mesh position={[0, -0.85, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[0.25, 0.015, 4, 4]} />
        <meshBasicMaterial color={getLightColor()} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[0.3, 0.008, 4, 4]} />
        <meshBasicMaterial color={getLightColor()} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// Main Component
export const SafetyBuddy3D: React.FC = () => {
  const { tourist, setIsSosModalOpen } = useApp();
  const [buddyMessage, setBuddyMessage] = useState<string>('All safety systems nominal. Enjoy your travel in Meghalaya!');

  useEffect(() => {
    if (tourist.safetyTier === 'SAFE') {
      setBuddyMessage("You're currently in a safe area. Enjoy your trip!");
    } else if (tourist.safetyTier === 'MODERATE') {
      setBuddyMessage("Conditions are changing. Please stay alert.");
    } else if (tourist.safetyTier === 'HIGH' || tourist.safetyTier === 'CRITICAL') {
      setBuddyMessage("HIGH-RISK CONDITION DETECTED. PLEASE USE SOS IMMEDIATELY.");
    }

    // High risk alarm logic
    let interval: NodeJS.Timeout;
    if (tourist.safetyTier === 'HIGH' || tourist.safetyTier === 'CRITICAL') {
      interval = setInterval(() => {
        soundEffects.playEmergencyBeacon();
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tourist.safetyTier]);

  const getStatusBorder = () => {
    if (tourist.safetyTier === 'CRITICAL') return 'border-[var(--color-critical)]/50 shadow-[var(--color-critical)]/15';
    if (tourist.safetyTier === 'HIGH') return 'border-[var(--color-high)]/40 shadow-[var(--color-high)]/15';
    if (tourist.safetyTier === 'MODERATE') return 'border-[var(--color-moderate)]/30 shadow-[var(--color-moderate)]/15';
    return 'border-white/10';
  };

  const getLightColor = () => {
    if (tourist.safetyTier === 'CRITICAL' || tourist.safetyTier === 'HIGH') return '#ff4d4d';
    if (tourist.safetyTier === 'MODERATE') return '#f5c84c';
    return '#4ade80';
  };

  return (
    <div id="safety-buddy-card" className={`rounded-3xl glass-panel border transition-all duration-300 p-5 sm:p-6 relative overflow-hidden shadow-xl ${getStatusBorder()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--color-safe)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-wide">AI SAFETY DRONE</h3>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">Real-time Autonomous Guardian</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
          <div className={`w-2 h-2 rounded-full ${
            tourist.safetyTier === 'CRITICAL' ? 'bg-[var(--color-critical)] animate-ping' :
            tourist.safetyTier === 'HIGH' ? 'bg-[var(--color-high)]' :
            tourist.safetyTier === 'MODERATE' ? 'bg-[var(--color-moderate)]' : 'bg-[var(--color-safe)]'
          }`} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{
            color: getLightColor()
          }}>
            {tourist.safetyTier}
          </span>
        </div>
      </div>

      <div className="relative w-full h-[260px] flex items-center justify-center rounded-2xl bg-black/20 overflow-hidden group">
        <Canvas camera={{ position: [0, 0.8, 4.5], fov: 45 }} shadows className="w-full h-full cursor-grab active:cursor-grabbing">
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 7]} castShadow intensity={1.2} shadow-mapSize={1024} />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#aabbff" />
          
          <pointLight position={[0, 2, -2]} intensity={2} color={getLightColor()} />
          
          <RobotPetModel safetyTier={tourist.safetyTier} />
          
          <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          <Environment preset="city" />
        </Canvas>

        {(tourist.safetyTier === 'HIGH' || tourist.safetyTier === 'CRITICAL') && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <button 
              onClick={() => setIsSosModalOpen(true)}
              className="px-6 py-3 bg-[var(--color-critical)] text-white font-bold rounded-full shadow-[0_0_30px_var(--color-critical)] animate-pulse border-2 border-white/30 tracking-widest text-sm hover:scale-105 transition-transform"
            >
              TRIGGER SOS
            </button>
          </div>
        )}

        <div className="absolute bottom-2 left-2 right-2 p-3 rounded-2xl bg-[var(--bg-secondary)]/90 border border-[var(--panel-border)] backdrop-blur-xl shadow-xl z-20 pointer-events-none">
          <div className="flex items-start gap-2.5">
            <span className="text-base">🤖</span>
            <p className="text-xs text-[var(--text-primary)] leading-relaxed font-medium">
              "{buddyMessage}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
