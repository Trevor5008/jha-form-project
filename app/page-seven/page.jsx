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
            res.json();
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
         <h1>Page Seven</h1>
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
