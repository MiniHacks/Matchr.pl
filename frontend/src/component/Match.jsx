import React, {useEffect, useState} from 'react';
import { Flex, Box, Text, Image, Heading, Spinner } from '@chakra-ui/react';
import { SiteThemes, SiteSizes } from '../util/global';
import Profile from '../util/profile';
import JSConfetti from 'js-confetti';
import { useNavigate } from 'react-router-dom';


function Match() {
  const [data, setData] = useState(undefined);
  const jsConfetti = new JSConfetti();
  const navigate = useNavigate();

  useEffect(() => {
    if(Profile.getElection() === undefined){
      navigate('/');
      return;
    }
    async function getResult() {
      const response = await fetch('http://matchr.pl:8000/done', {
        method: "POST",
        body: JSON.stringify({ 
          eid: "72ff8a12-6460-4059-9836-d2d86a091c02", 
          uid: Profile.getID() 
        })
      });

      if (!response.ok) return;

      const result = await response.json();

      setData(result);
    }
    
    getResult();
  }, []);
  

  if (data === undefined) {
    return(
      <Flex 
      flex="1"
      flexDirection='column' 
      justify="space-around" 
      align='center'
      padding="1rem"
      gap="1rem">
      <Heading position='absolute' top='2.5vh' align='center' fontSize={SiteSizes.heading}> match.pol </Heading>
      <Spinner position='absolute' align='center' thickness='8px' speed='0.65s' boxSize='90px' align-self='center' color= {SiteThemes.mainColor} />
      </Flex>
  )};
  jsConfetti.addConfetti({
    confettiColors: ['red', 'blue']
  })

  return (
    <Flex flexDirection='column' justify="space-around" align='center'>
      <Heading fontSize={SiteSizes.heading}> matchr.pl </Heading>
      <Flex> 
        <Box borderRadius= '20' w = '350px' h = '700px' bg="#FAEACB" paddingTop='25px' paddingBottom='50px' paddingRight='25px' paddingLeft='25px' margin-right='25px'>
          <Image borderRadius = '20' boxSize='300px' objectFit='cover' src={`http://matchr.pl:8000/static/${data.image}`} alt={data.cand} />
          <Text fontSize = {SiteSizes.subheading} align='center'>{data.name}</Text>
          <Text fontSize = {SiteSizes.subheading} align='center'>{data.agreed.length / (data.agreed.length + data.disagreed.length)}% Match</Text>
          <Text fontSize={SiteSizes.body} align='center'>{data.desc}</Text>
        </Box>
      </Flex>
      <Text paddingTop='25px' fontSize = {SiteSizes.body}> Share with friends: </Text>
    </Flex>
  );
}

export default Match;
