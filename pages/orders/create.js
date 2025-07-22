import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function CreateOrder() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [orderData, setOrderData] = useState({
        title: '',
        description: '',
        price: 0
    })

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (!session) {
        router.push('/auth/signin')
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...orderData,
                userId: session.user.id
            }),
        })

        if (response.ok) {
            router.push('/orders')
        }
    }

    return (
        <div className="order-form">
            <h2>Create New Order</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Service Title:
                    <input
                        value={orderData.title}
                        onChange={(e) => setOrderData({...orderData, title: e.target.value})}
                        required
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        value={orderData.description}
                        onChange={(e) => setOrderData({...orderData, description: e.target.value})}
                        required
                    />
                </label>

                <label>
                    Price ($):
                    <input
                        type="number"
                        value={orderData.price}
                        onChange={(e) => setOrderData({...orderData, price: e.target.value})}
                        min="0"
                        required
                    />
                </label>

                <button type="submit">Create Order</button>
            </form>
        </div>
    )
}