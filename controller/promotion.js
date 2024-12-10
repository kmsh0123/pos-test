const router = require("express").Router();
const Promotion = require("../model/promotion");
const Items = require("../model/nonuniqueItems");
const Category = require("../model/category");

router.get("/", async (req, res) => {
  try {
    const promotion = await Promotion.findAll({
      order: [["id", "DESC"]],
      include: Category,
    });
    return res.status(200).json(promotion);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
router.get('/:id',async(req,res)=>{
  const promotionId = req.params.id;
  // console.log(promotionId)

  try{
    const singlePromotion = await Promotion.findOne ({
      where : {id : promotionId}
    })
    return res.status(200).json(singlePromotion)

  }catch(e){
    return res.status(500).json(e.message)
  }
})
router.post("/", async (req, res) => {
  const { name, selectedCategory, promotionValue, startDate, endDate } =
    req.body;
  try {
  const promotionData =  await Promotion.create({
      name,
      categoryId : selectedCategory,
      promotionValue,
      startDate,
      endDate,
    });

    const promoId = promotionData.id;
    await Items.update(
      { promotionId : promoId },
      {
        where: {
          categoryId: selectedCategory,
        },
      }
    );

    

    return res.status(200).json({ msg: "promotion added" });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
router.put(async(req,res)=>{
  
})

module.exports = router;
