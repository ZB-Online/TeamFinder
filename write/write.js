const $writeLineTier =  document.querySelector('.write-line-tier')
const $writePosition =  document.querySelector('.write-position')
$writeLineInput.addEventListener('focus', () => {
    $writePosition.style.display = 'block'
})

$writeLineInput.addEventListener('blur', () => {
    $writePosition.style.display = 'none'
})