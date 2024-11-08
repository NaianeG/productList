import './App.css';
import { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

function App() {
    const [products, setProducts] = useState([]);
    const url = "http://localhost:3000/products";
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const { data: items, httpConfig, loading, error } = useFetch(url);

    useEffect(() => {
        if (items) setProducts(items);
    }, [items]);

    const handlleSubmit = async (e) => {
        e.preventDefault();
        const product = { name, price };
        httpConfig(product, "POST");
        setName("");
        setPrice("");
    };

    const handleRemove = (id) => {
        httpConfig(id, "DELETE");
    };

    return (
        <div className="App">
            <h1>Lista de Produtos</h1>
            {loading && <p>Carregando dados...</p>}
            {error && <p>{error}</p>}
            {!loading && (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            {product.name} - R$: {product.price}
                            <button onClick={() => handleRemove(product.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            )}
            <div className='add-product'>
                <form onSubmit={handlleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Preço:
                        <input
                            type="text"
                            value={price}
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    {loading ? <input type="submit" disabled value="Aguarde" /> : <input type="submit" value="Criar" />}
                </form>
            </div>
        </div>
    );
}

export default App;
