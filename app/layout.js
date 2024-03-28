"use client"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@emotion/react"
import { theme } from "@/styles/themes"
import CssBaseline from "@mui/material/CssBaseline"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
            <title>JHA</title>
         </head>
            <ThemeProvider theme={theme}>
               <CssBaseline />
               <body className={inter.className}>
                  {children}
               </body>
            </ThemeProvider>
      </html>
   )
}
