const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', function(this: any, next: any) {
    const user = this

    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.genSalt(10, (error: any, salt: any) => {
        if (error) {
            return next(error)
        }

        bcrypt.hash(user.password, salt, (error: any, hash: any) => {
            if (error) {
                return next(error)
            }

            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword: string) {
    const user = this

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (error: any, isMatch: boolean) => {
            if (error) {
                return reject(error)
            }

            if (!isMatch) {
                return reject(false)
            }

            resolve(true)
        })
    })
}

mongoose.model('User', userSchema)
