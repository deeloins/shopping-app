import { Box, Button } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar"
import { useColorModeValue } from "./components/ui/color-mode"

function App() {
  const bg = useColorModeValue("gray.200", "gray.900");

  return (
    <Box bg={bg} minH="100vh" p={4}>
   <Navbar />
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/create" element={<CreatePage />} />
   </Routes>
    </Box>
  )
}

export default App
