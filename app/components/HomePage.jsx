"use client";
import { useEffect, useState } from "react";
import {
   Typography,
   Container,
   TextField,
   Button,
   Box,
   InputLabel,
   Select,
   MenuItem,
   ListItemText,
   ListItemButton,
   List,
   ListSubheader,
} from "@mui/material";
import Link from "next/link";
import { formatShiftDate } from "@/lib/utils";

export default function HomePage() {
   // Project includes all task and shift data as well
   const [project, setProject] = useState(null);
   // Flag for preventing incomplete data load
   const [dataReady, setDataReady] = useState(false);

   useEffect(() => {
      loadProject();
   }, [project]);

   async function loadProject() {
      fetch("../../api/load-project")
         .then((res) => res.json())
         .then((res) => setProject(res.project))
         .then(() => setDataReady(true));
   }

   return dataReady && project ? (
      <Container>
         <Box key={project?.id}>
            {/* Project Title - "UT Brain & Health" */}
            <Typography
               variant="h1"
               sx={{
                  fontWeight: "bold",
                  marginTop: 2,
                  marginBottom: 1,
               }}
            >
               {project.name}
            </Typography>
            {/* Draft JHAs (In-progress) */}
            <Box marginLeft={2} marginTop={1} marginBottom={2}>
               <Typography variant="h4">Draft JHAs</Typography>
               {project.Tasks.map((task, idx) => {
                  return (
                     <Box key={idx} marginLeft={2} marginY={1}>
                        <Typography variant="h5">{task.name}</Typography>
                        {task?.Shifts
                           ? task.Shifts.map((shift, idx) => {
                                const shiftTitle = formatShiftDate(
                                   shift.startDateTime
                                );
                                return (
                                   <Box key={idx} marginLeft={2} marginY={1}>
                                      <Link
                                         style={{
                                            textDecoration: "none",
                                         }}
                                         sx={{
                                            cursor: "pointer",
                                         }}
                                         href={{
                                            pathname: "../pg-2",
                                            query: {
                                               shiftId: shift.id,
                                            },
                                         }}
                                      >
                                         <Typography variant="h5">
                                            {shiftTitle}
                                         </Typography>
                                      </Link>
                                   </Box>
                                );
                             })
                           : null}
                        {/* New Shift Button */}
                        <Box marginLeft={1} marginTop={1}>
                           <Button variant="outlined" size="medium">
                              {/* NextJs link -> Task View*/}
                              <Link
                                 href={{
                                    pathname: "../pg-1",
                                    query: {
                                       view: "shift",
                                       taskId: task.id,
                                    },
                                 }}
                                 style={{ textDecoration: "none" }}
                              >
                                 <Typography variant="body2">
                                    New Shift
                                 </Typography>
                              </Link>
                           </Button>
                        </Box>
                     </Box>
                  );
               })}
            </Box>
            {/* Submitted JHAs (Awaiting GC Safety Team approval) */}
            <Box marginLeft={2} marginTop={1} marginBottom={2}>
               {/* Heading */}
               <Typography variant="h4">Submitted JHAs</Typography>
               <Typography variant="body2" marginTop={0.5}>
                  * Awaiting GC Safety Team approval
               </Typography>
               {project?.Tasks.map((task, idx) => {
                  return (
                     <Box key={idx} marginLeft={2} marginY={1}>
                        <Typography variant="h5">{task.name}</Typography>
                     </Box>
                  );
               })}
            </Box>
            {/* Active/Approved JHAs */}
            <Box marginLeft={2} marginTop={1} marginBottom={2}>
               <Typography variant="h4">Active JHAs</Typography>
               {project.Tasks.map((task, idx) => {
                  return (
                     <Box key={idx} marginLeft={2} marginY={1}>
                        <Typography variant="h5">{task.name}</Typography>
                     </Box>
                  );
               })}
            </Box>
            {/* Create Task Button */}
            <Box marginLeft={2} marginTop={3}>
               <Button variant="outlined">
                  {/* NextJs link -> Task View*/}
                  <Link
                     href={{
                        pathname: "../pg-1",
                        query: {
                           view: "task",
                           projectId: project?.id,
                        },
                     }}
                     style={{ textDecoration: "none" }}
                  >
                     Create Task
                  </Link>
               </Button>
            </Box>
         </Box>
      </Container>
   ) : null;
}
