function run(genFunc){
    const genObject = genFunc();// criando um objeto generator

    function iterate(iteration){//recursive function to iterate through promises
        if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
            .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
            .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered        
    }

    try{
        return iterate(genObject.next());// starts the recursive loop;
    }catch(ex){
        return Promise.reject(ex);
    }

}

function *gen(){
    //check if inputs are valid
    if(document.getElementById("ships1").value == document.getElementById("ships2").value) 
        throw new Error("Invalid Input - Select different ships!");   

    //fetch starship1
    var starshipResponse1 = yield fetch("https://swapi.co/api/starships/"+ document.getElementById("ships1").value);
    var starship1 = yield starshipResponse.json();

    //fetch starship2
    var starshipResponse2 = yield fetch("https://swapi.co/api/starships/"+ document.getElementById("ships2").value);
    var starship2 = yield starshipResponse.json();

    //fetch the characters
    var characters = film.characters;
    var characterString = "Characters: <br>";
    for(let i = 0; i < characters.length ; i++){
        var tempCharacterResponse = yield fetch(characters[i]);
        var tempCharacter = yield tempCharacterResponse.json();
        characterString += tempCharacter.name + "<br>";
    }

    //display film title and charactes in the film
    document.getElementById("filmsText").innerHTML = "Film: <br>" + film.title;
    document.getElementById("peopleText").innerHTML = characterString;
}

document.getElementById("btnCompare").addEventListener('click',function(){
    run(gen).catch(function(err){
        alert(err.message);
    });
})