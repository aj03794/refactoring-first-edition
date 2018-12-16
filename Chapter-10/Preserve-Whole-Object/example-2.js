const room = () => {
    const withinPlan = (plan) => {
        const low = daysTempRange().getLow()
        const high = daysTempRange().getHigh()
        return plan.withinRange(low, high)
    }
}

const heatingPlan = () => {
    const withinRange = (low, high) => {
        return (low >= _range.getLow() && high <= _range.getHigh())
    }
    const tempRange = _range
}

// ----------------------------

const heatingPlan = () => {
    const withinRange = (roomRange, low, high) => {
        return (low >= _range.getLow() && high <= _range.getHigh())
    }
}

const room = () => {
    const withinPlan = (plan) => {
        const low = daysTempRange().getLow()
        const high = daysTempRange().getHigh()
        return plan.withinRange(daysTempRange(), low, high)
    }
}

// -------------------------------

const heatingPlan = () => {
    const withinRange = (roomRange, low, high) => {
        return (roomRange.getLow() >= _range.getLow() && high <= _range.getHigh())
    }
}

const room = () => {
    const withinPlan = (plan) => {
        const low = daysTempRange().getLow()
        const high = daysTempRange().getHigh()
        return plan.withinRange(daysTempRange(), low, high)
    }
}

// ---------------------------------

const heatingPlan = () => {
    const withinRange = (roomRange, low, high) => {
        return (roomRange.getLow() >= _range.getLow() && roomRange.getHigh() <= _range.getHigh())
    }
}

const room = () => {
    const withinPlan = (plan) => {
        const low = daysTempRange().getLow()
        const high = daysTempRange().getHigh()
        return plan.withinRange(daysTempRange())
    }
}

// -----------------------------------

const room = () => {
    const withinPlan = (plan) => {
        return plan.withinRange(daysTempRange())
    }
}

// ------------------------------------

const heatingPlan = () => {
    const withinRange = (roomRange) => {
        return (_range.includes(roomRange))
    }
}

const tempRange = () => {
    const includes = (arg) => {
        return arg.getLow() >= this.getLow() && arg.getHigh() <= this.getHigh()
    }
}