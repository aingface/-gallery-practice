import React, { ReactElement } from 'react';
import styled from 'styled-components';
import {useEffect,useState} from 'react';
import dummy from 'src/test.json'; //dummy라는 변수에 test.json 데이터 할당
import { Checkbox,Button } from 'antd';
import Tab from 'src/components/Tab';
import DropdownButton from 'src/components/DropdownButton';
import GalleryDetailPage from 'src/components/GalleryDetailPage';

/*
  state 변수 안내
  mouseOn : 각 이미지 카드에 마우스를 올리는지 구별하는 boolean[] 변수.
  이미지 카드에 index를 부여해 구별
  
  checkList : 각 이미지 카드에 마우스를 올리면 나타나는 체크박스에 체크 했는지
  구별하는 boolean[] 변수. 이미지 카드에 index를 부여해 구별
  
  allCheck : 전부 체크 했는지 구별하는 boolean 변수 
  
  detailCheck: 이미지 카드를 클릭하면 기존에 렌더링 된 이미지 카드 사진들이 사라지고
  클릭한 이미지 상세보기 이미지가 렌더링 될 수 있도록 구별을 위한 boolean 변수 

  clickedImageIndex : 클릭한 이미지 카드의 index를 저장하는 number 변수
*/

interface Props{
  checkboxIndex: number;
}

const PhotoBoard = () => {
  const [mouseOn,setMouseOn]=useState<boolean[]>(Array(dummy.renderings.length).fill(false));
  const [checkedList,setCheckedList]=useState<boolean[]>(Array(dummy.renderings.length).fill(false));
  const [checkedCardNum,setCheckedCardNum]=useState<number>(0);
  const [allCheck,setAllCheck]=useState<boolean>(false); 
  const [detailClick,setDetailClick]=useState<boolean>(false);
  const [clickedImageIndex,setClickedImageIndex]=useState<number>(0);

  //마우스 올리고 내릴때 mouseOn 값 토글
  const onMouseOverHandler=(event:any)=>{
    //ClassName의 끝에 index 번호를 붙임
    const CardWrapperClassName:Array<string> = event.currentTarget.className.split(' ');
    const CardWrapperClassNameLength:number=CardWrapperClassName.length;
    //문자열을 숫자로
    const CardIndex:number= Number(CardWrapperClassName[CardWrapperClassNameLength-1]);

    setMouseOn((prev)=>{
      return(
        prev.map((_,index)=>{
          return(index===CardIndex ? true:false)
        })
      ) 
    })
  }
  const onMouseOutHandler=()=>{
    setMouseOn([...mouseOn.fill(false)])
  }

  const onChangeHandlerForCheckbox=(event:any)=>{
    //체크된 사진 개수 표시. 체크하면 초기값이 0인 checkedCardNum에 +1을, 체크를 풀면 -1을 한다. 
    setCheckedCardNum(currNum=>{
      return(
         event.target.checked===true ?currNum+1:currNum-1
      );
    })
    //체크 여부에 따라 checkBoxState의 index에 맞는 체크 유무 state 업데이트
    setCheckedList((currCheckedList)=>{
      const newCheckedList=currCheckedList;
      event.target.checked===true ? 
        newCheckedList[event.target.checkboxIndex]=true :
        newCheckedList[event.target.checkboxIndex]=false ;

      return newCheckedList;
    })
  }

  //모두 선택 체크박스가 체크되면 모든 사진 키드 체크박스 체크
  // 모두 선택 체크 풀면 체크 헤제
  useEffect(()=>{
    setCheckedList((currCheckedList)=>{
      const newCheckedListForAllCheck=currCheckedList;
      allCheck === true ?
        newCheckedListForAllCheck.fill(true) :
        newCheckedListForAllCheck.fill(false) ;
   
      return newCheckedListForAllCheck;      
    })

    setCheckedCardNum((curr)=>{
      return(
        allCheck===true ? checkedList.length : 0
      );
    })

  },[allCheck])
  
  //이미지 카드 클릭 시 이미지 인덱스를 clikedImageIndex에 업데이트
  //업데이트 된 인덱스를 GalleryDetailPage 컴포넌트에 props로 주어 알맞은 이미지를 불러옴 
  const onClickHandler=(event:any)=>{
    console.log(event);
    setDetailClick(()=>true);
    const imgClassName= event.target.className.split(' ');
    const imgClassNameLength=imgClassName.length;
    const imgIndex=Number(imgClassName[imgClassNameLength-1]);
    setClickedImageIndex(()=> imgIndex)
  }

  //이미지 로드 실패시 로드 실패를 알리는 이미지로 대체 
  const onErrorHandler=(event:any)=>{
    event.target.src='https://cdn.pixabay.com/photo/2014/02/08/14/33/error-261888_960_720.jpg';
  }

  //test.json에서 받아온 이미지 주소를 이미지 태그 src에 넣고 list로 만듦
  const ProjectCardArray : Array<ReactElement> = 
  dummy.renderings
  .map((item,index): ReactElement=>{
    return(
      <ProjectCard className='ProjectCard' key={index}> 
        <CardInner className='CardInner'>
          <CardCoverWrapper
            className={`CardCoverWrapper ${index}`}
            onMouseOver={onMouseOverHandler}
            onMouseOut={onMouseOutHandler}
            >
            <CardImg src={item._id} alt="render" object-fit={'cover'}
              onClick={onClickHandler} 
              onError={onErrorHandler}
              className={`img ${index}`}   
              />
            { ((mouseOn[index]||checkedList[index])) && 
              <CustomCheckbox 
                checkboxIndex={index} 
                onChange={onChangeHandlerForCheckbox}
                checked={checkedList[index]}
              />  
            }   
            {mouseOn[index] && <DropdownButton/>}
          </CardCoverWrapper>
        </CardInner>
      </ProjectCard> 
    )      
  })
  
  
  //사진 카드를 클릭하면 갤러리 사진 전체보기가 사라지고 상세보기가 나옴
  return (
    <>
      {detailClick!==true ? 
      <ProjectWrapper>
        <Tab 
          pageName={"갤러리"} 
          checkedCardNum={checkedCardNum}
          setAllCheck={setAllCheck}
        />
          {ProjectCardArray}
      </ProjectWrapper> : 
      <GalleryDetailPage 
        setDetailClick={setDetailClick}
        clickedImageIndex={clickedImageIndex}
      />
      }
    </>
  );
};

