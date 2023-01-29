import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './component/ColorModeSwitcher';
import { Logo } from './component/Logo';

function Match() {
    const candidate = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Joe Biden',
      }
  return (
    <Flex>
    <Text> match.pol </Text>
    <Box maxW = 'sm' color="FAEACB">
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={property.imageUrl} alt={property.imageAlt} /></Box></Box>
    </Flex>
  );
}

export default Match;
