import express from "express";

import {
  createPermohonanUkt,
  deletePermohonanUkt,
  getPermohonanUkt,
  getPermohonanUktsByID,
  updatePermohonanUkt,
} from "../controllers/PermohonanUkt.js";

const router = express.Router();

router.get("/permohonan_ukts", getPermohonanUkt);
router.get("/permohonan_ukts/:id", getPermohonanUktsByID);
router.post("/permohonan_ukts", createPermohonanUkt);
router.patch("/permohonan_ukts/:id", updatePermohonanUkt);
router.delete("/permohonan_ukts/:id", deletePermohonanUkt);

export default router;
