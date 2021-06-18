const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')

messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) =>{
         e.preventDefault()
         const location = searchInput.value
         debugger
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response)=>{
   
         debugger
        response.json().then((data) =>{
            if(data.error)
            {
              console.log(data.error)
              messageOne.textContent = data.error
            }
            else
            {
              messageOne.textContent = data.location
              messageTwo.textContent = data.forecast
              console.log(data.location)
              console.log(data.forecast)
            }
                               
        })
    
    })
})

