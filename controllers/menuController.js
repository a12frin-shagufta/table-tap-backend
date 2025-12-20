import MenuItem from "../models/MenuItem.js";
import cloudinary from "../config/cloudinary.js";

/* ======================
   ADD MENU ITEM
====================== */
export const addMenuItem = async (req, res) => {
  try {
    const { name, category, variants } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // ⬆️ upload to cloudinary
    const base64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "menu",
    });

    const menuItem = await MenuItem.create({
      name: name.trim(),
      category: category.trim().toLowerCase(),
      image: uploadResult.secure_url, // ✅ CLOUDINARY URL
      variants: JSON.parse(variants),
    });

    res.json({ success: true, menuItem });
  } catch (err) {
    console.error("ADD MENU ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


/* ======================
   GET MENU
====================== */
export const getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find({ isAvailable: true });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================
   UPDATE MENU ITEM
====================== */
export const updateMenuItem = async (req, res) => {
  try {
    console.log("🔵 UPDATE MENU HIT");
    console.log("🆔 ID:", req.params.id);
    console.log("📦 BODY:", req.body);
    console.log("🖼️ FILE:", req.file);

    const { name, category, variants } = req.body;

    if (!name || !category || !variants) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "Missing fields" });
    }

    const update = {
      name: name.trim(),
      category: category.trim().toLowerCase(),
      variants: JSON.parse(variants),
    };

 if (req.file) {
  const base64 = req.file.buffer.toString("base64");
  const dataUri = `data:${req.file.mimetype};base64,${base64}`;

  const uploadResult = await cloudinary.uploader.upload(dataUri, {
    folder: "menu",
  });

  update.image = uploadResult.secure_url;
}


    console.log("🛠️ UPDATE OBJECT:", update);

    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    console.log("✅ UPDATED ITEM:", item);

    res.json({ success: true, item });
  } catch (err) {
    console.error("🔥 UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ======================
   DELETE MENU ITEM
====================== */
export const deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
