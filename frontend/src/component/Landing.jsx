import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { SiteThemes, SiteSizes } from '../util/global';
import { useNavigate } from 'react-router-dom';
import Profile from '../util/profile';

function Hero() {
  return (
    <Flex
      minHeight="75vh"
      justify="space-around"
      align="center"
      flexDir="column"
      bg={SiteThemes.mainColor}
    >
      <Heading fontSize={SiteSizes.heading}>
        match.pol
      </Heading>
      <Text fontSize={SiteSizes.body}>
        The place to find your
      </Text>
      <Heading fontSize={SiteSizes.subheading}>
        Political Match
      </Heading>
    </Flex>
  );
}

function Options() {
  const options = ["School Boards", "Minneapolis Mayor", "Minnesota Governer"];
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
      paddingBottom="1rem"
    >
      <Text fontSize={SiteSizes.body}>
        Select The Election You Wish To Find Your Match
      </Text>
      {
        options.map(option => {
          return (
            <Box
              key={option}
              cursor="pointer" 
              padding="1rem"
              background="#9CC0E7"
              borderRadius="1rem"
              _hover={{ filter: "brightness(0.7)", color: "black" }}
              onClick={selected}
            >
              <Text fontSize={SiteSizes.subbody}>{option}</Text>
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
