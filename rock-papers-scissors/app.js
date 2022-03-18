//Screen elements variables
const $aiChoiceDisplayElement = document.getElementById('ai-choice')
const $userChoiceDisplayElement = document.getElementById('user-choice')
const $resultDisplayElement = document.getElementById('result')
const $possibleChoices = document.querySelectorAll('button')

//Default variables
let userChoice
let aiChoice

//Fucntion to get user choice
function getUserChoice(e) {
    userChoice = e.target.value
    $userChoiceDisplayElement.innerHTML = userChoice
    generateAIChoice()
}

//Fuction to generate Ai Choice
function generateAIChoice() {
    let randomNumber = Math.floor(Math.random() * $possibleChoices.length) + 1

    if(randomNumber === 1){
        aiChoice = 'Pedra'
    } else if(randomNumber === 2) {
        aiChoice = 'Papel'
    } else if(randomNumber === 3) {
        aiChoice = 'Tessoura'
    }

    $aiChoiceDisplayElement.innerHTML = aiChoice

    defResult()
}

//Function to define result
function defResult() {

    //Result verification
    if (aiChoice === userChoice) {
        $resultDisplayElement.innerHTML = 'Empate'
        $resultDisplayElement.style.color = '#FFF'
    } else if(aiChoice === 'Pedra' && userChoice === 'Papel') {
        $resultDisplayElement.innerHTML = 'Você ganhou!'
        $resultDisplayElement.style.color = '#8CFF02'
    } else if(aiChoice === 'Pedra' && userChoice === 'Tessoura') {
        $resultDisplayElement.innerHTML = 'Você perdeu =('
        $resultDisplayElement.style.color = '#E83405'
    } else if(aiChoice === 'Tessoura' && userChoice === 'Papel') {
        $resultDisplayElement.innerHTML = 'Você perdeu =('
        $resultDisplayElement.style.color = '#E83405'
    } else if(aiChoice === 'Tessoura' && userChoice === 'Pedra') {
        $resultDisplayElement.innerHTML = 'Você ganhou!'
        $resultDisplayElement.style.color = '#8CFF02'
    } else if(aiChoice === 'Papel' && userChoice === 'Pedra') {
        $resultDisplayElement.innerHTML = 'Você perdeu =('
        $resultDisplayElement.style.color = '#E83405'
    } else if(aiChoice === 'Papel' && userChoice === 'Tessoura') {
        $resultDisplayElement.innerHTML = 'Você ganhou!'
        $resultDisplayElement.style.color = '#8CFF02'
    }
}