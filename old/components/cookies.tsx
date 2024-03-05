export function setCookie(name: string, value: string) {
    // vars
    let expires = "";

    // Setting when cookie expires.
    let date = new Date();
    date.setTime(date.getTime() + (3*60*60*1000));// 3 hours
    expires = "; expires=" + date.toUTCString();
    
    // storing the cookie
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Example: setCookie('jwtToken', jwtToken);

export function getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// Example: const token = getCookie('jwtToken');



