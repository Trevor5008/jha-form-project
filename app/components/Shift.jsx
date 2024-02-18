"use client";
import { useEffect, useState } from "react";
import {
   Typography,
   Container,
   Button,
   Box,
   FormControl,
   TextField
} from "@mui/material"  
import SelectInput from "./SelectInput";
import DateTimeInput from "./DateTimeInput";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Shift() {
   const searchParams = useSearchParams()
   const [foremanName, setForemanName] =
      useState("")
   const [shiftDateTime, setShiftDateTime] =
   useState(null)
   const [shiftId, setShiftId] = useState(null)
   const [dataReady, setDataReady] = useState(true);

   useEffect(() => {}, []);

   function handleForemanChange(evt) {
      setForemanName(evt.target.value)
   }
   function handleShiftChange(val) {
      setShiftDateTime(val.$d)
   }

   return dataReady ? (
      <section>
         <h1>Shift</h1>
         {/* 1st Row | Foreman */}
         <Container
            className="p-0"
            sx={{
               display: "flex",
               flexDirection: {
                  xs: "column",
                  sm: "row"
               }
            }}
         >
            {/* Foreman */}
            <FormControl
               sx={{
                  marginLeft: {
                     sm: ".5rem"
                  },
                  width: {
                     xs: "100%",
                     sm: "50%"
                  },
                  marginBottom: {
                     xs: ".75rem"
                  }
               }}
               required
            >
               <SelectInput
                  name="Foreman"
                  // data={foremen}
                  handleChange={
                     handleForemanChange
                  }
               />
            </FormControl>
         </Container>
         {/* 2nd Row | Shift Date/Time */}
         <Container
            className="p-0 mt-5"
            sx={{
               display: "flex",
               flexDirection: {
                  xs: "column",
                  sm: "row"
               }
            }}
         >
            {/* DateTime Input */}
            <FormControl
               sx={{
                  marginLeft: {
                     sm: ".5rem"
                  },
                  width: {
                     xs: "100%",
                     sm: "50%"
                  },
                  marginBottom: {
                     xs: ".75rem"
                  }
               }}
               required
            >
               <DateTimeInput
                  required
                  handleShiftChange={
                     handleShiftChange
                  }
               />
            </FormControl>
         </Container>
         {/* Navigation */}
         <Box
            display="flex"
            justifyContent="center"
         >
            <Button variant="standard">
               <Link href="/">Home</Link>
            </Button>
            {dataReady ? (
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
   ) : null;
}
