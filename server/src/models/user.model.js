import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
        default: null
    }
}, { timestamps: true })

// Hash password before saving user data to database
userSchema.pre('save', async function () {
    try{
        if (!this.isModified('password')) {
            return ;
        }
        this.password = await bcrypt.hash(this.password, 10);
        
    }catch(err){
        console.log(err);
    }
})

// Method to compare provided password with hashed password in database
userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

const userModel = mongoose.model("users", userSchema);

export default userModel;