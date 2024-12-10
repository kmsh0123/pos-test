const { createCanvas, loadImage } = require("canvas");
const Order = require("../../model/order");

const escpos = require("escpos");
escpos.Network = require("escpos-network");
const fs = require("fs");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const { payamount, grandtotal, payback, discount, data } = req.body;

  const orders = await Order.findOne();

  const result = await printingItem(
    payamount,
    grandtotal,
    payback,
    discount,
    // invoice_no,
    data
  );

  return res.status(201).json(result);
});

const printingItem = async (
  payamount,
  grandtotal,
  payback,
  discount,
  data
  // invoice_no
) => {
  const currentDate = new Date();
  const dateString = currentDate.toISOString().substring(0, 10);
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  const timeString = `${hours12}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  canvasHeight = 700 + data.length * 50;
  const canvas = createCanvas(576, canvasHeight);
  const ctx = canvas.getContext("2d");
  ctx.font = "24px Pyidaungsu";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  const lineHeight = 0;
  const nameH = lineHeight + 130;
  const addH = nameH + 30;
  const phoneH = addH + 35;
  const tableH = phoneH + 30;
  const invoiceH = tableH + 30;
  const headerHeight = invoiceH + 60;
  const firstLineH = headerHeight + 30;
  const itemHeight = firstLineH + 30;

  const secondLineH = itemHeight + data.length * 30;
  const subTotalH = secondLineH + 30;
  let discountH = subTotalH + 30;
  let grandtotalH = discountH + 30;

  const payamountH = grandtotalH + 30;
  let cashBackH = payamountH + 30;

  let thankH = cashBackH + 60;
  let seeH = thankH + 30;

  ctx.font = "28px Comic Sans Ms";
  ctx.fillText(`MULA ART GALLERY`, canvas.width / 2, nameH);
  ctx.font = "20px Comic Sans Ms";
  ctx.fillText(
    `E 1-12,The Secretariat Yangon,Thein Phyu Road,Yangon`,
    canvas.width / 2,
    addH
  );

  ctx.fillText(`09443478857 `, canvas.width / 2, phoneH);

  const logoImg = await loadImage("./images/mula.png");
  const logoWidth = 100;
  const logoHeight = (logoWidth / logoImg.width) * logoImg.height;

  ctx.drawImage(
    logoImg,
    canvas.width / 2 - logoWidth / 2,
    lineHeight,
    logoWidth,
    logoHeight
  );
  ctx.font = "24px Pyidaungsu";
  ctx.fillText("Item Name", 80, headerHeight);
  ctx.fillText("Qty", canvas.width - 230, headerHeight);
  ctx.fillText("Price", canvas.width - 150, headerHeight);
  ctx.fillText("Total", canvas.width - 55, headerHeight);
  ctx.fillText(
    `-----------------------------------------------------------------------------------------------------------`,
    190,
    firstLineH
  );
  ctx.textAlign = "center";
  ctx.font = "24px Pyidaungsu";
  ctx.fillText(`Invoice No : 1`, canvas.width / 2, tableH);

  //invoice date and time
  ctx.font = "20px Comic Sans Ms";

  ctx.fillText(`${timeString}`, 70, invoiceH);
  ctx.fillText(`${dateString}`, canvas.width - 75, invoiceH);
  ctx.font = "24px Comic Sans Ms";

  data.forEach((productItem, index) => {
    ctx.font = "24px Pyidaungsu";
    let yPos = itemHeight + index * 30;
    ctx.textAlign = "start";
    ctx.fillText(productItem.name, 30, yPos);
    ctx.textAlign = "right";
    ctx.fillText(productItem.qty, 350, yPos);
    ctx.fillText(productItem.price, 450, yPos);
    ctx.fillText(productItem.price * productItem.qty, 550, yPos);
  });
  ///product name

  //first dotted line
  ctx.textAlign = "center";
  ctx.fillText(
    `-----------------------------------------------------------------------------------------------------------`,
    190,
    secondLineH
  );

  //subtotal
  ctx.textAlign = "center";
  ctx.fillText(`Sub Total  : `, 380, subTotalH);
  ctx.textAlign = "right";
  ctx.fillText(`${grandtotal + discount}`, 550, subTotalH);

  //discount
  ctx.textAlign = "center";
  ctx.fillText(`Discount  : `, 387, discountH);
  ctx.textAlign = "right";
  ctx.fillText(`${discount}`, 550, discountH);

  //grandtotal
  ctx.textAlign = "center";
  ctx.fillText(`Grand Total  : `, 387, grandtotalH);
  ctx.textAlign = "right";
  ctx.fillText(`${grandtotal}`, 550, grandtotalH);

  //cashback
  ctx.textAlign = "center";
  ctx.fillText(`Payamount  : `, 387, payamountH);
  ctx.textAlign = "right";
  ctx.fillText(`${payamount}`, 550, payamountH);
  ctx.font = "24px Comic Sans Ms";

  //discount
  ctx.textAlign = "center";
  ctx.fillText(`CashBack  : `, 387, cashBackH);
  ctx.textAlign = "right";
  ctx.fillText(`${payback}`, 550, cashBackH);
  ctx.font = "24px Comic Sans Ms";

  //thank you
  ctx.textAlign = "center";
  ctx.fillText("Thank You for visiting MULA.....", canvas.width / 2, thankH);

  ctx.textAlign = "center";
  ctx.fillText("See You  Again!!", canvas.width / 2, seeH);

  const filename = "orderImages/receipt.png";
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(filename, buffer);
  // await networkPrinterPrint(buffer, "192.168.1.12");
};

// const networkPrinterPrint = (buffer, Ipaddress) => {
//   try {
//     const networkDevice = new escpos.Network(Ipaddress);
//     const networkPrinter = new escpos.Printer(networkDevice);

//     escpos.Image.load(buffer, "image/png", function (image) {
//       networkDevice.open(function () {
//         networkPrinter.image(image, "D24").then(() => {
//           networkPrinter.cut().close();

//           // networkPrinter.image(image, "D24").then(() => {
//           //   networkPrinter.cut().close();
//           // });
//         });
//       });
//     });
//   } catch (error) {
//     console.log("error............", error);
//   }
// };
module.exports = router;
