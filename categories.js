import { makePress, makeSwitch, setButtonBounds } from "./buttons.js";

export function constructCategories(categories, container) {
  // document.body.innerHTML = "<div id=\"copyright-info\"></div><div id=\"category-holder\"></div><div id=\"start-holder\"></div>";
  // document.getElementById("copyright-info").innerHTML = copyright;
  
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
    
    const switches = [];
    for (let i = 1; i < categories[category].length; i++) {
      const type = categories[category][i];
      const toggleButton = makeSwitch(type, color);
      setButtonBounds(toggleButton, "90%", "unset")
      categoryEl.appendChild(toggleButton);
      switches.push(toggleButton)
    }
    
    all.addEventListener("mousedown", () => {
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
  
  // const start = makePress("START", "#2e9b91");
  // document.getElementById("start-holder").appendChild(start);
  // start.addEventListener("click", startTester);
}