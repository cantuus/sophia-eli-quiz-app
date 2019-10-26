function clickStartQuiz() {
  console.log("starting quiz");
  $("#start-button").click(function() {
    $();
  });
}

function updateScore() {}

function updateQuestionNumber() {}

function displayQuestion() {}

function displayQuestionChoices() {}

function displayResults() {}

function handleSelection(question, correct) {
  console.log("handling selected item", question);
  console.log(`${correct ? "answer was correct" : "answer was incorrect"}`);
}

function restartQuiz() {}
