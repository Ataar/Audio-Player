const clickBtn = document.getElementById('clickBtn')
const calculateAverage = () => {
const distance = document.getElementById('distance').value;
const fuel = document.getElementById('fuel').value;
const result = document.getElementById('result');
  // Check if the inputs are valid numbers
  if (isNaN(distance) || isNaN(fuel) || distance <= 0 || fuel <= 0) {
      result.textContent = "Please enter valid values first.";
      return;
  }

  // Calculate average fuel efficiency
  const average = distance / fuel;
  result.textContent = `Average Fuel Efficiency (km/l): ${average}`;
  document.getElementById('distance').value = '';
  document.getElementById('fuel').value = '';
  
};



// Bind the click event to the button
clickBtn.addEventListener('click', calculateAverage);

