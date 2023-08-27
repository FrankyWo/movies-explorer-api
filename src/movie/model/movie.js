const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const movieSchema = new Schema(
  {
    country: {
      required: true,
      type: String,
    },

    director: {
      required: true,
      type: String,
    },

    duration: {
      required: true,
      type: Number,
    },

    year: {
      required: true,
      type: String,
    },

    description: {
      required: true,
      type: String,
    },

    image: {
      required: true,
      type: String,
    },

    trailer: {
      required: true,
      type: String,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    nameRU: {
      required: true,
      type: String,
    },

    nameEN: {
      required: true,
      type: String,
    },

    owner: {
      required: true,
      type: ObjectId,
      ref: 'user',
    },

    movieId: {
      required: true,
      type: Number,
    },
  },
);

module.exports = mongoose.model('movie', movieSchema);
