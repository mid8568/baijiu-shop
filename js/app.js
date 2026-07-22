const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";



const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);





async function loadProducts(){



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



<p class="desc">

${item.description}

</p>



<p class="price">

¥${item.price}

</p>



<a href="product.html?id=${item.id}">

<button>

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




loadProducts();
