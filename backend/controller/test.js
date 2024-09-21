const { Category, Animal } = require("../model/testModel");

const uploadAnimal = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save(() => {
      const post = new Animal();
    });

    res.status(201).json({
      data: saveAnimal,
      success: true,
      error: false,
      message: "Aniamal added  Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = uploadAnimal;

const user = new User({ name: "Pravin Raju", email: "tmpravinraju@gmail.com" });
user.save((err) => {
  if (err) return console.error(err);

  const post = new Post({
    title: "GoodMorning Sir",
    content: "This is my first post!",
    author: user._id,
  });

  post.save((err) => {
    if (err) return console.error(err);
  });
});
