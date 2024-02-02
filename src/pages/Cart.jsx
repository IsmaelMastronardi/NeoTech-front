/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addNewItemAndSave } from '../redux/slices/orderSlice';

const Cart = () => {
  const dispatch = useDispatch();

  const {
    loading,
  } = useSelector((store) => store.user);

  const {
    orderItems,
    itemsCount,
  } = useSelector((store) => store.order);

  const addToCart = (item) => {
    dispatch(addNewItemAndSave(item, 'addItem'));
  };

  const removeFromCart = (item, quantity) => {
    if (quantity > 1) {
      dispatch(addNewItemAndSave(item, 'removeItem'));
    }
  };

  const deleteFromCart = (item) => {
    dispatch(addNewItemAndSave(item, 'deleteItem'));
  };

  if (loading) {
    return (
      <p>loading....</p>
    );
  }

  if (itemsCount === 0) {
    return (
      <section className="flex flex-col gap-8 pt-8 text-center">
        <p>Your cart Is empty</p>
        <div>
          <NavLink to="/">
            <button type="button" className="p-3 text-white bg-blue-400 rounded-2xl">Continue Shopping</button>
          </NavLink>
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-row justify-center">
      <ul className="flex flex-col w-10/12 gap-16 py-10">
        {Object.values(orderItems).map((orderItem) => {
          const { item } = orderItem;
          const { quantity } = orderItem;
          return (
            <li key={item.id} className="border rounded-2xl">
              <div className="py-2 text-center">
                <p className="text-2xl">{item.name}</p>
              </div>
              <div className="flex flex-row gap-2">
                <div className="w-1/2">
                  <img src={item.image} alt={`${item.name}`} />
                </div>
                <div className="flex flex-col justify-between text-center">
                  <div className="">
                    <p>{item.description}</p>
                  </div>
                  <div className="flex justify-around">
                    <button
                      type="button"
                      className="px-3 py-1 bg-red-400 rounded-full"
                      onClick={() => deleteFromCart(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-around py-4">
                <div className="flex flex-row justify-center">
                  <button
                    type="button"
                    className={`text-4xl ${quantity === 1 ? 'text-gray-100' : ''}`}
                    onClick={() => removeFromCart(item, quantity)}
                  >
                    -
                  </button>
                  <p className="">{quantity}</p>
                  <button
                    type="button"
                    className=""
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
                <p>{item.price}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Cart;
