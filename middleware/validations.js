import { body, param } from "express-validator";



export const userValidationRules = () => {
    return [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("name").isLength({ min: 2 }).withMessage("Please enter a valid name"),
        body("avatar").isURL().withMessage("Please enter a valid URL")
    ]
}