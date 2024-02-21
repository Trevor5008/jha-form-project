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
               <Typography variant="h3">Draft JHAs</Typography>
               {project.Tasks.map((task, idx) => {
                  return (
                     <Box key={idx} marginLeft={2} marginY={2}>
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
                           {task.name}
                        </Link>
                        {/* New Shift Button */}
                        <Box marginTop={1}>
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
                                 <Typography variant="body2">New Shift</Typography>
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
            {/* New Task Button */}
            <Box marginTop={5}>
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
                     New Task
                  </Link>
               </Button>
            </Box>
         </Box>
      </Container>
   ) : null;
}
