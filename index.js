const Card = require("./card");
const Deck = require("./deck");
const Helper = require("./helper");

const prompt = require('prompt-sync')();

const helper = new Helper()

const HAND_SIZE = 13

// deck stuff (make a deck with a size of 52, shuffle)
let deck = new Deck(52)
deck.makeDeck();
deck = deck.shuffleDeck();;

// player hands
let player1Hand = []
let player2Hand = []
let player3Hand = []
let player4Hand = []

// the players playing in a list
let playersPlaying = [player1Hand, player2Hand, player3Hand, player4Hand]

// deal the cards, based on the hand size, and pop it off the deck
for (let _ = 0; _ < HAND_SIZE; _++) {
    for (let i = 0; i < playersPlaying.length; i++) {
        playersPlaying[i].push(deck.pop())
    }
}

// sort each player's hand because some of these fools don't sort their own cards irl
for (let i = 0; i < playersPlaying.length; i++) {
    playersPlaying[i].sort(helper.sortHand)
}

//  previous card placed in a list in case its multiple
let previousCardsPlaced = []

// the index of the previous player
let previousPlayerIndex

// the order sorted in the order of the lowest cards in each hand
let playerOrder = helper.sortPlayerTurn(playersPlaying)
console.log(playerOrder)

while (true) {
    // loop through the players in a specific order based on who has the lowest cards
    for (let currentPlayer = 0; currentPlayer < playerOrder.length; currentPlayer++) {
        let currentPlayerIndex = playerOrder[currentPlayer]
        let nextTurn = false

        console.log(`Player ${currentPlayerIndex}'s turn`)
        console.log(`Place a card`)

        // variable for the list of the cards in the player's hand
        let playerHand = playersPlaying[currentPlayerIndex - 1]

        // string that is going to be printed that displays all the cards that the player has in a neat format
        let allCardsListedString = "Your hand : ";

        // loop through each card in their deck then converting it to string format to concat to $allCardsListedString
        for (let i = 0; i < playerHand.length; i++) {
            allCardsListedString += `${playerHand[i].toString()}, `
        }

        // slices off the last space and comma
        allCardsListedString = allCardsListedString.slice(0, -2)

        // displays the cards
        console.log(`${allCardsListedString} [${playerHand.length}]`)

        // prompt the user to place down a card
        let input = prompt("Card name(s): ")

        // while it is still their turn (ie not the next player's turn)
        while (!nextTurn) {
            // if the input is a pass or quit, the pass or quit respectively
            switch (input.toLowerCase()) {
                case "pass":
                    nextTurn = true // move onto next turn
                    break // break out of the while loop
                case "quit":
                    return // return the program (ie just end it)
            }

            // split the input up into chunks
            let strFormCardsBeingPlaced = input.split(",")

            // list for all the cards that they are requesting to place down
            let cardsBeingPlaced = []

            // looping through the items inside $strFormCardsBeingPlaced
            for (let i = 0; i < strFormCardsBeingPlaced.length; i++) {
                // trim them up so it looks nice and clean
                strFormCardsBeingPlaced[i] = strFormCardsBeingPlaced[i].trim()

                // split each item into smaller chunks to parse
                let cardSplitUp = strFormCardsBeingPlaced[i].split(" ")

                // if any part of it is undefined
                // todo check if the terms are valid
                if (cardSplitUp[0] === undefined || cardSplitUp[2] === undefined) {
                    console.log("Invalid card, try again")
                    input = prompt("Card name(s): ")
                } else {
                    // if indeed valid add the card to the $cardsBeingPlaced list, as an actual card object
                    // casting the first item in the list to a number to make it easy to compare
                    cardsBeingPlaced.push(new Card(Number(cardSplitUp[0]), cardSplitUp[2]))
                }
            }

            // loop through each card in the hand
            playerHandLoop: for (let i = 0; i < playerHand.length; i++) {
                // check if the cards they are trying to place is inside their hand
                // todo maybe change to just a check if card being placed is inside the players hand?
                cardsPlacedLoop: for (let j = 0; j < cardsBeingPlaced.length; j++) {
                    if (helper.compareCards(cardsBeingPlaced[j], playerHand[i])) {
                        console.log(`Successfully placed down : ${cardsBeingPlaced}`)
                        nextTurn = true
                        break playerHandLoop // if valid card then just break out of this loop
                    } else {
                        console.log("Invalid card, try again")
                        input = prompt("Card name(s): ")
                    }
                }

            }



        }



        // check the card the player wants to place against the previous card
        // if it can beat it, then beat it
        //      - if singles, if card number is higher than beat it, if suit is higher but the card number is the same still beat it, if not then fail
        //      - if doubles, triples, or quads, is higher than the previous double, triples, or quads, all the numbers need to be the same number, regardless of suit
        //      - if straight, check if the straight's length is the same as the previous straight, check if the straight's final card is higher than the previous straight
        //      - if bomb, the bomb has to be quads, or a triple consecutive doubles
        // if passing, then skip the turn, do not consume any cards, move onto the next player
        //      - if all players passed then it resets back onto the person who placed the last cards
        // if it can not output an error





    }
}


