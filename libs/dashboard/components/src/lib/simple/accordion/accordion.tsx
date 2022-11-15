import React, { PropsWithChildren } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./accordion.css";

/* eslint-disable-next-line */
export interface IAccordion extends PropsWithChildren {
  label: string;

  dataTestId: string;
}

export const AccordionComponent: React.FC<IAccordion> = (props) => {
  // Separating props for a mix of usages, with defaults for sx.
  const { label, children, dataTestId } = props;

  return (
    <div>
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          data-testid={dataTestId}
          // style={{ backgroundColor: "#ebd2b7" }}
          className="accordionStyle"
        >
          <Typography>{label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography data-testid="accordion-children">{children}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;
