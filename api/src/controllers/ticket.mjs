const Ticket = class Ticket {
  constructor(app, TicketModel) {
    this.app = app;
    this.TicketModel = TicketModel;
  }

  createTicket() {
    this.app.post('/tickets', async (req, res) => {
      try {
        const ticket = new this.TicketModel(req.body);
        await ticket.save();
        res.status(201).json(ticket);
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAllTickets() {
    this.app.get('/tickets', async (req, res) => {
      try {
        const tickets = await this.TicketModel.find();
        return res.status(200).json(tickets);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findTicketById() {
    this.app.get('/tickets/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findById(req.params.id);
        if (!ticket) {
          return res.status(404).json({
            code: 404,
            message: 'Ticket not found'
          });
        }
        return res.status(200).json(ticket);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  updateTicket() {
    this.app.put('/tickets/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        if (!ticket) {
          return res.status(404).json({
            code: 404,
            message: 'Ticket not found'
          });
        }
        return res.status(200).json(ticket);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  deleteTicket() {
    this.app.delete('/tickets/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findByIdAndDelete(req.params.id);
        if (!ticket) {
          return res.status(404).json({
            code: 404,
            message: 'Ticket not found'
          });
        }
        return res.status(200).json({
          message: 'Ticket deleted successfully'
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
    this.createTicket();
    this.findAllTickets();
    this.findTicketById();
    this.updateTicket();
    this.deleteTicket();
  }
};

export default Ticket;
