import { Request, Response } from "express";
import { convexService } from "../services/convexService";
import { api } from "../convex/_generated/api";
import {
  CityResponse,
  CreateCityRequest,
  UpdateCityRequest,
} from "../types/city.types";

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    
    const result = await convex.query(api.cityFunctions.getAllCities, {
      limit: 50,
      offset: 0,
    });
    
    const cities = result.page;
    
    res.json({
      success: true,
      data: cities,
      message: "Cities retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
    const response: CityResponse = {
      success: false,
      message: "Failed to fetch cities",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const getCityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convex = convexService.getClient();

    const city = await convex.query(api.cityFunctions.getCityById, { id: id as any });
    if (!city) return res.status(404).json({ success: false, message: 'City not found' });
    res.json({ success: true, data: city, message: 'City retrieved successfully' });
  } catch (error) {
    console.error("Error fetching city:", error);
    const response: CityResponse = {
      success: false,
      message: "Failed to fetch city",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const createCity = async (req: Request, res: Response) => {
  try {
    const {  cityName, countryName }: CreateCityRequest = req.body;

    // Validation
    if (!cityName || !countryName) {
      const response: CityResponse = {
        success: false,
        message: " cityName, and countryName are required",
      };
      return res.status(400).json(response);
    }

    const convex = convexService.getClient();

    const cityId = await convex.mutation(api.cityFunctions.createCity, { cityName, countryName });
    res.status(201).json({ success: true, message: 'City created successfully', data: { _id: cityId, cityName, countryName } });
  } catch (error) {
    console.error("Error creating city:", error);
    const response: CityResponse = {
      success: false,
      message: "Failed to create city",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const updateCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: UpdateCityRequest = req.body;

    if (!updates.cityName && !updates.countryName) {
      const response: CityResponse = {
        success: false,
        message:
          "At least one field (cityName or countryName) is required for update",
      };
      return res.status(400).json(response);
    }

    const convex = convexService.getClient();

    await convex.mutation(api.cityFunctions.updateCity, { id: id as any, ...updates });
    res.json({ success: true, message: 'City updated successfully' });
  } catch (error) {
    console.error("Error updating city:", error);
    const response: CityResponse = {
      success: false,
      message: "Failed to update city",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convex = convexService.getClient();

    await convex.mutation(api.cityFunctions.deleteCity, { id: id as any });
    res.json({ success: true, message: 'City deleted successfully' });
  } catch (error) {
    console.error("Error deleting city:", error);
    const response: CityResponse = {
      success: false,
      message: "Failed to delete city",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

