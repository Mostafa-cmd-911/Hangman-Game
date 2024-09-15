// Letters
const letters = "+#abcdefghijklmnopqrstuvwvyz.";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
    // Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = "letter-box";

    // Append Span To Letters Container
    lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
    programming: [
        "JavaScript",
        "Python",
        "C++",
        "Java",
        "Ruby",
        "HTML",
        "CSS",
        "Swift",
        "Go",
        "Rust",
        "Kotlin",
        "TypeScript",
        "PHP",
        "C#",
        "SQL",
    ],
    movies: [
        "Inception",
        "The Matrix",
        "Interstellar",
        "The Godfather",
        "Pulp Fiction",
        "The Shawshank Redemption",
        "Fight Club",
        "Forrest Gump",
        "The Dark Knight",
        "Titanic",
        "Gladiator",
        "Schindler’s List",
        "Star Wars",
        "Avengers: Endgame",
        "The Lord of the Rings",
    ],
    people: [
        "Albert Einstein",
        "Marie Curie",
        "Isaac Newton",
        "Ada Lovelace",
        "Nelson Mandela",
        "Leonardo da Vinci",
        "William Shakespeare",
        "Martin Luther King Jr.",
        "Galileo Galilei",
        "Nikola Tesla",
        "Steve Jobs",
        "Mahatma Gandhi",
        "Elon Musk",
        "Mother Teresa",
        "Cleopatra",
    ],
    countries: [
        "Egypt",
        "France",
        "Japan",
        "Brazil",
        "Canada",
        "Australia",
        "Germany",
        "India",
        "China",
        "United States",
        "Mexico",
        "Russia",
        "South Africa",
        "Italy",
        "Spain",
        "plaestine",
    ],
};

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

console.log(randomValueValue);

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convret Chosen Words To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach((letter) => {
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === " ") {
        // Add Class To span
        emptySpan.className = "has-space";
    }

    // Append Span To The Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
    // Check if the game is finished
    if (lettersContainer.classList.contains("finished")) {
        return;
    }

    // Set The Choose Status
    let theStatus = false;

    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        // Get Clicked Letter
        let theClickLetter = e.target.innerHTML.toLowerCase();

        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, wordIndex) => {
            // If The Clicked Letter = The Chosen Word Letter
            if (theClickLetter === wordLetter) {
                theStatus = true;
                // Loop On All Guess Spans
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickLetter;
                    }
                });
            }
        });

        if (!theStatus) {
            // Increase The Wrong Attempts
            wrongAttempts++;

            // Add Class Wrong On The Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // Play Fail
            // document.getElementById("fail").play();

            if (wrongAttempts === 8) {
                endGameFail();
                lettersContainer.classList.add("finished");
            }
        } else {
            // Check if all letters are guessed
            let allGuessed = true;
            guessSpans.forEach((span) => {
                if (span.innerHTML === "") {
                    allGuessed = false;
                }
            });

            if (allGuessed) {
                endGameSuccess();
                lettersContainer.classList.add("finished");
            }
        }
    }
});

function endGameFail() {
    let div = document.createElement("div");
    let text = document.createTextNode(
        `Game Over, the word is ${randomValueValue}`
    );
    div.appendChild(text);
    div.classList.add("pop");
    document.body.appendChild(div);
}

function endGameSuccess() {
    let div = document.createElement("div");
    let text = document.createTextNode(
        `You Win! The word is ${randomValueValue}`
    );
    div.appendChild(text);
    div.classList.add("pop");
    document.body.appendChild(div);

    // Add class to disable clicking on letters after winning
    lettersContainer.classList.add("finished");
}
