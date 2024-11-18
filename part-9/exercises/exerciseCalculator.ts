interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean,
    rating: number;
    ratingDescription: string,
}

const calculateExercises = (diaryHours: number[], goal: number): Result => {
    let trainingDays = calculateTrainingDays(diaryHours);
    let avgExercised = calculateAvgExercised(diaryHours);
    let success = calculateSuccess(avgExercised, goal);
    let rating = calculateRating(avgExercised);
    let ratingDescription = calculateRatingDescription(rating, goal);

    return {
        periodLength: diaryHours.length,
        trainingDays,
        target: goal,
        average: avgExercised,
        success,
        rating,
        ratingDescription
    }
}

const calculateTrainingDays = (diaryHours: number[]): number => {
    let trainedDays = [];

    diaryHours.forEach(hoursDay => {
        if (hoursDay > 0) {
            trainedDays.push(hoursDay)
        }
    });

    return trainedDays.length;
}

const calculateAvgExercised = (diaryHours: number[]): number => {
    let totalHours: number = 0;
    let period: number = diaryHours.length;

    diaryHours.forEach(hoursDay => {
        totalHours += hoursDay;
    })

    return totalHours / period;
}

const calculateSuccess = (avgExercised: number, goal: number): boolean => {
    return avgExercised >= goal;
}

const calculateRating = (avgExercised: number): number => {
    let roundedAvg = Math.round(avgExercised);

    if (roundedAvg <= 1) {
        return 1;
    }

    if (roundedAvg >= 3) {
        return 3;
    } 

    return 2;
}

const calculateRatingDescription = (rating: number, goal: number): string => {
    if (rating === 1) {
        return 'Not enough, you can do it better'
    }

    if (rating > 1 && rating < 3) {
        return 'Not too bad but could be better'
    }

    if (rating === 3) {
        return 'Very good!!, keep it up'
    }
}

console.log(calculateExercises([2, 0, 4, 1, 2.15, 3.33, 0.5], 2));