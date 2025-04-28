
import { useState } from "react";
import { Info } from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import PageHeading from "@/components/PageHeading";
import TagDisplay from "@/components/TagDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import DashboardLayout from "@/layouts/DashboardLayout";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
// Embedding tailwind config directly
const tailwindConfig = {
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        tagit: {
          blue: "#4d6a84",
          darkblue: "#3a5269",
          mint: "#a8ebc7",
          lightmint: "#cff6e3",
        },
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
      },
    },
  },
};

const FileUploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [tagsData, setTagsData] = useState<{ [key: string]: string[] }>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({}); // Track upload progress for each file

  const handleFilesAdded = (files: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);

    // Simulate AI tagging after files are added
    setIsAnalyzing(true);

    setTimeout(() => {
      // Generate example tags based on file type
      const newTagsData = { ...tagsData };

      files.forEach((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase();
        let suggestedTags: string[] = [];

        if (extension === "pdf") {
          suggestedTags = ["document", "contract", "report"];
        } else if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
          suggestedTags = ["image", "photo", "visual"];
        } else if (["doc", "docx"].includes(extension || "")) {
          suggestedTags = ["document", "text", "word"];
        } else if (["xls", "xlsx"].includes(extension || "")) {
          suggestedTags = ["spreadsheet", "data", "excel"];
        } else {
          suggestedTags = ["file", "misc"];
        }

        newTagsData[file.name] = suggestedTags;
      });

      setTagsData(newTagsData);
      setIsAnalyzing(false);
      toast("AI Analysis Complete", {
        description: `Tags automatically generated for ${files.length} file(s)`,
      });
    }, 2000);
  };

  const handleTagsChange = (fileName: string, newTags: string[]) => {
    setTagsData((prev) => ({
      ...prev,
      [fileName]: newTags,
    }));
  };

  const uploadFileToS3 = async (file: File) => {
    try {
      // Step 1: Get the presigned URL from the server
      const response = await axiosInstance.get("/files/presigned-url", {
        params: { fileName: file.name },
      });

      const presignedUrl = response.data.url;

      // Step 2: Upload the file directly to S3
      console.log("Presigned URL:", presignedUrl);

      // Step 2: Upload the file to the presigned URL
      await axios.put(presignedUrl, file, {
                      headers: {
                          "Content-Type": file.type,
                      },
                      onUploadProgress: (progressEvent) => {
                          const percent = Math.round(
                              (progressEvent.loaded * 100) / (progressEvent.total || 1)
                          );
                          setProgress(percent);
                      },
                  });
      console.log("File uploaded successfully!");
      toast.success(`File "${file.name}" uploaded successfully!`);
    } catch (error: any) {
      if (error.response) {
        console.error("Error uploading file:", error.response.data);
        toast.error(`Upload failed: ${error.response.data}`);
      } else {
        console.error("Error uploading file:", error.message);
        toast.error("Upload failed. Please try again.");
      }
    }
  };

  const handleCompleteUpload = async () => {
    for (const file of uploadedFiles) {
      await uploadFileToS3(file); // Upload each file one by one
    }

    // Clear the files and tags after upload
    setUploadedFiles([]);
    setTagsData({});
    setUploadProgress({});
  };
  return (
    <DashboardLayout>
      <PageHeading
        title="Upload Files"
        subtitle="Upload your files for automatic tagging and organization"
      />

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="review">Review & Organize</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="animate-fade-in">
          <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
            <FileDropzone onFilesAdded={handleFilesAdded} />

            <div className="mt-8 flex items-start p-4 rounded-lg bg-tagit-mint/10 border border-tagit-mint/20">
              <Info className="h-5 w-5 text-tagit-blue mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-tagit-blue">
                <p className="font-medium">About automatic tagging</p>
                <p className="mt-1">
                  Our AI will analyze your files to generate relevant tags
                  automatically. You can always review and modify these tags in
                  the next step.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="review" className="animate-fade-in">
          <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
            <h3 className="text-lg font-medium text-tagit-darkblue mb-4">
              AI Generated Tags
            </h3>

            {isAnalyzing ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-tagit-mint/30 border-t-tagit-mint rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-tagit-blue">Analyzing your files...</p>
              </div>
            ) : uploadedFiles.length > 0 ? (
              <div className="space-y-6">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-tagit-darkblue">{file.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      {uploadProgress[file.name] && (
                        <p className="text-xs text-tagit-blue">
                          Upload Progress: {uploadProgress[file.name]}%
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <Label htmlFor={`tags-${index}`} className="text-sm mb-2 block">
                        Tags
                      </Label>
                      <TagDisplay
                        tags={tagsData[file.name] || []}
                        onTagsChange={(newTags) => handleTagsChange(file.name, newTags)}
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor={`path-${index}`} className="text-sm mb-2 block">
                        Destination Folder
                      </Label>
                      <Input id={`path-${index}`} value="/My Files" className="tagit-input" readOnly />
                    </div>
                  </div>
                ))}

                <div className="flex justify-end mt-6">
                  <Button
                    className="bg-tagit-blue text-white hover:bg-tagit-darkblue"
                    onClick={handleCompleteUpload}
                  >
                    Complete Upload
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-tagit-blue">
                  No files uploaded yet. Go to the Upload tab to start.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default FileUploadPage;