window.onload = function() {
    var polygons = [
        {
            points: [
                {x: -100, y: 100, z: 0},
                {x: 100, y: 100, z: 0},
                {x: 100, y: -100, z: 0},
                {x: -100, y: -100, z: 0}
            ],
            color: 'blue',
        },
        {
            points: [
                {x: -80, y: 80, z: 40},
                {x: 80, y: 80, z: 40},
                {x: 80, y: -80, z: 40},
                {x: -80, y: -80, z: 40}
            ],
            color: 'brown',
        },
        {
            points: [
                {x: -60, y: 60, z: 80},
                {x: 60, y: 60, z: 80},
                {x: 60, y: -60, z: 80},
                {x: -60, y: -60, z: 80}
            ],
            color: 'yellow',
        },
        {
            points: [
                {x: -40, y: 40, z: 120},
                {x: 40, y: 40, z: 120},
                {x: 40, y: -40, z: 120},
                {x: -40, y: -40, z: 120}
            ],
            color: 'orange',
        },
        {
            points: [
                {x: -20, y: 20, z: 160},
                {x: 20, y: 20, z: 160},
                {x: 20, y: -20, z: 160},
                {x: -20, y: -20, z: 160}
            ],
            color: 'red',
        },
        {
            points: [
                {x: -80, y: 80, z: -40},
                {x: 80, y: 80, z: -40},
                {x: 80, y: -80, z: -40},
                {x: -80, y: -80, z: -40}
            ],
            color: 'brown',
        },
        {
            points: [
                {x: -60, y: 60, z: -80},
                {x: 60, y: 60, z: -80},
                {x: 60, y: -60, z: -80},
                {x: -60, y: -60, z: -80}
            ],
            color: 'yellow',
        },
        {
            points: [
                {x: -40, y: 40, z: -120},
                {x: 40, y: 40, z: -120},
                {x: 40, y: -40, z: -120},
                {x: -40, y: -40, z: -120}
            ],
            color: 'orange',
        },
        {
            points: [
                {x: -20, y: 20, z: -160},
                {x: 20, y: 20, z: -160},
                {x: 20, y: -20, z: -160},
                {x: -20, y: -20, z: -160}
            ],
            color: 'red',
        }
    ],
    interval;

    svg3d.init('svg', polygons);

    interval = window.setInterval(function() {
        svg3d.rotation = {
            x: svg3d.rotation.x + 2,
            y: svg3d.rotation.y + 2,
            z: svg3d.rotation.z + 1 
        };

        svg3d.updatePolygons();
    }, 33);
};
