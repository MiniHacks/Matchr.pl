import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
