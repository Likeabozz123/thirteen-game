const Card = require("./card");
const Deck = require("./deck");

class Helper {
    sortHand(card1, card2) {
        if (card1.cardNumber !== card2.cardNumber) {
            return card1.cardNumber - card2.cardNumber;
        }
        return card1.suit - card2.suit;
    }

    sortPlayerTurn(playersPlaying) {
        const temp = {};
        for (let i = 0; i < playersPlaying.length; i++) {
            temp[i + 1] = playersPlaying[i][0];
        }
        const playerOrder = [];
        for (const playerCard of Object.values(temp).sort(this.sortHand)) {
            playerOrder.push(Object.keys(temp)[Object.values(temp).indexOf(playerCard)]);
        }
        return playerOrder;

    }

    compareCards(card1, card2) {
        return card1.cardNumber === card2.cardNumber && card1.suit === card2.suit;

    }

}

module.exports = Helper