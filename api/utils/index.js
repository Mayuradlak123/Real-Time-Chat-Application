function getCurrentDateTime() {
    const now = new Date();
  
    // Get the current date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
  
    // Get the current time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // Return the formatted date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const dateGenerator = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];

    while (start <= end) {
        const year = start.getFullYear();
        const month = String(start.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const day = String(start.getDate()).padStart(2, '0');

        dateArray.push(`${year}-${month}-${day}`);

        start.setDate(start.getDate() + 1);
    }

    return dateArray;
}

  module.exports={getCurrentDateTime,dateGenerator};