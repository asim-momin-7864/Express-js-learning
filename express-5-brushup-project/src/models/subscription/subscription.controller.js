//* Subscriptions controllers

// 3rd party modules
import { getLogger } from "pino-correlation-id";

// user defined controller
import mongoose from "mongoose";
import User from "../user/user.model.js";
import Subscription from "./subscription.model.js";

// getAllSubsController
export const getAllSubsController = async (req, res, next) => {
  try {
    // user id
    // console.log(req.user);

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
  const logger = getLogger();

  try {
    // data from request
    const userID = req.user.id;
    const { name, price, currency, billingCycle, category } = req.body;

    //TODO input valiaton by zod

    //TODO log - failed

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

    //log
    logger.info(
      {
        name: result.name,
        price: result.price,
        billingCycle: result.billingCycle,
        userId: result.user,
      },
      "New subscription registered successfully",
    );

    // res
    res.status(201).json({
      status: "success",
      data: {
        subscription: result,
      },
    });
  } catch (error) {
    // error.statusCode = 500;

    next(error);
  }
};

// update sunscription controller
export const updateSubController = async (req, res, next) => {
  try {
    // id from params
    const subId = req.params.id;
    const user = req.user;

    // updated data from body
    const { name, price, currency, billingCycle, category, isActive } =
      req.body;

    //TODO input verification by zod

    // new update object
    const newUpdatedData = {
      name,
      price,
      currency,
      billingCycle,
      category,
      isActive,
    };

    const updatedSub = await Subscription.findOneAndUpdate(
      { _id: subId, user: user._id },
      newUpdatedData,
      {
        new: true, // Returns the newly updated document (instead of the old one)
        runValidators: true, // Forces Mongoose to re-run your Schema enum/required checks!
      },
    );

    // verification
    if (!updatedSub) {
      let error = new Error(
        `Subscription not found or you do not have permission.`,
      );
      error.statusCode = 404;
      next(error);
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        subscription: updatedSub,
      },
    });

    // send to DB
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

// delete sub
export const deleteSubController = async (req, res, next) => {
  const logger = getLogger();

  try {
    // id form params
    const subId = req.params.id;
    // authenticated user data
    const user = req.user;

    // query send
    const result = await Subscription.findOneAndDelete({
      _id: subId,
      user: user._id,
    });

    // output verification
    if (result.deletedCount === 0) {
      const error = new Error(
        `Subscription is not found or you dont have permission`,
      );
      error.statusCode = 404;
      next(error);
      return;
    }

    //log
    logger.info({ subId, userId }, "Subscription permanently ddeleted by user");

    res.status(200).json({
      status: "success",
      data: {
        message: "Subsciption Deleted!",
      },
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
