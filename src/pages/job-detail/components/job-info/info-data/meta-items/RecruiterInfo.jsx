const RecruiterInfo = ({ imgUrl, userNickname, setIsProfileOpen }) => {
  return (
    <div className="user-info" onClick={() => setIsProfileOpen(true)}>
      <div className="user-img">
        <img src={imgUrl} />
      </div>
      <p className="user-name">{userNickname}</p>
    </div>
  );
};

export default RecruiterInfo;
