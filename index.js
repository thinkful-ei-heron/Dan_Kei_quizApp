'use strict';
$(main);

function main() {
  loadLanding();
  startQuiz();
  submitAnswer();
  resultToQuestion();
  //on click of next button
  //if there are more questions: generateQuestion(), and then after that, submitAnswer()
  //if there are no more question: display final results
}

function loadLanding() {
  $('.main').html(
    `<h3>Test your knowledge on NFL record holders!</h3>
    <button type="button" class="startButton">Start the quiz</button>`
  );
}

function startQuiz() {
  $('.startButton').click(function() {
    generateQuestion();
  });
}

function generateQuestion() {
  let html = renderQuestionHtml() + renderOptionsHtml() + '<button type="submit">Submit</button></form>';
  $('.main').html(html);
}

function renderQuestionHtml() {
  //this is the question text
  const questionText = STORE.questions[STORE.questionNumber].question;
  return `
    <form id='answerForm'>
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
    <div>
      <input name="ansGroup" id="ans${ans}" type="radio" value ="${element}"/>
      <label for="ans${ans}" ><span>${element}</span></label>
    </div>
    `;
    ans++;
  });
  return optionsHtml;
}

//consider changing the name of this to match what it's actually doing
function submitAnswer() {
  console.log('In submitAnswer');
  let text;
  $('.main').on('submit', '#answerForm', function(event) {
    console.log('Form submitted');
    // this stops the default form submission behavior
    event.preventDefault();
    text = $('input:checked').val();
    console.log(text);
    displayAnswerPage(text);
    //doesn't need to return anymore
  });
}

function checkAnswer(val) {
  if (val === STORE.questions[STORE.questionNumber].answer) {
    return 'correct';
  } else {
    return 'wrong';
  }
}

function getResultHtml(val) {
  let result = checkAnswer(val);
  console.log('result');
  return `
  <form id='answerForm'>
  <fieldset>
    <legend class="questionText">
    <p>Your answer was ${val}: you were ${result}</p>
    <button type="submit">Submit</button>
    </legend>
  </fieldset>
  </form>
  `;
}

function displayAnswerPage(val) {
  let result = getResultHtml(val);
  console.log('in display answer page');
  $('.main').html(result);
}

//event handler to display next question
function resultToQuestion(){
  $('.main').on('submit', '#answerForm', function(event) {
    console.log('from result to question');
    generateQuestion();
  });
}
//function to create final results page 

//function to restart quiz