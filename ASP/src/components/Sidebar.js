import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import "./SideBar.scss"
import { MdClose } from "react-icons/md";
import { BsChevronRight } from "react-icons/bs";
import NewSidebar from './NewSideBar';

const Nav = styled.div`
  background: #f1f1f1;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #ffffff;
  width: 232px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 51px;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
  box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
`;
const SidebarNavHide = styled.nav`
  background: #ffffff;
  width: 48px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 51px;
  left: ${({ sidebar }) => (!sidebar ? '20' : '-100%')};
  transition: 350ms;
  z-index: 10;
  box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(true);
  const hideSidebar = () => setSidebar(false);
  return (
    <>
      <IconContext.Provider value={{ color: '#000000' }}>
        <SidebarNav sidebar={sidebar}>

          <SidebarWrap>
            <div className='mainMenu'>Main Menu
              <div className="closeIcon" onClick={hideSidebar} style={{ marginLeft: "35%" }}><MdClose />
              </div>
            </div>
            <NewSidebar />
          </SidebarWrap>
        </SidebarNav>
        <SidebarNavHide sidebar={sidebar}>
          <div className="-Background-Color" onClick={showSidebar}> <BsChevronRight /></div>
        </SidebarNavHide>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;