const express = require("express")
const morgan = require("morgan")
const layout = require("./views/layout")
const path = require("path")

const app = express()
app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"))
app.use("/static", express.static(path.join(__dirname, "public")))

app.get("/", (req, res, next) => {
	res.send(layout(""))
})

app.listen(3000, () => {
	console.log(`App listening in port ${3000}`)
})
