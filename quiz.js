import { buttonDisable, buttonEnable, makeRadio, onButtonClick } from "./buttons.js";
import * as questionGen from "./data/questionGen.js";
import * as categories from "./data/categories.js";

var gNext;
var gQuestionBox;
var gHintBox;
var gAnswerBox;

var gMode = "";
var gCategories = [];
var gCategoriesSet = new Set();

var gAnswer;
var gHintData;

export function init(nextButton, questionBox, hintBox, answerBox) {
  gNext = nextButton;
  gQuestionBox = questionBox;
  gHintBox = hintBox;
  gAnswerBox = answerBox;
  onButtonClick(gNext, nextQuestion);
}

export function setMode(mode) {
  gMode = mode;
  gCategoriesSet.clear(); // these numbers no longer make sense
  gCategories = [];
}

export function addCategory(category) {
  gCategoriesSet.add(category);
}

export function remCategory(category) {
  gCategoriesSet.delete(category);
}

export function startQuestions() {
  gCategories.splice(0,1);
  for (const value of gCategoriesSet.values()) {
    gCategories.push(value);
  }
  nextQuestion();
}

export function nextQuestion() {
  buttonDisable(gNext);
  clearHint();

  const [question, questionType, answer, hintData] = questionGen[gMode].generate(gCategories);
  gQuestionBox.innerHTML = question;
  fillByType(questionType);

  // gQuestionType = questionType;
  gAnswer = answer;
  gHintData = hintData;
}

function checkAnswer(answer) {
  clearHint();
  if (answer == gAnswer) { // if these are equal, the answer is right
    buttonEnable(gNext);
  }
  else {
    buttonDisable(gNext);
    generateHint(answer);
  }
}

function generateHint(answer) {
  const hint = questionGen[gMode].getHint(gAnswer, answer, gHintData);

  // hint assumed to be of type: string | Record<title:string, content:string>
  const sections = (typeof hint == "string") ? {"": hint} : hint;

  parseAndSetHint(sections);
}

function parseAndSetHint(sections) {
  for (const title in sections) {
    const content = sections[title];

    const titleEl = document.createElement("div");
    titleEl.classList.add("hint-titles");
    titleEl.innerText = title;

    const contentEl = document.createElement("div");
    contentEl.classList.add("hint-contents");
    contentEl.innerHTML = content;

    gHintBox.append(titleEl, contentEl);
  }
}

function clearHint() {
  gHintBox.innerHTML = ""; // clear box
}


function fillByType(questionType) {
  gAnswerBox.innerHTML = ""; // clear
  switch (questionType) {
    case 0: // fill with all categories
      fillWithCategories();
      break;
    case 1: // fill with single input box

      break;
    default: // fill with (questionType: Array<string>) answers
      fillWithVerbatim(questionType);
      break;
  }
}

function fillWithCategories() {
  const cats = categories[gMode];
  let id = 0;
  for (const name in cats) {
    const cat = cats[name];
    const color = cat[0];
    
    const catEl = document.createElement("div");
    catEl.classList.add("quiz-categories");
    
    let didAppend = false;
    for (let i = 1; i < cat.length; i++) { // skip past first entry in array (contains color of category)
      if (gCategoriesSet.has(id)) {
        const answer = makeRadio(cat[i], color);
        answer.setAttribute("data-value", id);
        answer.classList.add("quiz-answers");
        catEl.append(answer);
        didAppend = true;

        onButtonClick(answer, function() { checkAnswer(+this.getAttribute("data-value")); });
      }
      id++;
    }

    if (didAppend) gAnswerBox.append(catEl); // only append to body if has answers
  }
}

function fillWithVerbatim(options) {
  let catEl = document.createElement("div");
  catEl.classList.add("quiz-categories");
  
  let i = 0;
  for (let option of options) {
    // push current list to screen, then start on next row
    if (option == "\n") {
      if (catEl.childNodes.length > 0) gAnswerBox.append(catEl);
      catEl = document.createElement("div");
      catEl.classList.add("quiz-categories");
      continue;
    }

    const answer = makeRadio(option, "#79d973");
    answer.setAttribute("data-value", i);
    answer.classList.add("quiz-answers", "quiz-random-answers");
    catEl.append(answer);

    onButtonClick(answer, function() { checkAnswer(+this.getAttribute("data-value")); });
    i++;
  }

  if (catEl.childNodes.length > 0) gAnswerBox.append(catEl);
}