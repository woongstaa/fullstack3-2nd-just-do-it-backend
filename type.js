const statusType = { CLOSE: 0, OPEN: 1 };

const resultType = { NOT_EXIST: 0, EXIST: 1 };

const createType = { Error: 0, SUCCESS: 1, CriticalError: 2 };

const updateType = { Error: 0, SUCCESS: 1, CriticalError: 2 };

const deleteType = { Error: 0, SUCCESS: 1, CriticalError: 2 };

const styleCodeType = {
  shoes: 'A',
  clothes: 'B',
  accessories: 'C',
  snkrs: 'D',
};

export {
  statusType,
  resultType,
  styleCodeType,
  createType,
  updateType,
  deleteType,
};
