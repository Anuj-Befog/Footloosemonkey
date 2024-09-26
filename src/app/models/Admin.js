import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    talent: String,
    amount: String,
    
},
    { timestamps: true }
)

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

export default Admin;