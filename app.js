// DOM Elements
const selectorOptions1 = document.getElementById("select1");
const selectorOptions2 = document.getElementById("select2");
const fightBtn = document.getElementById("fightBtn");
const pkmn1header = document.getElementById("pkmn1header")
const pkmn1HP = document.getElementById("pkmnOneHP");
const pkmn1Img = document.getElementById("pkmnOneImg");
const img1Box = document.getElementById("img1-box")
const pkmn1Atk = document.getElementById("pkmnOneAtk");
const pkmn2header = document.getElementById("pkmn2header")
const pkmn2HP = document.getElementById("pkmnTwoHP");
const pkmn2Img = document.getElementById("pkmnTwoImg");
const img2Box = document.getElementById("img2-box")
const pkmn2Atk = document.getElementById("pkmnTwoAtk");
let tie = document.getElementById("tie");

// Populates selection inputs
async function fillOptions() {
    const optionData = await (await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")).json();
    let options = '<option value="" disabled selected>Choose pokemon...</option>';

    for (let i = 0; i < optionData.results.length; i++) {
        name = optionData.results[i].name;
        options += `<option value="${name}">${capitalize(name)}</option>`;
    }

    selectorOptions1.innerHTML = options;
    selectorOptions2.innerHTML = options;
}

// Disable fight button if no selection is made
function activateBtn() {
    if (selectorOptions1.value !== "" && selectorOptions2.value !== "") {
        fightBtn.disabled = false;
    }
}


// Fetch Pokemon 1
async function pokemonOne(pokemon) {
    let pokemon1 = pokemon.value;
    const data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`)).json();
    let imgLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`

    pkmn1header.innerText = capitalize(data.name);
    pkmn1Img.src = imgLink;
    pkmn1HP.innerText = data.stats[0].base_stat;
    pkmn1Atk.innerText = data.stats[1].base_stat;
}

// Fetch Pokemon 2
async function pokemonTwo(pokemon) {
    let pokemon1 = pokemon.value;
    const data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`)).json();
    let imgLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`

    pkmn2header.innerText = capitalize(data.name);
    pkmn2Img.src = imgLink;
    pkmn2HP.innerText = data.stats[0].base_stat;
    pkmn2Atk.innerText = data.stats[1].base_stat;
}

// Battle functionallity
fightBtn.addEventListener("click", () => {

    tie.classList.remove("show");
    tie.classList.add("hide");
    img1Box.classList = "shake1";
    img2Box.classList = "shake2";
    fightBtn.innerText = "Fighting!"
    fightBtn.disabled = true;

    setTimeout(function () {
        battle()
        fightBtn.innerText = "Fight!"
        fightBtn.disabled = false;
    }, randomNumber());
});

function battle() {
    let pkmn1points = 0;
    let pkmn2points = 0;


    if (parseInt(pkmn1Atk.innerText) > parseInt(pkmn2Atk.innerText)) {
        pkmn1points += 1;
    } else if (parseInt(pkmn1Atk.innerText) < parseInt(pkmn2Atk.innerText)) {
        pkmn2points += 1;
    }

    if (parseInt(pkmn1HP.innerText) > parseInt(pkmn2HP.innerText)) {
        pkmn1points += 1;
    } else if (parseInt(pkmn1HP.innerText) < parseInt(pkmn2HP.innerText)) {
        pkmn2points += 1;
    }

    if (pkmn1points > pkmn2points) {
        img1Box.classList.add("winner");
        img1Box.classList.remove("shake1");
        img2Box.classList.add("loser");
        img2Box.classList.remove("shake2");
    } else if (pkmn1points < pkmn2points) {
        img2Box.classList.add("winner");
        img2Box.classList.remove("shake2");
        img1Box.classList.add("loser");
        img1Box.classList.remove("shake1");
    } else {
        img1Box.classList.remove("shake1");
        img2Box.classList.remove("shake2");
        fightBtn.innerText = "Fight!"
        fightBtn.disabled = false;
        tie.classList.add("show");
        tie.classList.remove("hide");
    }
}


// Generates random HEX
function hexColor(pkmn) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    pkmn.style.filter = `drop-shadow(0 0 0.5rem #${randomColor})`;
}

// Random number for battle delay
function randomNumber() {
    let sum = Math.floor(Math.random() * (4000 - 2500 + 1)) + 2500;
    return sum
}

// Capitalize
function capitalize(name) {
    let original = name;
    let capitalize = original.charAt(0).toUpperCase() + original.slice(1);
    return capitalize
}

selectorOptions1.addEventListener("change", () => {
    pokemonOne(selectorOptions1)
    hexColor(pkmn1Img)
    activateBtn()
    pkmn1Img.classList.add("flip");
    img1Box.classList.remove("wiggle1", "loser", "winner");
    img1Box.classList.add("hover1");
});

selectorOptions2.addEventListener("change", () => {
    pokemonTwo(selectorOptions2)
    hexColor(pkmn2Img)
    activateBtn()
    img2Box.classList.remove("wiggle2", "loser", "winner");
    img2Box.classList.add("hover2");
});

fillOptions()
