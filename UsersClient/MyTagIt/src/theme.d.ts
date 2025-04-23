import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tagit: {
      blue: string;
      darkblue: string;
      mint: string;
      lightmint: string;
    };
  }

  interface PaletteOptions {
    tagit?: {
      blue: string;
      darkblue: string;
      mint: string;
      lightmint: string;
    };
  }

  interface PaletteColor {
    foreground?: string;
  }

  interface ExtendedPaletteColorOptions extends PaletteColor {
    foreground?: string;
  }
}
