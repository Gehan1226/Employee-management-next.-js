import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

type FormStepperProps = {
  steps: string[];
  activeStep: number;
  completed: { [key: number]: boolean };
};

export default function FormStepper({
  steps,
  activeStep,
  completed,
}: Readonly<FormStepperProps>) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit">{label}</StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
