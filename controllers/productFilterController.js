import { productFilterServices } from '../services';

const productFilter = async (req, res) => {
  try {
    const { genderId, categoryId, colorId, sizeId } = req.query;
    let newColorId = colorId.map(e => +e);
    const list = await productFilterServices.productFilter(
      genderId,
      categoryId,
      newColorId,
      sizeId
    );
    return res.status(200).json({ message: 'ProductFilterList', list });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Load Fail' });
  }
};

export default { productFilter };
