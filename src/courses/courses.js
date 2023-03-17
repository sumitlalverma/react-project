// create item with icon
const createItemWithIcon = (icon, label) => {
  return `
  <div class='flex item-wrapper'> 
  <i class='fa ${icon}'></i>
  <label>${label}</label>
  </div>
  `;
};

const createManageButton = (instance, description) => {
  const managebleButton = instance.querySelector(".manageble-button");
  const readMoreButton = document.createElement("button");
  readMoreButton.classList.add("manage-button");
  readMoreButton.innerHTML = `Read more <i class="fa fa-chevron-down" aria-hidden="true"></i>`;
  managebleButton.appendChild(readMoreButton);

  // Create the "Read less" button
  const readLessButton = document.createElement("button");
  readLessButton.classList.add("manage-button");
  readLessButton.innerHTML = `Read less <i class="fa fa-chevron-up" aria-hidden="true"></i>`;
  managebleButton.appendChild(readLessButton);

  // Hide the "Read less" button initially
  readLessButton.style.display = "none";
  const extraContent = instance.querySelector(".extra-content");
  extraContent.style.display = "none";

  const descriptionElement = instance.querySelector(".description");

  readMoreButton.addEventListener("click", () => {
    extraContent.style.display = "inline-block";
    descriptionElement.textContent = description;
    readMoreButton.style.display = "none";
    readLessButton.style.display = "inline-block";
  });

  readLessButton.addEventListener("click", () => {
    descriptionElement.textContent = description.substring(0, 150) + "...";
    extraContent.style.display = "none";
    readLessButton.style.display = "none";
    readMoreButton.style.display = "inline-block";
  });
};


const renderCourses = (courses) => {
  const itemTemplate = document.getElementById("course-template");
  const itemContainer = document.getElementById("content-section");

  if (itemContainer.children.length > 2) {
    const resp = Array.from(itemContainer.children).slice(2);
    resp.forEach((f) => itemContainer.removeChild(f));
  }

  courses.forEach(
    ({
      category,
      label,
      description,
      offeredBy,
      timeline,
      place,
      date,
      objectives,
      eligibility,
      assesmentMethod,
      courseDate,
    }) => {
      const instance = itemTemplate.content.cloneNode(true);
      instance.querySelector(".category").textContent = category;
      instance.querySelector(".course-name").textContent = label;
      instance.querySelector(".description").textContent =
        description.substring(0, 150) + "...";

      const courseObjective = instance.querySelector(".course-objective");
      courseObjective.innerHTML = objectives
        .map((objective) => `<li>${objective}</li>`)
        .join("");

      const eligibilityContent = instance.querySelector(".eligibility");
      eligibilityContent.innerHTML = eligibility
        .map((item) => `<li>${item}</li>`)
        .join("");

      instance.querySelector(".assessment-method").textContent =
        assesmentMethod;
      instance.querySelector(".course-date").textContent = courseDate;

      const footerContents = [];

      if (offeredBy) {
        footerContents.push(createItemWithIcon("fa-file-text-o", offeredBy));
      }

      if (timeline) {
        footerContents.push(createItemWithIcon("fa-clock-o", timeline));
      }

      if (place) {
        footerContents.push(createItemWithIcon("fa-child", place));
      }

      if (date) {
        footerContents.push(createItemWithIcon("fa-calendar", date));
      }

      const resp = instance.querySelector(".course-footer-section");
      resp.innerHTML = footerContents.join("");

      createManageButton(instance, description);

      itemContainer.appendChild(instance);
    }
  );
};

export default renderCourses;
