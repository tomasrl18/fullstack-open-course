import { useState } from 'react'

const CustomTitle = ({ text }) => {
  return <h1>{text}</h1>
}

const AllStatistics = (props) => {
  const show = props.totalComments == 0 ? false : true
  
  if (show) {
    return (
      <>
        <span>Good feedback: {props.feedback.good}</span>
        <br />
        <span>Neutral feedback: {props.feedback.neutral}</span>
        <br />
        <span>Bad feedback: {props.feedback.bad}</span>
  
        <br />
        <br />
  
        <span>Total comments: {props.totalComments}</span>
        <br />
        <span>Average comments: {props.avgComments}</span>
        <br />
        <span>Positive comments: {props.positiveComments}</span>
      </>
    )
  }

  return <span>No feedback given</span>
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleGoodFeedback = () =>
    setFeedback({ ...feedback, good: feedback.good + 1 })

  const handleNeutralFeedback = () =>
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 })

  const handleBadFeedback = () =>
    setFeedback({ ...feedback, bad: feedback.bad + 1 })

  const totalComments = () => {
    return feedback.good + feedback.neutral + feedback.bad
  }

  const avgComments = () => {
    return totalComments() / 3
  }

  return (
    <>
      <CustomTitle text="Give Feedback" />
     
      <button onClick={handleGoodFeedback}>Good</button>
      <button onClick={handleNeutralFeedback}>Neutral</button>
      <button onClick={handleBadFeedback}>Bad</button>
      
      <br />
      <br />

      <CustomTitle text="Statistics"/>

      <AllStatistics
        feedback={feedback}
        totalComments={totalComments()}
        avgComments={avgComments()}
        positiveComments={feedback.good}
      />
    </>
  )
}

export default App