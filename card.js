class Card {

    // variables
    cardNumber
    suit

    constructor(cardNumber, suit) {
        if (typeof(cardNumber) === "string") {
            this.cardNumber = cardNumber.toLowerCase()
            switch (this.cardNumber) {
                case "jack":
                    this.cardNumber = 11
                    break
                case "queen":
                    this.cardNumber = 12
                    break
                case "king":
                    this.cardNumber = 13
                    break
                case "ace":
                    this.cardNumber = 14
                    break
            }
        } else if (typeof(cardNumber) == "number") {
            if (cardNumber === 2) {
                this.cardNumber = 15
            } else {
                this.cardNumber = cardNumber
            }
        } else {
            console.log(`Invalid card number: ${cardNumber}`)
        }

        if (typeof (suit) === "string") {
            this.suit = suit.toLowerCase()
            switch (this.suit) {
                case "spades":
                    this.suit = 1
                    break
                case "clubs":
                    this.suit = 2
                    break
                case "diamonds":
                    this.suit = 3
                    break
                case "hearts":
                    this.suit = 4
                    break
            }
        } else if (typeof (suit) === "number") {
            this.suit = suit;
        } else {
            console.log(`Invalid suit value: ${suit}`)
        }

    }

    toString() {

        let name = ""
        let suit = ""

        if (this.cardNumber > 10) {
            switch (this.cardNumber) {
                case 11:
                    name = "Jack"
                    break
                case 12:
                    name = "Queen"
                    break
                case 13:
                    name = "King"
                    break
                case 14:
                    name = "Ace"
                    break
                case 15:
                    name = "2"
                    break
            }
        } else {
            name = this.cardNumber
        }

        switch (this.suit) {
            case 1:
                suit = "Spades"
                break
            case 2:
                suit = "Clubs"
                break
            case 3:
                suit = "Diamonds"
                break
            case 4:
                suit = "Hearts"
                break
            default:
                suit = this.suit
                break
        }

        return `${name} of ${suit}`

    }

    print() {
        console.log(this.toString())
    }


}

module.exports = Card