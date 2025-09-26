import Car from "../models/carModel.js";

// @desc    Add new car
export const createCar = async (req, res) => {
  try {
    const { title, price, color, mileage, year, description } = req.body;
    const images = (req.files || []).map(f => '/uploads/' + f.filename);

    const car = await Car.create({
      dealer: req.user.id,
      title,
      price,
      color,
      mileage,
      year,
      description: JSON.parse(description || '[]'),
      images,
    });

    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get all cars
export const getCars = async (req, res) => {
  try {
    const { minPrice, maxPrice, color, maxMileage, dealerId } = req.query;
    const filter = {};

    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (color) filter.color = color;
    if (maxMileage) filter.mileage = { $lte: Number(maxMileage) };
    if (dealerId) filter.dealer = dealerId;

    const cars = await Car.find(filter).populate('dealer', 'name email');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get single car
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('dealer', 'name email');
    if (!car) return res.status(404).json({ msg: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update car
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ msg: 'Car not found' });
    if (String(car.dealer) !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });

    const updates = req.body;
    if (req.files && req.files.length) {
      updates.images = req.files.map(f => '/uploads/' + f.filename);
    }
    if (updates.description) updates.description = JSON.parse(updates.description);

    Object.assign(car, updates);
    await car.save();

    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete car
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ msg: 'Car not found' });
    if (String(car.dealer) !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });

    await car.deleteOne();
    res.json({ msg: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Bulk delete cars
export const bulkDeleteCars = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) return res.status(400).json({ msg: 'ids array required' });

    const cars = await Car.find({ _id: { $in: ids }, dealer: req.user.id });
    const idsToDelete = cars.map(c => c._id);

    await Car.deleteMany({ _id: { $in: idsToDelete } });
    res.json({ deleted: idsToDelete });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
