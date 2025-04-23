// import { createTheme } from '@mui/material/styles';

// // Define the color palette based on the tagit brand colors
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#a8ebc7', // tagit-mint
//       light: '#cff6e3', // tagit-lightmint
//       dark: '#87ddab', // darker mint
//       contrastText: '#3a5269', // tagit-darkblue
//     },
//     secondary: {
//       main: '#4d6a84', // tagit-blue
//       light: '#6d8ca8',
//       dark: '#3a5269', // tagit-darkblue
//       contrastText: '#ffffff',
//     },
//     text: {
//       primary: '#3a5269', // tagit-darkblue
//       secondary: '#4d6a84', // tagit-blue
//     },
//     background: {
//       default: '#f5f8fa', // light background
//       paper: '#ffffff',
//     },
//     grey: {
//       100: '#f5f8fa',
//       200: '#e1e8ed',
//       300: '#d1dbe2',
//       400: '#98a9b8',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontWeight: 700,
//       fontSize: '2.5rem',
//     },
//     h2: {
//       fontWeight: 700,
//       fontSize: '2rem',
//     },
//     h3: {
//       fontWeight: 600,
//       fontSize: '1.75rem',
//     },
//     h4: {
//       fontWeight: 600,
//       fontSize: '1.5rem',
//     },
//     h5: {
//       fontWeight: 600,
//       fontSize: '1.25rem',
//     },
//     h6: {
//       fontWeight: 600,
//       fontSize: '1rem',
//     },
//     button: {
//       textTransform: 'none',
//       fontWeight: 500,
//     },
//   },
//   shape: {
//     borderRadius: 12,
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           padding: '8px 16px',
//           boxShadow: 'none',
//           '&:hover': {
//             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//           },
//         },
//         containedPrimary: {
//           backgroundColor: '#a8ebc7', // tagit-mint
//           color: '#3a5269', // tagit-darkblue
//           '&:hover': {
//             backgroundColor: '#87ddab', // darker mint
//           },
//         },
//         containedSecondary: {
//           backgroundColor: '#4d6a84', // tagit-blue
//           color: '#ffffff',
//           '&:hover': {
//             backgroundColor: '#3a5269', // tagit-darkblue
//           },
//         },
//         outlinedPrimary: {
//           borderColor: '#a8ebc7', // tagit-mint
//           color: '#3a5269', // tagit-darkblue
//           '&:hover': {
//             backgroundColor: 'rgba(168, 235, 199, 0.08)', // tagit-mint with opacity
//             borderColor: '#87ddab', // darker mint
//           },
//         },
//         outlinedSecondary: {
//           borderColor: '#4d6a84', // tagit-blue
//           color: '#4d6a84',
//           '&:hover': {
//             backgroundColor: 'rgba(77, 106, 132, 0.05)', // tagit-blue with opacity
//             borderColor: '#3a5269', // tagit-darkblue
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 16,
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             borderRadius: 12,
//           },
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           boxShadow: 'none',
//         },
//       },
//     },
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           borderRadius: '0 0 16px 16px',
//         },
//       },
//     },
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#a8ebc7',
//           color: '#3a5269',
//         },
//       },
//     },
//   },
// });

