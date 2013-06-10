window.onload = function() {
    var polygons = [
        {
            points: [
                {x: -100, y: 100, z: 100},
                {x: 100, y: 100, z: 100},
                {x: 100, y: -100, z: 100},
                {x: -100, y: -100, z: 100}
            ],
            color: 'blue',
        },
        {
            points: [
                {x: -100, y: 100, z: -100},
                {x: 100, y: 100, z: -100},
                {x: 100, y: -100, z: -100},
                {x: -100, y: -100, z: -100}
            ],
            color: 'brown',
        },
        {
            points: [
                {x: -100, y: 100, z: 100},
                {x: 100, y: 100, z: 100},
                {x: 100, y: 100, z: -100},
                {x: -100, y: 100, z: -100}
            ],
            color: 'yellow',
        },
        {
            points: [
                {x: -100, y: -100, z: 100},
                {x: 100, y: -100, z: 100},
                {x: 100, y: -100, z: -100},
                {x: -100, y: -100, z: -100}
            ],
            color: 'orange',
        },
        {
            points: [
                {x: 100, y: -100, z: 100},
                {x: 100, y: 100, z: 100},
                {x: 100, y: 100, z: -100},
                {x: 100, y: -100, z: -100}
            ],
            color: 'red',
        },
        {
            points: [
                {x: -100, y: -100, z: 100},
                {x: -100, y: 100, z: 100},
                {x: -100, y: 100, z: -100},
                {x: -100, y: -100, z: -100}
            ],
            color: 'purple',
        }
    ],
    interval;

    svg3d.init('svg', polygons);

    interval = window.setInterval(function() {
        svg3d.rotation = {
            x: svg3d.rotation.x + 1,
            y: svg3d.rotation.y + 1,
            z: svg3d.rotation.z + 1 
        };

        svg3d.updatePolygons();
    }, 33);
};
