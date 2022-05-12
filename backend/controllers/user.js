var createError = require('http-errors');
const errorCode = require("./../common/ErrorCodes");
const reservationModel = require('../model/reservationSchema');

module.exports = {
    saveReservation: async (req, res, next) => {
        try {
            const reservation = new reservationModel(req.body);
            reservation.save();
            res.status(201).json("Success")
        }catch(e) {
            console.log("error", e);
            next(createError(errorCode.paramsError, e))
        }
    },
    getReservation: async (req, res, next) => {
        try {
            const data = await reservationModel.find().skip(0).limit( 10 )
            .sort( '-_id' );
            res.status(201).json({data})
        }catch(e) {
            console.log("error", e);
            next(createError(errorCode.paramsError, e))
        }
    }
}