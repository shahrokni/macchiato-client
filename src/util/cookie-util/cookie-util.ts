/* INTERFACES */
export interface CookieKeyValue {
    key: string;
    value: string;
}
/* FUNCTIONS */
export const setCookie = (input: CookieKeyValue, expdays: number): void => {

    if (input === null)
        return;

    let cookieString = '';
    /* SET COOKIE PARAMS */    
    cookieString = cookieString + input.key + '=' + input.value + ';'
    /* SET EXPIRE DATE */
    let date = new Date();
    date.setTime(date.getTime() + (expdays * 24 * 60 * 60 * 1000));
    cookieString = cookieString+' expires='+date.toUTCString()+';';
    /* SET COOKIE PATH */
    cookieString += ' path=/';   
    document.cookie = cookieString;   
}

export const getCookieByKey= (key:string):CookieKeyValue=>{   

    return {key:'X',value:'Y'} as CookieKeyValue;
}

export const isCookieEnabled = ():boolean=>{
    
    if(navigator.cookieEnabled)
        return true;
    return false;
}

