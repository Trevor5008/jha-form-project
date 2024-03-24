"use client";
import { useState, useEffect } from "react";
import {
   Box,
   Button,
   Container,
   FormControl,
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup,
   Typography,
   Pagination
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function PageThree() {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams();
   const shiftId = searchParams.get("shiftId");
   const [situations, setSituations] = useState(null);
   const [situationsMisc, setSituationsMisc] = useState(null);
   const [dataReady, setDataReady] = useState(false);

   useEffect(() => {
      fetch("../api/get-page3-options/" + shiftId)
         .then((res) => res.json())
         .then((res) => {
            setSituations(res.situationOpts);
            setSituationsMisc(res.situationsMisc?.details);
         })
         .then(() => setDataReady(true));
   }, [searchParams, shiftId]);

   function handleSituationChange(idx, isChecked) {
      const val = isChecked === "true";
      setSituations((prev) => {
         const updatedOpts = [...prev];
         updatedOpts[idx].shiftCategoryOptions[0].checked = val;
         return updatedOpts;
      });
   }

   function changeSituationMisc(evt) {
      setSituationsMisc(evt.target.value);
   }
   function handleNext() {
      {
         fetch("../api/update-page3-options/" + shiftId, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               situations,
               situationsMisc,
            }),
         });
      }
   }

   function handlePageChange(evt, val) {
      let newPathname = pathname.replace(/pg-(\d+)/, `pg-${val}`);
      newPathname = newPathname + `?shiftId=${shiftId}`
      handleNext()
      router.push(newPathname)
   }

   return (
      <Container>
         <Box marginBottom={2}>
            <Typography variant="h3" marginBottom={0.5}>
               <span style={{ fontWeight: "bold" }}>THINK </span>
               about the work you and your crews will be doing today.
            </Typography>
            <Typography variant="body1" marginLeft={1}>
               Select <span style={{ fontWeight: "bold" }}>Yes/No</span> for
               each element
            </Typography>
            <Typography variant="body2" marginLeft={2}>
               * All elements identified with a Yes must be addressed in Section
               D
            </Typography>
         </Box>
         {/* Situations */}
         <Container>
            {/* Heading */}
            <Typography variant="h3" marginBottom={1}>
               <span style={{ fontWeight: "bold" }}>C.1</span> Task/Scope
            </Typography>
            {/* Body */}
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingX: {
                     sm: 1,
                  },
               }}
            >
               {dataReady
                  ? situations.map((opt, idx) => {
                       return (
                          <Box display="flex" key={opt.name}>
                             <FormControl
                                className="mb-2 flex flex-nowrap items-center justify-between"
                                fullWidth
                                sx={{
                                   flexDirection: "row",
                                }}
                             >
                                <FormLabel
                                   id={`${opt.name} radio group`}
                                   className="text-black"
                                   sx={{
                                      fontSize: {
                                         xs: 14,
                                         sm: 16,
                                      },
                                      width: "50%",
                                   }}
                                >
                                   {opt.name}
                                </FormLabel>
                                <RadioGroup
                                   aria-labelledby={`${opt.name} radio group`}
                                   name={`${opt.name}`}
                                   onChange={(e) =>
                                      handleSituationChange(idx, e.target.value)
                                   }
                                   value={opt.shiftCategoryOptions[0].checked}
                                   sx={{
                                      display: "inline-block",
                                      marginLeft: 1,
                                   }}
                                >
                                   <FormControlLabel
                                      value={true}
                                      control={
                                         <Radio
                                            checkedIcon={<CheckIcon />}
                                            icon={
                                               <CheckBoxOutlineBlankOutlinedIcon />
                                            }
                                         />
                                      }
                                      label="Yes"
                                      sx={{
                                         marginRight: {
                                            xs: 2,
                                         },
                                         "& .MuiTypography-root": {
                                            fontSize: {
                                               xs: 14,
                                               sm: 16,
                                            },
                                         },
                                         "& .MuiSvgIcon-root": {
                                            width: {
                                               xs: 20,
                                               sm: 24,
                                            },
                                         },
                                      }}
                                   />
                                   <FormControlLabel
                                      value={false}
                                      control={
                                         <Radio
                                            checkedIcon={<CheckIcon />}
                                            icon={
                                               <CheckBoxOutlineBlankOutlinedIcon />
                                            }
                                         />
                                      }
                                      label="No"
                                      sx={{
                                         marginRight: {
                                            xs: 0,
                                            sm: 1,
                                         },
                                         "& .MuiTypography-root": {
                                            fontSize: {
                                               xs: 14,
                                               sm: 16,
                                            },
                                         },
                                         "& .MuiButtonBase-root": {
                                            width: {
                                               xs: 34,
                                               sm: 40,
                                            },
                                         },
                                         "& .MuiSvgIcon-root": {
                                            width: {
                                               xs: 20,
                                               sm: 24,
                                            },
                                         },
                                      }}
                                   />
                                </RadioGroup>
                             </FormControl>
                          </Box>
                       );
                    })
                  : null}
            </Box>
         </Container>
         {/* Navigation Buttons */}
         <Box display="flex" justifyContent="space-evenly">
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "../pg-3",
                     query: { shiftId },
                  }}
                  onClick={handleNext}
               >
                  Previous
               </Link>
            </Button>
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "../pg-4",
                     query: { shiftId },
                  }}
                  onClick={handleNext}
               >
                  Next
               </Link>
            </Button>
         </Box>
         <Box display="flex" justifyContent="center">
            <Button variant="standard">
               <Link href="/" onClick={handleNext}>Home</Link>
            </Button>
         </Box>
         <Pagination color="primary" page={3} count={8} onChange={handlePageChange}/>
      </Container>
   );
}
