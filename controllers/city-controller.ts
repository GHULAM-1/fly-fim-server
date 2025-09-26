import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import {
  CityResponse,
  CreateCityRequest,
  UpdateCityRequest,
} from "../types/city.types";
import { transformCityCountryData } from "../utils/text-transform";

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const result = await convexService.query("cityFunctions:getAllCities", {
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
    const city = await convexService.query("cityFunctions:getCityById", { id: id as any });
    if (!city) return res.status(404).json({ success: false, message: 'City not found' });
    res.json({ success: true, data: city, message: 'City retrieved successfully' });
  } catch (error) {
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
    const { image, cityName, countryName }: CreateCityRequest = req.body;

    // Validation
    if (!cityName || !countryName || !image) {
      const response: CityResponse = {
        success: false,
        message: "cityName, countryName and image are required",
      };
      return res.status(400).json(response);
    }

    // Transform city and country names to proper case
    const transformedData = transformCityCountryData({
      city: cityName,
      country: countryName
    });

    const cityId = await convexService.mutation("cityFunctions:createCity", {
      image,
      cityName: transformedData.city!,
      countryName: transformedData.country!
    });
    res.status(201).json({
      success: true,
      message: 'City created successfully',
      data: {
        _id: cityId,
        image,
        cityName: transformedData.city!,
        countryName: transformedData.country!
      }
    });
  } catch (error) {
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

    if (!updates.image && !updates.cityName && !updates.countryName) {
      const response: CityResponse = {
        success: false,
        message:
          "At least one field (image, cityName, or countryName) is required for update",
      };
      return res.status(400).json(response);
    }

    // Transform city and country names if provided
    const transformedUpdates = { ...updates };
    if (updates.cityName) {
      transformedUpdates.cityName = transformCityCountryData({ city: updates.cityName }).city!;
    }
    if (updates.countryName) {
      transformedUpdates.countryName = transformCityCountryData({ country: updates.countryName }).country!;
    }

    await convexService.mutation("cityFunctions:updateCity", { id: id as any, ...transformedUpdates });
    res.json({ success: true, message: 'City updated successfully' });
  } catch (error) {
    let errorMessage = "Failed to update city";
    let statusCode = 500;

    if (error instanceof Error) {
      // Handle duplicate city error
      if (error.message.includes("already exists")) {
        errorMessage = error.message;
        statusCode = 409; // Conflict
      } else if (error.message.includes("not found")) {
        errorMessage = "City not found";
        statusCode = 404;
      } else {
        // For other errors, use a generic message
        errorMessage = "Failed to update city";
      }
    }

    const response: CityResponse = {
      success: false,
      message: errorMessage,
    };
    res.status(statusCode).json(response);
  }
};

export const getCitiesByCityName = async (req: Request, res: Response) => {
  try {
    const { cityName } = req.params;
    if (!cityName) {
      const response: CityResponse = {
        success: false,
        message: "cityName parameter is required",
      };
      return res.status(400).json(response);
    }

    const cities = await convexService.query("cityFunctions:getCitiesByCityName", { 
      cityName: cityName.trim() 
    });
    
    const response: CityResponse = {
      success: true,
      data: cities,
      message: `Found ${cities.length} cities matching "${cityName}"`,
    };
    
    res.json(response);
  } catch (error) {
    const response: CityResponse = {
      success: false,
      message: "Failed to fetch cities by name",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await convexService.mutation("cityFunctions:deleteCity", { id: id as any });
    res.json({ success: true, message: 'City deleted successfully' });
  } catch (error) {
    const response: CityResponse = {
      success: false,
      message: "Failed to delete city",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

