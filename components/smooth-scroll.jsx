"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

let smootherInstance = null

export function getSmoother() {
  return smootherInstance
}

export default function SmoothScroll({ children }) {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      smootherInstance = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      })
    })

    return () => {
      smootherInstance = null
      ctx.revert()
    }
  }, [])

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className="overflow-hidden">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  )
}
