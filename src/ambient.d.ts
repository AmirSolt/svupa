

interface Profile{
    first_name:string|null
    last_name:string|null
    wallet:Wallet
}


interface Wallet{
    customer_id:string|null
    subscription_id:string|null
}

interface TokenConfirmEvent{
    email:string
    redirectPath:string
}
