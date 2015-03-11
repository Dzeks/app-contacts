import toastr from 'toastr';

export class Toastr {
  constructor(){
    // Maybe provide some default configuration
  }
  put(message){
    toastr.info(message);
  }
}