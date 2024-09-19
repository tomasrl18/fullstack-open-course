const PersonForm = ({ eventOnSubmit, newNameValue, eventName, newPhoneNumberValue, eventPhoneNumbwe }) => {
    return (
        <>
            <form onSubmit={eventOnSubmit}>
                <div>
                    Name: <input value={newNameValue} onChange={eventName}/>
                </div>

                <div>
                    Phone number: <input value={newPhoneNumberValue} onChange={eventPhoneNumbwe} />
                </div>

                <div style={{marginTop: '1rem'}}>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm