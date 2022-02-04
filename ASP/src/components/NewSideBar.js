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
import { getDealerVehicleCount } from "../service/api";

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
    marginLeft: "1px",
  },
  activeNavLink: {
    background: "#e7f3fd",
    borderLeft: "3px solid #407ed2",
  },
  activeNavdrop: {
    border: "1px solid #407ed2",
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

  useEffect( () => {
    setTimeout (async () =>{

    
    setActiveChild(location.pathname);
    let DealerVehicleCountRes = await getDealerVehicleCount();
    sidebarItems.map((item) => {
      item.childs.map((child) => {
        if (activeChild == child.link) {
          item.open = true;
        }

        if (child.link == "/grounded") {
          child.badge = DealerVehicleCountRes?.data.data.groundedVehicleCount;
        }
        if (child.link == "/passed") {
          child.badge = DealerVehicleCountRes?.data.data.passedVehicleCount;
        }
        if (child.link == "/purchased") {
          child.badge = DealerVehicleCountRes?.data.data.purchasedVehicleCount;
          localStorage.setItem("purchaseCount", DealerVehicleCountRes?.data.data.purchasedVehicleCount);
        }
      });
    });
    if (localStorage.getItem("dealerCode")) {
      console.log("dealerCode");

      sidebarItems = sidebarItems.filter((row) => row.label != "Admin");
    }
    setList([...sidebarItems]);
  },6000);
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
    console.log('start grounding page', new Date())
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
              // className={`${item.open ? classes.activeNavdrop : ''}`}
            >
              {item.open ? <ExpandLess /> : <ExpandMore />}
              <ListItemText primary={item.label} />
            </ListItem>
            <Collapse in={item.open} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                // className={classes.sideBarCSS}
              >
                {item.childs.map((child) => (
                  <ListItem
                    component={Link}
                    to={child.link}
                    key={child.link}
                    className={`
                     ${
                       activeChild == child.link ? classes.activeNavLink : ""
                     }   
                     ${
                       activeChild == "/"
                         ? child.link == "/grounded"
                           ? classes.activeNavLink
                           : ""
                         : ""
                     }
                    `}
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
