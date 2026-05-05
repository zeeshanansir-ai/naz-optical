'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, X, Loader2 } from 'lucide-react'

interface Props {
  modelUrl: string   // public URL to a .glb file
  productName: string
}

type Status = 'idle' | 'loading' | 'ready' | 'error'

declare global {
  interface Window {
    // Jeeliz injects itself globally
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    JEELIZFACEFILTER: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    JeelizThreeFiberHelper: any
  }
}

export function VirtualTryOn({ modelUrl, productName }: Props) {
  const [open, setOpen]     = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const canvasRef           = useRef<HTMLCanvasElement>(null)
  const destroyRef          = useRef<(() => void) | null>(null)

  function close() {
    setOpen(false)
    destroyRef.current?.()
    destroyRef.current = null
    setStatus('idle')
  }

  useEffect(() => {
    if (!open) return
    setStatus('loading')

    // Dynamically load Jeeliz scripts (avoids bloating main bundle)
    async function init() {
      try {
        if (!window.JEELIZFACEFILTER) {
          await loadScript('https://appstatic.jeeliz.com/faceFilter/jeelizFaceFilter.min.js')
        }

        const canvas = canvasRef.current
        if (!canvas) return

        // Dynamically import Three.js + GLTFLoader
        const THREE   = await import('three')
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

        let scene: InstanceType<typeof THREE.Scene>
        let camera: InstanceType<typeof THREE.PerspectiveCamera>
        let renderer: InstanceType<typeof THREE.WebGLRenderer>
        let glasses: InstanceType<typeof THREE.Object3D> | null = null

        window.JEELIZFACEFILTER.init({
          canvasId: canvas.id,
          NNCPath:  'https://appstatic.jeeliz.com/faceFilter/neuralNets/NN_4EXPR_5/',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          callbackReady(errCode: string | false, _spec: unknown) {
            if (errCode) {
              setStatus('error')
              return
            }

            // Set up Three.js scene
            renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
            renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
            renderer.setPixelRatio(window.devicePixelRatio)

            scene  = new THREE.Scene()
            camera = new THREE.PerspectiveCamera(40, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
            camera.position.z = 5

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
            scene.add(ambientLight)
            const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
            dirLight.position.set(0, 1, 2)
            scene.add(dirLight)

            // Load the glasses model
            const loader = new GLTFLoader()
            loader.load(modelUrl, (gltf) => {
              glasses = gltf.scene
              glasses.scale.set(1.2, 1.2, 1.2)
              scene.add(glasses)
              setStatus('ready')
            }, undefined, () => setStatus('error'))

            // Register the draw callback with Jeeliz
            window.JEELIZFACEFILTER.set_animateCallback(() => {
              if (!glasses) return
              const detection = window.JEELIZFACEFILTER.get_detectionState()
              if (detection.detected) {
                const t = detection.facePose.translation
                const r = detection.facePose.rotation
                glasses.position.set(t[0] * 5, t[1] * 5, t[2] * 5 - 1)
                glasses.rotation.set(r[0], r[1], r[2])
                glasses.visible = true
              } else {
                glasses.visible = false
              }
              renderer.render(scene, camera)
            })
          },
        })

        destroyRef.current = () => {
          window.JEELIZFACEFILTER?.destroy?.()
          renderer?.dispose?.()
        }
      } catch {
        setStatus('error')
      }
    }

    init()
    return () => { destroyRef.current?.() }
  }, [open, modelUrl])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-optical-navy text-optical-navy text-sm font-semibold px-4 py-2 rounded-full hover:bg-optical-navy hover:text-white transition-colors"
      >
        <Camera className="w-4 h-4" />
        Try On
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative bg-black rounded-2xl overflow-hidden w-full max-w-lg">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
              <span className="text-white text-sm font-semibold truncate">{productName}</span>
              <button onClick={close} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Loading overlay */}
            {status === 'loading' && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 gap-3">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <p className="text-white text-sm">Starting camera…</p>
              </div>
            )}

            {status === 'error' && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 gap-3 p-6 text-center">
                <p className="text-white font-semibold">Could not start try-on</p>
                <p className="text-white/60 text-sm">Please allow camera access and try again.</p>
                <button onClick={close} className="text-white border border-white/30 px-4 py-2 rounded-full text-sm hover:bg-white/10">
                  Close
                </button>
              </div>
            )}

            <canvas
              id="jeeliz-canvas"
              ref={canvasRef}
              className="w-full aspect-[4/3] block"
            />

            {status === 'ready' && (
              <p className="absolute bottom-3 left-0 right-0 text-center text-white/60 text-xs">
                Move your face in front of the camera
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload  = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}
