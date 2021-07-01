const input_task = document.getElementById('input_task');
const form_task = document.getElementById('form_task');
const done_btn = document.getElementById('done_btn');
const tasks = document.getElementById('tasks');

let count = 0;

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => {
        json.forEach(toDo =>{
            if(toDo.completed === false){
            addTask(toDo.completed, toDo.title);
            }
        });


form_task.addEventListener('submit', function(event){

    event.preventDefault();

    if(input_task.value.length <= 3){
        input_task.classList.add('is-invalid');
        const feedback = input_task.parentNode.querySelector('.invalid-feedback');
        feedback.innerHTML = 'Digite 4 caracteres ou mais para a tarefa';
        return false;
    }

    input_task.classList.remove('is-invalid');
    addTask(false, input_task.value);
    form_task.reset();

});

done_btn.onclick = () => {
    const checks = document.querySelectorAll('#tasks input:checked');
    
    checks.forEach(item => {
        item.parentNode.parentNode.remove();
    });

}

function toDelete(item) {
    item.parentNode.parentNode.remove();
}

function addTask(status, digitedTask){
    count++;
    const checkedString = status ? 'checked' : "";
    const text_task = `
    <li class="list-group-item">
        <div class="form-check d-flex justify-content-between align-items-center">
            <input class="form-check-input" type="checkbox" id="task_${checkedString}">
            <label class="form-check-label flex-grow-1 ms-2" for="task_${count}">${digitedTask}</label>
            <button class="btn btn-danger btn-sm" id="cancel_btn" onclick="toDelete(this);"> Deletar </button>
        </div>
    </li>
`;
tasks.innerHTML += text_task;

}


//     const text_task = `
//         <li class="list-group-item">
//             <div class="form-check d-flex justify-content-between align-items-center">
//                 <input class="form-check-input" type="checkbox" id="task_${count}">
//                 <label class="form-check-label flex-grow-1 ms-2" for="task_${count}">${input_task.value}</label>
//                 <button class="btn btn-danger btn-sm" id="cancel_btn" onclick="toDelete(this);"> Deletar </button>
//             </div>
//         </li>
// `;
// tasks.innerHTML += text_task;

