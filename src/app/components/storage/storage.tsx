

export default function storage(){
    function checkStorage(){
        if(!localStorage.getItem("cart_products")){
            localStorage.setItem("cart_products", "[]");
        }
    }
    
    function getStorage(){
        checkStorage();
        const storageData = localStorage.getItem("cart_products");
        if (storageData !== null) {
            return JSON.parse(storageData);
        }
        return [];
    }
    
    function setStorage(data : any){
        localStorage.setItem("cart_products", JSON.stringify(data));
    }
    
    return {
        check: checkStorage,
        get: getStorage,
        put: setStorage
        
    }
}