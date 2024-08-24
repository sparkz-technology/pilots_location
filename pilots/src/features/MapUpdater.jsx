/* eslint-disable react/prop-types */
import { memo, useEffect } from "react";
import { useMap } from "react-leaflet";

const MapUpdater = memo(({ center }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.flyTo(center, 13);
        }
    }, [center, map]);

    return null;
});

MapUpdater.displayName = 'MapUpdater';

export default MapUpdater;