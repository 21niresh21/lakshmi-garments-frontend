import { TableCell, styled } from "@mui/material";

// Styled header cell with right border except for last cell
export const HeaderCell = styled(TableCell)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.primary.contrastText}`,
  "&:last-child": {
    borderRight: "none",
  },
}));
