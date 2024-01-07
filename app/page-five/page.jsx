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

export default function PageFive() {
    const searchParams = useSearchParams()
    const shiftId = searchParams.get("id")
  return (
    <Container>
            <h1>Hello</h1>
        </Container>
  )
}
