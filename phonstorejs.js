let products = [];
addOrder();
function addOrder() {
    axios.get("http://localhost:8080/products").then((response) => {
        const now = new Date();
        const formattedDate = now.toLocaleString();
        document.getElementById("time").innerText = formattedDate;
        let list = response.data;
        let searchInput = document.getElementById('search');
        searchInput.addEventListener('input', function(e){
            let txtSearch = e.target.value.trim().toLowerCase();
            let products = document.getElementById('search-result');
            if (txtSearch) {}
            products.innerHTML=``;
            for (let i = 0; i < list.length; i++) {
                let newProduct = document.createElement('div');
                newProduct.classList.add('suggest-search');
                if (list[i].name.toLowerCase().contains(txtSearch) && (txtSearch !== '')) {
                    newProduct.innerHTML=`<div class="info" id="info${list[i].id}" onclick="addToCart(${list[i].id})">
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

function addToCart(productId) {
    axios.get("http://localhost:8080/products").then((response) => {
        let list = response.data;
        let product = list.find(item => item.id === productId);
        if (product) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === productId) {
                    return;
                }
            }
            products.push(product);
            displayCart();
        }
    });
}

function displayCart() {
    let cartElement = document.getElementById('cart');
    cartElement.innerHTML = ``;
    products.forEach((item, index) => {
        let cartItem = document.createElement('div');
        cartItem.id = `infor${index}`;
        cartItem.innerHTML = `
                <div class="product">
                <div><button class="trash" onclick="deleteCart(${index})"><i class="fa-solid fa-trash"></i></button></div>
                   <div class="name">${item.name}</div>
                   <div class="s">
                   <div>
                     <button class="sub" onclick="subC(${index})"><i class="fa-solid fa-minus"></i></button>
                   </div>
                   <div><input value="1" id="quantityOnCart${index}"></div>
                   <div>
                   <button class="add" onclick="addC(${index})"><i class="fa-solid fa-plus"></i></button>
                   </div> 
                   </div>
                   <div id="price${index}">${item.price}</div>
                </div>`;
        cartElement.appendChild(cartItem);
    });
    totalCart();
}

function deleteCart(index) {
    products.splice(index, 1);
    displayCart();
}

function totalCart() {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        let amount = parseFloat(document.getElementById(`quantityOnCart${i}`).value);
        total += (products[i].price*amount);
    }
    document.getElementById("totalBefore").innerHTML = total;
    let discount = 0;
    let dElement = document.getElementById('discount');
    document.getElementById('totalAfter').innerHTML = total;
    dElement.addEventListener('input', event => {
        let discountValue = dElement.value;
        if (discountValue) {
            discount = parseFloat(discountValue);
            if (isNaN(discount)) {
                discount = 0;
            }
        }
        document.getElementById('totalAfter').innerHTML = total-discount;
    });
}

function addC(index) {
    let value = parseInt(document.getElementById(`quantityOnCart${index}`).value);
    document.getElementById(`quantityOnCart${index}`).value = value + 1;
    let price = products[index].price;
    document.getElementById(`price${index}`).innerHTML = price*(value+1);
    totalCart();

}

function subC(index) {
    let value = parseInt(document.getElementById(`quantityOnCart${index}`).value);
    if (value > 1) {document.getElementById(`quantityOnCart${index}`).value = value - 1;}
    let price = products[index].price;
    document.getElementById(`price${index}`).innerHTML = price*(value-1);
    totalCart();
}

function confirmOrder() {
    let confirm = document.querySelector('.confirm');
    confirm.style.display = 'block';

    const now = new Date();
    const formattedDate = now.toLocaleString();
    let total = parseFloat(document.getElementById('totalAfter').innerText);
    let newOrder = {
        "time": formattedDate,
        "total": total,
    }
    let orderId = 0;
    axios.post("http://localhost:8080/orders", newOrder).then((response) => {
       let orderId = response.data;
    for (let i = 0; i < products.length; i++) {
        let productId = products[i].id;
        let amount = parseInt(document.getElementById(`quantityOnCart${i}`).value);
        let newOrderDetail = {
            "orderId": orderId,
            "productId": productId,
            "quantity": amount,
            "customerName": "Loc",
            "customerPhone": "0323243243"
        }
        axios.post("http://localhost:8080/orderdetail", newOrderDetail).then(() => {
        })
    }
    })
}
function finishOrder() {
    let confirm = document.querySelector('.confirm');
    confirm.style.display = 'none';
    location.reload();
}

function saleReport() {
    let overview = document.querySelector('.overview');
    overview.style.display = 'block';
    let totalByDay = 0;
    axios.get("http://localhost:8080/orders").then((response) => {
        let list = response.data;
        let html = `
             <table class="orderTable">
               <tr style="text-align: center; background-color: #99FFFF">
                   <td>ID</td>
                   <td>TIME</td>
                   <td>TOTAL</td>
                   <td>ACTION</td>
               </tr>
            `;
            for (let i =0;i < list.length;i++) {
                totalByDay += list[i].total;
                html += `
                <tr>
                    <td>${list[i].id}</td>
                    <td>${list[i].time}</td>
                    <td>${list[i].total}</td>
                    <td>
                    <button class="detailbtn" onclick="showOrderDetail(${list[i].id})">DETAIL</button>
           
                    </td>
                </tr>`;
            }
        html += `
               <tr style="text-align: center">
                   <td></td>
                   <td>TOTAL</td>
                   <td>${totalByDay}</td>
                   <td></td>
               </tr>
            `;
            html += `</table>`;
            document.getElementById("orderList").innerHTML = html;
        });
}
function showOrderDetail(index) {
    let orderDetail = document.querySelector('.orderDetail');
    orderDetail.style.display = 'block';
    axios.get(`http://localhost:8080/orderdetail/${index}`).then((response) => {
        let list = response.data;
        console.log(list);
        let html = `
             <table class="orderTable">
               <tr style="text-align: center; background-color: #99FFFF">
                   <td>ID</td>
                   <td>NAME</td>
                   <td>QUANTITY</td>
               </tr>
            `;
        for (let i =0;i < list.length;i++) {
            html += `
                <tr>
                    <td>${list[i].id}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].quantity}</td>
                </tr>`;
        }
        document.getElementById("orderDetail").innerHTML = html;
    });
}

function close1() {
    let overview = document.querySelector('.overview');
    overview.style.display = 'none';
}

function close2() {
    let orderDetail = document.querySelector('.orderDetail');
    orderDetail.style.display = 'none';
}
