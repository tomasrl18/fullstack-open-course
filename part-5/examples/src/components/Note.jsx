const Note = ({ important, content, toggleImportance }) => {
    const label = important ? 'Make not important' : 'Make important'
  
    return (
      <li className="note">
        {content} 
        <button className="importantButton" onClick={toggleImportance}>{label}</button>
      </li>
    )
  }

export default Note