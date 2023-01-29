import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider 
      theme={extendTheme({
        fonts: {
          heading: `Grand Hotel, 'Open Sans', sans-serif`, 
        }
      })}
    >
      <App />
    </ChakraProvider>
  </StrictMode>
);
