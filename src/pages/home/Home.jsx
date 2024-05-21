// const bitCoin = "./assets/img/bitcoin.png.png";
import "./Home.scss";
import { useContext } from "react";
import { AllCryptoContext } from "../../context/Context";
import Couresel from "../../components/couresel/Couresel";
import TableComponents from "../../components/table/Table";
const Home = () => {
  const { allCrypto, allCoins } = useContext(AllCryptoContext);
  console.log(allCrypto);
  console.log(allCoins);
  return (
    <div>
      <>
        <section className="hero">
          <div className="container">
            <div className="hero_content">
              <div className="hero_text">
                <h1>CRYPTOFOLIO WATCH LIST</h1>
                <p>Get all the Info regarding your favorite Crypto Currency</p>
              </div>
              <Couresel />
            </div>
          </div>
        </section>
     
        <TableComponents />
      </>
    </div>
  );
};

export default Home;
