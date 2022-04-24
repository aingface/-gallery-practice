import React from "react";
import "antd/dist/antd.css";
import { Menu, Dropdown, Button } from 'antd';
import styled from 'styled-components';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


const downloadHandler=(event:any)=>{
  console.log(event);
  // domtoimage
  //   .toBlob(document.querySelector('.test'))
  //   .then((blob) => {
  //     saveAs(blob, 'card.png');
  //   });
}

const menu = (
  <Menu
  items={[
    {
      label:(
        <span
          onClick={downloadHandler}
        >
          {'다운로드'}
        </span>  
        ), 
      key: '1',
    },
    {
      label: '삭제',
      key: '2',
    },
  ]}
/>
);

const DropdownButton = () => {
 
  return (
    <CustomDropdown
      overlay={menu}
      placement="bottomRight"
    >
      <Button>...</Button>
    </CustomDropdown>
  );
};

export default DropdownButton;

const CustomDropdown=styled(Dropdown)`
  position: absolute;
  background-color: transparent;
  border-color: transparent;
  display: flex;
  top: 10%;
  left: 70%;
  width: 10%;
  justify-content: center;
  align-items: center;

  :hover{
    background-color: transparent;
    border-color: transparent
  }

  span{
    color: #BEBEBE;
    font-weight: bold;
    font-size: 1.5rem;
  }  
`






