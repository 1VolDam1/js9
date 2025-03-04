const inputs = document.querySelectorAll(".input_data");

filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";

  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.getElementById("container");
if (btnContainer) {
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) { 
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
    });
  }
}

document.querySelectorAll('.button__like').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('like-active');
  });
});

document.querySelectorAll('.button__delete').forEach(btn => {
  btn.addEventListener('click', function() {
    this.closest('.column').remove();
  });
});

// сортировка карточек
let originalOrder = [];
let isOriginalOrder = true;

function sortCards() {
  var container = document.querySelector('.row');
  var cards = Array.from(container.getElementsByClassName('column'));
  
  if (originalOrder.length === 0) {
    originalOrder = cards.map(card => card.cloneNode(true));
  }

  if (isOriginalOrder) {
    cards.sort(function(a, b) {
      var titleA = a.querySelector('h4').textContent.toLowerCase();
      var titleB = b.querySelector('h4').textContent.toLowerCase();
      return titleA.localeCompare(titleB);
    });
    isOriginalOrder = false;
  } else {
    container.innerHTML = '';
    originalOrder.forEach(card => {
      container.appendChild(card);
    });
    isOriginalOrder = true;
    return;
  }
  
  container.innerHTML = '';
  cards.forEach(function(card) {
    container.appendChild(card);
  });
}

function clearCards() {
  var container = document.querySelector('.row');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function addCard() {
  var url = document.getElementById("card__link").value.trim();
  var title = document.getElementById("card__title").value.trim();
  var description = document.getElementById("card__description").value.trim();

  if (!url.startsWith('http')) {

    alert("Введите в пустые поля");
    return;
  }
  
  var card = document.createElement("div");
  card.className = "column"; 

  const contentDiv = document.createElement('div');
  contentDiv.className = 'content';

  const imgElement = document.createElement('img');
  imgElement.src = url;
  imgElement.alt = title;
  imgElement.style.width = '100%';

  const titleElement = document.createElement('h4');
  titleElement.textContent = title;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button__container';

  const likeButton = document.createElement('button');
  likeButton.className = 'button__like';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'button__delete';

  buttonContainer.appendChild(likeButton);
  buttonContainer.appendChild(deleteButton);

  contentDiv.appendChild(imgElement);
  contentDiv.appendChild(titleElement);
  contentDiv.appendChild(descriptionElement);
  contentDiv.appendChild(buttonContainer);

  card.appendChild(contentDiv);

  card.querySelector('.button__like').addEventListener('click', function() {
    this.classList.toggle('like-active');
  });

  card.querySelector('.button__delete').addEventListener('click', function() {
    this.closest('.column').remove();
  });

  localStorage 

  document.querySelector(".row").insertBefore(card, document.querySelector(".row").firstChild);
  
  w3AddClass(card, "show");
  document.getElementById("card__link").value = "";
  document.getElementById("card__title").value = "";
  document.getElementById("card__description").value = "";

}

