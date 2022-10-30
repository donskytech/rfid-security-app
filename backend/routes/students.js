const router = require("express").Router();
const Student = require("../model/Student");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Upload profile image directory
const IMAGE_DIR = "./images/";

// set multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    //generate random uuid
    const fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Limit file upload only to images
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format is allowed!"));
    }
  },
});

// Create Student
router.post("/", upload.single("file"), async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    // save the generated filename in our MongoDB Atlas database
    newStudent.imagePic = req.file.path;
    const savedStudent = await newStudent.save();
    res.status(200).json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get Student list or Search Student by rfid or studentid query parameters
router.get("/", async (req, res) => {
  const studentId = req.query.studentId;
  const rfId = req.query.rfId;

  // if either studenId or rfId query parameters is present
  if (studentId || rfId) {
    try {
      let student;
      if (studentId && rfId) {
        student = await Student.find({
          studentId: studentId,
          rfidBadgeNumber: rfId,
        });
      } else if (studentId) {
        student = await Student.find({ studentId });
      } else if (rfId) {
        student = await Student.find({ rfidBadgeNumber: rfId });
      }
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
  // else return the whole Student list
  try {
    const studentList = await Student.find();
    res.status(200).json(studentList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get Student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update Student
router.put("/:id", upload.single("file"), async (req, res, next) => {
  //If a new profile pic is uploaded then process it first by deleting the old image file from disk
  if (req.file) {
    try {
      //find by id
      const oldStudentDetails = await Student.findById(req.params.id);
      if (!oldStudentDetails) {
        throw new Error("Student not found!");
      }

      //if old image file exist then the delete file from directory
      if (fs.existsSync(oldStudentDetails.imagePic)) {
        fs.unlink(oldStudentDetails.imagePic, (err) => {
          if (err) {
            throw new Error("Failed to delete file..");
          } else {
            console.log("file deleted");
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  // Update the database with new details
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        imagePic: req.file?.path,
      },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete Student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
