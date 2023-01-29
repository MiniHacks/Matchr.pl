import React, {useState, useEffect} from 'react';
import {
  Flex,
  Box,
  Text,
  Image,
  Heading, 
  IconButton
} from '@chakra-ui/react';
import { SiteThemes, SiteSizes } from '../util/global';
import {FiChevronsUp, FiChevronsDown, FiChevronUp, FiChevronDown, FiChevronLeft, FiInfo} from 'react-icons/fi';
import Profile from "../util/profile";


function Swipe() {
  const pinkcolor = '#F7DBD7';
  console.log(Profile.getID());
  console.log(Profile.getElection());
  const [card, setCard] = useState({
    quote : 'hi',
    word : 'greeting',
    definition : 'a way to greet someone',
    link : "https://.....com"
  })

  useEffect(() => {
    async function getQuote(){
      const response = await fetch('http://localhost:8000/nq');
      if (!response.ok) return;
      const result = await response.json();
      setCard(result);
    }
    //getQuote();
  });

  return (
    <Flex flexDirection='column' justify="space-around" align='center'>
      <Heading fontSize={SiteSizes.heading}> match.pol </Heading>
      <Flex> 
        <Box borderRadius= '20' w = '350px' h = '700px' bg= {pinkcolor} paddingTop='25px' paddingBottom='50px' paddingRight='25px' paddingLeft='25px' margin-right='25px'>
          <Text align='center' fontSize = {SiteSizes.subheading}> {card.quote}</Text>
          <IconButton position='absolute' bottom='100px' right='40px' bg= {pinkcolor} isRound='true' icon={<FiInfo size='lg'/>}/>
        </Box>
        
        </Flex>
     <Flex margin='10px' padding='10px' flexDirection= 'row' > 
        <IconButton bg= {SiteThemes.backgroundColor} isRound='true' icon={<FiChevronLeft size='lg'/>}/>
        <IconButton bg= {SiteThemes.backgroundColor} isRound='true' icon={<FiChevronsDown size='lg'/>}/>
        <IconButton bg= {SiteThemes.backgroundColor} isRound='true' icon={<FiChevronDown size='lg'/>}/>
        <IconButton bg= {SiteThemes.backgroundColor} isRound='true' icon={<FiChevronUp size='lg'/>}/>
        <IconButton bg= {SiteThemes.backgroundColor} isRound='true' icon={<FiChevronsUp size='lg'/>}/>
      </Flex>
    </Flex>
  );
}

export default Swipe;
