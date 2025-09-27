/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/theme';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState } from 'react';

// 임시 더미 데이터
const notificationList = [
  {
    id: 1,
    message: '새로운 프로젝트 모집 공지가 등록되었습니다.',
    date: '2025-09-20',
    category: '프로젝트',
    isRead: false,
  },
  {
    id: 2,
    message: '이번 주 과제 제출 마감일이 다가옵니다.',
    date: '2025-09-22',
    category: '과제',
    isRead: false,
  },
  {
    id: 3,
    message: '스터디 모임 일정이 변경되었습니다.',
    date: '2025-09-25',
    category: '스터디',
    isRead: true,
  },
  {
    id: 4,
    message: '프론트엔드 프로젝트 코드 리뷰가 완료되었습니다.',
    date: '2025-09-26',
    category: '프로젝트',
    isRead: false,
  },
  {
    id: 5,
    message: '데이터베이스 과제 피드백이 등록되었습니다.',
    date: '2025-09-27',
    category: '과제',
    isRead: true,
  },
  {
    id: 6,
    message: '알고리즘 스터디 자료가 업로드되었습니다.',
    date: '2025-09-28',
    category: '스터디',
    isRead: false,
  },
];

const filterItems = [
  {
    category: '전체',
    length: 15,
  },
  {
    category: '프로젝트',
    length: 5,
  },
  {
    category: '과제',
    length: 5,
  },
  {
    category: '스터디',
    length: 5,
  },
];

const NotificationPage = () => {
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [allNotifications, setAllNotifications] = useState(notificationList); // 알림 전체 원본
  const [notifications, setNotifications] = useState(notificationList); // 필터링된 알림 목록

  // 필터링
  function handleFilterChange(activeIndex, selectedCategory) {
    setActiveFilterIndex(activeIndex);

    if (selectedCategory === '전체') {
      setNotifications(allNotifications);
    } else {
      setNotifications(allNotifications.filter((item) => item.category === selectedCategory));
    }
  }

  // 전체 삭제, 카테고리별 전체 삭제
  function handleDeleteAll() {
    setNotifications([]);
    switch (activeFilterIndex) {
      case 0:
        setAllNotifications([]);
        break;
      case 1:
        setAllNotifications(allNotifications.filter((item) => item.category !== '프로젝트'));
        break;
      case 2:
        setAllNotifications(allNotifications.filter((item) => item.category !== '과제'));
        break;
      case 3:
        setAllNotifications(allNotifications.filter((item) => item.category !== '스터디'));
    }
  }

  // 개별 삭제
  function handleDelete(itemId) {
    setNotifications(notifications.filter((item) => item.id !== itemId));
    setAllNotifications(allNotifications.filter((item) => item.id !== itemId));
  }

  return (
    <div css={wrapStyle}>
      <h1 css={pageTitleStyle}>알림</h1>
      <div css={actionBoxStyle}>
        <ul css={filterBoxStyle}>
          {filterItems.map((item, i) => (
            <li
              css={filterItemStyle(activeFilterIndex, i)}
              key={i}
              onClick={() => handleFilterChange(i, item.category)}
            >
              {item.category} ({item.length})
            </li>
          ))}
        </ul>
        <button onClick={handleDeleteAll}>전체삭제</button>
      </div>
      <ul>
        {notifications.map((item) => (
          <li css={notificationItem(item.isRead)} key={item.id}>
            <div css={iconBoxStyle}>
              <NotificationsNoneIcon className="notification-icon" />
            </div>
            <p className="message">{item.message}</p>
            <p className="category">{item.category}</p>
            <p className="date">{item.date}</p>
            <button onClick={() => handleDelete(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;

const wrapStyle = css`
  width: 710px;
  height: 100vh;
  margin: auto;
  padding: 24px;

  font-family: 'nanumR';

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
  }
`;

const pageTitleStyle = css`
  font-size: 24px;
  padding: 15px 0;
  font-family: 'nanumEB';
  border-bottom: 1px solid ${colors.gray[100]};
`;

const actionBoxStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 15px 0;

  button {
    border: none;
    border-radius: 18px;
    padding: 0 15px;
    font-size: 13px;
    font-family: 'nanumR';
    background-color: #ffffff;
    color: ${colors.gray[400]};

    &:hover {
      cursor: pointer;
      color: #000000;
    }
  }
`;

const filterBoxStyle = css`
  display: flex;
  align-items: center;
  height: 38px;
  border: 1px solid ${colors.gray[200]};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;
`;

const filterItemStyle = (activeIndex, myIndex) => css`
  line-height: 38px;
  padding: 0 20px;
  border-right: 1px solid ${colors.gray[200]};
  font-size: 14px;
  background-color: ${activeIndex == myIndex ? '#fdf9e4' : '#ffffff'};

  &:last-child {
    border: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

const notificationItem = (isRead) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px 5px 5px;
  border: 1px solid ${colors.gray[200]};
  border-radius: 30px;
  margin-bottom: 8px;
  background-color: ${isRead ? '#ffffff' : '#FEF8D9'};

  .message {
    margin-right: 30px;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .category {
    width: 80px;
    text-align: center;
    font-size: 12px;
  }

  .date {
    font-size: 12px;
    margin: 0 20px;
  }

  button {
    background: none;
    border: none;
    font-size: 15px;
    color: ${colors.gray[400]};
  }
`;

const iconBoxStyle = css`
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
