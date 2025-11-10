import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";

function InventoryCountCard({ categoryCount }) {
  return (
    <Box sx={{ display: "flex", columnGap: 3 }}>
      {categoryCount &&
        categoryCount.map((item) => (
          <Card sx={{ flex: 1 }} key={item.categoryName}>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h5" component="div">
                {item.categoryName}
              </Typography>
              {item.subCategories.map((subCategory) => (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  key={subCategory.subCategoryName}
                >
                  <Chip
                    label={`${subCategory.subCategoryName}  ${subCategory.count}`}
                    size="small"
                    sx={{ mt: 1, mr: 1 }}
                  />
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))}
    </Box>
  );
}

export default InventoryCountCard;
