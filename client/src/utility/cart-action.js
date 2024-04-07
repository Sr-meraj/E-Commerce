import { toast } from 'react-toastify';
export const handleAddToCart = (product, quantity = 1, calculateCartTotals) => {
        // Retrieve cart items from local storage
        let cartItems = JSON.parse(localStorage.getItem("CART_ITEMS")) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = cartItems.findIndex(item => item._id === product._id);

        console.log(existingProductIndex);
        if (existingProductIndex !== -1) {
            // Update existing product's quantity and total price
            cartItems[existingProductIndex].quantity += quantity;
            cartItems[existingProductIndex].totalPrice = cartItems[existingProductIndex].discountedPrice ?
            cartItems[existingProductIndex].discountedPrice * cartItems[existingProductIndex].quantity :
            cartItems[existingProductIndex].price * cartItems[existingProductIndex].quantity;
            cartItems[existingProductIndex].totalPrice = parseFloat(cartItems[existingProductIndex].totalPrice.toFixed(2));
        } else {
            // Add the product to cart
            product.quantity = quantity;
            product.totalPrice = product.discountedPrice ? product.discountedPrice * quantity : product.price * quantity;
            product.totalPrice = parseFloat(product.totalPrice.toFixed(2));
            cartItems.push(product);
        }

        // Update cart items in local storage
        localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems));

        // Calculate and update cart total
        calculateCartTotals();

        toast.success('Product added to cart');
    };

// Handle Remove From Cart
export const handleRemoveFromCart = productId => {
    const cartItems = JSON.parse(localStorage.getItem('CART_ITEMS'));
    const newCartItems = cartItems.filter(item => item._id !== productId);
    localStorage.setItem('CART_ITEMS', JSON.stringify(newCartItems));
    calculateCartTotal()
    console.log(productId + " removed");
};

// export  const calculateCartTotal = () => {
//         const cartItems = JSON.parse(localStorage.getItem('CART_ITEMS'));
//         // const cartItems = cart.cartItems;

//         let total = 0;

//         cartItems.map(item => {
//             total += item?.discountedPrice ? item?.discountedPrice * item.quantity : item.price * item.quantity;
//         });

//         total = parseFloat(total.toFixed(2));
//         localStorage.setItem("CART_TOTAL", total);

//         return total;
//     };

export const calculateCartTotal = () => {
    const cartItems = JSON.parse(localStorage.getItem('CART_ITEMS'));

    if (!cartItems || cartItems.length === 0) {
        localStorage.setItem("CART_TOTAL", "0");
        return 0;
    }

    let total = 0;

    cartItems.forEach(item => {
        total += item?.discountedPrice ? item?.discountedPrice * item.quantity : item.price * item.quantity;
    });

    total = parseFloat(total.toFixed(2));
    localStorage.setItem("CART_TOTAL", total.toString());

    return total;
};

// set cart store from local storage
export const handleCart = (setCartItems,setCartTotal,setCartId) => {
    const storedCartItems = JSON.parse(localStorage.getItem('CART_ITEMS'));
    const storedCartTotal = localStorage.getItem('CART_TOTAL');
    const storedCartId = localStorage.getItem("CART_ID");

    if (storedCartItems) {
        setCartItems(storedCartItems);
        setCartTotal(storedCartTotal);
        setCartId(storedCartId);
        calculateCartTotal(); // This might need adjustments depending on its functionality
    }
  };
export const toggleSidebar = () => {
        document.getElementById('my-drawer-4').click();
        // setIsOpen(!isOpen); // Toggle isOpen state
  console.log('clicked');
};
    
export const handleCheckout = (navigate,toggleSidebar) => {
    const successfulOptions = {
      title: `Please Login to proceed to checkout`,
      position: 'tr',
      autoDismiss: 1
    };

    toggleSidebar();
    toast.error('Please Login to proceed to checkout');
    navigate('/account');
  };

// Continue shopping use case
export const handleShopping = (navigate) => {
  navigate('/shop');
    toggleSidebar()
  };

// create cart id api
export const getCartId = async () => {
    try {
      const cartId = localStorage.getItem("CART_ID");
      const cartItems = JSON.parse(localStorage.getItem("CART_ITEMS"));
      const products = getCartItems(cartItems);

      if (!cartId) {
        const response = await postData(`cart/add`, { products });
        setCartIdLocally(response.data.cartId);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const setCartIdLocally = cartId => {
    localStorage.setItem("CART_ID", cartId);
};

export const clearCart = (setCartItems,setCartTotal,setCartId) => {
    localStorage.removeItem('CART_ITEMS');
    localStorage.removeItem("CART_TOTAL");
    localStorage.removeItem("CART_ID");

    setCartItems([]);
    setCartTotal(0);
    setCartId('');
};

// const getCartItems = cartItems => {
//   const newCartItems = [];
//   cartItems.map(item => {
//     const newItem = {};
//     newItem.quantity = item.quantity;
//     newItem.price = item.price;
//     newItem.taxable = item?.taxable;
//     newItem.product = item._id;
//     newCartItems.push(newItem);
//   });

//   return newCartItems;
// };

export const getCartItems = (cartItems) => {
  const newCartItems = [];
  cartItems.map(item => {
    const newItem = {};
    newItem.quantity = item.quantity;
    newItem.productId = item._id;
      newItem.purchasedPrice = item?.discountedPrice ? item?.discountedPrice : item?.price;
    newItem.totalPrice = item.totalPrice;
    newItem.taxable = item?.taxable;
    newItem.product = item._id;
    newCartItems.push(newItem);
  });

  return newCartItems;
};

const calculatePurchaseQuantity = inventory => {
  if (inventory <= 25) {
    return 1;
  } else if (inventory > 25 && inventory <= 100) {
    return 5;
  } else if (inventory > 100 && inventory < 500) {
    return 25;
  } else {
    return 50;
  }
};