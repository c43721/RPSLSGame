"use strict";

class Entity {
    constructor(name) {
        this.name = name
        this.playArray = ["rock", "papper", "scissors"];
        this.play = null;
    }

    displayArray() {
        //TODO use  this.playArray and throw it in the DOM
    }

    parsePlay(play) {
        return this.playArray.includes(play);
    }
}

class Player extends Entity {
    constructor(name) {
        super(name);

        this.name = this.promptForName();
    }

    promptForName() {
        const result = prompt("What is your name?");
        if (!result) this.promptForName();
        this.name = result;
        return this.name;
    }

    setPlay(newPlay) {
        const check = this.parsePlay(newPlay);
        if (check) return this.play = newPlay;
        else return this.play;
    }
}

class Ai extends Entity {
    constructor(name) {
        super(name);

        this.name = name;
        this.play = this.getRandomChoice(this.playArray);
    }

    getRandomChoice(array) {
        return array[~~(array.length * Math.random())];
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
        const player1 = new Player("Player 1");
        const ai1 = new Ai("Ai 1");

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

        // wtf 
        // Rock crushes Lizard
        // Lizard poisons Spock
        // Spock smashes Scissors
        // Scissors decapitates Lizard
        // Lizard eats Paper
        // Paper disproves Spock
        // Spock vaporizes Rock

    }

    declareWinner(winner) {
        //put in dom
        //check if winner exceeds limit
    }
}

const game = new Game('bo3');
game.startGame();