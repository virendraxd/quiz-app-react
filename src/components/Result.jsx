import { RiResetLeftFill } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";

function Result({ resultContainerActive, setResultContainerActive, setReviewMode, submitted, score, selectedOption, currentQuestion, questions, handleRestart }) {

    const BTN_TEXTS = {
        reviewAnswers: "Review Answers",
        restartQuiz: "Restart Quiz"
    }

    return (
        <>{
            submitted && (
                <div
                    className={
                        resultContainerActive
                            ? "result-overlay"
                            : "result-overlay hidden"
                    }
                >
                    <div className="result-container">
                        <h1>Result</h1>
                        <p>Your score is</p>
                        <p>{score + (selectedOption === questions[currentQuestion].answer ? 1 : 0)}/{questions.length}</p>
                        <div className="result-buttons">
                            <button
                                className="primary-buttons"
                                onClick={() => {
                                    setReviewMode(true);
                                    setResultContainerActive(false);
                                }}
                            >
                                <IoEyeSharp /> {BTN_TEXTS.reviewAnswers}
                            </button>
                            <button
                                id="restart-btn"
                                className="primary-buttons"
                                onClick={handleRestart}
                            >
                                <RiResetLeftFill /> {BTN_TEXTS.restartQuiz}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Result