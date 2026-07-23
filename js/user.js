const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";



const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);








// =================
// 用户注册
// =================


async function registerUser(){



const email =
document.getElementById(
"email"
).value.trim();



const password =
document.getElementById(
"password"
).value.trim();






if(!email || !password){


alert(
"请输入邮箱和密码"
);


return;


}







const {data,error}=await client.auth.signUp({

email,

password

});







if(error){


alert(
"注册失败:"
+
error.message
);


return;


}







alert(
"注册成功"
);





location.href =
"user-login.html";



}











// =================
// 用户登录
// =================


async function loginUser(){





const email =
document.getElementById(
"email"
).value.trim();





const password =
document.getElementById(
"password"
).value.trim();







if(!email || !password){


alert(
"请输入邮箱和密码"
);


return;


}







const {data,error}=await client.auth
.signInWithPassword({

email,

password

});






if(error){


alert(

"登录失败:"
+
error.message

);


return;


}






console.log(

"当前用户:",
data.user

);






alert(
"登录成功"
);





location.href =
"cart.html";



}










// =================
// 获取当前用户
// =================


async function getUser(){



const {data}=await client.auth.getUser();



return data.user;



}









// =================
// 退出登录
// =================


async function logoutUser(){



await client.auth.signOut();



location.href =
"index.html";



}
