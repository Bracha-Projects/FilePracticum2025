"use client"

import { useState, useEffect } from "react"
import { Save, Moon, Sun, Monitor } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const SettingsPage = () => {
  const [selectedTheme, setSelectedTheme] = useState("light")
  const [selectedFontSize, setSelectedFontSize] = useState("medium")

  useEffect(() => {
    // Load settings from localStorage
    const savedTheme = localStorage.getItem('app-theme') || 'light'
    const savedFontSize = localStorage.getItem('app-font-size') || 'medium'
    
    setSelectedTheme(savedTheme)
    setSelectedFontSize(savedFontSize)
    
    // Apply settings immediately
    applyTheme(savedTheme)
    applyFontSize(savedFontSize)
  }, [])

  const applyTheme = (theme:string) => {
    const root = document.documentElement
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const applySystemTheme = () => {
        root.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light')
      }
      
      applySystemTheme()
      mediaQuery.addEventListener('change', applySystemTheme)
    } else {
      root.setAttribute('data-theme', theme)
    }
  }

  const applyFontSize = (fontSize:string) => {
    document.documentElement.setAttribute('data-font-size', fontSize)
  }

  const handleSaveSettings = () => {
    // Save to localStorage
    localStorage.setItem('app-theme', selectedTheme)
    localStorage.setItem('app-font-size', selectedFontSize)
    
    // Apply changes
    applyTheme(selectedTheme)
    applyFontSize(selectedFontSize)
    
    toast.success("Settings saved successfully")
  }

  return (
    <>
      <style>{`
        :root {
          /* Light theme colors */
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-tertiary: #f1f5f9;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --text-muted: #94a3b8;
          --border: #e2e8f0;
          --border-light: #f1f5f9;
          --accent: #3b82f6;
          --accent-hover: #2563eb;
          --shadow: rgba(0, 0, 0, 0.1);
        }

        [data-theme="dark"] {
          /* Dark theme colors */
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-tertiary: #334155;
          --text-primary: #f8fafc;
          --text-secondary: #cbd5e1;
          --text-muted: #94a3b8;
          --border: #334155;
          --border-light: #475569;
          --accent: #60a5fa;
          --accent-hover: #3b82f6;
          --shadow: rgba(0, 0, 0, 0.3);
        }

        /* Font size variables */
        [data-font-size="small"] {
          --font-size-xs: 0.6rem;
          --font-size-sm: 0.75rem;
          --font-size-base: 0.8rem;
          --font-size-lg: 0.9rem;
          --font-size-xl: 1rem;
          --font-size-2xl: 1.25rem;
          --font-size-3xl: 1.5rem;
        }

        [data-font-size="medium"] {
          --font-size-xs: 0.75rem;
          --font-size-sm: 0.875rem;
          --font-size-base: 1rem;
          --font-size-lg: 1.125rem;
          --font-size-xl: 1.25rem;
          --font-size-2xl: 1.5rem;
          --font-size-3xl: 1.875rem;
        }

        [data-font-size="large"] {
          --font-size-xs: 0.875rem;
          --font-size-sm: 1rem;
          --font-size-base: 1.125rem;
          --font-size-lg: 1.25rem;
          --font-size-xl: 1.5rem;
          --font-size-2xl: 1.875rem;
          --font-size-3xl: 2.25rem;
        }

        /* Apply theme variables globally */
        body {
          background-color: var(--bg-secondary) !important;
          color: var(--text-primary) !important;
          font-size: var(--font-size-base) !important;
          transition: all 0.3s ease;
        }

        /* Override common elements */
        .bg-white, [class*="bg-white"] { 
          background-color: var(--bg-primary) !important; 
        }
        .bg-gray-50, [class*="bg-gray-50"] { 
          background-color: var(--bg-secondary) !important; 
        }
        .bg-gray-100, [class*="bg-gray-100"] { 
          background-color: var(--bg-tertiary) !important; 
        }
        .text-gray-900, [class*="text-gray-900"] { 
          color: var(--text-primary) !important; 
        }
        .text-gray-700, [class*="text-gray-700"] { 
          color: var(--text-secondary) !important; 
        }
        .text-gray-500, [class*="text-gray-500"] { 
          color: var(--text-muted) !important; 
        }
        .border-gray-200, [class*="border-gray-200"] { 
          border-color: var(--border) !important; 
        }

        /* Card styles */
        .card-themed {
          background-color: var(--bg-primary) !important;
          border-color: var(--border) !important;
          box-shadow: 0 1px 3px var(--shadow) !important;
        }

        /* Text sizes */
        .text-xs { font-size: var(--font-size-xs) !important; }
        .text-sm { font-size: var(--font-size-sm) !important; }
        .text-base { font-size: var(--font-size-base) !important; }
        .text-lg { font-size: var(--font-size-lg) !important; }
        .text-xl { font-size: var(--font-size-xl) !important; }
        .text-2xl { font-size: var(--font-size-2xl) !important; }
        .text-3xl { font-size: var(--font-size-3xl) !important; }

        /* Page specific styles */
        .settings-page {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          min-height: 100vh;
        }

        .settings-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          box-shadow: 0 1px 3px var(--shadow);
        }

        .settings-option {
          border: 1px solid var(--border);
          background-color: var(--bg-primary);
        }

        .settings-option:hover {
          background-color: var(--bg-tertiary);
        }
      `}</style>
      
      <div className="settings-page p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Settings</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Customize your application preferences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme Settings */}
            <Card className="settings-card">
              <CardHeader>
                <CardTitle style={{ color: 'var(--text-primary)' }}>Theme</CardTitle>
                <CardDescription style={{ color: 'var(--text-secondary)' }}>
                  Choose your preferred color theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedTheme}
                  onValueChange={setSelectedTheme}
                  className="space-y-4"
                >
                  <div className="settings-option flex items-center space-x-3 rounded-md p-4">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <Sun className="h-5 w-5 text-amber-500" />
                      <div>
                        <div style={{ color: 'var(--text-primary)' }}>Light</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Use the light color theme
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="settings-option flex items-center space-x-3 rounded-md p-4">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <Moon className="h-5 w-5 text-indigo-500" />
                      <div>
                        <div style={{ color: 'var(--text-primary)' }}>Dark</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Use the dark color theme
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="settings-option flex items-center space-x-3 rounded-md p-4">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <Monitor className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                      <div>
                        <div style={{ color: 'var(--text-primary)' }}>System</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Follow your system theme
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Font Size Settings */}
            <Card className="settings-card">
              <CardHeader>
                <CardTitle style={{ color: 'var(--text-primary)' }}>Font Size</CardTitle>
                <CardDescription style={{ color: 'var(--text-secondary)' }}>
                  Adjust the text size for better readability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedFontSize}
                  onValueChange={setSelectedFontSize}
                  className="space-y-4"
                >
                  <div className="settings-option flex items-center space-x-3 rounded-md p-4">
                    <RadioGroupItem value="small" id="font-small" />
                    <Label htmlFor="font-small" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <div>
                        <div style={{ color: 'var(--text-primary)' }}>Small</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Compact text size
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="settings-option flex items-center space-x-3 rounded-md p-4">
                    <RadioGroupItem value="medium" id="font-medium" />
                    <Label htmlFor="font-medium" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <div>
                        <div style={{ color: 'var(--text-primary)' }}>Medium</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Default text size
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="settings-option flex items-center space-x-3 rounded-md p-4">
                    <RadioGroupItem value="large" id="font-large" />
                    <Label htmlFor="font-large" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <div>
                        <div style={{ color: 'var(--text-primary)' }}>Large</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Larger text for better readability
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSaveSettings} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPage