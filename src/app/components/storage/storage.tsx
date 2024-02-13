"use client";

export default function storage() {
    function checkStorage() {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            if (!localStorage.getItem("cart_products")) {
                localStorage.setItem("cart_products", "[]");
            }
        }
    }
    
    function getStorage() {
        checkStorage();
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const storageData = localStorage.getItem("cart_products");
            if (storageData !== null) {
                return JSON.parse(storageData);
            }
        }
        return [];
    }
    
    function setStorage(data:any) {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.setItem("cart_products", JSON.stringify(data));
        }
    }
    
    return {
        check: checkStorage,
        get: getStorage,
        put: setStorage
    }
}
