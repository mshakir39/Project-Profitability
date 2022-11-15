import React, { useEffect, useState } from "react";
import { getNumber } from "../../util/getNumber";
import AccordionComponent from "../simple/accordion/accordion";
import ReactTable from "../simple/table/table";
import TextInput from "../simple/text-input/text-input";
import TextField, { textFieldClasses } from "@mui/material/TextField";

// import styles from "./project-profitability.module.css";
/* eslint-disable-next-line */
export interface ProjectProfitabilityProps {}

const style = {
  display: "flex",
};
const tableData = [
  {
    " Allocated Budget": "Allocated Budget",
    month1: "80%",
    month2: "111%",
    month3: "100%",
  },
  {
    "Budget Profitablility Goal": "Budget Profitablility Goal",
    month1: "68%",
    month2: "94.44%",
    month3: "85%",
  },
  {
    "Billable Spent": "Billable Spent",
    month1: "120%",
    month2: "222.22%",
    month3: "50%",
  },
  {
    "Profitability %": "Profitability %",
    month1: "-50%",
    month2: "-100%",
    month3: "50%",
  },
];
export const ProjectProfitability: React.FC<ProjectProfitabilityProps> = () => {
  const [enableField, setEnableField] = useState(true);
  const [fieldColor, setFieldColor] = useState("black");
  const [inputData, setInputData] = useState({
    totalAllocatedBudget: "",
    totalBillable: "",
    totalProfitMargin: "",
    profitMarginGoal: "",
  });
  useEffect(() => {
    if (
      getNumber(inputData.totalProfitMargin) < 0 ||
      getNumber(inputData.totalProfitMargin) === 0
    ) {
      setFieldColor("red");
    } else if (
      getNumber(inputData.totalProfitMargin) > 0 ||
      getNumber(inputData.totalProfitMargin) <
        getNumber(inputData.profitMarginGoal)
    ) {
      setFieldColor("#c5d7c3");
    } else if (
      getNumber(inputData.totalProfitMargin) >
        getNumber(inputData.profitMarginGoal) ||
      getNumber(inputData.totalProfitMargin) ===
        getNumber(inputData.profitMarginGoal)
    ) {
      setFieldColor("#f6e7b9");
    }

    const totalAllocatedBudget =
      getNumber(tableData[0].month1) +
      getNumber(tableData[0].month2) +
      getNumber(tableData[0].month3);
    const totalBillable =
      getNumber(tableData[2].month1) +
      getNumber(tableData[2].month2) +
      getNumber(tableData[2].month3);

    const totalProfitMargin = Math.round(
      totalAllocatedBudget - totalBillable / totalAllocatedBudget
    );

    const dummy: any = {
      totalAllocatedBudget: totalAllocatedBudget,
      totalBillable: totalBillable,
      totalProfitMargin: totalProfitMargin + "%",
    };

    setInputData({ ...dummy });
  }, [inputData.profitMarginGoal, inputData.totalProfitMargin]);

  return (
    <AccordionComponent
      label="Current Profitability"
      dataTestId="accordion-testId"
    >
      <div style={style}>
        <TextInput
          disabled
          startAdornment="$"
          label="Total Allocated Budget"
          dataTestId=""
          sx={{ width: "137px", marginRight: "30px" }}
          value={inputData.totalAllocatedBudget}
        />
        <TextInput
          startAdornment="$"
          disabled
          label="Total Billable"
          dataTestId=""
          sx={{ width: "137px", marginRight: "30px" }}
          value={inputData.totalBillable}
        />

        <TextInput
          disabled
          label="Total Profit Margin"
          dataTestId=""
          labelStyle={{ color: `${fieldColor}` }}
          inputStyle={{ color: `${fieldColor}` }}
          sx={{
            width: "137px",
            marginRight: "30px",
          }}
          value={inputData.totalProfitMargin}
        />
        <div onDoubleClick={() => setEnableField(false)}>
          <TextInput
            disabled={enableField}
            label="Profit Margin Goal"
            dataTestId=""
            sx={{ width: "137px", marginRight: "30px" }}
            value={inputData.profitMarginGoal}
          />
        </div>
      </div>
      <ReactTable
        headers={["", "Month1", "Month2", "Month3"]}
        inputData={inputData}
        data={tableData}
        dataTestId="react-table"
      />
    </AccordionComponent>
  );
};

export default ProjectProfitability;
