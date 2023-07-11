import express from "express";

import {
  getStudents,
  getStudentById,
  getStudentByName,
  postStudent,
  putStudent,
  deleteStudent,
} from "../services/Student.service";

const router = express.Router();

interface StudentErrorFormat {
  code: number;
  message: string;
  errorMessage: unknown;
}

router.get("", async (req, res) => {
  try {
    const serviceLayerResponse = await getStudents();

    res
      .status(serviceLayerResponse.code)
      .json({ result: serviceLayerResponse.result });
  } catch (error) {
    const StudentError = error as StudentErrorFormat;
    console.log(StudentError.errorMessage);
    res.status(StudentError.code).json(StudentError.message);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await getStudentById(id);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const StudentError = error as StudentErrorFormat;
    console.log(StudentError.errorMessage);
    res.status(StudentError.code).json(StudentError.message);
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const serviceLayerResponse = await getStudentByName(name);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
  } catch (error) {
    const StudentError = error as StudentErrorFormat;
    console.log(StudentError.errorMessage);
    res.status(StudentError.code).json(StudentError.message);
  }
});

router.post("", async function (req, res) {
  try {
    const body = req.body;

    const serviceLayerResponse = await postStudent(body);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const StudentError = error as StudentErrorFormat;
    console.log(StudentError.errorMessage);
    res.status(StudentError.code).json(StudentError.message);
  }
});

router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const serviceLayerResponse = await putStudent(id, body);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const StudentError = error as StudentErrorFormat;
    console.log(StudentError.errorMessage);
    res.status(StudentError.code).json(StudentError.message);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await deleteStudent(id);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const StudentError = error as StudentErrorFormat;
    console.log(StudentError.errorMessage);
    res.status(StudentError.code).json(StudentError.message);
  }
});

export default router;
