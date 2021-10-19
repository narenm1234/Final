import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import {
  getGroundingList,
  getPassedList,
  getPurchasedList,
} from "../service/api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B80F0A",
    borderRadius: "50%",
    fontSize: "12px",
    padding: "0px",
    color: "white",
  },
  sideBarCSS: {
    marginLeft: "16px",
  },
  activeNavLink: {
    background: "#e7f3fd",
    borderLeft: "3px solid #407ed2",
  },
}));

let sidebarItems = [
  {
    label: "Grounded",
    open: true,
    childs: [
      {
        label: "Grounded",
        link: "/grounded",
        badge: null,
      },
      {
        label: "Passed",
        link: "/passed",
        badge: null,
      },
      {
        label: "Purchased",
        link: "/purchased",
        badge: null,
      },
    ],
  },
  {
    label: "Admin",
    open: true,
    childs: [
      {
        label: "Vehicle Search",
        link: "/adminSearch",
        badge: null,
      },
      {
        label: "Inventory Requests",
        link: "/adminInventoryRequests",
        badge: null,
      },
    ],
  },
];

export default function NewSidebar(props) {
  const location = useLocation();
  const [list, setList] = React.useState([]);
  const [open, setOpen] = React.useState([]);
  const [activeChild, setActiveChild] = React.useState(location.pathname);
  const classes = useStyles();

  useEffect(async () => {
    let getGroundingListRes = await getGroundingList();
    let getPassedListRes = await getPassedList();
    let getPurchasedListRes = await getPurchasedList("ALL");
    // setVehicleResponse(apiResponse.data.data);
    // console.log("setVehicleResponse::", getGroundingListRes.data.data);
    // console.log("setVehicleResponse::", getPassedListRes.data.data);
    // console.log("setVehicleResponse::", getPurchasedListRes.data.data);

    sidebarItems.map((item) => {
      item.childs.map((child) => {
        if (activeChild == child.link) {
          item.open = true;
        }

        if (child.link == "/grounded") {
          if (
            getGroundingListRes &&
            getGroundingListRes.data &&
            getGroundingListRes.data.data.length !== 0
          ) {
            child.badge = getGroundingListRes?.data.data.length;
          } else {
            child.badge = 0;
          }
        }
        if (child.link == "/passed") {
          if (
            getPassedListRes &&
            getPassedListRes.data &&
            getPassedListRes.data.data.length !== 0
          ) {
            child.badge = getPassedListRes?.data.data.length;
          } else {
            child.badge = 0;
          }
        }
        if (child.link == "/purchased") {
          if (
            getPurchasedListRes &&
            getPurchasedListRes.data &&
            getPurchasedListRes.data.data.length !== 0
          ) {
            child.badge = getPurchasedListRes?.data.data.length;
          } else {
            child.badge = 0;
          }
        }
      });
    });
    if(localStorage.getItem('dealerCode'))
    {
    console.log('dealerCode')
    
    sidebarItems = sidebarItems.filter(row=>row.label != 'Admin')
    }
    setList([...sidebarItems]);
  }, [props.stateUpdate]);

  const handleClick = (item) => {
    let updatedList = list.map((litem) => {
      if (litem.label === item.label) {
        litem.open ? (litem.open = false) : (litem.open = true);
      }
      return litem;
    });
    setList(updatedList);
  };

  const handleClickMakeActive = (child) => {
    setActiveChild(child.link);
  };

  return (
    <div className={classes.sideBarCSS}>
      {list &&
        list.map((item, index) => (
          <List
            key={index}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItem
              button
              onClick={() => {
                handleClick(item);
              }}
            >
              {item.open ? <ExpandLess /> : <ExpandMore />}
              <ListItemText primary={item.label} />
            </ListItem>
            <Collapse in={item.open} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                className={classes.sideBarCSS}
              >
                {item.childs.map((child) => (
                  <ListItem
                    component={Link}
                    to={child.link}
                    key={child.link}
                    className={
                      activeChild == child.link ? classes.activeNavLink : ""
                    }
                    onClick={() => {
                      handleClickMakeActive(child);
                    }}
                  >
                    <ListItemText primary={child.label} />
                    {child.badge ? (
                      <Chip className={classes.root} label={child.badge}></Chip>
                    ) : (
                      ""
                    )}
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
    </div>
  );
}
