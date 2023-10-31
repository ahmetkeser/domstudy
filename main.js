const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

eventListeners()
function eventListeners(){  // Tüm event listenerler

    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",LoadAllTodosIO)
    secondCardBody.addEventListener("click",deleteTodo)
    filter.addEventListener("keyup",filterTodos)
    clearButton.addEventListener("click",clearAllTodos)
       
} 
function clearAllTodos(){
    if(confirm,"Tümünü silmek istediğinizden eminmisiniz ?"){// uyarıya basarsa true döner ve paranteze girer
        while(todoList.firstElementChild != null){ // todo list ilk elemanı null olana kadar dön yani eleman bitene kadar
            todoList.removeChild(todoList.firstElementChild) // todo listin ilk elemanını siler
        }
        localStorage.remove("todos") // local bölümünü temizler
    }
    //Arayüzden todoları temizler
    const localStorageAll = localStorage.getItem(todos)
    if(localStorageAll){
        localStorageAll.remove()
    }
    localStorage.setItem(localStorageAll)
}

function filterTodos(e){  // aranan kelimeyi filitreleyerek listedeki elemanları getirir key up ile yazdıkça arama yapar
    const filterValue = e.target.value.toLowerCase()
    const listItem = document.querySelectorAll(".list-group-item")
    listItem.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase()
        if(text.indexOf(filterValue) === -1){ 
            //Aranan anahtar bulunamaması durumu
            listItem.setAttribute("style","display : none !important") // boostrapin özelliği baskın geldiği için !important Kesinlikle uygula parametresini devreye sokmalıyız aradığımız içerik olamaynları gösterme işlemi yapar
        }else{
            listItem.setAttribute("style","display : block")
        }
    })

}
function deleteTodo(e){ // taget ile hangi elementin üstüne tıkladığımızı adresler
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove()
        showAlert("success","Silme işlemi başarılı")
        deletoTodoFromStorage(e.target.parentElement.parentElement.textContent)
    }

}
function deletoTodoFromStorage(todo){
    let todos=getTodosFromStorage()
    todos.forEach(function(element,index){
        if(element === todo){
            todos.splice(index,1) // çağırılan stroge elemanlarından aradığımzı bulup splice methodu ile siler 
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}
function LoadAllTodosIO(){  // localstrogede kayıtlı girişleri getirir
   let todos = getTodosFromStorage()
   todos.forEach(function(todo) {
    addTodoToUI(todo)   
    });
}
function addTodo(e){
    const newTodo = todoInput.value.trim(); // inputa girilen veriyi alıyoruz // ! trim fonksiyonu yazının başındaki ve sonundaki boşlukları kaldırır.
    if(newTodo=== ""){
        showAlert("danger","lütfen bir değer girin");
    }else {
        addTodoToUI(newTodo)
        addTodoToStorage(newTodo)
        showAlert("primary","Giriş Başarılı");
    }

    e.preventDefault() // sayfayı tekrardan yönlendirmemesi için default gelen özelliği aktifleştiriyoruz
}
function getTodosFromStorage(){ // storageden eklenmiş todo varsa onları alır
    let todos
    if(localStorage.getItem("todos")=== null){
        todos=[]
    }else{
        todos =JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
}
function showAlert(type,message){
    const alertText = document.createElement("div")
    alertText.className= `alert alert-${type}`
   // alertText.role ="alert"
    alertText.textContent=message
    firstCardBody.appendChild(alertText)
    // setTimeOut belirli bir süre işlemi bekletmek için kullanılır
    // ilkönce yapılacak işi daha sonra milisaniye cinsinde ... saniye sonra fonk çalışsın
    setTimeout(function(){
        alertText.remove()
     },1000)
}
function addTodoToUI(newTodo){
    // list item oluşturma
   const listItem= document.createElement("li")
   // link oluşturma
   const link = document.createElement("a")
   link.href="#"
   link.className="delete-item"
   link.innerHTML="<i class = 'fa fa-remove'></i>" 
   listItem.className ="list-group-item d-flex justify-content-between"
   //text node ekleme
   listItem.appendChild(document.createTextNode(newTodo))
   listItem.appendChild(link)
   // todo list e list item eleme
   todoList.appendChild(listItem)
   todoInput.value=""// veri girildikten ve eklendikten sonra inputun yazısını temizler
}