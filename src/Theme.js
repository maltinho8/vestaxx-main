import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`

  html {
    font-size: 100%;
  }

  h1 {
    font-weight: 200;
    font-size: 3rem;
    color: darkorange;
    
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 8px;
    color: darkorange;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 8px;
    color: darkorange;
    
  }

  h4 {
    font-size: 1.6rem;
    color: darkorange;
    
  }

  h5 {
    font-size: 1.8rem;
    color: white;
    
  }

  p {
    font-size: 1rem;
    color: darkorange;
    
  }
`;

const theme = {
  palette: {
    primary: {
      main: '#3D5A80',
      light: '#98C1D9',
      ultraLight: '#E0FBFC',
    },
    secondary: {
      main: '#EE6C4D',
      light: '#F3947C',
    },
    text: {
      main: '#293241',
      light: '#F5F5F5',
    },
    background: {
      dark: '#1E2426',
      light: '#F2ECD4',
    },
  },
};

export default theme;
