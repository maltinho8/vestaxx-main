import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

export const MuiAccordion = props => {
  const [expanded, setExpanded] = useState('panel4');
  const handleChange = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: 'transparent',
          border: '1px solid darkorange',
          boxShadow: 'none',
          borderRadius: 2,

          marginBottom: '5px',
        }}
        expanded={expanded === 'panel1'}
        onChange={(event, isExpanded) => handleChange(isExpanded, 'panel1')}
      >
        <AccordionSummary
          sx={{ fontWeight: 'bold', color: 'darkorange' }}
          id="panel1-header"
          aria-controls="panel1-content"
          expandIcon={<ExpandMoreIcon />}
        >
          {props.title1}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            color: 'darkorange',
            fontSize: '0.8rem',
          }}
        >
          {props.details1}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: 'transparent',
          border: '1px solid darkorange',
          boxShadow: 'none',
          borderRadius: 2,

          marginBottom: '5px',
        }}
        expanded={expanded === 'panel2'}
        onChange={(event, isExpanded) => handleChange(isExpanded, 'panel2')}
      >
        <AccordionSummary
          sx={{ fontWeight: 'bold', color: 'darkorange' }}
          id="panel2-header"
          aria-controls="panel2-content"
          expandIcon={<ExpandMoreIcon />}
        >
          {props.title2}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            color: 'darkorange',
            fontSize: '0.8rem',
          }}
        >
          {props.details2}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: 'transparent',
          border: '1px solid darkorange',
          boxShadow: 'none',
          borderRadius: 2,

          marginBottom: '5px',
        }}
        expanded={expanded === 'panel3'}
        onChange={(event, isExpanded) => handleChange(isExpanded, 'panel3')}
      >
        <AccordionSummary
          sx={{ fontWeight: 'bold', color: 'darkorange' }}
          id="panel3-header"
          aria-controls="panel3-content"
          expandIcon={<ExpandMoreIcon />}
        >
          {props.title3}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            color: 'darkorange',
            fontSize: '0.8rem',
          }}
        >
          {props.details3}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: 'transparent',
          border: '1px solid darkorange',
          boxShadow: 'none',
          borderRadius: 2,

          marginBottom: '5px',
        }}
        expanded={expanded === 'panel4'}
        onChange={(event, isExpanded) => handleChange(isExpanded, 'panel4')}
      >
        <AccordionSummary
          sx={{ fontWeight: 'bold', color: 'darkorange' }}
          id="panel4-header"
          aria-controls="panel4-content"
          expandIcon={<ExpandMoreIcon />}
        >
          {props.title4}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            color: 'darkorange',
            fontSize: '0.8rem',
          }}
        >
          {props.details4}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: 'transparent',
          border: '1px solid darkorange',
          boxShadow: 'none',
          borderRadius: 2,

          marginBottom: '5px',
        }}
        expanded={expanded === 'panel5'}
        onChange={(event, isExpanded) => handleChange(isExpanded, 'panel5')}
      >
        <AccordionSummary
          sx={{ fontWeight: 'bold', color: 'darkorange' }}
          id="panel5-header"
          aria-controls="panel5-content"
          expandIcon={<ExpandMoreIcon />}
        >
          {props.title5}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            color: 'darkorange',
            fontSize: '0.8rem',
          }}
        >
          {props.details5}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
