import { useEffect, useState } from "react";
import BlackjackInterface from "./BlackjackInterface";

const suits = ["h", "d", "c", "s"];
class PlayingCardObject {
    constructor(suit, rank, faceup) {
        this.suit = suit;
        this.rank = rank;
        this.faceup = faceup;
    }

}

const deck1 = [
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('s', 11, true),
];
const deck2 = [
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('c', 3, true),
];
const deck3 = [
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('s', 5, true),
];
const deck4 = [
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('d', 3, true),
];
const deck5 = [
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('s', 2, true),
];
const deck6 = [
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('d', 12, true),
];
const deck7 = [
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('h', 6, true),
];
const deck8 = [
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('c', 4, true),
];
const deck9 = [
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('c', 7, true),
];
const deck10 = [
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('c', 8, true),
];

export default function BlackjackGame() {
    const getInitialPlayerName = () => {
        if (typeof window === "undefined") return "Player";
        return window.localStorage.getItem("blackjackPlayerName") || "Player";
    }
    const getInitialAuthToken = () => {
        if (typeof window === "undefined") return "";
        return window.localStorage.getItem("blackjackAuthToken") || "";
    }

    //Found Online - Helper function
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const [deck, setDeck] = useState([]);
    const resetDeck = () => {
        let result = []
        for (let i = 1; i <= 13; i++) {
            for (const s of suits) {
                result.push(new PlayingCardObject(s, i, true));
            }
        }
        shuffle(result);
        setDeck(result);
    }

    //resets the deck on startup
    useEffect(() => {
        resetDeck();
    }, []);

    const pullCard = (count = 1) => {
        if (deck.length === 0) return;

        let result = deck.slice(0, count);
        setDeck(prev => prev.slice(count));
        return result;
    }

    const [mode, setMode] = useState("Random");
    const [level, setLevel] = useState(0);
    const [playerName, setPlayerName] = useState(getInitialPlayerName);
    const [playerPin, setPlayerPin] = useState("");
    const [authToken, setAuthToken] = useState(getInitialAuthToken);
    const [authMessage, setAuthMessage] = useState(getInitialAuthToken() ? "Logged in." : "");
    const [scoreSubmitMessage, setScoreSubmitMessage] = useState("");
    
    const [handWinner, setHandWinner] = useState("");
    const [handsPlayed, setHandsPlayed] = useState(0);
    const [dealerCards, setDealerCards] = useState([]);

    const [playerCards, setPlayerCards] = useState([]);

    const [clickableButtons, setClickableButtons] = useState(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels"]);
    const [bet, setBet] = useState(0);
    function handlePlayerNameChange(nextName) {
        setPlayerName(nextName);
        if (typeof window !== "undefined") {
            window.localStorage.setItem("blackjackPlayerName", nextName);
        }
    }

    async function handleLogin() {
        const username = playerName.trim();
        if (username.length === 0) {
            setAuthMessage("Enter a player name to log in.");
            return;
        }

        if (playerPin.trim().length < 4) {
            setAuthMessage("Enter a PIN with at least 4 characters.");
            return;
        }

        setAuthMessage("Logging in...");

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    pin: playerPin
                })
            });

            if (!response.ok) {
                throw new Error("Login failed.");
            }

            const data = await response.json();
            setAuthToken(data.token);
            setPlayerName(data.username);
            setPlayerPin("");
            setAuthMessage(`Logged in as ${data.username}.`);

            if (typeof window !== "undefined") {
                window.localStorage.setItem("blackjackAuthToken", data.token);
                window.localStorage.setItem("blackjackPlayerName", data.username);
            }
        } catch (err) {
            console.error("Login failed:", err);
            setAuthMessage("Could not log in. Is the server running?");
        }
    }

    async function handleLogout() {
        const token = authToken;
        setAuthToken("");
        setAuthMessage("Logged out.");

        if (typeof window !== "undefined") {
            window.localStorage.removeItem("blackjackAuthToken");
        }

        if (!token) return;

        try {
            await fetch("http://localhost:5000/auth/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }

    async function submitScore(finalScore, scoreLevel) {
        if (!authToken) {
            setScoreSubmitMessage("Log in before submitting a score.");
            return;
        }

        setScoreSubmitMessage("Submitting score...");

        try {
            const response = await fetch("http://localhost:5000/postScore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    score: finalScore,
                    level: scoreLevel
                })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                if (response.status === 401) {
                    setAuthToken("");
                    if (typeof window !== "undefined") {
                        window.localStorage.removeItem("blackjackAuthToken");
                    }
                    setAuthMessage("Log in again before submitting scores.");
                }
                throw new Error(data.error ?? "Score submission failed.");
            }

            setScoreSubmitMessage("Score submitted.");
        } catch (err) {
            console.error("Score submission failed:", err);
            setScoreSubmitMessage(err.message);
        }
    }

    function handleClick(type) {
        if (!clickableButtons.includes(type)) {
            return;
        }
        if (type == "Deal") {
            const cards = pullCard(4);
            const nextPlayerCards = [cards[0], cards[2]];
            const nextDealerCards = [cards[1], cards[3]];
            setPlayerCards(nextPlayerCards);
            setDealerCards(nextDealerCards);
            setHandWinner("");
            setClickableButtons(["Hit", "Stand", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            checkGameState("Deal", nextDealerCards, nextPlayerCards);
        }
        else if (type == "Add Bet"){
            if (score >= 20)
            {
                setBet(prev => prev + 20);
                setScore(prev => prev - 20);
            }
        }
        else if (type == "Clear Bet"){
            setScore(prev => prev + bet);
            setBet(0);
        }
        else if (type == "Hit") {
            const nextPlayerCards = playerCards.concat(pullCard());
            setPlayerCards(nextPlayerCards);
            setClickableButtons(["Hit", "Stand", "Reset", "Random", "Levels"]);
            checkGameState("Hit", dealerCards, nextPlayerCards);
        }
        else if (type == "Stand") {
            checkGameState("Stand");
        }
        else if (type == "Reset") {
            setPlayerCards([]);
            setDealerCards([]);
            if (level == 0)
            {
                resetDeck();
            }
            else if (level == 1)
            {
                setDeck(deck1);
            }
            else if (level == 2)
            {
                setDeck(deck2);
            }
            else if (level == 3)
            {
                setDeck(deck3);
            }
            else if (level == 4)
            {
                setDeck(deck4);
            }
            else if (level == 5)
            {
                setDeck(deck5);
            }
            else if (level == 6)
            {
                setDeck(deck6);
            }
            else if (level == 7)
            {
                setDeck(deck7);
            }
            else if (level == 8)
            {
                setDeck(deck8);
            }
            else if (level == 9)
            {
                setDeck(deck9);
            }
            else if (level == 10)
            {
                setDeck(deck10);
            }
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setScoreSubmitMessage("");
        }
        else if (type == "Random")
        {
            setMode("Random");
            setPlayerCards([]);
            setDealerCards([]);
            resetDeck();
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(0);
            setScoreSubmitMessage("");
        }
        else if (type == "Levels")
        {
            setMode("Levels");
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
        }
        else if (type == "Level1")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck1);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(1);
            setScoreSubmitMessage("");
        }
        else if (type == "Level2")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck2);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(2);
            setScoreSubmitMessage("");
        }
        else if (type == "Level3")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck3);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(3);
            setScoreSubmitMessage("");
        }
        else if (type == "Level4")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck4);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(4);
            setScoreSubmitMessage("");
        }
        else if (type == "Level5")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck5);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(5);
            setScoreSubmitMessage("");
        }
        else if (type == "Level6")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck6);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(6);
            setScoreSubmitMessage("");
        }
        else if (type == "Level7")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck7);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(7);
            setScoreSubmitMessage("");
        }
        else if (type == "Level8")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck8);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(8);
            setScoreSubmitMessage("");
        }
        else if (type == "Level9")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck9);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(9);
            setScoreSubmitMessage("");
        }
        else if (type == "Level10")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck10);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(10);
            setScoreSubmitMessage("");
        }
    }

    function getHandValue(cards) {
        let total = cards.reduce((sum, card) => {
            const value = card.rank > 10 ? 10 : card.rank;
            return sum + value;
        }, 0);
        const aces = cards.filter(card => card.rank === 1);
        for (let i = 0; i < aces.length; i++) {
            if (total + 10 <= 21) total += 10;
        }
        return total;
    }

    function checkGameState(caller, dealerHand = dealerCards, playerHand = playerCards) {
        //dealerCards should be passed recursively because this function is recursive
        //In a recursive function call, hook is never updated
        const playerTotal = getHandValue(playerHand)
        let dealerCardsLocal = dealerHand.slice();
        let dealerTotal = getHandValue(dealerCardsLocal);
        if (playerTotal === 21 && playerHand.length === 2 && dealerTotal !== 21) {
            setHandWinner("Player");
            endRound(150);
        }
        if (playerTotal > 21) {
            setHandWinner("Dealer");
            endRound(0);
        }
        else if (dealerTotal > 21) {
            setHandWinner("Player");
            endRound(100);
        }
        else if (caller == "Stand") {

            if (dealerTotal >= 17 || dealerTotal > playerTotal) {
                if (dealerTotal > 21 || playerTotal > dealerTotal) {
                    setHandWinner("Player");
                    endRound(100);
                }
                else if (dealerTotal > playerTotal) {
                    setHandWinner("Dealer");
                    endRound(0);
                }
                else {
                    setHandWinner("Draw");
                    endRound(50);
                }
                return;
            }

            const newSuit = suits[Math.floor(Math.random() * suits.length)];
            const newRank = Math.floor((Math.random() * 10)) + 1;
            const newCard = { suit: newSuit, rank: newRank, faceup: true };
            dealerCardsLocal = dealerCardsLocal.concat(newCard);

            // THIS CANNOT BE DONE BECAUSE DEALERCARDS IS NOT GUARENTEED TO BE UPDATED IMMEDIATELY!
            // dealerTotal = getHandValue(dealerCards)

            dealerTotal = getHandValue(dealerCardsLocal);
            setDealerCards(dealerCardsLocal);

            setTimeout(() => {
                checkGameState("Stand", dealerCardsLocal);
            }, 100);
        }
    }

    const [score, setScore] = useState(100);
    const [highScore, setHighScore] = useState(0);
    const [highScoreL1, setHighScoreL1] = useState(0);
    const [highScoreL2, setHighScoreL2] = useState(0);
    const [highScoreL3, setHighScoreL3] = useState(0);
    const [highScoreL4, setHighScoreL4] = useState(0);
    const [highScoreL5, setHighScoreL5] = useState(0);
    const [highScoreL6, setHighScoreL6] = useState(0);
    const [highScoreL7, setHighScoreL7] = useState(0);
    const [highScoreL8, setHighScoreL8] = useState(0);
    const [highScoreL9, setHighScoreL9] = useState(0);
    const [highScoreL10, setHighScoreL10] = useState(0);
    function endRound(tScore) {
        setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
        let nextScore = score;
        if (tScore == 0)
        {
            setBet(0);
        }
        else if (tScore == 50)
        {
            nextScore = score + bet;
            setScore(nextScore);
            setBet(0);
        }
        else if (tScore == 100)
        {
            if (bet == 0 && score == 0)
            {
                nextScore = score + 100;
            }
            else
            {
                nextScore = score + bet * 2;
            }
            setScore(nextScore);
            setBet(0);
        }
        else if (tScore == 150)
        {
            if (bet == 0 && score == 0)
            {
                nextScore = score + 150;
            }
            else
            {
                nextScore = score + bet * 2.5;
            }
            nextScore = score + bet * 2.5;
            setScore(nextScore);
            setBet(0);
        }
        const amount = handsPlayed + 1;
        setHandsPlayed(prev => prev + 1);
        if (amount >= 10)
        {
            if (level == 0)
            {
                if (nextScore > highScore)
                {
                    setHighScore(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 1)
            {
                if (nextScore > highScoreL1)
                {
                    setHighScoreL1(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 2)
            {
                if (nextScore > highScoreL2)
                {
                    setHighScoreL2(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 3)
            {
                if (nextScore > highScoreL3)
                {
                    setHighScoreL3(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 4)
            {
                if (nextScore > highScoreL4)
                {
                    setHighScoreL4(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 5)
            {
                if (nextScore > highScoreL5)
                {
                    setHighScoreL5(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 6)
            {
                if (nextScore > highScoreL6)
                {
                    setHighScoreL6(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 7)
            {
                if (nextScore > highScoreL7)
                {
                    setHighScoreL7(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 8)
            {
                if (nextScore > highScoreL8)
                {
                    setHighScoreL8(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 9)
            {
                if (nextScore > highScoreL9)
                {
                    setHighScoreL9(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            else if (level == 10)
            {
                if (nextScore > highScoreL10)
                {
                    setHighScoreL10(nextScore);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"]);
            }
            submitScore(nextScore, level);
        }
    }

    return (
        <>
            <BlackjackInterface
                handleClick={handleClick}
                dealerCards={dealerCards}
                playerCards={playerCards}
                handWinner={handWinner}
                playerScore={score}
                highScore={(level == 0 && highScore) + (level == 1 && highScoreL1) + (level == 2 && highScoreL2) + (level == 3 && highScoreL3) + (level == 4 && highScoreL4) + (level == 5 && highScoreL5) + (level == 6 && highScoreL6) + (level == 7 && highScoreL7) + (level == 8 && highScoreL8) + (level == 9 && highScoreL9) + (level == 10 && highScoreL10)}
                betScore={bet}
                playerName={playerName}
                onPlayerNameChange={handlePlayerNameChange}
                playerPin={playerPin}
                onPlayerPinChange={setPlayerPin}
                onLogin={handleLogin}
                onLogout={handleLogout}
                isAuthenticated={Boolean(authToken)}
                authMessage={authMessage}
                scoreSubmitMessage={scoreSubmitMessage}
                dealButtonDisabled={clickableButtons.findIndex(a => a == "Deal") == -1}
                addBetButtonDisabled={clickableButtons.findIndex(a => a == "Add Bet") == -1}
                clearBetButtonDisabled={clickableButtons.findIndex(a => a == "Clear Bet") == -1}
                hitButtonDisabled={clickableButtons.findIndex(a => a == "Hit") == -1}
                standButtonDisabled={clickableButtons.findIndex(a => a == "Stand") == -1}
                resetButtonDisabled={clickableButtons.findIndex(a => a == "Reset") == -1}
                doneLevel={handsPlayed >= 10}
                inLevels={mode != "Random"}
            />
        </>
    )
}
