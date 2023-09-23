import { makeRadio, onButtonClick } from "./buttons.js";
import { constructCategories } from "./categories.js";
import * as categories from "./data/categories.js";

var gParent;
var gButtons = [];
var gLoadCallbacks = [];
export function setCategoriesParent(parent) {
  gParent = parent;
}

export function constructModes(modes=[], parent, descEl) {
  for (const mode in modes) {
    const modeStr = mode.replace(/ /g, "_");
    const button = makeRadio(mode, modes[mode].color);
    button.classList.add("mode-selects");
    button.setAttribute("data-mode", modeStr);
    parent.append(button);

    const description = modes[mode].desc;
    onButtonClick(button, () => {
      descEl.innerHTML = description;
      constructSpecificCategories(modeStr);
    });
  }
}

export function constructSpecificCategories(mode) {
  gButtons = constructCategories(categories[mode], gParent);
  gLoadCallbacks.forEach(callback => { callback(); })
}

export function onCategoriesLoad(callback) {
  gLoadCallbacks.push(callback);
}

export function getButtons() {
  return gButtons;
}