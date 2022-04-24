import React from 'react';
import styled from 'styled-components';
import dummy from 'src/test.json'; //dummy라는 변수에 test.json 데이터 할당
import {Checkbox} from 'antd';

interface InterfaceProps{
  pageName:string;
  checkedCardNum:number;
  setAllCheck: Function;
}

const Tab:React.FC<InterfaceProps>=({
  pageName,
  checkedCardNum,
  setAllCheck,
})=> {
  const photoCount:number= dummy.renderings.length;
  
  const onCheckHandler=(event: any)=>{
    event.target.checked===true ?
    setAllCheck(()=>true):
    setAllCheck(()=>false)  
  }
  
  return (
    <TabBoard>
        <ProjectInfo>
         {
          //카드가 1개 이상 선택되면 선택된 이미지 개수와 모두 선택 체크박스 활성화
          checkedCardNum>0 ? 
          <>
            <span>{checkedCardNum}개의 렌더 이미지 선택됨</span>
            <CustomCheckbox 
              onChange={onCheckHandler}
              checked={checkedCardNum===photoCount}
            >
                모두 선택
            </CustomCheckbox>
          </>:
          //카드가 선택되지 않으면 총 카드 개수 렌더
          <span>{photoCount}개의 렌더샷</span>
         }    
        </ProjectInfo>
      <TopTitle><span>{pageName}</span></TopTitle>
      <ProjectFilter/>
    </TabBoard>
  );
}

export default Tab;

const ProjectInfo=styled.span`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  align-items: center;
  font-size: 0.875rem;
  
  /* border: solid 0.05rem; */
`
const TopTitle=styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  font-weight: bold;
  height: 100%;
  box-sizing: border-box;

  /* border: solid 0.05rem; */
`
const ProjectFilter=styled.span`
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  
  /* border: solid 0.05rem; */
`

const CustomCheckbox=styled(Checkbox)`
  width: 6rem;
  height: 1rem;
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  margin-left:1rem;
  align-items: center;
  font-size: 0.875rem;
  
  .ant-checkbox{
    width: 1rem;
    height : 1rem;
    top: 0;
  }
  .ant-checkbox-input{
    width: 1rem;
    height: 1rem;
    margin: 0;
    padding: 0;
  }
  .ant-checkbox-inner{
    position: absolute;
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
const TabBoard=styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 4rem;
`