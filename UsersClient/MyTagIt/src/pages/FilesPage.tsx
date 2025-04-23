import React, { useState, useMemo, JSX } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    TextField,
    IconButton,
    Button,
    Grid,
    Chip,
    Menu,
    MenuItem,
    Divider,
    Avatar,
    Card,
    CardContent,
    CardActionArea,
    Breadcrumbs,
    Link,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton,
    alpha,
    useTheme
} from '@mui/material';
import {
    Search,
    GridView,
    ViewList,
    Sort,
    FileUpload,
    FolderOpen,
    Article,
    Image,
    PictureAsPdf,
    InsertDriveFile,
    MoreVert,
    Delete,
    Edit,
    Download,
    Share,
    Star,
    StarBorder,
    NavigateNext
} from '@mui/icons-material';
// import LayoutWrapper from '@/components/LayoutWrapper';

// Demo data for files and folders
const DEMO_FOLDERS = [
    { id: 1, name: 'Contracts', type: 'folder', items: 24, lastModified: '2023-07-15' },
    { id: 2, name: 'Marketing Materials', type: 'folder', items: 17, lastModified: '2023-08-02' },
    { id: 3, name: 'Financial Reports', type: 'folder', items: 9, lastModified: '2023-08-10' },
    { id: 4, name: 'Project Proposals', type: 'folder', items: 12, lastModified: '2023-08-05' }
];

const DEMO_FILES = [
    {
        id: 101,
        name: 'Annual Report 2023.pdf',
        type: 'pdf',
        size: '2.4 MB',
        lastModified: '2023-08-11',
        starred: true,
        tags: ['financial', 'report', 'annual']
    },
    {
        id: 102,
        name: 'Project Timeline.xlsx',
        type: 'excel',
        size: '1.8 MB',
        lastModified: '2023-08-09',
        starred: false,
        tags: ['timeline', 'project', 'schedule']
    },
    {
        id: 103,
        name: 'Marketing Presentation.pptx',
        type: 'powerpoint',
        size: '5.2 MB',
        lastModified: '2023-08-07',
        starred: false,
        tags: ['presentation', 'marketing', 'slides']
    },
    {
        id: 104,
        name: 'Client Contract.docx',
        type: 'word',
        size: '1.1 MB',
        lastModified: '2023-08-04',
        starred: true,
        tags: ['contract', 'legal', 'client']
    },
    {
        id: 105,
        name: 'Product Photo.jpg',
        type: 'image',
        size: '3.7 MB',
        lastModified: '2023-08-01',
        starred: false,
        tags: ['product', 'image', 'marketing']
    },
    {
        id: 106,
        name: 'Employee Handbook.pdf',
        type: 'pdf',
        size: '4.2 MB',
        lastModified: '2023-07-28',
        starred: false,
        tags: ['handbook', 'policy', 'employees']
    }
];

// Function to get icon for file type
interface FileIconProps {
    type: 'folder' | 'pdf' | 'word' | 'excel' | 'powerpoint' | 'image' | string;
}

const getFileIcon = (type: FileIconProps['type']): JSX.Element => {
    switch(type) {
        case 'folder':
            return <FolderOpen sx={{ color: '#FFC107', fontSize: 40 }} />;
        case 'pdf':
            return <PictureAsPdf sx={{ color: '#F44336', fontSize: 40 }} />;
        case 'word':
            return <Article sx={{ color: '#2196F3', fontSize: 40 }} />;
        case 'excel':
            return <InsertDriveFile sx={{ color: '#4CAF50', fontSize: 40 }} />;
        case 'powerpoint':
            return <InsertDriveFile sx={{ color: '#FF9800', fontSize: 40 }} />;
        case 'image':
            return <Image sx={{ color: '#9C27B0', fontSize: 40 }} />;
        default:
            return <InsertDriveFile sx={{ color: '#757575', fontSize: 40 }} />;
    }
};

