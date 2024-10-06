import Ticket from "../models/ticket.model.js";
import { errorHandler } from "../utils/error.js";

// Test route
export const testTicket = (req, res) => {
    res.json({ msg: "Ticket works" });
};

// Create a new ticket
export const createTicket = async (req, res, next) => {
    const { studentId, studentName, email, issueType, title, description } = req.body;

    // Ensure required fields are provided
    if (!studentId || !studentName || !email || !issueType || !title || !description) {
        return next(errorHandler(400, 'Please provide all required fields: studentId, studentName, email, issueType, title, and description'));
    }

    // Create a new ticket instance
    const newTicket = new Ticket({
        studentId,
        studentName,
        email,
        issueType,
        title,
        description
    });

    try {
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket); // Successfully created ticket
    } catch (error) {
        next(error);  // Pass error to middleware
    }
};

// Get all tickets
export const getAllTicket = async (req, res, next) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);  // Return all tickets
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a specific ticket by ID
export const getTicket = async (req, res, next) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json(ticket);  // Return the ticket
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a ticket by ID
export const updateTicket = async (req, res, next) => {
    const ticketId = req.params.id;
    const { studentId, studentName, email, issueType, title, description, status } = req.body;

    const updatedFields = {
        studentId,
        studentName,
        email,
        issueType,
        title,
        description,
        status
    };

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            updatedFields,
            { new: true }  // Return the updated document
        );

        if (!updatedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.status(200).json(updatedTicket);  // Return the updated ticket
    } catch (error) {
        next(error);
    }
};

// Delete a ticket by ID
export const deleteTicket = async (req, res, next) => {
    const ticketId = req.params.id;

    try {
        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

        if (!deletedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.status(200).json('The ticket has been deleted');
    } catch (error) {
        next(error);
    }
};
