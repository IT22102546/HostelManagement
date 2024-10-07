import Supplier from "../models/supplier.model.js";
import { errorHandler } from "../utils/error.js";

// Test route
export const testSupplier = (req, res) => {
    res.json({ msg: "Supplier works" });
};

// Create a new supplier
export const createSupplier = async (req, res, next) => {
    const { supplierName, supplierRegisterNo, dateOfRegistration, businessAddress, contactNumber, email, productCategories } = req.body;

    // Ensure required fields are provided
    if (!supplierName || !supplierRegisterNo || !dateOfRegistration || !businessAddress || !contactNumber || !email || !productCategories.length) {
        return next(errorHandler(400, 'Please provide all required fields: supplierName, supplierRegisterNo, dateOfRegistration, businessAddress, contactNumber, email, and productCategories.'));
    }

    // Create a new supplier instance
    const newSupplier = new Supplier({
        supplierName,
        supplierRegisterNo,
        dateOfRegistration,
        businessAddress,
        contactNumber,
        email,
        productCategories
    });

    try {
        const savedSupplier = await newSupplier.save();
        res.status(201).json(savedSupplier); // Successfully created supplier
    } catch (error) {
        next(error);  // Pass error to middleware
    }
};

// Get all suppliers
export const getAllSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);  // Return all suppliers
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a specific supplier by ID
export const getSupplier = async (req, res, next) => {
    try {
        const supplierId = req.params.id;
        const supplier = await Supplier.findById(supplierId);

        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.json(supplier);  // Return the supplier
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a supplier by ID
export const updateSupplier = async (req, res, next) => {
    const supplierId = req.params.id;
    const { supplierName, supplierRegisterNo, dateOfRegistration, businessAddress, contactNumber, email, productCategories } = req.body;

    const updatedFields = {
        supplierName,
        supplierRegisterNo,
        dateOfRegistration,
        businessAddress,
        contactNumber,
        email,
        productCategories
    };

    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            supplierId,
            updatedFields,
            { new: true }  // Return the updated document
        );

        if (!updatedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.status(200).json(updatedSupplier);  // Return the updated supplier
    } catch (error) {
        next(error);
    }
};

// Delete a supplier by ID
export const deleteSupplier = async (req, res, next) => {
    const supplierId = req.params.id;

    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);

        if (!deletedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.status(200).json('The supplier has been deleted');
    } catch (error) {
        next(error);
    }
};
