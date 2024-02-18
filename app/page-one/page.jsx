"use client"
import { useEffect, useState } from "react"
import {
   Typography,
   Container,
   Button,
   Box,
   FormControl,
   TextField
} from "@mui/material"
import DateTimeInput from "../components/DateTimeInput"
import SelectInput from "../components/SelectInput"
import {
   companyNames,
   supervisors,
   foremen
} from "../../lib/options"
import Task from "../components/Task"
import Shift from "../components/Shift"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function PageOne() {
   const searchParams = useSearchParams()
   const [dataReady, setDataReady] =
      useState(false)

   async function handleTaskAdd() {
      await fetch(
         "../../api/add-shift/" +
            searchParams.get("id"),
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               shiftDateTime,
               taskDescription
            })
         }
      )
         .then((res) => res.json())
         // .then((res) => setShiftId(res.shiftId))
         .then(() => setDataReady(true))
   }
   return (
      <section>
         {/* Title */}
         <Typography
            variant="h1"
            className="my-3 text-center"
         >
            Daily Job Hazard Analysis
         </Typography>
         {/* Description */}
         <Typography
            variant="body1"
            className="block text-justify"
            align="justify"
         >
            This JHA is valid only for the work
            and date specified. This JHA shall be
            posted at the immediate work area
            while the work is ongoing. If the
            noted conditions change, the JHA shall
            be re-evaluated to incorporate changes
            and reissued immediately. Any
            emergency or incident automatically
            invalidates this JHA. When this JHA
            expires, it must be returned to the
            PSC/PSA for record purposes
         </Typography>
         <Task/>
         <Shift/>
         {/* Navigation */}
         <Box
            display="flex"
            justifyContent="center"
         >
            <Button variant="standard">
               <Link href="/">Home</Link>
            </Button>
            {dataReady ? (
            // {dataReady && shiftId ? (
               <Container>
                  {" "} 
                  <Button variant="standard">
                     <Link
                        href={{
                           pathname:
                              "../page-two",
                           query: {
                              // id: shiftId
                           }
                        }}
                     >
                        Next
                     </Link>
                  </Button>
               </Container>
            ) : (
               <Button
                  variant="standard"
                  onClick={handleTaskAdd}
               >
                  Save
               </Button>
            )}
         </Box>
      </section>
   )
}
