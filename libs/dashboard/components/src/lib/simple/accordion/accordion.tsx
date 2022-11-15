import React, { PropsWithChildren } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./accordion.css";

export interface IAccordion extends PropsWithChildren {
  label: string;
  dataTestId: string;
}

export const AccordionComponent: React.FC<IAccordion> = (props) => {
  const { label, children, dataTestId } = props;

  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<MdKeyboardArrowDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          data-testid={dataTestId}
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
