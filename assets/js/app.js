let numbers = document.getElementById('numbers')
let result = document.getElementById('result')



const onCheck = ()=>{
  const checkValue = parseInt (numbers.value,10)
  if(!isNaN(checkValue))
    {
    
    result.textContent = `${checkValue} is ${checkValue % 2 === 0 ? "Even" : "Odd"};`
    // numbers.value = '';
  }
  else
  {
    result.textContent = "";
  }
}


numbers.addEventListener('keyup',onCheck)