import './App.css'
import { useState } from "react"
import Question from './components/Question'
import NavButtons from './components/NavButtons'
import questions from './data/questions'
import Rules from './components/Rules'
import Stats from './components/Stats'
import Result from './components/Result'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])
  const [answered, setAnswered] = useState(false)
  const [resultContainerActive, setResultContainerActive] = useState(true)
  const [reviewMode, setReviewMode] = useState(false)

  const currentQuestionId = questions[currentQuestion].id
  const currentAnswer = userAnswers.find(answer => answer.questionId === currentQuestionId)
  const selectedOption = currentAnswer?.selected || selectedOptions[currentQuestionId] || ""

  if (answered !== !!currentAnswer) {
    setAnswered(!!currentAnswer)
  }

  function nextQuestion() {
    setCurrentQuestion(currentQuestion + 1)
    setAnswered(false)

    console.log("Current Question: ", currentQuestion)
  }

  function previousQuestion() {
    setCurrentQuestion(currentQuestion - 1)
    setAnswered(false)

    console.log("Current Question: ", currentQuestion)
  }

  function handleRestart() {
    setCurrentQuestion(0)
    setScore(0)
    setReviewMode(false)
    setSubmitted(false)
    setUserAnswers([])
    setSelectedOptions({})
    setAnswered(false)
  }

  const handleSetSelectedOption = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionId]: option
    })
  }

  return (
    <>
      <div className="app-container">
        <h1>MC Quiz App</h1>
        <Stats
          score={score}
          currentQuestion={currentQuestion}
          questions={questions}
          handleRestart={handleRestart}
        />
        <Question
          reviewMode={reviewMode}
          question={questions[currentQuestion]}
          selectedOption={selectedOption}
          setSelectedOption={handleSetSelectedOption}
        />

        <NavButtons
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          answered={answered}
          setAnswered={setAnswered}
          nextQuestion={nextQuestion}
          previousQuestion={previousQuestion}
          currentQuestion={currentQuestion}
          score={score}
          setScore={setScore}
          selectedOption={selectedOption}
          setSelectedOption={handleSetSelectedOption}
          setSubmitted={setSubmitted}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          handleRestart={handleRestart}
          reviewmode={reviewMode}
        />
        <Rules />
        <Result
          currentQuestion={currentQuestion}
          questions={questions}
          submitted={submitted}
          score={score}
          reviewMode={reviewMode}
          setReviewMode={setReviewMode}
          resultContainerActive={resultContainerActive}
          setResultContainerActive={setResultContainerActive}
          handleRestart={handleRestart}
        />
      </div>
    </>
  )
}

export default App
