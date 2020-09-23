"use strict";

class Entity {
    constructor() {
        this.name = null
        this.playArray = [
            {
                id: "rock",
                beats: "scissors",
                display: "R"
            },
            {
                id: "paper",
                beats: "rock",
                display: "P"
            },
            {
                id: "scissors",
                beats: "paper",
                display: "S"
            },
        ];
        this.play = null;
    }

    displayArray() {
        const element = document.getElementById('selector');

        element.innerHTML = `${this.playArray.map(t => `<span>${t.display}</span>`)}`
    }

    parsePlay(play) {
        return this.playArray.map(t => t.id).includes(play);
    }
}

class Player extends Entity {
    constructor() {
        super();

        this.name = this.promptForName();
    }

    promptForName() {
        const result = prompt("What is your name?");
        if (!result) this.promptForName();
        return result;
    }

    promptForPlay() {
        const result = prompt(`What is your play? Your options include ${this.playArray.join(", ")}`);
        const parsedResult = this.parsePlay(result);
        if (!result || !parsedResult) this.promptForPlay();
        this.play = parsedResult;
        return this.play;
    }

    setPlay(newPlay) {
        const check = this.parsePlay(newPlay);
        if (check) return this.play = newPlay;
        else return this.play;
    }
}

class Ai extends Entity {
    constructor() {
        super('Ai 1');

        this.play = this.getRandomChoice(this.playArray);
    }

    getRandomChoice(array) {
        return array[~~(Math.random() * array.length)];
    }

    getNewChoice() {
        return this.play = this.getRandomChoice(this.playArray);
    }
}

class Game {
    startGame(type) {
        this.type = type;
        this.limit = this.parseType(this.type);
        this.won = false;

        //todo multiplayer | singleplayer (dom element), singleplayer = ai created, else player2 created
        //2 ais against eachother
        const player1 = new Player("Player 1");
        const ai1 = new Ai();

        //cconver to do while
        while (!won) {
            const play1 = player1.promptForPlay();
            const play2 = ai1.getNewChoice();

            this.assertWinner(play1, play2);
        }
    }

    parseType(type) {
        switch (type) {
            case 'bo3':
                return 3;
            case 'bo5':
                return 5;
            default:
                return 3;
        }
    }

    assertWinner(play1, play2) {
        // Rock crushes Scissors
        // Scissors cuts Paper
        // Paper covers Rock

        if (play1 === "rock") {
            if (play2 === "scissors") { }//win
            else if (play2 === "paper") { }//lose
        } else if (play1 === "scissors") {
            if (play2 === "paper") { } //win
            else if (play2 === "rock") { } //lose
        } else if (play1 === "paper") {
            if (play2 === "rock") { } //win
            else if (play2 === "scissors") { }//lose
        } else {
            //tie
        }

        // wtf 
        // Rock crushes Lizard
        // Lizard poisons Spock
        // Spock smashes Scissors
        // Scissors decapitates Lizard
        // Lizard eats Paper
        // Paper disproves Spock
        // Spock vaporizes Rock

    }

    declareTie() {
        //kinda like declare winner, but no winner
    }

    declareWinner(winner) {
        //put in dom
        //check if winner exceeds limit
    }
}

const game = new Game('bo3');
game.startGame();