interface Args {
    weight: number;
    height: number;
    bmi: string;
}

interface Error {
    error: string;
}

export const calculateBmi = (weight: number, height: number): Args | Error => {
    if (isNaN(height) || isNaN(weight)) {
        return { error: "malformatted parameters" };
    }

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);

    if (bmiValue < 18.5) {
        return { weight, height, bmi: "Low weight" };
    }

    if (bmiValue >= 18.5 && bmiValue <= 24.99) {
        return { weight, height, bmi: "Normal (healthy weight)" };
    }

    return { weight, height, bmi: "Overweight" };
};