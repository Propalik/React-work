import './App.css'
import { Card } from "./components/ui/Card/Card";
import { initialProducts } from '../data';



function App() {
  const handleCardBtnClick = (id) =>{
    console.log(`карточка с ID ${id}`);
    
  }

/**
 * 
 * @param {string} id /айди карточки 
 * @param {string} newValue / новое значение степпера
 */
  const handleStepperUppdate = (id, newValue) => {
    const updateProducts = initialProducts?.map((product) => {
      if (product?.id === id) {
        return {...product, cartQuantity: newValue };
      }
      return product
    })
    console.log(updateProducts);
    
  }

  const handleHeartClick = (id) => {
    const updateProducts = initialProducts?.map((product) => {
      if (product?.id === id) {
        return {...product, isFavorite: !product?.isFavorite };
      }
      return product
    })
    console.log("сохр", updateProducts);
    
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
            onBtnClick={handleCardBtnClick}
            onStepperUpdate={handleStepperUppdate}
            onToggleFavorite={handleHeartClick} />
          ))}
      </div>
    </div>
  </section>
  )
  
}

export default App
