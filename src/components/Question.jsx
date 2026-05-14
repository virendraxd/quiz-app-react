
function Question({ reviewMode, answered, question, selectedOption, setSelectedOption }) {

    const handleOptionClick = (option) => {
        // clicked color change
        setSelectedOption(option)
    }

    return (
        <div className="question-container">
            <div className="question">
                {`Q.${question.id}) ${question.question}`}
            </div>
            <div>
                {question.options.map((option, index) => (
                    <button
                        disabled={answered}
                        key={index}
                        className={
                            reviewMode
                                ? option === question.answer
                                    ? "correct"
                                    : selectedOption === option
                                        ? "wrong"
                                        : "option"
                                : selectedOption === option
                                    ? "option-clicked"
                                    : "option"
                        }
                        onClick={() => {
                            handleOptionClick(option)
                        }}>
                        {option}
                    </button>
                ))}
            </div>
        </div >
    )
}

export default Question