const pokemonInp = document.getElementById("pokemonInp");
const submit = document.getElementById("submit");
const stats = document.getElementById("stats");
const test = document.getElementById("test");
const typeColours = {
    normal: "gray",
    fire: "red",
    water: "rgb(60, 125, 255)",
    grass: "green",
    electric: "yellow",
    ice: "lightblue",
    fighting: "rgb(150, 0, 0)",
    poison: "pink",
    ground: "brown",
    flying: "rgb(150, 190, 255)",
    psychic: "purple",
    dragon: "orange",
    dark: "black",
    fairy: "pink",
    steel: "gray",
    bug: "rgb(60, 255, 144)",
    ground: "brown",
    rock: "brown",
    poison: "pink",
    ghost: "white"
};

function cap(s1){
    return `${s1.charAt(0).toUpperCase()}${s1.slice(1)}`; // legit just searched ts up and made it a function :) https://www.geeksforgeeks.org/javascript/how-to-make-first-letter-of-a-string-uppercase-in-javascript/ 3rd approach
}

submit.onclick = async function getPokemon() {
    const pokemon = pokemonInp.value.toLowerCase(); // ensures that pokemon can be searched for eg Charmander -> charmander
    try { // tries the pokemon name and if fails goes to the if statement -> if doesnt find pokemon goes to catches -> sends error message to site
        const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // learned about crappy apis :(
        if(!pokemonRes.ok){
            throw new Error("Pokemon was not found! Try again?")
        }
        const pokemonInfo = await pokemonRes.json();

        // sending the values to the screen
        document.getElementById("name").textContent = cap(pokemonInfo.name);

        document.getElementById("hp").textContent = pokemonInfo.stats[0].base_stat;
        document.getElementById("attack").textContent = pokemonInfo.stats[1].base_stat;
        document.getElementById("defense").textContent = pokemonInfo.stats[2].base_stat;
        document.getElementById("specialAttack").textContent = pokemonInfo.stats[3].base_stat;
        document.getElementById("specialDefense").textContent = pokemonInfo.stats[4].base_stat;
        document.getElementById("speed").textContent = pokemonInfo.stats[5].base_stat;

        document.getElementById("types").textContent = cap(pokemonInfo.types[0].type.name);

        if(typeColours[pokemonInfo.types[0].type.name]){ // goes into object lf element
            const type1Col = typeColours[pokemonInfo.types[0].type.name];
            document.getElementById("types").style.color = type1Col;
        }

        document.getElementById("types2").style.fontSize = "0px";
        document.getElementById("emptySpace").style.fontSize = "0px"
        document.getElementById("amtTypes").textContent = "Type:"

        if(pokemonInfo.types.length >= 2){
            document.getElementById("amtTypes").textContent = "Types:"
            document.getElementById("emptySpace").textContent = " and ";
            document.getElementById("types2").textContent = cap(pokemonInfo.types[1].type.name);
            document.getElementById("types2").style.fontSize = "48px";
            document.getElementById("emptySpace").style.fontSize = "48px"

            if(typeColours[pokemonInfo.types[1].type.name]){
                const type2Col = typeColours[pokemonInfo.types[1].type.name];
                document.getElementById("types2").style.color = type2Col;
            } 
        }
        document.getElementById("id").textContent = pokemonInfo.id;
        document.getElementById("weight").textContent = pokemonInfo.weight;

        document.getElementById("list").style.fontSize = "48px";
        document.getElementById("list2").style.fontSize = "48px";
        document.getElementById("anchor").style.fontSize = "48px";

        switch(true){
            case pokemonInfo.abilities.length >= 4:
                document.getElementById("ability4").textContent = cap(pokemonInfo.abilities[3].ability.name);
                document.getElementById("ability4").style.fontSize = "48px";
                document.getElementById("abilityTxt4").style.fontSize = "48px";
            case pokemonInfo.abilities.length >= 3:
                document.getElementById("ability3").textContent = cap(pokemonInfo.abilities[2].ability.name);
                document.getElementById("ability3").style.fontSize = "48px";
                document.getElementById("abilityTxt3").style.fontSize = "48px";
            case pokemonInfo.abilities.length >= 2:
                document.getElementById("ability2").textContent = cap(pokemonInfo.abilities[1].ability.name);
                document.getElementById("ability2").style.fontSize = "48px";
                document.getElementById("abilityTxt2").style.fontSize = "48px";
            case pokemonInfo.abilities.length >= 1:
                document.getElementById("ability1").textContent = cap(pokemonInfo.abilities[0].ability.name);
                document.getElementById("ability1").style.fontSize = "48px";
                document.getElementById("abilityTxt1").style.fontSize = "48px";
                break;
        }

        document.getElementById("anchor").href = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        document.getElementById("justPutPokemonHere").textContent = cap(pokemonInfo.name);


    }
    catch(err) {
        stats.textContent = err.message;
        document.getElementById("name").textContent = ""
        document.getElementById("list").style.fontSize = "0px";
        document.getElementById("list2").style.fontSize = "0px";
        document.getElementById("anchor").style.fontSize = "0px";
        document.getElementById("abilityTxt1").style.fontSize = "0px"; 
        document.getElementById("abilityTxt2").style.fontSize = "0px"; 
        document.getElementById("abilityTxt3").style.fontSize = "0px"; 
        document.getElementById("abilityTxt4").style.fontSize = "0px"; 
        document.getElementById("ability1").style.fontSize = "0px"; 
        document.getElementById("ability2").style.fontSize = "0px"; 
        document.getElementById("ability3").style.fontSize = "0px"; 
        document.getElementById("ability4").style.fontSize = "0px"; // For some reason it didnt work if i changed the id of their div so ig the long way works
        setTimeout(function() {
            stats.textContent = "";
        }, 4000);
    }
} // plz work speed
