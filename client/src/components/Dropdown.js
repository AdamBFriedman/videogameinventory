// import React, { useEffect } from 'react';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

// export const Dropdown = (value, setFilter) => {
//   useEffect(() => {
//     console.log(value);
//   }, [value]);
//   return (
//     <FormControl style={{ width: '200px' }}>
//       <InputLabel id="platform">Platform</InputLabel>
//       <Select
//         labelId="filter"
//         id="filter"
//         value={value}
//         label="Filter by Platform"
//         onChange={() => setFilter(value)}
//       >
//         <MenuItem value={'All Platforms'}>All Platforms</MenuItem>
//         <MenuItem value={'Nintendo 64'}>Nintendo 64</MenuItem>
//         <MenuItem value={'Super Nintendo'}>Super Nintendo</MenuItem>
//         <MenuItem value={'Nintendo'}>Nintendo</MenuItem>
//       </Select>
//     </FormControl>
//   );
// };
