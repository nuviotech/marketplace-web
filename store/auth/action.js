export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
};

export function login() {
    return { type: actionTypes.LOGIN_REQUEST };
}

export function loginSuccess() {
    return { type: actionTypes.LOGIN_SUCCESS };
}

export function logOut() {
   // localStorage.clear();
   console.log("user is logout");
    localStorage.removeItem("token");
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

export function saveToken(token){
    localStorage.setItem("token",token); 
    return true;
}

export function getToken(){
    var token=null;
   // token= localStorage.getItem("token");
   
   if (typeof window !== 'undefined') {
    token=localStorage.getItem("token");
}
    return token;
}

export function userIsLogin(){
    var token=getToken();
    console.log("token  : "+token)
    if(token===null || token==='')
        return false;
    else 
        return true;    
}