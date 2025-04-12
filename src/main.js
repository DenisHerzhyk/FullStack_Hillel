export const sum = (a, b) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(+a + +b), 1000)
    });
}

export const divide = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (b === 0) { reject(new Error('Cannot divide by zero'));}
            else { resolve(+a / +b); }
        }, 1000);
    });
}
