// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function mixQuestion(questions) {
  let answers = [...questions.incorrect_answers, questions.correct_answer];
  console.log("answers", answers);
  let randomQuestions = [];
  let index;
  while (answers.length != 0) {
    index = Math.floor(Math.random() * answers.length);
    randomQuestions.push(answers[index]);
    answers.splice(index, 1);
  }

  return randomQuestions;
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const html = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, html);
}

export function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const headerTemplate = await loadTemplate("/partials/header.html");
  const conteinerFooter = document.getElementById("footer");
  const conteinerHeader = document.getElementById("header");
  const fragmentFooter = document
    .createRange()
    .createContextualFragment(footerTemplate);
  const fragmentHeader = document
    .createRange()
    .createContextualFragment(headerTemplate);
  conteinerFooter.append(fragmentFooter);
  conteinerHeader.append(fragmentHeader);
}
