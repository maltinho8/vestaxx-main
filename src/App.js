import React from 'react';
import theme, {GlobalStyle} from './Theme';
import {ThemeProvider} from 'styled-components';
import Routing from './components/Router/Router';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Routing/>

        </ThemeProvider>


    );
}

export default App;
