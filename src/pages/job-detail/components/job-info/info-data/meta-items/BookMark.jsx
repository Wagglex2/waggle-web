import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import api from '@/api/api';

const BookMark = ({ bookMarkState, setBookMark, recruitmentId }) => {
  async function patchBookMarkState() {
    const nextState = !bookMarkState.isChecked;

    setBookMark((prev) => ({
      ...prev,
      isChecked: nextState,
    }));

    try {
      if (nextState) {
        const res = await api.post(`/api/v1/bookmarks/recruitments/${recruitmentId}`);
        const newId = res.data.data;
        console.log(res);
        setBookMark((prev) => ({
          ...prev,
          id: newId,
        }));
      } else {
        const res = await api.delete(`/api/v1/bookmarks/${bookMarkState.id}`);
        console.log(res);

        setBookMark((prev) => ({
          ...prev,
          id: -1,
        }));
      }
    } catch (e) {
      console.error(e);
      if (e.status === 403) alert('어쩌구저쩌구');
      else alert('실패. 다시 시도해 주세요.');
    }
  }

  return (
    <button type="button" className="like-btn box-style" onClick={patchBookMarkState}>
      {bookMarkState.isChecked ? (
        <FavoriteIcon style={{ color: '#FA9394', fontSize: '20px', marginRight: '5px' }} />
      ) : (
        <FavoriteBorderIcon style={{ fontSize: '20px', marginRight: '5px' }} />
      )}
      찜하기
    </button>
  );
};

export default BookMark;
