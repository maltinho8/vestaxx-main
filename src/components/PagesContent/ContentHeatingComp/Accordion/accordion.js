import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from "react";

export const MuiAccordion = (props) => {
  const [expanded, setExpanded] = useState("panel4");
  const handleChange = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  }
  return <div>
    <Accordion
      sx={{backgroundColor: "#D9D9D9", boxShadow: "none", borderRadius: 1}}
      expanded={expanded==="panel1"}
      onChange={(event, isExpanded) => handleChange(isExpanded, "panel1")}
    >
      <AccordionSummary
        sx={{fontWeight: "bold"}}
        id="panel1-header" aria-controls="panel1-content" expandIcon={<ExpandMoreIcon/>}>
        {props.title1}
      </AccordionSummary>
      <AccordionDetails
        sx={{textAlign: "justify", textJustify: "inter-word"}}
      >{props.details1}</AccordionDetails>
    </Accordion>
    <Accordion
      sx={{backgroundColor: "#D9D9D9", boxShadow: "none", borderRadius: 1}}
      expanded={expanded==="panel2"}
      onChange={(event, isExpanded) => handleChange(isExpanded, "panel2")}
    >
      <AccordionSummary
        sx={{fontWeight: "bold"}}
        id="panel2-header" aria-controls="panel2-content" expandIcon={<ExpandMoreIcon/>}>
        {props.title2}
      </AccordionSummary>
      <AccordionDetails
        sx={{textAlign: "justify", textJustify: "inter-word"}}
      >{props.details2}</AccordionDetails>
    </Accordion>
    <Accordion
      sx={{backgroundColor: "#D9D9D9", boxShadow: "none", borderRadius: 1}}
      expanded={expanded==="panel3"}
      onChange={(event, isExpanded) => handleChange(isExpanded, "panel3")}
    >
      <AccordionSummary
        sx={{fontWeight: "bold"}}
        id="panel3-header" aria-controls="panel3-content" expandIcon={<ExpandMoreIcon/>}>
        {props.title3}
      </AccordionSummary>
      <AccordionDetails
        sx={{textAlign: "justify", textJustify: "inter-word"}}
      >{props.details3}</AccordionDetails>
    </Accordion>
    <Accordion
      sx={{backgroundColor: "#D9D9D9", boxShadow: "none", borderRadius: 1}}
      expanded={expanded==="panel4"}
      onChange={(event, isExpanded) => handleChange(isExpanded, "panel4")}
    >
      <AccordionSummary
        sx={{fontWeight: "bold"}}
        id="panel4-header" aria-controls="panel4-content" expandIcon={<ExpandMoreIcon/>}>
        {props.title4}
      </AccordionSummary>
      <AccordionDetails
        sx={{textAlign: "justify", textJustify: "inter-word"}}
      >{props.details4}</AccordionDetails>
    </Accordion>
    <Accordion
      sx={{backgroundColor: "#D9D9D9", boxShadow: "none", borderRadius: 1}}
      expanded={expanded==="panel5"}
      onChange={(event, isExpanded) => handleChange(isExpanded, "panel5")}
    >
      <AccordionSummary
        sx={{fontWeight: "bold"}}
        id="panel5-header" aria-controls="panel5-content" expandIcon={<ExpandMoreIcon/>}>
        {props.title5}
      </AccordionSummary>
      <AccordionDetails
        sx={{textAlign: "justify", textJustify: "inter-word"}}
      >{props.details5}</AccordionDetails>
    </Accordion>
  </div>
}