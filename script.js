const main = document.querySelector("main");
const btnInsertText = document.querySelector('.btn-toggle');
const divTextBox = document.querySelector('.text-box');
const closeDivtextBox = document.querySelector('.close');
const selectElement = document.querySelector('select');
const buttonReadText = document.querySelector('#read');
const textArea = document.querySelector('#text-area');


const humanExpressions = [
    { img: '/img/drink.jpg', text: 'Estou com sede' },
    { img: '/img/food.jpg', text: 'Estou com fome' },
    { img: '/img/tired.jpg', text: 'Estou cansado' },
    { img: '/img/hurt.jpg', text: 'Estou machucado' },
    { img: '/img/happy.jpg', text: 'Estou feliz' },
    { img: '/img/angry.jpg', text: 'Estou com raiva' },
    { img: '/img/sad.jpg', text: 'Estou triste' },
    { img: '/img/scared.jpg', text: 'Estou assustado' },
    { img: '/img/outside.jpg', text: 'Quero ir lá fora' },
    { img: '/img/home.jpg', text: 'Quero ir pra casa' },
    { img: '/img/school.jpg', text: 'Quero ir pra escola' },
    { img: '/img/grandma.jpg', text: 'Quero ver a vovó' }
];

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
    speechSynthesis.speak(utterance);
}
const addExpressionBoxIntoDOM = () => {
    main.innerHTML = humanExpressions.map(({ img, text }) => `
    <div class="expression-box" data-frase="${text}">
        <img src="${img}"data-frase="${text}" alt="${text}">
        <p class="info" data-frase="${text}">${text}</p>
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