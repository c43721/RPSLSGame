"use strict";

class Entity {
    constructor() {
        this.name = null
        this.playArray = [
            {
                id: "rock",
                beats: ["scissors"],
                display: "R"
            },
            {
                id: "paper",
                beats: ["rock"],
                display: "P"
            },
            {
                id: "scissors",
                beats: ["paper"],
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

    getPlay() {
        return null;
    }

    winGame() {
        return this.totalWon += 1;
    }
}

class Player extends Entity {
    constructor() {
        super();

        this.name = this.promptForName();
    }

    promptForName() {
        const result = prompt("What is your name?");
        if (result == null) return false;
        if (!result) {
            this.promptForName();
        }

        return result;
    }

    getPlay() {
        const result = prompt(`What is your play? Your options include ${this.playArray.map(t => t.id).join(", ")}`);
        const parsedResult = this.parsePlay(result);
        if (!result || !parsedResult) this.promptForPlay();
        return this.play = result;
    }

    setPlay(newPlay) {
        const check = this.parsePlay(newPlay);
        if (check) return this.play = newPlay;
        else return this.play;
    }
}

class Ai extends Entity {
    constructor(name) {
        super();

        this.name = name;
        this.play = this.getRandomChoice(this.playArray);
    }

    getRandomChoice(array) {
        return array[~~(Math.random() * array.length)];
    }

    getPlay() {
        return this.play = this.getRandomChoice(this.playArray).id;
    }
}

class Game {
    startGame(type) {
        this.type = type;
        this.limit = this.parseType(this.type);
        this.round = 0;
        this.gameOver = false;
        this.players = null;

        //todo multiplayer | singleplayer (dom element), singleplayer = ai created, else player2 created
        //2 ais against eachother
        const player1 = new Ai('AI 1');
        const player2 = new Ai('AI 2');

        this.players = [player1, player2];

        while (!this.gameOver) {
            this.round += 1;

            player1.getPlay();
            player2.getPlay();

            const result = this.assertWinner(player1, player2);

            if (result === "TIE") this.declareTie();
            else this.declareWinner(result);
        }

        this.endGame();
    }

    endGame() {
        const [player1, player2] = this.players;
        return alert(`${player1.name} wins: ${player1.totalWon}\n${player2.name}: ${player2.totalWon}`);
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

    assertWinner(player1, player2) {
        console.log(player1.name + " " + player1.totalWon);
        console.log(player2.name + " " + player2.totalWon + "\n");

        const player1PlayIndex = player1.playArray.map(p => p.id).indexOf(player1.play);
        const player2PlayIndex = player2.playArray.map(p => p.id).indexOf(player2.play);

        if (player1.playArray[player1PlayIndex].beats.includes(player2.play)) return player1;
        else if (player2.playArray[player2PlayIndex].beats.includes(player1.play)) return player2;
        else return "TIE";

        // if (play1 === "rock") {
        //     if (play2 === "scissors") return play1;//win
        //     else if (play2 === "paper") return play2;//lose
        // } else if (play1 === "scissors") {
        //     if (play2 === "paper") return play1; //win
        //     else if (play2 === "rock") return play2 //lose
        // } else if (play1 === "paper") {
        //     if (play2 === "rock") return play1; //win
        //     else if (play2 === "scissors") return play2//lose
        // }
        // return "TIE";


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
        return alert("TIE");
    }

    declareWinner(winner) {
        if (winner.totalWon >= this.limit) {
            return this.gameOver = true;
        }
        winner.winGame();
        return alert(winner.name);
    }
}

const game = new Game('bo3');
game.startGame();