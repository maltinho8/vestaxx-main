import React from "react";
import styled from "styled-components";
import ContentDXF from "../../PagesContent/ContentDXF/index";

const ContentContainer = styled.div`
  width: 100vw !important;
  margin: 0 auto;
`;

const DXF = () => {
  return (
    <div>
      <ContentContainer>
        <ContentDXF />
      </ContentContainer>
    </div>
  );
};

export default DXF;
