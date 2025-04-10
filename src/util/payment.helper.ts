export const getModalTitle = (
  action: 'fund' | 'withdraw' | 'transfer' | undefined,
  step: number
) => {
  switch (action) {
    case 'fund':
      return step === 1 ? 'Enter Amount' : step == 2 ? 'Payment Option' : 'Payment Details';
    case 'withdraw':
      return 'Withdraw Funds';
    case 'transfer':
      return 'Transfer Funds';
    default:
      return '';
  }
};
