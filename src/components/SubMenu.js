import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const SidebarLink = styled(Link)`
  display: block;
  color: #e1e9fc;
  padding: 10px 0px 0px 40px;
  text-decoration: none;
  font-size: 15px;
  color:#495057;

  &:hover {
    background: rgba(65, 154, 249, 0.3);
    color:#495057;
    border-left: 4px solid #f1f1f1;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  color:#495057;
`;
const SidebarLabelArrow = styled.span`
  margin-left: 16px;
  color:#495057;
`;
const SidebarLabelSubMenu = styled.span`
  margin-left: 16px;
  color:#006dcc;
`;
const DropdownLink = styled(Link)`
  background: ##f1f1f1;
  height: 60px;
  padding-left: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 15px;
  color:#495057;

  &:hover {
    background: ##f1f1f1;
    cursor: pointer;
    color:#495057;
  }
`;


const StyledChip = styled.span`
width: 36px;
height: 36px;
background-color: #B80F0A;
border-radius: 50%;
font-size: 12px;
padding: 10px 12px 10px 12px;
color: white;
`;
const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div style={{ "display": "inline-flex", "width": "100%" }}>
          <div style={{ "display": "inline-flex", "padding-top": "8%" }}>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
                ? item.iconClosed
                : null}
          </div>
          {item.subNav && subnav ? (<SidebarLabelArrow>{item.title}</SidebarLabelArrow>) : (
            <div style={{ "display": "inline-flex", "width": "100%" }}>
              <div style={{ "display": "inline-flex", "justify-content": "left", "padding": "10px 0 10px 0", "float": "left" }}>
                <SidebarLabel>{item.title}</SidebarLabel>
              </div>

            </div>
          )}
          <div style={{ "display": "inline-flex", "justify-content": "flex-end", "padding": "5%" }}>
            <StyledChip >6</StyledChip>
          </div>
        </div>
      </SidebarLink>
      {
        subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabelSubMenu>{item.title}</SidebarLabelSubMenu>
            </DropdownLink>
          );
        })
      }
    </>
  );
};

export default SubMenu;