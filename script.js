const addFD = document.querySelector('.add_fd')
const requirementTemplet = document.querySelector('.fd_input')
const calculateButton = document.querySelector('.calculateButton')
let FDlist = document.querySelectorAll('.fd_input')

addFD.addEventListener('click', ()=>{
    // requirementTemplet.parentNode.appendChild(requirementTemplet.cloneNode(true))
    addFD.parentNode.insertBefore(requirementTemplet.cloneNode(true), addFD)
})

calculateButton.addEventListener('click', ()=>{
    FDlist = document.querySelectorAll('.fd_input')
})