import styled from "@emotion/styled";

export const ThumbsSection = styled.section`
  padding: 15px;
  cursor: pointer;
  min-height: 80px;
  border: 2px dashed rgba(255, 255, 255, 0.5);
`;

export const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

export const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 250px;
  height: 250px;
  padding: 4px;
  box-sizing: border-box;
`;

export const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

export const Image = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;
