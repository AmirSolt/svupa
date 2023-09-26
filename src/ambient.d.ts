

interface Profile{
    first_name:string|null
    last_name:string|null
    wallet:Wallet
}


interface Wallet{
    product_id:string|null
}

interface TokenConfirmEvent{
    email:string
    redirectPath:string
}
