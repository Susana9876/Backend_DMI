const articleModel = require("./models/Article");

async function findArticle() {
  const articles = await articleModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categoryId",
      },
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "authorId",
      },
    },
  ]);
  return articles;
}

async function findArticleByName(name) {
  const findArticle = await articleModel.findOne({ name: name });
  return findArticle;
}

async function saveArticle(article) {
  const dataArticle = new articleModel(article);
  const newArticle = await dataArticle.save();
  return newArticle;
}

async function updateArticle(_id, data) {
  const newArticle = new articleModel(data);
  const updateArt = await articleModel.updateOne(
    { _id: _id },
    { $set: newArticle }
  );
  return updateArt;
}

async function deleteArticle(_id) {
  const deleteArt = await articleModel.deleteOne({ _id: _id });
  return deleteArt;
}

module.exports = {
  findArticle,
  findArticleByName,
  saveArticle,
  updateArticle,
  deleteArticle,
};
