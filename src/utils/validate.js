
export const checkValidateData = (email, password) => {
    
   const isEmailValid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
   const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
   // const isNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);

   if(!isEmailValid) return "Email is not valid";
   if(!isPasswordValid) return "Password doesnt meet criteria";
   // if(!isNameValid) return "Name is invalid"; 
   return null;
}

