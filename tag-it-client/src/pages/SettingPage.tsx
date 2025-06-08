"use client"

import { useState, useEffect } from "react"
import { Bell, Moon, Sun, Globe, Lock, Shield, Save, Trash2 } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import PageHeading from "@/components/PageHeading"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setTheme, setFontSize, selectTheme, selectFontSize } from "@/redux/slices/themeSlice"

type ThemeType = "light" | "dark" | "system"
type FontSizeType = "small" | "medium" | "large"

const SettingsPage = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(selectTheme)
  const currentFontSize = useAppSelector(selectFontSize)

  // Local state for settings
  const [theme, setLocalTheme] = useState<ThemeType>(currentTheme)
  const [fontSize, setLocalFontSize] = useState<FontSizeType>(currentFontSize)

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  // Privacy settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [shareUsageData, setShareUsageData] = useState(true)
  const [autoTagging, setAutoTagging] = useState(true)

  // Language settings
  const [language, setLanguage] = useState("english")

  // Handler functions for type safety
  const handleThemeChange = (value: string) => {
    if (value === "light" || value === "dark" || value === "system") {
      setLocalTheme(value)
    }
  }

  const handleFontSizeChange = (value: string) => {
    if (value === "small" || value === "medium" || value === "large") {
      setLocalFontSize(value)
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

  // Apply font size changes immediately to DOM
  useEffect(() => {
    const root = document.documentElement

    // Remove existing font size classes
    root.classList.remove("font-small", "font-medium", "font-large")
    root.removeAttribute("data-font-size")

    // Apply new font size
    root.classList.add(`font-${fontSize}`)
    root.setAttribute("data-font-size", fontSize)

    dispatch(setFontSize(fontSize))
  }, [fontSize, dispatch])

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("tagit-settings-theme")
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system")) {
      setLocalTheme(savedTheme as ThemeType)
    }

    const savedFontSize = localStorage.getItem("tagit-settings-fontSize")
    if (savedFontSize && (savedFontSize === "small" || savedFontSize === "medium" || savedFontSize === "large")) {
      setLocalFontSize(savedFontSize as FontSizeType)
    }

    const savedEmailNotifications = localStorage.getItem("tagit-settings-emailNotifications")
    if (savedEmailNotifications) setEmailNotifications(savedEmailNotifications === "true")

    const savedPushNotifications = localStorage.getItem("tagit-settings-pushNotifications")
    if (savedPushNotifications) setPushNotifications(savedPushNotifications === "true")

    const savedWeeklyDigest = localStorage.getItem("tagit-settings-weeklyDigest")
    if (savedWeeklyDigest) setWeeklyDigest(savedWeeklyDigest === "true")

    const savedTwoFactorAuth = localStorage.getItem("tagit-settings-twoFactorAuth")
    if (savedTwoFactorAuth) setTwoFactorAuth(savedTwoFactorAuth === "true")

    const savedShareUsageData = localStorage.getItem("tagit-settings-shareUsageData")
    if (savedShareUsageData) setShareUsageData(savedShareUsageData === "true")

    const savedAutoTagging = localStorage.getItem("tagit-settings-autoTagging")
    if (savedAutoTagging) setAutoTagging(savedAutoTagging === "true")

    const savedLanguage = localStorage.getItem("tagit-settings-language")
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

  const handleSaveSettings = async (section: string) => {
    try {
      if (section === "Appearance") {
        localStorage.setItem("tagit-settings-theme", theme)
        localStorage.setItem("tagit-settings-fontSize", fontSize)
      } else if (section === "Notification") {
        localStorage.setItem("tagit-settings-emailNotifications", emailNotifications.toString())
        localStorage.setItem("tagit-settings-pushNotifications", pushNotifications.toString())
        localStorage.setItem("tagit-settings-weeklyDigest", weeklyDigest.toString())
      } else if (section === "Privacy & Security") {
        localStorage.setItem("tagit-settings-twoFactorAuth", twoFactorAuth.toString())
        localStorage.setItem("tagit-settings-shareUsageData", shareUsageData.toString())
        localStorage.setItem("tagit-settings-autoTagging", autoTagging.toString())
      } else if (section === "Language") {
        localStorage.setItem("tagit-settings-language", language)
      }

      toast.success(`${section} settings saved`, {
        description: "Your preferences have been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error(`Failed to save ${section} settings`)
    }
  }

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(168, 235, 199, 0.3)",
    boxShadow: "0 8px 32px rgba(75, 105, 130, 0.1)",
    borderRadius: "12px",
  }

  const buttonStyle = {
    backgroundColor: "#A8EBC7",
    color: "#4B6982",
    fontWeight: "600",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    border: "none",
    padding: "0.5rem 1rem",
  }

  return (
    <DashboardLayout>
      <PageHeading title="Settings" subtitle="Customize your Tag-it experience" />

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="animate-fade-in">
          <div style={cardStyle} className="p-6 md:p-8">
            <h3 className="text-lg font-medium mb-6" style={{ color: "#4B6982" }}>
              Appearance Settings
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-4" style={{ color: "#4B6982" }}>
                  Theme
                </h4>
                <RadioGroup value={theme} onValueChange={handleThemeChange} className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex items-center cursor-pointer">
                      <Sun className="h-4 w-4 mr-2" style={{ color: "#4B6982" }} />
                      Light Mode
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex items-center cursor-pointer">
                      <Moon className="h-4 w-4 mr-2" style={{ color: "#4B6982" }} />
                      Dark Mode
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="flex items-center cursor-pointer">
                      <Globe className="h-4 w-4 mr-2" style={{ color: "#4B6982" }} />
                      System Default
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4" style={{ color: "#4B6982" }}>
                  Font Size
                </h4>
                <Select value={fontSize} onValueChange={handleFontSizeChange}>
                  <SelectTrigger className="w-full md:w-[200px]" style={{ borderColor: "rgba(168, 235, 199, 0.5)" }}>
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: "white", borderColor: "rgba(168, 235, 199, 0.3)" }}>
                    <SelectItem value="small" className="hover:bg-[#A8EBC7]/20">
                      Small
                    </SelectItem>
                    <SelectItem value="medium" className="hover:bg-[#A8EBC7]/20">
                      Medium
                    </SelectItem>
                    <SelectItem value="large" className="hover:bg-[#A8EBC7]/20">
                      Large
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4" style={{ borderTop: "1px solid rgba(168, 235, 199, 0.3)" }}>
                <Button onClick={() => handleSaveSettings("Appearance")} style={buttonStyle}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Appearance Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="animate-fade-in">
          <div style={cardStyle} className="p-6 md:p-8">
            <h3 className="text-lg font-medium mb-6" style={{ color: "#4B6982" }}>
              Notification Settings
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label style={{ color: "#4B6982" }}>Email Notifications</Label>
                  <p className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                    Receive notifications about your files via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label style={{ color: "#4B6982" }}>Push Notifications</Label>
                  <p className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                    Receive notifications in your browser
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label style={{ color: "#4B6982" }}>Weekly Digest</Label>
                  <p className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                    Receive a weekly summary of your file activity
                  </p>
                </div>
                <Switch
                  checked={weeklyDigest}
                  onCheckedChange={setWeeklyDigest}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="pt-4" style={{ borderTop: "1px solid rgba(168, 235, 199, 0.3)" }}>
                <Button onClick={() => handleSaveSettings("Notification")} style={buttonStyle}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="animate-fade-in">
          <div style={cardStyle} className="p-6 md:p-8">
            <h3 className="text-lg font-medium mb-6" style={{ color: "#4B6982" }}>
              Privacy & Security Settings
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center" style={{ color: "#4B6982" }}>
                    <Lock className="h-4 w-4 mr-2" />
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center" style={{ color: "#4B6982" }}>
                    <Shield className="h-4 w-4 mr-2" />
                    Share Usage Data
                  </Label>
                  <p className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                    Help us improve Tag-it by sharing anonymous usage data
                  </p>
                </div>
                <Switch
                  checked={shareUsageData}
                  onCheckedChange={setShareUsageData}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center" style={{ color: "#4B6982" }}>
                    <Bell className="h-4 w-4 mr-2" />
                    AI Auto-Tagging
                  </Label>
                  <p className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                    Allow our AI to automatically tag your files
                  </p>
                </div>
                <Switch
                  checked={autoTagging}
                  onCheckedChange={setAutoTagging}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="pt-4" style={{ borderTop: "1px solid rgba(168, 235, 199, 0.3)" }}>
                <Button onClick={() => handleSaveSettings("Privacy & Security")} style={buttonStyle}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </div>

              <div className="pt-4" style={{ borderTop: "1px solid rgba(168, 235, 199, 0.3)" }}>
                <h4 className="text-sm font-medium mb-4" style={{ color: "#4B6982" }}>
                  Danger Zone
                </h4>
                <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                  <h5 className="text-sm font-medium text-red-600 mb-2">Delete Account</h5>
                  <p className="text-sm text-red-600/80 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast.error("This action requires confirmation", {
                        description: "Please contact support to delete your account.",
                      })
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="language" className="animate-fade-in">
          <div style={cardStyle} className="p-6 md:p-8">
            <h3 className="text-lg font-medium mb-6" style={{ color: "#4B6982" }}>
              Language Settings
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-4" style={{ color: "#4B6982" }}>
                  Application Language
                </h4>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full md:w-[200px]" style={{ borderColor: "rgba(168, 235, 199, 0.5)" }}>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: "white", borderColor: "rgba(168, 235, 199, 0.3)" }}>
                    <SelectItem value="english" className="hover:bg-[#A8EBC7]/20">
                      English
                    </SelectItem>
                    <SelectItem value="spanish" className="hover:bg-[#A8EBC7]/20">
                      Spanish
                    </SelectItem>
                    <SelectItem value="french" className="hover:bg-[#A8EBC7]/20">
                      French
                    </SelectItem>
                    <SelectItem value="german" className="hover:bg-[#A8EBC7]/20">
                      German
                    </SelectItem>
                    <SelectItem value="japanese" className="hover:bg-[#A8EBC7]/20">
                      Japanese
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4" style={{ borderTop: "1px solid rgba(168, 235, 199, 0.3)" }}>
                <Button onClick={() => handleSaveSettings("Language")} style={buttonStyle}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Language Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

export default SettingsPage
