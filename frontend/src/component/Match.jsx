import React, {useEffect, useState} from 'react';
import {
  Flex,
  Box,
  Text,
  Image,
  Heading
} from '@chakra-ui/react';


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
          if(!response.ok){
            console.log("error");
            return;
          } 
          const result = await response.json();
          setData(result);
          console.log("hi!");
        }
        //getResults();
        
      });
  return (
    <Flex gap='25px' align='center' flexDirection='column'>
      <Heading> match.pol </Heading>
      <Flex flexDirection='column'>
        <Box borderRadius= '20' w = '350px' h = '600px' bg="#FAEACB" paddingTop='25px' paddingBottom='50px' paddingRight='25px' paddingLeft='25px' margin-right='25px'>
          <Image borderRadius = '20' boxSize='300px' objectFit='cover' src={data.imageUrl} alt={data.cand} />
          <Text align='center'>{data.candidate}</Text>
          <Text align='center'>{data.match}% Match</Text>
          <Text align='center'>{data.description}</Text>
        </Box>
      </Flex>
      
    </Flex>
  );
}

export default Match;
