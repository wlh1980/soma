(function($){if($)$.onloadjson(
// use dock panel instead of CSS-based layout (IE limitations)
{DockPanel:{
    orientation: "Vertical",
    dimensions:[54, 18],
    children:
    [
        {HTMLPresenter:{html:'<div id="header" class="dynamic"></div>'}},
        {HTMLPresenter:{html:'<div id="footer" class="dynamic"></div>'}},
        {SplitPanel:{
            ratio: 0.3,
            minPaneSize: [0,300],
            children:
            [
                {ContentBrowser:{
                    roots: [""],
                    classes: ["browser-pane"]
                }},
                // use dock panel instead of table panel (IE limitations)
                {DockPanel:{
                    orientation: "Vertical",
                    dimensions: [22],
                    children:
                    [
                        {TablePanel:{
                            orientation: "Horizontal",
                            dimensions: ["*",0,150],
                            borderThickness: [0,0,0,1],
                            border: "#ccc",
                            children:
                            [
                                {ContentBreadCrumbs:{
                                    padding: [5,2,5,0]
                                }},
                                null,
                                {NavigationBar:{
                                    padding: [0,2,10,0],
                                    pageCount: 1
                                }}
                            ]
                        }},
                        {ContentHolder:{
                            padding: [5,2,5,0]
                        }} 
                    ],
                    classes: ["content-pane"]
                }}
            ]
        }}        
    ]
}}
);})(document.jdata.activeScript());