// export default theme;
import { createTheme, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomPaletteColorOptions {
    foreground?: string; // Add foreground property to CustomPaletteColorOptions
    light?: string; // Add light property to CustomPaletteColorOptions
    main?: string; // Add main property to CustomPaletteColorOptions
    dark?: string; // Add dark property to CustomPaletteColorOptions
    contrastText?: string; // Add contrastText property to CustomPaletteColorOptions
  }

  interface PaletteOptions {
    custom?: {
      border?: string;
    };
    border?: string; // Add border directly to PaletteOptions
    input?: string; // Add input property to PaletteOptions
    ring?: string; // Add ring property to PaletteOptions
    foreground?: string; // Add foreground property to PaletteOptions
    destructive?: CustomPaletteColorOptions; // Add destructive property to PaletteOptions
    muted?: CustomPaletteColorOptions; // Add muted property to PaletteOptions
    accent?: CustomPaletteColorOptions; // Add accent property to PaletteOptions
    popover?: CustomPaletteColorOptions; // Add popover property to PaletteOptions
    card?: CustomPaletteColorOptions; // Add card property to PaletteOptions
    sidebar?: {
      background?: string;
      foreground?: string;
      primary?: string;
      primaryForeground?: string;
      accent?: string;
      accentForeground?: string;
      border?: string;
      ring?: string;
    }; // Add sidebar property to PaletteOptions
    tagit?: {
      blue?: string;
      darkblue?: string;
      mint?: string;
      lightmint?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    // custom: {}, // Add a custom property to hold non-standard palette options
    // // Custom property for border
    custom: {
      border: 'hsl(var(--border))',
    },
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: {
      default: 'hsl(var(--background))',
      paper: 'hsl(var(--card))',
    },
    foreground: 'hsl(var(--foreground))',
    primary: {
      light: 'hsl(var(--primary))',
      main: 'hsl(var(--primary))',
      dark: 'hsl(var(--primary))',
      contrastText: 'hsl(var(--primary-foreground))',
      //foreground: 'hsl(var(--primary-foreground))',
    },
    secondary: {
      light: 'hsl(var(--secondary))',
      main: 'hsl(var(--secondary))',
      dark: 'hsl(var(--secondary))',
      contrastText: 'hsl(var(--secondary-foreground))',
      //foreground: 'hsl(var(--secondary-foreground))',
    },
    destructive: {
      light: 'hsl(var(--destructive))',
      main: 'hsl(var(--destructive))',
      dark: 'hsl(var(--destructive))',
      contrastText: 'hsl(var(--destructive-foreground))',
      foreground: 'hsl(var(--destructive-foreground))',
    },
    muted: {
      light: 'hsl(var(--muted))',
      main: 'hsl(var(--muted))',
      dark: 'hsl(var(--muted))',
      contrastText: 'hsl(var(--muted-foreground))',
      foreground: 'hsl(var(--muted-foreground))',
    },
    accent: {
      light: 'hsl(var(--accent))',
      main: 'hsl(var(--accent))',
      dark: 'hsl(var(--accent))',
      contrastText: 'hsl(var(--accent-foreground))',
      foreground: 'hsl(var(--accent-foreground))',
    },
    popover: {
      light: 'hsl(var(--popover))',
      main: 'hsl(var(--popover))',
      dark: 'hsl(var(--popover))',
      contrastText: 'hsl(var(--popover-foreground))',
      foreground: 'hsl(var(--popover-foreground))',
    },
    card: {
      light: 'hsl(var(--card))',
      main: 'hsl(var(--card))',
      dark: 'hsl(var(--card))',
      contrastText: 'hsl(var(--card-foreground))',
      foreground: 'hsl(var(--card-foreground))',
    },
    sidebar: {
      background: 'hsl(var(--sidebar-background))',
      foreground: 'hsl(var(--sidebar-foreground))',
      primary: 'hsl(var(--sidebar-primary))',
      primaryForeground: 'hsl(var(--sidebar-primary-foreground))',
      accent: 'hsl(var(--sidebar-accent))',
      accentForeground: 'hsl(var(--sidebar-accent-foreground))',
      border: 'hsl(var(--sidebar-border))',
      ring: 'hsl(var(--sidebar-ring))',
    },
    tagit: {
      blue: '#4d6a84',
      darkblue: '#3a5269',
      mint: '#a8ebc7',
      lightmint: '#cff6e3',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
      styleOverrides: {
        root: {
          paddingLeft: '2rem',
          paddingRight: '2rem',
          '@media (min-width: 1400px)': {
            maxWidth: '1400px',
            margin: '0 auto',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Inter', sans-serif",
          fontFeatureSettings: "'ss01', 'ss02', 'cv01', 'cv02', 'cv03'",
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
        },
        html: {
          scrollBehavior: 'smooth',
        },
        '*': {
          borderColor: 'hsl(var(--border))',
          boxSizing: 'border-box',
        },
      },
    },
  },
});

export type Theme = typeof theme;
export default theme;
