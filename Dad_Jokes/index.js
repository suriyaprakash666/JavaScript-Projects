const Button = document.getElementById('btn');
const Joke = document.getElementById('joke');

const apiKey = "yGFaZekwFdo0e96B+4mb5A==noUePFZF9UOqTPdz";
const url ="https://api.api-ninjas.com/v1/dadjokes?limit=1";

const options = {
    method: "GET",
    headers: { 'X-Api-Key': apiKey,},
};

async function getJoke() {
    
    Joke.innerText = "Updating..."
    const response = await fetch(url, options);
    const data = await response.json();
    Joke.innerText = data[0].joke;

}

Button.addEventListener("click", getJoke);