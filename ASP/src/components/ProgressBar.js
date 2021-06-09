import React from 'react';

let styles = {
  container: {
    "position": "relative",
    "width": "775px",
    "height": "84px",
    "left": "30%",
    "top": "5.5%",
    "box-shadow": "0 1px 0 0 #dddbda",
    "background-color": "#dddbda",
  },
  line: {
    "width": "33%",
    "height": "2px",
    "margin": "4px 2px 11px 2px",
    "background-color": "#ffffff",
  },
  ovalred: {
    "width": "8px",
    "height": "8px",
    "background-color": "red",
    "border-radius": "50%",

  },
  oval: {
    "width": "8px",
    "height": "8px",
    "background-color": "#ffffff",
    "border-radius": "50%",
    "margin": "4px",
  },
  ovalBackGround: {
    "width": "16px",
    "height": "16px",
    "background-color": "red",
    "border-radius": "50%",
    "position": "absolute",
    "left": "4.3%",
  },
  selected: {
    "width": "25%",
    "height": "16px",
    "font-family": "ToyotaTypeBook",
    "font-size": "12px",
    "font-weight": "normal",
    "font-stretch": "normal",
    "font-style": "normal",
    "line-height": "1.6",
    "letter-spacing": "normal",
    "color": "#005fb2",
  },
  notSelected: {
    "width": "25%",
    "height": "16px",
    "font-family": "ToyotaTypeBook",
    "font-size": "12px",
    "font-weight": "normal",
    "font-stretch": "normal",
    "font-style": "normal",
    "line-height": "1.6",
    "letter-spacing": "normal",
    "color": "#000000",
  }
}
const ProgressBar = (props) => {

  return (

    <div style={styles.container}>
      <div style={{
        "display": "flex", "flex-direction": "row", "padding-top": "3%",
        "padding-left": "5%",
        "padding-right": "5%",
      }}>
        <div style={styles.ovalBackGround}> <div style={styles.oval}></div></div>
        <div style={styles.line}></div>
        <div style={styles.oval}></div>
        <div style={styles.line}></div>
        <div style={styles.oval}></div>
        <div style={styles.line}></div>
        <div style={styles.oval}></div>

      </div>

      <div style={{ "display": "flex", "flex-direction": "row", width: "919px", "padding-left": "2%", "margin-top": "1%" }}>
        <div style={styles.selected}>Vehicle Verification</div>
        <div style={styles.notSelected}>Odometer Statement</div>
        <div style={styles.notSelected}> Additional Information</div>
        <div style={styles.notSelected}>Confirmation</div>
      </div>
    </div>

  )

}
export default ProgressBar;