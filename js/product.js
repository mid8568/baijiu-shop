const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);




// 获取商品ID

const params =
new URLSearchParams(
window.location.search
);


const id =
params.get("id");





async function loadProduct(){



const {data,error}=await client
.from("products")
.select("*")
.eq("id",id)
.single();




if(error){

document.getElementById(
"product-detail"
).innerHTML=
"商品不存在";


return;

}




document.getElementById(
"product-detail"
).innerHTML=
`

<img src="${data.image}">


<div>


<h1>

${data.name}

</h1>


<p class="price">

¥${data.price}

</p>


<p>

${data.description}

</p>


<p>

库存：
${data.stock}

</p>


<button>

立即购买

</button>


</div>


`;



}



loadProduct();
function addCart(){


let cart =
JSON.parse(
localStorage.getItem("cart")
||
"[]"
);



cart.push({

id:id

});



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



alert("已加入购物车");


}
