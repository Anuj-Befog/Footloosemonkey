import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    id: { type: String }, 
    name: { type: Number },
    age: { type: String },
    talent: { type: String },
    profilepic: { type: String },
    video: { type: String }, 
    title: { type: String },
    description: { type: String },
    paymentId: { type: String }, 
    status: { type: String }, 
});

// Avoid recompiling the model if it already exists
const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

export default Submission;