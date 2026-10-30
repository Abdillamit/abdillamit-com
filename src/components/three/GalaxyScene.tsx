"use client"

import { PerformanceMonitor } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState, type RefObject } from "react"
import * as THREE from "three"

// "Galaxy": three spiral arms of points turning around a warm core. The
// cursor pulls the arms towards it; scrolling the first screen lowers the
// camera into the disc. Shaders are the ones approved on the design canvas.

const ACCENT = "#FFA552"
const BLUE = "#8CC8FF"

const vertexShader = /* glsl */ `
  uniform float uTime, uPixel;
  uniform vec2 uPull;
  attribute float aRadius, aAngle, aSeed;
  varying float vMix, vSeed;
  void main() {
    float a = aAngle + uTime * (0.32 / (aRadius * 0.55 + 0.35));
    vec3 p = vec3(cos(a) * aRadius, position.y, sin(a) * aRadius);
    p.xz += uPull * (1.0 - smoothstep(0.0, 4.5, aRadius)) * 1.4;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.0 + aSeed * 3.5) * uPixel * 4.0 / -mv.z;
    vMix = smoothstep(0.3, 4.5, aRadius);
    vSeed = aSeed;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uA, uB;
  varying float vMix, vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    vec3 core = vec3(1.0, 0.93, 0.82);
    vec3 col = mix(mix(core, uA, smoothstep(0.0, 0.35, vMix)), uB, smoothstep(0.55, 1.0, vMix) * 0.7);
    gl_FragColor = vec4(col, a * (0.55 + vSeed * 0.45));
  }
`

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

// Small seeded random generator (mulberry32): the same galaxy on every
// load, matching the still image, and no Math.random during render
function seeded(seed: number) {
  let value = seed
  return () => {
    value = (value + 0x6d2b79f5) | 0
    let t = Math.imul(value ^ (value >>> 15), 1 | value)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildGeometry(count: number) {
  const random = seeded(7)
  const positions = new Float32Array(count * 3)
  const radius = new Float32Array(count)
  const angle = new Float32Array(count)
  const seed = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const arm = i % 3
    const r = Math.pow(random(), 1.7) * 4.6 + 0.15
    radius[i] = r
    angle[i] =
      (arm / 3) * Math.PI * 2 + r * 1.15 + ((random() - 0.5) * 0.9) / (r * 0.35 + 0.3)
    positions[i * 3 + 1] = (random() - 0.5) * 0.35 * (1.2 - r / 5)
    seed[i] = random()
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute("aRadius", new THREE.BufferAttribute(radius, 1))
  geometry.setAttribute("aAngle", new THREE.BufferAttribute(angle, 1))
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1))
  return geometry
}

type GalaxyProps = {
  count: number
  align: "right" | "center"
  host: RefObject<HTMLDivElement | null>
}

function Galaxy({ count, align, host }: GalaxyProps) {
  const points = useRef<THREE.Points>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const geometry = useMemo(() => buildGeometry(count), [count])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPull: { value: new THREE.Vector2() },
      uA: { value: new THREE.Color(ACCENT) },
      uB: { value: new THREE.Color(BLUE) },
      uPixel: { value: 1 },
    }),
    []
  )
  const input = useRef({
    time: 0,
    progress: 0,
    inside: false,
    mouse: new THREE.Vector2(),
    target: new THREE.Vector2(),
    pull: new THREE.Vector2(),
  })

  useEffect(() => () => geometry.dispose(), [geometry])

  // The cursor is followed over the whole first screen, text included
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const rect = host.current?.getBoundingClientRect()
      if (!rect) return
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      input.current.inside = x >= 0 && x <= 1 && y >= 0 && y <= 1
      input.current.target.set(clamp(x * 2 - 1, -1.2, 1.2), clamp(-(y * 2 - 1), -1.2, 1.2))
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [host])

  useFrame(({ camera, size, gl }, delta) => {
    const state = input.current
    const shader = material.current
    if (!shader) return
    const rect = host.current?.getBoundingClientRect()
    const progress = rect ? clamp(-rect.top / Math.max(rect.height * 0.8, 1), 0, 1) : 0
    state.time += Math.min(delta, 0.05)
    state.mouse.lerp(state.target, 0.08)
    state.progress += (progress - state.progress) * 0.12

    // On wide screens the galaxy moves right, next to the text
    const offsetX = align === "right" && size.width / size.height > 1.3 ? 1.6 : 0
    state.pull.set(
      state.inside ? state.mouse.x * 1.5 : 0,
      state.inside ? -state.mouse.y * 1.5 : 0
    )
    shader.uniforms.uPull.value.lerp(state.pull, 0.06)
    shader.uniforms.uTime.value = state.time
    shader.uniforms.uPixel.value = gl.getPixelRatio()

    if (points.current) points.current.position.x = offsetX
    camera.position.set(
      state.mouse.x * 0.4 + offsetX * 0.5,
      THREE.MathUtils.lerp(3.2, 0.5, state.progress),
      THREE.MathUtils.lerp(6.0, 1.6, state.progress)
    )
    camera.lookAt(offsetX * 0.6, 0, 0)
  })

  return (
    <points ref={points} geometry={geometry} rotation-x={0.35}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

type Props = {
  // Phones: fewer points, lower resolution, no antialiasing
  low: boolean
  align: "right" | "center"
  onReady: () => void
}

export default function GalaxyScene({ low, align, onReady }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const maxDpr = low ? 1.25 : 2
  const [dpr, setDpr] = useState(maxDpr)

  // Sleeps while the first screen is scrolled away or the tab is hidden
  useEffect(() => {
    const element = host.current
    if (!element) return undefined
    let onScreen = true
    const update = () => setVisible(onScreen && !document.hidden)
    const observer = new IntersectionObserver(entries => {
      onScreen = entries[0]?.isIntersecting ?? true
      update()
    })
    observer.observe(element)
    document.addEventListener("visibilitychange", update)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", update)
    }
  }, [])

  return (
    <div ref={host} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, dpr]}
        gl={{ antialias: !low, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 3.2, 6] }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          // Two frames later the scene is on screen: hide the still image
          requestAnimationFrame(() => requestAnimationFrame(onReady))
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(maxDpr)} />
        <Galaxy count={low ? 9000 : 26000} align={align} host={host} />
      </Canvas>
    </div>
  )
}
