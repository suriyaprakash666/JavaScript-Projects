const InputElement = document.getElementById("input");
const NoteElement = document.getElementById("note");
const meaningContainerElement = document.getElementById("meaning-container");
const titleElement = document.getElementById("title");
const meaningElement = document.getElementById("meaning");
const audioElement = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    NoteElement.style.display = "block";
    meaningContainerElement.style.display = "none";
    NoteElement.innerText = `Searching the meaning of '${word}'`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    console.log(result);

    if (result.title) {
      titleElement.innerText = word;
      meaningElement.innerText = "N/A";
      audioElement.style.display = "none";
    } else {
      NoteElement.style.display = "none";
      meaningContainerElement.style.display = "block";
      audioElement.style.display = "inline-flex";
      titleElement.innerText = result[0].word;
      meaningElement.innerText =
        result[0].meanings[0].definitions[0].definition;
      audioElement.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    NoteElement.innerText = `an error occurred!s try again later`;
  }
}

InputElement.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
