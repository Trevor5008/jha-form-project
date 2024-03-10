"use client";
import { useState, useEffect, useRef } from "react";
import {
   Box,
   Button,
   Container,
   FormControl,
   FormControlLabel,
   FormLabel,
   TextField,
   Typography,
   Modal,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PageEight() {
   const searchParams = useSearchParams();
   const sigCanvas = useRef();
   const shiftId = searchParams.get("shiftId");
   const [openSignPad, setOpenSignPad] = useState(false);
   const [dataReady, setDataReady] = useState(false);

   const signPadStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50vw',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

   return (
      <Container>
         {/* Form Confirmation */}
         <Container>
            {/* Heading */}
            <Typography
               variant="h3"
               marginBottom={1}
            >
               <span
                  style={{ fontWeight: "bold" }}
               >
                  G.
               </span>{" "}
               JHA Developed and Communicated by;
            </Typography>
            {/* Body */}
         </Container>
         {/* Signature Modal w/ Button */}
         <Button onClick={() => setOpenSignPad(true)}>Sign</Button>
         <Modal open={openSignPad} onClose={() => setOpenSignPad(false)}>
            <Box sx={signPadStyle}>
               <SignatureCanvas
                  canvasProps={{
                     width: 500,
                     height: 200,
                     className: "sigCanvas",
                  }}
                  ref={sigCanvas}
               />
               <Button onClick={() => sigCanvas.current.clear()}>Clear</Button>
            </Box>
         </Modal>
      </Container>
   );
}
