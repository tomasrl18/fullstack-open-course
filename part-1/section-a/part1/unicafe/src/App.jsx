import { useState } from 'react'

const CustomTitle = ({ text }) => {
  return <h1>{text}</h1>
}

const AllStatistics = (props) => {
  const show = props.totalComments == 0 ? false : true
  
  if (show) {
    return (
      <>
        <br />
        <span>Total comments: {props.totalComments}</span>
        <br />
        <span>Average comments: {props.avgComments}</span>
        <br />
        <span>Positive comments: {props.positiveComments}</span>
      </>
    )
  }

  return (
    <>
      <br />
      <span>No feedback given</span>
    </>
  )
}

const StatisticsLine = ({ text, feedback }) => {
  return (
    <>
      <span>{text} feedback: {feedback}</span>
      <br />
    </>
  )
}

const Button = ({ text, event }) => {
  return <button onClick={event}>{text}</button>
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

      <Button text="Good" event={handleGoodFeedback} />
      <Button text="Neutral" event={handleNeutralFeedback} />
      <Button text="Bad" event={handleBadFeedback} />
     
      <br />
      <br />

      <CustomTitle text="Statistics"/>

      <StatisticsLine text="Good" feedback={feedback.good}/>
      <StatisticsLine text="Neutral" feedback={feedback.neutral}/>
      <StatisticsLine text="Bad" feedback={feedback.bad}/>

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