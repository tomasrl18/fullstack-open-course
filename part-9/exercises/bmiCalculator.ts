import express from 'express';

interface Args {
    mass: number;
    height: number;
    bmi: string;
}

interface Error {
    error: string;
}

const calculateBmi = (mass: number, height: number): Args | Error => {
    if (isNaN(height) || isNaN(mass)) {
        return {
            error: "malformatted parameters"
        }
    }
    
    let heightMeter = height / 100;
    let heightSquare = heightMeter * heightMeter;
    
    let calculation: number = (mass / heightSquare);

    if (calculation < 18.5) {
        return {
            mass: mass,
            height: height,
            bmi: "Low weight"
        }
    }

    if (calculation >= 18.5 && calculation <= 24.99) {
        return {
            mass,
            height,
            bmi: "Normal (healthy weight)"
        }
    }

    if (calculation >= 25) {
        return {
            mass,
            height,
            bmi: "Overweight"
        }
    }

    return {
        mass: 0,
        height: 0,
        bmi: "Not provided args"
    }
}

const app = express();

app.get('/bmi', (_req, res) => {
    const { height, mass } = _req.query;
    
    res.send(calculateBmi(Number(mass), Number(height)));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});