import { onFilter } from "..";

export default function renderFilters(items) {
  const container = document.createElement("div");

  items.forEach((filter) => {
    const filterItem = document.createElement("div");
    filterItem.classList.add("filter-item");

    const input = document.createElement("input");
    input.classList.add("filter-checkbox");
    input.type = "checkbox";
    input.id = filter;

    input.addEventListener('change', () => onFilter(filter, input));

    const label = document.createElement("label");
    label.setAttribute("for", filter);
    label.textContent = `${filter}`;

    filterItem.appendChild(input);
    filterItem.appendChild(label);

    container.appendChild(filterItem);
  });

  return container;
}
