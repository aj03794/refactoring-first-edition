const getSpeed = () => { 
    switch(_type) {
        case EUROPEAN:
            return getBaseSpeed()
        case AFRICAN:
            return getBaseSpeed() - getLoadFactor * _numberOfCoconuts
        case NORWEIGAN_BLUE:
            return (_inNailed) ? 0 : getBaseSpeed(_voltage)
    }
    throw new Error(`should be unreachable`)
}

