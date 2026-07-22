const SUPABASE_URL = "https://ukxxmxnubxjezkwbbxdr.supabase.co";

const SUPABASE_KEY = "sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


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
