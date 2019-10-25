const footer = document.getElementById("templates");

const headerSlot = document.getElementsByClassName("quiz-header")[0];
const containerSlot = document.getElementsByClassName("quiz-container")[0];

const renderQuestion = (question, options, answer, id) => {
  const header = footer.getElementById("question-header").cloneNode(true);
  const container = footer.getElementById("question-screen").cloneNode(true);

  header.getElementById("questionNumber").textContent = id;
  header.getElementById("questionTotal").textContent = store.questions.length;
  header.getElementById("totalScore").textContent = store.score;

  container.getElementById("question-text").textContent = question;
  const form = container.getElementById("questionForm");

  // populate form fields from question options
};

const renderStartScreen = () => {
  const header = footer.getElementById("start-header").cloneNode(true);
  const container = footer.getElementById("start-screen").cloneNode(true);

  container.getElementById("start-button").addEventListener("click", () => {
    clickStartQuiz();
  });

  headerSlot.innerHTML = "";
  containerSlot.innerHTML = "";

  headerSlot.appendChild(header);
  containerSlot.appendChild(container);
};

const renderEndScreen = () => {};
