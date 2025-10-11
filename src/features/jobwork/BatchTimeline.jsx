import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"; // <-- for empty state icon

function CustomStepIcon() {
  return <FiberManualRecordIcon color="primary" fontSize="small" />;
}

export default function BatchTimeline({ steps }) {
  const isEmpty = !steps || steps.length === 0;

  return (
    <Box sx={{ maxWidth: 400, minHeight: 200 }}>
      {isEmpty ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            textAlign: "center",
            p: 2,
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="body1" fontWeight="medium">
            This batch is yet to be assigned.
          </Typography>
        </Box>
      ) : (
        <Stepper
          activeStep={steps.length}
          orientation="vertical"
          sx={{
            "& .MuiStepLabel-label": {
              color: "primary.main",
              fontWeight: "bold",
            },
            "& .MuiStep-root": {
              cursor: "default",
            },
            "& .MuiStepLabel-iconContainer": {
              color: "primary.main",
            },
          }}
        >
          {steps.map((step, index) => (
            <Step
              key={step.label || index}
              active
              completed
            >
              <StepLabel StepIconComponent={CustomStepIcon}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", lineHeight: 1 }}
                  >
                    {step.jobworkType}
                  </Typography>
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      bgcolor: "primary.main",
                      borderRadius: "50%",
                      mx: 0.5,
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1 }}
                  >
                    {step.dateTime}
                  </Typography>
                </Box>
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      )}
    </Box>
  );
}
