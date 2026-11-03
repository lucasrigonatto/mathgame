# Timed Math Game

A small browser game for practicing arithmetic against a countdown.

## What problem did I work on?

I wanted to turn simple arithmetic practice into an interactive exercise: generate a question, check an answer, update the score, and keep the game moving against a timer.

## How it works

Choose the arithmetic operations and an operand limit, then answer questions during a 10-second round. Correct answers increase the score and add time. The high score is held in memory for the current page session.

## Run and check

```bash
python -m http.server 8080
```

Open http://localhost:8080. The page loads jQuery, Bootstrap, and Underscore from CDNs, so internet access is required.

Manual checks:

- Select at least one operation and start a round.
- Answer a generated question correctly and confirm the score and timer increase.
- Let the timer expire and confirm the round stops.
- Start another round and confirm the session high score is retained.

These are review instructions, not a claim of automated test coverage.

## Scope and next steps

This is an early JavaScript learning project using DOM events, timers, random question generation, and score state. There is no account system, persistent leaderboard, or backend. Guarding against an empty operation selection and adding deterministic timer tests are future improvements.
