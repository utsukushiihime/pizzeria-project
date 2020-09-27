function methodNotAllowed(req, res) {
  res.status(405).json({ message: "Method not allowed." });
}

function notFound(req, res) {
  res.status(404).send("NOT FOUND");
}

module.exports = {
  methodNotAllowed,
  notFound,
};
