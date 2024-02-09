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
   const [ppe, setPpe] = useState(null)
   const [dataReady, setDataReady] =
      useState(false)

   useEffect(() => {
      fetch("../api/get-page6-options/" + shiftId)
         .then((res) => res.json())
         .then((res) => {
            setPpe(res.ppeOpts)
            //   setSituationsMisc(
            //      res.situationsMisc?.details
            //   )
         })
         .then(() => setDataReady(true))
   }, [shiftId])

   function handlePpeChange(idx, isChecked) {
      const val = isChecked === "true"
      setPpe((prev) => {
         const updatedOpts = [...prev]
         updatedOpts[
            idx
         ].shiftCategoryOptions[0].checked = val
         return updatedOpts
      })
   }

   function handleNext() {
    {
       fetch(
          "../api/update-page6-options/" +
             searchParams.get("id"),
          {
             method: "PATCH",
             headers: {
                "Content-Type":
                   "application/json"
             },
             body: JSON.stringify({
                ppe,
             })
          }
       )
    }
 }
   return (
      <Container>
         {/* PPE */}
         <Container>
            {/* Heading */}
            <Typography
               variant="h3"
               marginBottom={1}
            >
               <span
                  style={{ fontWeight: "bold" }}
               >
                  C.4
               </span>{" "}
               Proper PPE
            </Typography>
            {/* Body */}
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingX: {
                     sm: 1
                  }
               }}
            >
               {dataReady
                  ? ppe.map((opt, idx) => {
                       return (
                          <Box display="flex" key={opt.name}>
                             <FormControl
                                className="mb-2 flex flex-nowrap items-center justify-between"
                                fullWidth
                                sx={{
                                   flexDirection:
                                      "row"
                                }}
                             >
                                <FormLabel
                                   id={`${opt.name} radio group`}
                                   className="text-black"
                                   sx={{
                                      fontSize: {
                                         xs: 14,
                                         sm: 16
                                      },
                                      width: "50%"
                                   }}
                                >
                                   {opt.name}
                                </FormLabel>
                                <RadioGroup
                                   aria-labelledby={`${opt.name} radio group`}
                                   name={`${opt.name}`}
                                   onChange={(
                                      e
                                   ) =>
                                      handlePpeChange(
                                         idx,
                                         e.target
                                            .value
                                      )
                                   }
                                   value={
                                      opt
                                         .shiftCategoryOptions[0]
                                         .checked
                                   }
                                   sx={{
                                      display:
                                         "inline-block",
                                      marginLeft: 1
                                   }}
                                >
                                   <FormControlLabel
                                      value={true}
                                      control={
                                         <Radio
                                            checkedIcon={
                                               <CheckIcon />
                                            }
                                            icon={
                                               <CheckBoxOutlineBlankOutlinedIcon />
                                            }
                                         />
                                      }
                                      label="Yes"
                                      sx={{
                                         marginRight:
                                            {
                                               xs: 2
                                            },
                                         "& .MuiTypography-root":
                                            {
                                               fontSize:
                                                  {
                                                     xs: 14,
                                                     sm: 16
                                                  }
                                            },
                                         "& .MuiSvgIcon-root":
                                            {
                                               width: {
                                                  xs: 20,
                                                  sm: 24
                                               }
                                            }
                                      }}
                                   />
                                   <FormControlLabel
                                      value={
                                         false
                                      }
                                      control={
                                         <Radio
                                            checkedIcon={
                                               <CheckIcon />
                                            }
                                            icon={
                                               <CheckBoxOutlineBlankOutlinedIcon />
                                            }
                                         />
                                      }
                                      label="No"
                                      sx={{
                                         marginRight:
                                            {
                                               xs: 0,
                                               sm: 1
                                            },
                                         "& .MuiTypography-root":
                                            {
                                               fontSize:
                                                  {
                                                     xs: 14,
                                                     sm: 16
                                                  }
                                            },
                                         "& .MuiButtonBase-root":
                                            {
                                               width: {
                                                  xs: 34,
                                                  sm: 40
                                               }
                                            },
                                         "& .MuiSvgIcon-root":
                                            {
                                               width: {
                                                  xs: 20,
                                                  sm: 24
                                               }
                                            }
                                      }}
                                   />
                                </RadioGroup>
                             </FormControl>
                          </Box>
                       )
                    })
                  : null}
            </Box>
         </Container>
         {/* Navigation Buttons */}
         <Box
            display="flex"
            justifyContent="space-evenly"
         >
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "../page-five",
                     query: { id: shiftId }
                  }}
                  onClick={handleNext}
               >
                  Previous
               </Link>
            </Button>
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "../page-seven",
                     query: { id: shiftId }
                  }}
                  onClick={handleNext}
               >
                  Next
               </Link>
            </Button>
         </Box>
      </Container>
   )
}
