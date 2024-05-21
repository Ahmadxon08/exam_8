import "./Loading.scss";
const Loading = () => {
  return (
    <div className="loader">
      <div className="lds-hourglass"></div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
