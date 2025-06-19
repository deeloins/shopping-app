import { Box, Heading, HStack, IconButton, Image, Text, VStack, Input, Button } from "@chakra-ui/react"
import { DialogRoot, DialogBackdrop, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogCloseTrigger, DialogTitle } from "@chakra-ui/react"
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const ProductCard = (product) => {
    const [updateProduct, setUpdateProduct] = useState(product);
    const [isOpen, setIsOpen] = useState(false);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800"); 
    
    const {deleteProduct, updateProduct: updateProductStore} = useProductStore();
    
    const handleDelete = async (pid) => {
       console.log("Product ID:", pid); // Add this line
    if (!pid) {
        toast.error("Product ID is missing");
        return;
    }
        const {success, message} = await deleteProduct(pid);
        if(!success) {
            toast.error(message);
        } else {
            toast.success(message);
        }
    }
            
    const handleUpdatedProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProductStore(pid, updatedProduct);
        if(!success) {
            toast.error(message);
        } else {
            toast.success(message);
            setIsOpen(false);
        }
    }

    return (
        <>
    <Box
  shadow="lg"
  borderRadius="lg"
  overflow="hidden"
  transition="all 0.3s ease"
  _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
  bg={bg}
  w="100%" // Ensure full width
  h="100%" // Ensure full height
  display="flex"
  flexDirection="column"
  m={0} 
  p={0} 
>
      {/* Image Section */}
      <Box flexShrink={0}> {/* Prevent image from growing */}
        <Image
          src={product.image}
          alt={product.name}
          w="100%"
          h={48}
          objectFit="cover"
        />
      </Box>

      {/* Content Section - grows to fill remaining space */}
      <Box 
        p={4}
        flex={1} // Takes remaining space
        display="flex"
        flexDirection="column"
      >
        <Heading as="h3" size="md" mb={2} noOfLines={1}>
          {product.name}
        </Heading>

        <Text fontSize="xl" color={textColor} fontWeight="bold" mb={4}>
          ${product.price}
        </Text>

        {/* Push buttons to bottom */}
        <Box mt="auto">
          <HStack spacing={2}>
            <IconButton
              onClick={() => setIsOpen(true)} 
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              aria-label="Edit product"
              size="md"
            >
              <Pencil1Icon width="16px" height="16px" />
            </IconButton>
            <IconButton 
              onClick={() => handleDelete(product._id)}
              bg="red.500"
              color="white"
              _hover={{ bg: "red.600" }}
              aria-label="Delete product"
              size="md"
            >
              <TrashIcon width="16px" height="16px" />
            </IconButton>
          </HStack>
        </Box>
      </Box>


                <DialogRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                    <DialogBackdrop />
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update Product</DialogTitle>
                        </DialogHeader>
                        <DialogCloseTrigger />
                        <DialogBody>
                            <VStack spacing={4}>
                                <Input
                                    placeholder="Product Name"
                                    name="name"
                                    value={updateProduct.name}
                                    onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value})}
                                />
                                <Input
                                    placeholder="Price"
                                    name="price"
                                    type="number"
                                    value={updateProduct.price}
                                    onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value})}
                                />
                                <Input
                                    placeholder="Image URL"
                                    name="image"
                                    value={updateProduct.image}
                                    onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value})}
                                />
                            </VStack>
                        </DialogBody>
                        <DialogFooter>
                            <Button 
                                bg="blue.500"
                                color="white"
                                _hover={{ bg: "blue.600" }}
                                mr={3} 
                                onClick={() => handleUpdatedProduct(product._id, updateProduct)}
                            >
                                Update
                            </Button>
                            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </DialogFooter>
                    </DialogContent>
                </DialogRoot>
            </Box>
            <Toaster />
        </>
    )
}

export default ProductCard