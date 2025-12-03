const Message = ({ senderNickname, recruitmentTitle, type }) => {
  if (type === 'APPLICATION_SUBMITTED') {
    return (
      <div className="application-submit-msg-box">
        <p className="msg-field">{senderNickname}님이 내 공고에 지원하였습니다.</p>
        <p className="note-title">{recruitmentTitle}</p>
      </div>
    );
  }

  if (type === 'APPLICATION_REJECTED') {
    return (
      <p className="msg-field">
        "<span>{recruitmentTitle}</span>" 공고 지원이 거절되었습니다.
      </p>
    );
  }

  if (type === 'APPLICATION_ACCEPTED') {
    return (
      <p className="msg-field">
        "<span>{recruitmentTitle}</span>" 공고 지원이 수락되었습니다.
      </p>
    );
  }

  return null;
};

export default Message;
