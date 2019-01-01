import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const theme = createMuiTheme({
  palette: {
    success: {
      contrastText: '#fff',
      dark: '#087f23',
      light: '#80e27e',
      main: '#4CAF50'
    }
  },
  typography: { useNextVariants: true }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
