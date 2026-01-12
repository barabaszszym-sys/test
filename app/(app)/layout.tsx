import type React from "react"
import { Suspense } from "react"
import { BottomNav } from "@/components/bottom-nav"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>
    </>
  )
}
