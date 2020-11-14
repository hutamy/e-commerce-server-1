const {Admin} = require('../models/index')
const {hashPassword, comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')

class AdminControllers {

    static register (req, res, next) {
        const payload = {
            email: req.body.email,
            password: hashPassword(req.body.password)
        }
        Admin.create(payload)
        .then(admin => {
            let data = {
                id: admin.id,
                email: admin.email
            }
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    
    static loginAdmin (req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        Admin.findOne({
            where: {
                email: payload.email
            }
        })
        .then(admin => {
            if(!admin){
                let err = {
                    name: 'WrongEmailPassword'
                }
                throw next(err)
            }
            else if(!comparePassword(payload.password, admin.password)){
                let err = {
                    name: 'WrongEmailPassword'
                }
                throw next(err)
            }
            else{
                let data = {
                    id: admin.id,
                    email: admin.email,
                    role: admin.role
                }
                let access_token = signToken(data)
                res.status(200).json({access_token})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = AdminControllers