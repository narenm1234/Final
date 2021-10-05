import React, { useState } from 'react';
import ListingPage1 from './passedPage'
export default function Overview(props) {

  return (
    <div className='home'>
      <ListingPage1 {...props}></ListingPage1>
    </div>
  );
};