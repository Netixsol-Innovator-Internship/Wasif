let currentQuestionIndex = 0;
let selectedAnswers = [];
let questions = [];

document.addEventListener("DOMContentLoaded", () => {
  const quizData = JSON.parse(localStorage.getItem("quizData"));
  const selectedQuiz = localStorage.getItem("selectedQuiz");

  if (!quizData || !selectedQuiz || !quizData[selectedQuiz]) {
    document.getElementById("quizContainer").innerHTML =
      "<p class='text-center text-red-600'>No quiz selected or data missing.</p>";
    return;
  }

  questions = quizData[selectedQuiz];
  renderQuestion();
});

function renderQuestion() {
  const container = document.getElementById("quizContainer");
  const question = questions[currentQuestionIndex];

  container.innerHTML = `
        <p class="text-[#61738A] text-sm mt-2">Question ${
          currentQuestionIndex + 1
        } of ${questions.length}</p>
        <p class="text-[24px] font-bold mt-2">${question.question}</p>

        ${question.options
          .map((opt, i) => {
            const inputId = `option-${currentQuestionIndex}-${i}`;
            const isSelected = selectedAnswers[currentQuestionIndex] === i;

            return `
              <label for="${inputId}" onclick="handleOptionSelect(${i})"
                class="flex cursor-pointer border-2 transition-all duration-150 md:w-full h-14 gap-x-4 items-center px-4 rounded-xl mt-2
                  ${
                    isSelected
                      ? "border-blue-600 bg-blue-100"
                      : "border-gray-300 hover:bg-gray-100"
                  }">
                <input type="radio" id="${inputId}" name="option" value="${i}" class="hidden" ${
              isSelected ? "checked" : ""
            } />
                <p class="font-medium">${opt}</p>
              </label>
            `;
          })
          .join("")}

        <div class="mt-4 md:w-full flex justify-between">
          <button onclick="goToPrevious()" class="bg-slate-300 px-4 py-2 rounded-md ${
            currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }" ${currentQuestionIndex === 0 ? "disabled" : ""}>Previous</button>
          <button onclick="goToNext()" class="bg-blue-600 px-6 py-2 rounded-md text-white">
            ${currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      `;
}

function handleOptionSelect(index) {
  selectedAnswers[currentQuestionIndex] = index;
  renderQuestion(); // Re-render to reflect updated selection visually
}

function goToNext() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    calculateResult();
  }
}

function goToPrevious() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function calculateResult() {
  let score = 0;
  questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.correctIndex) {
      score++;
    }
  });

  alert(`Quiz Completed!\nYour Score: ${score} / ${questions.length}`);
  console.log("Selected Answers:", selectedAnswers);
  console.log("Score:", score);
}
