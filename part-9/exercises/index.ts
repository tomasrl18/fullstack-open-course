import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

//@ts-ignore
app.get('/bmi', (_req, res) => {
    const { height, weight } = _req.query;

    if (!height || !weight) {
        return res.status(400).json({ error: "missing parameters" });
    }

    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (isNaN(heightNumber) || isNaN(weightNumber)) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    const result = calculateBmi(weightNumber, heightNumber);
    return res.json(result);
});

//@ts-ignore
app.get('/exercises', (_req, res) => {
    const { daily_exercises, target } = _req.query;

    if (!daily_exercises || !target) {
        return res.status(400).json({ error: "parameters missing" });
    }

    const dailyExercisesArray = JSON.parse(daily_exercises as string);
    const targetNumber = Number(target);

    if (
        !Array.isArray(dailyExercisesArray) ||
        !dailyExercisesArray.every((num) => typeof num === 'number') ||
        isNaN(targetNumber)
    ) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    const result = calculateExercises(dailyExercisesArray, targetNumber);
    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});