import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [itemId, setItemId] = useState(null);

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            setMethod("POST");
        } else if (method === "DELETE") {
            setConfig({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            setMethod("DELETE");
            setItemId(data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json);
                setError(null);
            } catch (error) {
                setError("Houve algum erro ao carregar os dados!");
            }
            setLoading(false);
        };
        fetchData();
    }, [url, callFetch]);

    useEffect(() => {
        const httpRequest = async () => {
            if (method) {
                setLoading(true);
                try {
                    let fetchOptions = [url, config];
                    if (method === "DELETE") {
                        const deleteUrl = `${url}/${itemId}`;
                        fetchOptions = [deleteUrl, config];
                    }
                    const res = await fetch(...fetchOptions);
                    const json = await res.json();
                    setCallFetch(!callFetch);  // Trigger a re-fetch
                } catch (error) {
                    setError("Houve algum erro na requisição!");
                }
                setLoading(false);
                setMethod(null);
            }
        };
        httpRequest();
    }, [config]);

    return { data, httpConfig, loading, error };
};
