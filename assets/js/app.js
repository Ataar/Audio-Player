const isPrime = (num) => {
  if (num <= 1) return false; 

  for (let i = 2; i <= Math.sqrt(num); i++) { 
      if (num % i === 0) {
          return false; 
      }
  }
  return true; 
};

const checkButton = document.getElementById("checkButton");

checkButton.addEventListener("click", () => {
  const inputField = document.getElementById("numberInput");
  const input = inputField.value;
  const num = parseInt(input, 10);

  if (isNaN(num)) {
      Swal.fire({
          title: "Error!",
          html: "<b style = 'font-size:17px;color:red'>Please enter a valid number!</b>",
          icon: "error",
          timer:2000
         
      });

      return
      
  }

  Swal.fire({
      title: "Result",
      html: `<b>${num} is ${isPrime(num) ? 'a prime' : 'not a prime'} number!</b>`,
      icon: "success",
      timer:2000
  })
  .then(() => {
      inputField.value = "";
  });
});
