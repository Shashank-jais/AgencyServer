import mongoose from "mongoose";
import createAgencyModel from "../models/agencyModel.js";
import createAgencyDifferenceModel from "../models/agencyDiffModel.js";

export async function addRecord(request, response) {
  try {
    const { agencyId, agencyData, agencyDifferenceData } = request.body;

    const weight = agencyDifferenceData.page * 0.4;
    const totalWeight = (weight * agencyDifferenceData.newSupply) / 100;
    const value = agencyDifferenceData.newSupply * 4.7;
    const amount = totalWeight * agencyDifferenceData.rate;
    const difference = value - amount;

    const updatedAgencyDifferenceData = {
      ...agencyDifferenceData,
      weight: weight,
      totalWeight: totalWeight,
      value: value,
      amount: amount,
      difference: difference,
    };

    const AgencyModel = createAgencyModel(agencyId);

    const existingAgency = await AgencyModel.findOne({ date: agencyData.date });
    if (existingAgency) {
      return response.status(400).json({
        error: "Record already exists for this date in the Agency collection",
        success: false,
      });
    }

    await AgencyModel.create(agencyData);

    const AgencyDifferenceModel = createAgencyDifferenceModel(agencyId);

    const existingAgencyDifference = await AgencyDifferenceModel.findOne({
      date: agencyDifferenceData.date,
    });
    if (existingAgencyDifference) {
      return response.status(400).json({
        error:
          "Record already exists for this date in the Agency Difference collection",
        success: false,
      });
    }

    await AgencyDifferenceModel.create(updatedAgencyDifferenceData);

    response.status(201).json({
      message:
        "Data inserted successfully into Agency and Agency Difference databases",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
}

export async function getAgencyTotal(request, response) {
  try {
    const db_collection = await mongoose.connection.db
      .listCollections()
      .toArray();

    // Filter agency and agencydifference collections
    const agencyCollections = db_collection
      .filter((col) => col.name.startsWith("agency_"))
      .map((col) => col.name);

    const agencyDifferenceCollections = db_collection
      .filter((col) => col.name.startsWith("agencydifference_"))
      .map((col) => col.name);

    const agencyTotals = [];

    for (const collection of agencyCollections) {
      const agencyData = await mongoose.connection.db
        .collection(collection)
        .find()
        .toArray();

      // Calculate totals for agency data
      const totalSupply = agencyData.reduce(
        (sum, record) => sum + (record.supply || 0),
        0,
      );
      const totalReturn = agencyData.reduce(
        (sum, record) => sum + (record.return || 0),
        0,
      );
      const totalCutrate = agencyData.reduce(
        (sum, record) => sum + (record.cutrate || 0),
        0,
      );
      const totalBhariye = agencyData.reduce(
        (sum, record) => sum + parseFloat(record.bhariye || 0),
        0,
      );
      const formattedbhariye = parseFloat(totalBhariye.toFixed(2));

      // Find the corresponding agencydifference collection
      const agencyDifferenceCollection = collection.replace(
        "agency_",
        "agencydifference_",
      );
      const agencyDifferenceData = await mongoose.connection.db
        .collection(agencyDifferenceCollection)
        .find()
        .toArray();

      // Calculate total difference for agencydifference data
      const totalDifference = agencyDifferenceData.reduce(
        (sum, record) => sum + parseFloat(record.difference || 0), // Ensure difference is treated as a number
        0,
      );

      // Format totalDifference to a fixed number of decimal places (e.g., 2)
      const formattedTotalDifference = parseFloat(totalDifference.toFixed(2));

      // Add the totals for this agency to the array
      agencyTotals.push({
        agencyId: collection.replace("agency_", ""), // Extract agency ID
        totalSupply,
        totalReturn,
        totalCutrate,
        totalBhariye: formattedbhariye,
        totalDifference: formattedTotalDifference,
      });
    }

    // Return the totals for all agencies
    return response.status(200).json({
      message: "Agency Totals Calculated Successfully",
      agencyTotals,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
}


export async function getAgencyRecordByAgencyId(request, response) {
  try {
    const { agencyId } = request.body;

    // Check if the collections exist for the given agencyId
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    const agencyCollectionExists = collections.some(
      (col) => col.name === `agency_${agencyId}`,
    );
    const agencyDifferenceCollectionExists = collections.some(
      (col) => col.name === `agencydifference_${agencyId}`,
    );

    // If either collection does not exist, return an error
    if (!agencyCollectionExists || !agencyDifferenceCollectionExists) {
      return response.status(404).json({
        error: `Collections for agencyId ${agencyId} do not exist`,
        success: false,
      });
    }

    const AgencyModel = createAgencyModel(agencyId);
    const agencyData = await AgencyModel.find().exec();

    const AgencyDifferenceModel = createAgencyDifferenceModel(agencyId);
    const agencyDifferenceData = await AgencyDifferenceModel.find().exec();

    const formattedAgencyData = agencyData.map((record) => ({
      ...record.toObject(),
      bhariye: parseFloat(record.bhariye.toString()), 
    }));

    const formattedAgencyDifferenceData = agencyDifferenceData.map((record) => ({
      ...record.toObject(),
      weight: parseFloat(record.weight.toString()), 
      totalWeight: parseFloat(record.totalWeight.toString()), 
      rate: parseFloat(record.rate.toString()), 
      value: parseFloat(record.value.toString()), 
      amount: parseFloat(record.amount.toString()), 
      difference: parseFloat(record.difference.toString()), 
    }));

    
    return response.status(200).json({
      message: `Records fetched successfully for agencyId ${agencyId}`,
      agencyData: formattedAgencyData,
      agencyDifferenceData: formattedAgencyDifferenceData,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error(`Error in fetching record for the agencyId ${agencyId}: `, error);
    response.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
}
