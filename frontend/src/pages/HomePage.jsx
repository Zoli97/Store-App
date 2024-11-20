import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import ProductCard from "../custom_components/ProductCard";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";

const HomePage = () => {
  //once i get into the homepage i want running this function
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products:", products);
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "20px", sm: "26px" }}
          fontWeight={"bold"}
          textAlign={"center"}
          color={useColorModeValue("#0b1114", "#90d5d6")}
          pb={"2em"}
        >
          Current Products{" "}
        </Text>

        <SimpleGrid
          w={"full"}
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          gap={"4em"}
        >
          {/** taking the products and map over it. For each product i will like render this aprt  */}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={{ base: "18px", sm: "26px" }}
            fontWeight={"bold"}
            textAlign={"center"}
            color={useColorModeValue("#0b1114", "#90d5d6")}
          >
            No products found{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color={useColorModeValue("#0b1114", "#90d5d6")}
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
