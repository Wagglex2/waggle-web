/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/theme';
import { useEffect, useState } from 'react';
import NotificationList from './components/NotificationList';
import api from '@/api/api';

const filterCatagory = [
  {
    name: '',
    desc: '전체',
  },
  {
    name: 'project',
    desc: '프로젝트',
  },
  {
    name: 'assignment',
    desc: '과제',
  },
  {
    name: 'study',
    desc: '스터디',
  },
];

const NotificationPage = () => {
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [allNotifications, setAllNotifications] = useState([]); // 알림 전체 원본
  const [notifications, setNotifications] = useState([]); // 필터링된 알림 목록(default: 전체)
  const [seletedPage, setSeletedPage] = useState(0);

  // 알림 목록 조회 api
  useEffect(() => {
    async function getNotificationList() {
      try {
        const res = await api.get(
          `/api/v1/notifications?category=${filterCatagory[activeFilterIndex].name}&page=${seletedPage}&size=20`
        );
        console.log('알림 결과', res);
        setAllNotifications(res.data.data.content);
        setNotifications(res.data.data.content);
      } catch (e) {
        console.error(e);
      }
    }

    getNotificationList();
  }, [activeFilterIndex, seletedPage]);

  // 전체 삭제, 카테고리별 전체 삭제 api
  async function deleteAllNotifications() {
    const categoryName = filterCatagory[activeFilterIndex].name;
    const categoryDesc = filterCatagory[activeFilterIndex].desc;

    switch (activeFilterIndex) {
      case 0:
        if (confirm('모든 알림을 삭제하시겠습니까?') === false) return;
        break;
      case 1:
      case 2:
      case 3:
        if (confirm(`${categoryDesc} 카테고리의 알림을 모두 삭제하시겠습니까?`) === false) return;
        break;
    }

    try {
      const res = await api.delete(`/api/v1/notifications?category=${categoryName}`);
      const successMessage =
        categoryName === ''
          ? '알림이 모두 삭제되었습니다.'
          : `${categoryDesc} 카테고리의 알림이 모두 삭제되었습니다.`;

      alert(successMessage);
      handleDeleteAll();
      console.log(res);
    } catch (e) {
      console.log(e);
      alert('알림 삭제에 실패하였습니다. 다시 시도해 주세요.');
    }
  }

  // 전체 삭제, 카테고리별 전체 삭제(ui)
  function handleDeleteAll() {
    setNotifications([]);
    switch (activeFilterIndex) {
      case 0:
        setAllNotifications([]);
        break;
      case 1:
        setAllNotifications(allNotifications.filter((item) => item.category.desc !== '프로젝트'));
        break;
      case 2:
        setAllNotifications(allNotifications.filter((item) => item.category.desc !== '과제'));
        break;
      case 3:
        setAllNotifications(allNotifications.filter((item) => item.category.desc !== '스터디'));
    }
  }

  // 개별 삭제(ui)
  function handleDelete(itemId) {
    setNotifications(notifications.filter((item) => item.notificationId !== itemId));
    setAllNotifications(allNotifications.filter((item) => item.notificationId !== itemId));
  }

  return (
    <div css={wrap}>
      <h1 css={pageTitle}>알림</h1>

      {/* 헤더: 필터링 박스 + 전체삭제 버튼 */}
      <header css={contentHeader}>
        <ul css={filterBox}>
          {filterCatagory.map((item, i) => (
            <li
              css={filterItemStyle(activeFilterIndex, i)}
              key={item.desc}
              onClick={() => setActiveFilterIndex(i)}
            >
              {item.desc} (1)
            </li>
          ))}
        </ul>
        <button css={allDeleteBtn} onClick={deleteAllNotifications}>
          전체삭제
        </button>
      </header>

      {/* 알림내역 */}
      <NotificationList notificationItems={notifications} handleDelete={handleDelete} />
    </div>
  );
};

export default NotificationPage;

const wrap = css`
  width: 710px;
  height: 100vh;
  margin: auto;
  padding: 24px;

  font-family: 'nanumR';

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style-type: none;
    }
  }
`;

const pageTitle = css`
  font-size: 24px;
  padding: 15px 0;
  font-family: 'nanumEB';
  border-bottom: 1px solid ${colors.gray[100]};
`;

const contentHeader = css`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 15px 0;
`;

const filterBox = css`
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

const allDeleteBtn = css`
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
`;
