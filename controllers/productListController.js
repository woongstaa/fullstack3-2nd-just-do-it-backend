import { productListServices } from '../services';

const productList = async (req, res) => {
  try {
    const { genderId, categoryId } = req.query;

    const list = await productListServices.productList(genderId, categoryId);
    return res.status(200).json({ message: 'ProductList', list });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Load Fail' });
  }
};

const snkrsList = async (req, res) => {
  try {
    const list = await productListServices.snkrsList();
    return res.status(200).json({ message: 'SnkrsList', list });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Load Fail' });
  }
};

export default { productList, snkrsList };
