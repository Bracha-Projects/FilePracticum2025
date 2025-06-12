"use client"

import { useState, useEffect } from "react"
import { Save, Moon, Sun, Monitor } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import PageHeading from "@/components/PageHeading"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setTheme, setFontSize, selectTheme, selectFontSize } from "@/redux/slices/themeSlice"
import { toast } from "sonner"

const SettingsPage = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(selectTheme)
  const currentFontSize = useAppSelector(selectFontSize)

  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | "system">(currentTheme)
  const [selectedFontSize, setSelectedFontSize] = useState<"small" | "medium" | "large">(currentFontSize)

  useEffect(() => {
    setSelectedTheme(currentTheme)
    setSelectedFontSize(currentFontSize)
  }, [currentTheme, currentFontSize])

  const handleSaveSettings = () => {
    dispatch(setTheme(selectedTheme))
    dispatch(setFontSize(selectedFontSize))
    toast.success("Settings saved successfully")
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <PageHeading title="Settings" subtitle="Customize your application preferences" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">Theme</CardTitle>
              <CardDescription>Choose your preferred color theme</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedTheme}
                onValueChange={(value) => setSelectedTheme(value as "light" | "dark" | "system")}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 rounded-md border border-gray-200 p-4 hover:bg-gray-50">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light" className="flex flex-1 items-center gap-2 cursor-pointer">
                    <Sun className="h-5 w-5 text-amber-500" />
                    <div>
                      <div className="text-gray-700">Light</div>
                      <div className="text-gray-500 text-sm">Use the light color theme</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-md border border-gray-200 p-4 hover:bg-gray-50">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark" className="flex flex-1 items-center gap-2 cursor-pointer">
                    <Moon className="h-5 w-5 text-indigo-500" />
                    <div>
                      <div className="text-gray-700">Dark</div>
                      <div className="text-gray-500 text-sm">Use the dark color theme</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-md border border-gray-200 p-4 hover:bg-gray-50">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system" className="flex flex-1 items-center gap-2 cursor-pointer">
                    <Monitor className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-gray-700">System</div>
                      <div className="text-gray-500 text-sm">Follow your system theme</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Font Size Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">Font Size</CardTitle>
              <CardDescription>Adjust the text size for better readability</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedFontSize}
                onValueChange={(value) => setSelectedFontSize(value as "small" | "medium" | "large")}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 rounded-md border border-gray-200 p-4 hover:bg-gray-50">
                  <RadioGroupItem value="small" id="font-small" />
                  <Label htmlFor="font-small" className="flex flex-1 items-center gap-2 cursor-pointer">
                    <div className="text-gray-700">Small</div>
                    <div className="text-gray-500 text-sm">Compact text size</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-md border border-gray-200 p-4 hover:bg-gray-50">
                  <RadioGroupItem value="medium" id="font-medium" />
                  <Label htmlFor="font-medium" className="flex flex-1 items-center gap-2 cursor-pointer">
                    <div className="text-gray-700">Medium</div>
                    <div className="text-gray-500 text-sm">Default text size</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-md border border-gray-200 p-4 hover:bg-gray-50">
                  <RadioGroupItem value="large" id="font-large" />
                  <Label htmlFor="font-large" className="flex flex-1 items-center gap-2 cursor-pointer">
                    <div className="text-gray-700">Large</div>
                    <div className="text-gray-500 text-sm">Larger text for better readability</div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage
