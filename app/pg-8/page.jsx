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
   Pagination,
   Modal,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function PageEight() {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const sigCanvas = useRef();
   const shiftId = searchParams.get("shiftId");
   const [currPage, setCurrPage] = useState(8);
   const [openSignPad, setOpenSignPad] = useState(false);
   const [signImg, setSignImg] = useState(null);
   const [dataReady, setDataReady] = useState(false);

   const signPadStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40vw",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
   };

   /* Navigation Methods */
   
   // Handle pagination (don't remove 'evt' parameter, it's required by MUI Pagination component)
   function handlePageChange(evt, val) {
      let newPathname = pathname.replace(/pg-(\d+)/, `pg-${val}`);
      newPathname = newPathname + `?shiftId=${shiftId}`;
      // handleNext();
      router.push(newPathname);
   }

   function createSignature() {
      const url = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      setSignImg(url);
      setOpenSignPad(false);
   }

   function removeSignature() {
      setSignImg(null);
   }

   return (
      <Container>
         {/* Form Confirmation */}
         <Container>
            {/* Heading */}
            <Typography variant="h3" marginBottom={1}>
               <span style={{ fontWeight: "bold" }}>G.</span> JHA Developed and
               Communicated by;
            </Typography>
            {/* Body */}
         </Container>
         {/* Signature Modal w/ Button */}
         {!signImg && (
            <Button onClick={() => setOpenSignPad(true)}>Sign</Button>
         )}
         <Modal open={openSignPad} onClose={() => setOpenSignPad(false)}>
            <Box sx={signPadStyle}>
               <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                     width: 500,
                     height: 200,
                     className: "sigCanvas",
                     border: 1,
                  }}
                  ref={sigCanvas}
               />
               <Box>
                  <Button onClick={() => sigCanvas.current.clear()}>
                     Clear
                  </Button>
                  <Button onClick={createSignature}>Sign</Button>
               </Box>
            </Box>
         </Modal>
         {signImg && (
            <Box border={1}>
               <Image src={signImg} width={200} height={50} alt="signature" />
               <Button onClick={removeSignature}>Remove</Button>
            </Box>
         )}
         <Pagination
            count={8}
            page={8}
            color="primary"
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
