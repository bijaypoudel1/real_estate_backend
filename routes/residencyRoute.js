import express from "express";
import { createResidency, getAllResidencies, getResidency, myResidencies } from "../controllers/resdCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Property:
 *          type: object
 *      properties:
 *          id:
 *              type: string
 *              description: property id
 *          title:
 *              type: string
 *              description: property title
 *          description:
 *              type: string
 *              description: property description
 *          price:
 *              type: number
 *              description: property price
 *          address:
 *              type: string
 *              description: property address
 *          city:
 *              type: string
 *              description: property city
 *          country:
 *              type: string
 *              description: property country
 *          image:
 *              type: string
 *              description: property image
 *          userEmail:
 *              type: string
 *              description: property owner
 *      example:
 *          id: ad5Gedf_oIje88
 *          title: New Property
 *          description: This new property is best
 *          price: 4000
 *          address: Chitwan
 *          city: Bharatpur
 *          country: Nepal
 *          image: imageurl
 *          userEmail: exampl@gmail.con
 *
 *
 */

router.post("/create", jwtCheck, createResidency);

/**
 * @swagger
 * /api/residency/allresd:
 *  get:
 *      summary: Return all the residency
 *      tags: [Property]
 *      responses:
 *          200:
 *              description: The list of property
 *              content:
 *                  applicaiton/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Property'
 *
 *
 */
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);
router.get("/my-property", myResidencies);
export { router as residencyRoute };
