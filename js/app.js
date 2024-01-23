const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')
let editItemId

// check

let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')): [];
// console.log(todos);

if(todos.length) showTodos()

// setTodos to LocaleStorage 
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}

//show time
function getTime() {
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate(): now.getDate()
    const month = now.getMonth() < 10 ?  '0' + (now.getMonth() + 1): now.getMonth()
    const year = now.getFullYear()


    const hour = now.getHours() < 10 ? '0' + now.getHours(): now.getHours()
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes(): now.getMinutes()
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds(): now.getSeconds()


    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
    const monthtitle = now.getMonth() 
    fullDay.textContent = `${date} ${months[monthtitle]} ${year}`
    hourEl.textContent = `${hour}`
    minuteEl.textContent = `${minute}`
    secondEl.textContent = `${second}`
    fullDay.style.color = '#bcd'
    hourEl.style.color = '#bcd'
    minuteEl.style.color = '#bcd'
    secondEl.style.color = '#bcd'



    return `${hour}:${minute}, ${date}.${month}.${year}`
}

setInterval(getTime, 500)

// showTodos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `<li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${item.completed == true ? 'completed': ""}">${item.text}
        <div class="todo-icons"><span class="opacity-50 me-2">${item.time}</span>
        <img onclick=(editTodo(${i})) src="./images/edit.svg" alt="edit icon" class="edit-icon" width="25" height="25">
        <img onclick=(deleteTodo(${i})) src="./images/delete.svg" alt="delete icon" class="delete-icon" width="25" height="25">
        </div>
    </li>`
    })
}

// show error
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message

    setTimeout(() => {
    document.getElementById(`${where}`).textContent = ''
    }, 2500)
}

/* <ul id="list-group-todo" class="list-group">
            <li class="list-group-item d-flex justify-content-between">Hello World!
            <div class="todo-icons"><span class="opacity-50 me-2">20:45, 16 April, 2023</span>
            <img src="./images/edit.svg" alt="edit icon" class="edit-icon" width="25" height="25">
            <img src="./images/delete.svg" alt="delete icon" class="delete-icon" width="25" height="25">
            </div>
        </li>
        </ul> */


formCreate.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = formCreate['input-create'].value.trim()
    formCreate.reset()
    if(todoText.length) {
        todos.push({text: todoText, time: getTime(), completed: false})
        setTodos()
        showTodos()
    } else {
        showMessage('message-create', 'Please enter some todo...')
    }
})

// deleteTodo 

function deleteTodo(id) {
  const deleteTodos = todos.filter((item, i) => {
    return i !== id 
  })

  todos = deleteTodos
  setTodos()
  showTodos()
}

function setCompleted(id) {
  const completeTodos = todos.map((item, i) => {
     if(id == i) {
        return {...item, completed: item.completed == true ? false: true}
     } else {
        return {...item}
     }
  })   
  todos = completeTodos
  setTodos()
  showTodos()
}

//editForm 

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if(todoText.length) {
        todos.splice(editItemId, 1,{text: todoText, time: getTime(), completed: false})
        setTodos()
        showTodos()
        close()
    } else {
        showMessage('message-edit', 'Please enter some todo...')
    }

})

// editTodDo
function editTodo(id) {
    open()
    editItemId = id
}


function open() {
    overlay.classList.remove('hidden')
    modal.classList.remove('hidden')

}

function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}


overlay.addEventListener('click', close)
closeEl.addEventListener('click', close)

document.addEventListener('keydown', (e) => {
    if(e.key == 'Escape') {
        close()
        
    }
})


