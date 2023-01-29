import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './component/ColorModeSwitcher';
import { Logo } from './component/Logo';

function App() {
  const [value, setValue] = useState(0);

  const getValue = async () => {
    const response = await fetch("http://localhost:8000/value");
    console.log(response);
    const result = await response.json();
    console.log(result);
    setValue(result);
  }

  return (
    <chakra.div 
      display="flex" 
      flexDirection="column" 
      minHeight="100vh"
      bgColor={SiteTheme.white}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/swipe" element={<Swiping />} />
          <Route path="/match" element={<Match />} />
        </Routes>
      </BrowserRouter>
    </chakra.div>
  );
}

export default App;
