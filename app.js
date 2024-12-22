const BASE_URL = "http://localhost:3000"
const wrapperEl = document.querySelector(".wrapper")
const formEl = document.querySelector(".form")
const inputName = document.querySelector(".name")
const inputAge = document.querySelector(".age")
const inputNumber = document.querySelector(".number")

async function fetchUsers() {
    const response = await fetch(`${BASE_URL}/users`)
    response 
        .json()
        .then(res => {
            createUsers(res);
        })
}

window.onload = ()=> {
    fetchUsers()
}

function createUsers(data) {    
    data.forEach(user => {
    const userItem = document.createElement("div")
    userItem.classList.add("card")

    userItem.innerHTML = `
        <h2>${user.fullname}</h2>
        <p>Age: ${user.age}</p>
        <strong>Phone: ${user.phone}</strong>
        <button data-id=${user.id} name="delete-btn">delete</button>
    `
    wrapperEl.appendChild(userItem)
    });
}

formEl.addEventListener("submit", e => {
    e.preventDefault()

    let newUser = {
        fullname: inputName.value,
        age: inputAge.value,
        phone: inputNumber.value

    }
    
    fetch(`${BASE_URL }/users`,  {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })    
    .then(res => console.log(res))
    .catch(err => console.log(err))
})


wrapperEl.addEventListener("click", e =>{
    if(e.target.name === "delete-btn"){
        let id = e.target.dataset.id
        fetch(`${BASE_URL}/users/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
})