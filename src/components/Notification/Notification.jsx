import './Notification.css';

const Notification = ({ message }) => {
    if(message === null) {
      return null
    }
    console.log(message, 'message')
    return (
      <div className='message'>
        <h2>{message}</h2>
      </div>
    )
}

export default Notification