
import modulesConst from './constans.js';
import modulesTable from './table.js';
import modulesForm from './form.js';

const {
  overlayModal,
  tBody,
  formModal,
  overlayErr,
  errMessage,
  URL,     
} = modulesConst;

const {
  createRow,
  calculationTotalPriceTable,
} = modulesTable;

const {
    calculationTotalPrice, 
} = modulesForm;

// функция закрытия оверлея Ошибки
const closeErrModal = () => {
  overlayErr.addEventListener('click', e => {
  const target = e.target;
  if (target === overlayErr || target.closest('.close')) {
    overlayErr.classList.remove('visible');
  };
});
}

 // универсальная функция занрузки и отправки данных с сервера с помощью Fetch
const fetchRequest = async (URL, {
  method = "GET",
  cb,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(URL, options);

    if (response.ok) {
      const data = await response.json();

      if (cb && method == 'GET' && (response.status === 200 || response.status === 201)) {
        data.map(item => {
        let tr = cb(null, item);
        tBody.append(tr);
      });
      };

      if (cb && method == 'POST' && (response.status !== 422 || response.status !== 404 || response.status < 500)) {
        cb(null, data);
      };
      }
      if (response.status === 422 || response.status === 404 || response.status > 500){
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
    
      // else {
      //   throw new Error(`Что-то пошло не так`);
      // }
    
  } catch(err) {
      console.warn(err);
       overlayErr.classList.add('visible');
        errMessage.textContent = err;
      cb(err);
  };
};

// функция отправки данных формы при нажатии кнопки
const sendingForm = () => {
  formModal.addEventListener('submit', (e) => {
  e.preventDefault();
  
  fetchRequest(URL, {
        method: 'POST',
        body: {
          title: formModal.title.value,
          category: formModal.category.value,
          units: formModal.unit.value,
          count: formModal.count.value,
          price: formModal.price.value,
          description : 'none',
        },
        cb(err, data){  
            form.reset();
            overlayModal.classList.remove('visible');
            if (data) {
              overlayErr.classList.add('visible');
              errMessage.textContent = `Заявка отправлена успешно, номер заявки ${data.id}`;
              tBody.innerHTML = ''; 
              // calculationTotalPriceTable();
            }
           
            fetchRequest(URL, {
            method: 'GET',
            cb: createRow
          });  
        },
        headers: {
          'Content-Type': 'application/json'
        },
  });
})
}

 export default {
    closeErrModal,
	fetchRequest,
	sendingForm,
  };