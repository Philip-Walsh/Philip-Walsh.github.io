class RockPaperScissors {
    constructor(card) {
        this.card = card
        this.imgStyle = 0
        this.pieces = {
            "rock": {
                img: ['🪨', '✊'],
                beats: ["paper"]
            },
            "scissors": {
                img: ['✂️', '✌️'],
                beats: ["rock"]
            },
            "paper": {
                img: ['📃', '✋'],
                beats: ["scissors"]
            },
        }
        this.options = Object.keys(this.pieces)
        this.compChoice = "";
        this.userChoice = "";
    }

    setCompChoice() {
        this.compChoice = this.options[Math.floor(Math.random() * this.options.length)]
    }

    start() {
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
                this.checkWinner(option)
            })
            this.card.appendChild(button)
        }
    }
    checkWinner(userChoice) {
        if (this.pieces[this.compChoice].beats.includes(userChoice)) {
            console.log('Computer wins');
        } else if (this.pieces[userChoice].beats.includes(this.compChoice)) {
            console.log('User wins');
        } else {
            console.log('Draw')
        }
    }
}

const card = document.querySelector('#rps-game');
const rps = new RockPaperScissors(card);
rps.start();
