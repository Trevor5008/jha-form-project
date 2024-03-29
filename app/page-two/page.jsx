"use client";
import { useState, useEffect } from "react";
import {
   Container,
   Typography,
   TextField,
   FormControl,
   FormControlLabel,
   FormLabel,
   RadioGroup,
   Radio,
   Box,
   Button,
   FormHelperText,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

export default function PageTwo() {
   const searchParams = useSearchParams();
   const shiftId = searchParams.get("shiftId");
   const [permits, setPermits] = useState(null);
   const [permitMisc, setPermitMisc] = useState(null);
   const [atmMonitoring, setAtmMonitoring] = useState(null);
   const [dataReady, setDataReady] = useState(false);

   // Loads permit, atmospheric monitoring options (defaulted to 'No' each)
   useEffect(() => {
      fetch("../api/get-page2-options/" + shiftId)
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok");
            }
            return res.json();
         })
         .then((res) => {
            setPermits(res.permitOpts);
            setPermitMisc(res.permitMisc?.details);
            setAtmMonitoring(res.atmMonitorOpts);
         })
         .then(() => setDataReady(true))
         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   }, [searchParams, shiftId]); 

   function handlePermitChange(idx, isChecked) {
      const val = isChecked === "true";
      setPermits((prev) => {
         const updatedOpts = [...prev];
         updatedOpts[idx].shiftCategoryOptions[0].checked = val;
         return updatedOpts;
      });
   }

   function handleAtmMonitorChange(idx, isChecked) {
      const val = isChecked === "true";
      setAtmMonitoring((prev) => {
         const updatedOpts = [...prev];
         updatedOpts[idx].shiftCategoryOptions[0].checked = val;
         return updatedOpts;
      });
   }

   function changePermitMisc(evt) {
      setPermitMisc(evt.target.value);
   }
   // Handle updates to all option selections
   function handleNext() {
      {
         fetch("../api/update-page2-options/" + shiftId, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               permits,
               permitMisc,
               atmMonitoring,
            }),
         });
      }
   }

   return (
      <Container>
         {/* Permits */}
         <Container>
            <Typography variant="h3" marginBottom={1}>
               <span>A.</span> Are Permits Required? Are they displayed and
               properly signed by the PSC/PSA?
            </Typography>
            <Box>
               <Box>
                  {dataReady
                     ? permits.map((opt, idx) => {
                          return (
                             <Box key={opt.name}>
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
                                         handlePermitChange(idx, e.target.value)
                                      }
                                      value={
                                         opt.shiftCategoryOptions[0].checked
                                      }
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
               <TextField
                  label="Other"
                  // variant="standard"
                  fullWidth
                  value={permitMisc || ""}
                  sx={{
                     "& .MuiFormLabel-root": {
                        color: "black",
                        fontSize: {
                           xs: 14,
                           sm: 16,
                        },
                     },
                     paddingRight: 1,
                  }}
                  helperText="
                  * specify above"
                  onChange={changePermitMisc}
               />
            </Box>
         </Container>
         {/* Atmospheric Monitoring */}
         <Container>
            {/* Heading */}
            <Typography variant="h3" marginBottom={1}>
               <span style={{ fontWeight: "bold" }}>B.</span> Atmospheric
               Monitoring
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
               {dataReady &&
                  atmMonitoring.map((opt, idx) => {
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
                                    handleAtmMonitorChange(idx, e.target.value)
                                 }
                                 value={opt.shiftCategoryOptions[0]?.checked}
                                 sx={{
                                    display: "inline-block",
                                    marginLeft: 1,
                                 }}
                              >
                                 {/* 'Yes' option */}
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
                                 {/* 'No' option */}
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
                  })}
            </Box>
         </Container>
         {/* Navigation Buttons */}
         <Box display="flex" justifyContent="space-evenly">
            <Button variant="standard">
               <Link href="/">Home</Link>
            </Button>
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "../page-three",
                     query: { shiftId },
                  }}
                  onClick={handleNext}
               >
                  Next
               </Link>
            </Button>
         </Box>
      </Container>
   );
}
