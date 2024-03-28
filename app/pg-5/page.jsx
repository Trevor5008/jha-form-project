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
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function PageFive() {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const shiftId = searchParams.get("shiftId");

   // Shift Category Option (Hazard Controls)
   const [hazardControls, setHazardControls] = useState(null);
   // Personnel options for select component options
   const [personnelOpts, setPersonnelOpts] = useState(null);
   // Shift Personnel Assignments
   const [shiftPersonnel, setShiftPersonnel] = useState(null);

   // Render Status Control Flag
   // Toggle Worker Fields based on Stand-By Persons Option
   const [hasStandBy, setHasStandBy] = useState(false);
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
            setPersonnelOpts(res.personnel);
            if (res.shiftPersonnel.length > 0) {
               setHasStandBy(true);
               setShiftPersonnel(
                  res.shiftPersonnel.map((person) => {
                     return {
                        id: person.id,
                        name: person.personnel.name,
                        assignment: person.assignment,
                        shiftId,
                        personnelId: person.personnelId,
                     };
                  })
               );
            } else {
               setShiftPersonnel([]);
            }
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
   function handleStandByAdd() {
      setHasStandBy((prev) => !prev);
      if (!hasStandBy) {
         setShiftPersonnel([]);
      }
   }
   // Adds a new (blank) input fields row
   function addWorkerFld() {
      const newId = Math.random().toString(36).substring(2, 9);
      setShiftPersonnel((prev) => {
         return [...prev, { id: newId, name: "", assignment: "", shiftId }];
      });
   }
   // Assigns personnel name to worker
   function assignWorkerName(e, workerId) {
      const person = personnelOpts.find((opt) => opt.name === e.target.value);
      setShiftPersonnel((prev) => {
         const updatedWorkers = [...prev];
         updatedWorkers.forEach((worker) => {
            if (worker.id === workerId) {
               worker.name = e.target.value;
               worker.personnelId = person.id;
            }
         });
         return updatedWorkers;
      });
   }
   // Assigns role to worker
   function assignRole(e, workerId) {
      setShiftPersonnel((prev) => {
         const updatedWorkers = [...prev];
         updatedWorkers.forEach((worker) => {
            if (worker.id === workerId) {
               worker.assignment = e.target.value;
            }
         });
         return updatedWorkers;
      });
   }

   // Remove worker from shiftPersonnel
   function removeWorker(workerId) {
      setShiftPersonnel((prev) => {
         return prev.filter((worker) => worker.id !== workerId);
      });
   }
   // Check data in state
   function checkData() {
      console.log(shiftPersonnel);
   }

   /* Navigation Methods */

   // Handle pagination (don't remove 'evt' parameter, it's required by MUI Pagination component)
   function handlePageChange(evt, val) {
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
               shiftPersonnel,
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
               {/* Stand-By Persons Fields */}
               {hasStandBy && shiftPersonnel
                  ? shiftPersonnel.map((person, idx) => (
                       <Box
                          display="flex"
                          key={idx}
                          sx={{ gap: 2, marginY: 0.75, alignItems: "center" }}
                       >
                          {/* Name Select */}
                          <FormControl fullWidth>
                             <InputLabel
                                id={`stand-by persons select label-${idx}`}
                             >
                                Worker
                             </InputLabel>
                             <Select
                                labelId={`stand-by persons select label-${idx}`}
                                id={`stand-by persons select-${idx}`}
                                label="Worker"
                                sx={{
                                   flex: 1,
                                }}
                                value={person.name}
                                onChange={(e) => assignWorkerName(e, person.id)}
                             >
                                {personnelOpts.map((opt, idx) => {
                                   return (
                                      <MenuItem key={idx} value={opt.name}>
                                         {opt.name}
                                      </MenuItem>
                                   );
                                })}
                             </Select>
                          </FormControl>
                          {/* Job Select */}
                          <FormControl fullWidth>
                             <InputLabel
                                id={`stand-by persons select label-${idx}`}
                             >
                                Assignment
                             </InputLabel>
                             <Select
                                labelId={`stand-by persons select label-${idx}`}
                                id={`stand-by persons select-${idx}`}
                                label="Assignment"
                                sx={{
                                   flex: 1,
                                }}
                                value={person.assignment}
                                onChange={(e) => assignRole(e, person.id)}
                             >
                                <MenuItem value="spotter">Spotter</MenuItem>
                                <MenuItem value="flagger">Flagger</MenuItem>
                                <MenuItem value="traffic control">
                                   Traffic Control
                                </MenuItem>
                             </Select>
                          </FormControl>
                          {/* Remove Icon */}
                          <DeleteOutlineIcon
                             onClick={() => removeWorker(person.id)}
                          />
                       </Box>
                    ))
                  : null}
               {hasStandBy ? (
                  <Button onClick={() => addWorkerFld()}>Add Worker</Button>
               ) : null}
               <Button onClick={() => checkData()}>Check Data</Button>
            </Box>
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
         <Pagination
            color="primary"
            page={5}
            count={8}
            onChange={handlePageChange}
            sx={{
               ".MuiPagination-ul": {
                  justifyContent: "space-between", // Spread items across the full width
               },
               width: "100%", // Make the pagination component take the full width
               marginY: 4, // Top and bottom margin
            }}
         />
      </Container>
   );
}
