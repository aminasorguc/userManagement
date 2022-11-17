export function authHeader(body) {
    // let user = JSON.parse(localStorage.getItem('user'));
    // if (user && user.sessionToken) {
    //     return { 'xauthtoken': user.sessionToken, 'Accept': 'application/json', requestSource: "APP", };
    // }
    return {
        Accept: "application/json",
    };
}