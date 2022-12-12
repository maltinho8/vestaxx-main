import styled from 'styled-components';

export const Snip1214 = styled.div`
  color: #000000;
  text-align: center;
  font-size: 16px;
  width: 100%;
  max-width: 1000px;
  margin: 30px 10px;
  position: center;
  border-radius: 10px;

  @media only screen and (min-width: 768px) {
    width: 100%;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    padding: 20px 10px 20px;
    padding: 10px 10px 10px;
    margin-top: 0;
  }
`;

export const ChoiceDiv = styled.div`
  color: #000000;
  text-align: center;
  font-size: 16px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 10px;
`;

export const Snip1214Tabelle = styled.div`
  color: #000000;
  text-align: center;
  font-size: 14px;
  width: 100%;
  max-width: 1000px;
  position: center;
  border-radius: 10px;
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    width: 100%;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    padding: 20px 10px 20px;
    padding: 10px 10px 10px;
    margin-top: 0;
  }
`;

export const Plan = styled.div`
  margin: 0;
  width: 180px;
  position: relative;
  display: inline-block;
  background-color: transparent;
  &.featured {
    margin-top: -10px;
    z-index: 1;
  }

  &.checkbox {
    > * {
      border: transparent !important;
    }
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    padding: 20px 10px 20px;
    padding: 10px 10px 10px;
    margin-top: 0;
  }
`;

export const PlanTabelle = styled.div`
  margin: 0;
  width: 180px;
  position: relative;
  display: inline-block;
  background-color: transparent;
  border-radius: 10px;
  &.featured {
    margin-top: -10px;
    z-index: 1;
  }

  &.checkbox {
    > * {
      border: darkorange !important;
    }
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    padding: 20px 10px 20px;
    padding: 10px 10px 10px;
    margin-top: 0;
  }
`;

export const PlanTitle = styled.div`
  height: 40px;
  padding: 0px 20px 20px;
  font-size: 0.8rem;
  border-radius: 10px;
  color: black;
  &.featured {
    padding: 10px 10px 20px;
    background-color: var(--lightyellow);
  }
`;

export const PlanTitleTabelle = styled.div`
  height: 50px;

  &.featured {
    border: 1px solid darkorange;
    border-radius: 10px;
  }
`;

export const PlanFeatures = styled.ul`
  padding: 0;
  margin: 0;
  text-align: center;
  list-style: outside none none;
  font-size: 0.8em;
  border: 1px solid transparent;
  border-radius: 10px;

  &.featured {
    background-color: var(--lightyellow);
  }
`;

export const PlanFeaturesTabelle = styled.ul`
  padding: 0;
  margin: 0;
  text-align: center;
  list-style: outside none none;
  font-size: 0.8em;
  border-radius: 10px;
  &.featured {
    border: 1px solid darkorange;
  }
`;

export const ListItem = styled.li`
  border-top: 1px solid darkorange;
  padding: 30px 10%;

  &.noborder {
    border-top: transparent;
  }
`;

export const ListItemTabelle = styled.li`
  border-top: 1px solid darkorange;
  bottom: 50%;
  padding: 10px 5%;

  &.noborder {
    border-top: transparent;
  }
`;

export const ListImg = styled.img`
  height: 85px;
  width: 125px;
  border-radius: 10px;
  padding-bottom: 5px;
`;

export const ListImgTabelle = styled.img`
  height: 85px;
  width: 125px;
  border-radius: 40%;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ListPrice = styled.div`
  font-size: 1.5em;
`;

export const ListPriceTabelle = styled.div`
  font-size: 1.5em;
  color: darkorange;
`;

export const ListText = styled.div`
  font-size: 0.8em;
`;

export const ListTextTabelle = styled.div`
  font-size: 0.8em;
`;
