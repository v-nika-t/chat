import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input as InputAntd } from "antd";
import { InputProps } from "./interfaces";

function Input({ m, mt, mb, ml, mr, ...props }: InputProps) {
  return (
    <InputAntd
      addonBefore="Your name"
      placeholder="Enter your name"
      {...props}
      style={{
        margin: m,
        marginBottom: mb,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
      }}
    />
  );
}

export default Input;
