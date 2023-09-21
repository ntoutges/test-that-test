const $ = document.querySelector.bind(document);
import { constructCategories } from "./categories.js";
import { categories } from "./data/categories.js";

constructCategories(categories, $("#categories"));