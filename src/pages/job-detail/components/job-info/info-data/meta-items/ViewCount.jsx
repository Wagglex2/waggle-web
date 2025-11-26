import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const ViewCount = ({ viewCount }) => {
  return (
    <div className="view-count box-style">
      <VisibilityOutlinedIcon style={{ fontSize: '20px' }} />
      <p>{viewCount}</p>
    </div>
  );
};

export default ViewCount;
