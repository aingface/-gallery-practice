import React from 'react';
import {Reset} from 'styled-reset';
import GalleryPage from 'src/components/GalleryPage';
import Cancel from 'src/components/Cancel';
import 'antd/dist/antd.min.css'; //antd 스타일이 적용되지 않을 경우 추가

function App() {
  return (
    <div>
      <Reset/>
      <GalleryPage/>
    </div>
  );
}

export default App;
