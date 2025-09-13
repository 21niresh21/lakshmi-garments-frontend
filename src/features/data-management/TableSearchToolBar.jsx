import {
  Box,
  Divider,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function TableSearchToolBar({
  header,
  placeholder,
  searchQuery,
  handleSearchChange,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        alignItems: "center",
      }}
    >
      <Typography component="div" variant="h6" sx={{ fontWeight: 600 }}>
        {header}
      </Typography>
      <Stack gap={1} direction={"row"}>
        <TextField
          size="small"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={placeholder}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                padding: 2,
                paddingLeft: 10,
              },
            },
          }}
          inputProps={{
            style: {
              padding: 5,
            },
          }}
        />
      </Stack>
    </Box>
  );
}

export default TableSearchToolBar;
