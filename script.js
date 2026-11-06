$(document).ready(function () {
  var question = null;
  var currentScore = 0;
  var highScore = Number(localStorage.getItem("mathgame-high-score")) || 0;
  var numberChosen = 10;
  var timeLeft = 10;
  var timer = null;
  var playing = false;

  $(".currentScore").text(currentScore);
  $(".highScore").text(highScore);
  $("#timer").text(timeLeft);

  function selectedTypes() {
    var types = [];
    if ($("#plus").prop("checked")) types.push("+");
    if ($("#minus").prop("checked")) types.push("-");
    if ($("#times").prop("checked")) types.push("*");
    if ($("#divide").prop("checked")) types.push("/");
    return types;
  }

  function setMessage(text) {
    $("#roundMessage").text(text);
  }

  function makeQuestion() {
    var types = selectedTypes();
    if (!types.length) {
      $("#question").text("?");
      question = null;
      setMessage("Select at least one operation.");
      return false;
    }
    var guard = 0;
    while (guard < 40) {
      guard += 1;
      var left = Math.ceil(Math.random() * numberChosen);
      var right = Math.ceil(Math.random() * numberChosen);
      var selected = types[Math.floor(Math.random() * types.length)];
      if (selected === "-" && left <= right) continue;
      if (selected === "*" && (left === 1 || right === 1)) continue;
      if (
        selected === "/" &&
        (right <= 1 || left <= right || left % right !== 0)
      ) {
        continue;
      }
      var answer = left;
      var symbol = selected;
      if (selected === "+") answer = left + right;
      if (selected === "-") answer = left - right;
      if (selected === "*") {
        answer = left * right;
        symbol = "×";
      }
      if (selected === "/") {
        answer = left / right;
        symbol = "÷";
      }
      $("#question").text(left + " " + symbol + " " + right);
      question = answer;
      return true;
    }
    $("#question").text("?");
    question = null;
    setMessage("Could not build a question for this limit. Try another one.");
    return false;
  }

  function stopTimer() {
    window.clearInterval(timer);
    timer = null;
    playing = false;
  }

  function finishRound() {
    stopTimer();
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem("mathgame-high-score", String(highScore));
      $(".highScore").text(highScore);
    }
    setMessage("Time is up. Your score is " + currentScore + ".");
    currentScore = 0;
    $(".currentScore").text(currentScore);
    timeLeft = 10;
    $("#timer").text(timeLeft);
    $("#answer").val("");
  }

  function startTimer() {
    if (timer || !selectedTypes().length) return;
    playing = true;
    setMessage("");
    timer = window.setInterval(function () {
      timeLeft -= 1;
      $("#timer").text(timeLeft);
      if (timeLeft <= 0) finishRound();
    }, 1000);
  }

  $("#answer").on("keydown", function (event) {
    if (event.key === "Enter") event.preventDefault();
    if (!playing) startTimer();
  });

  $("#answer").on("input", function () {
    if (!playing || question === null) return;
    if (Number($(this).val()) !== question) return;
    currentScore += 1;
    $(".currentScore").text(currentScore);
    timeLeft += 1;
    $("#timer").text(timeLeft);
    $(this).val("");
    makeQuestion();
  });

  $("#box input").on("change", function () {
    if (!selectedTypes().length) {
      stopTimer();
      question = null;
      $("#question").text("?");
      setMessage("Select at least one operation.");
      return;
    }
    setMessage("");
    if (!playing) makeQuestion();
  });

  $("#numberLimit").on("submit", function (event) {
    event.preventDefault();
    var next = Number($("#numberInput").val());
    if (!Number.isInteger(next) || next < 10 || next > 50) {
      setMessage("Choose a whole number from 10 to 50.");
      return;
    }
    numberChosen = next;
    $("#currentLimit").text(numberChosen);
    $("#numberInput").val("");
    setMessage("Number limit is now " + numberChosen + ".");
    if (!playing) makeQuestion();
  });

  makeQuestion();
});
