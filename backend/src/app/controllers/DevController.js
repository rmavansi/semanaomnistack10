import axios from 'axios';
import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

class DevController {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const checkIfExists = await Dev.findOne({ github_username });

    if (checkIfExists) {
      return res.status(400).json({ error: 'Dev already exists' });
    }

    const apiResponse = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { login, avatar_url, bio } = apiResponse.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    const dev = await Dev.create({
      github_username,
      name: login,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });

    return res.status(200).json(dev);
  }

  async index(req, res) {
    const devs = await Dev.find();
    return res.status(200).json(devs);
  }

  async update(req, res) {
    const { github_username } = req.params;
    const { name, techs, avatar_url, bio, latitude, longitude } = req.body;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    const dev = await Dev.findOneAndUpdate({
      github_username,
      $set: {
        name,
        techs: parseStringAsArray(techs),
        avatar_url,
        bio,
        location
      }
    });

    return res.status(200).json(dev);
  }

  async delete(req, res) {
    const { github_username } = req.params;

    const dev = await Dev.findOneAndDelete({
      github_username
    });

    if (!dev) {
      return res.status(200).json({ error: 'Dev not found!' });
    }

    return res.status(200).json({ message: 'Dev deleted successfully!' });
  }
}

export default new DevController();
