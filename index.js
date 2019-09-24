'use strict';
$(main);

function main() {
  loadLanding();
  submitAnswer();
  resultToQuestion();
  restartQuiz();
}

//loadLanding() injects landing page HTML into main, then starts quiz
function loadLanding() {
  $('.main').html(
    `<div aria-live= "polite" class ="startScreen">
    <h2>Test your knowledge on NFL record holders!</h3>
    <button type="button" class="startButton">Start The Quiz</button>
    </div>`
  );
  startQuiz();
}

//startQuiz() is an event handler that generate and displays questions on click
function startQuiz() {
  $('.startButton').click(function() {
    generateQuestion();
  });
}

//generateQuestion() injects question and answer options and submit button HTML into main
function generateQuestion() {
  let html =
    renderQuestionHtml() + renderOptionsHtml() + '<button type="submit">Submit</button></form></div>';
  $('.main').html(html);
}

//renderQuestionHtml() generate the HTML string to display question text that will be injected into main based on question number
function renderQuestionHtml() {
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


//renderQuestionHtml() generate the HTML string to display the answer options that will be injected into main based on question number
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

//subtmitAnswer() is an event handler that on submit checks the answer and injects HTML for the question results page
function submitAnswer() {
  let text;
  $('.main').on('submit', '#answerForm', function(event) {
    event.preventDefault();
    text = $('input:checked').val();
    displayAnswerPage(text);
    STORE.questionNumber++;
  });
}

//checkAnswer() passes the user-submitted answer selection and checks if it is correct against the STORE object
function checkAnswer(val) {
  if (val === STORE.questions[STORE.questionNumber].answer) {
    STORE.score++;
    return 'correct';
  } else {
    return 'wrong';
  }
}

//getResultHtml() returns the question result HTML as a string, based on user's answer (correct/incorrect)
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

//appendImage() is a functional that returns the HTML necessary to display the correct answer on the question results page
function appendImage() {
  let key = STORE.questions[STORE.questionNumber].answer;
  return `
    <img class='answerImage' src=${STORE.images.get(key)} alt=${key}>
  `;
}

//displayAnswerPage() takes the submitted answer parameter and injects HTML into main
function displayAnswerPage(val) {
  let result = getResultHtml(val);
  $('.main').html(result);
}

//resultToQuestion() is an event handler that displays the next question text on submit, if last question has been displayed display final results
function resultToQuestion() {
  $('.main').on('submit', '#resultForm', function() {
    event.preventDefault();
    if (STORE.questionNumber === STORE.questions.length) displayFinalResults();
    else generateQuestion();
  });
}

//generatelFinalResultsHtml creates final results page html
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
    imgSrc = 'images/rookie.jpg';
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

//injects final results page HTML into main
function displayFinalResults() {
  let html = generateFinalResultsHtml();
  $('main').html(html);
}

//function to restart quiz, runs loadLanding() to restart quiz
function restartQuiz() {
  $('.main').on('submit', '#finalResultForm', function(event) {
    event.preventDefault();
    STORE.questionNumber = 0;
    STORE.score = 0;
    loadLanding();
  });
}
