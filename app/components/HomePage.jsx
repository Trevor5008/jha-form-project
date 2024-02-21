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

export default function HomePage() {
   const [project, setProject] = useState(null);
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
   // TODO: Change to single project, header s/b project name
   return dataReady && project ? (
      <Container>
         <Box key={project?.id}>
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
               <Typography variant="h3">Draft JHAs</Typography>
               {project.Tasks.map((task, idx) => {
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
                              pathname: "../page-two",
                              query: {
                                 id: task.id,
                              },
                           }}
                        >
                           <Typography variant="h4">{task.name}</Typography>
                        </Link>
                        {/* New Shift Button */}
                        <Box marginLeft={1} marginTop={1}>
                           <Button variant="outlined" size="medium">
                              {/* NextJs link -> Task View*/}
                              <Link
                                 href={{
                                    pathname: "../page-one",
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
                        {/* Template has no shift id */}
                        {/* <Button variant="outlined">
                                    <Link
                                       style={{
                                          textDecoration: "none",
                                          fontSize: 12
                                       }}
                                       sx={{
                                          cursor: "pointer",
                                       }}
                                       href={{
                                          pathname: "../page-two",
                                       }}
                                    >
                                       Create Template
                                    </Link>
                                 </Button> */}
                     </Box>
                  );
               })}
            </Box>
            {/* Submitted JHAs (Awaiting GC Safety Team approval) */}
            <Box marginLeft={2} marginTop={1} marginBottom={2}>
               <Typography variant="h3">Submitted JHAs</Typography>
               <Typography variant="body2" marginTop={.5}>* Awaiting GC Safety Team approval</Typography>
               {project.Tasks.map((task, idx) => {
                  return (
                     <Box key={idx} marginLeft={2} marginY={1}>
                        <Link
                           style={{
                              textDecoration: "none"
                           }}
                           href={{
                              pathname: "../page-two",
                              query: {
                                 id: task.id,
                              },
                           }}
                        >
                           <Typography variant="h4">{task.name}</Typography>
                        </Link>
                        {/* Template has no shift id */}
                        {/* <Button variant="outlined">
                                    <Link
                                       style={{
                                          textDecoration: "none",
                                          fontSize: 12
                                       }}
                                       sx={{
                                          cursor: "pointer",
                                       }}
                                       href={{
                                          pathname: "../page-two",
                                       }}
                                    >
                                       Create Template
                                    </Link>
                                 </Button> */}
                     </Box>
                  );
               })}
            </Box>
            {/* Active/Approved JHAs */}
            <Box marginLeft={2} marginTop={1} marginBottom={2}>
               <Typography variant="h3">Active JHAs</Typography>
               {project.Tasks.map((task, idx) => {
                  return (
                     <Box key={idx} marginLeft={2} marginY={1}>
                        <Link
                           style={{
                              textDecoration: "none"
                           }}
                           href={{
                              pathname: "../page-two",
                              query: {
                                 id: task.id,
                              },
                           }}
                        >
                           <Typography variant="h4">{task.name}</Typography>
                        </Link>
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
                        pathname: "../page-one",
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
