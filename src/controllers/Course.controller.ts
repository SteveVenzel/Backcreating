import express from "express";

import {
  getCourses,
  getCourseById,
  getCourseByName,
  postCourse,
  putCourse,
  deleteCourse,
} from "../services/Course.service";


const router = express.Router();

interface CoursesErrorFormat {
  code: number;
  message: string;
  errorMessage: unknown;
}

router.get("", async (req, res) => {
  try {
    const serviceLayerResponse = await getCourses();

    res
      .status(serviceLayerResponse.code)
      .json({ result: serviceLayerResponse.result });
  } catch (error) {
    const CourseError = error as CoursesErrorFormat;
    console.log(CourseError.errorMessage);
    res.status(CourseError.code).json(CourseError.message);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await getCourseById(id);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const CourseError = error as CoursesErrorFormat;
    console.log(CourseError.errorMessage);
    res.status(CourseError.code).json(CourseError.message);
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const serviceLayerResponse = await getCourseByName(name);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
  } catch (error) {
    const CourseError = error as CoursesErrorFormat;
    console.log(CourseError.errorMessage);
    res.status(CourseError.code).json(CourseError.message);
  }
});

router.post("", async function (req, res) {
  try {
    const body = req.body;

    const serviceLayerResponse = await postCourse(body);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const CourseError = error as CoursesErrorFormat;
    console.log(CourseError.errorMessage);
    res.status(CourseError.code).json(CourseError.message);
  }
});

router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const serviceLayerResponse = await putCourse(id, body);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const CourseError = error as CoursesErrorFormat;
    console.log(CourseError.errorMessage);
    res.status(CourseError.code).json(CourseError.message);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await deleteCourse(id);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const CourseError = error as CoursesErrorFormat;
    console.log(CourseError.errorMessage);
    res.status(CourseError.code).json(CourseError.message);
  }
});

export default router;