let products =[];
const cart = {};

const updateCart = () => {
    let totalPrice = 0;
    document.querySelector('#cartSummary_items').replaceChildren([]);
    
    for (const key of Object.keys(cart)) {
        const item = products.find((product) => {
            return `${product.id}` === key;
        });

        // console.log(key);  
        // console.log(products);     
        // console.log(item);

        const quantity = cart[key];
        const price = item.price;

        const itemRow = document.createElement('tr');

        const itemName = document.createElement('th');
        itemName.innerText = item.title;

        const itemQuantity = document.createElement('td');
        itemQuantity.innerText = quantity;

        const itemPrice = document.createElement('td');
        itemPrice.innerText = quantity * price;

        itemRow.append(itemName, itemQuantity, itemPrice);
        document.querySelector('#cartSummary_items').append(itemRow);

        totalPrice = totalPrice + price * quantity;
    };

    document.querySelector('#cartSummary_total').innerText = totalPrice;
};

const createCard = (product) => {
    // console.log(product)
    const productCard = document.createElement('div');
    productCard.className = 'productCard';

    const productThumbnail = document.createElement('img');
    productThumbnail.className = 'productThumbnail';
    productThumbnail.src = product.thumbnail;
    // productThumbnail.src = 'https://images.unsplash.com/photo-1695048064978-8475b9f32d58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D';

    const productButtonSheet = document.createElement('div');
    productButtonSheet.className = 'productButtonSheet';

    const productInfoContainer = document.createElement('div');
    productInfoContainer.className = 'productInfoContainer';

    // const productDescription = document.createElement('div');
    // productDescription.className = 'productDescription';
    // productDescription.innerText = product.description;
    // productDescription.innerText = 'An apple mobile which is nothing like apple;'

    const productName = document.createElement('strong');
    productName.className = 'productName';
    productName.innerText = product.title;
    // productName.innerText = 'iPhone 15';

    const productPrice = document.createElement('div');
    productPrice.className = 'productPrice';
    productPrice.innerText = '$' + product.price;
    // productPrice.innerText = `$1370`

    const addToCart = document.createElement('button');
    addToCart.className = 'addToCart';
    addToCart.innerText = `+`;

    addToCart.addEventListener('click', () => {
        //1 {}
        //4 {1: 1}
        if(cart[product.id] === undefined) cart[product.id] = 0;
        //2 {1: 0}
        cart[product.id] = cart[product.id] + 1;
        //3 {1: 0 + 1} -> {1: 1}
        //5 {1: 1 + 1} -> {1: 2}
        updateCart();
    });

    productInfoContainer.append(productName, productPrice);
    // productInfoContainer.append(productDescription, productName, productPrice);
    productButtonSheet.append(productInfoContainer, addToCart);
    productCard.append(productThumbnail, productButtonSheet);

    document.querySelector('#productList').appendChild(productCard);
};

const hookViewCart = () => {
    const viewCartButton = document.querySelector('#viewCart');
    viewCartButton.addEventListener('click', () => {
        // console.log('inside hookViewCart' )
        const cartSummary = document.querySelector('#cartSummary');
        const display = cartSummary.style.display;

        if(display === 'none'){
            cartSummary.style.display = 'block';
        } else {
            cartSummary.style.display = 'none';
        }
    });
};

///////////////////////////////////////////////////////////////////////////
//การดึง API จากข้างนอกมาใช้ ฉบับแบบทดลองของ https://dummyjson.com/products
///////////////////////////////////////////////////////////////////////////
const fetchProduct = () => {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((productResponse) => {
            products = productResponse.products;

            products.forEach(product => {
                createCard(product);
            })
            
        });
};
// สร้างการ์ดโดยใช้ loop ทดลองก่อนที่จะดึง API จากข้างนอกมาใช้
// for (let i = 0; i < 10; i++) {
//     createCard();
// }


fetchProduct();
hookViewCart();