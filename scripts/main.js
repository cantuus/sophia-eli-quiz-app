let questionNumber = 1;
let score = store.score;
initStartScreen();

function initStartScreen() {
  // show after restart button
  $("#start-screen").show();
  $("#start-header").show();

  // hide headers
  $('#question-header').hide();
  $('#end-header').hide();

  // hide content, buttons
  $('#question-screen').hide();
  $('#end-screen').hide();
  $('#question-container').show();

  questionNumber = 1;
  score = 0;
  updateQuestionNumText(questionNumber);
  updateScoreNumText(score);
}

// start quiz
function renderStartQuiz() {
  $('#question-header').show();
  $('#question-screen').show();
  $('#start-header').hide();
  $('#start-screen').hide();
  $('#next-button').hide();
  $('#submit-button').show();
  $('#validation-container').hide();
  $('#question-text').text(store.questions[questionNumber - 1].question);
  $('#answerOneLabel').text(store.questions[questionNumber - 1].options[0]);
  $('#answerTwoLabel').text(store.questions[questionNumber - 1].options[1]);
  $('#answerThreeLabel').text(store.questions[questionNumber - 1].options[2]);
  $('#answerFourLabel').text(store.questions[questionNumber - 1].options[3]);
  $('#answerFiveLabel').text(store.questions[questionNumber - 1].options[4]);
}
function attachStartButtonClick() {
  $("#start-button").click(function () {
    renderStartQuiz()
  });
}

// submit button
function submitButtonClicked(e) {
  e.preventDefault();
  $('#submit-button').hide();
  $('#next-button').show();

  // hide questions and selections
  $('#question-container').hide();
  // score is inputted

  let selected = $('input[name="answer"]:checked + label').text();
  console.log(selected);
  let correctAnswer = store.questions[questionNumber - 1].answer;

  if (selected === correctAnswer) {
    $('#validation-container').show();
    $('#validation-text').text("Nice!");
    score++
  }
  else {
    $('#validation-container').show();
    $('#validation-text').text("Err Wrong!");
  }

  updateScoreNumText(score);
  // text shows up based on your selection. Text says You got it! or Wrong

  // if statement to determine if user is on the last question -> transition to end-screen
  let questionsLength = store.questions.length;
  if (questionNumber === questionsLength) {
    $('#question-header').hide();
    $('#question-screen').hide();
    $('#start-header').hide();
    $('#start-screen').hide();
    $('#next-button').hide();
    $('#end-header').show();
    $('#end-screen').show();
    $('#stats-questions-correct').text(score);

    if (score <= 3) {
      $('#end-screen-img').attr("src", "./styles/img/sad-mario.png")
      $('#quizResult').text("Boo Hoo!");
      $('#quizResultSub').text("Maybe we'll keep the controller away from you...");
    }
    else {
      $('#end-screen-img').attr("src", "./styles/img/happy-pikachu.png")
      $('#quizResult').text("You did it!");
      $('#quizResultSub').text("I guess you do know your video games after all");
    }
  }
}
function attachSubmitButtonClick() {
  $('#submit-button').click(function (e) {
    submitButtonClicked(e);
    $('input[name=answer]:checked').prop('checked', false);
  });
}

// next button
function nextButtonIsClicked(e) {
  e.preventDefault();
  $('#submit-button').show();
  $('#next-button').hide();
  $('#validation-container').hide();
  $('#question-container').show();
  // next question and selections shows up
  // question number is updated
  questionNumber++;
  updateQuestionNumText(questionNumber);
  $('#question-text').text(store.questions[questionNumber - 1].question);
  $('#answerOneLabel').text(store.questions[questionNumber - 1].options[0]);
  $('#answerTwoLabel').text(store.questions[questionNumber - 1].options[1]);
  $('#answerThreeLabel').text(store.questions[questionNumber - 1].options[2]);
  $('#answerFourLabel').text(store.questions[questionNumber - 1].options[3]);
  $('#answerFiveLabel').text(store.questions[questionNumber - 1].options[4]);
}

function attachNextButton() {
  $('#next-button').click(function (e) {
    nextButtonIsClicked(e);
    $('input[name=answer]').attr('checked', false);
  });
}
// restart quiz button
function attachRestartButton() {
  $('#restart-button').click(function () {
    initStartScreen();
  })
}

// changes text for question number
function updateQuestionNumText(questionNumber) {
  $('#questionNumber').text(questionNumber);
}

//changes text for score number
function updateScoreNumText(score) {
  $('#totalScore').text(score);
}

function handleQuiz() {
  attachStartButtonClick();
  attachSubmitButtonClick();
  attachNextButton();
  attachRestartButton();
}

$(handleQuiz);