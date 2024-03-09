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
import { formatShiftDate } from "@/lib/utils";
import Link from "next/link";

export default function Shift({ taskId, handleShiftAdd }) {
   const [foremen, setForemen] = useState([]);
   const [foremanName, setForemanName] = useState("");
   const [startDateTime, setStartDateTime] = useState(null);
   const [dataReady, setDataReady] = useState(true);
   const [isSubmitted, setIsSubmitted] = useState(false);

   useEffect(() => {
      loadForemen();
      if (foremen) setDataReady(true);
   }, [foremen, taskId]);

   // TODO: Load foreman from db instead of json
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
      setStartDateTime(val.$d);
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
               marginTop: 2,
            }}
         >
            {/* Foreman Select */}
            <FormControl
               sx={{
                  marginLeft: {
                     sm: ".5rem",
                  },
                  width: {
                     xs: "100%",
                     sm: "50%",
                  },
               }}
               required
            >
               <SelectInput
                  name="Foreman"
                  data={foremenData}
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
               onClick={() => {
                  setIsSubmitted(true);
                  handleShiftAdd(foremanName, startDateTime);
               }}
               disabled={!foremanName || !startDateTime}
            >
               Save
            </Button>
         </Box>
      </section>
   ) : null;
}
