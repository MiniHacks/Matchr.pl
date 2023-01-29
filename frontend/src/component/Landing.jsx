import { Flex, Heading, Text } from '@chakra-ui/react';
import { SiteThemes, SiteSizes } from '../util/global';

function Hero() {
  return (
    <Flex
      flex="1"
      height="60vh"
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
  )
}


function Landing() {

  return (
    <Flex>
      <Hero />
    </Flex>
  );
}

export default Landing;
