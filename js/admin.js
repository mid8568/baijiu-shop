// 检查管理员登录


async function checkLogin(){


const {data}=await client.auth.getSession();



if(!data.session){


location.href="admin-login.html";


return;


}


}



checkLogin();
const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);



// 添加商品

async function addProduct(){


const product={


name:
document.getElementById("name").value,


price:
Number(
document.getElementById("price").value
),


image:
document.getElementById("image").value,


description:
document.getElementById("description").value,


stock:
Number(
document.getElementById("stock").value
)


};



const {error}=await client
.from("products")
.insert(product);



if(error){

alert(
"添加失败:"
+error.message
);

return;

}



alert("白酒添加成功");


loadProducts();


}



// 加载商品列表

async function loadProducts(){


const {data,error}=await client
.from("products")
.select("*")
.order("id",{ascending:false});



if(error){

console.log(error);

return;

}



let html="";



data.forEach(item=>{


html+=`

<div class="card">


<img src="${item.image}">


<h3>
${item.name}
</h3>


<p>
价格：
¥${item.price}
</p>


<p>
库存：
${item.stock}
</p>


<button onclick="deleteProduct(${item.id})">

删除

</button>


</div>

`;


});



document.getElementById(
"product-list"
).innerHTML=html;



}




// 删除商品


async function deleteProduct(id){



let ok=confirm(
"确定删除这个商品吗?"
);



if(!ok)
return;



const {error}=await client
.from("products")
.delete()
.eq("id",id);



if(error){

alert(error.message);

return;

}



alert("删除成功");


loadProducts();


}




// 页面打开自动加载

loadProducts();
async function logout(){


await client.auth.signOut();



location.href="admin-login.html";


}
