const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);




// 注册

async function registerUser(){


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



const {error}=await client.auth.signUp({

email,

password

});



if(error){

alert(error.message);

return;

}



alert("注册成功，请登录");

}




// 登录

async function loginUser(){


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



const {error}=await client.auth.signInWithPassword({

email,

password

});



if(error){

alert(error.message);

return;

}



alert("登录成功");


location.href="index.html";


}
