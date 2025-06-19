import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useState } from "react";
import { useProductStore } from "../store/product";
import toast, { Toaster } from 'react-hot-toast';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image: ''
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if(!success) {
      toast.error(message);
    } else {
      toast.success(message);
      setNewProduct({ name: '', price: 0, image: '' });
    }
  }

  return (
    <>
      <Container 
        maxW="container.sm" 
        py={12} 
        px={4}
        centerContent
      >
        <VStack spacing={8} w="100%">
          <Heading as="h1" size="4xl" textAlign="center">
            Create New Product
          </Heading>
          
          <Box
            w="100%"
            maxW="md"
            bg={useColorModeValue("white", "gray.700")}
            p={6} 
            borderRadius="lg" 
            boxShadow="md"
          >
            <VStack spacing={4}>
              <Input 
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
              <Input 
                placeholder="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
              />
              <Input 
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />
              <Button 
                colorScheme="blue"
                w="full"
                onClick={handleAddProduct}
              >
                Create Product
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
      <Toaster />
    </>
  );
}

export default CreatePage;