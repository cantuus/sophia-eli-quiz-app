const headerSlot = document.getElementsByClassName("quiz-header")[0];
const containerSlot = document.getElementsByClassName("quiz-container")[0];
const footer = document.getElementById("templates");

const handleSelection = (question, correct, element) => {
  const totalQuestions = store.questions.length;

  if (correct) {
    store.score++;
    store.currentQuestion++;
    let index = store.currentQuestion;

    element.querySelector(
      "#question-text"
    ).textContent = `yep, that's correct.`;

    setTimeout(() => {
      if (store.currentQuestion == totalQuestions) {
        let passing = store.score >= 4 ? true : false;
        return renderEndScreen(passing);
      }

      return renderQuestion(
        store.questions[index].question,
        store.questions[index].options,
        store.questions[index].answer,
        index
      );
    }, 2000);
  } else {
    element.querySelector(
      "#question-text"
    ).textContent = `nope, the answer is actually ${question.answer}.`;

    store.currentQuestion++;
    let index = store.currentQuestion;

    setTimeout(() => {
      if (store.currentQuestion == totalQuestions) {
        let passing = store.score >= 4 ? true : false;
        return renderEndScreen(passing);
      }

      return renderQuestion(
        store.questions[index].question,
        store.questions[index].options,
        store.questions[index].answer,
        index
      );
    }, 2000);
  }
};

const renderQuestion = (question, options, answer, index) => {
  const header = footer.querySelector("#question-header").cloneNode(true);
  const container = footer.querySelector("#question-screen").cloneNode(true);

  headerSlot.innerHTML = "";
  containerSlot.innerHTML = "";

  headerSlot.appendChild(header);
  containerSlot.appendChild(container);

  header.querySelector("#questionNumber").textContent = index + 1;
  header.querySelector("#questionTotal").textContent = store.questions.length;
  header.querySelector("#totalScore").textContent = store.score;

  const questionContainer = container.querySelector(".question-container");
  questionContainer.querySelector("#question-text").textContent = question;
  container.querySelector("#submit-button").removeAttribute;

  const form = container.querySelector("#questionForm");
  form.querySelector("#answerOne").value = options[0];
  form.querySelector("[for=answerOne]").textContent = options[0];

  form.querySelector("#answerTwo").value = options[1];
  form.querySelector("[for=answerTwo]").textContent = options[1];

  form.querySelector("#answerThree").value = options[2];
  form.querySelector("[for=answerThree]").textContent = options[2];

  form.querySelector("#answerFour").value = options[3];
  form.querySelector("[for=answerFour]").textContent = options[3];

  form.querySelector("#answerFive").value = options[4];
  form.querySelector("[for=answerFive]").textContent = options[4];

  const handleFormSubmission = () => {
    container.querySelector("#submit-button").disabled = true;
    event.preventDefault();
    let selected;
    let radios = form.querySelectorAll("[name=answer]");

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        selected = radios[i].value;
        break;
      }
    }

    if (!Boolean(selected)) return false;

    const questionObject = store.questions.find(
      item => item.question == question
    );

    handleSelection(questionObject, selected == answer, questionContainer);
  };

  container
    .querySelector("#submit-button")
    .addEventListener("click", event => handleFormSubmission(event));

  form.addEventListener(
    "keydown",
    event => (event.which == 13 ? handleFormSubmission(event) : false)
  );

  // populate form fields from question options
};

const renderStartScreen = () => {
  const header = footer.querySelector("#start-header").cloneNode(true);
  const container = footer.querySelector("#start-screen").cloneNode(true);

  container.querySelector(".start-screen-img img").src = store.startScreenImg;
  container.querySelector(".start-screen-img img").alt =
    "a picture of the mario brothers";

  container.querySelector("#start-button").addEventListener("click", () => {
    renderQuestion(
      store.questions[0].question,
      store.questions[0].options,
      store.questions[0].answer,
      0
    );
    // clickStartQuiz();
  });

  headerSlot.innerHTML = "";
  containerSlot.innerHTML = "";

  headerSlot.appendChild(header);
  containerSlot.appendChild(container);
};

const renderEndScreen = success => {
  const header = footer.querySelector("#end-header").cloneNode(true);
  const container = footer.querySelector("#end-screen").cloneNode(true);

  header.querySelector("#quizResult").textContent = success
    ? "You did it!"
    : "You failed!";

  header.querySelector("#quizResultSub").textContent = success
    ? "I guess you do know your video games after all."
    : "I guess you don't know very much about video games.";

  container.querySelector(".end-screen-img img").src = success
    ? store.successImg
    : store.failImg;

  container.querySelector(".end-screen-img img").alt = success
    ? "a picture of a smiling pikachu"
    : "a picture of a sad mario";

  container
    .querySelector(".end-screen-stats")
    .querySelector(".stats-questions-correct").textContent = store.score;

  container
    .querySelector(".end-screen-stats")
    .querySelector(".stats-questions-total").textContent =
    store.questions.length;

  container.querySelector("#restart-button").addEventListener("click", () => {
    store.currentQuestion = 0;
    store.score = 0;
    renderStartScreen();
  });

  headerSlot.innerHTML = "";
  containerSlot.innerHTML = "";

  headerSlot.appendChild(header);
  containerSlot.appendChild(container);
};
