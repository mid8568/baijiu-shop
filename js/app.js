// =========================
// Supabase配置
// =========================


const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";



const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);





let allProducts=[];





// =========================
// 加载商品
// =========================


async function loadProducts(){



document.getElementById(
"product-list"
).innerHTML=
"商品加载中...";




const {data,error}=await client
.from("products")
.select("*")
.order(
"id",
{
ascending:false
}
);




if(error){


console.log(error);


document.getElementById(
"product-list"
).innerHTML=
"商品加载失败";


return;


}





allProducts=data;



showProducts(
allProducts
);



}









// =========================
// 显示商品
// =========================


function showProducts(list){



let html="";





if(list.length===0){


html=
"<h3>暂无商品</h3>";


document.getElementById(
"product-list"
).innerHTML=html;


return;


}





list.forEach(item=>{



let stockText =
item.stock>0
?
"库存:"+item.stock
:
"已售罄";




html+=`


<div class="card">



<img src="${item.image}">





<h3>

${item.name}

</h3>





<p>

分类：

${item.category || "白酒"}

</p>





<p class="desc">

${item.description || ""}

</p>





<p class="price">

¥${item.price}

</p>





<p>

${stockText}

</p>




<a href="product.html?id=${item.id}">


<button
${item.stock<=0?"disabled":""}
>

查看商品

</button>


</a>




</div>


`;




});






document.getElementById(
"product-list"
).innerHTML=html;



}









// =========================
// 分类筛选
// =========================


function filterProducts(category){



if(category==="全部"){


showProducts(
allProducts
);


return;


}





const result =
allProducts.filter(
item=>
item.category===category
);



showProducts(
result
);



}









// =========================
// 搜索
// =========================


function searchProducts(){



const key =
document.getElementById(
"search"
).value.trim();




const result =
allProducts.filter(
item=>



item.name.includes(key)
||
(item.description &&
item.description.includes(key))
||
(item.category &&
item.category.includes(key))



);



showProducts(
result
);



}









// =========================
// 价格排序
// =========================


function sortPrice(type){



let result=[...allProducts];



if(type==="low"){


result.sort(
(a,b)=>
a.price-b.price
);


}



if(type==="high"){


result.sort(
(a,b)=>
b.price-a.price
);


}



showProducts(
result
);



}








loadProducts();
