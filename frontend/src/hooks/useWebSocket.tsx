import { useState, useEffect } from "react";
import { ISocketMessage } from "../interfaces/messages";
const useWebSocket = (url: string) => {
  const [socketMessage, setSocketMessage] = useState<ISocketMessage>();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.addEventListener("open", () => {});

    ws.addEventListener("message", (event) => {
      const { event: eventName, data } = JSON.parse(event.data);
      if (eventName === "messagesUpdated") {
        setSocketMessage(data);
      }
    });

    return () => {
      ws.close();
    };
  }, [url]);

  return {
    socketMessage,
    socket,
  };
};

export default useWebSocket;
