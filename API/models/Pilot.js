import mongoose from "mongoose";

const pilotSchema = new mongoose.Schema({
  name: String,
  profileImage: String,
  workExperience: Number,
  location: String,
  coordinates: [Number], // [longitude, latitude]
});

pilotSchema.index({ coordinates: "2dsphere" });

const Pilot = mongoose.model("Pilot", pilotSchema);

export default Pilot;
