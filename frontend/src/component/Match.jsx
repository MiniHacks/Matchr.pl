import React, {useEffect, useState} from 'react';
import {
  Flex,
  Box,
  Text,
  Image,
  Heading
} from '@chakra-ui/react';
import { SiteSizes } from '../util/global';


function Match() {
  const [data, setData] = useState({
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg',
    cand: 'Joe Biden',
    match: '88',
    description: 'description'
  })

  useEffect(() => {
    async function getResults(){
      const response = await fetch('http://localhost:8000/done');
      if (!response.ok) return;
      const result = await response.json();
      setData(result);
    }
    //getResults();
  });
  
  return (
    <Flex flexDirection='column' justify="space-around" align='center'>
      <Heading fontSize={SiteSizes.heading}> match.pol </Heading>
      <Flex> 
        <Box borderRadius= '20' w = '350px' h = '700px' bg="#FAEACB" paddingTop='25px' paddingBottom='50px' paddingRight='25px' paddingLeft='25px' margin-right='25px'>
          <Image borderRadius = '20' boxSize='300px' objectFit='cover' src={data.imageUrl} alt={data.cand} />
          <Text fontSize = {SiteSizes.subheading} align='center'>{data.candidate}</Text>
          <Text fontSize = {SiteSizes.subheading} align='center'>{data.match}% Match</Text>
          <Text fontSize={SiteSizes.body} align='center'>{data.description}</Text>
        </Box>
      </Flex>
      <Text paddingTop='25px' fontSize = {SiteSizes.body}> Share with friends: </Text>
    </Flex>
  );
}

export default Match;
