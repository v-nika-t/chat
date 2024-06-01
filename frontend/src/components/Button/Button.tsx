import React, { useState } from "react";
import Input from "../Input/Input";
import { Button as ButtonAntd } from "antd";
import { ButtonProps } from "./interfaces";
import styles from "./Button.module.scss";

function Button({ children, m, mt, mb, ml, mr, ...props }: ButtonProps) {
  return (
    <ButtonAntd
      style={{
        margin: m,
        marginBottom: mb,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
      }}
      className={styles.button}
      {...props}
    >
      {children}
    </ButtonAntd>
  );
}

export default Button;
