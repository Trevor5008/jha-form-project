const formatShiftDate = (dateStr) => {
   const dateObj = new Date(dateStr) 

   const month = dateObj?.getMonth() + 1;
   const date = dateObj?.getDate();
   const year = dateObj?.getFullYear();
   const hour = dateObj?.getHours();
   const mins = dateObj?.getMinutes();

   const time = militaryTimeConvert(hour, mins)
   // // Formatted Date - Time 
   return `${month}/${date}/${year} - ${time}`;
};

const militaryTimeConvert = (hour, mins) => {
   // Pad single digit hours and minutes with leading zeros
   const paddedHrs = hour < 10 ? "0" + hour : hour;
   const paddedMins = mins < 10 ? "0" + mins : mins;

   // Combine hours and minutes in military time format (HH:mm)
   return `${paddedHrs}:${paddedMins}`;
};

module.exports = {
   formatShiftDate,
};
