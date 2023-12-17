"use client"
import { useState, useEffect } from "react"
import {
   Box,
   Button,
   Container,
   Typography
} from "@mui/material"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function PageThree() {
   const searchParams = useSearchParams()
   const shiftId = searchParams.get('id')
   return (
      <Container>
         <h1>Page Three</h1>
         {/* Navigation Buttons */}
         <Box
            display="flex"
            justifyContent="space-evenly"
         >
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "../page-two",
                     query: { id: shiftId }
                  }}
               >
                  Previous
               </Link>
            </Button>
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "#",
                     query: { id: shiftId }
                  }}
                  // onClick={handleNext}
               >
                  Next
               </Link>
            </Button>
         </Box>
      </Container>
   )
}
