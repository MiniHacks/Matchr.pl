import { useState, useEffect } from 'react';
import { Flex, Box, Heading, Text, IconButton} from '@chakra-ui/react';
import { SiteThemes, SiteSizes } from '../util/global';
import {FiChevronsUp, FiChevronsDown, FiChevronUp, FiChevronDown, FiChevronLeft, FiInfo} from 'react-icons/fi';
import Profile from "../util/profile";

function Swipe() {
  const pinkcolor = '#F7DBD7';
  const [onCard, setOnCard] = useState(true);
  console.log(Profile.getID());
  console.log(Profile.getElection());

  const [card, setCard] = useState({
    quote : 'First-trimester abortion is murder',
    word : 'greeting',
    definition : 'a way to greet someone',
    link : "https://.....com"
  })

  // const callSetOnCard = () => {
  //   setOnCard(!onCard);
  // };
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

  if(onCard){
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
            <Text>{card.quote}</Text>
            <IconButton onClick={()=>setOnCard(!onCard)} position='absolute'bottom='100px' right='40px' bg={pinkcolor} isRound='true' icon={<FiInfo size={60} />}/>
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
  return (
    <Flex 
    flex="1"
    flexDirection='column' 
    justify="space-around" 
    align='center'
    padding="1rem"
    gap="1rem"
  >
    <Flex 
      flexDir="column" 
      padding="2rem"
      borderRadius="2rem"
      bg={SiteThemes.mainColor}
    >
      <Box flex="0.8" align="center" fontSize={SiteSizes.subheading}>
        <Text>{card.quote}</Text>
        <IconButton onClick={()=>setOnCard(!onCard)} position='absolute'bottom='100px' right='40px' bg={pinkcolor} isRound='true' icon={<FiInfo size={60} />}/>
      </Box>
    </Flex>
    <Flex gap="1rem" justify="space-between" > 
      <IconButton bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronsDown size={50} />}/>
      <IconButton bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronDown size={50} />}/>
      <IconButton bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronUp size={50} />}/>
      <IconButton bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronsUp size={50} />}/>
    </Flex>
  </Flex>
  );
}

export default Swipe;
