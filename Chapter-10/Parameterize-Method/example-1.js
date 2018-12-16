// Note that this code isn't meant to run

export const employee = () => {

    const tenPercentRaise = () => {
        return salary *= 1.1;
    }

    const fivePercentRaise = () => {
        salary *= 1.05;
    }

    return {
        tenPercentRaise,
        fivePercentRaise
    }

}

// --------------------------------

export const employee = () => {

    
    const raise = (factor) => {
        salary *= (1 + factor);
        return salary
    }

    return {
        raise
    }

}