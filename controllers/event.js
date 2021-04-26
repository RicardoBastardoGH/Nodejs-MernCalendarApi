const { response } = require("express")
const Event = require('../models/Event');

const getEvents = async (req, res=response) => {

    const events = await Event.find()
                                .populate('user','name');

    return res.status(200).json({
        ok: true,
        events
    })
}

const createEvent = async (req, res=response) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Please, Comunicate with the Admintrator'
        })
    }

}

const updateEvent = async (req, res=response) => {
    
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId)

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that specific id'
            })
        }

        // verificar que el usuario que quiere modificar el evento es el creador
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'User doesnt have the privileges to modify this event'
            })
        } 

        const newEvent = {
            ...req.body,
            user: uid
        };
        
        // retorna por defecto el obejto viejo, se le coloca new: true para que devuelva el actualizado
        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, {new: true} );

        return res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Please, Comunicate with the Admintrator'
        })        
    }

}

const deleteEvent = async (req, res=response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId)

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that specific id'
            })
        }

        // verificar que el usuario que quiere modificar el evento es el creador
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'User doesnt have the privileges to delete this event'
            })
        } 
        
        // retorna el objeto eliminado
        const deletedEvent = await Event.findByIdAndDelete( eventId);

        return res.status(200).json({
            ok: true,
            resp: deletedEvent 
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Please, Comunicate with the Admintrator'
        })        
    }

}



module.exports= {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}