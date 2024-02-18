"use client";
import { useEffect, useState } from "react";
import {
   Typography,
   Container,
   Button,
   Box,
   FormControl,
   TextField,
} from "@mui/material";
import SelectInput from "./SelectInput";
import Link from "next/link";

export default function Task() {
   const [supervisorName, setSupervisorName] = useState("");
   const [taskDescription, setTaskDescription] = useState("");
   const [taskId, setTaskId] = useState(null)
   const [dataReady, setDataReady] = useState(true);

   useEffect(() => {}, []);

   function handleSupervisorChange(evt) {
      setSupervisorName(evt.target.value0)
   }

   function handleTaskDescriptChange(evt) {
      setTaskDescription(evt.target.value)
   }

   return dataReady ? (
      <section>
         <h1>Task</h1>
         {/* 1st Row | Supervisor */}
         <Container
            className="p-0"
            sx={{
               display: "flex",
               flexDirection: {
                  xs: "column",
                  sm: "row",
               },
            }}
         >
            {/* Supervisor */}
            <FormControl
               sx={{
                  marginLeft: {
                     sm: ".5rem",
                  },
                  width: {
                     xs: "100%",
                     sm: "50%",
                  },
                  marginBottom: {
                     xs: ".75rem",
                  },
               }}
               required
            >
               <SelectInput
                  name="Supervisor"
                  // data={supervisors}
                  handleChange={handleSupervisorChange}
               />
            </FormControl>
         </Container>
         {/* 2nd Row | Task Description */}
         <Container className="p-0 flex">
            <FormControl fullWidth>
               <TextField
                  id="outlined-multiline-flexible"
                  label="Description of work to be performed:"
                  multiline
                  rows={4}
                  required
                  onChange={handleTaskDescriptChange}
                  value={taskDescription}
               />
            </FormControl>
         </Container>
         {/* Navigation */}
         <Box display="flex" justifyContent="center">
            <Button variant="standard">
               <Link href="/">Home</Link>
            </Button>
            <Container>
            {dataReady ? (
                  <Button variant="standard">
                     <Link
                        href={{
                           pathname: "../page-two",
                           query: {
                              // id: shiftId,
                           },
                        }}
                     >
                        Next
                     </Link>
                  </Button>
            ) : (
               <Button variant="standard" onClick={handleTaskAdd}>
                  Save
               </Button>
            )}
            </Container>
         </Box>
      </section>
   ) : null;
}
