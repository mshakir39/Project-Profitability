import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getNumber } from "../../../util/getNumber";

export interface IReactTable {
  headers: Array<string>;
  data: Array<object>;
  dataTestId?: string;
  inputData?: Record<string, string>;
}
export const ReactTable: React.FC<IReactTable> = (props) => {
  // Separating props for a mix of usages, with defaults for sx.
  const { headers, data, dataTestId, inputData } = props;

  return (
    <TableContainer
      style={{ boxShadow: "none" }}
      component={Paper}
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
      data-testid={dataTestId}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table" data-cy="table">
        <TableHead style={{ background: "#f7ece2" }}>
          <TableRow data-cy="table-header-row">
            {headers.map((headerTitle: string, index: number) => (
              <TableCell data-testid="table-header-cell" key={index}>
                {headerTitle}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((obj: any, indexRow: number) => (
            <TableRow
              key={indexRow}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              data-testid="table-body-row"
            >
              {Object.entries(obj).map(([key]) => {
                let Color = "";

                const value = getNumber(obj[key]);
                if (indexRow === 3 && /\d/.test(obj[key])) {
                  if (value < 0 || value === 0) {
                    Color = "#eac3c2";
                  } else if (
                    value >
                      Number(
                        inputData && getNumber(inputData["profitMarginGoal"])
                      ) ||
                    value ===
                      Number(
                        inputData && getNumber(inputData["profitMarginGoal"])
                      )
                  ) {
                    Color = "#c5d7c3";
                  } else if (
                    value <
                      Number(
                        inputData && getNumber(inputData["profitMarginGoal"])
                      ) ||
                    value > 0
                  ) {
                    Color = "#f6e7b9";
                  }
                }
                let celVal;
                if (String(obj[key]).includes("$") && /\d/.test(obj[key])) {
                  celVal = obj[key].split("$")[1];
                  celVal = Number(celVal).toFixed(2);
                  celVal = "$" + celVal;
                } else if (
                  String(obj[key]).includes("%") &&
                  /\d/.test(obj[key])
                ) {
                  celVal = obj[key].split("%")[0];
                  celVal = Number(celVal).toFixed(2);
                  celVal = celVal + "%";
                } else {
                  celVal = obj[key];
                }

                return (
                  <TableCell
                    align="left"
                    sx={{ background: `${Color}` }}
                    key={key}
                  >
                    {celVal}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReactTable;
