import React from "react";
import styles from "./List.module.css";
import common from "../../../styles/common.module.css";
import type { Story } from "../../../types/story";

// props の型定義
type ListProps = {
  list: Story[];
  onRemoveItem: (item: Story) => void;
};

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

const List = React.memo(({ list, onRemoveItem }: ListProps) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
));

const Item = ({ item, onRemoveItem }: ItemProps) => (
  <li className={styles.item}>
    <span style={{ width: "40%" }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: "30%" }}>{item.author}</span>
    <span style={{ width: "10%" }}>{item.num_comments}</span>
    <span style={{ width: "10%" }}>{item.points}</span>
    <span style={{ width: "10%" }}>
      <button
        type="button"
        onClick={() => onRemoveItem(item)}
        className={`${common.button} ${common.buttonSmall}`}
      >
        Dismiss
      </button>
    </span>
  </li>
);

export default List;
