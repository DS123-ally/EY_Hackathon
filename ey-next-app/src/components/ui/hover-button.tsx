"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative px-6 py-2.5 rounded-lg",
          "text-white font-medium text-sm",
          "bg-[#3b82f6] hover:bg-[#2563eb]",
          "transition-all duration-200",
          "border border-[#3b82f6] hover:border-[#2563eb]",
          "active:scale-[0.98]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "flex items-center justify-center gap-2",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

HoverButton.displayName = "HoverButton"

export { HoverButton }
