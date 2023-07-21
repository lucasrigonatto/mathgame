$(document).ready(function () {

    var question;
    var currentScore = 0;
    var scoreArr = [];
    var numberChosen = 10;
  
    var types = ['+'];
    var selected;
    var selectType = function () {
      selected = (_.sample(types)).toString();
      return selected;
    };
  
    var questionGenerator = function () {
      var leftNum = Math.ceil(Math.random() * numberChosen);
      var rightNum = Math.ceil(Math.random() * numberChosen);
      selectType();
  
      if (selected == '-') {
        if (leftNum <= rightNum) {
          return questionGenerator();
        };
      } else if (selected == '/') {
        if (leftNum % rightNum !== 0 || leftNum <= rightNum || rightNum == 1) {
          return questionGenerator();
        } 
      } else if (selected == '*') {
          if (leftNum == 1 || rightNum == 1) {
            return questionGenerator();
          };
        }
  
      switch (selected) {
        case "+":
          var questionDisplay = leftNum + ' ' + selected + ' ' + rightNum;
          $('#question').html(questionDisplay);
          question = leftNum + rightNum;
          break;
        case "-":
          var questionDisplay = leftNum + ' ' + selected + ' ' + rightNum;
          $('#question').html(questionDisplay);
          question = leftNum - rightNum;
          break;
        case "*":
          var questionDisplay = leftNum + ' &times; ' + rightNum;
          $('#question').html(questionDisplay);
          question = leftNum * rightNum;
          break;
        case "/":
          var questionDisplay = leftNum + ' &div; ' + rightNum;
          $('#question').html(questionDisplay);
          question = leftNum / rightNum;
          break;
      }
    };
  
    var currentScoreCount = function (score) {
      currentScore += score;
      $('.currentScore').html(currentScore);
    };
  
    var highScoreCount = function () {
      scoreArr.push(currentScore);
      var highScore = Math.max.apply(null, scoreArr);
      $('.highScore').html(highScore);
    };
  
  
    $('#answer').on('keyup', function () {
      if ($(this).val() == question) {
        check();
        updateTimeLeft(1);
        $(this).val('');
        currentScoreCount(1);
        questionGenerator();
      }
    });
  
    var timeLeft = 10;
    var timer = null;
    var timeDisplay = $('#timer');
  
    var startTimer = function () {
      if (!timer) {
        timer = setInterval(function () {
          if (timeLeft === 0) {
            updateTimeLeft(10);
            highScoreCount();
            alert('Times up! Your score is ' + currentScore + '!');
            currentScoreCount(-currentScore);
            stopTimer();
            return;
          }
          updateTimeLeft(-1);
        }, 1000);
      }
    };
  
    var updateTimeLeft = function (sec) {
      timeLeft += sec;
      timeDisplay.html(timeLeft);
    };
  
    var stopTimer = function () {
      window.clearInterval(timer);
      timer = null;
    };
  
    $('#answer').on('keydown', function () {
      startTimer();
    });
  
    var check = function () {
      types.length = 0;
      if ($('#plus').prop('checked')) {
        types.push('+');
      };
      if ($('#minus').prop('checked')) {
        types.push('-');
      };
      if ($('#times').prop('checked')) {
        types.push('*');
      };
      if ($('#divide').prop('checked')) {
        types.push('/');
      };
    }
  
    $('#numberLimit').on('submit', function (e) {
      e.preventDefault();
      $('#currentLimit').html($('#numberInput').val());
      numberChosen = $('#numberInput').val();
      $('#numberInput').val('');
    });
  
    questionGenerator();
  
  }); 