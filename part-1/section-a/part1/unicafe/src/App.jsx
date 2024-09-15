import { useState } from 'react'

const CustomTitle = ({ text }) => {
  return <h1>{text}</h1>
}

const AllStatistics = (props) => {
  const show = props.totalComments == 0 ? false : true
  
  if (show) {
    return (
      <>
        <tr>
          <td>
            Total comments: {props.totalComments}
          </td>
        </tr>

        <tr>
          <td>
            Average comments: {props.avgComments}
          </td>
        </tr>

        <tr>
          <td>
            Positive comments: {props.positiveComments}
          </td>
        </tr>
      </>
    )
  }

  return (
    <>
      <tr>
        <td>No feedback given</td>
      </tr>
    </>
  )
}

const StatisticsLine = ({ text, feedback }) => {
  return <span>{text} feedback: {feedback}</span>
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

      <table>
        <thead>
          <tr>
            <td>
              <StatisticsLine text="Good" feedback={feedback.good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine text="Neutral" feedback={feedback.neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine text="Bad" feedback={feedback.bad} />
            </td>
          </tr>
          <AllStatistics
            feedback={feedback}
            totalComments={totalComments()}
            avgComments={avgComments()}
            positiveComments={feedback.good}
          />
        </thead>
      </table>
    </>
  )
}

export default App