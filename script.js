import modulesConst from './modules/constans.js';
import modulesTable from './modules/table.js';
import modulesForm from './modules/form.js';
import modulesErrors from './modules/errors.js';

const {
  btnAdd,
  overlayModal,
  btnClose,
  modalForm,
  tBody,
  tHead,
  arrayTr,
  formModal,
  checkModal,
  inputModalSale,
  modalID,
  totalPriceModal,
  inputModalPrice,
  inputModalCount,
  totalPriceHeader,
  totalPriceArray,
  overlayErr,
  errMessage,
  URL,
  totalPriceALL,       
} = modulesConst;

const {
  createRow,
  calculationTotalPriceTable,
  deleteTr,
  openIMG,
  openModal,
  closeModal 
} = modulesTable;

const {
  checkboxInput,
    // sendingForm,
    calculationTotalPrice,
    priceFocus,
    countFocus,
    saleFocus,
} = modulesForm;

const {
     closeErrModal,
      fetchRequest,
      sendingForm,
} = modulesErrors;



//функция запуска всех функций INIT
{
const init = () => {
  fetchRequest(URL, {
    method: 'GET',
    cb: createRow
    });
  openModal();
  closeModal();
  deleteTr();
  openIMG();
  checkboxInput();
  priceFocus();
  countFocus();
  saleFocus();
  fetchRequest(URL, {
  method: 'GET',
  cb: createRow
  });
  sendingForm();
  closeErrModal();
  // calculationTotalPriceTable();
}

window.CRMinit = init;
}


