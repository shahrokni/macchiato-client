const getMonth = (month: number): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
}
export const iso2ShortDate = (isoDate: Date): string => {
    const date = new Date(isoDate);
    let shortDate = date.getDate() + ' ' +
    getMonth(date.getMonth()) + ' ' +
    date.getFullYear();
    return shortDate;
}
