console.log('JavaScript file loaded')

const form = document.querySelector('form')
const search = document.querySelector('input')
const weatherResult = document.querySelector('#weatherResult')
const message2 =document.querySelector('#message-2')

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    weatherResult.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    
        response.json().then((data) =>{
            if(data.error){
                weatherResult.textContent = data.error
            } else {
                weatherResult.textContent = data.address
                message2.textContent = data.forecast
            }
        })
    })

})