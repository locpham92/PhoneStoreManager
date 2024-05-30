
// function showHome() {
//     axios.get("http://localhost:8080orders").then ((response) => {
//         let list = response.data;
//         let html = `<table>
//         <tr>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//         </tr>`
//         for (let i = 0; i < list.length; i++) {
//             html += `
//             `
//         }
//     })
// }
// function showFormAdd() {
//     axios.get('http://localhost:8080/brands').then((response) => {
//         let brand = response.data;
//         let html = `<select id="brand">`;
//         for (let i = 0; i < brand.length; i++) {
//             html += `<option value="${list[i].id}">${list[i].name}</option>`;
//         }
//         html += `</select>`;
//         document.getElementById("root").innerHTML = `
//         <input
//         ${html}
//         <button onclick="add()">Enter</button>
//         `
//     })
//
// }
// function add() {
//     let brand = document.getElementById("name").value;
//
//     let newOrder = {
//         "name":name,
//         "brand" :
//             {
//                 id: brandId
//             }
//     }
//     axios.post("http://localhost:8080/orders").then((response) => {
//     showHome();
//     })
// }
// function saleReport() {
//     axios.get("http://localhost:8080/sales").then((response) => {
//
//     })
// }
addOrder();
function addOrder() {
    axios.get("http://localhost:8080/products").then((response) => {
        let list = response.data;
        var searchInput = document.querySelector('.search-area .search-bar input')
        searchInput.addEventListener('input', function(e){
            let txtSearch = e.target.value.trim().toLowerCase();
            var products = document.querySelector('.search-result')
            products.innerHTML=``;
            var newProduct = document.createElement('div');
            newProduct.classList.add('suggest-search');
            for (let i = 0; i < list.length; i++) {
                if (list[i].name.toLowerCase().includes(txtSearch)) {
                    newProduct.innerHTML=`<img src="${list[i].image}">
                                          <div class="info">
                                            <div>${list[i].name}</div>
                                            <div>Giá: ${list[i].price}</div>
                                            <div>Tồn kho: ${list[i].quantity}</div>
                                          </div>` ;
                }
                else {
                    newProduct.classList.add('hide');
                }
                products.appendChild(newProduct);
            }
            // list.forEach(item => {
            //     if(item.name.toLowerCase().includes(txtSearch)) {
            //         document.getElementById("cart").innerHTML = item.name;
            //     }
            //     else {
            //         document.getElementById("cart").innerHTML = "Không tìm thấy";
            //     }
            // })
        })
    })
}
function cart() {
    console.log("1");
}
