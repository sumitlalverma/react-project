import renderFilters from "./filters/filters";
import renderCourses from "./courses/courses";

import { courses } from "./courses.json";

import "./filters/filters.scss";
import "./styles/main.scss";
import "./courses/courses.scss";

function sortCoursesDescendingByKey(courses, key) {
  return courses.sort((a, b) => {
    if (a[key] > b[key]) {
      return -1;
    }
    if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  });
}

const allFilters = [];
let allCourses = [...courses];

const filterContainer = document.getElementById("filters-section");
const filterMobileContainer = document.getElementById("filter-popup");
const coursesLength = document.getElementById("all-courses-number");
coursesLength.textContent = allCourses.length;

export const onFilter = (value) => {
  const indexOf = allFilters.indexOf(value);
  if (indexOf === -1) {
    allFilters.push(value);
  } else {
    allFilters.splice(indexOf, 1);
  }

  if (allFilters.length > 0) {
    allCourses = courses.filter((f) => allFilters.includes(f.offeredBy));
    coursesLength.textContent = allCourses.length;
    renderCourses(allCourses);
  } else {
    allCourses = [...courses];
    coursesLength.textContent = courses.length;
    renderCourses(courses);
  }
};

const sortItem = document.getElementById("sorting-contents");
sortItem.addEventListener("change", () => {
  allCourses = sortCoursesDescendingByKey(allCourses, sortItem.value);
  renderCourses(allCourses);
});

const desktopSortItem = document.getElementById("desktop-sorting-contents");
desktopSortItem.addEventListener("change", () => {
  allCourses = sortCoursesDescendingByKey(allCourses, desktopSortItem.value);
  renderCourses(allCourses);
});

const filterList = [
  ...new Set(courses.map((m) => m["offeredBy"]).filter(Boolean)),
];

const filters = renderFilters(filterList, courses);

const handleCoursesRender = () => {
  if (window.innerWidth > 768) {
    filterContainer.appendChild(filters);
  } else {
    filterMobileContainer.appendChild(filters);
  }
};

window.addEventListener("resize", function () {
  handleCoursesRender();
});

handleCoursesRender();
renderCourses(allCourses);
