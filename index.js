import dotenv from "dotenv"
dotenv.config()

import cloud from "cloudinary"
const cloudinary = cloud.v2

import express from "express"
const app = express()
import path from "path"
import * as esj from "ejs"

import { storage } from "./storage/storage.js"
import multer from "multer"
const upload = multer({ storage })

const port = 9000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
const __dirname = path.resolve()
app.set("views", path.join(__dirname, "./views"))

app.get("", (req, res) => {
  res.render("home")
})

// We are using upload.single to tell "multer" to upload only single image
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file)
  res.send("Done")
})

// Just playing for testing, that's no get method we should use here
app.get("/image/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params
  const deleteProduct = await cloudinary.uploader.destroy(`profile/${id}`)

  console.log("destroyed message :", deleteProduct)
  res.send("Deleted bro!")
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
