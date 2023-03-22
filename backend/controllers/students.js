const Student = require('../models/Student');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({
      length: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error,
    });
  }
};
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    return res.status(200).json({
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      errors: Object.values(error.errors).map((e) => ({
        name: e.path,
        type: e.kind,
        message: e.message,
      })),
    });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      errors: Object.values(error.errors).map((e) => ({
        name: e.path,
        type: e.kind,
        message: e.message,
      })),
    });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    // remove profile picture
    const student = await Student.findById(req.params.id);
    if (student.profile !== 'no_name.jpg') {
      fs.unlink(`./public/uploads/${student.profile}`, (err) => {
        if (err) return res.status(500).json({ error: err });
      });
    }
    await Student.findByIdAndRemove(req.params.id);
    res.status(200).json({
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error,
    });
  }
};

exports.uploadProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student.profile !== 'no_name.jpg') {
      fs.unlink(`./public/uploads/${student.profile}`, (err) => {
        if (err) return res.status(500).json({ error: err, student });
      });
    }
    const file = req.files?.profile;

    if (file) {
      const fileName = `${req.params.id}_${Date.now()}_${path.extname(
        file.name
      )}`;
      file.mv(`./public/uploads/${fileName}`, async (err) => {
        console.log(err);
        if (err) return res.status(500).json({ error: err });
        const student = await Student.findByIdAndUpdate(
          req.params.id,
          { profile: fileName },
          { new: true }
        );

        res.status(200).json({ student });
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error,
    });
  }
};
