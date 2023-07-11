import express from "express";

import {
  getQualifications,
  getQualificationById,
  getQualificationByName,
  postQualification,
  putQualification,
  deleteQualification,
} from "../services/Qualification.service";

const router = express.Router();

interface QualificationsErrorFormat {
  code: number;
  message: string;
  errorMessage: unknown;
}

router.get("", async (req, res) => {
  try {
    const serviceLayerResponse = await getQualifications();

    res
      .status(serviceLayerResponse.code)
      .json({ result: serviceLayerResponse.result });
  } catch (error) {
    const QualificationError = error as QualificationsErrorFormat;
    console.log(QualificationError.errorMessage);
    res.status(QualificationError.code).json(QualificationError.message);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await getQualificationById(id);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const QualificationError = error as QualificationsErrorFormat;
    console.log(QualificationError.errorMessage);
    res.status(QualificationError.code).json(QualificationError.message);
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const serviceLayerResponse = await getQualificationByName(name);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
  } catch (error) {
    const QualificationError = error as QualificationsErrorFormat;
    console.log(QualificationError.errorMessage);
    res.status(QualificationError.code).json(QualificationError.message);
  }
});

router.post("", async function (req, res) {
  try {
    const body = req.body;

    const serviceLayerResponse = await postQualification(body);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const QualificationError = error as QualificationsErrorFormat;
    console.log(QualificationError.errorMessage);
    res.status(QualificationError.code).json(QualificationError.message);
  }
});

router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const serviceLayerResponse = await putQualification(id, body);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const QualificationError = error as QualificationsErrorFormat;
    console.log(QualificationError.errorMessage);
    res.status(QualificationError.code).json(QualificationError.message);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await deleteQualification(id);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const QualificationError = error as QualificationsErrorFormat;
    console.log(QualificationError.errorMessage);
    res.status(QualificationError.code).json(QualificationError.message);
  }
});

export default router;
