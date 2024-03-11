import { useDisconnect, useAccount, useWriteContract } from 'wagmi';
import abi from './abi.json';
import { contractAddress } from './config';
import { getAddressFromLS, saveAddressToLS } from './localStorageHelpers';

function App() {
  const { disconnect } = useDisconnect();
  const { address, isDisconnected, isConnected } = useAccount();
  const { writeContract, data, error, isError, reset } = useWriteContract();

  if (data) {
    saveAddressToLS(data);
  }

  const addressFromLS = getAddressFromLS();

  const style = {
    border: '1px solid black',
    padding: '5px',
    borderRadius: '5px',
    backgroundColor: 'white',
    marginLeft: '10px'
  };
  const handleCursorPointer = (e) => {
    e.currentTarget.style.cursor = 'pointer';
  }

  const handleDeployNewGateway = () => {
    writeContract({
      abi,
      address: contractAddress,
      functionName: 'deployGateway',
      args: [address]
    })
  }

  return (
    <div className="App">
      {isDisconnected &&
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh'
          }}>
          <w3m-button />
        </div>}
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          padding: '5px 10px'
        }}>
        {isConnected && <span>{address}</span>}
        {isConnected &&
          <button
            onClick={() => disconnect()}
            style={style}
            onMouseOver={e => handleCursorPointer(e)}
          >
            disconnect
          </button>}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh'
        }}>
        <div>
          {addressFromLS && isConnected && <span>Gateway address: {addressFromLS}</span>}
          {isConnected &&
            <button
              onClick={() => handleDeployNewGateway()}
              style={style}
              onMouseOver={e => handleCursorPointer(e)}
            >deploy new gateway
            </button>
          }
        </div>
        {isError &&
          <div
            style={{
              color: 'red',
              maxWidth: '900px',
              minWidth: '375px',
              minHeight: '24px',
              border: '1px solid red',
              position: 'relative',
              marginTop: 10,
              textAlign: 'center'
            }}>
            <button
              onClick={() => reset()}
              style={{
                position: "absolute",
                right: "0px",
                top: "0px",
                padding: "0px",
                border: '1px solid red',
                backgroundColor: 'pink',
                height: "24px",
                width: "20px",
                cursor: 'pointer'
              }}>x</button>
            {error.message}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
