const incrementBtn = document.getElementById('increment')
const decrementBtn = document.getElementById('decrement')
const generateBtn = document.getElementById('generate')
const lengthInput = document.getElementById('password-length')
const passwordEls = document.querySelectorAll('.password')
const popUp = document.getElementById('pop-up')

let timeoutId
let passwordLength = 15

generateBtn.addEventListener('click', generateFourPassword)
incrementBtn.addEventListener('click', () => updateLength(passwordLength + 1))
decrementBtn.addEventListener('click', () => updateLength(passwordLength - 1))

passwordEls.forEach(element => {
    element.addEventListener('click', copyToClipboard)
  })

function updateLength(number) {
    number = Number(number)

    if (number >= 8 && number <= 20) {
        passwordLength = number
    } else {
        alert('Password lenght must be between 8 and 20 characters')
    }

    lengthInput.value = passwordLength
}   

function generatePassword() {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '1234567890'
    const logograms = '#$%&@^`~'
    const mathSymbols = '<*+!?='

    let characters = uppercase + lowercase + numbers + logograms + mathSymbols
    characters = characters.split('')

    let password = ''
    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length) 
        password += characters[randomIndex]
    }
    return password
}

function generateFourPassword() {
    const passwords = []

    for (let i = 0; i < passwordEls.length; i++) {
        const password = generatePassword()
        passwords.push(password)
    }

    for (let i = 0; i < passwords.length; i++) {
        passwordEls[i].textContent = passwords[i]
        passwordEls[i].classList.remove('hidden')
    }
}

async function copyToClipboard(event) {
    const password = event.target.textContent
    try {
      await navigator.clipboard.writeText(password)
    } catch(err) {
      console.log("Clipboard access denied. Time to go old school...")
      copyUsingExecCommand(password)
    }
  
    // show a pop-up to notify the user
    clearTimeout(timeoutId)
    popUp.style.opacity = 0.9
    timeoutId = setTimeout(() => popUp.style.opacity = '', 3000)
  }
  
  function copyUsingExecCommand(text) {
    const input = document.createElement("input")
    input.value = text
    input.readOnly = true
    input.style = {
      position: "absolute",
      left: "-9999px"
    }
    document.body.append(input)
    input.select()
    document.execCommand("copy")
    input.remove()
  }





