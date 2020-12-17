import React, { useEffect } from "react";

import Navigation from '../../components/Navigation'

export default function ISIReceive() {
    useEffect(() => {
        document.title = 'Receive ISI - Mona';
    }, []);

    return (
        <div>
            <Navigation proceed='false' from='/isimenu' />
        </div>
    )
}