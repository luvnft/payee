import { get, writable } from 'svelte/store'

export const cartItems = writable<CartItem[]>([])

export const addToCart = (id: string) => {
    const items = get(cartItems);
    const itemPosition = items.findIndex(
        (item) => { return item.id == id }
    )

    if (itemPosition !== -1) {
        cartItems.update(() => {
            const updatedItems = items.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            });
            return updatedItems;
        });
    } else {
        cartItems.update(() => {
            return [...items, { id: id, quantity: 1 }]
        })
    }
}