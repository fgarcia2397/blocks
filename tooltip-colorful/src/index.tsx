import React from "react";
import styles from "./index.less";

import { Tooltip, Button, Divider } from "antd";

const colors = [
  "pink",
  "red",
  "yellow",
  "orange",
  "cyan",
  "green",
  "blue",
  "purple",
  "geekblue",
  "magenta",
  "volcano",
  "gold",
  "lime",
];
const customColors = ["#f50", "#2db7f5", "#87d068", "#108ee9"];

export default () => (
  <div className={styles.container}>
    <div id="components-tooltip-demo-colorful">
      <>
        <Divider orientation="left">Presets</Divider>
        <div>
          {colors.map((color) => (
            <Tooltip title="prompt text" color={color} key={color}>
              <Button>{color}</Button>
            </Tooltip>
          ))}
        </div>
        <Divider orientation="left">Custom</Divider>
        <div>
          {customColors.map((color) => (
            <Tooltip title="prompt text" color={color} key={color}>
              <Button>{color}</Button>
            </Tooltip>
          ))}
        </div>
      </>
    </div>
  </div>
);
