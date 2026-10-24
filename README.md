# Bible Quiz

A free, Kahoot-style Bible trivia game for youth groups and Sunday school. You run it from one laptop and show it on a TV or projector. No server, no accounts and no internet connection needed.

Built with plain HTML, CSS and JavaScript, so it is easy to read, change and learn from.

## Features

- **Presenter-controlled quiz.** Start, previous, next, reveal the answer, show the explanation, restart and end.
- **Hidden answers.** The correct answer stays hidden from the audience until you reveal it. You see it in the presenter panel.
- **Presentation Mode.** A full-screen audience view with large text and a colourful 2×2 answer grid. A small control bar in the corner fades away until you hover over it.
- **Teams and competitive mode.** Create 2 to 8 teams, give points after each answer, and see a live scoreboard and a final ranking, including ties.
- **Optional countdown timer.** Set the seconds per question, or turn it off.
- **Quiz editor.** Create, edit and delete quizzes and questions, with a Bible reference and an explanation for each answer.
- **Save and share.** Quizzes are saved in your browser. Import and export them as JSON files.
- **Ready-made quizzes.** Sample Bible Quiz, Bible Basics, Old Testament Heroes and New Testament People.
- **Keyboard shortcuts.**

| Key | Action |
| --- | --- |
| → | Next question |
| ← | Previous question |
| Space | Reveal answer |
| 1–8 | Give points to a team (after revealing) |
| Esc | Leave Presentation Mode |

## How to run it

1. Download or clone this repository.
2. Double-click `index.html`. It opens in your browser (Chrome or Edge work best).
3. Click **Play** next to a quiz, then **Start quiz**.

## Using it with a TV or projector

Connect the laptop with an HDMI cable, press **Windows + P** and choose **Extend** or **Duplicate**. Move the browser window to the big screen and click **Presentation Mode**.

## Making your own quiz

Click **+ New quiz**, add a title, then add each question with four answers. Tick the correct answer and optionally add a Bible reference and an explanation. Click **Save quiz** when you are done.

Quizzes can also be written as JSON files. Each question looks like this (`c` is the correct answer: 0 = A, 1 = B, 2 = C, 3 = D):

```json
{
  "title": "My Quiz",
  "questions": [
    {
      "q": "How many apostles did Jesus choose?",
      "a": ["10", "12", "7", "40"],
      "c": 1,
      "ref": "Luke 6:13",
      "exp": "Jesus chose twelve of his disciples and named them apostles."
    }
  ]
}
```

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `style.css` | Design (dark, Obsidian-inspired theme) |
| `script.js` | All the quiz logic |

## Notes

- Quizzes are stored in your browser's local storage. Clearing your browser data deletes them, so export a JSON backup of quizzes you care about.
- Answers and Bible references were written with care, but please check them against your own Bible before using them with a group.
- This first version runs on one device. Phone-based answering and online play are not included.

## License

Choose a licence when you publish, for example MIT.
