import { makeRadio } from "./buttons.js";
import { constructCategories } from "./categories.js";
import * as categories from "./data/categories.js";

var gParent;
export function setCategoriesParent(parent) {
  gParent = parent;
}

export function constructModes(modes=[], parent, descEl) {
  for (const mode in modes) {
    const button = makeRadio(mode, modes[mode].color);
    button.classList.add("mode-selects");
    parent.append(button);

    const description = modes[mode].desc;
    button.addEventListener("click", () => {
      descEl.innerHTML = description;
      constructSpecificCategories(mode.replace(/ /g, "_"));
    });
  }

  parent.childNodes[0].click();
}

export function constructSpecificCategories(mode) {
  constructCategories(categories[mode], gParent);
}