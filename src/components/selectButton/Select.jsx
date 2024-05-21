import { useCryptoContext } from "../../context/Context";
import "./Select.scss";
const Select = () => {
  const { setDays } = useCryptoContext();

  return (
    <div className="select">
      <>
        <button onClick={() => setDays(1)}>24 Hours</button>
        <button onClick={() => setDays(30)}>1 Month</button>
        <button onClick={() => setDays(90)}>3 Month</button>
        <button onClick={() => setDays(365)}>1 Year</button>
      </>
    </div>
  );
};

export default Select;
