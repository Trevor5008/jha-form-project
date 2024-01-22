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
   Typography,
   InputAdornment,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PageSeven() {
   const searchParams = useSearchParams();
   const shiftId = searchParams.get("id");
   const [situations, setSituations] = useState(null);
   const [hazards, setHazards] = useState(null);
   const [hazardControls, setHazardControls] = useState(null);
   const [ppe, setPpe] = useState(null);
   const [dataReady, setDataReady] = useState(false);

   useEffect(() => {
      fetch("../api/get-page7-options/" + shiftId)
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok");
            }
            return res.json();
         })
         .then((res) => {
            const { situations, hazards, hazardControls, ppe } = res;
            setSituations(situations);
            setHazards(hazards);
            setHazardControls(hazardControls);
            setPpe(ppe);
         })
         .then(() => setDataReady(true))
         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   }, [shiftId]);

   return (
      <Container>
         {/* Heading */}
         <Typography variant="h2" marginBottom={1}>
            <span style={{ fontWeight: "bold" }}>D.</span> This portion of this
            JHA is to be completed by the supervisor with input from crew
            members. Once complete this JHA must be reviewed with all affected
            crew members or when conditions change
         </Typography>
         {/* Body */}
         <Container>
            {/* Situations */}
            <Typography variant="h2" marginBottom={1} fontWeight="bold">
               Work Activities based on C.1
            </Typography>
            {dataReady
               ? situations.map((opt, idx) => {
                    return (
                       <Box display="flex" key={opt.name}>
                          <TextField
                             label={opt.name}
                             variant="standard"
                             fullWidth
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
                          />
                       </Box>
                    );
                 })
               : null}
            {/* Hazards */}
            <Typography variant="h2" marginBottom={1} fontWeight="bold">
               Possible Hazards based on C.2
            </Typography>
            {dataReady
               ? hazards.map((opt, idx) => {
                    return (
                       <Box display="flex" key={opt.name}>
                          <TextField
                             label={opt.name}
                             variant="standard"
                             fullWidth
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
                          />
                       </Box>
                    );
                 })
               : null}
            {/* Hazard Controls */}
            <Typography variant="h2" marginBottom={1} fontWeight="bold">
               Controls to Address Hazards based on C.3
            </Typography>
            {dataReady
               ? hazardControls.map((opt, idx) => {
                    return (
                       <Box display="flex" key={opt.name}>
                          <TextField
                             label={opt.name}
                             variant="standard"
                             fullWidth
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
                          />
                       </Box>
                    );
                 })
               : null}
            {/* PPE */}
            <Typography variant="h2" marginBottom={1} fontWeight="bold">
               PPE Controls based on C.4
            </Typography>
            {dataReady
               ? ppe.map((opt, idx) => {
                    return (
                       <Box display="flex" key={opt.name}>
                          <TextField
                             label={opt.name}
                             variant="standard"
                             fullWidth
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
                          />
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
                     pathname: "../page-six",
                     query: { id: shiftId },
                  }}
                  //   onClick={handleNext}
               >
                  Previous
               </Link>
            </Button>
            <Button variant="standard">
               <Link
                  href={{
                     pathname: "../page-seven",
                     query: { id: shiftId },
                  }}
                  //   onClick={handleNext}
               >
                  Next
               </Link>
            </Button>
         </Box>
      </Container>
   );
}
