/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        for (let game of games) {

        // create a new div element, which will become the game card
            //Button for game card modal
            let gameButton = document.createElement("button");
            let gameCard = document.createElement("div");
            

        // add the class game-card to the list
            //Gave Button the class of the game card so it still looks the same
            gameButton.classList.add("game-card");

        // set the inner HTML using a template literal to display some info
        // about each game 
            gameCard.innerHTML = `
                <img src="${game.img}" class="game-img">
                <p>Title: ${game.name}</p>
                <p>Overview: ${game.description}</p>
            `;
        
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        // append the game to the games-container
            gameButton.addEventListener("click", () => {
                let gameModal = document.getElementById("gamecard-modal")
                let modalInfo = document.getElementById("gamecard-info")
                
                console.log(game.name)
                
                modalInfo.innerHTML = `
                <button id="close">&times;</button>
                <img src="${game.img}" id="modal-img">
                <p>Title: ${game.name}</p>
                <p>Overview: ${game.description}</p>
                <p>Number of Contributors: ${game.backers}</p>
                <p>Total Raised: $${game.pledged}</p>
                <p>Goal: $${game.goal}</p>
            `;
                gameModal.classList.add("active");
                
                let modalClose = document.getElementById("close")
                modalClose.addEventListener("click", () => {
                    gameModal.classList.remove("active");
                });

            });
            gameButton.append(gameCard);
            //appends gameButton to games-container
            gamesContainer.append(gameButton);
            //console.log(gameButton)
            
        } 
        
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContibutions = GAMES_JSON.reduce((acc,game) => {
    return acc + game.backers;
}, 0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
let fTotalContributions = totalContibutions.toLocaleString("en-US")
contributionsCard.innerHTML = `
    <p>${fTotalContributions}</p>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc,game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
let fTotalRaised = totalRaised.toLocaleString("en-US")
raisedCard.innerHTML = `
    <p>$${fTotalRaised}</p>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce((acc, game) => {
    return acc + 1;
}, 0);

let fTotalGames = totalGames.toLocaleString("en-US")
gamesCard.innerHTML = `
    <p>${fTotalGames}</p>
`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedList = GAMES_JSON.filter((game) => {
            return game.pledged < game.goal;
        });
    

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedList);

}
/*let unfundedList = GAMES_JSON.filter((game) => {
            return game.pledged < game.goal
        })
console.log(unfundedList)*/

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedList = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedList);
}
/*let fundedList = GAMES_JSON.filter((game) => {
            return game.pledged > game.goal
        })
console.log(fundedList)*/

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numUfundedList = GAMES_JSON.reduce((acc, game) => {
            return acc + (game.pledged > game.goal ?  0 : 1);
}, 0)
//console.log(numUfundedList)

// create a string that explains the number of unfunded games using the ternary operator
let expln = `We have raised $800,268 for our ${GAMES_JSON.length} games. Currently, ${numUfundedList}
 ${numUfundedList <= 1 ? "game remains": "games remain"} unfunded. We need your help.`


// create a new DOM element containing the template string and append it to the description container
let dscrption = document.createElement("p")
dscrption.innerHTML = `<p>${expln}</p>`
descriptionContainer.appendChild(dscrption)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
//console.log(sortedGames)

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...others ] = sortedGames;
//console.log(first)
//console.log(second)

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGame = document.createElement("p");
firstGame.innerHTML = `<p>${first.name}</p>`
//console.log(firstGame)
firstGameContainer.appendChild(firstGame)

// do the same for the runner up item
let secondGame = document.createElement("p");
secondGame.innerHTML = `<p>${second.name}</p>`;
secondGameContainer.appendChild(secondGame)


 
