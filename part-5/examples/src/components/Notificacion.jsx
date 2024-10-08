const Notification = ({ message, type }) => {
    if (!message) {
      return null
    }

    if (type === 'success') {
        return (
            <div className='message success'>
                {message}
            </div>
        )
    }

    return (
        <div className='message error'>
            {message}
        </div>
    )
}

export default Notification