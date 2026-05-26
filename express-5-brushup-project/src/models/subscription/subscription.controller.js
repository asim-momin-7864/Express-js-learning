//* Subscriptions controllers

// user defined controller
import User from "../user/user.model.js";
import Subscription from "./subscription.model.js";

// getAllSubsController
export const getAllSubsController = async (req, res, next) => {
  try {
    // user id
    console.log(req.user);

    const userID = req.user.id;
    const result = await Subscription.find({ user: userID });

    if (!result) {
      const err = new Error("Something went wrong!");
      err.statusCode = 500;
      next(err);
      return;
    }

    // send
    res.status(200).json({
      status: "success",
      data: {
        subscriptions: result,
      },
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

// create new sub controller
export const newSubController = async (req, res, next) => {
  try {
    // data from request
    const userID = req.user.id;
    const { name, price, currency, billingCycle, category } = req.body;

    //TODO input valiaton by zod

    // next billing date function

    /*
    
*   To automatically update each months / yearly next billing date.
    - this does not happend automatically in express, express works on user actions
    -  So, for automatic tasks we use backgrounds works concept / technology
    
*/

    const currentDate = new Date();
    let nextBillingDate;
    if (billingCycle === "monthly") {
      nextBillingDate = new Date(currentDate);
      nextBillingDate.setMonth(currentDate.getMonth() + 1);
    } else if (billingCycle === "yearly") {
      nextBillingDate = new Date(currentDate);
      nextBillingDate.setFullYear(currentDate.getFullYear() + 1);
    }

    // new sub
    let newSub = {
      name,
      price,
      currency,
      billingCycle,
      category,
      isActive: true,
      nextBillingDate: nextBillingDate,
      user: userID,
    };

    // create
    const result = await Subscription.create(newSub);

    // res
    res.status(201).json({
      status: "success",
      data: {
        subscription: result,
      },
    });
  } catch (error) {
     error.statusCode = 500;
    next(error);
  }
};
