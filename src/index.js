
(async () => {

    const TicketType = require("./model/ticket-type");


    const ticketType = new TicketType(`Hello World`); 
    const result = await ticketType.save();

    console.log(result.rowCount);
})();