const CustomCheckbox=styled(Checkbox)<Props>`
  position : absolute;
  top : 15px;
  left : 15px;
  width: 1rem;
  height: 1.25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
    
  .ant-checkbox{
    width: 1rem;
    height : 1rem;
    box-sizing: border-box;

  }
  .ant-checkbox-input{
    width: 1rem;
    height: 1rem;
    margin: 0;
    padding: 0;
    
  }
  .ant-checkbox-inner{
    position: absolute;
    left: 0;
    width: 1rem;
    height: 1rem;
    border-color: lightgray;
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #499fb6; 
  }  
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #499fb6;
    border-color: #499fb6;
  }
`

const CardImg=styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  object-fit: cover;

  :hover{
    filter: brightness(75%);
  } 
`
const CardCoverWrapper=styled.div`
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 4px;
  transition: box-shadow 0.25s ease 0s;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 71%;
`
const CardInner=styled.div`
  background-color: rgb(255, 255, 255);
  margin: 9px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  box-shadow: none;
  transition: box-shadow 0.25s ease 0s;
`
const ProjectCard=styled.div`
  flex: 0 1 25%; /* Three values: flex-grow | flex-shrink | flex-basis */
  width: 25%;
  position: relative;
`

const ProjectWrapper=styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 7px;
`


export default PhotoBoard;

