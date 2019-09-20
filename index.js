'use strict';
$(main);

function main() {
  loadLanding();
  startQuiz();
  console.log('in main after startquiz');
  submitAnswer();
}

function loadLanding() {
  $('.main').html(
    `<h3>Test your knowledge on NFL record holders!</h3>
    <button type="button" class="startButton">Start the quiz</button>`
  );
}

function startQuiz() {
  $('.startButton').click(function() {
    console.log('click');
    generateQuestion();
  });
}

function generateQuestion() {
  let html = renderQuestionHtml() + renderOptionsHtml() + '<button type="submit">Submit</button></form>';
  console.log(renderQuestionHtml());
  console.log(renderOptionsHtml());
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

function submitAnswer() {
  console.log('In submitAnswer');
  let text;
  $('.main').on('submit', '#answerForm', event => {
    console.log('Form submitted');
    // this stops the default form submission behavior
    event.preventDefault();
    text = $('input:checked').val();
    generateResult(text);
  });

  return text;
}

function generateResult(val) {
  let result = getResultHtml(val);
  $('.main').html(result);
}

function getResultHtml(val) {
  let result = checkAnswer(val);
  return `
    <p>Your answer was ${result}</p>
  `;
}

function checkAnswer(val) {
  if (val === STORE.questions[STORE.questionNumber].answer) {
    return 'You are correct';
  } else {
    return 'You are wrong';
  }
}
