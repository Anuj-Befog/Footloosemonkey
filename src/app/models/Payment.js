import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    email: { type: String },
    participantName: { type: String },
    ageCriteria: { type: String }, // e.g., "6-8 years", "9-12 years"
    participantAge: { type: Number },
    guardianNumber: { type: String },
    address: { type: String },
    talent: { type: String },
    charge: { type: String }, // Group charge based on age category
    paymentId: { type: String }, // Group charge based on age category
    status: { type: String }, // Group charge based on age category
});

// Avoid recompiling the model if it already exists
const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

export default Payment;