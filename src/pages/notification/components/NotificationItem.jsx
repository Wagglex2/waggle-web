/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/theme';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const NotificationItem = ({ item, handleDelete }) => {
  return (
    <li css={notificationItemStyle(item.isRead)} key={item.id}>
      <div css={notificationIconBox}>
        <NotificationsNoneIcon className="notification-icon" />
      </div>
      <p className="msg-field">{item.message}</p>
      <p className="category-field">{item.category}</p>
      <p className="date-field">{item.date}</p>
      <button className="notification-item-delete-btn" onClick={() => handleDelete(item.id)}>
        X
      </button>
    </li>
  );
};

export default NotificationItem;

const notificationItemStyle = (isRead) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px 5px 5px;
  border: 1px solid ${colors.gray[200]};
  border-radius: 30px;
  margin-bottom: 8px;
  background-color: ${isRead ? '#ffffff' : '#FEF8D9'};

  .msg-field {
    margin-right: 30px;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .category-field {
    width: 80px;
    text-align: center;
    font-size: 12px;
  }

  .date-field {
    font-size: 12px;
    margin: 0 20px;
  }

  .notification-item-delete-btn {
    background: none;
    border: none;
    font-size: 15px;
    color: ${colors.gray[400]};
  }
`;

const notificationIconBox = css`
  position: relative;
  border-radius: 100%;
  border: 2px solid ${colors.tertiary};
  width: 40px;
  height: 40px;
  background-color: #ffffff;

  .notification-icon {
    position: absolute;
    left: 0;
    right: 0;
    top: 5px;
    margin: auto;
    color: ${colors.tertiary};
  }
`;
