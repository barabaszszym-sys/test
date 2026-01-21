"use client"

import type React from "react"

interface MobileFrameProps {
  children: React.ReactNode
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-start justify-center py-8 px-4">
      {/* Phone Frame */}
      <div className="relative">
        {/* Phone outer frame */}
        <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          {/* Phone inner bezel */}
          <div className="bg-black rounded-[2.5rem] p-1 relative">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />
            
            {/* Screen */}
            <div 
              className="bg-white rounded-[2.25rem] overflow-hidden relative"
              style={{ width: "320px", height: "693px" }}
            >
              {/* Status bar simulation */}
              <div className="h-12 bg-white flex items-end justify-between px-8 pb-1 relative z-10">
                <span className="text-sm font-semibold">9:41</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                  </svg>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
                  </svg>
                </div>
              </div>
              
              {/* App content */}
              <div className="h-[calc(100%-48px)] overflow-y-auto overflow-x-hidden relative">
                {children}
              </div>
            </div>
          </div>
        </div>
        
        {/* Side buttons */}
        <div className="absolute left-0 top-28 w-1 h-8 bg-gray-800 rounded-l-md" />
        <div className="absolute left-0 top-40 w-1 h-12 bg-gray-800 rounded-l-md" />
        <div className="absolute left-0 top-56 w-1 h-12 bg-gray-800 rounded-l-md" />
        <div className="absolute right-0 top-36 w-1 h-16 bg-gray-800 rounded-r-md" />
        
        {/* Label */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Widok mobilny 320px
        </div>
      </div>
    </div>
  )
}
