const form= document.querySelector('form')
const email = document.querySelector('#email')
const login_code = document.querySelector('#login_code')
const get_code = document.querySelector('#get_code')

const url = window.origin

get_code.addEventListener("click", async function (e) {
    e.preventDefault()
    if (!email.value) {
        Swal.fire({
            title: 'Aviso!',
            text: 'Debe introducir un email',
            icon: 'info',
            confirmButtonText: 'Ok'
        })
        return
    }
    const res = await fetch(`${url}/api/auth/login/${email.value}/code`, {
        method: 'POST',
    })

    const resJSON = await res.json()
})

form.addEventListener("submit", async function(e) {
    e.preventDefault()
    if (!email.value || !login_code.value) {
        Swal.fire({
            title: 'PUPS!',
            text: 'Debe introducir un email y el código',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
        return
    }

    const res = await fetch(`${url}/api/auth/login/${email.value}`, {
        method: "POST",
        headers: {"Content-Type" : "application/json" },
        body: JSON.stringify({code : login_code.value}),
    })

    const resJSON = await res.json()
    window.location.href = "/"
    //console.log(resJSON)

    
})