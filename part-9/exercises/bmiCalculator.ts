const calculateBmi = (mass: number, height: number) => {
    let heightMeter = height / 100;
    let heightSquare = heightMeter * heightMeter;
    
    let calculation: number = (mass / heightSquare);

    if (calculation < 18.5) {
        return 'Low weight'
    }

    if (calculation >= 18.5 && calculation <= 24.99) {
        return 'Normal (healthy weight)'
    }

    if (calculation >= 25) {
        return 'Overweight'
    }
}

console.log(calculateBmi(80, 175));