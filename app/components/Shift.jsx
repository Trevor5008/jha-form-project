"use client";
import { useEffect, useState } from "react";
import {
   Typography,
   Container,
   Button,
   Box,
   FormControl,
   TextField,
} from "@mui/material";
import SelectInput from "./SelectInput";
import DateTimeInput from "./DateTimeInput";
import { foremenData } from "@/lib/options";
import Link from "next/link";

export default function Shift({ taskId, handleShiftAdd }) {
   const [foremen, setForemen] = useState([]);
   const [foremanName, setForemanName] = useState("");
   const [shiftDateTime, setShiftDateTime] = useState(null);
   const [shiftId, setShiftId] = useState(null);
   const [dataReady, setDataReady] = useState(true);

   useEffect(() => {
      loadForemen();
      if (foremen) setDataReady(true);
   }, [foremen, taskId, shiftId]);

   async function loadForemen() {
      setForemen(foremenData);
      // fetch("../../api/load-supervisors")
      //    .then((res) => res.json())
      //    .then((res) => setSupervisors(res.supervisors))
      //    .then(() => setDataReady(true))
   }

   function handleForemanChange(evt) {
      setForemanName(evt.target.value);
   }
   function handleShiftChange(val) {
      setShiftDateTime(val.$d);
   }

   return dataReady ? (
      <section>
         {/* 1st Row | Foreman */}
         <Container
            className="p-0"
            sx={{
               display: "flex",
               flexDirection: {
                  xs: "column",
                  sm: "row",
               },
               marginTop: 2
            }}
         >
            {/* Personnel Select */}
            <FormControl
               sx={{
                  marginLeft: {
                     sm: ".5rem",
                  },
                  width: {
                     xs: "100%",
                     sm: "50%",
                  }
               }}
               required
            >
               <SelectInput
                  name="Foreman"
                  // data={foremen}
                  handleChange={handleForemanChange}
               />
            </FormControl>
         </Container>
         {/* 2nd Row | Shift Date/Time */}
         <Container
            sx={{
               display: "flex",
               flexDirection: {
                  xs: "column",
                  sm: "row",
               },
            }}
         >
            {/* DateTime Input */}
            <FormControl
               sx={{
                  marginLeft: {
                     sm: ".5rem",
                  },
                  width: {
                     xs: "100%",
                     sm: "50%",
                  },
                  marginBottom: {
                     xs: ".75rem",
                  },
               }}
               required
            >
               <DateTimeInput required handleShiftChange={handleShiftChange} />
            </FormControl>
         </Container>
         {/* Save Button */}
         <Box display="flex" justifyContent="center">
            <Button
               variant="standard"
               onClick={() => handleShiftAdd(foremanName, shiftDateTime)}
               disabled={!foremanName || !shiftDateTime}
            >
               Save
            </Button>
         </Box>
      </section>
   ) : null;
}
