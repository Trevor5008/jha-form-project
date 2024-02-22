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
import { supervisors } from "@/lib/options";
import SelectInput from "./SelectInput";
import Link from "next/link";

export default function Task({ projectId, handleTaskAdd }) {
   const [supers, setSupers] = useState([]);
   const [supervisorName, setSupervisorName] = useState(null);
   const [taskDescription, setTaskDescription] = useState(null);
   const [taskId, setTaskId] = useState(null);
   const [dataReady, setDataReady] = useState(false);

   useEffect(() => {
      loadSupervisors();
      if (supers) setDataReady(true);
   }, [supers, projectId, taskId]);

   async function loadSupervisors() {
      setSupers(supervisors);
      // fetch("../../api/load-supervisors")
      //    .then((res) => res.json())
      //    .then((res) => setSupervisors(res.supervisors))
      //    .then(() => setDataReady(true))
   }

   function handleSupervisorChange(evt) {
      setSupervisorName(evt.target.value);
   }

   function handleTaskDescriptChange(evt) {
      setTaskDescription(evt.target.value);
   }

   return dataReady && projectId ? (
      <section>
         {/* 1st Row | Supervisor */}
         <Container
            className="p-0"
            sx={{
               display: "flex",
               flexDirection: {
                  xs: "column",
                  sm: "row",
               },
               marginTop: 2
            }}
         >
            {/* Supervisor */}
            <FormControl
               sx={{
                  width: {
                     xs: "100%",
                     sm: "50%",
                  },
               }}
               required
            >
               <SelectInput
                  name="Supervisor"
                  data={supers}
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
                  sx={{
                     "& .MuiFormLabel-root": {
                        fontSize: "15px"
                     },
                     "& .MuiInputBase-root span": {
                        fontSize: "12px"
                     }
                  }}
               />
            </FormControl>
         </Container>
         {/* Save Button */}
         <Box display="flex" justifyContent="center">
            <Button
               variant="standard"
               onClick={() => handleTaskAdd(supervisorName, taskDescription)}
               disabled={!supervisorName || !taskDescription}
            >
               Save
            </Button>
         </Box>
      </section>
   ) : null;
}
