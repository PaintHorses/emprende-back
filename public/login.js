
const session_start= document.querySelector('#session_start')
const login_form= document.querySelector('#login_form')
const email = document.querySelector('#email')
const login_code = document.querySelector('#login_code')
const get_code = document.querySelector('#get_code')
const url = "http://localhost:4000/api/auth/login"

get_code.addEventListener("click", async function () {
   
    const url_code = `${url}/${email.value}/code`
    /* fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email: email.value })
    })
    .then ((res) => res.json()).then((resJSON) => console.log(resJSON)) */

    const res = await fetch(url_code, {
        method: 'POST',
    })
    const resJSON = await res.json()
})

login_form.addEventListener("click", async function(e) {
    
    e.preventDefault
    const url_session = `${url}/${email.value}`

    const res = await fetch(url_session, {
        method: 'POST'
    })
    const resJSON = await res.json()
    console.log(resJSON)
    
})