import React, { useEffect } from "react";

import Navigation from '../../components/Navigation'

export default function ISIManage() {
    useEffect(() => {
        document.title = 'Manage ISI Types - Mona';
    }, []);

    return (
        <div>
            <Navigation proceed='false' from='/isimenu' />
        </div>
    )
}