// This is all in an Employee class

const engineer = 0
const salesman = 1
const manager = 2

const create = (type) => {

    switch(type) {
        case engineer:
            return new Engineer()
        case salesman:
            return new Salesman()
        case manager:
            return new Manager()
        default:
            throw new Error(`Incorrect type code value`)
    }

}

// ----------------------------

const createEngineer = () => new Engineer()
const createSalesman = () => new Salesman()
const createManager = () => new Manager()

const create = (type) => {
    switch(type) {
        case engineer:
            return createEngineer()
        case salesman:
            return createSalesman()
        case manager:
            return createManager()
        default:
            throw new Error(`Incorrect type code value`)
    }
}

//  Callers of the old create method look like
const kent = Employee.create(engineer)
// With new code
const kent = Employee.createEngineer()