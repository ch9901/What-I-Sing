import React from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { EditSongBoolean, songs } from "../Atoms";
import { useForm } from "react-hook-form";
import { IForm } from "../pages/AddSong";
import { useNavigate, useSearchParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  display: flex;
  justify-content: center;
`;
const AddBox = styled.div`
  width: 80%;
  height: 70vh;
  background: #fff;
  border-radius: 1rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const TopWrap = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const CloseButton = styled.div`
  background: #fff;
  color: #000;
  width: 2.5rem;
  height: 2.5rem;
  border: 0.1rem solid #000;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  text-align: center;
  line-height: 2.5rem;
  position: absolute;
  top: -0.5rem;
  right: 0;
  cursor: pointer;
`;
const Divider = styled.div`
  background: #ddd;
  height: 0.1rem;
  width: 100%;
`;
const AddBoxDesc = styled.div`
  width: 90%;
  word-break: keep-all;
  line-height: 1.5;
  font-size: 1.2rem;
  color: #000;
  margin: 0 auto;
  margin-top: 1rem;
`;
const InputBox = styled.form`
  display: flex;
  color: #000;
  width: 90%;
  height: 35%;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input[type="text"] {
    margin-top: 1rem;
    border: none;
    border-bottom: 0.1rem solid #000;
    width: 100%;
    font-size: 1rem;
    &:placehorder {
      color: #888;
    }
    &:focus {
      outline: none;
    }
    &:first-child {
    }
  }
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
`;
const InputTit = styled.div`
  font-size: 1.2rem;
`;
const InputAddButton = styled.button`
  width: 6rem;
  height: 3rem;
  background: #000;
  border-radius: 0.5rem;
  border: none;
  color: #fff;
  text-align: center;
  line-height: 3rem;
  font-size: 1.2rem;
  cursor: pointer;
`;
const AddBoxTit = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
`;
const DescWrap = styled.div`
  margin: 0 auto;
  margin-top: 3rem;
  width: 90%;
  height: 2.5rem;
  background: #d9d9d9;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
`;
const AddButton = styled.div`
  background: #000;
  color: #fff;
  font-size: 1.1rem;
  height: 3rem;
  width: 10rem;
  border-radius: 0.5rem;
  text-align: center;
  line-height: 3rem;
  position: absolute;
  bottom: 2rem;
  cursor: pointer;
  &:first-child {
    right: 2rem;
  }
  &:last-child {
    background: tomato;
  }
`;
const Li = styled.li`
  margin-bottom: 1rem;
  list-style: circle;
`;
const ButtonWrap = styled.div``;
const EditSongs = () => {
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = query.get("q") || "";
  const setEditSongBool = useSetRecoilState(EditSongBoolean);
  const [songList, setSongList] = useRecoilState(songs);
  const localSongs = useRecoilValue(songs);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const editBoxClose = () => {
    setEditSongBool(false);
  };
  const onValid = async ({ singer, title }: IForm) => {
    setValue("singer", "");
    setValue("title", "");
    const newData = await { id: Date.now(), singer: singer, title: title };
    await setSongList(
      songList.filter((item: IForm) => item.id !== +searchQuery)
    );
    await setSongList((oldValue: any) => [
      {
        id: Date.now(),
        singer: singer,
        title: title,
      },
      ...oldValue,
    ]);
    alert("입력하신 노래가 수정되었습니다🎶");
    setEditSongBool(false);
    navigate("/");

    console.log(songList);
  };

  localStorage.setItem("songs", JSON.stringify(localSongs));

  const editSongAlert = () => {
    alert("수정하기 창을 닫습니다");
    setEditSongBool(false);
    navigate("/");
    // localStorage.setItem("songs", JSON.stringify(songList));
  };
  const deleteSong = () => {
    setSongList(songList.filter((item: IForm) => item.id !== +searchQuery));
    const sortedData = songList.filter(
      (item: IForm) => item.id !== +searchQuery
    );
    localStorage.setItem("songs", JSON.stringify(sortedData));
    alert("입력하신 노래가 삭제되었습니다🎶");
    setEditSongBool(false);
    navigate("/");
  };
  return (
    <Container>
      <AddBox>
        <TopWrap>
          <AddBoxTit>노래수정하기</AddBoxTit>
          <CloseButton onClick={editBoxClose}>X</CloseButton>
        </TopWrap>
        <Divider />
        <DescWrap>
          {songList.map((item: IForm) =>
            item.id === +searchQuery
              ? `수정하실 노래는 ${item.singer}의 ${item.title}입니다`
              : null
          )}
        </DescWrap>
        <AddBoxDesc>
          수정하실 가수와 노래의 이름을 입력하고 노래수정하기 버튼을 누르면
          노래가 수정됩니다.
        </AddBoxDesc>
        <InputBox onSubmit={handleSubmit(onValid)}>
          <Input>
            <InputTit>가수명</InputTit>
            <input
              autoFocus={true}
              {...register("singer", { required: true })}
              type="text"
              placeholder="가수명을 입력해주세요"
            />
          </Input>
          <Input>
            <InputTit>노래제목</InputTit>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="노래명을 입력해주세요"
            />
          </Input>
          <InputAddButton>수정</InputAddButton>
        </InputBox>
        <ButtonWrap>
          <AddButton onClick={editSongAlert}>창 닫기</AddButton>
          <AddButton onClick={deleteSong}>노래삭제하기</AddButton>
        </ButtonWrap>
      </AddBox>
    </Container>
  );
};

export default EditSongs;
