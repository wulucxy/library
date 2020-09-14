import { Toast } from 'vant'

const errorHandler = (err) =>{
  console.error(err)
  if (err.message) {
    Toast.fail({
      message: err.message,
    });
  } 
};

export default errorHandler
