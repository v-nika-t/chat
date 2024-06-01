import React, { useState } from "react";
import { Modal as ModalAntd } from "antd";

function Modal({ children }: { children: JSX.Element }) {
  return (
    <ModalAntd open={true} closable={false} footer={[]}>
      {children}
    </ModalAntd>
  );
}

export default Modal;
