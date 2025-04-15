import { Link } from 'react-router-dom';

const CheckoutItems = () => {
  const categories = ['Dry Goods', 'Produce', 'Dairy', 'Meat', 'Bakery'];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Checkout Items</h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/checkout-items/dry-goods`}
            className="p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CheckoutItems;
