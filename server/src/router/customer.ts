import { Router } from "express";
import {
  create,
  getWallet,
  loadWallet,
  makePayment,
  validatePayment,
} from "../controllers/customer";

const router = Router();

router.post("/create", create);
router.post("/load-wallet", loadWallet);
router.post("/make-payment", makePayment);
router.post("/validate-payment", validatePayment);
router.get("/wallet/:document", getWallet);

export default router;
