import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import '../../sass/components/_about.scss';

function About() {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await API.get('/about');
                setAboutData(response.data);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };

        fetchAboutData();
    }, []);

    if (!aboutData) return <div>Loading...</div>;

    return (
        <div className="about-container">
            <div className="about-card">
                <h1>{aboutData.title}</h1>
                <p>{aboutData.description}</p>
                <h2>Features</h2>
                <ul>
                    {aboutData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <p>Version: {aboutData.version}</p>
            </div>
        </div>
    );
}

export default About;
