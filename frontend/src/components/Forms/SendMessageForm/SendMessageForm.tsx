import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Input as InputAntd, notification } from "antd";
import Button from "../../Button/Button";
import styles from "./SendMessageForm.module.scss";
import { useMutation } from "@tanstack/react-query";
import { messageService } from "../../../services";
import { useAuth } from "../../../hooks/useAuth";
const { TextArea } = InputAntd;

function SendMessageForm() {
  const [text, setText] = useState<string>("");
  const { name: sender } = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (newMessage: { text: string; sender: string }) => {
      return messageService.create(newMessage);
    },
  });

  useEffect(() => {
    if (error) {
      api.success({
        message: error.message,
      });
    }
  }, [error]);

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (typeof value === "string") setText(e.target.value);
  };

  const handleSendMessage = () => {
    if (sender && text) {
      mutate({ text, sender });
      setText("");
    }
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <TextArea
        rows={4}
        maxLength={200}
        className={styles.textarea}
        value={text}
        onChange={onChangeText}
      />
      <div className={styles.button}>
        <Button mr={20} onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default SendMessageForm;
