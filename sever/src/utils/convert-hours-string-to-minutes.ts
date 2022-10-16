// 19:30 = ["19", 30] => [19, 30] 1- hours / 2- minutes

export function convertHourStringToMinutes(hourString: string){
 const [hours, minutes] = hourString.split(':').map(Number);

 const minutesAmount = (hours * 60) + minutes;

 return minutesAmount;
}