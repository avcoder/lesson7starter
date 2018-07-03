const Game = require('../models/Game');
const url = require('url');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Home' });
};

exports.getGames = (req, res) => {
  Game.find((err, games) => {
    if (err) {
      res.render('error');
    } else {
      res.render('games', {
        title: 'All Games',
        games,
      });
    }
  });
};

exports.admin = async (req, res) => {
  // use game model to query db for game data
  const games = await Game.find().sort({ title: 'asc' });

  res.render('admin', {
    title: 'Admin',
    games,
  });
};

exports.fillData = (req, res) => {
  const data = [
    {
      title: 'Pacman',
      publisher: 'Namco',
      imageUrl: 'https://archive.org/services/img/msdos_Pac-Man_1983',
      year: 1983,
    },
    {
      title: 'Oregon Trail',
      publisher: 'MECC',
      imageUrl: 'https://archive.org/services/img/msdos_Oregon_Trail_The_1990',
      year: 1990,
    },
    {
      title: 'Sim City',
      publisher: 'Maxis',
      imageUrl: 'https://archive.org/services/img/msdos_SimCity_1989',
      year: 1989,
    },
  ];

  Game.collection.insertMany(data);
  res.redirect('/admin');
};

exports.addGame = (req, res) => {
  res.render('addGame', {
    title: 'Add Game',
  });
};

exports.createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.redirect('/games');
  } catch (err) {
    console.log(err);
  }
};

exports.play = (req, res) => {
  const gamePassed = url.parse(req.url, true).query;
  res.render('playGame', {
    title: gamePassed.game,
  });
};

exports.deleteGame = (req, res) => {
  Game.findByIdAndRemove(
    { _id: req.params.id },
    async (err, gameJustDeleted) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/admin');
      }
    },
  );
};

exports.editGame = (req, res, next) => {
  // use Game model to find the selected document
  Game.findById({ _id: req.params.id }, (err, game) => {
    if (err) {
      console.log(err);
    } else {
      res.render('editGame', {
        title: 'Edit',
        game,
        isActive: 'admin',
      });
    }
  });
};

exports.updateGame = (req, res) => {
  // get year from last 4 characters of imageURL
  req.body.year = req.body.imageUrl.substr(-4);

  Game.update({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });
};
