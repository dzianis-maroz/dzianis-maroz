const button = document.getElementById('button');

const input = document.getElementById('input');

const listOfTasks = document.getElementById('listOfTasks');

const select = document.getElementById('sort'); 

const filter = document.getElementById('filter'); 

const model = JSON.parse(localStorage.getItem("model")) || [];

const addItem = (value) => {
    const task = {
    value,
    createdAt: new Date(),
};
    model.push(task); // добавляем элемент (объект) в массив
    localStorage.setItem("model", JSON.stringify(model)); // обновляем localStorage
}

const toStyle = (toDo, deleteButton, toDoDate) => { // добавляем стили для верстки
    toDo.className = 'styleOfTasks';
    deleteButton.className = 'delete';
    deleteButton.innerText = 'X';
    toDoDate.className = 'date';
}

const refreshPage = () => { // убираем из верстки (<p>), чтобы затем вызвать функцию render и отрисовать в верстке актуальный массив объектов
  if(listOfTasks.hasChildNodes) { 
    let elem = [...listOfTasks.childNodes];
    for (let n = 0; n < elem.length; n++) {
      elem[n].remove();
    }
  } else return
}
  
  const render = (data = model) => { // отрисовываем в верстке актуальный массив объектов
        for(let i = 0; i < data.length; i++) {
        const toDo = document.createElement('p')
        const deleteButton = document.createElement('span')
        const toDoDate = document.createElement('span')
        toDo.innerText = data[i].value;
        toDoDate.innerText = 'Added on: ' + data[i].createdAt;
        deleteButton.setAttribute('data-num', i);
        listOfTasks.append(toDo); //добавляем Задание (<p>), кнопку Delete и Дату в верстку
        toDo.append(deleteButton);
        toDo.append(toDoDate); //присваиваем аттрибут data-num, равный порядковому номеру элемента массива
        toStyle(toDo, deleteButton, toDoDate);
};
}
    
handleClick = () => {
  if(input.value !== '') {
    const { value } = input; 
    addItem(value);
    refreshPage();
    render();    
  }
  else return;   
}

handleDelete = (e) => { // удаление задания
    if(e.target.className === 'delete') {
        if(confirm('Вы уверены?')) {
            const elem = e.target.closest('p'); // находим нужный абзац p
            elem.remove(); // удаляем его из верстки
            model.splice(e.target.dataset.num, 1); // удаляем из массива по порядковому номеру соответствующий элемент
            localStorage.setItem("model", JSON.stringify(model)); // обновляем localStorage
        }       
}}

sortBy = (e) => { // сортируем задания по имени и дате создания
    switch (e.target.value) {
      case "name":
        model.sort((a, b) => {
          if (a > b) {
            return 1;
          } else if (a.value < b.value) {
            return -1;
          } else return 0;
        });
        break;
      case "date":
        model.sort((a, b) => {
          if (+a.createdAt < +b.createdAt) {
            return 1;
          } else if (+a.createdAt > +b.createdAt) {
            return -1;
          } else return 0;
        });
        break;
    }
    refreshPage();
    render();
  };

getFiltredTasks = (e) => { // поиск по названию задания
    const { value: inputValue} = e.target;

    const filtredTasks = model.filter(
        function(item, i, arr) {
            return item.value.includes(inputValue);
        }
    );
    refreshPage();
    render(filtredTasks);
}

render();

button.addEventListener('click', handleClick);

listOfTasks.addEventListener('click', handleDelete);

select.addEventListener('change', sortBy);

filter.addEventListener('input', getFiltredTasks);

