import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Secured = () => {
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/secured');
                setData(response.data);
            } catch (err) {
                setError('Error fetching data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <p>{data}</p>
        </div>
    );
};

export default Secured;
