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
        this.totalWon = 0;
    }

    displayArray() {
        const element = document.getElementById('selector');

        element.innerHTML = `${this.playArray.map(t => `<span>${t.display}</span>`)}`
    }

    parsePlay(play) {
        return this.playArray.map(t => t.id).includes(play);
    }

    winGame() {
        return this.totalWon++;
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
        this.gameOver = false;
        this.players = null;

        //todo multiplayer | singleplayer (dom element), singleplayer = ai created, else player2 created
        //2 ais against eachother
        const player1 = new Player("Player 1");
        const ai1 = new Ai();

        this.players = [player1, ai1];

        //convert to do while
        while (!gameOver) {
            const play1 = player1.promptForPlay();
            const play2 = ai1.getNewChoice();

            const result = this.assertWinner(play1, play2);

            if (result === "TIE") return this.declareTie();

            const winnerPlayer = result === play1 ? this.players[0] : this.players[1];

            this.declareWinner(winnerPlayer.name);
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
            if (play2 === "scissors") return play1;//win
            else if (play2 === "paper") return play2;//lose
        } else if (play1 === "scissors") {
            if (play2 === "paper") return play1; //win
            else if (play2 === "rock") return play2 //lose
        } else if (play1 === "paper") {
            if (play2 === "rock") return play1; //win
            else if (play2 === "scissors") return play2//lose
        } else {
            return "TIE";
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
        const amt = winner.wonGame();
        if (amt > this.limit) this.gameOver = true;
        return alert(winner);
        //put in dom
    }
}

const game = new Game('bo3');
game.startGame();