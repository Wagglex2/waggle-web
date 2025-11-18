/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../styles/theme';
import { Link, useLocation } from 'react-router-dom';
import beeImg from '../../assets/img/nav/bee.png';
import beehiveImg from '../../assets/img/nav/beehive.png';
import honeyImg from '../../assets/img/nav/honey.png';

const MainNav = ({ setOpenModal }) => {
  const location = useLocation();
  const rootPath = location.pathname.split('/').filter(Boolean)[0];

  const navbarList = [
    {
      path: '/project-list',
      name: '프로젝트',
      icon: beeImg,
      root: 'project-list',
    },
    {
      path: '/hw-list',
      name: '과제',
      icon: honeyImg,
      root: 'hw-list',
    },
    {
      path: '/study-list',
      name: '스터디',
      icon: beehiveImg,
      root: 'study-list',
    },
  ];

  return (
    <>
      <div css={container}>
        <div css={navBox}>
          {navbarList.map((item) => (
            <Link key={item.name} to={item.path}>
              <p css={category(rootPath, item.root)}>
                <img src={item.icon} />
                {item.name}
              </p>
            </Link>
          ))}
        </div>
        <button css={createBtn} onClick={() => setOpenModal(true)}>
          공고등록하기
        </button>
      </div>
    </>
  );
};

export default MainNav;

const container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid ${colors.gray[100]};
  padding: 0px 80px;
  font-family: 'nanumB';
`;

const navBox = css`
  display: flex;
  margin-top: 5px;
`;

const category = (rootPath, root) => css`
  font-size: 15px;
  margin-right: 50px;
  padding-right: 2px;
  display: flex;
  justify-content: center;
  box-shadow: ${rootPath === root ? `inset 0px -3px ${colors.primary}` : 'none'};

  &:hover {
    box-shadow: inset 0px -3px ${colors.primary};
  }

  img {
    width: 23px;
    height: 23px;
    margin-right: 3px;
    margin-left: 1px;
  }
`;

const createBtn = css`
  height: 31px;
  width: 98px;
  font-family: 'nanumB';
  font-size: 13px;
  border-radius: 10px;
  background-color: ${colors.primary};
  border: none;

  &:hover {
    background-color: ${colors.secondary};
    color: #ffffff;
  }
`;
