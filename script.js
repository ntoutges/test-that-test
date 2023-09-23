const $ = document.querySelector.bind(document);
import { buttonDisable, buttonEnable, makePress, onButtonClick, resetRadios, setButtonBounds } from "./buttons.js";
import { constructModes, getButtons, onCategoriesLoad, setCategoriesParent } from "./modes.js";
import { modes } from "./data/modes.js";
import * as quiz from "./quiz.js";

setCategoriesParent($("#selectors"));
constructModes(modes, $("#button-holder"), $("#button-desc"));

generateBackButton($("#categories > .controls"), "mode-select");
const modeStart = generateStartButton($("#mode-select > .controls"), "categories", "SELECT");
buttonDisable(modeStart);
const categoryStart = generateStartButton($("#categories > .controls"), "quiz");

const backButton = makePress("Home", "rgb(237, 132, 132)", 50);
const nextButton = makePress("Next", "#1fe95d", 50);
$("#back-holder").append(backButton);
$("#next-holder").append(nextButton);
quiz.init(
  nextButton,
  $("#question-holder"),
  $("#hint-div"),
  $("#answer-holder")
);

onButtonClick(backButton, transitionTo.bind(document, "categories"));

function showCopyright() { $("body").setAttribute("data-copyright", "show"); }
function hideCopyright() { $("body").removeAttribute("data-copyright"); }

function generateBackButton(parent, mode) {
  const button = makePress("", "green");
  setButtonBounds(button, "", "100%");
  button.classList.add("back-button")
  parent.append(button);
  
  onButtonClick(button, transitionTo.bind(document, mode)); 
  return button;
}

function generateStartButton(parent, mode, startText="START") {
  const button = makePress(startText, "rgb(46, 155, 145)");
  setButtonBounds(button, "calc(100% - 200px)", "100%");
  button.classList.add("start-button");
  parent.append(button);
  
  onButtonClick(button, transitionTo.bind(document, mode));
  return button;
}

let isTransitioning = false;
function transitionTo(type) {
  if (isTransitioning) return; // ignore any requests to transition if already transitioning
  isTransitioning = true;
  $("body").classList.add("flash");
  setTimeout(() => {
    $("body").setAttribute("data-selected", type);
    $("body").classList.remove("flash");
    setTimeout(() => { isTransitioning = false; }, 200); // wait for transition to finish
  }, 200);
}

setTimeout(() => {
  hideCopyright();
}, 500);

let buttonsPressed = 0;
onCategoriesLoad(() => {
  const buttons = getButtons();
  buttonsPressed = 0;

  const click = function() {
    buttonsPressed++;
    buttonEnable(categoryStart);
    quiz.addCategory(+this.getAttribute("data-id"));
  };
  const unclick = function() {
    buttonsPressed--;
    if (buttonsPressed == 0) buttonDisable(categoryStart);
    quiz.remCategory(+this.getAttribute("data-id"));
  }

  buttons.forEach(button => {
    button.addEventListener("click", function() {
      if (this.classList.contains("actives")) click.call(this);
      else unclick.call(this);
    });
    button.addEventListener("set", click);
    button.addEventListener("reset", unclick);
  });
  buttonDisable(categoryStart);
  buttonEnable(modeStart);
});

onButtonClick(modeStart, () => {
  var selected = $("#button-holder > .actives");
  quiz.setMode(selected.getAttribute("data-mode"));
  $("#button-desc").innerHTML = "";
  resetRadios();
  buttonDisable(modeStart);
});

onButtonClick(categoryStart, () => {
  quiz.startQuestions();
});