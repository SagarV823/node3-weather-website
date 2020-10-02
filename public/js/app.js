const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const messageOne=document.getElementById('p1')
const messageTwo=document.getElementById('p2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    const location = searchElement.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
                console.log(data.error)
            }
            else {
                messageOne.textContent=data.Forecast
                messageTwo.textContent=data.location
                console.log(data.Forecast)
                console.log(data.Address)
                console.log(data.location)
            }
        })
    })
})