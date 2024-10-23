import { useNotification } from '../NotificationContext';

const Notification = () => {
  const [notification] = useNotification();

  const style = {
    border: '1px solid #4CAF50',
    backgroundColor: '#dff0d8',
    color: '#3c763d',
    padding: '10px 15px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    textAlign: 'center',
  }

  if (!notification) return null;

  return <div style={style}>{notification}</div>;
}

export default Notification