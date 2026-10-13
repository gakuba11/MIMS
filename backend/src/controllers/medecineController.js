
const Medecine = require('../database/models/medecine');
const Category = require('../database/models/category');

exports.createMedecine = async (req, res) => {
    try {
        const {
            categoryId,
            tradeName,
            genericName,
            unitPrice
        } = req.body;

        if (!categoryId || !tradeName || !genericName || unitPrice == null) {
            return res.status(400).json({
                error: "All medicine fields are required"
            });
        }

        const medecine = await Medecine.create({
            categoryId,
            tradeName,
            genericName,
            unitPrice
        });

        return res.status(201).json({
            success: true,
            message: "Added successfully",
            id: medecine.id
        });

    } catch (err) {
        console.error("DB ERROR:", err);

        return res.status(500).json({
            error: "Database error"
        });
    }
};


exports.getMedecines = async (req, res) => {
    try {
        const medecines = await Medecine.findAll({
            attributes: [
                'id',
                'categoryId',
                'tradeName',
                'genericName',
                'unitPrice'
            ],
            include: [
                {
                    model: Category,
                    attributes: [['categoryName', 'categoryName']],
                    required: true
                }
            ],
            order: [['id', 'DESC']]
        });

        return res.status(200).json(
            medecines.map((medicine) => {
                const item = medicine.toJSON();

                return {
                    id: item.id,
                    categoryId: item.categoryId,
                    categoryName: item.Category.categoryName,
                    tradeName: item.tradeName,
                    genericName: item.genericName,
                    unitPrice: item.unitPrice
                };
            })
        );

    } catch (err) {
        console.error("DB ERROR:", err);

        return res.status(500).json({
            error: "Database error"
        });
    }
};


exports.updateMedecine = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            categoryId,
            tradeName,
            genericName,
            unitPrice
        } = req.body;

        const medecine = await Medecine.findByPk(id);

        if (!medecine) {
            return res.status(404).json({
                error: "Medicine not found"
            });
        }

        await medecine.update({
            categoryId,
            tradeName,
            genericName,
            unitPrice
        });

        return res.status(200).json({
            success: true,
            message: "Medicine updated",
            id: medecine.id
        });

    } catch (err) {
        console.error("DB ERROR:", err);

        return res.status(500).json({
            error: "Database error"
        });
    }
};


exports.deleteMedecine = async (req, res) => {
    try {
        const { id } = req.params;

        const medecine = await Medecine.findByPk(id);

        if (!medecine) {
            return res.status(404).json({
                error: "Medicine not found"
            });
        }

        await medecine.destroy();

        return res.status(200).json({
            success: true,
            message: "Medicine deleted"
        });

    } catch (err) {
        console.error("DB ERROR:", err);

        return res.status(500).json({
            error: "Database error"
        });
    }
};
