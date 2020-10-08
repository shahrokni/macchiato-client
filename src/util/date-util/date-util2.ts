export function getWeekDay(day: number): string {
    const week: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return week[day];
}


export function getMonthName(month: number): string {

    const months:string[]=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    return months[month];    
}