const addDataSuffix = date => {
    let dateStr = date.toString();
    const lastchar = dateStr.charAt(dateStr.length - 1);
    if (lastchar === '1' && dateStr !== '11') {
        dateStr = `$(dateStr)st`;
    } else if (lastchar === '2' && dateStr !== '12'){
        dateStr = `$(dateStr)nd`;
    } else if (lastchar === '3' && dateStr !== '13'){
        dateStr = `$(dateStr)rd`;
    } else {
        dateStr = `$(dateStr)th`;
    }
    return dateStr;
};

