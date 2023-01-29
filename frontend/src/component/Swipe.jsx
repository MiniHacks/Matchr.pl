import { useState, useEffect } from 'react';
import { Flex, Box, Heading, Text, IconButton} from '@chakra-ui/react';
import { SiteThemes, SiteSizes } from '../util/global';
import {FiChevronsUp, FiChevronsDown, FiChevronUp, FiChevronDown, FiChevronLeft} from 'react-icons/fi';
import Profile from "../util/profile";

function Swipe() {
  const [asked, setAsked] = useState(0);

  const [card, setCard] = useState({
    quote : 'First-trimester abortion is murder',
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

  if (card === undefined) {
    return <>Still loading..</>
  }

  return (
    <Flex 
      flex="1"
      flexDirection='column' 
      justify="space-around" 
      align='center'
      padding="1rem"
      gap="1rem"
    >
      <Heading fontSize={SiteSizes.heading}> match.pol </Heading>
      <Flex 
        flexDir="column" 
        flex="1"
        padding="2rem"
        borderRadius="2rem"
        bg={SiteThemes.mainColor}
      >
        <Box flex="0.5" align="center" fontSize={SiteSizes.subheading}>
          <Text> Your Thoughts? </Text>
        </Box>
        <Box flex="0.8" align="center" fontSize={SiteSizes.subheading}>
          <Text>"{card.quote}"</Text>
        </Box>
      </Flex>
      <Flex gap="1rem" justify="space-between" > 
        <IconButton bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronLeft size={50} />}/>
        <IconButton bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronsDown size={50} />}/>
        <IconButton bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronDown size={50} />}/>
        <IconButton bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronUp size={50} />}/>
        <IconButton bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronsUp size={50} />}/>
      </Flex>
    </Flex>
  );
}

export default Swipe;
