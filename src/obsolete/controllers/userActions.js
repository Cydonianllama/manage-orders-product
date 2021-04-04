const btnSubmit = document.getElementById('submit-login')
const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')

const loginUser = async (e) => {

    let username_value = usernameInput.value;
    let password_value = passwordInput.value;
    
    let body = {
        username : username_value,
        password : password_value
    }

    let bodyParse = JSON.stringify(body);

    console.log(body)

    let response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyParse
    });

    let information = await response.json()
    console.log(information)
    
    e.preventDefault();
}

//btnSubmit.addEventListener('click',loginUser)

