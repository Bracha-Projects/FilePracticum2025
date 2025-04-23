import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const theme = useTheme();
  
  // Size map for the logo
  const sizeMap = {
    sm: { logoSize: 32, textSize: 'h6', subTextSize: 'caption' },
    md: { logoSize: 40, textSize: 'h5', subTextSize: 'caption' },
    lg: { logoSize: 64, textSize: 'h4', subTextSize: 'body2' }
  };
  
  const { logoSize, textSize, subTextSize } = sizeMap[size];

  return (
    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
      <Box 
        sx={{ 
          position: 'relative', 
          width: logoSize, 
          height: logoSize,
          transition: 'transform 0.5s',
          '&:hover': {
            transform: 'rotate(5deg)'
          }
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            inset: 0, 
            transform: 'rotate(45deg)', 
            border: `2px solid ${theme.palette.primary.main}`, 
            borderRadius: 1 
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            inset: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Box 
            sx={{ 
              width: logoSize / 4, 
              height: logoSize / 4, 
              borderRadius: '50%', 
              bgcolor: theme.palette.primary.main 
            }} 
          />
        </Box>
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '75%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          <Box 
            sx={{ 
              width: logoSize / 5, 
              height: logoSize / 5, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <Box 
              sx={{ 
                width: '67%', 
                height: '67%', 
                borderRadius: '50%', 
                border: `1px solid ${theme.palette.primary.main}` 
              }} 
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                width: '25%', 
                height: '25%', 
                borderRadius: '50%', 
                bgcolor: theme.palette.primary.main 
              }} 
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                width: 1, 
                height: '50%', 
                bgcolor: theme.palette.primary.main, 
                top: '50%' 
              }} 
            />
          </Box>
        </Box>
      </Box>
      
      {withText && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant={textSize as any} 
            component="span" 
            sx={{ 
              fontWeight: 600, 
              color: theme.palette.secondary.dark, 
              letterSpacing: '-0.5px',
              lineHeight: 1
            }}
          >
            Tag<Typography component="span" variant="inherit" color="primary.main">-</Typography>it
          </Typography>
          
          {size === 'lg' && (
            <Typography 
              variant={subTextSize as any}
              sx={{ 
                color: theme.palette.secondary.main, 
                mt: 0.5 
              }}
            >
              Intelligent File Management
            </Typography>
          )}
        </Box>
      )}
    </Link>
  );
};

export default Logo;