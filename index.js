let globalTaskData = [];
const taskContents = document.getElementById("taskContentsrow");
const showTask = document.getElementById("taskModal");

const addCard = () => {
  const newTaskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imgURL").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value,
  };

  taskContents.insertAdjacentHTML(
    "beforeend",
    generateTaskCard(newTaskDetails)
  );

  globalTaskData.push(newTaskDetails);
  saveToLocalStorage(globalTaskData);
};
const generateTaskCard = ({ id, url, title, type, description }) =>
  `<div class="col-md-6 col-lg-4  mt-3" id=${id} key=${id}>
<div class="card">
  <div class="card-header">
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-info" name=${id} onClick="editTask(this)">
        <i class="fa fa-edit"></i>
       </button>
       <button class="btn btn-outline-danger" name=${id} onClick="deleteTask(this)">
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>
  <img
    class="card-img-top"
    src=${url}
    alt="image"
  />
  <div class="card-body">
    <h5 class="card-title" id="tt">${title}</h5>
    <p class="card-text" id="td">${description}</p>
    <span class="badge bg-primary" id="th">${type}</span>
  </div>
  <div class="card-footer">
    <button class="btn btn-outline-primary float-end" name=${id} onClick="openTask(this)" data-bs-toggle="modal"
    data-bs-target="#showTaskModal">
      OPEN TASK
    </button>
  </div>
</div>
</div>`;

const generateShowTask = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return ` <div id=${id} key=${id}>
      <img
      src=${url} alt="bg image" class="card-img-top mb-3" />
      <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
      <h2 class="my-3">${title}</h2>
      <p class="card-text">
      ${description}
      </p></div>`;
};

const saveToLocalStorage = () => {
  localStorage.setItem("tasky", JSON.stringify({ tasks: globalTaskData }));
};

const reloadTaskCard = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));

  if (localStorageCopy) {
    globalTaskData = localStorageCopy["tasks"];
  }

  globalTaskData.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", generateTaskCard(cardData));
  });
};

const deleteTask = (e) => {
  const targetID = e.getAttribute("name");

  globalTaskData = globalTaskData.filter(
    (cardData) => cardData.id !== targetID
  );
  saveToLocalStorage();
  window.location.reload();
};

const editTask = (e) => {
  const targetID = e.getAttribute("name");

  //   console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1]);
  //   console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3]);
  //   console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5]);

  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute(
    "contenteditable",
    "true"
  );
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute(
    "contenteditable",
    "true"
  );
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute(
    "contenteditable",
    "true"
  );

  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML =
    "SAVE CHANGES";

  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute(
    "onclick",
    "saveEditTask(this)"
  );
};

const saveEditTask = (e) => {
  let targetID = e.getAttribute("name");

  globalTaskData.filter((cardData) => {
    if (cardData.id === targetID) {
      cardData.title = document.getElementById("tt").textContent;
      cardData.heading = document.getElementById("th").textContent;
      cardData.description = document.getElementById("td").textContent;
    }

    return cardData;
  });

  saveToLocalStorage();
  window.location.reload();
};

const openTask = (e) => {
  const targetID = e.getAttribute("name");
  const getTask = globalTaskData.filter((cardData) => cardData.id === targetID);
  showTask.innerHTML = generateShowTask(getTask[0]);
};

const searchTask = () => {
  while (taskContents.firstChild) {
    taskContents.removeChild(taskContents.firstChild);
  }

  const searchValue = document.getElementById("searchTask").value;
  const searchResult = globalTaskData.filter((cardData) => {
    return cardData.title.toLowerCase().includes(searchValue.toLowerCase());
  });
  searchResult.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", generateTaskCard(cardData));
  });
};
