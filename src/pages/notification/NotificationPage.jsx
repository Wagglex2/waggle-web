/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/theme';
import { useEffect, useState } from 'react';
import NotificationList from './components/NotificationList';
import api from '@/api/api';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
  const [notifications, setNotifications] = useState([]);
  const [pageInfo, setPageInfo] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // 알림 목록 조회 api
  useEffect(() => {
    async function getNotificationList() {
      try {
        const res = await api.get(
          `/api/v1/notifications?category=${filterCatagory[activeFilterIndex].name}&page=${currentPage - 1}&size=8`
        );
        setNotifications(res.data.data.content);
        setPageInfo(res.data.data.page);
      } catch (e) {
        console.error(e);
      }
    }

    getNotificationList();
  }, [activeFilterIndex, currentPage]);

  // 전체 삭제, 카테고리별 전체 삭제 api
  async function deleteAllNotifications() {
    const categoryName = filterCatagory[activeFilterIndex].name;
    const categoryDesc = filterCatagory[activeFilterIndex].desc;

    if (notifications?.length === 0) {
      alert('삭제할 알림이 없습니다.');
      return;
    }

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
      await api.delete(`/api/v1/notifications?category=${categoryName}`);
      const successMessage =
        categoryName === ''
          ? '알림이 모두 삭제되었습니다.'
          : `${categoryDesc} 카테고리의 알림이 모두 삭제되었습니다.`;

      alert(successMessage);
      handleDeleteAll();
    } catch (e) {
      console.log(e);
      alert('알림 삭제에 실패하였습니다. 다시 시도해 주세요.');
    }
  }

  // 전체 삭제, 카테고리별 전체 삭제(ui)
  function handleDeleteAll() {
    setNotifications([]);
  }

  // 개별 삭제(ui)
  function handleDelete(itemId) {
    setNotifications(notifications.filter((item) => item.notificationId !== itemId));
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
              {item.desc}
            </li>
          ))}
        </ul>
        <button css={allDeleteBtn} onClick={deleteAllNotifications}>
          전체삭제
        </button>
      </header>
      <p css={total}>총 {pageInfo.totalElements}건</p>
      {/* 알림내역 */}
      {notifications.length === 0 ? (
        <p css={noNotificationBox}>조회된 알림이 없습니다.</p>
      ) : (
        <NotificationList notificationItems={notifications} handleDelete={handleDelete} />
      )}

      {pageInfo.totalPages !== 0 && (
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Pagination
            count={pageInfo.totalPages}
            page={currentPage}
            onChange={(_, value) => {
              setCurrentPage(value);
            }}
          />
        </Stack>
      )}
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
  margin-bottom: 40px;
  font-family: 'nanumEB';
`;

const contentHeader = css`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 5px 0;
  border-bottom: 1px solid ${colors.gray[100]};
`;

const filterBox = css`
  display: flex;
  align-items: center;
  height: 38px;
  border: 1px solid ${colors.gray[200]};
  border-bottom: none;
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

const noNotificationBox = css`
  width: 662px;
  height: 400px;
  border: 1px dashed ${colors.gray[300]};
  border-radius: 10px;
  text-align: center;
  line-height: 400px;
  vertical-align: middle;
  font-family: 'nanumR';
  color: ${colors.gray[400]};
`;

const total = css`
  font-size: 12px;
  margin-top: 8px;
  margin-right: 15px;
  margin-bottom: 7px;
  text-align: end;
  color: ${colors.secondary};
`;
