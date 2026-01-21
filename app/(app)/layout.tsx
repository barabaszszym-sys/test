import type React from "react"
import { Suspense } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { MobileFrame } from "@/components/mobile-frame"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileFrame>
      <div className="min-h-full pb-20">
        {children}
      </div>
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>
    </MobileFrame>
  )
}
