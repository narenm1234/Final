import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
export default function Loaderpage() {
  return (
    <Loader
      type="Puff"
      color="#0070d2"
      height={100}
      width={100}
      timeout={10000} //3 secs
    />
  );
}
