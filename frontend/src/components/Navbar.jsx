import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { MagicWandIcon } from "@radix-ui/react-icons"
import { useColorMode, useColorModeValue } from "./ui/color-mode"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"

const Navbar = () => {
  const {colorMode,  toggleColorMode} = useColorMode()
  console.log("Current color mode:", colorMode); 

  return (
    <Container maxW="1140px" p={4} bg={useColorModeValue("gray.100", "gray.800")} boxShadow="md" borderRadius="md">
      <Flex h={16} justifyContent="space-between" alignItems="center" flexDir={{ base: "column", sm: "row" }}>
       <Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					color="cyan.400"
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

        <HStack spacing={2} alignItems="center">
          <Link to={"/create"}>
          <Button>
            <MagicWandIcon fontSize={20} />
          </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>

        </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar