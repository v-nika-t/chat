import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Button from "../../components/Button/Button";
import SendMessageForm from "../../components/Forms/SendMessageForm/SendMessageForm";
import ListMessages from "../../components/ListMessages/ListMessages";
import useWebSocket from "../../hooks/useWebSocket";
import styles from "./Romm.module.scss";
import { useEffect, useMemo } from "react";
import { IMessage } from "../../interfaces/messages";
import { messageService } from "../../services";
import { useAuth } from "../../hooks/useAuth";

function Room() {
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  const { socketMessage } = useWebSocket(
    process.env.REACT_APP_URL_WEBSOCKET as string
  );
  const { setAuth, setName } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: messageService.getAll,
  });

  useEffect(() => {
    if (socketMessage?.deletedMessage) {
      const { sender, text, id } = socketMessage?.deletedMessage;
      api.info({
        message: "The message has been deleted",
        description: `sender: ${sender}, text: ${text}`,
        duration: 3,
      });
    }
  }, [socketMessage?.deletedMessage, socketMessage?.addedMessage]);

  useEffect(() => {
    if (socketMessage?.addedMessage) {
      queryClient.setQueryData(["messages"], socketMessage.messages);
      const { sender, text } = socketMessage?.addedMessage;
      api.success({
        message: "The message has been added",
        description: `sender: ${sender}, text: ${text}`,
      });
    }
  }, [socketMessage?.addedMessage]);

  useEffect(() => {
    if (error) {
      api.success({
        message: error.message,
      });
    }
  }, [error]);

  const logout = () => {
    sessionStorage.removeItem("auth");
    setAuth(false);
    setName("");
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.header}>
        <Button mr={20} onClick={logout}>
          Logout
        </Button>
      </div>
      <div>
        <ListMessages messages={data} isPending={isPending} />
      </div>
      <SendMessageForm />
    </div>
  );
}

export default Room;
