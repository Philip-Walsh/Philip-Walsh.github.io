class RockPaperScissors {
    constructor(card, rounds) {
        this.card = card;
        this.rounds = rounds;
        this.roundCounter = 0;
        this.userScore = 0;
        this.compScore = 0;
        this.imgStyle = 0;
        this.pieces = {
            "rock": {
                img: ['🪨', '✊'],
                beats: ["scissors", "lizard", "water", "dragon", "devil", "lightning", "gun", "tree", "snake", "human"]
            },
            "scissors": {
                img: ['✂️', '✌️'],
                beats: ["paper", "lizard", "water", "dragon", "devil", "lightning", "gun", "tree", "snake", "human"]
            },
            "paper": {
                img: ['📃', '✋'],
                beats: ["rock", "spock", "water", "dragon", "devil", "lightning", "gun", "tree", "snake", "human"]
            },
            "lizard": {
                img: ['🦎', '🖖'],
                beats: ["spock", "paper", "water", "dragon", "devil", "lightning", "gun", "tree", "snake", "human"]
            },
            "spock": {
                img: ['🖖', '📄'],
                beats: ["scissors", "rock", "water", "dragon", "devil", "lightning", "gun", "tree", "snake", "human"]
            },
            "water": {
                img: ['🌊', '💧'],
                beats: ["spock", "tree", "human", "snake", "devil"]
            },
            "dragon": {
                img: ['🐉', '🐲'],
                beats: ["devil", "lightning", "gun", "tree", "human"]
            },
            "devil": {
                img: ['😈', '👿'],
                beats: ["lightning", "gun", "rock", "tree", "human"]
            },
            "lightning": {
                img: ['⚡', '🌩️'],
                beats: ["gun", "rock", "tree", "human", "snake"]
            },
            "gun": {
                img: ['🔫', '🤖'],
                beats: ["rock", "tree", "human", "snake", "scissors"]
            },
            "tree": {
                img: ['🌳', '🌲'],
                beats: ["spock", "devil", "gun", "human", "snake"]
            },
            "snake": {
                img: ['🐍', '🐉'],
                beats: ["water", "devil", "gun", "human", "scissors"]
            },
            "human": {
                img: ['👤', '🤵'],
                beats: ["spock", "devil", "gun", "tree", "scissors"]
            }
        };
        this.options = Object.keys(this.pieces);
        this.compChoice = "";
        this.userChoice = "";

        this.init();
    }

    init() {
        const rulesDiv = document.createElement('div');
        rulesDiv.innerHTML = "<h3>Rules:</h3><ul>" +
            "<li>Rock beats Scissors, Lizard, Water, Dragon, Devil, Lightning, Gun, Tree, Snake, Human.</li>" +
            "<li>Scissors beats Paper, Lizard, Water, Dragon, Devil, Lightning, Gun, Tree, Snake, Human.</li>" +
            "<li>Paper beats Rock, Spock, Water, Dragon, Devil, Lightning, Gun, Tree, Snake, Human.</li>" +
            "<li>Lizard beats Spock, Paper, Water, Dragon, Devil, Lightning, Gun, Tree, Snake, Human.</li>" +
            "<li>Spock beats Scissors, Rock, Water, Dragon, Devil, Lightning, Gun, Tree, Snake, Human.</li>" +
            "<li>Water beats Spock, Tree, Human, Snake, Devil.</li>" +
            "<li>Dragon beats Devil, Lightning, Gun, Tree, Human.</li>" +
            "<li>Devil beats Lightning, Gun, Rock, Tree, Human.</li>" +
            "<li>Lightning beats Gun, Rock, Tree, Human, Snake.</li>" +
            "<li>Gun beats Rock, Tree, Human, Snake, Scissors.</li>" +
            "<li>Tree beats Spock, Devil, Gun, Human, Snake.</li>" +
            "<li>Snake beats Water, Devil, Gun, Human, Scissors.</li>" +
            "<li>Human beats Spock, Devil, Gun, Tree, Scissors.</li>" +
            "</ul>";
            this.card.appendChild(rulesDiv);

            const increaseRoundButton = document.createElement('button');
            increaseRoundButton.innerText = 'Increase Rounds';
            increaseRoundButton.addEventListener('click', () => {
                this.increaseRounds();
            });
            this.card.appendChild(increaseRoundButton);
        
            const restartButton = document.createElement('button');
            restartButton.innerText = 'Restart Game';
            restartButton.addEventListener('click', () => {
                this.restartGame();
            });
            this.card.appendChild(restartButton);
        
            const roundsDisplay = document.createElement('p');
            roundsDisplay.innerText = `Rounds: ${this.rounds}`;
            this.card.appendChild(roundsDisplay);
        
            this.addButtons();
            this.start();
    }

    increaseRounds() {
        this.rounds++;
        this.updateRoundsDisplay();
    }

    restartGame() {
        this.roundCounter = 0;
        this.userScore = 0;
        this.compScore = 0;
        this.updateRoundsDisplay();
        this.start();
    }

    updateRoundsDisplay() {
        const roundsDisplay = document.querySelector('#rounds-display');
        roundsDisplay.innerText = `Rounds: ${this.rounds}`;
    }

    setCompChoice() {
        this.compChoice = this.options[Math.floor(Math.random() * this.options.length)];
    }

    start() {
        this.card.innerHTML = '';
        this.setCompChoice();
        this.addButtons();
    }

    addButtons() {
        for (let i = 0; i < this.options.length; i++) {
            const button = document.createElement('button');
            let option = this.options[i];
            button.innerText = `${this.pieces[option].img[this.imgStyle]}`;
            button.title = option;
            button.addEventListener('click', () => {
                this.playRound(option);
            });
            this.card.appendChild(button);
        }
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
        choicesDiv.innerHTML = `<p>Round ${this.roundCounter}:</p>
                                <p>User choice: ${this.pieces[this.userChoice].img[this.imgStyle]}</p>
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
            outcomeDiv.innerHTML = `<p>Outcome: You win! 🏆</p>`;
        } else if (this.compScore > this.userScore) {
            outcomeDiv.innerHTML = `<p>Outcome: Computer wins. 😢</p>`;
        } else {
            outcomeDiv.innerHTML = `<p>Outcome: It's a draw! 🤝</p>`;
        }
        this.card.appendChild(outcomeDiv);
    }

    checkWinner() {
        if (this.pieces[this.compChoice].beats.includes(this.userChoice)) {
            this.compScore++;
        } else if (this.pieces[this.userChoice].beats.includes(this.compChoice)) {
            this.userScore++;
        }
    }
}

const card = document.querySelector('#rps-game');
const rounds = 3;
const rps = new RockPaperScissors(card, rounds);
