import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

import { useColorModeValue } from "../components/ui/color-mode";
import toast, { Toaster } from "react-hot-toast";
import { useProductStore } from "../store/product";
//create a state and update the name field (binded into this fields)
//all these values sotred in the state
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  //once i click the button i like to just handle add product
  //return some values
  const handleProduct = async () => {
    console.log(newProduct);
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      toast.error(message, { duration: 5000, icon: "🚨" });
    } else {
      toast.success(message, { duration: 6000, icon: "✅️" });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={{ base: "100%", md: "7/12" }}
          bg={useColorModeValue("white", "#1b2b33")}
          p={6}
          rounded={"lg"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              border={useColorModeValue("1px solid black", "1px solid white")}
            />

            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              border={useColorModeValue("1px solid black", "1px solid white")}
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              border={useColorModeValue("1px solid black", "1px solid white")}
            />

            <Button colorScheme={"blue"} onClick={handleProduct}>
              Add Product
            </Button>

            <Toaster position="bottom-center" reverseOrder={false} />
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
