import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Helmet } from 'react-helmet-async';

const Wrapper = ({ children, doc }) => (
    <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <link
                rel="icon"
                type="image/png"
                href="https://chonky.io/chonky-sphere-v2.png"
            />
        </Helmet>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </React.Fragment>
);

export default Wrapper;
