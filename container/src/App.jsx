import React from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
// import mountFooter from "footer/mountFooter";
const RelatedProducts = React.lazy(() => import("products/App"));

const ReactButton = React.lazy(() => import("payment/ReactButton"));
const AmountItem = React.lazy(() => import("payment/AmountItem"));

import "./index.scss";

// window.headers.get("./Header").then((data) => {
//     const Header = data().default;
//     new Header({
//         target: document.getElementById("header"),
//     });
// });

// mountFooter("#footer");

const App = () => {
  return (
    <Provider store={store}>
      <div className="m-2 p-5">
        <React.Suspense fallback={null}>
          <Products />
        </React.Suspense>
      </div>
    </Provider>
  );
};

const Products = () => {
  var i = 0;

  const onHandleAddToCart = () => {
    i++;
    document.getElementById("inc").innerHTML = i;
  };

  const productId = useSelector((state) => state.productsReducer.productId);
  const products = useSelector((state) => state.productsReducer.products);
  const relatedProductId = useSelector((state) => {
    return state && state.relatedReducer && state.relatedReducer.productId
      ? state.relatedReducer.productId
      : null;
  });
  const product = products.find(
    (product) => product.id === (relatedProductId || productId)
  );

  return (
    <div
      style={{ width: 1000 }}
      className="relative container mx-auto flex flex-row m-10 border-dashed border-2 border-red-500 rounded"
    >
      <div className="absolute -top-7 text-red-500 font-bold">
        Team Core (
        <a
          target="_blank"
          href="https://github.com/dotuan9x/micro-frontends/tree/master/react-redux/container"
          rel="noreferrer"
        >
          container
        </a>
        ){" "}
      </div>
      <div className="flex flex-col w-full p-5">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-lg font-bold">The Model Store</h1>

          <div className="border-dashed border-2 border-blue-300 p-2">
            <div className="-top-7 text-blue-500 font-bold">
              Team Payment (payment)
            </div>
            <AmountItem childElement={<span id="inc">0</span>} />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-2/3">
            <img alt="" src={product.image} />
          </div>
          <div className="w-1/3 pt-10">
            <label className="text-lg font-medium">{product.title}</label>
            <ul className="flex flex-row mt-10">
              <li className="cursor-pointer border-b-2 border-white hover:border-gray-300 img-thumb-custom">
                <img
                  alt=""
                  src="https://micro-frontends.org/0-model-store/images/tractor-red-thumb.jpg"
                />
              </li>
              <li className="cursor-pointer border-b-2 border-white hover:border-gray-300">
                <img
                  alt=""
                  src="https://micro-frontends.org/0-model-store/images/tractor-green-thumb.jpg"
                />
              </li>
              <li className="cursor-pointer border-b-2 border-white hover:border-gray-300">
                <img
                  alt=""
                  src="https://micro-frontends.org/0-model-store/images/tractor-blue-thumb.jpg"
                />
              </li>
            </ul>

            <div className="border-dashed border-2 border-blue-300 p-2">
              <div className="-top-7 text-blue-500 font-bold">
                Team Payment (payment)
              </div>
              <ReactButton onClick={onHandleAddToCart} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-1">
        <RelatedProducts store={store} />
      </div>
    </div>
  );
};

export default App;
