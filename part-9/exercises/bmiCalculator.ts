interface Values {
    mass: number;
    height: number;
}

const parseArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            mass: Number(args[2]),
            height: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (mass: number, height: number) => {
    let heightMeter = height / 100;
    let heightSquare = heightMeter * heightMeter;
    
    let calculation: number = (mass / heightSquare);

    if (calculation < 18.5) {
        console.log('Low weight');
    }

    if (calculation >= 18.5 && calculation <= 24.99) {
        console.log('Normal (healthy weight)');
    }

    if (calculation >= 25) {
        console.log('Overweight');
    }
}

try {
    const { mass, height } = parseArguments(process.argv);
    calculateBmi(mass, height);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}


/* const calculateBmi = (mass: number, height: number) => {
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

console.log(calculateBmi(80, 175)); */