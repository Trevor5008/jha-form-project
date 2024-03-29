"use client"
import { Typography, Box } from "@mui/material"

export default function Header() {
   return (
      <Box
         display="flex"
         border={2}
         paddingY={.5}
         alignItems='center'
         textAlign='center'
         margin={.5}
         sx={{
            flexDirection: {
                xs: 'column',
                sm: 'row'
            },
            alignItems: {
                xs: 'center'
            },
            justifyContent: {
                xs: 'center',
                sm: 'space-between'
            }
         }}
      >
         <Typography
            variant="h4"
            textTransform="uppercase"
            fontWeight="bolder"
            sx={{
                marginLeft: {
                    sm: 1
                },
                marginBottom: {
                    xs: .5,
                    sm: 0
                }
            }}
         >
            Exhibit M
         </Typography>
         <Typography
            variant="h4"
            textTransform="uppercase"
            fontWeight="bolder"
            sx={{
                marginRight: {
                    sm: 4
                }
            }}
         >
            Job Hazard Analysis Form (Mandatory)
         </Typography>
      </Box>
   )
}
