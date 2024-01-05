import React from "react";
import Title from "../components/Title";
import styled from "styled-components";
import SongsShow from "../components/SongsShow";
import { useRecoilValue } from "recoil";
import { songs } from "../Atoms";
import { InputWrap, SongTit, Singer } from "../GlobalStyled";

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  height: calc(100vh - 20rem);
  width: 90%;
`;
const SongsLength = styled.span`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;
const TableHeader = styled.div`
  background: rgba(255, 255, 255, 0.24);
  height: 4rem;
  border-bottom: 0.1rem solid #fff;
  border-top: 0.1rem solid #fff;
  font-size: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
  width: 100%;
`;

const Home = () => {
  const songsList = useRecoilValue(songs);
  return (
    <Inner>
      <SongsLength>저장 된 전체노래 {songsList.length}곡</SongsLength>
      <TableHeader>
        <Singer>가수</Singer>
        <SongTit style={{ width: "70%" }}>노래제목</SongTit>
        <InputWrap />
      </TableHeader>
      <SongsShow />
    </Inner>
  );
};

export default Home;
