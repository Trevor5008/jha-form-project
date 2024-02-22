import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

export default function DateTimeInput({ handleShiftChange }) {

   return (
      <LocalizationProvider
         dateAdapter={AdapterDayjs}
      >
         <DateTimePicker
            label="Shift Date and Time"
            slotProps={{
               textField: {
                  required: true
               }
            }}
            disablePast={true}
            onChange={(newVal) => handleShiftChange(newVal)}
            sx={{
               "& label": {
                  fontSize: "15px"
               },
               "& span": {
                  fontSize: "12px"
               }
            }}
         />
      </LocalizationProvider>
   )
}