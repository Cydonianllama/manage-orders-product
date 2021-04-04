const btnLogin = document.getElementById('btn-login')
const inpupUsername = document.getElementById('input-username')
const inputPassword = document.getElementById('input-password')

const containerIformation = document.querySelector('.container-information')

function templateSuccessLoginAdvice(type){
    switch(type){
        case 'success':
            return `
                    <div class = "advice success">
                        <p>welcome to the application</p>
                    </div>
                    `
    }
}

function createAdviceSuccess () {
    containerIformation.innerHTML = templateSuccessLoginAdvice('success')
}

function dataLogin (){
    return {
        username : inpupUsername.value,
        password : inputPassword.value
    }
}

async function fetchDataLogin () {
    let stringJson = JSON.stringify(dataLogin())
    let response = await fetch('/api/user/login',{
        method : 'POST',
        body : stringJson,
        headers : {
            'content-type' : 'application/json'
        }
    })
    let data = await response.json();
    if (data.result === true) {
        createAdviceSuccess()
        location.href = '/dashboard'
    }
} 

const actionSubmit = (e) => {
    fetchDataLogin()
    e.preventDefault()
}

function listeners(){
    btnLogin.addEventListener('click',actionSubmit)
}

function app(){
    listeners()
}

app()