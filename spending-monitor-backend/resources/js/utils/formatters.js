export const formatAmount = (amount) => {
    const number = parseFloat(amount);
    return isNaN(number) ? '0.00' : number.toFixed(2);
};

export const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
};

export const formatCurrency = (amount, currency = 'EUR') => {
    const formattedAmount = formatAmount(amount);
    return `${currency} ${formattedAmount}`;
}; 