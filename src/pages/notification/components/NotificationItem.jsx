/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/theme';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import Message from './Message';
import api from '@/api/api';
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({ item, handleDelete }) => {
  const navigate = useNavigate();

  // 알림 개별 삭제 api
  function deleteNotification(e, notificationId) {
    e.stopPropagation();
    if (confirm('이 알림을 삭제하시겠습니까?') === false) return;
    try {
      api.delete(`/api/v1/notifications/${notificationId}`);
      handleDelete(notificationId); // 알림 목록 정리
    } catch (e) {
      alert('알림 삭제에 실패하였습니다. 다시 시도해 주세요.');
      console.error(e);
    }
  }

  async function handleNotification(type, notificationId) {
    try {
      await api.patch(`/api/v1/notifications/${notificationId}/read`);
    } catch (e) {
      console.error(e);
    } finally {
      if (type === 'APPLICATION_SUBMITTED') navigate('/my-page/my-posted-job');
      else if (type === 'APPLICATION_REJECTED') navigate('/my-page/my-applications');
      else navigate('/my-page/my-team');
    }
  }

  return (
    <li
      css={notificationItemStyle(item.isRead)}
      key={item.notificationId}
      onClick={() => handleNotification(item.type, item.notificationId)}
    >
      <div css={notificationIconBox}>
        <p className="notification-icon">
          {item.category.name === 'PROJECT' ? (
            <Diversity2OutlinedIcon />
          ) : item.category.name === 'STUDY' ? (
            <AutoStoriesOutlinedIcon />
          ) : (
            <LocationCityOutlinedIcon />
          )}
        </p>
      </div>
      <Message
        senderNickname={item.senderNickname}
        recruitmentTitle={item.recruitmentTitle}
        type={item.type}
      />
      <p className="category-field">{item.category.desc}</p>
      <p className="date-field">{item.createdAt}</p>
      <button
        className="notification-item-delete-btn"
        onClick={(e) => deleteNotification(e, item.notificationId)}
      >
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
  padding: 5px 16px 5px 6px;
  border: 1px solid ${colors.gray[200]};
  border-radius: 30px;
  margin-bottom: 8px;
  background-color: ${isRead ? '#ffffff' : '#fdf9e4'};

  &:hover {
    cursor: pointer;
  }

  .msg-field {
    margin-right: 30px;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'nanumB';
    color: ${colors.tertiary};
    font-size: 15px;

    display: flex;
    align-items: center;

    span {
      display: inline-block;
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .note-title {
    font-size: 12px;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${colors.secondary};
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
  border-radius: 100%;
  border: 2px solid ${colors.tertiary};
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;

  .notification-icon {
    display: flex;
    align-items: center;
    color: ${colors.tertiary};
    margin-bottom: 2px;
    margin-left: 1px;
  }
`;
