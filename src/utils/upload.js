import multer from "multer";

const uploadSingleFile = (fieldName) => {

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/recipes");
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {

  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
}

const upload = multer({
  storage,
  fileFilter, 
//   limits:{
    // fileSize : 1* 1024 * 1024 * 1024 , } 
 



});
return upload.single(fieldName);
}

export { uploadSingleFile };