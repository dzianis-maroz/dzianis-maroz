const button = document.getElementById('button');

const input = document.getElementById('input');

const listOfTasks = document.getElementById('listOfTasks');

const model = [];

const addItem = data => { //сздаем абзац p и в нем span-кнопка, присваиваем им стили, помещаем элемент массива в абзац
    let p = document.createElement('p')
    let span = document.createElement('span')
    p.className = 'styleOfTasks';
    span.className = 'delete'
    span.innerText = 'X'
for(let i = 0; i < data.length; i++) { 
    p.innerText = data[i];
    span.setAttribute('data-num', i); //присваиваем аттрибут data-num, равный порядковому номеру элемента массива
} 
listOfTasks.append(p); //добавляем p и span в верстку
p.append(span);
}

handleClick = () => { 
    if(!input.value == '') {
        const value = input.value; // считваем данные из input и кладем их в переменную value;
        model.push(value); // записываем value в массив
        addItem(model); // вызываем метод addItem для нашего массива
    }     
}

handleDelete = (e) => {
    if(e.target.className === 'delete') {
        if(confirm('Вы уверены?')) {
            const elem = e.target.closest('p'); // находим нужный абзац p
            elem.remove(); // удаляем его из верстки
            model.splice(e.target.dataset.num, 1); // удаляем из массива по порядковому номеру соответствующий элемент
        }       
}}

button.addEventListener('click', handleClick);
listOfTasks.addEventListener('click', handleDelete);