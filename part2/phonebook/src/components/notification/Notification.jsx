import "./notification.css"

const Notification = ({ success, message }) => {

    if(message.length == 0) return

    return (
        <div className={success ? 'notification success' : 'notification error'}>
            {message}
        </div>
    )
}

export default Notification