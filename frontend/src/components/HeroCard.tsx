import { Badge, Box, Image } from "@chakra-ui/react";

const HeroCard = ({ imageURI, classHero, colorBadge, bgColor }) => {
  return (
    <Box bg={bgColor} rounded="lg">
      <Image
        borderRadius="full"
        src={imageURI}
        alt={classHero}
        boxSize="200px"
      />
      <Badge
        ml="1"
        fontSize="0.8em"
        alignSelf="center"
        colorScheme={colorBadge}
      >
        {classHero}
      </Badge>
    </Box>
  );
};

export default HeroCard;
