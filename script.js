const $ = document.querySelector.bind(document);
import { makePress, setButtonBounds } from "./buttons.js";
import { constructModes, setCategoriesParent } from "./modes.js";
import { modes } from "./data/modes.js"

setCategoriesParent($("#selectors"))
constructModes(modes, $("#button-holder"), $("#button-desc"));

generateBackButton($("#categories > .controls"), "mode-select");
generateStartButton($("#categories > .controls"), "quiz");
generateStartButton($("#mode-select > .controls"), "categories");

const backButton = makePress("Back", "rgb(237, 132, 132)", 50);
const nextButton = makePress("Next", "green", 50);
$("#back-holder").append(backButton);
$("#next-holder").append(nextButton);

backButton.addEventListener("click", transitionTo.bind(document, "categories"))

function showCopyright() { $("body").setAttribute("data-copyright", "show"); }
function hideCopyright() { $("body").removeAttribute("data-copyright"); }

function generateBackButton(parent, mode) {
  const button = makePress("", "green");
  setButtonBounds(button, "", "100%");
  button.classList.add("back-button")
  parent.append(button);
  
  button.addEventListener("click", transitionTo.bind(document, mode)); 
  return button;
}

function generateStartButton(parent, mode) {
  const button = makePress("START", "rgb(46, 155, 145)");
  setButtonBounds(button, "calc(100% - 200px)", "100%");
  button.classList.add("start-button");
  parent.append(button);
  
  button.addEventListener("click", transitionTo.bind(document, mode));
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
}, 500)