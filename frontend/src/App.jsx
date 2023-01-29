import { useState } from 'react';
import { chakra } from '@chakra-ui/react';
import Landing from './component/Landing';
import Swipe from './component/Swipe';
import Match from './component/Match';
import { theme } from './util/global';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';

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
      bgColor={theme}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/swipe" element={<Swipe />} />
          <Route path="/match" element={<Match />} />
        </Routes>
      </BrowserRouter>
    </chakra.div>
  );
}

export default App;
