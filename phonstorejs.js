addOrder();
function addOrder() {
    axios.get("http://localhost:8080/products").then((response) => {
        let list = response.data;
        let searchInput = document.querySelector('.search-area .search-bar input');
        searchInput.addEventListener('input', function(e){
            let txtSearch = e.target.value.trim().toLowerCase();
            let products = document.querySelector('.search-result')
            products.innerHTML=``;
            for (let i = 0; i < list.length; i++) {
                let newProduct = document.createElement('div');
                newProduct.classList.add('suggest-search');
                if (list[i].name.toLowerCase().includes(txtSearch) && (txtSearch !== '')) {
                    newProduct.innerHTML=`<img src="${list[i].image}">
                                          <div class="info" onclick="addToCart(${list[i].id})">
                                            <div>${list[i].name}</div>
                                            <div>Giá: ${list[i].price}</div>
                                            <div>Tồn kho: ${list[i].quantity}</div>
                                          </div>` ;
                    products.appendChild(newProduct);
                }
                else {
                    newProduct.classList.add('hide');
                }
            }
        })
    })
}
let html = '';
let count = 0;
function addToCart(id) {
    axios.get(`http://localhost:8080/products/${id}`).then ((response) => {
        let product = response.data;
        count++;
        html +=`<div class="infor">
<i class="fa-solid fa-trash"></i>
                   <span>${product.name}</span>
                   <input type="text" value="1">
                   <span>${product.price}</span>   
 </div>` ;

    })
    document.getElementById('cart').innerHTML = html;
}
function saleReport() {}
