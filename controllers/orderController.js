import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { tableNo, items } = req.body;

    if (!tableNo || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = await Order.create({
      tableNo,
      items,
      totalAmount,
    });

    // 🔔 later: socket.io emit here
    // io.emit("newOrder", order);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json({
    success: true,
    order,
  });
};
