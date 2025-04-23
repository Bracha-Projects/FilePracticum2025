import React, { useState } from 'react';
import { Info } from 'lucide-react';
import FileDropzone from '@/components/FileDropzone';
import PageHeading from '@/components/PageHeading';
import TagDisplay from '@/components/TagDisplay';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import DashboardLayout from '@/layouts/DashboardLayout';

const FileUploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [tagsData, setTagsData] = useState<{ [key: string]: string[] }>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFilesAdded = (files: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    
    // Simulate AI tagging after files are added
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Generate example tags based on file type
      const newTagsData = { ...tagsData };
      
      files.forEach(file => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        let suggestedTags: string[] = [];
        
        if (extension === 'pdf') {
          suggestedTags = ['document', 'contract', 'report'];
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
          suggestedTags = ['image', 'photo', 'visual'];
        } else if (['doc', 'docx'].includes(extension || '')) {
          suggestedTags = ['document', 'text', 'word'];
        } else if (['xls', 'xlsx'].includes(extension || '')) {
          suggestedTags = ['spreadsheet', 'data', 'excel'];
        } else {
          suggestedTags = ['file', 'misc'];
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
    setTagsData(prev => ({
      ...prev,
      [fileName]: newTags
    }));
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
                  Our AI will analyze your files to generate relevant tags automatically. You can always review and modify these tags in the next step.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="review" className="animate-fade-in">
          <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
            <h3 className="text-lg font-medium text-tagit-darkblue mb-4">AI Generated Tags</h3>
            
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
                      <Input
                        id={`path-${index}`}
                        value="/My Files"
                        className="tagit-input"
                        readOnly
                      />
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end mt-6">
                  <Button 
                    className="bg-tagit-blue text-white hover:bg-tagit-darkblue"
                    onClick={() => {
                      toast.success(
                        `${uploadedFiles.length} file(s) uploaded successfully`
                    );
                      // In a real app, you would handle the file upload and tagging here
                      setUploadedFiles([]);
                      setTagsData({});
                    }}
                  >
                    Complete Upload
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-tagit-blue">No files uploaded yet. Go to the Upload tab to start.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default FileUploadPage;