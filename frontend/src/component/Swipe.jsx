import Profile from "../util/profile";

function Swipe() {
  console.log(Profile.getID());
  console.log(Profile.getElection());

  return (
    <h1>swipe</h1>
    // <Flex>
    // <Text> match.pol </Text>
    // <Box maxW = 'sm' color="FAEACB">
    // <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
    //   {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}
    //   </Box></Box>
    // </Flex>
  );
}

export default Swipe;
