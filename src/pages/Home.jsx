const Home = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="hero bg-blue-500 text-white py-16 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Online Shop!</h1>
          <p className="text-xl mb-6">Discover the best products at unbeatable prices.</p>
          <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-gray-100">
            Start Shopping
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="category bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Electronics</h3>
            <p className="text-gray-600 mb-4">Latest gadgets and accessories</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Shop Now
            </button>
          </div>
          <div className="category bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Fashion</h3>
            <p className="text-gray-600 mb-4">Trending styles and outfits</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Shop Now
            </button>
          </div>
          <div className="category bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Home & Garden</h3>
            <p className="text-gray-600 mb-4">Everything for your home</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Shop Now
            </button>
          </div>
          <div className="category bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Sports</h3>
            <p className="text-gray-600 mb-4">Gear for every sport</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Продукты можно отображать из массива данных */}
          {[1, 2, 3, 4].map((product) => (
            <div key={product} className="product bg-white p-6 rounded-lg shadow hover:shadow-lg">
              <img
                src={`/path-to-product-${product}-image.jpg`}
                alt="Product Image"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold mb-2">Product {product}</h3>
              <p className="text-gray-600 mb-4">$99.99</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Promotions/Banners */}
      <section className="promotions mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Current Promotions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="promotion bg-green-500 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">50% OFF All Electronics!</h3>

          
            
            <p className="text-lg mb-4">  </p>
            <button className="bg-white text-green-500 py-2 px-4 rounded hover:bg-gray-100">
              Shop Electronics
            </button>
          </div>
          <div className="promotion bg-yellow-500 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Summer Fashion Sale</h3>
            <p className="text-lg mb-4">Up to 70% off on selected items.</p>
            <button className="bg-white text-yellow-500 py-2 px-4 rounded hover:bg-gray-100">
              Shop Fashion
            </button>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="customer-reviews mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Customer Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((review) => (
            <div key={review} className="review bg-gray-100 p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                Amazing products! Great quality and fast shipping. Highly recommend!
              </p>
              <p className="text-gray-800 font-bold">- Customer {review}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
