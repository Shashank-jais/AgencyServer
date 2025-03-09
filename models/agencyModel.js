import mongoose from "mongoose";

const createAgencyModel = (agencyId) => {
  const agencySchema = new mongoose.Schema({
    date: { type: Date, required: true,unique: true},
    supply: { type: Number, required: true },
    return: { type: Number, required: true },
    cutrate: { type: Number, required: true },
    bhariye: { type: mongoose.Schema.Types.Decimal128, required: true },
  });

  return (
    mongoose.models[`Agency_${agencyId}`] ||
    mongoose.model(`Agency_${agencyId}`, agencySchema, `agency_${agencyId}`)
  );
};

export default createAgencyModel;