const FilesPage = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortMenuAnchor, setSortMenuAnchor] = useState<HTMLButtonElement | null>(null);
    const [fileMenuAnchor, setFileMenuAnchor] = useState<HTMLButtonElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [currentPath, setCurrentPath] = useState([{ name: 'My Files', id: 'root' }]);
    const [currentTags, setCurrentTags] = useState<string[]>([]);

    // Filter items based on search term and tags
    const items = useMemo(() => {
        return [...DEMO_FOLDERS, ...DEMO_FILES].filter(item => {
            const searchMatch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const tagMatch = currentTags.length === 0 || ('tags' in item && currentTags.some(tag => item.tags.includes(tag)));
            return searchMatch && tagMatch;
        });
    }, [searchTerm, DEMO_FOLDERS, DEMO_FILES, currentTags]);

    interface HandleTagClickProps {
        tag: string;
    }

    const handleTagClick = (tag: HandleTagClickProps['tag']): void => {
        setCurrentTags((prevTags: string[]) =>
            prevTags.includes(tag) ? prevTags.filter((t: string) => t !== tag) : [...prevTags, tag]
        );
    };

    interface HandleSearchEvent extends React.ChangeEvent<HTMLInputElement> {}

    const handleSearch = (e: HandleSearchEvent): void => {
        setSearchTerm(e.target.value);
    };

    const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: string | null): void => {
        if (newView !== null) {
            setViewMode(newView);
        }
    };

    interface HandleSortMenuOpenEvent extends React.MouseEvent<HTMLButtonElement> {}

    const handleSortMenuOpen = (event: HandleSortMenuOpenEvent): void => {
        setSortMenuAnchor(event.currentTarget);
    };

    const handleSortMenuClose = () => {
        setSortMenuAnchor(null);
    };

    interface HandleFileMenuOpenEvent extends React.MouseEvent<HTMLButtonElement> {}

    interface File {
        id: number;
        name: string;
        type: string;
        size?: string;
        lastModified: string;
        starred?: boolean;
        tags?: string[];
        items?: number;
    }

    const handleFileMenuOpen = (event: HandleFileMenuOpenEvent, file: File): void => {
        event.stopPropagation();
        setSelectedFile(file);
        setFileMenuAnchor(event.currentTarget);
    };

    const handleFileMenuClose = () => {
        setFileMenuAnchor(null);
    };

    interface Folder {
        id: number;
        name: string;
        type: 'folder';
        items: number;
        lastModified: string;
    }

    const navigateToFolder = (folder: Folder): void => {
        setCurrentPath(prevPath => [...prevPath, { name: folder.name, id: folder.id.toString() }]);
    };

    interface Breadcrumb {
        name: string;
        id: string;
    }

    const navigateToBreadcrumb = (index: number): void => {
        setCurrentPath((prevPath: Breadcrumb[]) => prevPath.slice(0, index + 1));
    };

    interface ToggleStarredProps {
        fileId: number;
    }

    const toggleStarred = (fileId: ToggleStarredProps['fileId']): void => {
        // In a real app, this would update the backend and potentially local state
        console.log(`Toggled star for file ${fileId}`);
        // כאן תוכל לעדכן את מצב הכוכב של הפריט אם אתה שומר את המידע הזה במצב הקומפוננטה
    };

    // All unique tags from our demo data for the tags filter
    const allTags = useMemo(() => [...new Set(DEMO_FILES.flatMap(file => file.tags || []))], [DEMO_FILES]);

    return (
        // <LayoutWrapper>
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    py: { xs: 4, md: 5 },
                    backgroundColor: 'grey.50'
                }}
            >
                <Container maxWidth="xl">
                    {/* Header and Search */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 2, md: 0 },
                        mb: 4
                    }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                color: 'secondary.dark',
                            }}
                        >
                            My Files
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                placeholder="Search files..."
                                variant="outlined"
                                size="small"
                                value={searchTerm}
                                onChange={handleSearch}
                                sx={{ width: { xs: '100%', sm: 250 } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search color="action" />
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<FileUpload />}
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                Upload
                            </Button>
                        </Box>
                    </Box>

                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        separator={<NavigateNext fontSize="small" />}
                        sx={{ mb: 2 }}
                    >
                        {currentPath.map((item, index) => (
                            <Link
                                key={item.id}
                                underline={index === currentPath.length - 1 ? 'none' : 'hover'}
                                color={index === currentPath.length - 1 ? 'text.primary' : 'inherit'}
                                sx={{
                                    cursor: 'pointer',
                                    fontWeight: index === currentPath.length - 1 ? 'medium' : 'normal'
                                }}
                                onClick={() => navigateToBreadcrumb(index)}
                            >
                                {item.name}
                            </Link>
                        )}
                    </Breadcrumbs>

                    {/* Tags Filter */}
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                color: 'secondary.dark'
                            }}
                        >
                            Filter by tags:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {allTags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onClick={() => handleTagClick(tag)}
                                    color={currentTags.includes(tag) ? "primary" : "default"}
                                    variant={currentTags.includes(tag) ? "filled" : "outlined"}
                                    sx={{
                                        '&.MuiChip-colorPrimary': {
                                            backgroundColor: 'primary.light',
                                            color: 'secondary.dark',
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Controls */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {items.length} items
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button
                                size="small"
                                startIcon={<Sort />}
                                onClick={handleSortMenuOpen}
                                variant="outlined"
                                sx={{ borderColor: 'grey.300', color: 'secondary.main' }}
                            >
                                Sort By
                            </Button>

                            <Menu
                                anchorEl={sortMenuAnchor}
                                open={Boolean(sortMenuAnchor)}
                                onClose={handleSortMenuClose}
                            >
                                <MenuItem onClick={handleSortMenuClose}>Name (A-Z)</MenuItem>
                                <MenuItem onClick={handleSortMenuClose}>Name (Z-A)</MenuItem>
                                <MenuItem onClick={handleSortMenuClose}>Newest First</MenuItem>
                                <MenuItem onClick={handleSortMenuClose}>Oldest First</MenuItem>
                                <MenuItem onClick={handleSortMenuClose}>Size (Largest)</MenuItem>
                                <MenuItem onClick={handleSortMenuClose}>Size (Smallest)</MenuItem>
                            </Menu>

                            <ToggleButtonGroup
                                value={viewMode}
                                exclusive
                                onChange={handleViewChange}
                                size="small"
                            >
                                <ToggleButton value="grid" aria-label="grid view">
                                    <GridView />
                                </ToggleButton>
                                <ToggleButton value="list" aria-label="list view">
                                    <ViewList />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Box>

                    {/* Files and folders grid */}
                    {viewMode === 'grid' ? (
                        <Grid container spacing={3}>
                            {items.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    <Card
                                        sx={{
                                            position: 'relative',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                    >
                                        <CardActionArea
                                            onClick={() => item.type === 'folder' ? navigateToFolder(item) : console.log('Open file:', item.name)}
                                            sx={{ p: 2 }}
                                        >
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                {getFileIcon(item.type)}

                                                <Box sx={{ display: 'flex' }}>
                                                    {'starred' in item && (
                                                        <IconButton
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleStarred(item.id);
                                                            }}
                                                        >
                                                              {'starred' in item && (item.starred ? <Star sx={{ color: '#FFC107' }} /> : <StarBorder />)}
                                                        </IconButton>
                                                    )}

                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => handleFileMenuOpen(e, item)}
                                                    >
                                                        <MoreVert />
                                                    </IconButton>
                                                </Box>
                                            </Box>

                                            <CardContent sx={{ pt: 1 }}>
                                                <Typography variant="subtitle1" component="div" noWrap sx={{ fontWeight: 'medium' }}>
                                                    {item.name}
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        mt: 1
                                                    }}
                                                >
                                                    <Typography variant="caption" color="text.secondary">
                                                        {item.type === 'folder'
                                                            ? 'items' in item ? `${item.items} items` : ''
                                                            : 'size' in item ? item.size : ''}
                                                    </Typography>

                                                    <Typography variant="caption" color="text.secondary">
                                                        {item.lastModified}
                                                    </Typography>
                                                </Box>

                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {'tags' in item && item.tags.slice(0, 3).map((tag) => (
                                <Chip 
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{ 
                                        height: 20, 
                                        fontSize: '0.65rem',
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        color: 'secondary.main'
                                    }}
                                />
                            ))}
                        </Box>
                    </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper elevation={0} sx={{ overflow: 'hidden' }}>
              {items.map((item) => (
                <Box key={item.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'grey.50'
                      }
                    }}
                    onClick={() => item.type === 'folder' ? navigateToFolder(item) : console.log('Open file:', item.name)}
                  >
                    <Box sx={{ mr: 2 }}>
                      {getFileIcon(item.type)}
                    </Box>
                    
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'medium' }}>
                        {item.name}
                      </Typography>
                      
                      {'tags' in item && item.tags && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          {item.tags.slice(0, 3).map((tag) => (
                            <Chip 
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{ 
                                height: 20, 
                                fontSize: '0.65rem',
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                color: 'secondary.main'
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mr: 4, display: { xs: 'none', md: 'block' } }}
                    >
                      {item.type === 'folder' && 'items' in item ? `${item.items} items` : item.size}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                    >
                      {item.lastModified}
                    </Typography>
                    
                    <Box sx={{ display: 'flex' }}>
                      {'starred' in item && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStarred(item.id);
                          }}
                        >
                          {item.starred ? <Star sx={{ color: '#FFC107' }} /> : <StarBorder />}
                        </IconButton>
                      )}
                      
                      <IconButton
                        size="small"
                        onClick={(e) => handleFileMenuOpen(e, item)}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </Paper>
          )}
          
          {/* Empty state */}
          {items.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                backgroundColor: 'background.paper',
                borderRadius: 2
              }}
            >
              <InsertDriveFile sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No files found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchTerm 
                  ? `No files or folders match "${searchTerm}"`
                  : currentTags.length > 0 
                    ? "No files match the selected tags" 
                    : "This folder is empty"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FileUpload />}
              >
                Upload Files
              </Button>
            </Box>
          )}
        </Container>
      </Box>
      
      {/* File Actions Menu */}
      <Menu
        anchorEl={fileMenuAnchor}
        open={Boolean(fileMenuAnchor)}
        onClose={handleFileMenuClose}
      >
        <MenuItem onClick={handleFileMenuClose}>
          <Download sx={{ mr: 1, fontSize: 20 }} />
          Download
        </MenuItem>
        <MenuItem onClick={handleFileMenuClose}>
          <Share sx={{ mr: 1, fontSize: 20 }} />
          Share
        </MenuItem>
        <MenuItem onClick={handleFileMenuClose}>
          <Edit sx={{ mr: 1, fontSize: 20 }} />
          Rename
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleFileMenuClose} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>
    {/* </LayoutWrapper> */}
    </>
  );
};

export default FilesPage;