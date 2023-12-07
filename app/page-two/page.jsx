"use client"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'

export default function PageTwo() {
   const searchParams = useSearchParams()
   console.log(searchParams.get('id'))
   return (
      <Container>
         <h1>Page Two</h1>
         {/* Navigation Buttons */}
         <Box
            display="flex"
            justifyContent="space-evenly"
         >
            <Button variant="standard">
               <Link href="/">Previous</Link>
            </Button>
            <Button variant="standard">
               <Link href="/page-three">Next</Link>
            </Button>
         </Box>
      </Container>
   )
}