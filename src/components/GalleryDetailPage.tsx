import React from 'react';
import Cancel from 'src/components/Cancel';
import styled from 'styled-components';
import dummy from 'src/test.json'; //dummy라는 변수에 test.json 데이터 할당
import {Button} from 'antd';
import {useState} from 'react';

interface Props{
  setDetailClick:Function
  clickedImageIndex:number
}
interface ButtonProps{
  direction:string;
}

const GalleryDetailPage:React.FC<Props> = ({setDetailClick, clickedImageIndex}) =>  {
  const imgSrcList:string[]=dummy.renderings.map((item,index)=>{
    return item._id
  });
  //현재 이미지 인덱스에 갤러리 페이지에서 클릭했던 이미지 인덱스를 초기값으로 둔다
  const [currImageIndex, setCurrImageIndex]=useState(clickedImageIndex);

  //이전 사진 버튼 눌렀을 때 현재 사진 index가 1이상(2번째)이면
  // 현재 사진 index에서 -1 하고 이전 사진 렌더링  
  const onclickPrevHandler=(event:any)=>{
    currImageIndex>=1 && setCurrImageIndex(()=>currImageIndex-1);    
  }

  //다음 사진 버튼 눌렀을 때 현재 사진 index가 전체 사진 파일 길이-1(마지막)이면
  // 현재 사진 index에서 +1 하고 다음 사진 렌더링  
  const onclickNextHandler=(event:any)=>{
    const imgLength= dummy.renderings.length;
    currImageIndex<imgLength-2 && setCurrImageIndex(()=>currImageIndex+1);    
  }

   //이미지 로드 실패시 로드 실패를 알리는 이미지로 대체 
   const onErrorHandler=(event:any)=>{
    event.target.src='https://cdn.pixabay.com/photo/2014/02/08/14/33/error-261888_960_720.jpg';
  }

  return ( 
    <GalleryDetailPageWrapper>
      <Cancel setDetailClick={setDetailClick}/>
      <DetailIMg src={imgSrcList[currImageIndex]} alt="detail-render"
        onError={onErrorHandler}
      /> 
      <CustomButton 
        direction={'prev'}
        onClick={onclickPrevHandler}
      > {'<'} </CustomButton>
      <CustomButton 
        direction={'next'}
        onClick={onclickNextHandler}
      > {'>'} </CustomButton>
    </GalleryDetailPageWrapper>
  );
};



export default GalleryDetailPage;

const CustomButton=styled(Button)<ButtonProps>`
  position: absolute;
  top: 50%;
  border-radius: 10px;
  height: 2.5rem;
  width: 2.5rem;
  ${props=>props.direction==='prev' ? 'left: 0;':'right: 0;'}

`
const DetailIMg=styled.img`
  position: absolute;
  top: 3rem;
  object-fit: contain;
  width: 86%;
  height: auto;
`

const GalleryDetailPageWrapper=styled.div`
  width: 100%;
  height: 100vh; //이미지 크기가 줄어들면 버튼 위치가 줄어든 이미지에 따라 바뀌기 때문에 100vh
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  position: relative;
`


