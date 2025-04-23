import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Button, 
  TextField, 
  Chip,
  LinearProgress,
  IconButton,
  Grid,
  useTheme,
  alpha
} from '@mui/material';
import {
  CloudUpload,
  Add,
  Close
} from '@mui/icons-material';
// import LayoutWrapper from '@/components/LayoutWrapper';

const FileUploadPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Glass card styling for the upload area
  const glassCard = {
    background: alpha(theme.palette.background.paper, 0.7),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    boxShadow: `0 4px 30px ${alpha(theme.palette.common.black, 0.1)}`,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(5),
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
}

const handleFileChange = (event: FileChangeEvent): void => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        
        // Simulate AI tag suggestions based on file name
        // In a real app, this would come from your AI analysis
        setTimeout(() => {
            const demoTags = generateDemoTags(selectedFile.name);
            setSuggestedTags(demoTags);
        }, 1000);
    }
};

interface DemoTagSets {
    [key: string]: string[];
}

const generateDemoTags = (name: string): string[] => {
    // This would be replaced by actual AI analysis in production
    const nameLower: string = name.toLowerCase();
    const demoTagSets: DemoTagSets = {
        'pdf': ['document', 'report', 'contract'],
        'doc': ['text', 'document', 'agreement'],
        'jpg': ['image', 'photo', 'visual'],
        'png': ['image', 'graphic', 'logo'],
        'xls': ['spreadsheet', 'data', 'financial'],
        'ppt': ['presentation', 'slides', 'meeting']
    };
    
    // Find extension and return related tags
    const extension: string = name.split('.').pop()?.toLowerCase() || '';
    const baseTags: string[] = demoTagSets[extension] || ['document', 'file'];
    
    // Add some context-based tags based on filename
    const contextTags: string[] = [];
    if (nameLower.includes('invoice')) contextTags.push('invoice', 'payment');
    if (nameLower.includes('report')) contextTags.push('report', 'analysis');
    if (nameLower.includes('contract')) contextTags.push('contract', 'legal');
    
    return [...new Set([...baseTags, ...contextTags])];
};

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

const handleRemoveTag = (tagToRemove: string): void => {
    setTags(tags.filter((tag: string) => tag !== tagToRemove));
};

const handleAddSuggestedTag = (tag: string): void => {
    if (!tags.includes(tag)) {
        setTags([...tags, tag]);
        setSuggestedTags(suggestedTags.filter((t: string) => t !== tag));
    }
};

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          // Reset form or navigate to success page
          alert('File uploaded successfully with tags: ' + tags.join(', '));
        }, 500);
      }
    }, 300);
  };

  return (
    // <LayoutWrapper
    <>
      <Box 
        sx={{ 
          minHeight: '80vh', 
          py: { xs: 4, md: 8 },
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(180deg, ${theme.palette.grey[100]} 0%, ${theme.palette.background.paper} 100%)`,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'secondary.dark',
                mb: 2
              }}
            >
              Upload Your File
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'secondary.main',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Our AI will automatically analyze and tag your file for easy organization and retrieval.
            </Typography>
          </Box>
          
          <Paper 
            elevation={0} 
            sx={{ 
              ...glassCard,
              width: '100%',
              '&:hover': {
                boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.15)}`,
              }
            }}
          >
            {/* File Upload Area */}
            <Box 
              sx={{ 
                border: '2px dashed',
                borderColor: 'primary.main',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                mb: 4,
                backgroundColor: alpha(theme.palette.primary.light, 0.1),
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.light, 0.2),
                }
              }}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <CloudUpload sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'secondary.main', mb: 1 }}>
                Drag & drop files here or click to browse
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Supports PDF, Word, Excel, PowerPoint, JPG, PNG files up to 50MB
              </Typography>
              
              {fileName && (
                <Box 
                  sx={{ 
                    mt: 2, 
                    p: 2, 
                    backgroundColor: 'grey.100', 
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography noWrap>{fileName}</Typography>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setFileName('');
                      setSuggestedTags([]);
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              )}
            </Box>
            
            {/* Tag Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'secondary.dark' }}>
                File Tags
              </Typography>
              
              {/* Manual Tag Input */}
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Add a custom tag..."
                  size="small"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ ml: 1 }}
                  onClick={handleAddTag}
                >
                  <Add />
                </Button>
              </Box>
              
              {/* Current Tags */}
              <Box sx={{ mb: 3, minHeight: '40px' }}>
                {tags.map((tag, index) => (
                  <Chip 
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    sx={{ 
                      m: 0.5, 
                      backgroundColor: 'primary.light', 
                      color: 'secondary.dark',
                      fontWeight: 'medium',
                      '& .MuiChip-deleteIcon': {
                        color: 'secondary.main',
                      }
                    }}
                  />
                ))}
              </Box>
              
              {/* AI Suggested Tags */}
              {suggestedTags.length > 0 && (
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1, color: 'secondary.main' }}>
                    AI Suggested Tags:
                  </Typography>
                  <Box>
                    {suggestedTags.map((tag, index) => (
                      <Chip 
                        key={index}
                        label={tag}
                        onClick={() => handleAddSuggestedTag(tag)}
                        sx={{ 
                          m: 0.5, 
                          backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          color: 'secondary.main',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.3),
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
            
            {/* Upload Progress */}
            {isUploading && (
              <Box sx={{ width: '100%', mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'secondary.main', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={uploadProgress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 5,
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'primary.main',
                    }
                  }} 
                />
              </Box>
            )}
            
            {/* Upload Button */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              disabled={!file || isUploading}
              onClick={handleUpload}
              sx={{ 
                py: 1.5,
                fontWeight: 'medium',
                fontSize: '1rem',
                boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.4)}`,
                '&:hover': {
                  boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}`,
                }
              }}
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </Button>
          </Paper>
          
          {/* Additional Information */}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                textAlign: 'center',
                backgroundColor: alpha(theme.palette.primary.light, 0.2),
                p: 3,
                borderRadius: 2
              }}>
                <Typography variant="h6" sx={{ color: 'secondary.dark', mb: 1 }}>
                  AI-Powered
                </Typography>
                <Typography variant="body2" sx={{ color: 'secondary.main' }}>
                  Our advanced AI analyzes your files to suggest relevant tags automatically.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                textAlign: 'center',
                backgroundColor: alpha(theme.palette.primary.light, 0.2),
                p: 3,
                borderRadius: 2
              }}>
                <Typography variant="h6" sx={{ color: 'secondary.dark', mb: 1 }}>
                  Secure Storage
                </Typography>
                <Typography variant="body2" sx={{ color: 'secondary.main' }}>
                  All your files are encrypted and stored securely in the cloud.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                textAlign: 'center',
                backgroundColor: alpha(theme.palette.primary.light, 0.2),
                p: 3,
                borderRadius: 2
              }}>
                <Typography variant="h6" sx={{ color: 'secondary.dark', mb: 1 }}>
                  Easy Retrieval
                </Typography>
                <Typography variant="body2" sx={{ color: 'secondary.main' }}>
                  Find your files instantly using our advanced tag-based search system.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    {/* </LayoutWrapper> */}
    </>
  );
};

export default FileUploadPage;