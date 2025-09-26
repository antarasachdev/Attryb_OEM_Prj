import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  images: [String],
  price: { type: Number, required: true },
  color: { type: String, required: true },
  mileage: { type: Number, required: true },
  year: { type: Number, required: true },
  description: [String],
}, { timestamps: true });

const Car = mongoose.model('Car', CarSchema);
export default Car;
