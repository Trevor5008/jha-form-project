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
   Pagination,
} from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function PageSeven() {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const shiftId = searchParams.get("shiftId");
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

   function updateSituationDtls(idx, dtls) {
      setSituations((prev) => {
         const updatedDetails = [...prev];
         updatedDetails[idx].shiftCategoryOptions[0].details = dtls;
         return updatedDetails;
      });
   }
   function updateHazardDtls(idx, dtls) {
      setHazards((prev) => {
         const updatedDetails = [...prev];
         updatedDetails[idx].shiftCategoryOptions[0].details = dtls;
         return updatedDetails;
      });
   }
   function updateHazardCtrlDtls(idx, dtls) {
      setHazardControls((prev) => {
         const updatedDetails = [...prev];
         updatedDetails[idx].shiftCategoryOptions[0].details = dtls;
         return updatedDetails;
      });
   }
   function updatePpeDtls(idx, dtls) {
      setPpe((prev) => {
         const updatedDetails = [...prev];
         updatedDetails[idx].shiftCategoryOptions[0].details = dtls;
         return updatedDetails;
      });
   }

   function updateCategoryDtls(cat, idx, details) {
      switch (cat) {
         case "situations":
            updateSituationDtls(idx, details);
            break;
         case "hazards":
            updateHazardDtls(idx, details);
            break;
         case "hazard controls":
            updateHazardCtrlDtls(idx, details);
            break;
         case "ppe":
            updatePpeDtls(idx, details);
            break;
         default:
            return null;
      }
   }

   function handleNext() {
      fetch("../api/update-page7-options/" + shiftId, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            situations,
            hazards,
            hazardControls,
            ppe,
         }),
      });
   }

   function handlePageChange(evt, val) {
      let newPathname = pathname.replace(/pg-(\d+)/, `pg-${val}`);
      newPathname = newPathname + `?shiftId=${shiftId}`
      handleNext()
      router.push(newPathname)
   }

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
                             value={opt.shiftCategoryOptions[0].details}
                             onChange={(e) =>
                                updateCategoryDtls(
                                   "situations",
                                   idx,
                                   e.target.value
                                )
                             }
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
                             value={opt.shiftCategoryOptions[0].details}
                             onChange={(e) =>
                                updateCategoryDtls(
                                   "hazards",
                                   idx,
                                   e.target.value
                                )
                             }
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
                             value={opt.shiftCategoryOptions[0].details}
                             onChange={(e) =>
                                updateCategoryDtls(
                                   "hazard controls",
                                   idx,
                                   e.target.value
                                )
                             }
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
                             value={opt.shiftCategoryOptions[0].details}
                             onChange={(e) =>
                                updateCategoryDtls("ppe", idx, e.target.value)
                             }
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
                     pathname: "../pg-6",
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
                     pathname: "../pg-8",
                     query: { shiftId },
                  }}
                  onClick={handleNext}
               >
                  Next
               </Link>
            </Button>
         </Box>
         {/* Home Button */}
         <Box display="flex" justifyContent="space-evenly">
            <Button variant="standard">
               <Link href="/" onClick={handleNext}>
                  Home
               </Link>
            </Button>
         </Box>
         <Pagination
            color="primary"
            page={7}
            count={8}
            onChange={handlePageChange}
         />
      </Container>
   );
}
