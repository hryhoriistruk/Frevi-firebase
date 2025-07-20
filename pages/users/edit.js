import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


export default function EditUserProfile() {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({ name: '', email: '' });

    useEffect(() => {
        if (id) {
            fetch(`/api/users/${id}`)
                .then(res => res.json())
                .then(data => setFormData(data));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/api/users/profile`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        router.push(`/users/${id}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <button type="submit">Save</button>
        </form>
    );
}