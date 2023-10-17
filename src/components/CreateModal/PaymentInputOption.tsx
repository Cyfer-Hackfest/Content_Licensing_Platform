import styled from "styled-components";
import { PaymentOption } from "../../types";
import { parsePrice, reparsePrice } from "../../utils";
import { useAppSelector } from "../../context";

const PaymentInputOption: React.FC<{
    option: PaymentOption;
    onChange: (newOption: PaymentOption) => void;
    placeHolder: {
      day: string,
      price: string
    }
  }> = ({ option, onChange, placeHolder }) => {
    const {network } = useAppSelector(state => state.app_state)

    const price = option?.price ? parsePrice(option?.price?.toString(), network.decimals) : '';
    
    return (
        <div className="flex flex-row">
        <div className="flex flex-row justify-start items-center">
            <p>Day: </p>
          <Input
            type="number"
            value={option?.days}
            placeholder={placeHolder.day}
            className="w-12 mx-1 my-0.5 p-0.5 text-center rounded-xl" 
            onChange={(e) => onChange({ ...option, days: parseInt(e.target.value) || undefined })}
          />
        </div>
        <div className="flex flex-row justify-start items-center">
          <p> Price({network.currency})</p>
          <Input
            type="number"
            value={price}
            placeholder={placeHolder.price}
            className="w-12 mx-1 my-0.5 p-0.5 text-center rounded-xl" 
            onChange={(e) => onChange({ ...option, price: reparsePrice(parseFloat(e.target.value), network.decimals) || undefined })}
          />
        </div>
      </div>
    );
  };

  export default PaymentInputOption;

  const Input = styled.input`
  padding: 5px;
  margin: 5px;
  width: 100%;
  border: solid thin blue;
`;