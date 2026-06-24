import CartProvider from "./context/CartContext"
import Routing from "./pages/Routing"

function App() {

  return (
    <>
      <CartProvider>
        <Routing />
      </CartProvider>
    </>
  )
}

export default App
