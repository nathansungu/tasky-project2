import { ThemeProvider, createTheme } from '@mui/material'; 
import { BrowserRouter } from 'react-router-dom';
import PagesRoutes from './routes/routes';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4F46E5' },
    secondary: { main: '#64748B' },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  
});

function App() {
  return (
    
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <PagesRoutes />
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
