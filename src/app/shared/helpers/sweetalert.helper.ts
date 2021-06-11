import Swal from 'sweetalert2';


export const showErrorMessage = ( message: string ) => {
    Swal.fire(message);
};

export const showSuccessMessage = ( message: string ) => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1000
    });
};

export const showSpinnerOfSweetAlert = ( message: string ) => {
    Swal.fire({
      title: message,
      allowOutsideClick: false
    });
    Swal.showLoading();
};

export const closeSpinnerOfSweetAlert = () => {
    Swal.close();
};