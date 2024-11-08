import mongoose from "mongoose";

const AdminLoginSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
    },
    { timestamps: true }
);

const AdminLogin = mongoose.models.AdminLogin || mongoose.model('AdminLogin', AdminLoginSchema);

export default AdminLogin;