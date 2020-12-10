import React, { useEffect } from "react";

import Navigation from '../../components/Navigation'

export default function ISIReport() {
    useEffect(() => {
        document.title = 'ISI Reports - Mona';
    }, []);

    return (
        <div>
            <Navigation proceed='false' from='/isimenu' />
        </div>
    )
}