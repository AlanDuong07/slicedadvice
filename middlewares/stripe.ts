import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorhandler";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../models/user";
import checkStripeField from "../utils/checkStripeField";


/* A middleware function that checks if the user has enabled Stripe charges. */
const isStripeOnboardedUser = catchAsyncErrors(
    async (req: any, res: any, next: any) => {
        let isOnboarded: boolean = await checkStripeField(req.user._id, "charges_enabled", next);

        if (isOnboarded) {
            next();
        }
    }
);

export { isStripeOnboardedUser };