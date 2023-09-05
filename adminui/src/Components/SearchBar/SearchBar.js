import React from 'react';
import TextField from "@mui/material/TextField";

export default function SearchBar({handleInputChange,searchInput}) {
    
  return (
    <div>
    <TextField
      id="outlined-basic"
      placeholder="Search by name, email or role"
      variant="outlined"
      value={searchInput}
      onChange={handleInputChange}
      fullWidth
      size="small"
    />
  </div>
  )
}
