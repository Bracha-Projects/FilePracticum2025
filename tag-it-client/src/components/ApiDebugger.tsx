"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"

export default function ApiDebugger() {
  const [endpoint, setEndpoint] = useState("/api/files")
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await axios.get(endpoint)
      setResponse(result.data)
      console.log("API Response:", result.data)
    } catch (err: any) {
      console.error("API Error:", err)
      setError(err.message || "An error occurred")
      setResponse(err.response?.data || null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Debugger</CardTitle>
        <CardDescription>Test your API endpoints to ensure they're working correctly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="API endpoint (e.g., /api/files)"
            className="flex-1"
          />
          <Button onClick={testApi} disabled={loading}>
            {loading ? "Testing..." : "Test Endpoint"}
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {response && (
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-md">
            <p className="font-semibold mb-2">Response:</p>
            <pre className="text-xs overflow-auto max-h-60 p-2 bg-gray-100 rounded">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-gray-500">Check the console for more detailed logs</div>
      </CardFooter>
    </Card>
  )
}
