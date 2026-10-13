
const Category = require('../database/models/category');

exports.createCategories = async (req, res) => {
    try {
        const { categoryName, storageInstruction, AverageTaxRate } = req.body;

        if (!categoryName || !storageInstruction) {
            return res.status(400).json({
                error: "Category name and storage instruction are required"
            });
        }

        const category = await Category.create({
            categoryName,
            storageInstruction,
            AverageTaxRate
        });

        return res.status(201).json({
            success: true,
            message: "Category created",
            id: category.id
        });

    } catch (err) {
        console.error("DB ERROR:", err);

        return res.status(500).json({
            error: "Database error"
        });
    }
};


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        return res.status(200).json(categories);

    } catch (err) {
        console.error("DB ERROR:", err);

        return res.status(500).json({
            error: "Database error"
        });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, storageInstruction, AverageTaxRate } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }

        await category.update({
            categoryName,
            storageInstruction,
            AverageTaxRate
        });

        return res.status(200).json({
            success: true,
            message: "Category updated",
            id: category.id
        });

    } catch (err) {
        console.error("DB ERROR:", err);

        return res.status(500).json({
            error: "Database error"
        });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }

        await category.destroy();

        return res.status(200).json({
            success: true,
            message: "Category deleted"
        });

    } catch (err) {
        console.error("DB ERROR:", err);

        return res.status(500).json({
            error: "Database error"
        });
    }
};
