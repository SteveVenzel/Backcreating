import express from "express";

import {
  getProfiles,
  getProfileById,
  getProfileByName,
  postProfile,
  putProfile,
  deleteProfile,
} from "../services/Profile.service";

const router = express.Router();

interface ProfileErrorFormat {
  code: number;
  message: string;
  errorMessage: unknown;
}

router.get("", async (req, res) => {
  try {
    const serviceLayerResponse = await getProfiles();

    res
      .status(serviceLayerResponse.code)
      .json({ result: serviceLayerResponse.result });
  } catch (error) {
    const ProfileError = error as ProfileErrorFormat;
    console.log(ProfileError.errorMessage);
    res.status(ProfileError.code).json(ProfileError.message);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await getProfileById(id);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const ProfileError = error as ProfileErrorFormat;
    console.log(ProfileError.errorMessage);
    res.status(ProfileError.code).json(ProfileError.message);
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const serviceLayerResponse = await getProfileByName(name);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
  } catch (error) {
    const ProfileError = error as ProfileErrorFormat;
    console.log(ProfileError.errorMessage);
    res.status(ProfileError.code).json(ProfileError.message);
  }
});

router.post("", async function (req, res) {
  try {
    const body = req.body;

    const serviceLayerResponse = await postProfile(body);
    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const ProfileError = error as ProfileErrorFormat;
    console.log(ProfileError.errorMessage);
    res.status(ProfileError.code).json(ProfileError.message);
  }
});

router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const serviceLayerResponse = await putProfile(id, body);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const ProfileError = error as ProfileErrorFormat;
    console.log(ProfileError.errorMessage);
    res.status(ProfileError.code).json(ProfileError.message);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const serviceLayerResponse = await deleteProfile(id);

    res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
  } catch (error) {
    const ProfileError = error as ProfileErrorFormat;
    console.log(ProfileError.errorMessage);
    res.status(ProfileError.code).json(ProfileError.message);
  }
});

export default router;
