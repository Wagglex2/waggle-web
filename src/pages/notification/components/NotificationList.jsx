import NotificationItem from './NotificationItem';

const NotificationList = ({ notificationItems, handleDelete }) => {
  return (
    <ul>
      {notificationItems.map((item) => (
        <NotificationItem key={item.notificationId} item={item} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default NotificationList;
