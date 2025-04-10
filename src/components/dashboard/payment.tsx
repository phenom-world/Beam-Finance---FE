import { useState } from 'react';

import { getModalTitle } from '../../util/payment.helper';
import { Modal } from '../Modal';
import EnterAmount from './enter-amount';
import PaymentDetails from './payment-details';
import { PaymentOptions } from './payment-options';
import PaymentTransfer from './payment-transfer';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'fund' | 'withdraw' | 'transfer' | undefined;
}

export function PaymentModal({ isOpen, onClose, action }: PaymentModalProps) {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<string>();
  const [amount, setAmount] = useState('');

  const handleClose = () => {
    onClose();
    setAmount('');
    setStep(1);
    setSelectedMethod(undefined);
  };

  const renderPaymentContent = () => {
    switch (action) {
      case 'fund':
        switch (step) {
          case 1:
            return (
              <EnterAmount amount={amount} setAmount={setAmount} callback={() => setStep(2)} />
            );
          case 2:
            return (
              <PaymentOptions
                onClose={handleClose}
                amount={Number(amount)}
                callback={() => setStep(3)}
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            );
          default:
            return <PaymentDetails amount={Number(amount)} onClose={handleClose} />;
        }
      case 'withdraw':
      case 'transfer':
        return <PaymentTransfer action={action} onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getModalTitle(action, step)}
      subtitle={selectedMethod ? 'Please confirm the margin details' : undefined}
      size='md'
    >
      {renderPaymentContent()}
    </Modal>
  );
}
