import Pilot from "../models/Pilot.js";

export const getPilots = async (req, res) => {
  try {
    const { latitude, longitude, experience, range } = req.body;

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      typeof experience !== "number" ||
      typeof range !== "number"
    ) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }

    const pilots = await Pilot.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },
          distanceField: "distance",
          maxDistance: range * 1000,
          spherical: true,
        },
      },
      {
        $match: {
          workExperience: { $gte: experience },
        },
      },
      {
        $sort: { workExperience: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    res.json(pilots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
