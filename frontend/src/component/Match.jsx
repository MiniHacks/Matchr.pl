import React from 'react';
import {
  Flex,
  Box,
  Text,
  Image,
} from '@chakra-ui/react';

function Match() {
    const candidate = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Joe Biden',
      }
  return (
    <h1>Match</h1>
    // <Flex>
    // <Text> match.pol </Text>
    // <Box maxW = 'sm' color="FAEACB">
    // <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
    //   {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}
    //   </Box></Box>
    // </Flex>
  );
}

export default Match;
