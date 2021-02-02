const advancedResults = (model, populate) => async (req, res, next) => {
  console.log("ENTRO ==> ");
  let query;

  // Copy query
  const reqQuery = { ...req.query };

  // Field to remove
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const fields = req.query.sort.split(",").join(" ");
    query = query.sort(fields);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  const pages = Math.ceil(total / limit);
  query = query.skip(startIndex).limit(limit);

  if (page > pages) {
    return res.status(404).json({
      status: "fail",
      message: "No page found",
    });
  }

  if (populate) {
    query = query.populate(populate);
  }

  // Exceuting query
  const results = await query; // await Bootcamp.find();

  // Pagination Result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    page,
    pages,
    pagination,
    data: results,
  };
  next();
};

//// Comments

module.exports = advancedResults;
