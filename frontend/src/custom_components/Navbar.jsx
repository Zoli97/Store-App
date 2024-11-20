import React from "react";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";

const Navbar = () => {
  //change the container bg color depending on the color state

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        flexDir={{ base: "column", sm: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          color={useColorModeValue("#0b1114", "#90d5d6")}
        >
          <Link to={"/"}>
            Product Store <LocalGroceryStoreIcon sx={{ fontSize: " 30px" }} />
          </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <AddIcon style={{ fontSize: 20 }} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <NightlightIcon sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeIcon sx={{ fontSize: "25px" }} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
