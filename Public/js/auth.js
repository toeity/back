function hasLogin(){
    const user = localStorage.getItem('user');
    
    if(!user){
        window.location.href = "/login";
    }
}

function logout(){
    console.log('logout...');
    localStorage.removeItem('user');
    localStorage.clear();
    window.location.href = "/login";
}
