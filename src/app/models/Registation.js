import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    email: { type: String },
    participantName: { type: String },
    ageCriteria: { type: String }, // e.g., "6-8 years", "9-12 years"
    participantAge: { type: Number },
    guardianNumber: { type: String },
    address: { type: String },
    talent: { type: String },
    charge: { type: String }, // Group charge based on age category
    termsAccepted: {
        videoSharing: { type: Boolean },
        offensiveContent: { type: Boolean },
        incidents: { type: Boolean }
    }
});

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

export default Registration;