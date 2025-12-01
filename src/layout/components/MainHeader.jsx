/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../styles/theme';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { logoutApi } from '@/api/auth';
import useAuthStore from '@/stores/useAuthStore';
import { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  { label: '프로젝트', value: 'project' },
  { label: '과제', value: 'homework' },
  { label: '스터디', value: 'study' },
];

const MainHeader = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  
  const dropdownRef = useRef(null);
  const inputRef = useRef(null); 

  const [keyword, setKeyword] = useState('');
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES[0]); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('q');
    const urlCategory = params.get('category');

    if (location.pathname === '/search-result') {
      if (urlQuery) setKeyword(urlQuery);
      if (urlCategory) {
        const found = CATEGORIES.find(c => c.value === urlCategory);
        if (found) setCurrentCategory(found);
      }
    } else if (/\/(project|hw|study)-list\/.+/.test(location.pathname)) {
    } else {
      setKeyword('');
      setCurrentCategory(CATEGORIES[0]);
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelectCategory = (categoryObj) => {
    setCurrentCategory(categoryObj);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }

    navigate(`/search-result?category=${currentCategory.value}&q=${keyword}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return;
      if (inputRef.current) {
        inputRef.current.blur();
      }

      handleSearch();
    }
  };

  async function handleLogout() {
    if (!confirm('로그아웃 하시겠습니까?')) return;
    try {
      await logoutApi();
    } catch (error) {
      console.error('서버 로그아웃 실패', error);
    } finally {
      logout();
      useAuthStore.persist.clearStorage();
      alert('로그아웃되었습니다.');
      navigate('/signin');
    }
  }

  return (
    <div css={container}>
      <Link to={'/'}>
        <p css={logo}>와글와글</p>
      </Link>
      
      <div css={searchBar} ref={dropdownRef}>
        <button css={dropdownBtn} onClick={toggleDropdown}>
          {currentCategory.label}
          <ArrowDropDownIcon css={dropDownIcon} />
        </button>

        {isDropdownOpen && (
          <ul css={dropdownMenu}>
            {CATEGORIES.map((cat) => {
              const isSelected = currentCategory.value === cat.value;
              return (
                <li 
                  key={cat.value} 
                  css={dropdownItemStyle(isSelected)} 
                  onClick={() => handleSelectCategory(cat)}
                >
                  {cat.label}
                </li>
              );
            })}
          </ul>
        )}

        <input 
          ref={inputRef}
          type="text" 
          placeholder="카테고리 선택 후 검색어를 입력하세요" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <SearchIcon 
          className="search-icon" 
          onClick={handleSearch}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div css={btnBox}>
        <Link to={'/notification'}>
          <button>알림</button>
        </Link>
        <Link to={'/my-page/profile'}>
          <button>마이페이지</button>
        </Link>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
};

export default MainHeader;

const container = css`
  width: 100%;
  height: 60px;
  padding: 0px 80px;
  background-color: ${colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logo = css`
  color: ${colors.primary};
  font-family: 'logo';
  font-size: 33px;
  margin-top: 2px;
`;

const searchBar = css`
  position: relative;
  width: 40%;

  input {
    width: 100%;
    height: 40px;
    border-radius: 30px;
    border: 1px solid ${colors.gray[100]};
    padding-left: 105px;
    padding-right: 37px;
  }

  .search-icon {
    position: absolute;
    right: 12px;
    top: 8px;
    color: ${colors.gray[400]};

    &:hover {
      color: #000000;
    }
  }
`;

const dropdownBtn = css`
  height: 32px;
  width: 95px;
  border-radius: 30px;
  border: none;
  background-color: ${colors.primary};
  position: absolute;
  bottom: 4px;
  left: 4px;

  padding-top: 2px;
  padding-left: 10px;

  font-size: 14px;
  font-family: 'nanumB';

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const dropdownMenu = css`
  position: absolute;
  top: 40px; 
  left: 4px;
  width: 95px;
  background-color: white;
  border: 1px solid ${colors.gray[100]};
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  padding: 8px;
  z-index: 20;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const dropdownItemStyle = (isSelected) => css`
  padding: 8px 12px;
  font-size: 13px;
  font-family: ${isSelected ? 'nanumB' : 'nanumR'};
  cursor: pointer;
  text-align: left;
  color: #333;
  border-radius: 8px;
  background-color: ${isSelected ? '#FFF9DC' : 'transparent'};
  transition: background-color 0.2s;

  &:hover {
    background-color: #FFF9DC;
    font-family: 'nanumB';
  }
`;

const dropDownIcon = css`
  float: right;
  color: #3b3537;
`;

const btnBox = css`
  button {
    height: 30px;
    padding: 2px 10px 0px 10px;
    margin-right: 8px;
    font-family: 'nanumR';
    font-size: 12px;
    border-radius: 10px;
    border: 1px solid ${colors.gray[100]};

    &:hover {
      background-color: #ffffff;
    }
  }
`;