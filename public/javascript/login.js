/**
 * Sets the given cookie and then reloads
 * the page to get redirected to the Home.
 *
 * To clean the cookie you can go to the developer tools,
 * click on "Application" and "Clean storage".
 *
 * @param {string} cookie
 */
const setCookie = cookie => {
    if (cookie) {
        Cookies.set('token', cookie);
        window.location.reload();
    }
}
