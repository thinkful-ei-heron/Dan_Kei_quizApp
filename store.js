'use strict';
const STORE = {
  questionNumber: 0,
  score: 0,
  questions: [
    {
      question: 'What player set the record for the most touchdowns scored in a half with 5?',
      options: ['Jerry Rice', 'Randy Moss', 'Shaun Alexander', 'Don Hutson'],
      answer: 'Shaun Alexander'
    },
    {
      question: 'What player set the record for the most receptions in one season with 143 catches?',
      options: ['Marvin Harrison', 'Wes Welker', 'Antonio Brown', 'Julio Jones'],
      answer: 'Marvin Harrison'
    },
    {
      question: 'What player has the record for the most receptions in one game?',
      options: ['Wes Welker', 'Ray Rice', 'Saquon Barkley', 'Brandon Marshall'],
      answer: 'Brandon Marshall'
    },
    {
      question: 'Who is the quarterback to most recently throw for 7 touchdowns in one game?',
      options: ['Peyton Manning', 'Drew Brees', 'Nick Foles', 'Mitch Trubisky'],
      answer: 'Nick Foles'
    },
    {
      question: 'What quarterback has thrown the most career interceptions?',
      options: ['Brett Favre', 'Peyton Manning', 'Drew Brees', 'Vinny Testaverde'],
      answer: 'Brett Favre'
    },
    {
      question: 'What quarterback has thrown the most pick-sixes in their career?',
      options: ['Vinny Testaverde', 'Drew Brees', 'Peyton Manning', 'Brett Favre'],
      answer: 'Brett Favre'
    },
    {
      question: 'What wide receiver has the record for most receiving yards in a non-overtime game?',
      options: ['Calvin Johnson', 'Antonio Brown', 'Flipper Anderson', 'Josh Gordon'],
      answer: 'Calvin Johnson'
    },
    {
      question: 'What defensive player has the record for the most sacks recorded in a single season?',
      options: ['Reggie White', 'J.J. Watt', 'Lawrence Taylor', 'Michael Strahan'],
      answer: 'Michael Strahan'
    },
    {
      question: 'What player holds the record for most rushing attempts in a career?',
      options: ['Walter Payton', 'Jerome Bettis', 'Emmitt Smith', 'Curtis Martin'],
      answer: 'Emmitt Smith'
    },
    {
      question: 'What player holds the record for the most receiving TDs in his career?',
      options: ['Michael Irvin', 'Randy Moss', 'Terrell Owens', 'Jerry Rice'],
      answer: 'Jerry Rice'
    }
  ],
  images: new Map(),
  mapImages: function() {
    this.images.set('Jerry Rice', 'images/jerryRice.jpg');
    this.images.set('Emmitt Smith', 'images/emmittSmith.jpg');
    this.images.set('Michael Strahan', 'images/michaelStrahan.jpg');
    this.images.set('Calvin Johnson', 'images/calvinJohnson.jpg');
    this.images.set('Brett Favre', 'images/brettFavre.jpg');
    this.images.set('Nick Foles', 'images/nickFoles.jpg');
    this.images.set('Brandon Marshall', 'images/brandonMarshall.jpg');
    this.images.set('Marvin Harrison', 'images/marvinHarrison.jpg');
    this.images.set('Shaun Alexander', 'images/shaunAlexander.jpg');
  }
};

STORE.mapImages();
