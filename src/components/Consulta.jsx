import React, { useState } from 'react';
import { getLicensePoints } from '../services/getLicensePoints';
import { checkIRSContribution } from '../services/checkIRSContribution';

const CedulaInput = () => {
    const [cedula, setCedula] = useState('');
    const [licensePoints, setLicensePoints] = useState(null);
    const [irsStatus, setIrsStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(null);

    const handleFetchData = async () => {
        setIsLoading(true); // Start loading
        const pointsResponse = await getLicensePoints(cedula);
        const irsContribution = await checkIRSContribution(cedula);

        setLicensePoints(pointsResponse ? pointsResponse.puntos : 'No disponible');
        setIrsStatus(irsContribution === 'true' ? "Sí contribuye" : "No contribuye");
        setIsLoading(false); // End loading

        setName(pointsResponse ? pointsResponse.nombre : 'No disponible');
    };

    return (
        <div className='container'>
            <h1 className='title'>Consulta de contribución al SRI y puntos de licencia</h1>
            <div className='form'>
                 {(isLoading) &&
                    <div className="spinner-container">
                        <div className="spinner" />
                    </div>
                }
                <div className='form__input'>
                    <label htmlFor='cedula'>Ingresa tu cédula</label>
                    <input
                        id="cedula"
                        type="text"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        placeholder="Ingresa tu cédula"
                        maxLength={10}
                    />
                </div>
                
                <button onClick={handleFetchData}>Consultar</button>

                <div className='response'>
                    {licensePoints && <p>Puntos en la licencia: <strong>{licensePoints}</strong></p>}
                    {irsStatus && <p>¿Contribuye al SRI?: <strong>{irsStatus}</strong></p>}
                    {name && <p>Nombre: <strong>{name}</strong></p>}
                </div>
            </div>
        </div>
    );
};

export default CedulaInput;
