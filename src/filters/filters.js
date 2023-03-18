import { onFilter } from "..";

export default function renderFilters(items, courses) {
  const container = document.createElement("div");
  container.classList.add("filter-item-container");

  items.forEach((filter) => {
    const filterItem = document.createElement("div");
    filterItem.classList.add("filter-item");

    const input = document.createElement("input");
    input.classList.add("filter-checkbox");
    input.type = "checkbox";
    input.id = filter;

    input.addEventListener("change", () => onFilter(filter, input));

    const itemLength = courses.filter((f) => f.offeredBy === filter);
    const label = document.createElement("label");
    label.setAttribute("for", filter);
    label.textContent = `${filter} (${itemLength.length})`;

    filterItem.appendChild(input);
    filterItem.appendChild(label);

    container.appendChild(filterItem);
  });

  return container;
}

function toogleArrow(action) {
  const arrowManager = document.getElementById("arrow-manager");
  if (action === "open") {
    arrowManager.classList.replace("fa-chevron-down", "fa-chevron-up");
  } else {
    arrowManager.classList.replace("fa-chevron-up", "fa-chevron-down");
  }
}

function togglePopup() {
  const popup = document.getElementById("filter-popup");
  console.log(`popup.style.display`, popup.style.display);
  if (popup.style.display === "none" || !popup.style.display) {
    popup.style.display = "block";
    toogleArrow("open");
  } else {
    popup.style.display = "none";
    toogleArrow("close");
  }
}

const popupToogleButton = document.getElementById("popup-toogle-button");
popupToogleButton.addEventListener("click", togglePopup);

const crossButton = document.getElementById("cross-popup");
crossButton.addEventListener("click", togglePopup);
