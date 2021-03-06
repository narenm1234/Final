import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { MdClose } from "react-icons/md";
export const SidebarData = [
  
  {
    title: 'Home',
    path: '/home',
  },
  {
    title: 'Check in Vehicle',
    path: '/groundpending',
  },
  {
    title: 'Grounded',

    iconClosed: <IoIcons.IoIosArrowUp />,
    iconOpened: <IoIcons.IoIosArrowDown />,

    subNav: [
      {
        title: 'Grounded',
        path: '/grounded',

      },
      {
        title: 'Passed',
        path: '/passed',
      },
      {
        title: 'Purchased',
        path: '/purchased',
      }
    ]
  }
  // {
  //   title: 'Auctions',
  //   path: '/reports',
  //   iconClosed: <IoIcons.IoIosArrowUp />,
  //   iconOpened: <IoIcons.IoIosArrowDown />,

  //   subNav: [
  //     {
  //       title: 'Auction 1 00:00:00',
  //       path: '/reports/reports1',
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Auction 2 00:00:00',
  //       path: '/reports/reports2',
  //       cName: 'sub-nav'
  //     }
  //   ]
  // // },
  // {
  //   title: 'Watchlist',
  //   path: '/products',
  //   subNav: [
  //     {
  //       title: 'WatchList',
  //       path: '/reports/reports1',
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Won',
  //       path: '/reports/reports2',
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Lost',
  //       path: '/reports/reports2',
  //       cName: 'sub-nav'
  //     }
  //   ]
  // },
  // {
  //   title: 'Reports',
  //   path: '/team',
  // },
];