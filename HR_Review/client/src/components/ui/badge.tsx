import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "success" | "destructive" | "outline" | "warning" }>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants: Record<string, string> = {
      default: "bg-indigo-100 text-indigo-800 border-indigo-200",
      secondary: "bg-slate-100 text-slate-800 border-slate-200",
      success: "bg-emerald-100 text-emerald-800 border-emerald-200",
      destructive: "bg-red-100 text-red-800 border-red-200",
      warning: "bg-amber-100 text-amber-800 border-amber-200",
      outline: "bg-transparent text-slate-700 border-slate-300",
    }
    return <div ref={ref} className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors", variants[variant], className)} {...props} />
  }
)
Badge.displayName = "Badge"
export { Badge }
