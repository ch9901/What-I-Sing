import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { songs } from "../Atoms";
import styled from "styled-components";
import { InputWrap, SongTit, Singer } from "../GlobalStyled";
import { IForm } from "../pages/AddSong";
import EditSongs from "./EditSongs";
import { EditSongBoolean } from "../Atoms";
import { useNavigate } from "react-router-dom";
const SongsList = styled.div`
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
  width: 100%;
`;
const Button = styled.div`
  font-size: 1rem;
  font-weight: 300;
  background: transparent;
  border: 0.1rem solid #fff;
  border-radius: 1.25rem;
  width: 130%;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const SongsShow = () => {
  const [songList, setSongList] = useRecoilState(songs);
  const [editSongbool, setEditSongBool] = useRecoilState(EditSongBoolean);

  const navigate = useNavigate();
  const EditSongsOpen = (songId: number) => {
    setEditSongBool(true);
    navigate(`?q=${songId}`);
  };
  console.log(songList);
  return (
    <>
      {editSongbool ? (
        <EditSongs />
      ) : (
        <>
          {songList.map((song: IForm, index: number) => (
            <SongsList key={index}>
              <Singer>{song.singer}</Singer>
              <SongTit>{song.title}</SongTit>
              <InputWrap>
                <Button className="editButton" onClick={() => EditSongsOpen(song.id)}>수정</Button>
              </InputWrap>
            </SongsList>
          ))}
        </>
      )}
    </>
  );
};

export default SongsShow;
