const appDiv = document.querySelector(`#app`);

function createHeader() {
  const h1 = document.createElement(`h1`);
  h1.innerHTML = `Odds and Events`;
  appDiv.appendChild(h1);
}

function createForm() {
  const form = document.createElement(`form`);
  const label = document.createElement(`label`);
  label.innerHTML = `Add a number to the bank`;
  const input = document.createElement(`input`);
  label.appendChild(input);
  form.appendChild(label);

  const addButton = document.createElement(`button`);
  addButton.innerText = `Add number`;
  addButton.id = `add-number-btn`;
  form.appendChild(addButton);

  const sort1Button = document.createElement(`button`);
  sort1Button.innerText = `Sort 1`;
  sort1Button.id = `sort-1-btn`;
  form.appendChild(sort1Button);

  const sortAllButton = document.createElement(`button`);
  sortAllButton.innerText = `Sort all`;
  sortAllButton.id = `sort-all-btn`;
  form.appendChild(sortAllButton);

  appDiv.appendChild(form);
  return { form, input };
}

function createSection(title) {
  const h2 = document.createElement(`h2`);
  h2.innerText = title;
  appDiv.appendChild(h2);
  const ul = document.createElement(`ul`);
  appDiv.appendChild(ul);
  return ul;
}

let numbersBank = [];
let odds = [];
let evens = [];

function renderList(ul, arr) {
  ul.innerHTML = ``;
  arr.forEach((num) => {
    const li = document.createElement(`li`);
    li.innerText = num;
    ul.appendChild(li);
  });
}

function renderAll() {
  renderList(bankList, numbersBank);
  renderList(oddsList, odds);
  renderList(evensList, evens);
}

createHeader();
const { form: userInputForm, input: userInputNum } = createForm();
const bankList = createSection(`Bank`);
const oddsList = createSection(`Odds`);
const evensList = createSection(`Evens`);
renderAll();

userInputForm.addEventListener(`submit`, (event) => {
  event.preventDefault();
  if (event.submitter && event.submitter.id === `add-number-btn`) {
    const value = userInputNum.value;
    if (value !== `` && !isNaN(value)) {
      numbersBank.push(value * 1);
      userInputNum.value = ``;
      renderAll();
    }
  } else if (event.submitter && event.submitter.id === `sort-1-btn`) {
    if (numbersBank.length > 0) {
      const num = numbersBank.shift();
      if (num % 2 !== 0) {
        odds.push(num);
      } else {
        evens.push(num);
      }
      renderAll();
    }
  } else if (event.submitter && event.submitter.id === `sort-all-btn`) {
    numbersBank.forEach((num) => {
      if (num % 2 !== 0) {
        odds.push(num);
      } else {
        evens.push(num);
      }
    });
    numbersBank = [];
    renderAll();
  }
});
