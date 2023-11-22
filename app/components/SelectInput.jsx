import {
    InputLabel,
    Select,
    MenuItem
 } from "@mui/material"
 
 export default function SelectInput({
    name,
    data,
    handleChange
 }) {
    return (
       <>
          <InputLabel id="demo-simple-select-label">
             {name}
          </InputLabel>
          <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             defaultValue=""
             label={name}
              onChange={handleChange}
          >
             {data.map((opt, idx) => {
                return (
                   <MenuItem
                      key={`${opt}-${idx}`}
                      value={opt}
                   >
                      {opt}
                   </MenuItem>
                )
             })}
          </Select>
       </>
    )
 }
 