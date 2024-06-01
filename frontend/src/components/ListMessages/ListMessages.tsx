import { List } from "antd";
import styles from "./ListMessages.module.scss";
import { IMessage } from "../../interfaces/messages";

function ListMessages({
  messages,
}: {
  messages: IMessage[];
  isPending: boolean;
}) {
  return (
    <div id="scrollableDiv" className={styles.scroll}>
      <List
        dataSource={messages || []}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={<div>{item.sender}</div>}
              description={item.text}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default ListMessages;
