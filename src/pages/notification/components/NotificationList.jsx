import NotificationItem from './NotificationItem';

const NotificationList = ({ notificationItems, handleDelete }) => {
  return (
    <ul>
      {notificationItems.map((item) => (
        <NotificationItem item={item} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default NotificationList;
