const question = document.querySelector(".question");
const image = document.querySelector(".content img")
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const meme = document.querySelector(".finish img");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {

  if(questionsCorrect==20){
    textFinish.innerHTML = `Parabéns! você acertou todas as questões, está entendendo de Bíblia. Acertou ${questionsCorrect} de ${questions.length}`;
    meme.setAttribute('src','./imgMeme/meme-sr-incrivel-mega-feliz.jpg')
  }else if(questionsCorrect>=15){
    textFinish.innerHTML = `Parabéns! você acertou muitas questões, está entendendo de Bíblia. Acertou ${questionsCorrect} de ${questions.length}`;
    meme.setAttribute('src','./imgMeme/meme-sr-incrivel-feliz.png')
  }
  else if(questionsCorrect<15 && questionsCorrect>8) {
    textFinish.innerHTML = `Parabéns por ter concluído, mas refaz aí nem, está tão difícil. Você acertou ${questionsCorrect} de ${questions.length}`;
    meme.setAttribute('src','./imgMeme/meme-sr-incrivel-normal.png')
  } else if(questionsCorrect>0){
    textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
    meme.setAttribute('src','./imgMeme/meme-sr-incrivel-triste.jpg')
  }else {
    textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
    meme.setAttribute('src','./imgMeme/meme-sr-incrivel-caveira.jpg')
  }
  content.style.display = "none";
  contentFinish.style.display = "flex";

}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;
  image.setAttribute('src', './imgQuestions/'+item.image);
  var cont=0

  item.answers.forEach((answer) => {
    const div = document.createElement("div");
    let logo = `<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0L19.5263 17.25H0.473721L10 0Z" fill="white"/>
    </svg>`

    if(cont==0){
      logo = `<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0L19.5263 17.25H0.473721L10 0Z" fill="white"/>
    </svg>`
    } else if(cont==1) {
      logo = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="9" fill="#FFFCFC"/>
      </svg>
      `
    } else if(cont==2) {
      logo = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="17" height="17" fill="#FFFAFA"/>
      </svg>
      `
    } else {
      logo = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 20L1.47372 9.85294L20.5263 9.85294L11 20Z" fill="white"/>
      <path d="M11 0L20.5263 10.1471H1.47372L11 0Z" fill="white"/>
      </svg>
      `
    }
    cont++
    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${logo}   
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
