import React, { useEffect, useState } from "react";
import ProductionForm from "../features/production/ProductionForm";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { fetchCategories } from "../api/categoryApi";
import { fetchCategoryCount } from "../api/inventoryApi";
import { fetchSubCategories } from "../api/subCategoryApi";

function Production() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data.content);
    });

    fetchCategoryCount().then((res) => {
      setCategoryCount(res.data);
    });

    fetchSubCategories().then((res) => {
      setSubCategories(res.data.content);
    });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 3 }}>
      <Typography variant="h5" component="h1">
        Move to Production
      </Typography>
      <Box sx={{ display: "flex", columnGap: 3 }}>
        {categoryCount &&
          categoryCount.map((item) => (
            <Card sx={{ flex: 1 }}>
              <CardContent sx={{ height: "100%" }}>
                <Typography variant="h5" component="div">
                  {item.category.name}
                </Typography>
                {item.subCategoryCountDTOs.map((subCategory) => (
                  <Typography variant="body1" color="text.secondary">
                    <Chip
                      label={subCategory.subCategoryName + "  " + subCategory.count}
                      size="small" sx={{mt : 1, mr : 1}}/>
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
      </Box>
      <ProductionForm categories={categories} subCategories={subCategories} />
    </Box>
  );
}

export default Production;
