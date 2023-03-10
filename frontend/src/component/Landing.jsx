import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { SiteThemes, SiteSizes } from '../util/global';
import { useNavigate } from 'react-router-dom';
import Profile from '../util/profile';

function Hero() {
  return (
    <Flex
      minHeight="60vh"
      justify="space-around"
      align="center"
      flexDir="column"
      bg={SiteThemes.mainColor}
    >
      <Heading fontSize={SiteSizes.heading}>
        matchr.pl
      </Heading>
      <Text fontSize={SiteSizes.body}>
        The place to find your
      </Text>
      <Heading fontSize={SiteSizes.electionheading}>
        Political Match
      </Heading>
    </Flex>
  );
}

function Options() {
  const options = ["School Boards", "Minneapolis Mayor", "Minnesota Governer"]; // 72ff8a12-6460-4059-9836-d2d86a091c02
  const navigate = useNavigate();

  function selected(event) {
    Profile.setElection(event.target.textContent)
    navigate("/swipe");
  }

  return (
    <Flex 
      minHeight="60vh" 
      flexDir="column"
      justify="space-around"
      align="center"
      padding="1rem"
      paddingTop="0rem"
    >
      <Text align='center' fontSize={SiteSizes.body}>
        Select The Election You Wish To Find Your Match At
      </Text>
      {
        options.map(option => {
          return (
            <Box
              key={option}
              cursor="pointer" 
              padding="1rem"
              bg='#f2becc'
              borderRadius="1rem"
              _hover={{ filter: "brightness(0.7)", color: "black" }}
              onClick={selected}
            >
              <Text fontSize={SiteSizes.election}>{option}</Text>
            </Box>
          );
        })
      }
    </Flex>
  );
}

function Landing() {
  return (
    <Flex 
      flex="1" 
      gap="1rem"
      flexDir="column"
    >
      <Hero />
      <Options />
    </Flex>
  );
}

export default Landing;
