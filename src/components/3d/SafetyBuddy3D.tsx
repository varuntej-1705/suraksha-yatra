import React, { useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';
import { Sparkles, AlertTriangle } from 'lucide-react';

// The actual 3D Dog Model Component
const RescueDogModel: React.FC<{ safetyTier: string }> = ({ safetyTier }) => {
  const group = React.useRef<THREE.Group>(null);
  
  // Attempt to load the model - this will throw to Suspense or ErrorBoundary if missing
  const { scene, animations } = useGLTF('/models/rescue_dog.glb');
  const { actions, names } = useAnimations(animations, group);

  // Setup materials for better lighting response
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.envMapIntensity = 1.0;
          mesh.material.roughness = 0.8;
        }
      }
    });
  }, [scene]);

  // Handle animation blending based on safety state
  useEffect(() => {
    if (!actions || names.length === 0) return;

    // Find relevant clips
    const getAction = (keywords: string[]) => {
      const name = names.find(n => keywords.some(k => n.toLowerCase().includes(k)));
      return name ? actions[name] : actions[names[0]]; // fallback to first anim
    };

    const idleAction = getAction(['idle', 'sit', 'breath']);
    const alertAction = getAction(['alert', 'stand', 'look']);
    const runAction = getAction(['run', 'sprint', 'urgent', 'walk']);

    let currentAction = idleAction;

    if (safetyTier === 'SAFE') {
      currentAction = idleAction;
    } else if (safetyTier === 'MODERATE') {
      currentAction = alertAction;
    } else if (safetyTier === 'HIGH' || safetyTier === 'CRITICAL') {
      currentAction = runAction;
    }

    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
      
      return () => {
        currentAction?.fadeOut(0.5);
      };
    }
  }, [safetyTier, actions, names]);

  // Rotate slightly based on state
  useFrame((state, delta) => {
    if (!group.current) return;
    
    if (safetyTier === 'SAFE') {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, 0.05);
    } else if (safetyTier === 'MODERATE') {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y, 
        Math.sin(state.clock.elapsedTime * 2) * 0.3, 
        0.1
      );
    } else {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0.4, 0.1);
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </group>
  );
};

// Error boundary to catch missing model specifically for R3F
class ModelErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1414] border border-[var(--color-critical)]/20 z-10 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--color-critical)]/10 flex items-center justify-center text-[var(--color-critical)] mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-[var(--text-primary)] mb-1">Asset Missing</p>
          <p className="text-[10px] text-[var(--text-muted)]">Please place a valid rescue dog model at:<br/><code className="text-[#F5C84C]">public/models/rescue_dog.glb</code></p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Main Component
export const SafetyBuddy3D: React.FC = () => {
  const { tourist } = useApp();
  const [buddyMessage, setBuddyMessage] = useState<string>('All safety systems nominal. Enjoy your travel in Meghalaya!');

  useEffect(() => {
    if (tourist.safetyTier === 'SAFE') {
      setBuddyMessage("You're currently in a safe area. Enjoy your trip!");
    } else if (tourist.safetyTier === 'MODERATE') {
      setBuddyMessage("Conditions are changing. Please stay alert.");
    } else if (tourist.safetyTier === 'HIGH' || tourist.safetyTier === 'CRITICAL') {
      setBuddyMessage("HIGH-RISK CONDITION DETECTED");
    }
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
              <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-wide">3D SAFETY BUDDY</h3>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">Real-time AI Travel Guardian</p>
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

      <div className="relative w-full h-[220px] flex items-center justify-center rounded-2xl bg-black/20 overflow-hidden">
        <ModelErrorBoundary>
          <Suspense fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10">
              <div className="w-8 h-8 border-2 border-[var(--accent-primary)]/30 border-t-[var(--accent-primary)] rounded-full animate-spin mb-3"></div>
              <p className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest">Loading Neural Asset...</p>
            </div>
          }>
            <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }} shadows className="w-full h-full cursor-grab active:cursor-grabbing">
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 10, 7]} castShadow intensity={1.2} shadow-mapSize={1024} />
              <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#aabbff" />
              
              {/* Dynamic Status Backlight */}
              <pointLight position={[0, 2, -2]} intensity={2} color={getLightColor()} />
              
              <RescueDogModel safetyTier={tourist.safetyTier} />
              
              <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4} />
              <Environment preset="city" />
            </Canvas>
          </Suspense>
        </ModelErrorBoundary>

        <div className="absolute bottom-2 left-2 right-2 p-3 rounded-2xl bg-[var(--bg-secondary)]/90 border border-[var(--panel-border)] backdrop-blur-xl shadow-xl z-20 pointer-events-none">
          <div className="flex items-start gap-2.5">
            <span className="text-base">🐕‍🦺</span>
            <p className="text-xs text-[var(--text-primary)] leading-relaxed font-medium">
              "{buddyMessage}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

useGLTF.preload('/models/rescue_dog.glb');
