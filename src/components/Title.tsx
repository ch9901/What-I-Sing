import React from "react";
import styled from "styled-components";

const TitleWrap = styled.div`
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  text-decoration: none;
`;
interface IProps {
  tit: string;
  weight?: number;
}
const Title = ({ tit, weight }: IProps) => {
  return <TitleWrap>{tit}</TitleWrap>;
};

export default Title;
