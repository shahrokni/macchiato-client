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

export const getCookieByKey= (key:string):string=>{   

    let value = ''
    const cookieStr = `;${document.cookie}`;
    const exp = '^'+key+'='; 
    const regex = new RegExp(exp,'i');
    const parts = cookieStr.split(';');
    for(let i=0;i<parts.length;i++){
        if(parts[i].search(regex)!==-1){
            value = parts[i].substring(key.length+1,cookieStr.length+1);
            break;
        }
    }
    return value;
}

export const isCookieEnabled = ():boolean=>{
    
    if(navigator.cookieEnabled)
        return true;
    return false;
}

