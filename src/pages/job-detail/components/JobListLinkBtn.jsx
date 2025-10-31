import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const JobListLinkBtn = ({ category }) => {
  return (
    <Link to="/hw-list">
      <button type="button" className="navigation-btn">
        <IoIosArrowBack />
        {category} 목록보기
      </button>
    </Link>
  );
};

export default JobListLinkBtn;
