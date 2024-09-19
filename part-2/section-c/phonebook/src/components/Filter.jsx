const Filter = ({ show, event }) => {
    return (
        <>
            Filter by names with <input value={show} onChange={event}/>
        </>
    )
}

export default Filter