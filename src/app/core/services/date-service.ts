export function formatDate(date){ // date format to show in first cloumn exmaple - Dec 2019, 26
        date = new Date(date);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${year}, ${day}`;
}
export function dateDiffInDays(a,b){ //this return daydiff of a date from todays date
    let date1:any = new Date(a);
    let date2:any = new Date(b);
    date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diffTime = date1 - date2;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays; // 0 for today <0, for past dates &  >0 for future dates
}