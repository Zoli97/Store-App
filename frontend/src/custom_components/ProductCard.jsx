import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogActionTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";
import toast, { Toaster } from "react-hot-toast";
const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteTheProduct, updateTheProduct } = useProductStore();
  const textColor = useColorModeValue("#0b1114", "#90d5d6");
  const bgColor = useColorModeValue("#fff", "#141f25");

  const handleOpen = () => {
    setOpen(true); // Open the modal when Edit is clicked
  };

  const handleClose = () => {
    setOpen(false); // Close the modal when Close is clicked
  };

  const handleDelete = async (id) => {
    const { success } = await deleteTheProduct(id);
    if (!success) {
      toast.error("Failed to delete the product !", {
        duration: 5000,
        icon: "🚨",
      });
    } else {
      toast.success("Product deleted successfully !", {
        duration: 6000,
        icon: "✅️",
      });
    }
  };

  const handleUpdate = async (pid, updatedProduct) => {
    const { success } = await updateTheProduct(pid, updatedProduct);

    //once i upddated the product
    handleClose();

    if (!success) {
      toast.error("Failed to update the product !", {
        duration: 5000,
        icon: "🚨",
      });
    } else {
      toast.success("Product updated successfully !", {
        duration: 6000,
        icon: "✅️",
      });
    }
  };
  return (
    <Box
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.4s"}
      _hover={{ transform: "translateY(-5px)" }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        w="full"
        h={48}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton onClick={handleOpen}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(product._id)}>
            <DeleteIcon />
          </IconButton>
        </HStack>
      </Box>
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          {/**once i type something in into the input i should update those values. */}
          <DialogBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                border={useColorModeValue("1px solid black", "1px solid white")}
              />

              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
                border={useColorModeValue("1px solid black", "1px solid white")}
              />

              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
                border={useColorModeValue("1px solid black", "1px solid white")}
              />
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button onClick={() => handleUpdate(product._id, updatedProduct)}>
              Update{" "}
            </Button>
          </DialogFooter>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Box>
  );
};

export default ProductCard;
