const STORE = [
  { //1
    question: 'How long is a Rugby Union match typically?',
    answers: [
      '40 minutes',
      '60 minutes',
      '80 minutes',
      '100 minutes'
    ],
    correctAnswer:
      '80 minutes'
  },
  { //2
    question: 'How many positions are in Rugby Union?',
    answers: [
      '5',
      '10',
      '15',
      '20'
    ],
    correctAnswer:
      '15'
  },
  { //3
    question: 'What country does Rugby originate from?',
    answers: [
      'United States of America',
      'England',
      'New Zealand',
      'Australia'
    ],
    correctAnswer:
      'England'
  },
  { //4
    question: 'What sport was Rugby derived from?',
    answers: [
      'American Football',
      'Soccer',
      'Australian rules Football',
      'Cricket'
    ],
    correctAnswer:
      'Soccer'
  },
  { //5
    question: 'How many timeouts are there per team?',
    answers: [
      '3',
      '4',
      '5',
      'there are no timeouts'
    ],
    correctAnswer:
      'there are no timeouts'
  },
  { //6
    question: 'Which international team first implemented the early stages of the "modern" scrum?',
    answers: [
      'New Zealand',
      'South Africa',
      'Wales',
      'England'
    ],
    correctAnswer:
      'New Zealand'
  },
  { //7
    question: 'How many points is a Try worth?',
    answers: [
      '3',
      '5',
      '7',
      '9'
    ],
    correctAnswer:
      '5'
  },
  { //8
    question: 'Who invented Rugby?',
    answers: [
      'Jesus Christ',
      'John Madden',
      'James Peterson',
      'William Webb Ellis'
    ],
    correctAnswer:
      'William Webb Ellis'
  },
  { //9
    question: 'What used to be called a "loose scrum"?',
    answers: [
      'tackle',
      'maul',
      'ruck',
      'support'
    ],
    correctAnswer: 'ruck'
  },
  { //10
    question: 'What is the max number of players that can be on the active roster on match day?',
    answers: [
      '20',
      '21',
      '22',
      '23'
    ],
    correctAnswer: '23'
  }
];



let currentQuestionNumber = 0;
let currentScore = 0;
let currentQuestion = 0;


let showQuestion = function (q) {
  let html = `
            <fieldset>               
    <form class= 'question-form'> 
    <h3>${q.question}</h3>               
      <ul>
        <li><input type='radio' value='${q.answers[0]}' name='option' id='answer'>${q.answers[0]}</input></li>
        <li><input type='radio' value='${q.answers[1]}' name='option' id='answer'>${q.answers[1]}</input></li>
        <li><input type='radio' value='${q.answers[2]}' name='option' id='answer'>${q.answers[2]}</input></li>
        <li><input type='radio' value='${q.answers[3]}' name='option' id='answer'>${q.answers[3]}</input></li>
    </ul> 
    <input type='submit' class='submit-answer'></input>
    </form>
   </fieldset>
   `
  $('#the-question').show();
  $('#the-question').html(html);
  header();
};



function renderQuestion() {
  $('#start-button').on('click', function (event) {
    let question = STORE[currentQuestionNumber];
    showQuestion(question);
    $('#start-screen').hide();
  });


};

let correctAnswer = function () {
  let html =
    `<div class = 'correct-answer-screen'>
         <h2>That was correct!</h2>
           <div class= 'container-box'>
            <img class= 'answer-picture' 
            src= 'http://stadiumastro-kentico.s3.amazonaws.com/stadiumastro/media/perform-article/2018/mac/18/jacobstockdale-cropped_8tj0k251ve3b1nemjdj11o0k7.jpg?ext=.jpg' alt= 'a player scoring a try'>
           </div>
          <button id='nextQuestion'>Next  Question</button>
        </div>`
  $('#feedback').show();      
  $('#feedback').html(html);
  $('#the-question').hide();
  currentQuestionNumber = currentQuestionNumber + 1;
}

let wrongAnswer = function () {
  let html =
    `<div class = 'incorrect-answer-screen'>
                <h2>Sorry! That was incorrect</h2>
                <div class= 'container-box'>
                  <img class= 'answer-picture' 
                  src= 'https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F8ec4734a-dd35-11e9-82bd-8d46f6325aea.jpg?crop=1800%2C1012%2C497%2C22&resize=685' alt= 'a player getting tackled'>
                </div>
                   <p>The correct answer was '${STORE[currentQuestionNumber].correctAnswer}'</p>
                <button id='nextQuestion'>Next Question</button>`
  $('#feedback').show();               
  $('#feedback').html(html);
  $('#the-question').hide();
  currentQuestionNumber = currentQuestionNumber + 1;
}
function header() {
  let html = `<header>   
                    <span>Question: ${currentQuestionNumber + 1}/${STORE.length}</span>
                    <br />
                    <span>Current Score: ${currentScore}/${currentQuestionNumber}</span>

                </header>`
  $('#header').html(html);

}

function selectOption() {
  $('body').on('click', '.submit-answer', (event) => {
    event.preventDefault();

    const selected = $('input[name=option]:checked').val();
    const rightAnswer = STORE[currentQuestionNumber].correctAnswer;


    if (selected) {
      if (selected === rightAnswer) {
        currentScore = currentScore + 1;
        correctAnswer();
      } else {
        wrongAnswer();
      }
    } else {
      alert('Yo select something!');
    }
  });
  
};


function nextQuestion() {
  $('body').on('click', '#nextQuestion', (event) => {
    let question = STORE[currentQuestionNumber];
    $('#the-question').show();
    $('#feedback').hide();
    if (question) {
      showQuestion(question);
    } else {
      showFinalScreen();
    };
  });
};


function showFinalScreen() {
  $('#the-question').hide();
  $('#header').hide();
  $('#feedback').hide();
  $('#final-score').text(currentScore);
  $('#end-quiz-screen').show();
}

function restartQuiz() {
  $('#restartQuiz').on('click', function (event) {
    currentQuestionNumber = 0;
    currentScore = 0;
    let question = STORE[currentQuestionNumber];
    showQuestion(question);
    $('#start-screen').hide();
    $('#end-quiz-screen').hide();
    $('#header').show();
  });

}


function handleQuizApp() {
  renderQuestion();
  selectOption();
  nextQuestion();
  restartQuiz();
}

$(handleQuizApp);
