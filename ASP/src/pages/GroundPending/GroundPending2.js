import React, { useState } from 'react';
import ListingPage2 from './purchasedPage'
export default function Overview(props) {

  return (
    <div className='home'>
      <ListingPage2 {...props}></ListingPage2>
    </div>
  );
};