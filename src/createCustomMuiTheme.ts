import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    success: {
      contrastText: string;
      dark: string;
      light: string;
      main: string;
    };
  }

  interface ThemeOptions {
    success?: {
      contrastText?: string;
      dark?: string;
      light?: string;
      main?: string;
    };
  }
}

export function createCustomMuiTheme(options: ThemeOptions = {}) {
  return createMuiTheme({
    success: {
      contrastText: '#fff',
      dark: '#087f23',
      light: '#80e27e',
      main: '#4CAF50',
    },
    palette: {
      primary: {
        main: '#263238',
      },
      secondary: {
        main: '#81d4fa',
      },
    },
    ...options,
  });
}
