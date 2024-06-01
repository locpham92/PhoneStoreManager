addOrder();
function addOrder() {
    axios.get("http://localhost:8080/products").then((response) => {
        const now = new Date();
        const formattedDate = now.toLocaleString();
        document.getElementById("time").innerHTML = formattedDate;
        let list = response.data;
        let searchInput = document.querySelector('.search-area .search-bar input');
        searchInput.addEventListener('input', function(e){
            let txtSearch = e.target.value.trim().toLowerCase();
            let products = document.querySelector('.search-result');
            if (txtSearch) {}
            products.innerHTML=``;
            for (let i = 0; i < list.length; i++) {
                let newProduct = document.createElement('div');
                newProduct.classList.add('suggest-search');
                if (list[i].name.toLowerCase().includes(txtSearch) && (txtSearch !== '')) {
                    newProduct.innerHTML=`<div class="info" onclick="addToCart(${list[i].id})">
                                          <div><img src="${list[i].image}"></div>
                                          <div>${list[i].name}</div>
                                          <div>Giá: ${list[i].price}</div>
                                          <div>Tồn kho: ${list[i].quantity}</div>
                                          </div>` ;
                    products.style.display = 'block';
                    products.appendChild(newProduct);

                }
                else {
                    products.style.display = 'none';
                    newProduct.classList.add('hide');
                }
            }
            document.addEventListener('click', function (event) {
                if (!searchInput.contains(event.target) && !products.contains(event.target)) {
                    products.style.display = 'none';
                }
            })
        })
    })
}
let html = '';
let count = 0;
let products = [];
function addToCart(id) {

    axios.get(`http://localhost:8080/products/${id}`).then ((response) => {
        let product = response.data;
        let name = product.name;
        let price = product.price;
        let quantity = 1;
        count++;
        html +=`   <div class="infor">
                   <button class="trash"><i class="fa-solid fa-trash"></i></button>
                   <span>${count}. ${product.name}</span>
                   <input type="text" value="1">
                   <span>${product.price}</span>   
 </div>` ;
        products.push(product);

    })
    document.getElementById('cart').innerHTML = html;
}

function makeOrder() {
    const now = new Date();
    const formattedDate = now.toLocaleString();
    let total = 0;
    let customerName = '';
    let customerPhone = '';

    let newOrder = {
        "time": formattedDate,
        "total": total,
        "customerName": quantity,
        "customerPhone": image,
    }
    axios.put(`http://localhost:8080/orders/`).then((response) => {
        makeOrderDetail();
    });

}
function makeOrderDetail() {
    axios.put(`http://localhost:8080/orders/`).then((response) => {
        let orderList = response.data;
        let orderId = orderList[i].orderId;
    });

}
function confirmOrder() {
    let confirm = document.querySelector('.confirm');
    confirm.style.display = 'block';
}
function addCustomer() {

}
