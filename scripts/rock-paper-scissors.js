class RockPaperScissors {
    constructor(card, rounds) {
        this.card = card;
        this.rounds = rounds;
        this.roundCounter = 0;
        this.userScore = 0;
        this.compScore = 0;
        this.imgStyle = 0;
        this.pieces = {
            "gun": {
                img: ["🔫"],
                beats: ["rock", "sun", "fire", "scissors", "axe", "snake", "monkey", "woman", "man", "tree", "cockroach", "wolf"]
            },
            "dragon": {
                img: ["🐉"],
                beats: ["devil", "lightning", "nuke", "dynamite", "gun", "rock", "sun", "fire", "scissors", "axe", "snake", "monkey"]
            },
            "moon": {
                img: ["🌙"],
                beats: ["air", "bowl", "water", "alien", "dragon", "devil", "lightning", "nuke", "dynamite", "gun", "rock", "sun"]
            },
            "tree": {
                img: ["🌳"],
                beats: ["cockroach", "wolf", "sponge", "paper", "moon", "air", "bowl", "water", "alien", "dragon", "devil", "lightning"]
            },
            "axe": {
                img: ["🪓"],
                beats: ["snake", "monkey", "woman", "man", "tree", "cockroach", "wolf", "sponge", "paper", "moon", "air", "bowl"]
            },
            "dynamite": {
                img: ["💣"],
                beats: ["gun", "rock", "sun", "fire", "scissors", "axe", "snake", "monkey", "woman", "man", "tree", "cockroach"]
            },
            "alien": {
                img: ["👽"],
                beats: ["dragon", "devil", "lightning", "nuke", "dynamite", "gun", "rock", "sun", "fire", "scissors", "axe", "snake"]
            },
            "paper": {
                img: ["📄"],
                beats: ["moon", "air", "bowl", "water", "alien", "dragon", "devil", "lightning", "nuke", "dynamite", "gun", "rock"]
            },
            "man": {
                img: ["👨"],
                beats: ["tree", "cockroach", "wolf", "sponge", "paper", "moon", "air", "bowl", "water", "alien", "dragon", "devil"]
            },
            "scissors": {
                img: ["✂️"],
                beats: ["axe", "snake", "monkey", "woman", "man", "tree", "cockroach", "wolf", "sponge", "paper", "moon", "air"]
            },
            "nuke": {
                img: ["☢️"],
                beats: ["dynamite", "gun", "rock", "sun", "fire", "scissors", "snake", "axe", "monkey", "woman", "man", "tree"]
            },
            "water": {
                img: ["💧"],
                beats: ["alien", "dragon", "devil", "lightning", "nuke", "dynamite", "gun", "rock", "sun", "fire", "scissors", "axe"]
            },
            "sponge": {
                img: ["🧽"],
                beats: ["paper", "moon", "air", "bowl", "water", "alien", "dragon", "devil", "lightning", "nuke", "dynamite", "gun"]
            },
            "woman": {
                img: ["👩"],
                beats: ["man", "tree", "cockroach", "wolf", "sponge", "paper", "moon", "air", "bowl", "water", "alien", "dragon"]
            },
            "lightning": {
                img: ["⚡"],
                beats: ["nuke", "dynamite", "gun", "rock", "sun", "fire", "scissors", "axe", "snake", "monkey", "woman", "man"]
            },
            "bowl": {
                img: ["🍲"],
                beats: ["water", "alien", "dragon", "devil", "lightning", "nuke", "dynamite", "gun", "rock", "sun", "fire", "scissors"]
            },
            "wolf": {
                img: ["🐺"],
                beats: ["sponge", "paper", "moon", "air", "bowl", "water", "alien", "dragon", "devil", "lightning", "nuke", "dynamite"]
            },
            "monkey": {
                img: ["🐒"],
                beats: ["woman", "man", "tree", "cockroach", "wolf", "sponge", "paper", "moon", "air", "bowl", "water", "alien"]
            },
            "sun": {
                img: ["☀️"],
                beats: ["fire", "scissors", "axe", "snake", "monkey", "woman", "man", "tree", "cockroach", "wolf", "sponge", "paper"]
            },
            "devil": {
                img: ["👿"],
                beats: ["lightning", "nuke", "dynamite", "gun", "rock", "sun", "fire", "scissors", "axe", "snake", "monkey", "woman"]
            },
            "air": {
                img: ["🌬️"],
                beats: ["bowl", "water", "alien", "dragon", "devil", "lightning", "nuke", "dynamite", "gun", "rock", "sun", "fire"]
            },
            "cockroach": {
                img: ["🪳"],
                beats: ["wolf", "sponge", "paper", "moon", "air", "bowl", "water", "alien", "dragon", "devil", "lightning", "nuke"]
            },
            "snake": {
                img: ["🐍"],
                beats: ["monkey", "woman", "man", "tree", "cockroach", "wolf", "sponge", "paper", "moon", "air", "bowl", "water"]
            },
            "rock": {
                img: ["🪨"],
                beats: ["sun", "fire", "scissors", "axe", "snake", "monkey", "woman", "man", "tree", "cockroach", "wolf", "sponge"]
            },
            "fire": {
                img: ["🔥"],
                beats: ["scissors", "axe", "snake", "monkey", "woman", "man", "tree", "cockroach", "wolf", "sponge", "paper", "moon"]
            }
        };
        this.options = Object.keys(this.pieces);
        this.compChoice = "";
        this.userChoice = "";

        this.setup();
    }

    setup() {
        this.addRules();
        this.addGameButtons();
        this.addGameSection();
    }

    updateRounds(i) {
        this.rounds += i;
        if (this.rounds < 1) {
            this.rounds = 3;
        }
        this.updateRoundsText();
    }

    restartGame() {
        this.roundCounter = 0;
        this.userScore = 0;
        this.compScore = 0;
        this.updateRoundsText();
        this.start();
    }

    setCompChoice() {
        this.compChoice = this.options[Math.floor(Math.random() * this.options.length)];
    }

    start() {
       this.restartGame();
    }


    addRules() {
        const rules = document.createElement('section');
        rules.setAttribute("id", "rules")

        rules.innerHTML = "<h2>Rules:</h2>";
        for (let i = 0; i < this.options.length; i++) {
            const rule = document.createElement('span');
            let option = this.options[i];

            rule.innerHTML = `<p>${this.pieces[option].img[0]} ${option} beats:</p><p>${this.pieces[option].beats.join(', ')}</p>`;
            rules.appendChild(rule);
        }
        this.card.appendChild(rules);
    }

    addGameButtons() {
        const gameButtons = document.createElement('section');
        gameButtons.setAttribute("id", "game-buttons");

        const increaseRoundButton = document.createElement('button');
        increaseRoundButton.innerText = 'Increase Rounds';
        increaseRoundButton.addEventListener('click', () => {
            this.updateRounds(1);
        });
        gameButtons.appendChild(increaseRoundButton);


        const decreaseRoundButton = document.createElement('button');
        decreaseRoundButton.innerText = 'Decrease Rounds';
        decreaseRoundButton.addEventListener('click', () => {
            this.updateRounds(-1);
        });
        gameButtons.appendChild(decreaseRoundButton);

        const restartButton = document.createElement('button');
        restartButton.innerText = 'Restart Game';
        restartButton.addEventListener('click', () => {
            this.restartGame();
        });
        gameButtons.appendChild(restartButton);

        this.card.appendChild(gameButtons);

    }

    addGameSection() {
        const game = document.createElement('article');
        game.setAttribute("id", "game");

        const rounds = document.createElement('p');
        rounds.setAttribute("id", "rounds");
        game.appendChild(rounds);

        this.card.appendChild(game);

        this.addChoiceButtons();
        this.updateRoundsText();
    }

    addChoiceButtons() {
        const game = document.querySelector('#game')
        const userButtons = document.createElement('section');

        for (let i = 0; i < this.options.length; i++) {
            const button = document.createElement('button');
            let option = this.options[i];
            button.alt = option;
            button.innerText = `${this.pieces[option].img[this.imgStyle]}`;
            button.title = option;
            button.addEventListener('click', () => {
                this.playRound(option);
            });
            userButtons.appendChild(button);
        }
        game.appendChild(userButtons);
    }

    updateRoundsText() {
        const rounds = document.querySelector('#rounds');
        rounds.innerText = `Round: ${this.roundCounter} / ${this.rounds}`;
    }

    playRound(userChoice) {
        this.userChoice = userChoice;
        this.setCompChoice();
        this.displayChoices();
        this.checkWinner();
        this.roundCounter++;

        if (this.roundCounter < this.rounds) {
            this.displaySeparator();
        } else {
            this.displayOutcome();
        }
    }

    displayChoices() {
        const choicesDiv = document.createElement('div');
        choicesDiv.setAttribute("id", `round-${this.roundCounter}`);

        choicesDiv.innerHTML = `<p>User choice: ${this.pieces[this.userChoice].img[this.imgStyle]}</p>
                                <p>Computer choice: ${this.pieces[this.compChoice].img[this.imgStyle]}</p>`;
        this.card.appendChild(choicesDiv);
    }

    displaySeparator() {
        const separatorDiv = document.createElement('hr');
        this.card.appendChild(separatorDiv);
    }

    displayOutcome() {
        const outcomeDiv = document.createElement('div');
        if (this.userScore > this.compScore) {
            outcomeDiv.innerHTML = `<p>Outcome: User wins 🏆</p>`;
        } else if (this.compScore > this.userScore) {
            outcomeDiv.innerHTML = `<p>Outcome: Computer wins. 😢</p>`;
        } else {
            outcomeDiv.innerHTML = `<p>Outcome: It's a draw! 🤝</p>`;
        }
        this.card.appendChild(outcomeDiv);
    }

    checkWinner() {
        const outcome = document.createElement('p');

        if (this.pieces[this.compChoice].beats.includes(this.userChoice)) {
            this.compScore++;
            outcome.innerHTML = `${this.pieces[this.compChoice].img[0]} beats ${this.pieces[this.userChoice].img[0]}, Computer Wins Round ${this.roundCounter}!`;
        } else if (this.pieces[this.userChoice].beats.includes(this.compChoice)) {
            this.userScore++;
            outcome.innerHTML = `${this.pieces[this.userChoice].img[0]} beats ${this.pieces[this.compChoice].img[0]}, User Wins Round ${this.roundCounter}!`;

        }
        document.querySelector(`#round-${this.roundCounter}`).appendChild(outcome);


    }
}

const card = document.querySelector('#rps-game');
const rps = new RockPaperScissors(card, 3);