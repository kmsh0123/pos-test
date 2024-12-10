const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const uniqueRouter = require("./controller/uniqueItems");
const nonuniqueRouter = require("./controller/nonuniqueItems");
const categoryRouter = require("./controller/category");
const orderRouter = require("./controller/order");
const orderHistoryRouter = require("./controller/orderhistory");
// const printRouter = require("./controller/Printing/print");
const posRouter = require("./controller/pos");
const sidebarRouter = require("./controller/sidebar");
const sidebarcategoryRouter = require("./controller/sidebarcategory");
const purchaseRouter = require("./controller/purchase");
const expenseRouter = require("./controller/expense");
const rentalRouter = require("./controller/rental");
const supplierRouter = require("./controller/supplier");
const promotionRouter = require("./controller/promotion");
const frontendStatic = require("./frontendStaticbuild");

const path = require("path");

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



// app.use("/",() => {
//   console.log("object")
// });
//Routes
app.use("/uniqueitems", uniqueRouter);
app.use("/nonuniqueitems", nonuniqueRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/orderhistory", orderHistoryRouter);
// app.use("/print", printRouter);
app.use("/pos", posRouter);
app.use("/sidebar", sidebarRouter);
app.use("/purchase", purchaseRouter);
app.use("/sidebarcategory", sidebarcategoryRouter);
app.use("/expense", expenseRouter);
app.use("/rental", rentalRouter);
app.use("/supplier", supplierRouter);
app.use("/promotion", promotionRouter);
const port = process.env.PORT || 8080;

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => console.log(`Server is running at port ${port}`));
    frontendStatic.listen(4500, () =>
      console.log(`Frontend is running at port 4500`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
