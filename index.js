'use strict';
$(main);

function main() {
  loadLanding();
  //startQuiz();
  submitAnswer();
  resultToQuestion();
  restartQuiz();
}

function loadLanding() {
  $('.main').html(
    `<div aria-live= "polite" class ="startScreen">
    <h2>Test your knowledge on NFL record holders!</h3>
    <button type="button" class="startButton">Start The Quiz</button>
    </div>`
  );
  startQuiz();
}

function startQuiz() {
  $('.startButton').click(function() {
    generateQuestion();
  });
}

function generateQuestion() {
  let html =
    renderQuestionHtml() + renderOptionsHtml() + '<button type="submit">Submit</button></form></div>';
  $('.main').html(html);
}

function renderQuestionHtml() {
  //this is the question text
  const questionText = STORE.questions[STORE.questionNumber].question;
  return `
  <div aria-live= "polite" class="formContainer">
    <p class="questionNumber">Question: ${1 + STORE.questionNumber}/10</p>
    <p class="score">Score: ${STORE.score}</p>
    <form id='answerForm' class='answerForm'>
    <fieldset>
      <legend class="questionText">
        ${questionText}
      </legend>
    </fieldset>
  `;
}

function renderOptionsHtml() {
  const optionsText = STORE.questions[STORE.questionNumber].options;
  let optionsHtml = '';
  let ans = 1;
  optionsText.forEach(element => {
    optionsHtml += `
    <label aria-live= "polite" class="answerContainer ans${ans}" for="ans${ans}"><input name="ansGroup" id="ans${ans}" type="radio" value ="${element}" required>
    <span>${element}</span></input></label>
    `;
    ans++;
  });
  return optionsHtml;
}

//consider changing the name of this to match what it's actually doing
function submitAnswer() {
  let text;
  $('.main').on('submit', '#answerForm', function(event) {
    // this stops the default form submission behavior
    event.preventDefault();
    text = $('input:checked').val();
    displayAnswerPage(text);
    STORE.questionNumber++;
    //doesn't need to return anymore
  });
}

function checkAnswer(val) {
  if (val === STORE.questions[STORE.questionNumber].answer) {
    STORE.score++;
    return 'correct';
  } else {
    return 'wrong';
  }
}

function getResultHtml(val) {
  let result = checkAnswer(val);
  if (result === 'correct') {
    return `
    <div aria-live= "polite" class="formContainer">
      <p class="questionNumber">Question: ${STORE.questionNumber + 1}/10</p>
      <p class="score">Score: ${STORE.score}</p>
      <form id='resultForm' class='resultForm'>
        <fieldset>
          <legend class="questionText">
            <p><span class="resultText">That is ${result}!</span><br><br>
            You answered ${val}.</p>
            ${appendImage()}
            <button class= "answerButton" type="submit">Next</button>
          </legend>
        </fieldset>
      </form>
    </div>
    `;
  } else {
    return `
    <div aria-live= "polite" class="formContainer">
      <p class="questionNumber">Question: ${STORE.questionNumber + 1}/10</p>
      <p class="score">Score: ${STORE.score}</p>
      <form id='resultForm' class='resultForm'>
        <fieldset>
          <legend class="questionText">
            <p><span class="resultText">That is ${result}!</span><br><br>
            You answered ${val}.<br>
            The correct answer is
            ${STORE.questions[STORE.questionNumber].answer}.</p>
            ${appendImage()}
            <button class= "answerButton" type="submit">Next</button>
          </legend>
        </fieldset>
      </form>
    </div>
  `;
  }
}

function appendImage() {
  let key = STORE.questions[STORE.questionNumber].answer;
  return `
    <img class='answerImage' src=${STORE.images.get(key)} alt=${key}>
  `;
}

function displayAnswerPage(val) {
  let result = getResultHtml(val);
  $('.main').html(result);
}

//event handler to display next question
function resultToQuestion() {
  $('.main').on('submit', '#resultForm', function() {
    event.preventDefault();
    if (STORE.questionNumber === STORE.questions.length) displayFinalResults();
    else generateQuestion();
  });
}

//function to create final results page html
function generateFinalResultsHtml() {
  let imgSrc;
  let grade;
  let score = STORE.score;
  if (score >= 8) {
    grade = 'You are an NFL legend!';
    imgSrc = 'images/legend.jpg';
  } else if (score >= 6) {
    grade = 'You are a rising star!';
    imgSrc = 'images/risingStar.jpg';
  } else if (score >= 4) {
    grade = 'You are an NFL rookie!';
    imgSrc = 'images/risingStar.jpg';
  } else {
    grade = 'You are an NFL bust!';
    imgSrc = 'images/bust.jpg';
  }

  return `
  <div aria-live= "polite" class="formContainer">
    <form id='finalResultForm' class='finalResultForm'>
      <fieldset>
        <legend class="questionText">
        <p>Final score: ${score}/10.<br><br><br>
        ${grade}</p>
        <img src="${imgSrc}" alt="grade">
        <button type="submit">Restart Quiz</button>
        </legend>
      </fieldset>
    </form>
  </div>
  `;
}

function displayFinalResults() {
  let html = generateFinalResultsHtml();
  $('main').html(html);
}

//function to restart quiz
function restartQuiz() {
  $('.main').on('submit', '#finalResultForm', function(event) {
    event.preventDefault();
    STORE.questionNumber = 0;
    STORE.score = 0;
    loadLanding();
  });
}
