const Sale = require('../database/models/sale');
const InventoryStock = require('../database/models/inventoryStock');
const Medecine = require('../database/models/medecine');

exports.createSale = async (req, res) => {
  try {
    const { medecineId, quantitySold, totalAmount, stock_id } = req.body;

    if (!medecineId || !stock_id || quantitySold === undefined || quantitySold === null || totalAmount === undefined || totalAmount === null) {
      return res.status(400).json({
        error: 'Medicine, quantity sold, total amount, and stock reference are required',
      });
    }

    if (Number(quantitySold) <= 0) {
      return res.status(400).json({
        error: 'Quantity sold must be greater than zero',
      });
    }

    const medicine = await Medecine.findByPk(medecineId);

    if (!medicine) {
      return res.status(404).json({
        error: 'Medicine not found',
      });
    }

    const stock = await InventoryStock.findByPk(stock_id);

    if (!stock) {
      return res.status(404).json({
        error: 'Inventory stock not found',
      });
    }

    if (stock.medecineId !== Number(medecineId)) {
      return res.status(400).json({
        error: 'Selected stock does not belong to this medicine',
      });
    }

    if (Number(quantitySold) > stock.quantityInHand) {
      return res.status(400).json({
        error: 'Not enough quantity in stock to complete the sale',
      });
    }

    const remainingStock = stock.quantityInHand - Number(quantitySold);

    const sale = await Sale.create({
      medecineId,
      quantitySold,
      totalAmount,
      stock_id,
      remaining_stock: remainingStock,
    });

    await stock.update({
      quantityInHand: remainingStock,
    });

    return res.status(201).json({
      success: true,
      message: 'Sale recorded successfully',
      sale,
    });
  } catch (err) {
    console.error('CREATE SALE ERROR:', err);

    return res.status(500).json({
      error: 'Database error',
    });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Medecine,
          as: 'medicine',
          attributes: ['id', 'tradeName', 'genericName', 'unitPrice'],
        },
        {
          model: InventoryStock,
          as: 'inventoryStock',
          attributes: ['stockNumber', 'quantityInHand', 'expiryDate'],
        },
      ],
      order: [['salesNumber', 'DESC']],
    });

    return res.status(200).json(sales);
  } catch (err) {
    console.error('GET SALES ERROR:', err);

    return res.status(500).json({
      error: 'Database error',
    });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const { salesNumber } = req.params;
    const { medecineId, quantitySold, totalAmount, stock_id } = req.body;

    const sale = await Sale.findByPk(salesNumber);

    if (!sale) {
      return res.status(404).json({
        error: 'Sale not found',
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

    if (stock_id) {
      const stock = await InventoryStock.findByPk(stock_id);

      if (!stock) {
        return res.status(404).json({
          error: 'Inventory stock not found',
        });
      }
    }

    const nextQuantity = quantitySold !== undefined && quantitySold !== null ? Number(quantitySold) : sale.quantitySold;

    if (nextQuantity <= 0) {
      return res.status(400).json({
        error: 'Quantity sold must be greater than zero',
      });
    }

    await sale.update({
      medecineId: medecineId ?? sale.medecineId,
      quantitySold: nextQuantity,
      totalAmount: totalAmount ?? sale.totalAmount,
      stock_id: stock_id ?? sale.stock_id,
    });

    return res.status(200).json({
      success: true,
      message: 'Sale updated',
      sale,
    });
  } catch (err) {
    console.error('UPDATE SALE ERROR:', err);

    return res.status(500).json({
      error: 'Database error',
    });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const { salesNumber } = req.params;

    const sale = await Sale.findByPk(salesNumber);

    if (!sale) {
      return res.status(404).json({
        error: 'Sale not found',
      });
    }

    const stock = await InventoryStock.findByPk(sale.stock_id);

    if (stock) {
      await stock.update({
        quantityInHand: stock.quantityInHand + sale.quantitySold,
      });
    }

    await sale.destroy();

    return res.status(200).json({
      success: true,
      message: 'Sale deleted',
    });
  } catch (err) {
    console.error('DELETE SALE ERROR:', err);

    return res.status(500).json({
      error: 'Database error',
    });
  }
};
