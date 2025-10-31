const TicketType = class TicketType {
  constructor(app, TicketTypeModel) {
    this.app = app;
    this.TicketTypeModel = TicketTypeModel;
  }

  createTicketType() {
    this.app.post('/ticket-types', async (req, res) => {
      try {
        const ticketType = new this.TicketTypeModel(req.body);
        await ticketType.save();
        res.status(201).json(ticketType);
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAllTicketTypes() {
    this.app.get('/ticket-types', async (req, res) => {
      try {
        const ticketTypes = await this.TicketTypeModel.find();
        return res.status(200).json(ticketTypes);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findTicketTypeById() {
    this.app.get('/ticket-types/:id', async (req, res) => {
      try {
        const ticketType = await this.TicketTypeModel.findById(req.params.id);
        if (!ticketType) {
          return res.status(404).json({
            code: 404,
            message: 'Ticket type not found'
          });
        }
        return res.status(200).json(ticketType);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  updateTicketType() {
    this.app.put('/ticket-types/:id', async (req, res) => {
      try {
        const ticketType = await this.TicketTypeModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        if (!ticketType) {
          return res.status(404).json({
            code: 404,
            message: 'Ticket type not found'
          });
        }
        return res.status(200).json(ticketType);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  deleteTicketType() {
    this.app.delete('/ticket-types/:id', async (req, res) => {
      try {
        const ticketType = await this.TicketTypeModel.findByIdAndDelete(req.params.id);
        if (!ticketType) {
          return res.status(404).json({
            code: 404,
            message: 'Ticket type not found'
          });
        }
        return res.status(200).json({
          message: 'Ticket type deleted successfully'
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
    this.createTicketType();
    this.findAllTicketTypes();
    this.findTicketTypeById();
    this.updateTicketType();
    this.deleteTicketType();
  }
};

export default TicketType;
