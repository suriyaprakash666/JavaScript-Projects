const Button = document.getElementById('btn');
const Joke = document.getElementById('joke');

const apiKey = "yGFaZekwFdo0e96B+4mb5A==noUePFZF9UOqTPdz";
const apiURL ="https://api.api-ninjas.com/v1/dadjokes?limit=1";

const options = {
    method: "GET",
    headers: { 'X-Api-Key': apiKey,},
};

async function getJoke() {
    try{
        Joke.innerText = "Updating...";
        Button.disabled = true;
        Button.innerText = "Loading...";

        const response = await fetch(apiURL, options);
        const data = await response.json();

        Button.disabled = false;
        Button.innerText = "Tell me a joke";

        Joke.innerText = data[0].joke;
    } catch(error) {
        Joke.innerText = "An error happened, try again later";
        Button.disabled = false;
        Button.innerText = "Tell me a joke";
        console.log(error);
    }
}

Button.addEventListener("click", getJoke);