import { useState } from 'react'

const CustomTitle = ({ text }) => {
  return <h1>{text}</h1>
}

const Statistics = ({feedback, text, feedbackType}) => {
  switch (feedbackType) {
    case 'good':
      return (
        <>
          <span>{text} {feedback.good}</span>
          <br />
        </>
      )
    case 'neutral':
      return (
        <>
          <span>{text} {feedback.neutral}</span>
          <br />
        </>
      )
    case 'bad':
      return (
        <>
          <span>{text} {feedback.bad}</span>
        </>
      )
  }
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

  return (
    <>
      <CustomTitle text="Give Feedback" />
     
      <button onClick={handleGoodFeedback}>Good</button>
      <button onClick={handleNeutralFeedback}>Neutral</button>
      <button onClick={handleBadFeedback}>Bad</button>
      
      <br />
      <br />

      <CustomTitle text="Statistics" />

      <Statistics text="Good feedback:" feedback={feedback} feedbackType="good" />
      <Statistics text="Neutral feedback:" feedback={feedback} feedbackType="neutral" />
      <Statistics text="Bad feedback:" feedback={feedback} feedbackType="bad" />
    </>
  )
}

export default App