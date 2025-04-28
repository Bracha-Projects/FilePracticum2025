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

const SettingsPage = () => {
  // Appearance settings
  const [theme, setTheme] = useState("light")
  const [fontSize, setFontSize] = useState("medium")

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

  const handleSaveSettings = (section: string) => {
    // Save settings to localStorage based on section
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
  }

  // Add this useEffect to load settings from localStorage on component mount
  useEffect(() => {
    // Load appearance settings
    const savedTheme = localStorage.getItem("tagit-settings-theme")
    if (savedTheme) setTheme(savedTheme)

    const savedFontSize = localStorage.getItem("tagit-settings-fontSize")
    if (savedFontSize) setFontSize(savedFontSize)

    // Load notification settings
    const savedEmailNotifications = localStorage.getItem("tagit-settings-emailNotifications")
    if (savedEmailNotifications) setEmailNotifications(savedEmailNotifications === "true")

    const savedPushNotifications = localStorage.getItem("tagit-settings-pushNotifications")
    if (savedPushNotifications) setPushNotifications(savedPushNotifications === "true")

    const savedWeeklyDigest = localStorage.getItem("tagit-settings-weeklyDigest")
    if (savedWeeklyDigest) setWeeklyDigest(savedWeeklyDigest === "true")

    // Load privacy settings
    const savedTwoFactorAuth = localStorage.getItem("tagit-settings-twoFactorAuth")
    if (savedTwoFactorAuth) setTwoFactorAuth(savedTwoFactorAuth === "true")

    const savedShareUsageData = localStorage.getItem("tagit-settings-shareUsageData")
    if (savedShareUsageData) setShareUsageData(savedShareUsageData === "true")

    const savedAutoTagging = localStorage.getItem("tagit-settings-autoTagging")
    if (savedAutoTagging) setAutoTagging(savedAutoTagging === "true")

    // Load language settings
    const savedLanguage = localStorage.getItem("tagit-settings-language")
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

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
          <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
            <h3 className="text-lg font-medium text-[#4B6982] mb-6">Appearance Settings</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-[#4B6982] mb-4">Theme</h4>
                <RadioGroup value={theme} onValueChange={setTheme} className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex items-center cursor-pointer">
                      <Sun className="h-4 w-4 mr-2 text-[#4B6982]" />
                      Light Mode
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex items-center cursor-pointer">
                      <Moon className="h-4 w-4 mr-2 text-[#4B6982]" />
                      Dark Mode
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="flex items-center cursor-pointer">
                      <Globe className="h-4 w-4 mr-2 text-[#4B6982]" />
                      System Default
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#4B6982] mb-4">Font Size</h4>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="w-full md:w-[200px] border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#A8EBC7]/30">
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

              <div className="pt-4 border-t border-[#A8EBC7]/30">
                <Button
                  onClick={() => handleSaveSettings("Appearance")}
                  className="bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Appearance Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="animate-fade-in">
          <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
            <h3 className="text-lg font-medium text-[#4B6982] mb-6">Notification Settings</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-[#4B6982]">Email Notifications</Label>
                  <p className="text-sm text-[#4B6982]/70">Receive notifications about your files via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-[#4B6982]">Push Notifications</Label>
                  <p className="text-sm text-[#4B6982]/70">Receive notifications in your browser</p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-[#4B6982]">Weekly Digest</Label>
                  <p className="text-sm text-[#4B6982]/70">Receive a weekly summary of your file activity</p>
                </div>
                <Switch
                  checked={weeklyDigest}
                  onCheckedChange={setWeeklyDigest}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="pt-4 border-t border-[#A8EBC7]/30">
                <Button
                  onClick={() => handleSaveSettings("Notification")}
                  className="bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="animate-fade-in">
          <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
            <h3 className="text-lg font-medium text-[#4B6982] mb-6">Privacy & Security Settings</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-[#4B6982] flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-[#4B6982]/70">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-[#4B6982] flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Share Usage Data
                  </Label>
                  <p className="text-sm text-[#4B6982]/70">Help us improve Tag-it by sharing anonymous usage data</p>
                </div>
                <Switch
                  checked={shareUsageData}
                  onCheckedChange={setShareUsageData}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-[#4B6982] flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    AI Auto-Tagging
                  </Label>
                  <p className="text-sm text-[#4B6982]/70">Allow our AI to automatically tag your files</p>
                </div>
                <Switch
                  checked={autoTagging}
                  onCheckedChange={setAutoTagging}
                  className="data-[state=checked]:bg-[#A8EBC7]"
                />
              </div>

              <div className="pt-4 border-t border-[#A8EBC7]/30">
                <Button
                  onClick={() => handleSaveSettings("Privacy & Security")}
                  className="bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </div>

              <div className="pt-4 border-t border-[#A8EBC7]/30">
                <h4 className="text-sm font-medium text-[#4B6982] mb-4">Danger Zone</h4>
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
          <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
            <h3 className="text-lg font-medium text-[#4B6982] mb-6">Language Settings</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-[#4B6982] mb-4">Application Language</h4>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full md:w-[200px] border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#A8EBC7]/30">
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

              <div className="pt-4 border-t border-[#A8EBC7]/30">
                <Button
                  onClick={() => handleSaveSettings("Language")}
                  className="bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90"
                >
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
