"use strict";

function getSelectionElements() { //Ah yes, it could have been in Entity.getSelectionElements as a static function, but then that would ruin the Entity classes' sole purpose as an Entity class
    const array = getPlayArray();

    return array.map(play => {
        return document.getElementById(play.id)
    })
}

function getPlayArray() { //Function rather than class because stated above
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

    static displayArray() { //Static is fun. This was going to be a way for a user to click on emojis, but that was cut out of the final draft due to javascript knowledge barriers.
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
        if (!result) {
            this.promptForName();
        }

        return result;
    }

    getPlay() {
        const result = prompt(`${this.name}, what is your play?\nYour options include ${this.playArray.map(t => t.id).join(", ")}`);
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
    constructor(type) { //So game can take a type, but I don't know how to create the listeners for changing this.humans, since static functions cannot access the `this` context
        this.type = type;
        this.limit = null;
        this.maxWinStreak = null;
        this.round = 0;
        this.gameOver = false;
        this.players = null;
        this.humans = 1;

        this.parseType(this.type);
        Entity.displayArray();
        this.setUpGameHandlers();
    }

    setUpGameHandlers() {
        const singleplayer = document.getElementById("singleplayer");
        const multiplayer = document.getElementById("multiplayer");
        const aivai = document.getElementById("gltich");

        [singleplayer, multiplayer, aivai].forEach(radio => {
            radio.addEventListener("change", () => {
                switch (radio.id) {
                    case "singleplayer":
                        this.humans = 1;
                        break;
                    case "multiplayer":
                        this.humans = 2;
                        break;
                    case "gltich":
                        this.humans = 0;
                        break;
                    default:
                        this.humans = 1;
                        break;

                }
            })
        })

        return this.humans;
    }

    startGame() {
        this.players = [];
        const type = this.humans;

        let player1, player2;
        switch (type) {
            case 1:
                player1 = new Player();
                player2 = new Ai("Ai 1");
                break;
            case 2:
                player1 = new Player();
                player2 = new Player();
                break;
            case 0:
                player1 = new Ai("Ai 1");
                player2 = new Ai("Ai 2");
                break;
            default:
                player1 = new Player();
                player2 = new Ai("Ai 1");
                break;
        }

        this.players.push(player1, player2);

        while (!this.gameOver) {
            this.round += 1;

            player1.getPlay();
            player2.getPlay();

            const result = this.assertWinner(this.players[0], this.players[1]);

            if (result === "TIE") this.declareTie();
            else this.declareWinner(result);
        }

        this.endGame();
    }

    resetGame() {
        this.limit = null;
        this.maxWinStreak = null;
        this.round = 0;
        this.gameOver = false;
        this.parseType(this.type);
    }

    endGame() {
        const winnerArray = this.players.sort((a, b) => a.totalWon - b.totalWon).reverse(); //I love the sort function, but I was getting [loser, winner]...
        const [winner, loser] = winnerArray;
        alert(`${winner.name} wins: ${winner.totalWon}\n${loser.name}: ${loser.totalWon}`);

        //Set all things back to default.
        this.resetGame();
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

const game = new Game('bo3');