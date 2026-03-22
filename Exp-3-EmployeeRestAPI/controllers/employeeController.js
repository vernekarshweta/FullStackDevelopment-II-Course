let employees = []


// GET ALL
const getEmployees = (req, res) => {

    res.json(employees)
}


// GET ONE
const getEmployee = (req, res) => {

    const id = req.params.id

    const emp = employees.find(e => e.id == id)

    if (!emp) {
        return res.status(404).json({ message: "Not found" })
    }

    res.json(emp)
}


// CREATE
const addEmployee = (req, res) => {

    const { name, email, role } = req.body

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email required"
        })
    }

    const emp = {
        id: Date.now(),
        name,
        email,
        role
    }

    employees.push(emp)

    res.json(emp)
}


// UPDATE
const updateEmployee = (req, res) => {

    const id = req.params.id

    const { name, email, role } = req.body

    employees = employees.map(e => {

        if (e.id == id) {
            return {
                ...e,
                name,
                email,
                role
            }
        }

        return e
    })

    res.json({ message: "Updated" })
}


// DELETE
const deleteEmployee = (req, res) => {

    const id = req.params.id

    employees = employees.filter(e => e.id != id)

    res.json({ message: "Deleted" })
}


module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
}