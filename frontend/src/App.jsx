import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { SiteThemes } from './util/global';
import { chakra } from '@chakra-ui/react';
import Landing from './component/Landing';
import Swipe from './component/Swipe';
import Match from './component/Match';

function App() {
  return (
    <chakra.div 
      display="flex" 
      flexDirection="column" 
      minHeight="100vh"
      bgColor={SiteThemes.backgroundColor}
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
