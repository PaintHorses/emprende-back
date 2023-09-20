const email = document.querySelector('#email')
const code = document.querySelector('#code')
const get_code = document.querySelector('#get_code')


get_code.addEventListener("click", async function () {
    console.log("click en get code")
    const url = `http://localhost:4000/api/auth/login/${email.value}/code`
    /* fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email: email.value })
    })
    .then ((res) => res.json()).then((resJSON) => console.log(resJSON)) */

    const res = await fetch(url, {
        method: 'POST',
    })
    const resJSON = await res.json()
    console.log(resJSON)


})