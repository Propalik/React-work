import './App.css'
import { Card } from "./components/ui/Card/Card";
import { initialProducts } from '../data';



function App() {
  const handleCardBtnClick = (id) =>{
    console.log(`карточка с ID ${id}`);
    
  }

  return ( 
      <section className="products">
    <div className="container">
      <div className="flex flex-wrap justify-between gap-10">
        {!!initialProducts &&
          initialProducts.map((product) => (
            <Card
            key={product?.id} 
            details={product}
            onBtnClick={handleCardBtnClick} />
          ))}
      </div>
    </div>
  </section>
  )
  
}

export default App
