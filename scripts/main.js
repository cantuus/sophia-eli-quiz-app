
let questionNumber = 1;
let score = 0;
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
    updateQuestionNumText(questionNumber);
    
    score = 0;
}

// start quiz
$("#start-button").click(function () {
    $('#question-header').show();
    $('#question-screen').show();
    $('#start-header').hide();
    $('#start-screen').hide();
    $('#next-button').hide();
    $('#submit-button').show();
    $('#validation-container').hide();
});

// submit button
$('#submit-button').click(function (e) {
    e.preventDefault();
    $('#submit-button').hide();
    $('#next-button').show();

    // hide questions and selections
    $('#question-container').hide();
    // score is inputted
    // text shows up based on your selection. Text says You got it! or Wrong
    $('#validation-container').show();
    // if statement to determine if user is on the last question
    if (questionNumber === 5) {
        $('#question-header').hide();
        $('#question-screen').hide();
        $('#start-header').hide();
        $('#start-screen').hide();
        $('#next-button').hide();
        $('#end-screen').show();
    }
});

// next button
$('#next-button').click(function (e) {
    e.preventDefault();
    $('#submit-button').show();
    $('#next-button').hide();
    $('#validation-container').hide();
    $('#question-container').show();
    // next question and selections shows up
    // question number is updated
    questionNumber++;
    updateQuestionNumText(questionNumber);
});

// restart quiz button
$('#restart-button').click(function(){
    initStartScreen();

})

// changes text for question number
function updateQuestionNumText(questionNumber) {
    $('#questionNumber').text(questionNumber);
}
// 

function handleSelection(question, correct) {
    console.log("handling selected item", question);
    console.log(`${correct ? "answer was correct" : "answer was incorrect"}`);
}


function updateScore() { }



function updateSelections() {
    //Based on the current Question number, it will go retrieve the appropriate options
}

function displayQuestion() {
    let question = STORE.questions([question]); //access and display the appropriate question
    updateScore();
    updateQuestionNumText();

    let questionHtml = $(`<div id="question-header">
<h1 id="quizResult">Question <span id="questionNumber">1</span> out of <span id="questionTotal">5</span></h1>
<div class="question-status">score: <span id="totalScore">0</span></div>
</div>

<section id="question-screen">
<div class="question-container">
  <p id="question-text">` + question + `
  <form id="questionForm" action="" method="post">
    <div>
      <input required id="answerOne" type="radio" name="answer" value="">
      <label for="answerOne">answer 1</label>
    </div>
    <div>
      <input id="answerTwo" type="radio" name="answer" value="">
      <label for="answerTwo">answer 2</label>
    </div>
    <div>
      <input id="answerThree" type="radio" name="answer" value="">
      <label for="answerThree">answer 3</label>
    </div>
    <div>
      <input id="answerFour" type="radio" name="answer" value="">
      <label for="answerFour">answer 4</label>
    </div>
    <div>
      <input id="answerFive" type="radio" name="answer" value="">
      <label for="answerFive">answer 5</label>
    </div>
  </form>
</div>
<div class="button-container start-screen-button">
  <button id="submit-button" type="submit" form="questionForm">submit answer</button>
</div>
</section>
`)

    $(".question-screen").html(questionHtml);

    updateSelections();

    $("#question-screen").hide(/*previousquestion*/);

}

function displayResults() { }

//checks if answer was right or wrong


function displayFinalResults() {
    //If User reaches the last question and received 3 or less on the quiz the following message will occur else keep default html
    $("#quizResult").text("Boo Hoo!");
    $("#quizResultSub").text("Maybe we'll keep the game controller away from you...");

    let failImg = $(`<div class="end-screen-img">
        <img src="`+ sad - mario.png + `" alt=" ${'sad-mario'} ">
        <div class="end-screen-stats">
          Questions correct: <span class="stats-questions-correct">0</span> out of <span class="stats-questions-total">5</span>
        </div>
      </div>`)

    $("#end-screen-img").html(failImg);
}
//restarts the quiz
function restartQuiz() {
    $("#restart-button").click(function () {
        displayQuestion();
    })
}
