"use client"
import {
   Container,
   Typography,
   TextField,
   FormControl,
   FormControlLabel,
   FormLabel,
   RadioGroup,
   Radio,
   Box,
   Button,
   FormHelperText
} from "@mui/material"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { permitOptions } from "@/lib/options"
import CheckIcon from "@mui/icons-material/Check"
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined"


export default function PageTwo() {
   const searchParams = useSearchParams()
   // console.log(searchParams.get('id')) - gets shift id value
   return (
      <Container>
         <Typography
            variant="h3"
            marginBottom={1}
         >
            <span className="font-bold">A.</span>{" "}
            Are Permits Required? Are they
            displayed and properly signed by the
            PSC/PSA?
         </Typography>
         <Box
         >
            <Box
            >
               {permitOptions
                  .map((opt, idx) => {
                     return (
                        <Box>
                        <FormControl
                           className="mb-2 flex flex-nowrap items-center justify-between"
                           fullWidth
                           sx={{ flexDirection: "row" }}
                        >
                              <FormLabel
                                 id={`${opt} radio group`}
                                 className="text-black"
                                 sx={{
                                    fontSize: {
                                       xs: 14,
                                       sm: 16
                                    },
                                    width: "50%"
                                 }}
                              >
                                 {opt}
                              </FormLabel>
                           <RadioGroup
                              aria-labelledby={`${opt} radio group`}
                              name={`${opt}`}
                              // onChange={handleChange}
                              // section={section}
                              // value={
                              //    data && data.includes(opt)
                              //       ? true
                              //       : false
                              // }
                              sx={{
                                 display: "inline-block",
                                 marginLeft: 1
                              }}
                           >
                              <FormControlLabel
                                 value={true}
                                 control={
                                    <Radio
                                       checkedIcon={
                                          <CheckIcon />
                                       }
                                       icon={
                                          <CheckBoxOutlineBlankOutlinedIcon />
                                       }
                                    />
                                 }
                                 label="Yes"
                                 sx={{
                                    marginRight: {
                                       xs: 2
                                    },
                                    "& .MuiTypography-root": {
                                       fontSize: {
                                          xs: 14,
                                          sm: 16
                                       }
                                    },
                                    "& .MuiSvgIcon-root": {
                                       width: {
                                          xs: 20,
                                          sm: 24
                                       }
                                    }
                                 }}
                              />
                              <FormControlLabel
                                 value={false}
                                 control={
                                    <Radio
                                       checkedIcon={
                                          <CheckIcon />
                                       }
                                       icon={
                                          <CheckBoxOutlineBlankOutlinedIcon />
                                       }
                                    />
                                 }
                                 label="No"
                                 sx={{
                                    marginRight: {
                                       xs: 0,
                                       sm: 1
                                    },
                                    "& .MuiTypography-root": {
                                       fontSize: {
                                          xs: 14,
                                          sm: 16
                                       }
                                    },
                                    "& .MuiButtonBase-root": {
                                       width: {
                                          xs: 34,
                                          sm: 40
                                       }
                                    },
                                    "& .MuiSvgIcon-root": {
                                       width: {
                                          xs: 20,
                                          sm: 24
                                       }
                                    }
                                 }}
                              />
                           </RadioGroup>
                        </FormControl>
                     </Box>
                     )
                  })}
            </Box>
               <TextField
                  label="Other"
                  variant="standard"
                  fullWidth
                  sx={{
                     "& .MuiFormLabel-root": {
                        color: "black",
                        fontSize: {
                           xs: 14,
                           sm: 16
                        }
                     },
                     paddingRight: 1
                  }}
                  helperText="
                  * specify above"
               />
         </Box>
         {/* Navigation Buttons */}
         <Box
            display="flex"
            justifyContent="space-evenly"
         >
            <Button variant="standard">
               <Link href="/">Previous</Link>
            </Button>
            <Button variant="standard">
               <Link href="/page-three">Next</Link>
            </Button>
         </Box>
      </Container>
   )
}