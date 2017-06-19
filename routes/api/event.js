const eventRouter = require('express').Router;
const Event = require('../../db/models').models.Event;
const authutils = require('../../auth/authutils');
const EventInvitee = require('../../db/models').models.EventInvitee;
const Invitee = require('../../db/models').models.Invitee;


eventRoute = eventRouter();

eventRoute.get('/', (req, res) => {
    console.log(req.user);
     Event.findAll({
         attributes: ['id', 'name', 'startTime', 'endTime', 'venue', 'userId'],
     }).then((events) => {
             res.status(200).send(events)
     }).catch((err) => {
             console.log(err)
             res.status(500).send("Error retrieving events")
     })
});


eventRoute.post('/new', (req,res)=>{
	//res.send('Add an event here');
	if(!req.body.name){
		res.status(403).send('Can not have an event without name !'+ (req.body.venue));
	}

	 Event.create({
        name: req.body.name,
        venue: req.body.venue,
        imgUrl: req.body.imgUrl,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        message: req.body.message,
		userId: 1 /*req.user.id*/

	})
	.then((event) => 
	{	console.log(event);
		if (req.body.invitees) {
            let invitees = req.body.invitees.split(';');
            invitees = invitees.map((i) => {
                return {email: i.trim()}
            });
            Invitee.bulkCreate(invitees, {
                ignoreDuplicates: true
            })
                .then((invitees) => {
                    let eventInvitee = invitees.map((i) => {
                        return {
                            eventId: event.id,
                            inviteeId: i.id
                        }
                    });

                    EventInvitee.bulkCreate(eventInvitee, {
                        ignoreDuplicates: true
                    })
                        .then((eiArr) => {
                            res.status(200).send(event)
                            
                            

                        })
                })
        } else {
            res.status(200).send(event)
		}
	})
	.catch((err) => 
	{
        res.status(500).send("There was an error creating event")

	})
});

eventRoute.get('/:id', (req,res)=>{
	res.send('Get detail of your event here');
});

eventRoute.get('/:id/invitees' , (req,res)=>{
    EventInvitee.findAll({
        attributes: ['id'] ,
        where: {
            eventId: req.params.id,
            '$event.userId$': 1 /*req.user.id*/
        } ,
        include: [{
            model: Invitee,
            as: 'invitee',
            attributes: ['id' , 'email']
        } , {
            model: Event,
            as: 'event',
            attributes: ['id', 'userId']
        }]
    }).then((invitees)=>{
        
        if(invitees) {
            res.status(200).send(invitees)
        } else {
            res.status(500).send("No invitees for this event");
        }
    })
});

eventRoute.put('/:id', (req,res)=>{
	//res.send("Modify events here");
	Event.update({
            name: req.body.name,
            message: req.body.message,
            startTime: req.body.startTime ? new Date(req.body.startTime) : undefined,
            endTime: req.body.endTime ? new Date(req.body.endTime) : undefined,
            imgUrl: req.body.imgUrl,
            venue: req.body.venue,
        },
        {
            where: {
                id: req.params.id,
                userId: 1 /*req.user.id*/
            }
        }).then((updatedEvent) => {
            if (updatedEvent[0] == 0) {
                return res.status(403).send('Event does not exist, or you cannot edit it')
            } else {
                res.status(200).send('Event successfully edited')
            }

    })
});

eventRoute.delete('/:id', /*authutils.eia(),*/ (req, res) => {
    Event.destroy(
        {
            where: {
                id: req.params.id,
                userId: 1 /*req.userIsAdmin ?*/ /*req.user.id*/ //: undefined
            }
        }).then((destroyedRows) => {
        if (destroyedRows == 0) {
            return res.status(403).send('Event does not exist, or you cannot edit it')
        } else {
            res.status(200).send('Event successfully deleted')
        }

    })
});

eventRoute.put('/:id/invitees', (req, res) => {
    let invitees = req.body.invitees.split(';');
    invitees = invitees.map((i) => {
        return {email: i.trim()}
        /*
	        returning an object with email key as the bulkCreate statement 
	        needs to be executed with Invitee.bulkCreate({email: inviteeEmail})
	        just like create({}) syntax
		*/
    });

    Invitee.bulkCreate(invitees, {
        ignoreDuplicates: true
    })
        .then((invitees) => {
            let eventInvitee = invitees.map((i) => {
                return {
                    eventId: req.params.id,
                    inviteeId: i.id
                }
            });

            EventInvitee.bulkCreate(eventInvitee, {
                ignoreDuplicates: true
            })
                .then((eiArr) => {
                    res.status(200).send({
                        newInvitees: eiArr
                    })
                })
        })
});

eventRoute.delete('/:id/invitees/:invId', (req, res) => {
    EventInvitee.destroy({
        where: {
            eventId: req.params.id,
            inviteeId: req.params.invId
        }
    }).then((result) => {
        if (result == 0) {
            return res.status(500).send({error: 'Invitee or Event did not exist'})
        } else {
            return res.status(200).send({success: true})
        }
    })
});

module.exports = eventRoute;