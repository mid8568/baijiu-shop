const SUPABASE_URL="https://ukxxmxnubxjezkwbbxdr.supabase.co";

const SUPABASE_KEY="sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client=supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);



async function addProduct(){


let product={

name:
document.querySelector("#name").value,


price:
document.querySelector("#price").value,


image:
document.querySelector("#image").value,


description:
document.querySelector("#description").value,


stock:
document.querySelector("#stock").value

};



let {error}=await client
.from("products")
.insert(product);



if(error){

alert(error.message);

}else{

alert("添加成功");

loadProducts();

}


}





async function loadProducts(){


let {data}=await client
.from("products")
.select("*");



let box=document.querySelector("#list");


box.innerHTML="";


data.forEach(item=>{


box.innerHTML+=`

<div>

<h3>
${item.name}
</h3>

<p>
价格：${item.price}
</p>


<button onclick="deleteProduct(${item.id})">

删除

</button>


</div>

<hr>

`;

});


}





async function deleteProduct(id){


await client
.from("products")
.delete()
.eq("id",id);



loadProducts();


}



loadProducts();
