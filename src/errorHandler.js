import { Toast } from 'vant'

const errorHandler = (err) =>{
  console.error("errorHandler", err)
  if (err.message) {
    Toast.fail({
      message: err.message,
    });
  } 
};

export default errorHandler
