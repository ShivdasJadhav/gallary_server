const Item = require("../modal/Item");
const getAllItems = async (req, res, next) => {
  let Items;
  try {
    Items = await Item.find({status:"accepted"});
  } catch (err) {
    console.log(err);
  }
  if (!Items) {
    return res.status(400).json({ meassage: "No items Found" });
  } else {
    return res.status(200).json({ Items });
  }
};

const add_item = async (req, res, next) => {
  const { name, author, url_pic, description, user, status } = req.body;
  let item = new Item({
    name,
    author,
    url_pic,
    description,
    user,
    status,
  });
  await item.save();
  if (!item) {
    return res.status(500).json({ message: "Failed to Save Item" });
  } else {
    return res.status(201).json({ message: "Saved To Gallary!" });
  }
};

const getById = async (req, res, next) => {
  let id = req.params.id;
  let item;
  try {
    item = await Item.findOne({ _id: id });
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(401).json({ message: "Failed to Load" });
  } else {
    return res.status(200).json({ item });
  }
};
const getByStatus = async (req, res, next) => {
  let email = req.params.email;
  let type = req.params.type;
  let item;
  try {
    item = await Item.find({ user: email, status: type });
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(401).json({ message: "Failed to Load" });
  } else {
    return res.status(200).json({ item });
  }
};
const getAllByStatus = async (req, res, next) => {
  let type = req.params.type;
  let item;
  try {
    item = await Item.find({ status: type });
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(401).json({ message: "Failed to Load" });
  } else {
    return res.status(200).json({ item });
  }
};
const updateItem = async (req, res, next) => {
  let id = req.params.id;
  const { name, author, url_pic, description,status } = req.body;
  let item;
  try {
    item = await Item.findByIdAndUpdate(id, {
      name,
      author,
      url_pic,
      description,
      status,
    });
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(401).json({ meassage: "Failed to Update" });
  } else {
    return res.status(200).json({ message: "Gallary Updated!" });
  }
};
const acceptById = async (req, res, next) => {
  let id = req.params.id;
  let item;
  try {
    item = await Item.findByIdAndUpdate(id, {
      status:"accepted",
    });
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(401).json({ meassage: "Failed to Update" });
  } else {
    return res.status(200).json({ message: "Marked as Accepted!" });
  }
};
const rejectById = async (req, res, next) => {
  let id = req.params.id;
  let item;
  try {
    item = await Item.findByIdAndUpdate(id, {
      status:"rejected",
    });
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(401).json({ meassage: "Failed to Update" });
  } else {
    return res.status(200).json({ message: "Marked as Rejected!" });
  }
};
const deleteById = async (req, res, next) => {
  let id = req.params.id;
  let item;
  try {
    item = await Item.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(400).json({ message: "Failed to Delete" });
  } else {
    return res
      .status(200)
      .json({ message: "Item Deleted successfully!", item: item });
  }
};
exports.getAllItems = getAllItems;
exports.add_item = add_item;
exports.getById = getById;
exports.getByStatus = getByStatus;
exports.getAllByStatus = getAllByStatus;
exports.updateItem = updateItem;
exports.acceptById = acceptById;
exports.rejectById = rejectById;
exports.deleteById = deleteById;
