import mongoose from "mongoose";

const createAgencyDifferenceModel = (agencyId) => {
    const agencyDifferenceSchema = new mongoose.Schema({
        date: { type: Date, required: true,unique: true },
        newSupply: { type: Number, required: true },
        page: { type: Number, required: true },
        weight: { type: mongoose.Schema.Types.Decimal128, required: true },
        totalWeight: { type: mongoose.Schema.Types.Decimal128, required: true },
        rate: { type: mongoose.Schema.Types.Decimal128, required: true },
        value: { type: mongoose.Schema.Types.Decimal128, required: true },
        amount: { type: mongoose.Schema.Types.Decimal128, required: true },
        difference: { type: mongoose.Schema.Types.Decimal128, required: true },
    });

    return (
        mongoose.models[`AgencyDifference_${agencyId}`] ||
        mongoose.model(
            `AgencyDifference_${agencyId}`,
            agencyDifferenceSchema,
            `agencydifference_${agencyId}`,
        )
    );
};

export default createAgencyDifferenceModel;
