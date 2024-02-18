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
   }, []);

   async function loadProject() {
      fetch("../../api/load-project")
         .then((res) => res.json())
         .then((res) => setProject(res.project))
         .then(() => setDataReady(true));
   }
   // TODO: Change to single project, header s/b project name
   return dataReady ? (
      <Container>
         <Box key={project.id}>
            <Typography
               variant="h2"
               sx={{
                  fontWeight: "bold",
                  marginTop: 2,
                  marginBottom: 1,
               }}
            >
               {project.name}
            </Typography>
            <Box marginLeft={2}>
               <Typography variant="h3">Task(s)</Typography>
               {/* Change to task(s)*/}
               {project.Tasks.map((shift, idx) => {
                  return (
                     <Box key={idx} marginLeft={2} marginY={2}>
                        <Link
                           style={{
                              textDecoration: "none",
                              fontSize: 12,
                           }}
                           sx={{
                              cursor: "pointer",
                           }}
                           href={{
                              pathname: "../page-two",
                              query: {
                                 id: shift.id,
                              },
                           }}
                        >
                           {shift.name}
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
            <Box marginTop={5}>
               <Button variant="outlined">
                  {/* NextJs link, not Material UI */}
                  <Link
                     href={{
                        pathname: "../page-one",
                        query: {
                           view: "task",
                           // id: opt.id,
                        },
                     }}
                     style={{ textDecoration: "none" }}
                  >
                     New Task
                  </Link>
               </Button>
            </Box>
         </Box>
      </Container>
   ) : null;
}
