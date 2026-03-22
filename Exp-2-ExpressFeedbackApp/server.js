const express = require("express")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let feedbackList = []


// CUSTOMER FORM
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/feedbackForm.html")
})


// SUBMIT FEEDBACK
app.post("/submit-feedback", (req, res) => {

    const { name, message } = req.body

    const feedback = {
        id: Date.now(),
        name,
        message
    }

    feedbackList.push(feedback)

    res.send("Feedback submitted successfully")
})


// ADMIN VIEW ALL FEEDBACK
app.get("/admin/feedbacks", (req, res) => {
    res.json(feedbackList)
})


// UPDATE FEEDBACK
app.put("/admin/feedback/:id", (req, res) => {

    const id = req.params.id
    const { message } = req.body

    feedbackList = feedbackList.map(f => {
        if (f.id == id) {
            f.message = message
        }
        return f
    })

    res.send("Feedback updated")
})


// DELETE FEEDBACK
app.delete("/admin/feedback/:id", (req, res) => {

    const id = req.params.id

    feedbackList = feedbackList.filter(f => f.id != id)

    res.send("Feedback deleted")
})


app.listen(3000, () => {
    console.log("Server running on port 3000")
})