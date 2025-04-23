import React, { useState } from 'react';
import { FolderPlus, Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import PageHeading from '@/components/PageHeading';
import FolderCard from '@/components/FolderCard';
import FileCard from '@/components/FileCard';
import FileBreadcrumb from '@/components/FileBreadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/DashboardLayout';

// Example data
const exampleFolders = [
  { id: '1', name: 'Documents', filesCount: 15, path: '/files/documents' },
  { id: '2', name: 'Images', filesCount: 28, path: '/files/images' },
  { id: '3', name: 'Contracts', filesCount: 7, path: '/files/contracts' },
  { id: '4', name: 'Marketing', filesCount: 12, path: '/files/marketing' },
  { id: '5', name: 'Reports', filesCount: 9, path: '/files/reports' },
  { id: '6', name: 'Invoices', filesCount: 23, path: '/files/invoices' },
];

const exampleFiles = [
  { 
    id: '1', 
    name: 'Q4-2023-Financial-Report.pdf', 
    type: 'PDF', 
    size: '2.3 MB', 
    tags: ['financial', 'report', 'quarterly'], 
    lastModified: '2 days ago' 
  },
  { 
    id: '2', 
    name: 'Marketing-Strategy-2024.docx', 
    type: 'DOCX', 
    size: '845 KB', 
    tags: ['marketing', 'strategy', 'planning'], 
    lastModified: '1 week ago' 
  },
  { 
    id: '3', 
    name: 'Client-Contract-ABC-Corp.pdf', 
    type: 'PDF', 
    size: '1.2 MB', 
    tags: ['contract', 'legal', 'client'], 
    lastModified: '3 days ago' 
  },
  { 
    id: '4', 
    name: 'Product-Launch-Timeline.xlsx', 
    type: 'XLSX', 
    size: '1.8 MB', 
    tags: ['product', 'timeline', 'project'], 
    lastModified: 'Yesterday' 
  },
  { 
    id: '5', 
    name: 'Team-Photo-Offsite-2023.jpg', 
    type: 'JPG', 
    size: '3.4 MB', 
    tags: ['photo', 'team', 'event'], 
    lastModified: '1 month ago' 
  },
];

const FilesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter files based on search query
  const filteredFiles = exampleFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-start mb-8 flex-col sm:flex-row gap-4">
        <PageHeading
          title="Files"
          subtitle="Browse and manage your files and folders"
          className="mb-0"
        />
        
        <Button className="whitespace-nowrap bg-tagit-blue text-white hover:bg-tagit-darkblue">
          <FolderPlus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>
      
      <FileBreadcrumb
        items={[
          { name: 'My Files', path: '/files' },
        ]}
        className="mb-6"
      />
      
      <div className="glass p-6 rounded-xl shadow-elevation mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files and folders..."
              className="pl-9 tagit-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className={`h-10 w-10 ${viewMode === 'grid' ? 'bg-tagit-mint/20 border-tagit-mint' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`h-10 w-10 ${viewMode === 'list' ? 'bg-tagit-mint/20 border-tagit-mint' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="folders">Folders</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-6 animate-fade-in">
            {/* Folders Section */}
            {exampleFolders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-tagit-darkblue mb-4">Folders</h2>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                  {exampleFolders.map((folder) => (
                    <FolderCard key={folder.id} {...folder} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Files Section */}
            {filteredFiles.length > 0 ? (
              <div>
                <h2 className="text-lg font-medium text-tagit-darkblue mb-4">Files</h2>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                  {filteredFiles.map((file) => (
                    <FileCard key={file.id} {...file} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-tagit-blue">No files match your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="folders">
            <div className="pt-6 animate-fade-in">
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                {exampleFolders.map((folder) => (
                  <FolderCard key={folder.id} {...folder} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="files">
            <div className="pt-6 animate-fade-in">
              {filteredFiles.length > 0 ? (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                  {filteredFiles.map((file) => (
                    <FileCard key={file.id} {...file} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-tagit-blue">No files match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="pt-6 animate-fade-in">
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                {filteredFiles.slice(0, 3).map((file) => (
                  <FileCard key={file.id} {...file} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FilesPage;