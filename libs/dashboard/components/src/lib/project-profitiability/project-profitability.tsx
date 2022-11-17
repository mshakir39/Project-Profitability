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
  const [tableData, setTableData] = useState(Data);
  const [fieldColor, setFieldColor] = useState("black");
  const [inputData, setInputData] = useState({
    totalAllocatedBudget: "",
    totalBillable: "",
    totalProfitMargin: "",
    profitMarginGoal: "",
  });

  useEffect(() => {
    const dummyData: any = [...tableData];

    tableData.forEach((obj, index) => {
      if (index === 3) {
        const sExpM1 =
          getNumber(dummyData[0].month1) - getNumber(dummyData[2].month1);
        const sExpM2 =
          getNumber(dummyData[0].month2) - getNumber(dummyData[2].month2);
        const sExpM3 =
          getNumber(dummyData[0].month3) - getNumber(dummyData[2].month3);
        const divExpM1 = sExpM1 / getNumber(dummyData[0].month1);
        const divExpM2 = sExpM2 / getNumber(dummyData[0].month2);
        const divExpM3 = sExpM3 / getNumber(dummyData[0].month3);

        dummyData[3].month1 = divExpM1 * 100 + "%";
        dummyData[3].month2 = divExpM2 * 100 + "%";
        dummyData[3].month3 = divExpM3 * 100 + "%";
      }
    });

    setTableData(dummyData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      totalProfitMargin: totalProfitMargin,
    };

    setInputData((prev) => ({
      ...prev,
      ...dummy,
    }));
  }, [inputData.profitMarginGoal, inputData.totalProfitMargin, tableData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "profitMarginGoal") {
      const dummyData: any = [...tableData];
      tableData.forEach((obj, index) => {
        if (index === 1) {
          const divExp = Number(value === "" ? 0 : value) / 100;
          const leftExp = 1 - divExp;
          if (value === "") {
            dummyData[1].month1 = "$" + 0;
            dummyData[1].month2 = "$" + 0;
            dummyData[1].month3 = "$" + 0;
          } else {
            dummyData[1].month1 = leftExp * getNumber(dummyData[0].month1);
            dummyData[1].month2 = leftExp * getNumber(dummyData[0].month2);
            dummyData[1].month3 = leftExp * getNumber(dummyData[0].month3);
            dummyData[1].month1 = "$" + dummyData[1].month1;
            dummyData[1].month2 = "$" + dummyData[1].month2;
            dummyData[1].month3 = "$" + dummyData[1].month3;
          }
        }
      });

      setTableData(dummyData);
    }
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
      <div style={style} data-testId="input-wrapper">
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
          endAdornment="%"
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
            endAdornment="%"
            dataTestId=""
            sx={{ width: "137px", marginRight: "30px" }}
            value={inputData.profitMarginGoal}
            onChange={handleChange}
            type="number"
            required
            step="0.01"
            min="0"
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
