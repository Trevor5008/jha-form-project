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
   Pagination,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { competentPeople } from "@/lib/options";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function PageFive() {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const shiftId = searchParams.get("shiftId");
   const [hasStandBy, setHasStandBy] = useState(false);
   const [workerCounter, setWorkerCounter] = useState(0);
   const [workers, setWorkers] = useState([]);
   const [compPplCounter, setCompPplCounter] = useState(0);
   const [compPeople, setCompPeople] = useState([]);
   const [hazardControls, setHazardControls] = useState(null);
   const [dataReady, setDataReady] = useState(false);

   useEffect(() => {
      fetch("../api/get-page5-options/" + shiftId)
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok");
            }
            return res.json();
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

   /* Hazard Controls Methods */
   // Handle individual option changes
   function handleHazardControlChange(idx, isChecked) {
      const val = isChecked === "true";
      setHazardControls((prev) => {
         const updatedOpts = [...prev];
         updatedOpts[idx].shiftCategoryOptions[0].checked = val;
         return updatedOpts;
      });
   }

   /* Stand-by Persons Methods */
   // Initialize worker fields
   function handleStandByAdd(evt) {
      const hasStandBy = evt.target.value === "true";
      setHasStandBy(hasStandBy);
      if (hasStandBy) {
         setWorkerCounter(1);
         setWorkers([{ id: 1, name: "", job: "" }]);
      } else {
         setWorkerCounter(0);
         setWorkers([]);
      }
   }
   // Add worker to workers array
   function addWorker() {
      console.log(workers)
      setWorkerCounter(workerCounter + 1);
      setWorkers([...workers, { id: workerCounter + 1, name: "", job: "" }]);
      console.log(workers)
   }
   // Assign worker name to worker object
   function assignWorkerName(evt, id) {
      const name = evt.target.value;
      const workerFlds = workers.map((fld) => {
         if (fld.id === id) {
            return { ...fld, name };
         }
         return fld;
      });
      setWorkers(workerFlds);
   }
   // Assign worker job to worker object
   function handleJobChange(evt, id) {
      const job = evt.target.value;
      const workerFlds = workers.map((fld) => {
         if (fld.id === id) {
            return { ...fld, job };
         }
         return fld;
      });
      setWorkers(workerFlds);
   }
   // Remove worker from workers array
   function removeWorker(id) {
      const workerFlds = workers.filter((fld) => fld.id !== id);
      setWorkers([...workerFlds])
   }

   /* Competent Person Methods */
   // Add competent person field to competentPeople array
   function addCompetentPerson() {
      console.log(compPeople)
      setCompPplCounter(compPplCounter + 1);
      setCompPeople([...compPeople, { id: compPplCounter + 1, name: "" }]);
   }
   // Assign selected name to assc. competent person object
   function assignCompetentPerson(evt, id) {
      const name = evt.target.value;
      const compPplFlds = compPeople.map((fld) => {
         if (fld.id === id) {
            fld.name = name;
         }
         return fld;
      });
      setCompPeople(compPplFlds);
   }
   // Remove competent person from compPeople array
   function removeCompetentPerson(id) {
      const compPplFlds = compPeople.filter((fld) => fld.id !== id);
      setCompPeople([...compPplFlds]);
   }

   /* Navigation Methods */
   // Handle pagination
   function handlePageChange(val) {
      let newPathname = pathname.replace(/pg-(\d+)/, `pg-${val}`);
      newPathname = newPathname + `?shiftId=${shiftId}`;
      handleNext();
      router.push(newPathname);
   }
   // Update hazard controls and situationsMisc data
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
                  // Stand-By Persons Fields (Worker Select, Job Select, Delete Button)
                  workers.map((obj, idx) => {
                     return (
                        <Box key={idx} display="flex" sx={{ gap: 2 }}>
                           {/* Worker Select */}
                           <TextField
                              key={idx}
                              id={idx}
                              label="Worker"
                              variant="standard"
                              value={obj.name}
                              onChange={(e) => assignWorkerName(e, obj.id)}
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
                                 value={obj.job || ""}
                                 onChange={(e) => handleJobChange(e, obj.id)}
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
                           {/* Delete button - remove assc. worker from workers array variable*/}
                           <DeleteOutlineIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => removeWorker(obj.id)}
                           />
                        </Box>
                     );
                  })}
               {/* Adds additional worker objects to workers array */}
               {hasStandBy && <Button onClick={addWorker}>Add Worker</Button>}
               {dataReady &&
                  compPeople.map((obj, idx) => {
                      return (
                        <Box key={idx} display="flex" sx={{ gap: 2 }}>
                           <Autocomplete
                             disablePortal
                             id="competent-person"
                             options={competentPeople}
                             value={obj.name}
                             autoSelect={true}
                             onBlur={(e) => assignCompetentPerson(e, obj.id)}
                             renderInput={(params) => (
                               <TextField
                                 {...params}
                                 label="Competent Person"
                               />
                             )}
                             sx={{ flex: 2 }}
                           />
                           <DeleteOutlineIcon
                             style={{ cursor: "pointer" }}
                             onClick={() => removeCompetentPerson(obj.id)}
                           />
                        </Box>
                      );
                  })}
               <Button onClick={addCompetentPerson}>
                  Add Competent Person
               </Button>
            </Box>
         </Container>
         {/* Navigation Buttons */}
         <Box display="flex" justifyContent="space-evenly">
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "../pg-4",
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
                     pathname: "../pg-6",
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
               <Link href="/" onClick={handleNext}>
                  Home
               </Link>
            </Button>
         </Box>
         {/* Pagination bottom-drawer (needs styling) */}
         <Pagination
            color="primary"
            page={5}
            count={8}
            onChange={handlePageChange}
         />
      </Container>
   );
}
