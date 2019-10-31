import {
  drawerWidth,
  transition,
  container,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";
const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  close: {
    padding: '10px'
  },
  info: {
    backgroundColor: '#26c6da',
    boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb('#000') +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb('#00acc1') +
    ",.4)"
  },
  content: {
    marginTop: "60px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
