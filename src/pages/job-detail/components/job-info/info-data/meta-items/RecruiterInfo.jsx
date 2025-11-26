const RecruiterInfo = ({ imgUrl, userId, userNickname }) => {
  return (
    <div className="user-info">
      <div className="user-img">
        <img src={imgUrl} />
      </div>
      <p className="user-name">{userNickname}</p>
    </div>
  );
};

export default RecruiterInfo;
