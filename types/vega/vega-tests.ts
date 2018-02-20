import { Spec } from 'vega'

// https://vega.github.io/editor/#/examples/vega/bar-chart
const barChart: Spec ={
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 400,
  "height": 200,
  "padding": 5,

  "data": [
    {
      "name": "table",
      "values": [
        {"category": "A", "amount": 28},
        {"category": "B", "amount": 55},
        {"category": "C", "amount": 43},
        {"category": "D", "amount": 91},
        {"category": "E", "amount": 81},
        {"category": "F", "amount": 53},
        {"category": "G", "amount": 19},
        {"category": "H", "amount": 87}
      ]
    }
  ],

  "signals": [
    {
      "name": "tooltip",
      "value": {},
      "on": [
        {"events": "rect:mouseover", "update": "datum"},
        {"events": "rect:mouseout",  "update": "{}"}
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "table", "field": "category"},
      "range": "width",
      "padding": 0.05,
      "round": true
    },
    {
      "name": "yscale",
      "domain": {"data": "table", "field": "amount"},
      "nice": true,
      "range": "height"
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale" },
    { "orient": "left", "scale": "yscale" }
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data":"table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "category"},
          "width": {"scale": "xscale", "band": 1},
          "y": {"scale": "yscale", "field": "amount"},
          "y2": {"scale": "yscale", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "align": {"value": "center"},
          "baseline": {"value": "bottom"},
          "fill": {"value": "#333"}
        },
        "update": {
          "x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},
          "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
          "text": {"signal": "tooltip.amount"},
          "fillOpacity": [
            {"test": "datum === tooltip", "value": 0},
            {"value": 1}
          ]
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/stacked-bar-chart
const stackedBarChart: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 500,
  "height": 200,
  "padding": 5,

  "data": [
    {
      "name": "table",
      "values": [
        {"x": 0, "y": 28, "c":0}, {"x": 0, "y": 55, "c":1},
        {"x": 1, "y": 43, "c":0}, {"x": 1, "y": 91, "c":1},
        {"x": 2, "y": 81, "c":0}, {"x": 2, "y": 53, "c":1},
        {"x": 3, "y": 19, "c":0}, {"x": 3, "y": 87, "c":1},
        {"x": 4, "y": 52, "c":0}, {"x": 4, "y": 48, "c":1},
        {"x": 5, "y": 24, "c":0}, {"x": 5, "y": 49, "c":1},
        {"x": 6, "y": 87, "c":0}, {"x": 6, "y": 66, "c":1},
        {"x": 7, "y": 17, "c":0}, {"x": 7, "y": 27, "c":1},
        {"x": 8, "y": 68, "c":0}, {"x": 8, "y": 16, "c":1},
        {"x": 9, "y": 49, "c":0}, {"x": 9, "y": 15, "c":1}
      ],
      "transform": [
        {
          "type": "stack",
          "groupby": ["x"],
          "sort": {"field": "c"},
          "field": "y"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "band",
      "range": "width",
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "nice": true, "zero": true,
      "domain": {"data": "table", "field": "y1"}
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": {"data": "table", "field": "c"}
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "x", "zindex": 1},
    {"orient": "left", "scale": "y", "zindex": 1}
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "x": {"scale": "x", "field": "x"},
          "width": {"scale": "x", "band": 1, "offset": -1},
          "y": {"scale": "y", "field": "y0"},
          "y2": {"scale": "y", "field": "y1"},
          "fill": {"scale": "color", "field": "c"}
        },
        "update": {
          "fillOpacity": {"value": 1}
        },
        "hover": {
          "fillOpacity": {"value": 0.5}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/grouped-bar-chart
const groupedBarChart: Spec = 
{
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 300,
  "height": 240,
  "padding": 5,

  "data": [
    {
      "name": "table",
      "values": [
        {"category":"A", "position":0, "value":0.1},
        {"category":"A", "position":1, "value":0.6},
        {"category":"A", "position":2, "value":0.9},
        {"category":"A", "position":3, "value":0.4},
        {"category":"B", "position":0, "value":0.7},
        {"category":"B", "position":1, "value":0.2},
        {"category":"B", "position":2, "value":1.1},
        {"category":"B", "position":3, "value":0.8},
        {"category":"C", "position":0, "value":0.6},
        {"category":"C", "position":1, "value":0.1},
        {"category":"C", "position":2, "value":0.2},
        {"category":"C", "position":3, "value":0.7}
      ]
    }
  ],

  "scales": [
    {
      "name": "yscale",
      "type": "band",
      "domain": {"data": "table", "field": "category"},
      "range": "height",
      "padding": 0.2
    },
    {
      "name": "xscale",
      "type": "linear",
      "domain": {"data": "table", "field": "value"},
      "range": "width",
      "round": true,
      "zero": true,
      "nice": true
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "table", "field": "position"},
      "range": {"scheme": "category20"}
    }
  ],

  "axes": [
    {"orient": "left", "scale": "yscale", "tickSize": 0, "labelPadding": 4, "zindex": 1},
    {"orient": "bottom", "scale": "xscale"}
  ],

  "marks": [
    {
      "type": "group",

      "from": {
        "facet": {
          "data": "table",
          "name": "facet",
          "groupby": "category"
        }
      },

      "encode": {
        "enter": {
          "y": {"scale": "yscale", "field": "category"}
        }
      },

      "signals": [
        {"name": "height", "update": "bandwidth('yscale')"}
      ],

      "scales": [
        {
          "name": "pos",
          "type": "band",
          "range": "height",
          "domain": {"data": "facet", "field": "position"}
        }
      ],

      "marks": [
        {
          "name": "bars",
          "from": {"data": "facet"},
          "type": "rect",
          "encode": {
            "enter": {
              "y": {"scale": "pos", "field": "position"},
              "height": {"scale": "pos", "band": 1},
              "x": {"scale": "xscale", "field": "value"},
              "x2": {"scale": "xscale", "value": 0},
              "fill": {"scale": "color", "field": "position"}
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "bars"},
          "encode": {
            "enter": {
              "x": {"field": "x2", "offset": -5},
              "y": {"field": "y", "offset": {"field": "height", "mult": 0.5}},
              "fill": {"value": "white"},
              "align": {"value": "right"},
              "baseline": {"value": "middle"},
              "text": {"field": "datum.value"}
            }
          }
        }
      ]
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/nested-bar-chart
const nestedBarChart: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 300,
  "padding": 5,
  "autosize": "pad",

  "signals": [
    {
      "name": "rangeStep", "value": 20,
      "bind": {"input": "range", "min": 5, "max": 50, "step": 1}
    },
    {
      "name": "innerPadding", "value": 0.1,
      "bind": {"input": "range", "min": 0, "max": 0.7, "step": 0.01}
    },
    {
      "name": "outerPadding", "value": 0.2,
      "bind": {"input": "range", "min": 0, "max": 0.4, "step": 0.01}
    },
    {
      "name": "height",
      "update": "trellisExtent[1]"
    }
  ],

  "data": [
    {
      "name": "tuples",
      "values": [
        {"a": 0, "b": "a", "c": 6.3},
        {"a": 0, "b": "a", "c": 4.2},
        {"a": 0, "b": "b", "c": 6.8},
        {"a": 0, "b": "c", "c": 5.1},
        {"a": 1, "b": "b", "c": 4.4},
        {"a": 2, "b": "b", "c": 3.5},
        {"a": 2, "b": "c", "c": 6.2}
      ],
      "transform": [
        {
          "type": "aggregate",
          "groupby": ["a", "b"],
          "fields": ["c"],
          "ops": ["average"],
          "as": ["c"]
        }
      ]
    },
    {
      "name": "trellis",
      "source": "tuples",
      "transform": [
        {
          "type": "aggregate",
          "groupby": ["a"]
        },
        {
          "type": "formula", "as": "span",
          "expr": "rangeStep * bandspace(datum.count, innerPadding, outerPadding)"
        },
        {
          "type": "stack",
          "field": "span"
        },
        {
          "type": "extent",
          "field": "y1",
          "signal": "trellisExtent"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "domain": {"data": "tuples", "field": "c"},
      "nice": true,
      "zero": true,
      "round": true,
      "range": "width"
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": {"data": "trellis", "field": "a"}
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale", "domain": true }
  ],

  "marks": [
    {
      "type": "group",

      "from": {
        "data": "trellis",
        "facet": {
          "name": "faceted_tuples",
          "data": "tuples",
          "groupby": "a"
        }
      },

      "encode": {
        "enter": {
          "x": {"value": 0},
          "width": {"signal": "width"}
        },
        "update": {
          "y": {"field": "y0"},
          "y2": {"field": "y1"}
        }
      },

      "scales": [
        {
          "name": "yscale",
          "type": "band",
          "paddingInner": {"signal": "innerPadding"},
          "paddingOuter": {"signal": "outerPadding"},
          "round": true,
          "domain": {"data": "faceted_tuples", "field": "b"},
          "range": {"step": {"signal": "rangeStep"}}
        }
      ],

      "axes": [
        { "orient": "left", "scale": "yscale",
          "ticks": false, "domain": false, "labelPadding": 4 }
      ],

      "marks": [
        {
          "type": "rect",
          "from": {"data": "faceted_tuples"},
          "encode": {
            "enter": {
              "x": {"value": 0},
              "x2": {"scale": "xscale", "field": "c"},
              "fill": {"scale": "color", "field": "a"},
              "strokeWidth": {"value": 2}
            },
            "update": {
              "y": {"scale": "yscale", "field": "b"},
              "height": {"scale": "yscale", "band": 1},
              "stroke": {"value": null},
              // "zindex": {"value": 0} // Doesn't actually seem to be valid?
            },
            "hover": {
              "stroke": {"value": "firebrick"},
              // "zindex": {"value": 1} // Doesn't actually seem to be valid?
            }
          }
        }
      ]
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/line-chart
const lineChart: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 300,
  "padding": 5,
  "autosize": "pad",

  "signals": [
    {
      "name": "rangeStep", "value": 20,
      "bind": {"input": "range", "min": 5, "max": 50, "step": 1}
    },
    {
      "name": "innerPadding", "value": 0.1,
      "bind": {"input": "range", "min": 0, "max": 0.7, "step": 0.01}
    },
    {
      "name": "outerPadding", "value": 0.2,
      "bind": {"input": "range", "min": 0, "max": 0.4, "step": 0.01}
    },
    {
      "name": "height",
      "update": "trellisExtent[1]"
    }
  ],

  "data": [
    {
      "name": "tuples",
      "values": [
        {"a": 0, "b": "a", "c": 6.3},
        {"a": 0, "b": "a", "c": 4.2},
        {"a": 0, "b": "b", "c": 6.8},
        {"a": 0, "b": "c", "c": 5.1},
        {"a": 1, "b": "b", "c": 4.4},
        {"a": 2, "b": "b", "c": 3.5},
        {"a": 2, "b": "c", "c": 6.2}
      ],
      "transform": [
        {
          "type": "aggregate",
          "groupby": ["a", "b"],
          "fields": ["c"],
          "ops": ["average"],
          "as": ["c"]
        }
      ]
    },
    {
      "name": "trellis",
      "source": "tuples",
      "transform": [
        {
          "type": "aggregate",
          "groupby": ["a"]
        },
        {
          "type": "formula", "as": "span",
          "expr": "rangeStep * bandspace(datum.count, innerPadding, outerPadding)"
        },
        {
          "type": "stack",
          "field": "span"
        },
        {
          "type": "extent",
          "field": "y1",
          "signal": "trellisExtent"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "domain": {"data": "tuples", "field": "c"},
      "nice": true,
      "zero": true,
      "round": true,
      "range": "width"
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": {"data": "trellis", "field": "a"}
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale", "domain": true }
  ],

  "marks": [
    {
      "type": "group",

      "from": {
        "data": "trellis",
        "facet": {
          "name": "faceted_tuples",
          "data": "tuples",
          "groupby": "a"
        }
      },

      "encode": {
        "enter": {
          "x": {"value": 0},
          "width": {"signal": "width"}
        },
        "update": {
          "y": {"field": "y0"},
          "y2": {"field": "y1"}
        }
      },

      "scales": [
        {
          "name": "yscale",
          "type": "band",
          "paddingInner": {"signal": "innerPadding"},
          "paddingOuter": {"signal": "outerPadding"},
          "round": true,
          "domain": {"data": "faceted_tuples", "field": "b"},
          "range": {"step": {"signal": "rangeStep"}}
        }
      ],

      "axes": [
        { "orient": "left", "scale": "yscale",
          "ticks": false, "domain": false, "labelPadding": 4 }
      ],

      "marks": [
        {
          "type": "rect",
          "from": {"data": "faceted_tuples"},
          "encode": {
            "enter": {
              "x": {"value": 0},
              "x2": {"scale": "xscale", "field": "c"},
              "fill": {"scale": "color", "field": "a"},
              "strokeWidth": {"value": 2}
            },
            "update": {
              "y": {"scale": "yscale", "field": "b"},
              "height": {"scale": "yscale", "band": 1},
              "stroke": {"value": null}
            },
            "hover": {
              "stroke": {"value": "firebrick"}
            }
          }
        }
      ]
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/area-chart
const areaChart: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 500,
  "height": 200,
  "padding": 5,

  "signals": [
    {
      "name": "interpolate",
      "value": "monotone",
      "bind": {
        "input": "select",
        "options": [
          "basis",
          "cardinal",
          "catmull-rom",
          "linear",
          "monotone",
          "natural",
          "step",
          "step-after",
          "step-before"
        ]
      }
    }
  ],

  "data": [
    {
      "name": "table",
      "values": [
        {"u": 1,  "v": 28}, {"u": 2,  "v": 55},
        {"u": 3,  "v": 43}, {"u": 4,  "v": 91},
        {"u": 5,  "v": 81}, {"u": 6,  "v": 53},
        {"u": 7,  "v": 19}, {"u": 8,  "v": 87},
        {"u": 9,  "v": 52}, {"u": 10, "v": 48},
        {"u": 11, "v": 24}, {"u": 12, "v": 49},
        {"u": 13, "v": 87}, {"u": 14, "v": 66},
        {"u": 15, "v": 17}, {"u": 16, "v": 27},
        {"u": 17, "v": 68}, {"u": 18, "v": 16},
        {"u": 19, "v": 49}, {"u": 20, "v": 15}
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "linear",
      "range": "width",
      "zero": false,
      "domain": {"data": "table", "field": "u"}
    },
    {
      "name": "yscale",
      "type": "linear",
      "range": "height",
      "nice": true,
      "zero": true,
      "domain": {"data": "table", "field": "v"}
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "xscale", "tickCount": 20},
    {"orient": "left", "scale": "yscale"}
  ],

  "marks": [
    {
      "type": "area",
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "u"},
          "y": {"scale": "yscale", "field": "v"},
          "y2": {"scale": "yscale", "value": 0},
          "fill": {"value": "steelblue"}
        },
        "update": {
          "interpolate": {"signal": "interpolate"},
          "fillOpacity": {"value": 1}
        },
        "hover": {
          "fillOpacity": {"value": 0.5}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/stacked-area-chart
const stackedAreaChart: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 500,
  "height": 200,
  "padding": 5,
  
  "data": [
    {
      "name": "table",
      "values": [
        {"x": 0, "y": 28, "c":0}, {"x": 0, "y": 55, "c":1},
        {"x": 1, "y": 43, "c":0}, {"x": 1, "y": 91, "c":1},
        {"x": 2, "y": 81, "c":0}, {"x": 2, "y": 53, "c":1},
        {"x": 3, "y": 19, "c":0}, {"x": 3, "y": 87, "c":1},
        {"x": 4, "y": 52, "c":0}, {"x": 4, "y": 48, "c":1},
        {"x": 5, "y": 24, "c":0}, {"x": 5, "y": 49, "c":1},
        {"x": 6, "y": 87, "c":0}, {"x": 6, "y": 66, "c":1},
        {"x": 7, "y": 17, "c":0}, {"x": 7, "y": 27, "c":1},
        {"x": 8, "y": 68, "c":0}, {"x": 8, "y": 16, "c":1},
        {"x": 9, "y": 49, "c":0}, {"x": 9, "y": 15, "c":1}
      ],
      "transform": [
        {
          "type": "stack",
          "groupby": ["x"],
          "sort": {"field": "c"},
          "field": "y"
        }
      ]
    }
  ],
  
  "scales": [
    {
      "name": "x",
      "type": "point",
      "range": "width",
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "nice": true, "zero": true,
      "domain": {"data": "table", "field": "y1"}
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": {"data": "table", "field": "c"}
    }
  ],
  
  "axes": [
    {"orient": "bottom", "scale": "x", "zindex": 1},
    {"orient": "left", "scale": "y", "zindex": 1}
  ],
  
  "marks": [
    {
      "type": "group",
      "from": {
        "facet": {
          "name": "series",
          "data": "table",
          "groupby": "c"
        }
      },
      "marks": [
        {
          "type": "area",
          "from": {"data": "series"},
          "encode": {
            "enter": {
              "interpolate": {"value": "monotone"},
              "x": {"scale": "x", "field": "x"},
              "y": {"scale": "y", "field": "y0"},
              "y2": {"scale": "y", "field": "y1"},
              "fill": {"scale": "color", "field": "c"}
            },
            "update": {
              "fillOpacity": {"value": 1}
            },
            "hover": {
              "fillOpacity": {"value": 0.5}
            }
          }
        }
      ]
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/horizon-graph
const horizonGraph: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 500,
  "height": 100,

  "signals": [
    {
      "name": "layers",
      "value": 2,
      "on": [{"events": "mousedown!", "update": "1 + (layers % 4)"}],
      "bind": {"input": "select", "options": [1, 2, 3, 4]}
    },
    {
      "name": "height",
      "update": "floor(200 / layers)"
    },
    {
      "name": "vheight",
      "update": "height * layers"
    },
    {
      "name": "opacity",
      "update": "pow(layers, -2/3)"
    }
  ],

  "data": [
    {
      "name": "layer_indices",
      "values": [0, 1, 2, 3],
      "transform": [
        {"type": "filter", "expr": "datum.data < layers"},
        {"type": "formula", "expr": "datum.data * -height", "as": "offset"}
      ]
    },
    {
      "name": "table",
      "values": [
        {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
        {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
        {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
        {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
        {"x": 9,  "y": 52}, {"x": 10, "y": 48},
        {"x": 11, "y": 24}, {"x": 12, "y": 49},
        {"x": 13, "y": 87}, {"x": 14, "y": 66},
        {"x": 15, "y": 17}, {"x": 16, "y": 27},
        {"x": 17, "y": 68}, {"x": 18, "y": 16},
        {"x": 19, "y": 49}, {"x": 20, "y": 15}
      ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "linear",
      "range": "width",
      "zero": false, "round": true,
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": [{"signal":"vheight"}, 0],
      "nice": true, "zero": true,
      "domain": {"data": "table", "field": "y"}
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "x", "tickCount": 20}
  ],

  "marks": [
    {
      "type": "group",
      "encode": {
        "update": {
          "width": {"field": {"group": "width"}},
          "height": {"field": {"group": "height"}},
          "clip": {"value": true}
        }
      },
      "marks": [
        {
          "type": "group",
          "from": {"data": "layer_indices"},
          "encode": {
            "update": {
              "y": {"field": "offset"}
            }
          },
          "marks": [
            {
              "type": "area",
              "from": {"data": "table"},
              "encode": {
                "enter": {
                  "interpolate": {"value": "monotone"},
                  "x": {"scale": "x", "field": "x"},
                  "fill": {"value": "steelblue"}
                },
                "update": {
                  "y": {"scale": "y", "field": "y"},
                  "y2": {"scale": "y", "value": 0},
                  "fillOpacity": {"signal": "opacity"}
                }
              }
            }
          ]
        }
      ]
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/job-voyager
const jobVoyager: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 800,
  "height": 500,
  "padding": 5,

  "signals": [
    {
      "name": "sex", "value": "all",
      "bind": {"input": "radio", "options": ["men", "women", "all"]}
    },
    {
      "name": "query", "value": "",
      "on": [
        {"events": "area:click!", "update": "datum.job"},
        {"events": "dblclick!", "update": "''"}
      ],
      "bind": {"input": "text", "placeholder": "search", "autocomplete": "off"}
    }
  ],

  "data": [
    {
      "name": "jobs",
      "url": "data/jobs.json",
      "transform": [
        {
          "type": "filter",
          "expr": "(sex === 'all' || datum.sex === sex) && (!query || test(regexp(query,'i'), datum.job))"
        },
        {
          "type": "stack",
          "field": "perc",
          "groupby": ["year"],
          "sort": {
            "field": ["job", "sex"],
            "order": ["descending", "descending"]
          }
        }
      ]
    },
    {
      "name": "series",
      "source": "jobs",
      "transform": [
        {
          "type": "aggregate",
          "groupby": ["job", "sex"],
          "fields": ["perc", "perc"],
          "ops": ["sum", "argmax"],
          "as": ["sum", "argmax"]
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "linear",
      "range": "width",
      "zero": false, "round": true,
      "domain": {"data": "jobs", "field": "year"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height", "round": true, "zero": true,
      "domain": {"data": "jobs", "field": "y1"}
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": ["men", "women"],
      "range": ["#33f", "#f33"]
    },
    {
      "name": "alpha",
      "type": "linear", "zero": true,
      "domain": {"data": "series", "field": "sum"},
      "range": [0.4, 0.8]
    },
    {
      "name": "font",
      "type": "sqrt",
      "range": [0, 20], "round": true, "zero": true,
      "domain": {"data": "series", "field": "argmax.perc"}
    },
    {
      "name": "opacity",
      "type": "quantile",
      "range": [0, 0, 0, 0, 0, 0.1, 0.2, 0.4, 0.7, 1.0],
      "domain": {"data": "series", "field": "argmax.perc"}
    },
    {
      "name": "align",
      "type": "quantize",
      "range": ["left", "center", "right"], "zero": false,
      "domain": [1730, 2130]
    },
    {
      "name": "offset",
      "type": "quantize",
      "range": [6, 0, -6], "zero": false,
      "domain": [1730, 2130]
    }
  ],

  "axes": [
    {
      "orient": "bottom", "scale": "x", "format": "d", "tickCount": 15
    },
    {
      "orient": "right", "scale": "y", "format": "%",
      "grid": true, "domain": false, "tickSize": 12,
      "encode": {
        "grid": {"enter": {"stroke": {"value": "#ccc"}}},
        "ticks": {"enter": {"stroke": {"value": "#ccc"}}}
      }
    }
  ],

  "marks": [
    {
      "type": "group",
      "from": {
        "data": "series",
        "facet": {
          "name": "facet",
          "data": "jobs",
          "groupby": ["job", "sex"]
        }
      },

      "marks": [
        {
          "type": "area",
          "from": {"data": "facet"},
          "encode": {
            "update": {
              "x": {"scale": "x", "field": "year"},
              "y": {"scale": "y", "field": "y0"},
              "y2": {"scale": "y", "field": "y1"},
              "fill": {"scale": "color", "field": "sex"},
              "fillOpacity": {"scale": "alpha", "field": {"parent": "sum"}}
            },
            "hover": {
              "fillOpacity": {"value": 0.2}
            }
          }
        }
      ]
    },
    {
      "type": "text",
      "from": {"data": "series"},
      "interactive": false,
      "encode": {
        "update": {
          "x": {"scale": "x", "field": "argmax.year"},
          "dx": {"scale": "offset", "field": "argmax.year"},
          "y": {"signal": "scale('y', 0.5 * (datum.argmax.y0 + datum.argmax.y1))"},
          "fill": {"value": "#000"},
          "fillOpacity": {"scale": "opacity", "field": "argmax.perc"},
          "fontSize": {"scale": "font", "field": "argmax.perc", "offset": 5},
          "text": {"field": "job"},
          "align": {"scale": "align", "field": "argmax.year"},
          "baseline": {"value": "middle"}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/pie-chart
const pieChart: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 200,
  "height": 200,
  "autosize": "none",

  "signals": [
    {
      "name": "startAngle", "value": 0,
      "bind": {"input": "range", "min": 0, "max": 6.29, "step": 0.01}
    },
    {
      "name": "endAngle", "value": 6.29,
      "bind": {"input": "range", "min": 0, "max": 6.29, "step": 0.01}
    },
    {
      "name": "padAngle", "value": 0,
      "bind": {"input": "range", "min": 0, "max": 0.1}
    },
    {
      "name": "innerRadius", "value": 0,
      "bind": {"input": "range", "min": 0, "max": 90, "step": 1}
    },
    {
      "name": "cornerRadius", "value": 0,
      "bind": {"input": "range", "min": 0, "max": 10, "step": 0.5}
    },
    {
      "name": "sort", "value": false,
      "bind": {"input": "checkbox"}
    }
  ],

  "data": [
    {
      "name": "table",
      "values": [
        {"id": 1, "field": 4},
        {"id": 2, "field": 6},
        {"id": 3, "field": 10},
        {"id": 4, "field": 3},
        {"id": 5, "field": 7},
        {"id": 6, "field": 8}
      ],
      "transform": [
        {
          "type": "pie",
          "field": "field",
          "startAngle": {"signal": "startAngle"},
          "endAngle": {"signal": "endAngle"},
          "sort": {"signal": "sort"}
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "color",
      "type": "ordinal",
      "range": {"scheme": "category20"}
    }
  ],

  "marks": [
    {
      "type": "arc",
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "fill": {"scale": "color", "field": "id"},
          "x": {"signal": "width / 2"},
          "y": {"signal": "height / 2"}
        },
        "update": {
          "startAngle": {"field": "startAngle"},
          "endAngle": {"field": "endAngle"},
          "padAngle": {"signal": "padAngle"},
          "innerRadius": {"signal": "innerRadius"},
          "outerRadius": {"signal": "width / 2"},
          "cornerRadius": {"signal": "cornerRadius"}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/donut-chart
const donutChart: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 200,
  "height": 200,
  "autosize": "none",

  "signals": [
    {
      "name": "startAngle", "value": 0,
      "bind": {"input": "range", "min": 0, "max": 6.29, "step": 0.01}
    },
    {
      "name": "endAngle", "value": 6.29,
      "bind": {"input": "range", "min": 0, "max": 6.29, "step": 0.01}
    },
    {
      "name": "padAngle", "value": 0,
      "bind": {"input": "range", "min": 0, "max": 0.1}
    },
    {
      "name": "innerRadius", "value": 60,
      "bind": {"input": "range", "min": 0, "max": 90, "step": 1}
    },
    {
      "name": "cornerRadius", "value": 0,
      "bind": {"input": "range", "min": 0, "max": 10, "step": 0.5}
    },
    {
      "name": "sort", "value": false,
      "bind": {"input": "checkbox"}
    }
  ],

  "data": [
    {
      "name": "table",
      "values": [
        {"id": 1, "field": 4},
        {"id": 2, "field": 6},
        {"id": 3, "field": 10},
        {"id": 4, "field": 3},
        {"id": 5, "field": 7},
        {"id": 6, "field": 8}
      ],
      "transform": [
        {
          "type": "pie",
          "field": "field",
          "startAngle": {"signal": "startAngle"},
          "endAngle": {"signal": "endAngle"},
          "sort": {"signal": "sort"}
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "color",
      "type": "ordinal",
      "range": {"scheme": "category20"}
    }
  ],

  "marks": [
    {
      "type": "arc",
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "fill": {"scale": "color", "field": "id"},
          "x": {"signal": "width / 2"},
          "y": {"signal": "height / 2"}
        },
        "update": {
          "startAngle": {"field": "startAngle"},
          "endAngle": {"field": "endAngle"},
          "padAngle": {"signal": "padAngle"},
          "innerRadius": {"signal": "innerRadius"},
          "outerRadius": {"signal": "width / 2"},
          "cornerRadius": {"signal": "cornerRadius"}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/radial-plot
const radialPlot: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 200,
  "height": 200,

  "data": [
    {
      "name": "table",
      "values": [12, 23, 47, 6, 52, 19],
      "transform": [{"type": "pie", "field": "data"}]
    }
  ],

  "scales": [
    {
      "name": "r",
      "type": "sqrt",
      "domain": {"data": "table", "field": "data"},
      "zero": true,
      "range": [20, 100]
    }
  ],

  "marks": [
    {
      "type": "arc",
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "x": {"field": {"group": "width"}, "mult": 0.5},
          "y": {"field": {"group": "height"}, "mult": 0.5},
          "startAngle": {"field": "startAngle"},
          "endAngle": {"field": "endAngle"},
          "innerRadius": {"value": 20},
          "outerRadius": {"scale": "r", "field": "data"},
          "stroke": {"value": "#fff"}
        },
        "update": {
          "fill": {"value": "#ccc"}
        },
        "hover": {
          "fill": {"value": "pink"}
        }
      }
    },

    {
      "type": "text",
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "x": {"field": {"group": "width"}, "mult": 0.5},
          "y": {"field": {"group": "height"}, "mult": 0.5},
          "radius": {"scale": "r", "field": "data", "offset": 8},
          "theta": {"signal": "(datum.startAngle + datum.endAngle)/2"},
          "fill": {"value": "#000"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "text": {"field": "data"}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/scatter-plot
const scatterPlot: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 200,
  "height": 200,
  "padding": 5,

  "data": [
    {
      "name": "source",
      "url": "data/cars.json",
      "transform": [
        {
          "type": "filter",
          "expr": "datum['Horsepower'] != null && datum['Miles_per_Gallon'] != null && datum['Acceleration'] != null"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "linear",
      "round": true,
      "nice": true,
      "zero": true,
      "domain": {"data": "source", "field": "Horsepower"},
      "range": "width"
    },
    {
      "name": "y",
      "type": "linear",
      "round": true,
      "nice": true,
      "zero": true,
      "domain": {"data": "source", "field": "Miles_per_Gallon"},
      "range": "height"
    },
    {
      "name": "size",
      "type": "linear",
      "round": true,
      "nice": false,
      "zero": true,
      "domain": {"data": "source", "field": "Acceleration"},
      "range": [4,361]
    }
  ],

  "axes": [
    {
      "scale": "x",
      "grid": true,
      "domain": false,
      "orient": "bottom",
      "tickCount": 5,
      "title": "Horsepower"
    },
    {
      "scale": "y",
      "grid": true,
      "domain": false,
      "orient": "left",
      "titlePadding": 5,
      "title": "Miles_per_Gallon"
    }
  ],

  "legends": [
    {
      "size": "size",
      "title": "Acceleration",
      "format": "s",
      "encode": {
        "symbols": {
          "update": {
            "strokeWidth": {"value": 2},
            "opacity": {"value": 0.5},
            "stroke": {"value": "#4682b4"},
            "shape": {"value": "circle"}
          }
        }
      }
    }
  ],

  "marks": [
    {
      "name": "marks",
      "type": "symbol",
      "from": {"data": "source"},
      "encode": {
        "update": {
          "x": {"scale": "x", "field": "Horsepower"},
          "y": {"scale": "y", "field": "Miles_per_Gallon"},
          "size": {"scale": "size", "field": "Acceleration"},
          "shape": {"value": "circle"},
          "strokeWidth": {"value": 2},
          "opacity": {"value": 0.5},
          "stroke": {"value": "#4682b4"},
          "fill": {"value": "transparent"}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/scatter-plot-null-values
const scatterPlotNullValues = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 450,
  "height": 450,
  "padding": 5,
  "autosize": {"type": "fit", "resize": true},

  "signals": [
    { "name": "yField", "value": "IMDB_Rating",
      "bind": {"input": "select", "options": ["IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross"]} },
    { "name": "xField", "value": "Rotten_Tomatoes_Rating",
      "bind": {"input": "select", "options": ["IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross"]} },
    { "name": "nullSize", "value": 8 },
    { "name": "nullGap", "update": "nullSize + 10" }
  ],

  "data": [
    {
      "name": "movies",
      "url": "data/movies.json",
      "transform": [
        {
          "type": "formula",
          "expr": "datum.Title + ' (' + (year(datum.Release_Date) || '?') + ')'",
          "as":   "tooltip"
        }
      ]
    },
    {
      "name": "valid",
      "source": "movies",
      "transform": [
        {
          "type": "filter",
          "expr": "datum[xField] != null && datum[yField] != null"
        }
      ]
    },
    {
      "name": "nullXY",
      "source": "movies",
      "transform": [
        {
          "type": "filter",
          "expr": "datum[xField] == null && datum[yField] == null"
        },
        { "type": "aggregate" }
      ]
    },
    {
      "name": "nullY",
      "source": "movies",
      "transform": [
        {
          "type": "filter",
          "expr": "datum[xField] != null && datum[yField] == null"
        }
      ]
    },
    {
      "name": "nullX",
      "source": "movies",
      "transform": [
        {
          "type": "filter",
          "expr": "datum[xField] == null && datum[yField] != null"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "yscale",
      "type": "linear",
      "range": [{"signal": "height - nullGap"}, 0],
      "nice": true,
      "domain": {"data": "valid", "field": {"signal": "yField"}}
    },
    {
      "name": "xscale",
      "type": "linear",
      "range": [{"signal": "nullGap"}, {"signal": "width"}],
      "nice": true,
      "domain": {"data": "valid", "field": {"signal": "xField"}}
    }
  ],

  "axes": [
    {
      "orient": "bottom", "scale": "xscale", "offset": 5, "format": "s",
      "title": {"signal": "xField"}
    },
    {
      "orient": "left", "scale": "yscale", "offset": 5, "format": "s",
      "title": {"signal": "yField"}
    }
  ],

  "marks": [
    {
      "type": "symbol",
      "from": {"data": "valid"},
      "encode": {
        "enter": {
          "size": {"value": 50},
          "tooltip": {"field": "tooltip"}
        },
        "update": {
          "x": {"scale": "xscale", "field": {"signal": "xField"}},
          "y": {"scale": "yscale", "field": {"signal": "yField"}},
          "fill": {"value": "steelblue"},
          "fillOpacity": {"value": 0.5},
          "zindex": {"value": 0}
        },
        "hover": {
          "fill": {"value": "firebrick"},
          "fillOpacity": {"value": 1},
          "zindex": {"value": 1}
        }
      }
    },
    {
      "type": "symbol",
      "from": {"data": "nullY"},
      "encode": {
        "enter": {
          "size": {"value": 50},
          "tooltip": {"field": "tooltip"}
        },
        "update": {
          "x": {"scale": "xscale", "field": {"signal": "xField"}},
          "y": {"signal": "height - nullSize/2"},
          "fill": {"value": "#aaa"},
          "fillOpacity": {"value": 0.2}
        },
        "hover": {
          "fill": {"value": "firebrick"},
          "fillOpacity": {"value": 1}
        }
      }
    },
    {
      "type": "symbol",
      "from": {"data": "nullX"},
      "encode": {
        "enter": {
          "size": {"value": 50},
          "tooltip": {"field": "tooltip"}
        },
        "update": {
          "x": {"signal": "nullSize/2"},
          "y": {"scale": "yscale", "field": {"signal": "yField"}},
          "fill": {"value": "#aaa"},
          "fillOpacity": {"value": 0.2},
          "zindex": {"value": 0}
        },
        "hover": {
          "fill": {"value": "firebrick"},
          "fillOpacity": {"value": 1},
          "zindex": {"value": 1}
        }
      }
    },
    {
      "type": "text",
      "interactive": false,
      "from": {"data": "nullXY"},
      "encode": {
        "update": {
          "x": {"signal": "nullSize", "offset": -4},
          "y": {"signal": "height", "offset": 13},
          "text": {"signal": "datum.count + ' null'"},
          "align": {"value": "right"},
          "baseline": {"value": "top"},
          "fill": {"value": "#999"},
          "fontSize": {"value": 9}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/connected-scatter-plot
const connectedScatterPlot = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 800,
  "height": 500,
  "padding": 5,

  "data": [
    {
      "name": "drive",
      "url": "data/driving.json"
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "linear",
      "domain": {"data": "drive", "field": "miles"},
      "range": "width",
      "nice": true,
      "zero": false,
      "round": true
    },
    {
      "name": "y",
      "type": "linear",
      "domain": {"data": "drive", "field": "gas"},
      "range": "height",
      "nice": true,
      "zero": false,
      "round": true
    },
    {
      "name": "align",
      "type": "ordinal",
      "domain": ["left", "right", "top", "bottom"],
      "range": ["right", "left", "center", "center"]
    },
    {
      "name": "base",
      "type": "ordinal",
      "domain": ["left", "right", "top", "bottom"],
      "range": ["middle", "middle", "bottom", "top"]
    },
    {
      "name": "dx",
      "type": "ordinal",
      "domain": ["left", "right", "top", "bottom"],
      "range": [-7, 6, 0, 0]
    },
    {
      "name": "dy",
      "type": "ordinal",
      "domain": ["left", "right", "top", "bottom"],
      "range": [1, 1, -5, 6]
    }
  ],

  "axes": [
    {
      "orient": "top",
      "scale": "x",
      "tickCount": 5,
      "tickSize": 0,
      "grid": true,
      "domain": false,
      "encode": {
        "domain": {
          "enter": { "stroke": {"value": "transparent"} }
        },
        "labels": {
          "enter": {
            "align": {"value": "left"},
            "baseline": {"value": "top"},
            "fontSize": {"value": 12},
            "fontWeight": {"value": "bold"}
          }
        }
      }
    },
    {
      "title": "Miles driven per capita each year",
      "orient": "bottom", "scale": "x",
      "domain": false, "ticks": false, "labels": false
    },
    {
      "orient": "left",
      "scale": "y",
      "tickCount": 5,
      "tickSize": 0,
      "grid": true,
      "domain": false,
      "format": "$0.2f",
      "encode": {
        "domain": {
          "enter": {"stroke": {"value": "transparent"}}
        },
        "labels": {
          "enter": {
            "align": {"value": "left"},
            "baseline": {"value": "bottom"},
            "fontSize": {"value": 12},
            "fontWeight": {"value": "bold"}
          }
        }
      }
    },
    {
      "title": "Price of a gallon of gasoline (adjusted for inflation)",
      "orient": "right", "scale": "y",
      "domain": false, "ticks": false, "labels": false
    }
  ],

  "marks": [
    {
      "type": "line",
      "from": {"data": "drive"},
      "encode": {
        "enter": {
          "interpolate": {"value": "cardinal"},
          "x": {"scale": "x", "field": "miles"},
          "y": {"scale": "y", "field": "gas"},
          "stroke": {"value": "#000"},
          "strokeWidth": {"value": 3}
        }
      }
    },
    {
      "type": "symbol",
      "from": {"data": "drive"},
      "encode": {
        "enter": {
          "x": {"scale": "x", "field": "miles"},
          "y": {"scale": "y", "field": "gas"},
          "fill": {"value": "#fff"},
          "stroke": {"value": "#000"},
          "strokeWidth": {"value": 1},
          "size": {"value": 49}
        }
      }
    },
    {
      "type": "text",
      "from": {"data": "drive"},
      "encode": {
        "enter": {
          "x": {"scale": "x", "field": "miles"},
          "y": {"scale": "y", "field": "gas"},
          "dx": {"scale": "dx", "field": "side"},
          "dy": {"scale": "dy", "field": "side"},
          "fill": {"value": "#000"},
          "text": {"field": "year"},
          "align": {"scale": "align", "field": "side"},
          "baseline": {"scale": "base", "field": "side"}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/error-bars
const errorBars: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 500,
  "height": 160,
  "padding": 5,

  "config": {
    "axisBand": {
      "bandPosition": 1,
      "tickExtra": true,
      "tickOffset": 0
    }
  },

  "signals": [
    {
      "name": "errorMeasure", "value": "95% Confidence Interval",
      "bind": {"input": "select", "options": [
        "95% Confidence Interval",
        "Standard Error",
        "Standard Deviation",
        "Interquartile Range"
      ]}
    },
    {
      "name": "lookup",
      "value": {
        "95% Confidence Interval": "ci",
        "Standard Deviation": "stdev",
        "Standard Error": "stderr",
        "Interquartile Range": "iqr"
      }
    },
    {
      "name": "measure",
      "update": "lookup[errorMeasure]"
    }
  ],

  "data": [
    {
      "name": "barley",
      "url": "data/barley.json"
    },
    {
      "name": "summary",
      "source": "barley",
      "transform": [
        {
          "type": "aggregate",
          "groupby": ["variety"],
          "fields": ["yield", "yield", "yield", "yield", "yield", "yield", "yield"],
          "ops": ["mean", "stdev", "stderr", "ci0", "ci1", "q1", "q3"],
          "as": ["mean", "stdev", "stderr", "ci0", "ci1", "iqr0", "iqr1"]
        },
        {
          "type": "formula", "as": "stdev0",
          "expr": "datum.mean - datum.stdev"
        },
        {
          "type": "formula", "as": "stdev1",
          "expr": "datum.mean + datum.stdev"
        },
        {
          "type": "formula", "as": "stderr0",
          "expr": "datum.mean - datum.stderr"
        },
        {
          "type": "formula", "as": "stderr1",
          "expr": "datum.mean + datum.stderr"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "yscale",
      "type": "band",
      "range": "height",
      "domain": {
        "data": "summary",
        "field": "variety",
        "sort": {"op": "max", "field": "mean", "order": "descending"}
      }
    },
    {
      "name": "xscale",
      "type": "linear",
      "range": "width", "round": true,
      "domain": {"data": "summary", "fields": ["stdev0", "stdev1"]},
      "zero": false, "nice": true
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "xscale", "zindex": 1, "title": "Barley Yield"},
    {"orient": "left", "scale": "yscale", "tickCount": 5, "zindex": 1}
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data": "summary"},
      "encode": {
        "enter": {
          "fill": {"value": "black"},
          "height": {"value": 1}
        },
        "update": {
          "y": {"scale": "yscale", "field": "variety", "band": 0.5},
          "x": {"scale": "xscale", "signal": "datum[measure+'0']"},
          "x2": {"scale": "xscale", "signal": "datum[measure+'1']"}
        }
      }
    },
    {
      "type": "symbol",
      "from": {"data": "summary"},
      "encode": {
        "enter": {
          "fill": {"value": "black"},
          "size": {"value": 40}
        },
        "update": {
          "x": {"scale": "xscale", "field": "mean"},
          "y": {"scale": "yscale", "field": "variety", "band": 0.5}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/barley-trellis-plot
const barleyTrellisPlot: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 200,
  "padding": 5,

  "signals": [
    {"name": "offset", "value": 15},
    {"name": "cellHeight", "value": 100},
    {"name": "height", "update": "6 * (offset + cellHeight)"}
  ],

  "data": [
    {
      "name": "barley",
      "url": "data/barley.json"
    }
  ],

  "scales": [
    {
      "name": "gscale",
      "type": "band",
      "range": [0, {"signal": "height"}],
      "round": true,
      "domain": {
        "data": "barley",
        "field": "site",
        "sort": {
          "field": "yield",
          "op": "median",
          "order": "descending"
        }
      }
    },
    {
      "name": "xscale",
      "type": "linear",
      "nice": true,
      "range": "width",
      "round": true,
      "domain": {"data": "barley", "field": "yield"}
    },
    {
      "name": "cscale",
      "type": "ordinal",
      "range": "category",
      "domain": {"data": "barley", "field": "year"}
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "xscale", "zindex": 1}
  ],

  "legends": [
    {
      "stroke": "cscale",
      "title": "Year",
      "padding": 4,
      "encode": {
        "symbols": {
          "enter": {
            "strokeWidth": {"value": 2},
            "size": {"value": 50}
          }
        }
      }
    }
  ],

  "marks": [
    {
      "name": "site",
      "type": "group",

      "from": {
        "facet": {
          "data": "barley",
          "name": "sites",
          "groupby": "site"
        }
      },

      "encode": {
        "enter": {
          "y": {"scale": "gscale", "field": "site", "offset": {"signal": "offset"}},
          "height": {"signal": "cellHeight"},
          "width": {"signal": "width"},
          "stroke": {"value": "#ccc"}
        }
      },

      "scales": [
        {
          "name": "yscale",
          "type": "point",
          "range": [0, {"signal": "cellHeight"}],
          "padding": 1,
          "round": true,
          "domain": {
            "data": "barley",
            "field": "variety",
            "sort": {
              "field": "yield",
              "op": "median",
              "order": "descending"
            }
          }
        }
      ],

      "axes": [
        {
          "orient": "left",
          "scale": "yscale",
          "tickSize": 0,
          "domain": false,
          "grid": true,
          "encode": {
            "grid": {
              "enter": {"strokeDash": {"value": [3,3]}}
            }
          }
        },
        {
          "orient": "right",
          "scale": "yscale",
          "tickSize": 0,
          "domain": false
        }
      ],

      "marks": [
        {
          "type": "symbol",
          "from": {"data": "sites"},
          "encode": {
            "enter": {
              "x": {"scale": "xscale", "field": "yield"},
              "y": {"scale": "yscale", "field": "variety"},
              "stroke": {"scale": "cscale", "field": "year"},
              "strokeWidth": {"value": 2},
              "size": {"value": 50}
            }
          }
        }
      ]
    },

    {
      "type": "text",
      "from": {"data": "site"},
      "encode": {
        "enter": {
          "x": {"field": "width", "mult": 0.5},
          "y": {"field": "y"},
          "fontSize": {"value": 11},
          "fontWeight": {"value": "bold"},
          "text": {"field": "datum.site"},
          "align": {"value": "center"},
          "baseline": {"value": "bottom"},
          "fill": {"value": "#000"}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/histogram
const histogram: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 500,
  "height": 100,
  "padding": 5,

  "signals": [
    { "name": "binOffset", "value": 0,
      "bind": {"input": "range", "min": -0.1, "max": 0.1} },
    { "name": "binStep", "value": 0.1,
      "bind": {"input": "range", "min": 0.001, "max": 0.4, "step": 0.001} }
  ],

  "data": [
    {
      "name": "points",
      "url": "data/normal-2d.json"
    },
    {
      "name": "binned",
      "source": "points",
      "transform": [
        {
          "type": "bin", "field": "u",
          "extent": [-1, 1],
          "anchor": {"signal": "binOffset"},
          "step": {"signal": "binStep"},
          "nice": false
        },
        {
          "type": "aggregate",
          "key": "bin0", "groupby": ["bin0", "bin1"],
          "fields": ["bin0"], "ops": ["count"], "as": ["count"]
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "linear",
      "range": "width",
      "domain": [-1, 1]
    },
    {
      "name": "yscale",
      "type": "linear",
      "range": "height", "round": true,
      "domain": {"data": "binned", "field": "count"},
      "zero": true, "nice": true
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "xscale", "zindex": 1},
    {"orient": "left", "scale": "yscale", "tickCount": 5, "zindex": 1}
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data": "binned"},
      "encode": {
        "update": {
          "x": {"scale": "xscale", "field": "bin0"},
          "x2": {"scale": "xscale", "field": "bin1",
                 "offset": {"signal": "binStep > 0.02 ? -0.5 : 0"}},
          "y": {"scale": "yscale", "field": "count"},
          "y2": {"scale": "yscale", "value": 0},
          "fill": {"value": "steelblue"}
        },
        "hover": { "fill": {"value": "firebrick"} }
      }
    },
    {
      "type": "rect",
      "from": {"data": "points"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "u"},
          "width": {"value": 1},
          "y": {"value": 25, "offset": {"signal": "height"}},
          "height": {"value": 5},
          "fill": {"value": "steelblue"},
          "fillOpacity": {"value": 0.4}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/histogram-null-values
const histogramNullValues: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 400,
  "height": 200,
  "padding": 5,
  "autosize": {"type": "fit", "resize": true},

  "signals": [
    {
      "name": "maxbins", "value": 10,
      "bind": {"input": "select", "options": [5, 10, 20]}
    },
    {
      "name": "binDomain",
      "update": "sequence(bins.start, bins.stop + bins.step, bins.step)"
    },
    {
      "name": "nullGap", "value": 10
    },
    {
      "name": "barStep",
      "update": "(width - nullGap) / binDomain.length"
    }
  ],

  "data": [
    {
      "name": "table",
      "url": "data/movies.json",
      "transform": [
        {
          "type": "extent", "field": "IMDB_Rating",
          "signal": "extent"
        },
        {
          "type": "bin", "signal": "bins",
          "field": "IMDB_Rating", "extent": {"signal": "extent"},
          "maxbins": {"signal": "maxbins"}
        }
      ]
    },
    {
      "name": "counts",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "expr": "datum['IMDB_Rating'] != null"
        },
        {
          "type": "aggregate",
          "groupby": ["bin0", "bin1"]
        }
      ]
    },
    {
      "name": "nulls",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "expr": "datum['IMDB_Rating'] == null"
        },
        {
          "type": "aggregate"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "yscale",
      "type": "linear",
      "range": "height",
      "round": true, "nice": true,
      "domain": {
        "fields": [
          {"data": "counts", "field": "count"},
          {"data": "nulls", "field": "count"}
        ]
      }
    },
    {
      "name": "xscale",
      "type": "bin-linear",
      "range": [{"signal": "barStep + nullGap"}, {"signal": "width"}],
      "round": true,
      "domain": {"signal": "binDomain"}
    },
    {
      "name": "xscale-null",
      "type": "band",
      "range": [0, {"signal": "barStep"}],
      "round": true,
      "domain": [null]
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "xscale", "tickCount": 10},
    {"orient": "bottom", "scale": "xscale-null"},
    {"orient": "left", "scale": "yscale", "tickCount": 5, "offset": 5}
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data": "counts"},
      "encode": {
        "update": {
          "x": {"scale": "xscale", "field": "bin0", "offset": 1},
          "x2": {"scale": "xscale", "field": "bin1"},
          "y": {"scale": "yscale", "field": "count"},
          "y2": {"scale": "yscale", "value": 0},
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "firebrick"}
        }
      }
    },
    {
      "type": "rect",
      "from": {"data": "nulls"},
      "encode": {
        "update": {
          "x": {"scale": "xscale-null", "value": null, "offset": 1},
          "x2": {"scale": "xscale-null", "band": 1},
          "y": {"scale": "yscale", "field": "count"},
          "y2": {"scale": "yscale", "value": 0},
          "fill": {"value": "#aaa"}
        },
        "hover": {
          "fill": {"value": "firebrick"}
        }
      }
    }
  ]
};

// https://vega.github.io/editor/#/examples/vega/probability-density
const probabilityDensity: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v3.json",
  "width": 500,
  "height": 100,
  "padding": 5,

  "signals": [
    { "name": "bandwidth", "value": 0,
      "bind": {"input": "range", "min": 0, "max": 0.1, "step": 0.001} },
    { "name": "steps", "value": 100,
      "bind": {"input": "range", "min": 10, "max": 500, "step": 1} },
    { "name": "method", "value": "pdf",
      "bind": {"input": "radio", "options": ["pdf", "cdf"]} }
  ],

  "data": [
    {
      "name": "points",
      "url": "data/normal-2d.json"
    },
    {
      "name": "summary",
      "source": "points",
      "transform": [
        {
          "type": "aggregate",
          "fields": ["u", "u"],
          "ops": ["mean", "stdev"],
          "as": ["mean", "stdev"]
        }
      ]
    },
    {
      "name": "density",
      "source": "points",
      "transform": [
        {
          "type": "density",
          "extent": {"signal": "domain('xscale')"},
          "steps": {"signal": "steps"},
          "method": {"signal": "method"},
          "distribution": {
            "function": "kde",
            "field": "u",
            "bandwidth": {"signal": "bandwidth"}
          }
        }
      ]
    },
    {
      "name": "normal",
      "transform": [
        {
          "type": "density",
          "extent": {"signal": "domain('xscale')"},
          "steps": {"signal": "steps"},
          "method": {"signal": "method"},
          "distribution": {
            "function": "normal",
            "mean": {"signal": "data('summary')[0].mean"},
            "stdev": {"signal": "data('summary')[0].stdev"}
          }
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "linear",
      "range": "width",
      "domain": {"data": "points", "field": "u"},
      "nice": true
    },
    {
      "name": "yscale",
      "type": "linear",
      "range": "height", "round": true,
      "domain": {
        "fields": [
          {"data": "density", "field": "density"},
          {"data": "normal", "field": "density"}
        ]
      }
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": ["Normal Estimate", "Kernel Density Estimate"],
      "range": ["#444", "steelblue"]
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "xscale", "zindex": 1}
  ],

  "legends": [
    {"orient": "top-left", "fill": "color", "offset": 0, "zindex": 1}
  ],

  "marks": [
    {
      "type": "area",
      "from": {"data": "density"},
      "encode": {
        "update": {
          "x": {"scale": "xscale", "field": "value"},
          "y": {"scale": "yscale", "field": "density"},
          "y2": {"scale": "yscale", "value": 0},
          "fill": {"signal": "scale('color', 'Kernel Density Estimate')"}
        }
      }
    },
    {
      "type": "line",
      "from": {"data": "normal"},
      "encode": {
        "update": {
          "x": {"scale": "xscale", "field": "value"},
          "y": {"scale": "yscale", "field": "density"},
          "stroke": {"signal": "scale('color', 'Normal Estimate')"},
          "strokeWidth": {"value": 2}
        }
      }
    },
    {
      "type": "rect",
      "from": {"data": "points"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "u"},
          "width": {"value": 1},
          "y": {"value": 25, "offset": {"signal": "height"}},
          "height": {"value": 5},
          "fill": {"value": "steelblue"},
          "fillOpacity": {"value": 0.4}
        }
      }
    }
  ]
};
