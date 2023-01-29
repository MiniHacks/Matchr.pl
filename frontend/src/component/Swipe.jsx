import { useState, useEffect, useNavigate } from 'react';
import { Flex, Box, Heading, Text, IconButton} from '@chakra-ui/react';
import { SiteThemes, SiteSizes } from '../util/global';
import {FiChevronsUp, FiChevronsDown, FiChevronUp, FiChevronDown, FiChevronLeft} from 'react-icons/fi';
import Profile from "../util/profile";

// quote: 'First-trimester abortion is murder',
// long: 'a way to greet someone',
// link: "https://.....com",
// agreement: "based"

function Swipe() {
  const [card, setCard] = useState(undefined);
  const [asked, setAsked] = useState(0);
  const navigate = useNavigate();

  async function getQuestion() {
    const response = await fetch("http://localhost:8000/nq", {
      method: "GET",
      body: JSON.stringify({
        uid: Profile.getID(), 
        eid: Profile.getElection()
      })
    });

    if (!response.ok) return;

    const result = await response.json();

    setAsked(lastAsked => lastAsked++);
    setCard(result);
  }

  useEffect(() => getQuestion());

  // 0 superdislike, 1 dislike, 2 like, 3 superlike
  async function choice(option) {
    const sent = await fetch("http://localhost:8000/send", {
      method: "GET",
      body: JSON.stringify({ 
        uid: Profile.getID(), 
        eid: Profile.getElection(), 
        question: card.quote,
        agreement: option
      })
    });

    if (!sent.ok) return;

    await getQuestion();
  }

  if (asked === 15) {
    navigate("/match");
  }

  if (card === undefined) {
    return <>Still loading..</>
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
          <Text>"{card.quote}"</Text>
        </Box>
      </Flex>
      <Flex gap="1rem" justify="space-between" > 
        <IconButton onClick={() => console.log("based")} bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronLeft size={50} />}/>
        <IconButton onClick={() => choice(0)} bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronsDown size={50} />}/>
        <IconButton onClick={() => choice(1)} bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronDown size={50} />}/>
        <IconButton onClick={() => choice(2)} bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronUp size={50} />}/>
        <IconButton onClick={() => choice(3)} bg={SiteThemes.backgroundColor} isRound='true' icon={<FiChevronsUp size={50} />}/>
      </Flex>
    </Flex>
  );
}

export default Swipe;
