import './App.css'
import { Card } from "./components/ui/Card/Card";

// Данные карточек (продукты)
const initialProducts = [
  {
    id: "1",
    name: "Armchair",
    category: "Chair",
    rating: "4.9",
    price: "50.2",
    description:
    "At IKEA we want to put well-designed, affordable home furnishing within",
    imgSrc:
      "src/assets/products/product-1.jpg",
  },
  {
    id: "2",
    name: "Bed",
    category: "Bed",
    rating: "3.0",
    price: "102.10",
    description:
    "At IKEA we want to put well-designed, affordable home furnishing within",
    imgSrc:
      "src/assets/products/product-2.jpg",
  },
  {
    id: "3",
    name: "Bench",
    category: "Bench",
    rating: "4.9",
    price: "15",
    description:
    "At IKEA we want to put well-designed, affordable home furnishing within",
    imgSrc:
     "src/assets/products/product-3.jpg",
  },
  {
    id: "4",
    name: "Bed 2",
    category: "Bed 2",
    rating: "3.0",
    price: "102.10",
    description:
    "At IKEA we want to put well-designed, affordable home furnishing within",
    imgSrc: "src/assets/products/product-4.jpg",
  },
  {
    id: "5",
    name: "Bench2",
    category: "Bench",
    rating: "3.2",
    price: "12",
    description:
    "At IKEA we want to put well-designed, affordable home furnishing within",
    imgSrc: "src/assets/products/product-5.jpg",
  },
  {
    id: "6",
    name: "Bed2",
    category: "Bed",
    rating: "1.0",
    price: "105.80",
    description:
    "At IKEA we want to put well-designed, affordable home furnishing within",
    imgSrc:
      "src/assets/products/product-7.jpg",
  },
];

function App() {

  return ( 
      <section className="products">
    <div className="container">
      <div className="flex flex-wrap justify-between">
        {!!initialProducts &&
          initialProducts.map((product) => (
            <Card key={product?.id} details={product} />
          ))}
      </div>
    </div>
  </section>
  )
  
}

export default App
