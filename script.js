const main = document.querySelector("main");
const btnInsertText = document.querySelector('.btn-toggle');
const divTextBox = document.querySelector('.text-box');
const closeDivtextBox = document.querySelector('.close');
const selectElement = document.querySelector('select');
const buttonReadText = document.querySelector('#read');
const textArea = document.querySelector('#text-area');


const humanExpressions = [
    { img: 'img/drink.jpg', text: { "pt-br": 'Estou com sede', "en-us": "I'M THIRSTY" } },
    {
        img: 'img/food.jpg',
        text: { "pt-br": 'Estou com fome', "en-us": "I'M HUNGRY" }
    },
    { img: 'img/tired.jpg', text: { "pt-br": 'Estou cansado', "en-us": "I AM TIRED" } },
    { img: 'img/hurt.jpg', text: { "pt-br": 'Estou machucado', "en-us": "I'M HURT" } },
    { img: 'img/happy.jpg', text: { "pt-br": 'Estou feliz', "en-us": "I'M HAPPY" } },
    { img: 'img/angry.jpg', text: { "pt-br": 'Estou com raiva', "en-us": "I'M ANGRY" } },
    { img: 'img/sad.jpg', text: { "pt-br": 'Estou triste', "en-us": "I'M SAD" } },
    { img: 'img/scared.jpg', text: { "pt-br": 'Estou assustado', "en-us": "I'M SCARED" } },
    { img: 'img/outside.jpg', text: { "pt-br": 'Quero ir lá fora', "en-us": "I WANT TO GO OUTSIDE" } },
    { img: 'img/home.jpg', text: { "pt-br": 'Quero ir pra casa', "en-us": "I WANT TO GO HOME" } },
    { img: 'img/school.jpg', text: { "pt-br": 'Quero ir pra escola', "en-us": "I WANT TO GO TO SCHOOL" } },
    { img: 'img/grandma.jpg', text: { "pt-br": 'Quero ver a vovó', "en-us": "I WANT TO SEE GRANDMA" } }
];
// const humanExpressions = [
//     { img: 'img/drink.jpg', text: "I'M THIRSTY" },
//     { img: 'img/food.jpg', text: "I'M HUNGRY" },
//     { img: 'img/tired.jpg', text: "I AM TIRED" },
//     { img: 'img/hurt.jpg', text: "I'M HURT" },
//     { img: 'img/happy.jpg', text: "I'M HAPPY" },
//     { img: 'img/angry.jpg', text: "I'M ANGRY" },
//     { img: 'img/sad.jpg', text: "I'M SAD" },
//     { img: 'img/scared.jpg', text: "I'M SCARED" },
//     { img: 'img/outside.jpg', text: "I WANT TO GO OUTSIDE" },
//     { img: 'img/home.jpg', text: "I WANT TO GO HOME" },
//     { img: 'img/school.jpg', text: "I WANT TO GO TO SCHOOL" },
//     { img: 'img/grandma.jpg', text: "QUERO VER A VOVÓ"}
// ];

const utterance = new SpeechSynthesisUtterance();

const setTexMessenge = (text) => {
    utterance.text = text;
    // utterance.rate = 0.5;
}
const setVoice = ({ target: { value } }) => {
    const selectedVoice = voices.find(voice => voice.name === value);
    console.log(selectedVoice);
    utterance.voice = selectedVoice;
}

const speakText = () => {
    console.log(utterance);
    speechSynthesis.speak(utterance);
}
const lang = "en-us"
const addExpressionBoxIntoDOM = () => {
    main.innerHTML = humanExpressions.map(({ img, text }) => `
    <div class="expression-box" data-frase="${text[lang]}">
        <img src="${img}"data-frase="${text[lang]}" alt="${text[lang]}">
        <p class="info" data-frase="${text[lang]}">${text[lang]}</p>
    </div>
    `).join("");
}
addExpressionBoxIntoDOM();

let voices = [];

const insetOptionElementsIntoDOM = voices => {
    selectElement.innerHTML = voices.reduce((anterio, { name, lang }) => {
        anterio += `<option value="${name}">${lang.toUpperCase()} | ${name}</option>`;
        return anterio;
    }, '');
}

const setUtteranceVoice = voice => {
    utterance.voice = voice;
    const voiceOpitonsElement = selectElement.querySelector(`[value="${voice.name}"]`);
    voiceOpitonsElement.selected = true;
}

const setVoiceDefault = voices => {
    const googleVoice = voices
        .find(voice =>
            voice.name === "Google português do Brasil");
    const microsoftVoice = voices
        .find(voice =>
            voice.name === "Microsoft Maria - Portuguese (Brazil)");
    if (googleVoice) {
        setUtteranceVoice(googleVoice)
    } else if (microsoftVoice) {
        setUtteranceVoice(microsoftVoice);
    }
};



speechSynthesis.addEventListener('voiceschanged', () => {
    // pegando as Linguagens disponiveis;
    voices = speechSynthesis.getVoices();
    // colocando array de linguagens em ordem alfabetica
    voices.sort((a, b) => a.lang < b.lang ? -1 : true);
    // inserindo options na tela
    insetOptionElementsIntoDOM(voices);

    // checando de tem as vozes padrão
    setVoiceDefault(voices);

});

const setStyleOfClickedDiv = frase => {

    const divElemento = document.querySelector(`[data-frase='${frase}']`);
    divElemento.classList.add('active');
    setTimeout(() => {
        divElemento.classList.remove('active');
    }, 1000);
}


btnInsertText.addEventListener('click', () => {
    divTextBox.classList.add("show")
});
closeDivtextBox.addEventListener('click', () => {
    divTextBox.classList.remove("show")
});
selectElement.addEventListener('change', setVoice);

buttonReadText.addEventListener('click', () => {
    setTexMessenge(textArea.value);
    speakText();
});
main.addEventListener("click", ({ target: clickedElement }) => {
    const frase = clickedElement.getAttribute("data-frase");
    const possiveisTarget = ['P', 'IMG']
    const isTargetCerto = possiveisTarget.some((item) => item.toLocaleLowerCase === clickedElement.tagName.toLocaleLowerCase);
    if (isTargetCerto) {
        setTexMessenge(frase);
        speakText();
        setStyleOfClickedDiv(frase);
    }
});