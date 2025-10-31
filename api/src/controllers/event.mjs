const Event = class Event {
  constructor(app, EventModel) {
    this.app = app;
    this.EventModel = EventModel;
  }

  createEvent() {
    this.app.post('/events', async (req, res) => {
      try {
        const event = new this.EventModel(req.body);
        await event.save();
        res.status(201).json(event);
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAllEvents() {
    this.app.get('/events', async (req, res) => {
      try {
        const events = await this.EventModel.find();
        return res.status(200).json(events);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findEventById() {
    this.app.get('/events/:id', async (req, res) => {
      try {
        const event = await this.EventModel.findById(req.params.id);
        if (!event) {
          return res.status(404).json({
            code: 404,
            message: 'Event not found'
          });
        }
        return res.status(200).json(event);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  updateEvent() {
    this.app.put('/events/:id', async (req, res) => {
      try {
        const event = await this.EventModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        if (!event) {
          return res.status(404).json({
            code: 404,
            message: 'Event not found'
          });
        }
        return res.status(200).json(event);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  deleteEvent() {
    this.app.delete('/events/:id', async (req, res) => {
      try {
        const event = await this.EventModel.findByIdAndDelete(req.params.id);
        if (!event) {
          return res.status(404).json({
            code: 404,
            message: 'Event not found'
          });
        }
        return res.status(200).json({
          message: 'Event deleted successfully'
        });
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  run() {
    this.createEvent();
    this.findAllEvents();
    this.findEventById();
    this.updateEvent();
    this.deleteEvent();
  }
};

export default Event;
