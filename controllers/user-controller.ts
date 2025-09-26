import { Request, Response } from "express";
import { convexService } from "../services/convex-service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await convexService.query("userFunctions:getAllUsers", {});

    res.json({
      success: true,
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    await convexService.mutation("userFunctions:deleteUserById", { userId: id as any });

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    let errorMessage = "Failed to delete user";
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        errorMessage = "User not found";
        statusCode = 404;
      }
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};