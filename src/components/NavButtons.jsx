import questions from '../data/questions'
import Question from './Question'
import { useEffect } from 'react'
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

function NavButtons({ handleRestart, reviewmode, userAnswers, setUserAnswers, answered, setAnswered, nextQuestion, previousQuestion, currentQuestion, setScore, score, selectedOption, setSelectedOption, setSubmitted, selectedOptions, setSelectedOptions }) {

    useEffect(() => {

        localStorage.setItem(
            "quizAnswers",
            JSON.stringify(userAnswers)
        )

    }, [userAnswers])

    const handleAnswer = (option) => {
        if (answered) return

        setSelectedOption(option)

        const existingAnswerIndex = userAnswers.findIndex(
            answer => answer.questionId === questions[currentQuestion].id
        )

        const answerData = {
            questionId: questions[currentQuestion].id,
            selected: option,
            correct: option === questions[currentQuestion].answer,
        }

        let newUserAnswers
        let scoreChange = 0

        if (existingAnswerIndex !== -1) {
            const oldWasCorrect = userAnswers[existingAnswerIndex].correct
            const newIsCorrect = option === questions[currentQuestion].answer

            newUserAnswers = [...userAnswers]
            newUserAnswers[existingAnswerIndex] = answerData

            if (oldWasCorrect && !newIsCorrect) {
                scoreChange = -1
            } else if (!oldWasCorrect && newIsCorrect) {
                scoreChange = 1
            }
        } else {
            newUserAnswers = [...userAnswers, answerData]
            if (option === questions[currentQuestion].answer) {
                scoreChange = 1
            }
        }

        setUserAnswers(newUserAnswers)
        setScore(score + scoreChange)
        setAnswered(true)
    }


    const handleSubmit = () => {
        setSubmitted(true)
        setScore(0)
        setSelectedOptions({})
    }

    return (
        <>
            <div className="nav-buttons">
                <button
                    className={
                        currentQuestion === 0
                            ? "disabled primary-buttons"
                            : "primary-buttons"
                    }
                    disabled={
                        currentQuestion <= 0
                    }
                    onClick={previousQuestion}
                >
                    <GrFormPrevious /> Previous
                </button>

                {
                    reviewmode ? (
                        <button
                            className="primary-buttons"
                            onClick={handleRestart}
                            >
                                Restart
                        </button>
                    ) : (

                        <button
                            className={
                                currentQuestion === (questions.length - 1) && selectedOption
                                    ? "submit primary-buttons"
                                    : "submit primary-buttons hidden"}
                            onClick={() => {
                                handleSubmit()
                                handleAnswer(selectedOption)
                            }}
                        >
                            Submit
                        </button>
                    )}

                <button
                    className={
                        currentQuestion === (questions.length - 1) || !selectedOption
                            ? "disabled primary-buttons"
                            : "primary-buttons"
                    }
                    disabled={
                        !selectedOption ||
                        currentQuestion >= questions.length - 1
                    }
                    onClick={() => {
                        handleAnswer(selectedOption);
                        nextQuestion();
                        setAnswered(true);
                    }}
                >
                    Next <MdOutlineNavigateNext />

                </button>
            </div>
        </>
    )
}

export default NavButtons