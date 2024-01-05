import React, { useState } from "react";
import styled from "styled-components";
import bgImg from "../content/Background.png";
import Title from "../components/Title";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AddSongBoolean, songs } from "../Atoms";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(0deg, #000 -1.81%, #460447 131.62%);
  background-image: url(${bgImg});
  background-size: cover;
  padding: 5rem 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

const AddWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AddBox = styled.div`
  width: 90%;
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

const AddBoxTit = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
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
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  input[type="text"] {
    margin-top: 1rem;
    border: none;
    border-bottom: 0.1rem solid #000;
    width: 28rem;
    font-size: 1rem;
    &:placehorder {
      color: #888;
    }
    &:focus {
      outline: none;
    }
  }
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputTit = styled.div`
  font-size: 1.2rem;
`;
const InputAddButton = styled.button`
  width: 3rem;
  height: 3rem;
  background: #000;
  border-radius: 0.5rem;
  border: none;
  color: #fff;
  text-align: center;
  line-height: 3.2rem;
  font-size: 2rem;
  cursor: pointer;
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
const AddList = styled.div`
  width: 90%;
  height: 13rem;
  background: #eee;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  color: #000;
  font-size: 1rem;
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
  right: 2rem;
  bottom: 2rem;
  cursor: pointer;
`;
const Li = styled.li`
  margin-bottom: 1rem;
  list-style: circle;
`;
export interface IForm {
  id: number;
  singer: string;
  title: string;
}

const AddSong = () => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [songList, setSongList] = useRecoilState(songs);
  const [instance, setInstance] = useState<IForm[]>([]);
  const setAddSongBoolean = useSetRecoilState(AddSongBoolean);
  const addBoxClose = () => {
    setAddSongBoolean(false);
  };
  const addSongAlert = () => {
    setAddSongBoolean(false);
    alert(`입력하신 노래가 추가되었습니다🎶`);
    localStorage.setItem("songs", JSON.stringify(songList));
  };
  const onValid = ({ singer, title }: IForm) => {
    console.log(singer, title);
    setValue("singer", "");
    setValue("title", "");
    setSongList((oldValue: any) => [
      {
        id: Date.now(),
        singer: singer,
        title: title,
      },
      ...oldValue,
    ]);
    setInstance((oldValue): any => [
      {
        id: Date.now(),
        singer: singer,
        title: title,
      },
      ...oldValue,
    ]);
  };
  return (
    <AddWrapper>
      <Wrapper>
        <Title tit="나만의 노래저장소🎤"></Title>
        <AddBox>
          <TopWrap>
            <AddBoxTit>노래추가하기</AddBoxTit>
            <CloseButton onClick={addBoxClose}>X</CloseButton>
          </TopWrap>
          <Divider />
          <AddBoxDesc>
            가수와 노래의 이름을 입력하고 + 버튼을 누르면 하단에 추가됩니다.
            하단의 노래를 저장소에 저장하시려면 완료 버튼을 눌러주세요.
          </AddBoxDesc>
          <InputBox onSubmit={handleSubmit(onValid)}>
            <Input>
              <InputTit>가수명</InputTit>
              <input
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
            <InputAddButton>+</InputAddButton>
          </InputBox>
          <DescWrap>
            하단에 추가 할 노래들이 표시되고, 노래추가하기 버튼을 클릭하면
            하단의 노래들이 저장소에 한번에 추가됩니다.
          </DescWrap>
          <AddList>
            {instance !== null && (
              <ul>
                {instance.map((item, index) => (
                  <Li key={index}>
                    {item.singer} - {item.title}
                  </Li>
                ))}
              </ul>
            )}
          </AddList>
          <AddButton onClick={addSongAlert}>노래추가하기</AddButton>
        </AddBox>
      </Wrapper>
    </AddWrapper>
  );
};

export default AddSong;
