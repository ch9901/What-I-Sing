import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import bgImg from "./content/Background.png";
import Title from "./components/Title";
import { useRecoilState } from "recoil";
import { songs, AddSongBoolean } from "./Atoms";
import AddSong from "./pages/AddSong";
import { IForm } from "./Atoms";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(0deg, #000 -1.81%, #460447 131.62%);
  background-image: url(${bgImg});
  background-size: cover;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;
const Button = styled.div`
  padding: 0.8rem 1rem;
  border: 0.1rem solid #fff;
  border-radius: 3rem;
  background: rgba(255, 255, 255, 0.42);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: absolute;
  bottom: 10%;
  right: 10%;
  cursor: pointer;
`;
function App() {
  const [addSongBoolean, setAddSongBoolean] = useRecoilState(AddSongBoolean);
  const navigate = useNavigate();
  const [songList, setSongList] = useRecoilState(songs);
  const goToHome = () => {
    navigate("/");
  };
  useEffect(() => {
    const localdata = localStorage.getItem("songs");
    const ParseLocalData = JSON.parse(localdata as string);
    if (localdata) {
      setSongList(ParseLocalData);
    }
  }, []);

  const addBoxOpen = () => {
    setAddSongBoolean(true);
  };

  return (
    <>
      {!addSongBoolean ? (
        <Wrapper className="wrapper">
          <Link to={"/"}>
            <Title tit="나만의 노래저장소🎤" />
          </Link>
          <Button onClick={addBoxOpen}>노래 추가 +</Button>
          <Routes>
            <Route path={"/*"} element={<Home />} />
          </Routes>
        </Wrapper>
      ) : (
        <AddSong />
      )}
    </>
  );
}

export default App;
