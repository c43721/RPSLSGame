"use strict";

function getSelectionElements() {
    const array = getPlayArray();

    return array.map(play => {
        return document.getElementById(play.id)
    })
}

function getPlayArray() {
    return [
        {
            id: "rock",
            beats: ["scissors", "lizard"],
            display: "✊"
        },
        {
            id: "paper",
            beats: ["rock", "spock"],
            display: "🤚"
        },
        {
            id: "scissors",
            beats: ["paper", "lizard"],
            display: "✌️"
        },
        {
            id: "lizard",
            beats: ["spock", "paper"],
            display: "🤏",
        },
        {
            id: "spock",
            beats: ["scissors", "rock"],
            display: "🖖",
        }
    ]
}

class Entity {
    constructor() {
        this.name = null
        this.playArray = getPlayArray();
        this.play = null;
        this.totalWon = 0;
    }

    static displayArray() {
        const element = document.getElementById('option-selectors');

        element.innerHTML = `${getPlayArray().map(t => `<span class=\"display\" id=\"${t.id}\">${t.display}</span>`).join("")}`
    }

    parsePlay(play) {
        return this.playArray.map(t => t.id).includes(play);
    }

    getPlay() {
        return null;
    }

    winGame() {
        this.totalWon += 1;
        return this.totalWon;
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
        const result = prompt(`${this.name}, what is your play? Your options include ${this.playArray.map(t => t.id).join(", ")}`);
        const parsedResult = this.parsePlay(result);
        if (!result || !parsedResult) this.getPlay();
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
    constructor(type) {
        this.type = type;
        this.limit = null;
        this.maxWinStreak = null;
        this.round = 0;
        this.gameOver = false;
        this.players = null;

        this.parseType(this.type);
        Entity.displayArray();
    }

    startGame(type) {
        //todo multiplayer | singleplayer (dom element), singleplayer = ai created, else player2 created
        //2 ais against eachother
        // const player1 = new Player();
        // const player2 = new Player();
        const player1 = new Ai('AI 1');
        const player2 = new Ai('AI 2');

        this.players = [player1, player2];

        while (!this.gameOver) {
            this.round += 1;

            player1.getPlay();
            player2.getPlay();

            // this.displayPlay(player1, player2);

            const result = this.assertWinner(player1, player2);

            if (result === "TIE") this.declareTie();
            else this.declareWinner(result);
        }

        this.endGame();
    }

    // displayPlay(player1, player2) {
    //     const player1PlayIndex = this.getIndexOfPlay(player1);
    //     const player2PlayIndex = this.getIndexOfPlay(player2);

    //     const output = document.getElementById("output");
    //     output.innerHTML = `<span class="left">${player1.playArray[player1PlayIndex].display}</span><span class="right">${player2.playArray[player2PlayIndex].display}</span>`;
    // }

    endGame() {
        const [player1, player2] = this.players;
        return alert(`${player1.name} wins: ${player1.totalWon}\n${player2.name}: ${player2.totalWon}`);
    }

    parseType(type) {
        switch (type) {
            case 'bo3':
                this.limit = 3;
                this.maxWinStreak = 2;
                break;
            case 'bo5':
                this.limit = 5;
                this.maxWinStreak = 3;
                break;
            default:
                this.limit = 3;
                this.maxWinStreak = 2;
                break;
        }
    }


    assertWinner(player1, player2) {
        const player1PlayIndex = player1.playArray.map(p => p.id).indexOf(player1.play);
        const player2PlayIndex = player2.playArray.map(p => p.id).indexOf(player2.play)

        if (player1.playArray[player1PlayIndex].beats.includes(player2.play)) return player1;
        else if (player2.playArray[player2PlayIndex].beats.includes(player1.play)) return player2;
        else return "TIE";
    }

    declareTie() {
        this.round -= 1; //"No ties"
        return alert("TIE");
    }

    declareWinner(winner) {
        winner.winGame();
        alert(`${winner.name} wins!`);
        console.log()
        if (this.round >= this.limit || winner.totalWon === this.maxWinStreak) {
            return this.gameOver = true;
        }
    }
}

const game = new Game('bo5');