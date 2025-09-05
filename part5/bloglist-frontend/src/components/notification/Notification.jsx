import './Notification.css'

const Notification = ({ success, message }) => {
  return (
    <div className={success ? 'notif success' : 'notif error'}>
      {message}
    </div>
  )
}

export default Notification