const { uploadMultiple } = require("../Middleware/ImageUploader");
const ImageModel = require("../models/ImageModel")

const Routes = require("express").Router();

Routes.get("/", async (req, res) => {
  try {
    const data = await ImageModel.find().sort({ createdAt: -1 });

    console.log('<--- data --> ', data);
    res.status(200)
        .json({
            message: "Images",
            success: true,
            data: data
        })
} catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'Internal server error',
        success: false,
        error: err
    })
}
});

Routes.get("/upload-images",(req,res)=>{
  res.send("Damn good")
})

Routes.post("/upload-images", uploadMultiple, async (req, res) => {
  
  try {
    console.log("--uploaded public urls--", req.files);
    const images = req.files.map((file) => (
      {
      mimeType: file.mimetype,
      originalName: file.originalname,
      size: file.size,
      imageURL: file.path
    }
  ));
  console.log(images)
    await ImageModel.insertMany(images);
     res.status(200).json({
      message: "File Uploaded Successfully",
      files: req.files,
      success: true
    });
  } catch (err) {
    res.status(500).json({
        message: "Internal error",
        err: err,
        success: false,
        
      });
  }
 });

module.exports = Routes;
