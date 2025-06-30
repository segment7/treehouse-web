"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Upload, ImageIcon, LinkIcon, FileText, Loader2 } from "lucide-react"

export default function CreatePage() {
  const [content, setContent] = useState("")
  const [isOriginal, setIsOriginal] = useState(false)
  const [originalLink, setOriginalLink] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [ccLicense, setCcLicense] = useState("CC BY-NC")

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast({
          title: "Error",
          description: "File size must be less than 10MB",
          variant: "destructive",
        })
        return
      }
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content",
        variant: "destructive",
      })
      return
    }

    if (isOriginal && !originalLink.trim()) {
      toast({
        title: "Error",
        description: "Please provide a link for original statements",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call to create post
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would:
      // 1. Upload media to Grove storage if selectedFile exists
      // 2. Create post via Lens Protocol SDK
      // 3. Handle the response

      toast({
        title: "Success",
        description: "Your post has been created successfully!",
      })

      // Reset form
      setContent("")
      setIsOriginal(false)
      setOriginalLink("")
      setSelectedFile(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Create New Post</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Content Input */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="What's on your mind? Share your thoughts, ideas, or stories..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[120px] resize-none"
                    maxLength={500}
                  />
                  <div className="text-right text-sm text-gray-500">{content.length}/500</div>
                </div>

                {/* Media Upload */}
                <div className="space-y-2">
                  <Label>Media (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {selectedFile ? (
                        <div className="space-y-2">
                          <ImageIcon className="h-8 w-8 mx-auto text-green-600" />
                          <p className="text-sm font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="text-sm text-gray-600">Click to upload an image</p>
                          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Original Statement Toggle */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="original-toggle" className="text-sm font-medium">
                      Mark as Original Statement
                    </Label>
                    <p className="text-xs text-gray-600">This content represents your original work or statement</p>
                  </div>
                  <Switch id="original-toggle" checked={isOriginal} onCheckedChange={setIsOriginal} />
                </div>

                {/* Creative Commons License Selection */}
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <Label className="text-sm font-medium">Creative Commons License</Label>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="cc-by-nc"
                        name="cc-license"
                        value="CC BY-NC"
                        checked={ccLicense === "CC BY-NC"}
                        onChange={(e) => setCcLicense(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="cc-by-nc" className="text-sm font-medium cursor-pointer">
                          CC BY-NC (Attribution-NonCommercial)
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          This license does not permit commercial use but allows for the creation of derivative works.
                          Attribution to the original creator is required.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="cc-by-nd"
                        name="cc-license"
                        value="CC BY-ND"
                        checked={ccLicense === "CC BY-ND"}
                        onChange={(e) => setCcLicense(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="cc-by-nd" className="text-sm font-medium cursor-pointer">
                          CC BY-ND (Attribution-NoDerivs)
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          This license permits commercial use but does not allow the creation of derivative works.
                          Attribution to the original creator is required.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="cc0"
                        name="cc-license"
                        value="CC0"
                        checked={ccLicense === "CC0"}
                        onChange={(e) => setCcLicense(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="cc0" className="text-sm font-medium cursor-pointer">
                          CC0 (Public Domain Dedication)
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          This license permits both commercial use and the creation of derivative works, without the
                          need for attribution.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="cc-by"
                        name="cc-license"
                        value="CC BY"
                        checked={ccLicense === "CC BY"}
                        onChange={(e) => setCcLicense(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="cc-by" className="text-sm font-medium cursor-pointer">
                          CC BY (Attribution)
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          This license allows both commercial use and the creation of derivative works, but requires
                          attribution to the original creator.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Original Link Input */}
                {isOriginal && (
                  <div className="space-y-2">
                    <Label htmlFor="original-link" className="flex items-center space-x-2">
                      <LinkIcon className="h-4 w-4" />
                      <span>Original Statement Link</span>
                    </Label>
                    <Input
                      id="original-link"
                      type="url"
                      placeholder="https://example.com/your-original-work"
                      value={originalLink}
                      onChange={(e) => setOriginalLink(e.target.value)}
                    />
                    <p className="text-xs text-gray-600">
                      Provide a link to your original work or statement for verification
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setContent("")
                      setIsOriginal(false)
                      setOriginalLink("")
                      setSelectedFile(null)
                      setCcLicense("CC BY-NC")
                    }}
                  >
                    Clear
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      "Publish Post"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
