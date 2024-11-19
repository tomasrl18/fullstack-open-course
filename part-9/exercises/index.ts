import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});