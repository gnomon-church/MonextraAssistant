import React, { useEffect } from "react";

import Navigation from '../../components/Navigation'

export default function ISISignOut() {
    useEffect(() => {
        document.title = 'Sign Out ISI - Mona';
    }, []);

    return (
        <div>
            <Navigation proceed='false' from='/isimenu' />
        </div>
    )
}