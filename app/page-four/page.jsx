"use client"
import { useState, useEffect } from "react"
import {
   Box,
   Button,
   Container,
   FormControl,
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup,
   Typography
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function PageFour() {
   const searchParams = useSearchParams()
   const shiftId = searchParams.get("id")
   const [hazards, setHazards] = useState(null)
   const [dataReady, setDataReady] = useState(false)

   useEffect(() => {
    fetch(
       "../api/get-page4-options/" +
          shiftId
    )
    //    .then((res) => res.json())
    //    .then((res) => {
    //       setSituations(res.situationOpts)
    //       setSituationsMisc(
    //          res.situationsMisc?.details
    //       )
    //    })
    //    .then(() => setDataReady(true))
 }, [])
   return <div>{shiftId}</div>
}
