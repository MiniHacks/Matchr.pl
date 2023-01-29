import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Heading, Text, IconButton, Link, Collapse, Fade } from '@chakra-ui/react';
import { SiteThemes, SiteSizes } from '../util/global';
import { useNavigate } from 'react-router-dom';
import { InfoIcon } from '@chakra-ui/icons';
import { FiChevronsUp, FiChevronsDown, FiChevronUp, FiChevronDown, FiChevronLeft } from 'react-icons/fi';
import Profile from "../util/profile";
import TinderCard from 'react-tinder-card';
import JSConfetti from 'js-confetti';
import { Spinner } from '@chakra-ui/react'


// quote: 'First-trimester abortion is murder',
// long: 'a way to greet someone',
// link: "https://.....com",
// agreement: "based"
// 72ff8a12-6460-4059-9836-d2d86a091c02

function Swipe() {
  const jsConfetti = new JSConfetti();
  const [card, setCard] = useState(undefined);
  const [quote, setQuote] = useState(undefined);
  const [show, setShow] = useState(false)
  const [asked, setAsked] = useState(0);
  const cardRef = useRef(0);
  const navigate = useNavigate();

  async function getQuestion() {
    const response = await fetch("http://localhost:8000/nq", {
      method: "POST",
      body: JSON.stringify({
        uid: Profile.getID(), 
        eid: "72ff8a12-6460-4059-9836-d2d86a091c02"
      })
    });

    if (!response.ok) return;

    const result = await response.json();

    setAsked(lastAsked => lastAsked + 1);
    setQuote(result.quote);
    setCard([
      <Fade in={true} key={asked}>
        <TinderCard
          ref={cardRef}
        >
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
              <Text>"{result.quote}"</Text>
            </Box>
            <Box align="right" >
              <InfoIcon onClick={setShow(last => !last)} boxSize="30px" />
            </Box>
            <Collapse startingHeight={5} in={show}>
              <Box width="250px" pt="1rem">
                <Text>{result.long}</Text>
                <Link href={result.link} isExternal>More Info</Link>
              </Box>
            </Collapse>
          </Flex>
        </TinderCard>
      </Fade>
    ]);
  }

  useEffect(() => {
    if(Profile.getElection() === undefined){
      navigate('/');
      return;
    }
    async function init() {
      const response = await fetch("http://localhost:8000/nq", {
        method: "POST",
        body: JSON.stringify({
          uid: Profile.getID(), 
          eid: "72ff8a12-6460-4059-9836-d2d86a091c02"
        })
      });
  
      if (!response.ok) return;
  
      const result = await response.json();
  
      setAsked(lastAsked => lastAsked + 1);
      setQuote(result.quote);
      setCard([
      <Fade in={true} key={asked}>
        <TinderCard
          ref={cardRef}
        >
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
              <Text>"{result.quote}"</Text>
            </Box>
            <Box align="right" >
              <InfoIcon onClick={setShow(last => !last)} boxSize="30px" />
            </Box>
            <Collapse startingHeight={5} in={show}>
              <Box width="250px" pt="0.7rem">
                <Text>{result.long}</Text>
                <Link href={result.link} isExternal>More Info</Link>
              </Box>
            </Collapse>
          </Flex>
        </TinderCard>
      </Fade>
      ]);
    }

    init();
  }, []);

  // 0 superdislike, 1 dislike, 2 like, 3 superlike
  async function choice(option) {

    switch (option) {
      case 0:
        cardRef.current.swipe('up');
        jsConfetti.addConfetti({
          emojiSize: 150,
          emojis: ['🚽'],
        })
        break;
      case 1:
        cardRef.current.swipe('left');
        jsConfetti.addConfetti({
          emojiSize: 150,
          emojis: ['🤢'],
        })
        break;
      case 2:
        cardRef.current.swipe('right'); 
        jsConfetti.addConfetti({
          emojiSize: 150,
          emojis: ['❤️'],
        })
        break;
      default:
        cardRef.current.swipe('down');
        jsConfetti.addConfetti({
          emojiSize: 150,
          emojis: ['🔥'],
        })
    }
  
  
    if (asked === 15) {
      navigate("/match");
    }

    const sent = await fetch("http://localhost:8000/send", {
      method: "POST",
      body: JSON.stringify({ 
        uid: Profile.getID(), 
        eid: "72ff8a12-6460-4059-9836-d2d86a091c02", 
        question: quote,
        agreement: option
      })
    });

    if (!sent.ok) return;
    
    setTimeout(async () => await getQuestion(), 1000);
  }


  const handleToggle = () => setShow(!show)

  if (card === undefined) {
    return(
      <Flex 
      flex="1"
      flexDirection='column' 
      justify="space-around" 
      align='center'
      padding="1rem"
      gap="1rem">
      <Heading position='absolute' top='2.5vh' align='center' fontSize={SiteSizes.heading}> match.pol </Heading>
      <Spinner position='absolute'  align='center' thickness='8px' speed='0.65s' boxSize='90px' align-self='center' color= {SiteThemes.mainColor} />

      </Flex>
  )};


  return (
    <Flex 
      flex="1"
      flexDirection='column' 
      justify="space-around" 
      align='center'
      padding="1rem"
      gap="1rem"
    >
      <Heading fontSize={SiteSizes.heading}> matchr.pl </Heading>
      {card}
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
