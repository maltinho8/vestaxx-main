import styled from 'styled-components';

export const Snip1214 = styled.div`
  color: #000000;
  text-align: center;
  font-size: 16px;
  width: 100%;
  max-width: 1000px;
  margin: 30px 10px;
  position: center;

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
  background-color: #ffffff;

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

export const PlanTitle = styled.div`
  height: 50px;
  padding: 0px 10px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &.featured {
    padding: 10px 10px 20px;
    background-color: var(--lightyellow);
  }
`;

export const PlanFeatures = styled.ul`
  padding: 0;
  margin: 0;
  text-align: center;
  list-style: outside none none;
  font-size: 0.8em;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &.featured {
    background-color: var(--lightyellow);
  }
`;

export const ListItem = styled.li`
  border-top: 1px solid #d2d7e2;
  padding: 10px 5%;

  &.noborder {
    border-top: transparent;
  }
`;

export const ListImg = styled.img`
  height: 105px;
  width: 157px;
  padding-bottom: 5px;
`;

export const ListPrice = styled.div`
  font-size: 1.5em;
`;

export const ListText = styled.div`
  font-size: 0.8em;
`;
