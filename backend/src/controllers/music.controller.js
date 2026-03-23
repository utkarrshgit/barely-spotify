const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function uploadMusic(req, res) {
  const { title } = req.body;
  const safeTitle = title.replace(/\s+/g, "-").toLowerCase();
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"), safeTitle);

  const music = await musicModel.create({
    uri: result.url,
    title: title,
    artist: req.user.id,
  })

  res.status(201).json({
    message: "Music uploaded successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  })
}

async function createAlbum(req, res) {
  const { title, musicIds } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    music: musicIds,
  })

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      music: album.music,
    },
  })
}

async function getAllMusic(req, res) {
    const music = await musicModel
        .find()
        .limit(10)
        .populate('artist', 'username email')

    res.status(200).json({
        message: "Music fetched successfully",
        music: music
    })
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find().select('title artist').populate('artist', 'username email')

    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums
    })
}

async function getAlbumById(req, res) {

    const { albumId } = req.params

    const album = await albumModel.findById(albumId).populate('music').populate('artist', 'username email')

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })
}

module.exports = {
  uploadMusic,
  createAlbum,
  getAllMusic,
  getAllAlbums,
  getAlbumById
}