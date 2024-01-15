"use client"
import { useEffect, useState } from "react"
import {
   Typography,
   Container,
   TextField,
   Button,
   Box,
   InputLabel,
   Select,
   MenuItem
} from "@mui/material"
import Link from "next/link"
import { FormControl } from "@mui/material"
import DateTimeInput from "./DateTimeInput"
import SelectInput from "./SelectInput"
import {
   projectData,
   companyNames,
   supervisors,
   foreman
} from "@/lib/options"

export default function HomePage() {
   const [projects, setProjects] = useState(null)
   const [projectName, setProjectName] =
      useState("")

   const [shift, setShift] = useState(null)
   const [dataReady, setDataReady] =
      useState(false)

   useEffect(() => {
      loadProjects()
      console.log("loaded")
   }, [])

   async function loadProjects() {
      fetch("../../api/load-projects")
         .then((res) => res.json())
         .then((res) => setProjects(res.projects))
         .then(() => setDataReady(true))
   }

   return dataReady ? (
      <Container>
         <h1>Tasks</h1>
         {projects.map((opt, idx) => {
            return (
               <Container>
                  <ul>
                     {opt.name}
                     {opt.Shifts.map((shift) => {
                        return (
                           <li>
                              <Link
                                 style={{
                                    textDecoration:
                                       "none"
                                 }}
                                 sx={{
                                    cursor:
                                       "pointer"
                                 }}
                                 href={{
                                    pathname:
                                       "../page-two",
                                    query: {
                                       id: shift.id
                                    }
                                 }}
                              >
                                 {
                                    shift.description
                                 }
                              </Link>
                           </li>
                        )
                     })}
                  </ul>
                  <Button>
                     <Link
                        href={{
                           pathname: "../page-one",
                           query: {
                              id: opt.id
                           }
                        }}
                        style={{
                           textDecoration: "none",
                           cursor: "pointer"
                        }}
                     >
                        New Shift
                     </Link>
                  </Button>
               </Container>
            )
         })}
      </Container>
   ) : null
}
