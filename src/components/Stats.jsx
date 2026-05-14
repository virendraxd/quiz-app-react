import React from 'react';
import { RiResetLeftFill } from "react-icons/ri";

function Stats({ score, currentQuestion, questions, handleRestart }) {

  return (
    <>
      <div className="stats-container">
        <ul>
          <li>
            Q. {currentQuestion + 1}/{questions.length}
          </li>
        </ul>
        <div>
          <button
            title="Reset"
            className="reset-btn"
            onClick={handleRestart}
          >
            <RiResetLeftFill />
          </button>
          {/* Score: {score} */}
        </div>
      </div>
    </>
  )
}

export default Stats