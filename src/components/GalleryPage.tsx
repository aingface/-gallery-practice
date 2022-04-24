
import React from 'react';
import PhotoBoard from 'src/components/PhotoBoard';
import styled from 'styled-components';

const GalleryPage=()=> {
  return (
    <GalleryPageDiv>
      <PhotoBoard/>
    </GalleryPageDiv>
  );
}

export default GalleryPage;

const GalleryPageDiv=styled.div`
  margin: 0 2rem;
  background-color: #fff;
`