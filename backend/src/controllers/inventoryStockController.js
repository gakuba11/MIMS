const InventoryStock = require('../database/models/inventoryStock');
const Medecine = require('../database/models/medecine');

exports.createInventoryStock = async (req, res) => {
  try {
    const { medecineId, quantityInHand, expiryDate } = req.body;

    if (!medecineId || quantityInHand === undefined || quantityInHand === null || !expiryDate) {
      return res.status(400).json({
        error: 'Medicine, quantity in hand, and expiry date are required',
      });
    }

    const medicine = await Medecine.findByPk(medecineId);

    if (!medicine) {
      return res.status(404).json({
        error: 'Medicine not found',
      });
    }

    if (Number(quantityInHand) < 0) {
      return res.status(400).json({
        error: 'Quantity in hand cannot be negative',
      });
    }

    const stock = await InventoryStock.create({
      medecineId,
      quantityInHand,
      expiryDate,
    });

    return res.status(201).json({
      success: true,
      message: 'Inventory stock created',
      stock,
    });
  } catch (err) {
    console.error('CREATE INVENTORY ERROR:', err);

    return res.status(500).json({
      error: 'Database error',
    });
  }
};

exports.getAllInventoryStock = async (req, res) => {
  try {
    const stocks = await InventoryStock.findAll({
      include: [
        {
          model: Medecine,
          as: 'medicine',
          attributes: ['id', 'tradeName', 'genericName', 'unitPrice'],
        },
      ],
      order: [['stockNumber', 'DESC']],
    });

    return res.status(200).json(stocks);
  } catch (err) {
    console.error('GET INVENTORY ERROR:', err);

    return res.status(500).json({
      error: 'Database error',
    });
  }
};

exports.updateInventoryStock = async (req, res) => {
  try {
    const { stockNumber } = req.params;
    const { medecineId, quantityInHand, expiryDate } = req.body;

    const stock = await InventoryStock.findByPk(stockNumber);

    if (!stock) {
      return res.status(404).json({
        error: 'Inventory stock not found',
      });
    }

    if (medecineId) {
      const medicine = await Medecine.findByPk(medecineId);

      if (!medicine) {
        return res.status(404).json({
          error: 'Medicine not found',
        });
      }
    }

    if (quantityInHand !== undefined && quantityInHand !== null && Number(quantityInHand) < 0) {
      return res.status(400).json({
        error: 'Quantity in hand cannot be negative',
      });
    }

    await stock.update({
      medecineId: medecineId ?? stock.medecineId,
      quantityInHand: quantityInHand ?? stock.quantityInHand,
      expiryDate: expiryDate ?? stock.expiryDate,
    });

    return res.status(200).json({
      success: true,
      message: 'Inventory stock updated',
      stock,
    });
  } catch (err) {
    console.error('UPDATE INVENTORY ERROR:', err);

    return res.status(500).json({
      error: 'Database error',
    });
  }
};

exports.deleteInventoryStock = async (req, res) => {
  try {
    const { stockNumber } = req.params;

    const stock = await InventoryStock.findByPk(stockNumber);

    if (!stock) {
      return res.status(404).json({
        error: 'Inventory stock not found',
      });
    }

    await stock.destroy();

    return res.status(200).json({
      success: true,
      message: 'Inventory stock deleted',
    });
  } catch (err) {
    console.error('DELETE INVENTORY ERROR:', err);

    return res.status(500).json({
      error: 'Database error',
    });
  }
};
