const SUPABASE_URL = "你的Supabase地址";

const SUPABASE_KEY = "你的anon key";


const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


async function getProduct(){


let id = new URLSearchParams(
window.location.search
).get("id");



const {data,error}=await client
.from("products")
.select("*")
.eq("id",id)
.single();



if(error){

console.log(error);
return;

}



document.querySelector("#name")
.innerHTML=data.name;


document.querySelector("#image")
.src=data.image;


document.querySelector("#price")
.innerHTML="¥"+data.price;


document.querySelector("#desc")
.innerHTML=data.description;


}



getProduct();
