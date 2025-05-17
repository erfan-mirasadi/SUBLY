// import Componies from "../compony/Componies";
import Price from "./components/Price";
import SingleProduct from "./SingleProduct";

function Sub() {
  return (
    <div className="overflow-hidden">
      <SingleProduct />
      {/* <Componies /> */}
      <Price />
    </div>
  );
}

export default Sub;
