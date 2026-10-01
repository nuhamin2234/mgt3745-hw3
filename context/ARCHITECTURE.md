# Architecture

Status: ACTIVE in Module 3.

## Gate

### Hard constraints (pass/fail before scoring)
1. Must run in a GitHub Codespace with no local install (HW3 build).
2. Must not require student ID numbers or grades.
3. Must be a web application a teammate can open in a browser.
4. Saved changes must appear within two seconds.

All three options pass these constraints for the HW3 slice.

### Options
- **Hand-built:** vanilla HTML/CSS/JavaScript, entries stored in the
  browser's localStorage, served with Live Server in a Codespace.
- **Existing service:** Trello, with a board per project, a card per
  section, and a checklist on each card for completion criteria.
- **AI-assisted build:** a Node/Express app with SQLite generated with
  ChatGPT and run in the Codespace.

### Anchors (1 = worst, 3 = middle, 5 = most favorable)
| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| Cost to start | Paid plan or days of setup | Free tier, about a day of setup | Free, working in under an hour |
| Cost to maintain | Constant fixes or fees | Occasional upkeep | Almost no upkeep |
| Time to working | More than 3 weeks | 1 to 2 weeks | Within a few days |
| Inspectability | Opaque; cannot see why it behaves as it does | Partly readable | I can read and explain every part |
| Switching cost | Data and logic locked in | Export possible with effort | Easy to move away |
| Fit to spec | Covers few F-01 to F-04 needs | Covers about half | Covers all of F-01 to F-04 |

### Weighted scores (all values are my estimates)
| Criterion | Weight | Hand-built | Existing service | AI-assisted build |
|---|---|---|---|---|
| Cost to start | 3 | 5 | 5 | 4 |
| Cost to maintain | 2 | 4 | 5 | 3 |
| Time to working | 5 | 4 | 5 | 4 |
| Inspectability | 4 | 5 | 2 | 3 |
| Switching cost | 2 | 4 | 3 | 4 |
| Fit to spec | 5 | 3 | 2 | 4 |
| **Weighted total (max 105)** | 21 | **86** | **74** | **78** |

Arithmetic:
- Hand-built: 15 + 8 + 20 + 20 + 8 + 15 = 86
- Existing service: 15 + 10 + 25 + 8 + 6 + 10 = 74
- AI-assisted: 12 + 6 + 20 + 12 + 8 + 20 = 78

Reasons for key scores:
- Hand-built, Inspectability 5: I can read and explain every line of
  the code, which matters because this course grades my understanding.
- Hand-built, Fit to spec 3: it covers F-01 well but has no sharing or
  invited members, so it covers
