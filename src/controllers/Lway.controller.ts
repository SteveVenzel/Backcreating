import express from "express";

import {
  getLways,
  getLwayById,
  getLwayByName,
  postLway,
  putLway,
  deleteLway,
} from "../services/Lway.service";

const router = express.Router();

interface LwaysErrorFormat {
  code: number;
  message: string;
  errorMessage: unknown;
}

router.get("", async (req, res) => {
  try {
    const serviceLayerResponse = await getLways();

    res
      .status(serviceLayerResponse.code)
      .json({ result: serviceLayerResponse.result });
  } catch (error) {
    const LwayError = error as LwaysErrorFormat;
    console.log(LwayError.errorMessage);
    res.status(LwayError.code).json(LwayError.message);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await getLwayById(id);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const LwayError = error as LwaysErrorFormat;
    console.log(LwayError.errorMessage);
    res.status(LwayError.code).json(LwayError.message);
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const serviceLayerResponse = await getLwayByName(name);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
  } catch (error) {
    const LwayError = error as LwaysErrorFormat;
    console.log(LwayError.errorMessage);
    res.status(LwayError.code).json(LwayError.message);
  }
});

router.post("", async function (req, res) {
  try {
    const body = req.body;

    const serviceLayerResponse = await postLway(body);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const LwayError = error as LwaysErrorFormat;
    console.log(LwayError.errorMessage);
    res.status(LwayError.code).json(LwayError.message);
  }
});

router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const serviceLayerResponse = await putLway(id, body);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const LwayError = error as LwaysErrorFormat;
    console.log(LwayError.errorMessage);
    res.status(LwayError.code).json(LwayError.message);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await deleteLway(id);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const LwayError = error as LwaysErrorFormat;
    console.log(LwayError.errorMessage);
    res.status(LwayError.code).json(LwayError.message);
  }
});

export default router;