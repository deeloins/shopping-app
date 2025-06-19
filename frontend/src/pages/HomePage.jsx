import { Box, Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);

  return (
    <Container maxW="container.xl" p={6}>
  {/* Header Section - Fixed */}
  <Box textAlign="center" mb={8}>
    <Text
      fontSize={{ base: "2xl", md: "3xl" }}
      fontWeight="bold"
      color="linear(to-r, teal.500, blue.500)"
      display="inline-block" // Required for bgClip to work
    >
      Current Products
    </Text>
  </Box>

  {/* Product Grid - Fixed Spacing */}
  <Box
    display="grid"
    gridTemplateColumns={{
      base: "repeat(1, 1fr)",
      md: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)"
    }}
    gap={6} // This controls the spacing
    w="full"
  >
    {products.map((product) => (
      <Box key={product._id} w="100%">
        <ProductCard {...product} />
      </Box>
    ))}
  </Box>

  {/* Empty State */}
  {products.length === 0 && (
    <Text textAlign="center" mt={8} fontSize="lg">
      No products available.{" "}
      <Link to="/create" color="teal.500" fontWeight="semibold">
        Create one now
      </Link>
    </Text>
  )}
</Container>
  )
}

export default HomePage