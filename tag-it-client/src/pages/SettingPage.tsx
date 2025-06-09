"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Globe, Save } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import PageHeading from "@/components/PageHeading"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setTheme, selectTheme } from "@/redux/slices/themeSlice"

type ThemeType = "light" | "dark" | "system"

const SettingsPage = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(selectTheme)

  // Local state for settings
  const [theme, setLocalTheme] = useState<ThemeType>(currentTheme)

  // Handler functions for type safety
  const handleThemeChange = (value: string) => {
    if (value === "light" || value === "dark" || value === "system") {
      setLocalTheme(value)
    }
  }

  // Apply theme changes immediately to DOM
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    // Remove existing theme classes
    root.classList.remove("light", "dark")
    body.classList.remove("light", "dark")

    // Apply new theme
    if (theme === "dark") {
      root.classList.add("dark")
      body.classList.add("dark")
    } else if (theme === "light") {
      root.classList.add("light")
      body.classList.add("light")
    } else {
      // System theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        root.classList.add("dark")
        body.classList.add("dark")
      } else {
        root.classList.add("light")
        body.classList.add("light")
      }
    }

    dispatch(setTheme(theme))
  }, [theme, dispatch])

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("tagit-settings-theme")
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system")) {
      setLocalTheme(savedTheme as ThemeType)
    }
  }, [])

  const handleSaveSettings = async () => {
    try {
      localStorage.setItem("tagit-settings-theme", theme)

      toast.success("Settings saved", {
        description: "Your theme preference has been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Failed to save settings")
    }
  }

  // Light gray colors instead of black/dark
  const getThemeColors = (themeType: ThemeType) => {
    switch (themeType) {
      case "light":
        return {
          background: "rgba(248, 250, 252, 0.95)", // Very light blue-gray
          border: "rgba(148, 163, 184, 0.3)", // Light slate
          text: "#475569", // Slate-600 (light gray)
          accent: "#0ea5e9", // Sky-500
        }
      case "dark":
        return {
          background: "rgba(241, 245, 249, 0.95)", // Light gray instead of dark
          border: "rgba(148, 163, 184, 0.4)", // Light slate
          text: "#64748b", // Slate-500 (medium gray)
          accent: "#0ea5e9", // Sky-500
        }
      case "system":
        return {
          background: "rgba(248, 250, 252, 0.95)", // Light gray
          border: "rgba(148, 163, 184, 0.4)", // Light slate
          text: "#64748b", // Slate-500 (medium gray)
          accent: "#10b981", // Emerald-500
        }
      default:
        return {
          background: "rgba(248, 250, 252, 0.95)",
          border: "rgba(148, 163, 184, 0.3)",
          text: "#475569",
          accent: "#0ea5e9",
        }
    }
  }

  const currentColors = getThemeColors(theme)

  const cardStyle = {
    backgroundColor: currentColors.background,
    backdropFilter: "blur(16px)",
    border: `1px solid ${currentColors.border}`,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    color: currentColors.text,
  }

  const buttonStyle = {
    backgroundColor: currentColors.accent,
    color: "white",
    fontWeight: "600",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    border: "none",
    padding: "0.5rem 1rem",
  }

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "1.5rem" }}>
        <PageHeading title="Settings" subtitle="Customize your Tag-it experience" />

        <div style={cardStyle} className="p-6 md:p-8 max-w-2xl">
          <h3 className="text-lg font-medium mb-6" style={{ color: currentColors.text }}>
            Theme Settings
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-4" style={{ color: currentColors.text }}>
                Choose your preferred theme
              </h4>
              <RadioGroup value={theme} onValueChange={handleThemeChange} className="flex flex-col space-y-4">
                <div
                  className="flex items-center space-x-3 p-3 rounded-lg border transition-all"
                  style={{
                    borderColor: theme === "light" ? currentColors.accent : currentColors.border,
                    backgroundColor: theme === "light" ? `${currentColors.accent}20` : "transparent",
                  }}
                >
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center cursor-pointer">
                    <Sun className="h-4 w-4 mr-2" style={{ color: currentColors.accent }} />
                    <div>
                      <div style={{ color: currentColors.text }}>Light Mode</div>
                      <div className="text-xs opacity-70">Clean and bright interface</div>
                    </div>
                  </Label>
                </div>
                <div
                  className="flex items-center space-x-3 p-3 rounded-lg border transition-all"
                  style={{
                    borderColor: theme === "dark" ? currentColors.accent : currentColors.border,
                    backgroundColor: theme === "dark" ? `${currentColors.accent}20` : "transparent",
                  }}
                >
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center cursor-pointer">
                    <Moon className="h-4 w-4 mr-2" style={{ color: currentColors.accent }} />
                    <div>
                      <div style={{ color: currentColors.text }}>Dark Mode</div>
                      <div className="text-xs opacity-70">Easy on the eyes</div>
                    </div>
                  </Label>
                </div>
                <div
                  className="flex items-center space-x-3 p-3 rounded-lg border transition-all"
                  style={{
                    borderColor: theme === "system" ? currentColors.accent : currentColors.border,
                    backgroundColor: theme === "system" ? `${currentColors.accent}20` : "transparent",
                  }}
                >
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center cursor-pointer">
                    <Globe className="h-4 w-4 mr-2" style={{ color: currentColors.accent }} />
                    <div>
                      <div style={{ color: currentColors.text }}>System Default</div>
                      <div className="text-xs opacity-70">Follows your device settings</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4" style={{ borderTop: `1px solid ${currentColors.border}` }}>
              <Button onClick={handleSaveSettings} style={buttonStyle}>
                <Save className="mr-2 h-4 w-4" />
                Save Theme Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage
