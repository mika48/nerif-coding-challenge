export const saveAddressToLS = (data) => localStorage.setItem('gatewayAddress', data);
export const getAddressFromLS = () => localStorage.getItem('gatewayAddress');