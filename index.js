'use strict';
$(main);

function main() {
  loadLanding();
  startQuiz();
  console.log('in main after startquiz');
  console.log(submitAnswer());
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

//consider changing the name of this to match what it's actually doing
function submitAnswer() {
  console.log('In submitAnswer');
  let text;
  $('.main').on('submit', '#answerForm', function(event) {
    console.log('Form submitted');
    // this stops the default form submission behavior
    event.preventDefault();
    text = $('input:checked').val();
    displayAnswerPage(text);
    //doesn't need to return anymore
    return text;
  });
  //return text;
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
  return `
    <p>Your answer was ${result}</p>
  `;
}

function displayAnswerPage(val) {
  let result = getResultHtml(val);
  //we actually need to add a next button here
  $('.main').html(result);
}
