var svg3d = {
    svg_namespace: "http://www.w3.org/2000/svg",
    svg_container: null,
    current_order: '',

    rotation: {
        x: 0,
        y: 0,
        z: 0 
    },
    polygons: [
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

    convertDegreesToRadians: function(degree) {
        return degree * Math.PI / 180;
    },

    moveToFocus: function(point) {
        return {
            x: point.x + 400,
            y: point.y + 200,
        };
    },

    rotatePoint: function(point) {
        var rad_x = this.convertDegreesToRadians(this.rotation.x),
            rad_y = this.convertDegreesToRadians(this.rotation.y),
            rad_z = this.convertDegreesToRadians(this.rotation.z),
            cos   = Math.cos,
            sin   = Math.sin,
            cos_rad_x = cos(rad_x),
            cos_rad_y = cos(rad_y),
            cos_rad_z = cos(rad_z),
            sin_rad_x = sin(rad_x),
            sin_rad_y = sin(rad_y),
            sin_rad_z = sin(rad_z);

        return {
            x: point.x * cos_rad_z * cos_rad_y + point.y * (cos_rad_z * sin_rad_y * sin_rad_x - sin_rad_z * cos_rad_x) + point.z * (sin_rad_z * sin_rad_y + cos_rad_x * cos_rad_z * sin_rad_y),
            y: point.x * sin_rad_z * cos_rad_y + point.y * (cos_rad_z * cos_rad_x + sin_rad_z * sin_rad_y * sin_rad_x) + point.z * (sin_rad_z * sin_rad_y * cos_rad_x - cos_rad_z * sin_rad_x),
            z: point.x * -sin_rad_y + point.y * (cos_rad_y * sin_rad_x) + point.z * cos_rad_y * cos_rad_x
        };
    },

    perspectivizePoint: function(point) {
        return {
            x: (400 * point.x / (point.z + 400)),
            y: (400 * point.y / (point.z + 400))
        };
    },

    convert3dTo2d: function(point) {
        var translated;

        translated = this.perspectivizePoint(point);
        translated = this.moveToFocus(translated);

        return translated;
    },

    Polygon: function(points, fill, stroke, id) {
        var element = document.createElementNS(svg3d.svg_namespace, 'polygon');

        this.base_points = points;

        if (fill) {
            element.setAttributeNS(null, 'fill', fill);
        }

        if (stroke) {
            element.setAttributeNS(null, 'stroke', stroke);
        }

        this.element = element;
        this.z_index = null;
        this.id      = id;

        this.updatePosition();
    },

    initialized: false,

    initDom: function(svg_element_id) {
        var svg = document.getElementById(svg_element_id),
            i,
            temp;

        if (this.initialized) {
            throw new Error('Already initialized');
        }

        if (!svg) {
            throw new Error('No SVG element present or bad id: ' + svg_element_id);
        }

        this.init();

        for (i = this.polygons.length; i; --i) {
            this.polygons[i - 1] = new svg3d.Polygon(this.polygons[i - 1].points, this.polygons[i - 1].color, null, i);
            svg.appendChild(this.polygons[i - 1].getDOMElement());
        }

        this.initialized = true;
        this.svg_container = svg;
    },

    init: function() {
        svg3d.Polygon.prototype.getDOMElement = function() {
            return this.element;
        };

        svg3d.Polygon.prototype.makePointsString = function() {
            var pairs = [],
                i,
                base_points    = this.base_points,
                current_points = [],
                length         = base_points.length,
                temp;

            for (i = 0, length = base_points.length; i < length; i++) {
                temp = svg3d.rotatePoint(base_points[i]);
                current_points.push(temp);

                temp = svg3d.convert3dTo2d(temp);
                pairs.push(temp.x + ',' + temp.y);
            }

            this.current_points = current_points;
            return pairs.join(" ");
        };

        svg3d.Polygon.prototype.updatePosition = function() {
            this.element.setAttributeNS(null, 'points', this.makePointsString());
            this.z_index = null;
        };

        svg3d.Polygon.prototype.getZIndex = function() {
            var i,
                length,
                temp = 0;

            if (this.z_index) {
                return this.z_index;
            }

            for (i = 0, length = this.current_points.length; i < length; ++i) {
                temp -= this.current_points[i].z;
            }

            this.z_index = temp;
            return this.z_index;
        };

        svg3d.Polygon.prototype.getId = function() {
            return this.id;
        };
    },

    reorderPolygons: function() {
        var polygons = this.polygons
            new_order = [],
            check = '';

        polygons.sort(function(a, b) {
            return a.getZIndex() < b.getZIndex() ? -1 : 1;
        });

        for (var i = 0, length = polygons.length; i < length; ++i) {
            check += polygons[i].getId() + '-' + i;
        }

        if (check === this.current_order) {
            return;
        }

        this.current_order = check;

        for (var i = polygons.length; i; --i) {
            new_order.push(this.svg_container.removeChild(polygons[i - 1].getDOMElement()));
        }

        while (new_order.length) {
            this.svg_container.appendChild(new_order.pop());
        }
    },

    updatePolygons: function() {
        var polygons = this.polygons,
            i;

        for (i = polygons.length; i; --i) {
            polygons[i - 1].updatePosition();
        }

        this.reorderPolygons();
    }
};

window.onload = function() {
    svg3d.initDom('svg');

    var interval = window.setInterval(function() {
        svg3d.rotation = {
            x: svg3d.rotation.x + 1,
            y: svg3d.rotation.y + 1,
            z: svg3d.rotation.z + 1 
        };

        svg3d.updatePolygons();
    }, 33);
};
