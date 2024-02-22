import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

export default function SelectInput({ name, data, handleChange }) {
   return (
      <FormControl sx={{ marginBottom: 2 }}>
         <InputLabel id="demo-simple-select-label" sx={{
                  fontSize: "15px",
               "& ~ .MuiInputBase-root span": {
                  fontSize: "12px"
               }
            }}>
            {name}
         </InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            label={name}
            onChange={handleChange}
         >
            {data?.map((opt, idx) => {
               return (
                  <MenuItem key={`${opt}-${idx}`} value={opt}>
                     {opt}
                  </MenuItem>
               );
            })}
         </Select>
      </FormControl>
   );
}
