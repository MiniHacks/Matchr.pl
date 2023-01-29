import React, {useState, useEffect} from 'react';
import {
  Flex,
  Box,
  Text,
  Image,
  Heading, 
  Icon
} from '@chakra-ui/react';
import {ArrowBackIcon, ChevronUpIcon, ChevronDownIcon, ArrowLeftIcon, ArrowRightIcon} from '@chakra-ui/icons';
import { SiteThemes, SiteSizes } from '../util/global';
import {FiChevronsUp} from 'react-icons/ri';


function Swipe() {
  const [card, setCard] = useState({
    quote : 'hi',
    word : 'greeting',
    definition : 'a way to greet someone',
    link : "https://.....com"
  })

  useEffect(() => {
    async function getQuote(){
      const response = await fetch('http://localhost:8000/nq');
      if(!response.ok){
        console.log("error");
        return;
      }
      const result = await response.json();
      setCard(result);
    }
    //getQuote();
  });

  return (
    <Flex flexDirection='column' justify="space-around" align='center'>
      <Heading fontSize={SiteSizes.heading}> match.pol </Heading>
      <Flex> 
        <Box borderRadius= '20' w = '350px' h = '600px' bg="#F7DBD7" paddingTop='25px' paddingBottom='50px' paddingRight='25px' paddingLeft='25px' margin-right='25px'>
          <Text align='center' fontSize = {SiteSizes.subheading}> {card.quote}</Text>
        </Box>
        
        </Flex>
     <Flex flexDirection= 'row' > 
          <Icon as={FiChevronsUp}/>
       </Flex>
    </Flex>
  );
}

export default Swipe;
