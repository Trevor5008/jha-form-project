import Header from "./components/Header"
import Link from "next/link"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

export default function Home() {
   return (
      <Box>
         <Header />
         <Box
            display="flex"
            justifyContent="center"
         >
            <Button variant="standard">
               <Link href="#">Next</Link>
            </Button>
         </Box>
      </Box>
   )
}
