const mongoose = require('mongoose');
const rolesEnum = ['user', 'admin', 'staff'];

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    reenterpassword: String,
    number: String,
    role: {
        type: String,
        enum: rolesEnum,
        default: 'user' // Default role is 'user'
    },
    otp: String, // Add a field to store OTP
    image: {
        data: Buffer, // Store image data as Buffer
        contentType: String // Store content type of the image
    }
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = EmployeeModel;
