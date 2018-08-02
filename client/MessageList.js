import React from 'react';

import styles from './css/MessageList.css';

const Message = props => (
  <div className={`${styles.Message} ${(props.from == props.userName) ? styles.myMessage : styles.otherMessage}`}>
    {
      (props.from != props.userName) ?
        <p className={styles.MessageFrom}>
          <strong>{props.from}</strong>
        </p>
      : <span></span>
    }
    <span>{props.text}</span>
  </div>
);

const MessageList = props => (
  <div className={styles.MessageList}>
    {
      props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            from={message.from}
            text={message.text}
            userName={props.user}
          />
        );
      })
    }
  </div>
);

export default MessageList;