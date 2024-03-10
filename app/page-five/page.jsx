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
   TextField,
   Autocomplete,
   InputAdornment,
   InputLabel,
   Typography,
   MenuItem,
   Select,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { competentPeople } from "@/lib/options";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PageFive() {
   const searchParams = useSearchParams();
   const shiftId = searchParams.get("shiftId");
   const [hasStandBy, setHasStandBy] = useState(false);
   const [workerCounter, setWorkerCounter] = useState(0);
   const [workers, setWorkers] = useState([]);
   const [hazardControls, setHazardControls] = useState(null);
   const [dataReady, setDataReady] = useState(false);

   useEffect(() => {
      fetch("../api/get-page5-options/" + shiftId)
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok")
            }
            return res.json()
         })
         .then((res) => {
            setHazardControls(res.hazardControlOpts);
            //   setSituationsMisc(
            //      res.situationsMisc?.details
            //   )
         })
         .then(() => setDataReady(true))
         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   }, [shiftId]);

   function handleStandByAdd(evt) {
      const hasStandBy = evt.target.value === "true";
      setHasStandBy(hasStandBy);
      if (hasStandBy) {
         setWorkerCounter(1);
         setWorkers([...workers, { id: 1, value: "" }]);
      } else {
         setWorkerCounter(0);
         setWorkers([]);
      }
   }

   function addWorker() {
      setWorkerCounter(workerCounter + 1);
      setWorkers([...workers, { id: workerCounter + 1, value: "" }]);
   }

   function handleHazardControlChange(idx, isChecked) {
      const val = isChecked === "true";
      setHazardControls((prev) => {
         const updatedOpts = [...prev];
         updatedOpts[idx].shiftCategoryOptions[0].checked = val;
         return updatedOpts;
      });
   }

   function removeWorker(id) {
      const workerFlds = workers.filter((fld) => fld.id !== id);
      setWorkers(workerFlds);
   }

   function handleJobChange(evt) {
      console.log(evt.target.value);
   }

   function handleNext() {
      {
         fetch("../api/update-page5-options/" + shiftId, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               hazardControls,
               // situationsMisc
            }),
         });
      }
   }

   return (
      <Container>
         {/* Hazards */}
         <Container>
            {/* Heading */}
            <Typography variant="h3" marginBottom={1}>
               <span style={{ fontWeight: "bold" }}>C.3</span> Hazard Controls
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
                  ? hazardControls.map((opt, idx) => {
                       return (
                          <Box display="flex" key={idx}>
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
                                      handleHazardControlChange(
                                         idx,
                                         e.target.value
                                      )
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
               {/* Stand-By Persons Option Select*/}
               <FormControl fullWidth sx={{ flexDirection: "row" }}>
                  <FormLabel
                     id={`stand-by persons radio group`}
                     className="text-black"
                     sx={{
                        fontSize: {
                           xs: 14,
                           sm: 16,
                        },
                        width: "50%",
                     }}
                  >
                     Stand-By Persons?
                  </FormLabel>
                  <RadioGroup
                     aria-labelledby={`stand-by persons radio group`}
                     name={`stand-by persons`}
                     onChange={handleStandByAdd}
                     value={hasStandBy}
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
                              icon={<CheckBoxOutlineBlankOutlinedIcon />}
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
                              icon={<CheckBoxOutlineBlankOutlinedIcon />}
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
               {hasStandBy &&
                  // Spotter/Flagger/Traffic Control field(s)
                  workers.map((obj, idx) => {
                     return (
                        <Box key={idx} display="flex" sx={{ gap: 2 }}>
                           {/* Worker Select */}
                           <TextField
                              key={idx}
                              id={obj.id}
                              label="Worker"
                              variant="standard"
                              InputProps={{
                                 endAdornment: (
                                    <InputAdornment position="end">
                                       {/* <DeleteOutlineIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => removeWorker(obj.id)}
                                       /> */}
                                    </InputAdornment>
                                 ),
                              }}
                              sx={{
                                 flex: 1,
                                 marginLeft: 2,
                                 fontSize: {
                                    xs: 14,
                                    sm: 16,
                                 },
                                 "& .MuiFormLabel-root": {
                                    color: "black",
                                    fontSize: {
                                       xs: 14,
                                       sm: 16,
                                    },
                                 },
                                 paddingRight: 1,
                                 width: "100%",
                                 marginBottom: 2,
                              }}
                              helperText="* provide details above"
                           />
                           <FormControl sx={{ flex: 1 }}>
                              <InputLabel id="demo-simple-select-autowidth-label">
                                 Job
                              </InputLabel>
                              <Select
                                 variant="standard"
                                 labelId="demo-simple-select-autowidth-label"
                                 id="demo-simple-select-autowidth"
                                 value={""}
                                 onChange={handleJobChange}
                                 autoWidth
                                 label="Job"
                              >
                                 <MenuItem value="spotter">Spotter</MenuItem>
                                 <MenuItem value="flagger">Flagger</MenuItem>
                                 <MenuItem value="traffic control">
                                    Traffic Control
                                 </MenuItem>
                              </Select>
                           </FormControl>
                           {/* Delete button */}
                           <DeleteOutlineIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => removeWorker(obj.id)}
                           />
                        </Box>
                     );
                  })}
               {hasStandBy && <Button onClick={addWorker}>Add Worker</Button>}
               <Autocomplete
                  disablePortal
                  id="competent-person"
                  options={competentPeople}
                  renderInput={(params) => (
                     <TextField {...params} label="Competent Person" />
                  )}
               />
            </Box>
         </Container>
         {/* Navigation Buttons */}
         <Box display="flex" justifyContent="space-evenly">
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "../page-four",
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
                     pathname: "../page-six",
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
