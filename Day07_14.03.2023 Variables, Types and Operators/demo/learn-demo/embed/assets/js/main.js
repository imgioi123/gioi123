// console.log("Hello");

let weightInput = document.getElementById('weight');
let heightInput = document.getElementById('height');
let calBtn = document.getElementById('calBtn');

let weight, height;

weightInput.addEventListener('change', function(e) {
    // get value
    weight = e.target.value; // string
    weight = parseInt(weight);
    console.log("w= " + weight);
})

heightInput.addEventListener('change', function(e) {
    // get value
    height = e.target.value; // string
    height = parseFloat(height); // Integer, Float
    console.log("h= " + height);
})

calBtn.addEventListener('click', function() {
    let BMI = weight / (height * height);
    console.log(BMI);
})



