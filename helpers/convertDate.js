export const convertDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    
    const campaignsDate = {
        shortDate: `${day}.${month}`,
        fullDate: `${day}.${month}.${year}`,
        day: day,
        month: month,
        year: year
    }
    
    return campaignsDate;
}