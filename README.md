# Timed Math Game

A small browser game for practicing arithmetic against a countdown.

## What problem did I work on?

I wanted to turn simple arithmetic practice into an interactive exercise: generate a question, check an answer, update the score, and keep the game moving against a timer.

## How it works

Choose the arithmetic operations and an operand limit, then answer questions during a 10-second round. Correct answers increase the score and add one second. The high score is saved in this browser. A round cannot start until at least one operation is selected, and the number limit only accepts whole numbers from 10 to 50.

## Run and check

```bash
python -m http.server 8080
```

Open http://localhost:8080. The page loads jQuery and Bootstrap from CDNs, so internet access is required.

Manual checks:

- Select at least one operation and start a round.
- Answer a generated question correctly and confirm the score and timer increase.
- Let the timer expire and confirm the score is announced on the page.
- Reload and confirm the high score is still there.
- Clear every operation and confirm the game asks you to select one.

These are review instructions, not a claim of automated test coverage.

## Scope and next steps

This is an early JavaScript learning project using DOM events, timers, random question generation, and score state. There is no account system or shared leaderboard. The high score stays in local storage on this browser.
