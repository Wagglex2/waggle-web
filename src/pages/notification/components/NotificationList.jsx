/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notificationItems, handleDelete }) => {
  return (
    <ul css={container}>
      {notificationItems.map((item) => (
        <NotificationItem key={item.notificationId} item={item} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default NotificationList;

const container = css`
  min-height: 500px;
  border-bottom: 1px solid #dddddd;
`;
