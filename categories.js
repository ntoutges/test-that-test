import { makePress, makeSwitch, onButtonDown, setButtonBounds } from "./buttons.js";

// returns all categories used in buttons
export function constructCategories(categories, container) {
  container.innerHTML = "";

  let buttonId = 0;
  const allButtons = [];
  for (let category in categories) {
    const color = categories[category][0];
    const categoryEl = document.createElement("div");
    const header = document.createElement("div");
    const backer = document.createElement("div");
    const all = makePress("Select All", color, 30);
    
    categoryEl.classList.add("categories");
    header.classList.add("category-headers");
    backer.classList.add("category-backers");
    
    header.innerText = category;
    backer.style.backgroundColor = color;
    
    categoryEl.appendChild(backer);
    categoryEl.appendChild(header);
    container.append(categoryEl);
    
    setButtonBounds(all, "80%", "30px");

    const switches = [];
    for (let i = 1; i < categories[category].length; i++) {
      const type = categories[category][i];
      const toggleButton = makeSwitch(type, color);
      toggleButton.setAttribute("data-id", buttonId++);
      setButtonBounds(toggleButton, "90%", "unset");
      categoryEl.appendChild(toggleButton);
      switches.push(toggleButton);
      allButtons.push(toggleButton);
    }
    
    onButtonDown(all, () => {
      let event = "reset";
      for (let button of switches) {
        if (!button.classList.contains("actives")) {
          event = "set";
          break;
        }
      }
      for (let button of switches) { button.dispatchEvent(new Event(event)); }
    });
    
    all.classList.add("bottoms");
    categoryEl.appendChild(all);
  }
  
  return allButtons;
}
