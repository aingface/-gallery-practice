import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

interface Props{
  setDetailClick:Function
}

const Cancel:React.FC<Props> = ({setDetailClick}) => {
  //디테일 사진 페이지에서 X버튼 클릭시 다시 갤러리로
  const onClickHandler=()=>{
    setDetailClick(()=>false)
  }
  return (
    <TopBarWrapper>
      <CancelButton
        onClick={onClickHandler}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M16.192 6.344l-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414
          1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
        </svg>
      </CancelButton>
    </TopBarWrapper>
  );
};

export default Cancel;

const CancelButton=styled.button`
  position: relative;
  box-sizing: border-box;
  height: 2rem;
  display: flex;
  /* -webkit-box-pack: center; */
  justify-content: center;
  /* -webkit-box-align: center; */
  align-items: center;
  padding: 0px 10px;
  border: none;
  border-radius: 4px;
  appearance: none;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  font-size: 1.33rem;
  text-align: center;
  /* fill: rgb(75, 75, 75); */
  color: rgb(75, 75, 75);
  background: rgba(238, 238, 238, 0.8);
  transition: background-color 0.16s ease 0s, color 0.16s ease 0s;
  cursor: pointer;

  &:hover{
    background-color: rgba(232, 232, 232, 1);

  }
`

const TopBarWrapper=styled.main`
  position: absolute;
  left: 0;
  width: 100vw;
  min-width: 1024px;
  padding: 8px;
  height: 48px;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(235, 235, 235, 0.8);
  display: flex;
  /* -webkit-box-align: center; */
  align-items: center;
`