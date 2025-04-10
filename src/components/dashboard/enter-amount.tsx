import Button from '../Button';
import Input from '../Input';

const EnterAmount = ({
  amount,
  setAmount,
  callback,
}: {
  amount: string;
  setAmount: (amount: string) => void;
  callback: () => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callback();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id='amount'
        label='Amount'
        placeholder='Enter amount'
        value={amount}
        type='number'
        onChange={(e) => setAmount(e.target.value)}
        labelClassName='font-semibold'
        required
      />
      <div className='mt-[67px]'>
        <Button
          disabled={!amount}
          className='w-full rounded-md bg-[#F9D900] px-4 py-2 sm:py-4 text-center font-semibold text-black transition hover:bg-[#F9D900]/90 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-0'
        >
          Proceed
        </Button>
      </div>
    </form>
  );
};

export default EnterAmount;
