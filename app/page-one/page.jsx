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
import DateTimeInput from "../components/DateTimeInput";
import SelectInput from "../components/SelectInput";
import { companyNames, supervisors, foremen } from "../../lib/options";
import Task from "../components/Task";
import Shift from "../components/Shift";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PageOne() {
   const searchParams = useSearchParams();
   const [view, setView] = useState(null);
   const [projectId, setProjectId] = useState(null);
   const [taskId, setTaskId] = useState(null);
   // Flag for rendering form if options loaded
   const [dataReady, setDataReady] = useState(false);

   useEffect(() => {
      setView(searchParams.get("view"));
      // Task or Shift view options
      if (view === "task") {
         setProjectId(searchParams.get("projectId"));
      } else {
         setTaskId(searchParams.get("taskId"));
      }
   }, [view, projectId, taskId, searchParams]);

   async function handleTaskAdd(supervisor, task) {
      await fetch("../../api/add-task/" + projectId, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            projectId,
            supervisor,
            task
         }),
      }).then(() => setDataReady(true));
      // await fetch(
      //    "../../api/add-shift/" +
      //       searchParams.get("id"),
      //    {
      //       method: "POST",
      //       headers: {
      //          "Content-Type": "application/json"
      //       },
      //       body: JSON.stringify({
      //          foreman,
      //          shiftDateTime,
      //       })
      //    }
      // )
      //    .then((res) => res.json())
      //    // .then((res) => setShiftId(res.shiftId))
      //    .then(() => setDataReady(true))
   }

   async function handleShiftAdd(foreman, startDateTime) {
      await fetch("../../api/add-shift/" + taskId, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            foreman,
            startDateTime,
         }),
      }).then(() => setDataReady(true));
   }
   
   return (
      <>
      <Header/>
      <Container>
         {/* Title */}
         <Typography variant="h2" textAlign="center" sx={{ marginTop: 2 }}>
            Daily Job Hazard Analysis
         </Typography>
         {/* Description */}
         <Typography
            variant="h4"
            className="block text-justify"
            align="justify"
            sx={{ marginTop: 2, marginBottom: 4 }}
         >
            This JHA is valid only for the work and date specified. This JHA
            shall be posted at the immediate work area while the work is
            ongoing. If the noted conditions change, the JHA shall be
            re-evaluated to incorporate changes and reissued immediately. Any
            emergency or incident automatically invalidates this JHA. When this
            JHA expires, it must be returned to the PSC/PSA for record purposes
         </Typography>
         {/* Tasks are created based on their project id */}
         {view === "task" ? (
            <Task projectId={projectId} handleTaskAdd={handleTaskAdd} />
         ) : null}
         {/* Shifts are created based on their task id */}
         {view === "shift" ? (
            <Shift taskId={taskId} handleShiftAdd={handleShiftAdd} />
         ) : null}
         {/* Navigation - Back to Home Screen | Save Data -> Next Page */}
         <Box display="flex" justifyContent="space-evenly">
            <Button variant="standard">
               <Link href="/" style={{ textDecoration: "none" }}>
                  Back
               </Link>
            </Button>
            <Button variant="standard">
               <Link
                  href={{
                     pathname: dataReady ? "../page-two" : null,
                     // query: {
                     //    // id: shiftId
                     // }
                  }}
                  style={{ textDecoration: "none" }}
               >
                  Next
               </Link>
            </Button>
         </Box>
      </Container>
      </>
   );
}
