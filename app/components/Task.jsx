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
import Link from "next/link";

export default function HomePage() {
   const [dataReady, setDataReady] = useState(false);

   useEffect(() => {

   }, []);

   return dataReady ? (
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
         {/* 1st Row | Shift Date/Time */}
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
         {/* 2nd Row | Company Name, Supervisor */}
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
            {/* Company Name */}
            <FormControl
               sx={{
                  marginRight: {
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
                  name="Company Name"
                  data={companyNames}
                  handleChange={
                     handleCompanyChange
                  }
               />
            </FormControl>
            {/* Supervisor */}
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
                  name="Supervisor"
                  data={supervisors}
                  handleChange={
                     handleSupervisorChange
                  }
               />
            </FormControl>
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
                  data={foremen}
                  handleChange={
                     handleForemanChange
                  }
               />
            </FormControl>
         </Container>
         {/* 3rd Row | Project Description*/}
         <Container className="p-0 flex">
            <FormControl fullWidth>
               <TextField
                  id="outlined-multiline-flexible"
                  label="Description of work to be performed:"
                  multiline
                  rows={4}
                  required
                  onChange={
                     handleTaskDescriptionChange
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
            {dataReady && shiftId ? (
               <Container>
                  {" "}
                  <Button variant="standard">
                     <Link
                        href={{
                           pathname:
                              "../page-two",
                           query: {
                              id: shiftId
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
