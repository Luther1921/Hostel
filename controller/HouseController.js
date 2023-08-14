const asyncHandler = require("express-async-handler");
const House = require("../model/House");

// getting all house occupants
const getHouse = asyncHandler(async (req, res) => {
  const house = await House.find({ user_id: req.user.id });
  return res
    .status(200)
    .json({ data: house, message: "gotten all succeessfully" });
});

// adding new house occupant

const addHouse = asyncHandler(async (req, res) => {
  try {
    const { name, roomNumber, occupation } = req.body;
    // validation for name
    if (!name) return res.status(400).json({ error: "name is required" });
    if (name.length === 0)
      return res.status(400).json({ error: "name cannot be empty" });
    if (name.length < 4)
      return res.status(400).json({ error: "name is too short" });

    if (name.length > 30)
      return res.status(400).json({ error: "name is too long" });

    // validation for room number
    if (!roomNumber)
      return res.status(400).json({ error: "room number is required" });
    if (roomNumber.length === 0)
      return res.status(400).json({ error: "room number cannot be empty" });
    if (roomNumber.length < 1)
      return res.status(400).json({ error: "room number is too short" });
    if (roomNumber.length > 20)
      return res.status(400).json({ error: "room number is too long" });

    // validation for occupation
    if (!occupation)
      return res.status(400).json({ error: "occupation is required" });
    if (occupation.length === 0)
      return res.status(400).json({ error: "occupation cannot be empty" });
    if (occupation.length < 5)
      return res.status(400).json({ error: "occupation is too short" });
    if (occupation.length > 30)
      return res.status(400).json({ error: "occupation is too long" });

    const house = await House.create({
      name,
      occupation,
      roomNumber,
      user_id: req.user.id,
    });
    return res
      .status(200)
      .json({ data: house, message: "house occupant created successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

// finding occupants by ID

const findHouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const house = await House.findById(id);
  if (!house)
    return res
      .status(404)
      .json({ error: `cannot find the occupant with the ID ${id}` });
  return res
    .status(200)
    .json({ data: house, message: "occupant gotten successfully" });
});

// updating occupants

const updateHouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, roomNumber, occupation } = req.body;
  // validation for name
  if (!name) return res.status(400).json({ error: "name is required" });
  if (name.length === 0)
    return res.status(400).json({ error: "name cannot be empty" });
  if (name.length < 4)
    return res.status(400).json({ error: "name is too short" });
  if (name.length > 30)
    return res.status(400).json({ error: "name is too long" });

  // validation for room number
  if (!roomNumber)
    return res.status(400).json({ error: "room number is required" });
  if (roomNumber.length === 0)
    return res.status(400).json({ error: "room number cannot be empty" });
  if (roomNumber.length < 1)
    return res.status(400).json({ error: "room number is too short" });
  if (roomNumber.length > 20)
    return res.status(400).json({ error: "room number is too long" });

  // validation for occupation
  if (!occupation)
    return res.status(400).json({ error: "occupation is required" });
  if (occupation.length === 0)
    return res.status(400).json({ error: "occupation cannot be empty" });
  if (occupation.length < 5)
    return res.status(400).json({ error: "occupation is too short" });
  if (occupation.length > 30)
    return res.status(400).json({ error: "occupation is too long" });

  const house = await House.findByIdAndUpdate(id, req.body);
  if (!house)
    return res
      .status(404)
      .json({ error: `cannot find the occupant with the ID${id}` });

  if (house.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to update other user");
  }
  const updatedHouse = await House.findById(id);
  return res
    .status(200)
    .json({ data: updatedHouse, message: "occupant updated successfully" });
});

// deleting an occupant

const deleteHouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const house = await House.findByIdAndDelete(id);
  if (!house)
    return res
      .status(404)
      .json({ error: `cannot find the occupant with the ID ${id}` });
  if (house.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to delete other user");
  }
  return res.status(200).json({ message: "deleted successfully" });
});

module.exports = { getHouse, findHouse, updateHouse, addHouse, deleteHouse };
