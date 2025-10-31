import mongoose from 'mongoose';

import AlbumSchema from '../models/album.mjs';
import DiscussionSchema from '../models/discussion.mjs';
import EventSchema from '../models/event.mjs';
import GroupSchema from '../models/group.mjs';
import PhotoSchema from '../models/photo.mjs';
import PollSchema from '../models/poll.mjs';
import TicketSchema from '../models/ticket.mjs';
import TicketTypeSchema from '../models/ticketType.mjs';
import UserSchema from '../models/user.mjs';

import Album from './album.mjs';
import Discussion from './discussion.mjs';
import Event from './event.mjs';
import Group from './group.mjs';
import Photo from './photo.mjs';
import Poll from './poll.mjs';
import Ticket from './ticket.mjs';
import TicketType from './ticketType.mjs';
import User from './user.mjs';

const Routes = class Routes {
  constructor(app, connect) {
    this.app = app;
    this.UserModel = connect.model('User', UserSchema);
    this.EventModel = connect.model('Event', EventSchema);
    this.GroupModel = connect.model('Group', GroupSchema);
    this.DiscussionModel = connect.model('Discussion', DiscussionSchema);
    this.PhotoModel = connect.model('Photo', PhotoSchema);
    this.AlbumModel = connect.model('Album', AlbumSchema);
    this.PollModel = connect.model('Poll', PollSchema);
  }

  run() {
    const user = new User(this.app, this.UserModel);
    user.run();

    const event = new Event(this.app, this.EventModel);
    event.run();

    const group = new Group(this.app, this.GroupModel);
    group.run();

    const discussion = new Discussion(this.app, this.DiscussionModel);
    discussion.run();

    const photo = new Photo(this.app, this.PhotoModel);
    photo.run();

    const album = new Album(this.app, this.AlbumModel);
    album.run();

    const poll = new Poll(this.app, this.PollModel);
    poll.run();

    const ticketTypeController = new TicketType(this.app, mongoose.model('TicketType', TicketTypeSchema));
    ticketTypeController.run();

    const ticketController = new Ticket(this.app, mongoose.model('Ticket', TicketSchema));
    ticketController.run();
  }
};

export default Routes;
