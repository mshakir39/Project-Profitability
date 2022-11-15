import React, { useEffect, useState } from "react";
import { getNumber } from "../../util/getNumber";
import AccordionComponent from "../simple/accordion/accordion";
import ReactTable from "../simple/table/table";
import TextInput from "../simple/text-input/text-input";
import Data from "../../../storybook_public/config/profitabilityStubData.json";

// import styles from "./project-profitability.module.css";
/* eslint-disable-next-line */
export interface ProjectProfitabilityProps {}

const style = {
  display: "flex",
};

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
      getNumber(Data[0].month1) +
      getNumber(Data[0].month2) +
      getNumber(Data[0].month3);
    const totalBillable =
      getNumber(Data[2].month1) +
      getNumber(Data[2].month2) +
      getNumber(Data[2].month3);

    const totalProfitMargin = Math.round(
      totalAllocatedBudget - totalBillable / totalAllocatedBudget
    );

    const dummy: any = {
      totalAllocatedBudget: totalAllocatedBudget,
      totalBillable: totalBillable,
      totalProfitMargin: totalProfitMargin + "%",
    };

    setInputData((prev) => ({
      ...prev,
      ...dummy,
    }));
  }, [inputData.profitMarginGoal, inputData.totalProfitMargin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AccordionComponent
      label="Current Profitability"
      dataTestId="accordion-testId"
    >
      <div style={style}>
        <TextInput
          name="totalAllocatedBudget"
          disabled
          startAdornment="$"
          label="Total Allocated Budget"
          dataTestId=""
          sx={{ width: "137px", marginRight: "30px" }}
          value={inputData.totalAllocatedBudget}
        />
        <TextInput
          name="totalBillable"
          startAdornment="$"
          disabled
          label="Total Billable"
          dataTestId=""
          sx={{ width: "137px", marginRight: "30px" }}
          value={inputData.totalBillable}
        />

        <TextInput
          name="totalProfitMargin"
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
            name="profitMarginGoal"
            disabled={enableField}
            label="Profit Margin Goal"
            dataTestId=""
            sx={{ width: "137px", marginRight: "30px" }}
            value={inputData.profitMarginGoal}
            onChange={handleChange}
          />
        </div>
      </div>
      <ReactTable
        headers={["", "Month1", "Month2", "Month3"]}
        inputData={inputData}
        data={Data}
        dataTestId="react-table"
      />
    </AccordionComponent>
  );
};

export default ProjectProfitability;
