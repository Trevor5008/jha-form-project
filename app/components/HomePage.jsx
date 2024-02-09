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
import { FormControl } from "@mui/material";
import DateTimeInput from "./DateTimeInput";
import SelectInput from "./SelectInput";
import { projectData, companyNames, supervisors, foreman } from "@/lib/options";

export default function HomePage() {
   const [projects, setProjects] = useState(null);

   const [shift, setShift] = useState(null);
   const [dataReady, setDataReady] = useState(false);

   useEffect(() => {
      loadProjects();
   }, []);

   async function loadProjects() {
      fetch("../../api/load-projects")
         .then((res) => res.json())
         .then((res) => setProjects(res.projects))
         .then(() => setDataReady(true));
   }

   return dataReady ? (
      <Container>
         <Typography variant="h2">Project(s)</Typography>
         <List>
            {projects.map((opt, idx) => {
               return (
                  <Box key={idx} marginLeft={2}>
                     <ListItemText>{opt.name}</ListItemText>
                     <Box marginLeft={2}>
                        <Typography variant="h3">Task(s)</Typography>
                        {opt.Shifts.map((shift, idx) => {
                           return (
                              <Box key={idx} marginLeft={2}>
                                 <Button variant="outlined">
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
                                          query: {
                                             id: shift.id,
                                          },
                                       }}
                                    >
                                       New Shift
                                    </Link>
                                 </Button>
                                 {/* Template has no shift id */}
                                 <Button variant="outlined">
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
                                 </Button>
                              </Box>
                           );
                        })}
                     </Box>
                     <Button variant="outlined" sx={{ marginLeft: 2 }}>
                        {/* NextJs link, not Material UI */}
                        <Link
                           href={{
                              pathname: "../page-one",
                              query: {
                                 id: opt.id,
                              },
                           }}
                           style={{ textDecoration: "none" }}
                        >
                           New Task
                        </Link>
                     </Button>
                  </Box>
               );
            })}
         </List>
      </Container>
   ) : null;
}
