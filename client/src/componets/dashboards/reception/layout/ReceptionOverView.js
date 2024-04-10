import React, { useId, useState } from "react";
import "../styles/ReceptionOverView.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEnvelope,
  faDashboard,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// const drawerWidth = 240;
// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

export default function ReceptionOverView() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        background: "#f0f8ff",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100vh",
          width: "100%",
        }}
      >
        {["Dashboard"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ color: "#14ac5f" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* <Divider /> */}
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={handleLogout} className="receptionLogOutButton">
            Log Out
          </button>
        </div>
      </List>
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("id");
  const userName = sessionStorage.getItem("username");
  const userRole = sessionStorage.getItem("role");

  const userNameFirstLetter = userName.charAt(0);

  function handleLogout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <main className="receptionDashboard ">
        <div className="receptionDashboardFirstCard">
          <div className="receptionDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="receptionDashboardLogOutContainer">
              <h4 style={{ textDecoration: "underline" }}>
                Welcome {userName}
              </h4>
              <h1 className="receptionDashboardNavImage">
                {" "}
                {userNameFirstLetter}
              </h1>
              {/* <h3>🤗🤗🤗 </h3> */}
              {/* <button onClick={handleLogout}>Logout</button> */}
            </div>
          </div>
        </div>
        <div className="ReceptionDashboardSecondCard">
          <div>
            <p>reception</p>
            {/* <h2>ReceptionCardNavBarContainer</h2> */}
          </div>
        </div>
      </main>
    </div>
  );

  // const [showSidebar, setShowSidebar] = useState(false);
  // const [sidebarWidth, setSidebarWidth] = useState(300);

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  //   setSidebarWidth(showSidebar ? 0 : 300);
  // };

  // const styles = {
  //   side: {
  //     width: sidebarWidth,
  //   },
  //   "@media (max-width: 320px)": {
  //     side: {
  //       width: showSidebar ? "0" : "100%",
  //     },
  //   },
  // };

  // return (
  // <div className="reportContainer">
  //   <div style={styles.side} className={showSidebar ? `side show` : `side`}>
  //     <div className="layoutContainer">
  //       <div className="sideBarContainer">
  //         <div className="sideBarIdentityContainer">
  //           <div className="sideBarProfile">
  //             {/* <img
  //                 src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
  //                 alt="profile "
  //                 className="profileImage"
  //               /> */}
  //             <h1 className="receptionProfileImage"> {userNameFirstLetter}</h1>
  //             <div className="sideBarContainerFooter">
  //               <div>
  //                 <h4 title="UserName"> {userName} </h4>
  //                 <span title="Role">{userRole}</span>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="sideBarLinksContainer">
  //             <ul className="ReceptionsideBarUnorderList">
  //               <NavLink to="/reception" className="ReceptionsideBarLinks">
  //                 <div id="icons">
  //                   <FontAwesomeIcon icon={faDashboard} />
  //                 </div>
  //                 <div>Dashboard</div>
  //               </NavLink>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>;
  // );
}
