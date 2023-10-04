const Card = require("./card");

class Deck {

    // variables
    cards
    deckSize

    constructor(deckSize) {
        this.deckSize = deckSize
    }

    makeDeck() {
        this.cards = []
        for (let cardNumber = 3; cardNumber < 16; cardNumber++) {
            for (let suit = 1; suit < 5; suit++) {
                this.cards.push(new Card(cardNumber, suit))
            }
        }
    }

/*    shuffleDeck(amountOfTimesToShuffle) {
        let middleIndex = Math.ceil(this.cards.length / 2)
        let firstHalf = this.cards.splice(0, middleIndex)
        let secondHalf = this.cards.splice(-middleIndex)
        let shuffledDeck = []

        for (let o = 0; o < amountOfTimesToShuffle; o++) {
            for (let i = 0; i < this.deckSize / 2; i++) {
                shuffledDeck.push(firstHalf[i])
                shuffledDeck.push(secondHalf[i])
            }
            middleIndex = Math.ceil(shuffledDeck.length / 2)
            firstHalf = shuffledDeck.splice(0, middleIndex)
            secondHalf = shuffledDeck.splice(-middleIndex)
        }

        return firstHalf.concat(secondHalf)

    }*/

    shuffleDeck() {
        // some random shuffling algo i found on stack overflow
        // Fisher Yates shuffle
        for (let i = this.cards.length -1; i > 0; i--) {
            for (let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
            }
        }
        return this.cards
    }

    getDeck() {
        return this.cards
    }

}

module.exports = Deck