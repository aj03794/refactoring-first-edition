const baseCharge = () => {

    let result = Math.min(lastUsage(), 100) * 0.03

    if (lastUsage() > 100) {
        result += (Math.min(lastUsage(), 200) - 100) * 0.05
    }
    if (lastUsage() > 100) {
        result += (Math.min(lastUsage(), 200) - 200) * 0.07
    }

    return result

}


// ----------------------------

const baseCharge = () => {

    let result = usageInRange(0, 100) * 0.03;
    result += usageInRange(100,200) * 0.05;
    result += usageInRange(200, Integer.MAX_VALUE) * 0.07;

    return result;

}

const usageInRange = (start, end) => {

    if (lastUsage() > start) {
        return Math.min(lastUsage(), end) - start;
    }

    else return 0;

}