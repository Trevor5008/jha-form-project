"use client"
import { useEffect, useState } from "react"
import {
   Typography,
   Container,
   Button,
   Box,
   FormControl,
   SelectInput
} from "@mui/material"
import Link from "next/link"

export default function PageOne() {
   const [dataReady, setDataReady] =
      useState(false)
   const [shiftDateTime, setShiftDateTime] =
      useState("")
   const [companyName, setCompanyName] =
      useState("")
   const [supervisorName, setSupervisorName] =
      useState("")
   const [foremanName, setForemanName] =
      useState("")
   const [taskDescription, setTaskDescription] =
      useState("")
   function handleProjectChange(evt) {
      setProjectName(evt.target.value)
   }

   function handleShiftChange(val) {
      setShiftDateTime(val.$d)
   }

   function handleCompanyChange(evt) {
      setCompanyName(evt.target.value)
   }

   function handleSupervisorChange(evt) {
      setSupervisorName(evt.target.value)
   }

   function handleForemanChange(evt) {
      setForemanName(evt.target.value)
   }

   function handleTaskDescriptionChange(evt) {
      setTaskDescription(evt.target.value)
   }

   async function handleClick() {
      const obj = {
         projectName,
         shiftDateTime,
         companyName,
         supervisorName,
         foremanName,
         taskDescription
      }
      await fetch("../api/add-project", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ obj })
      })
         .then((res) => res.json())
         .then((res) => setShift(res.shift))
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
         {/* 1st Row | Project Name, Shift Date/Time */}
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
            {/* Project Name Input */}
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
                  name="Project Name and Number"
                  data={projectData}
                  handleChange={
                     handleProjectChange
                  }
               />
            </FormControl>
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
                  data={foreman}
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
            {dataReady ? (
               <Container>
                  {" "}
                  <Button
                     onClick={toggleNewShift}
                  >
                     Home
                  </Button>
                  <Button variant="standard">
                     <Link
                        href={{
                           pathname:
                              "../page-two",
                           query: {
                              id: shift?.id
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
                  onClick={handleClick}
               >
                  Save
               </Button>
            )}
         </Box>
      </section>
   )
}
