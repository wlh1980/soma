/*!
* Sybase.Modeling.Reporting.Html Rendering Library ('jReport')
*
* Copyright 2011-2012 (c) Sybase, an SAP Company. All rights reserved
*
* @author gabriel.kevorkian@sap.com
*
* requires:
*  sybase.modeling.reporting.data.js
*
* defines:
*  jQuery.jreport
*
*  jQuery.treecontrol
*  jQuery.splitterControl
*  
*  jQuery.disableSelection
*  jQuery.hoverClass
*  jQuery.swapClass
*  jQuery.toggleVisibility
*  
*/
;
(function ($/*jQuery*/) {

    if ($.jreport)
        return;

    window.document.jdata.contentBase = "content/";

    var oDocument = window.document;

    var sLocationHref = oDocument.location.href;

    var isRtl = oDocument.documentElement.dir == "rtl";

    var mCurrentContent = {
        id: null,
        anchor: null,
        page: null
    };

    var CSS$CLASS = {
        treecontrol: "treecontrol",
        hsplitter: "hsplitter",
        vsplitter: "vsplitter",
        hsplitterButton: "hsplitter-button",
        vsplitterButton: "vsplitter-button",
        virtual: "virtual",
        collapsable: "collapsable",
        expandable: "expandable",
        collapsableHitarea: "collapsable-hitarea",
        expandableHitarea: "expandable-hitarea",
        hovered: "hovered",
        disabled: "disabled",
        enabled: "enabled",
        selected: "selected",
        flipped: "flipped",
        hitarea: "hitarea",
        label: "label",
        value: "value"
    };

    var jreport$EVENT = {
        contentchange: "contentchange",
        contentreveal: "contentreveal"
    };

    // parameters handler
    (function () {
        var sFullHref;
        // NOTE: use # instead of ? to avoid page reload
        var parameterStart = sLocationHref.indexOf('#');
        if (parameterStart != -1) {
            sLocationHref = sLocationHref.substring(0, parameterStart);
        }
        oDocument.updateHash = function (parameterString) {
            // keep # even in case no parameter string is present to avoid page reload (thus losing treeview expansion state) upon clicking on hyperlink to root
            sFullHref = sLocationHref + (parameterString ? ("#" + parameterString) : "#");
            if (oDocument.location.href !== sFullHref) {
                oDocument.location.href = sFullHref;
            }
        };
        setInterval(function () {
            var sHref = oDocument.location.href;
            if (sHref !== sFullHref) {
                sFullHref = sHref;
                var sContentId = "", sAnchorId = "", page = 1;
                var parameterStart = sHref.indexOf('#');
                if (parameterStart != -1) {
                    var aParameters = sHref.substring(parameterStart + 1, sHref.length).split('&');
                    for (var i = 0; i < aParameters.length; i++) {
                        aParameter = aParameters[i].split('=');
                        if (aParameter.length == 2) {
                            if (aParameter[0] == "n") {
                                sContentId = aParameter[1];
                            } else if (aParameter[0] == "a") {
                                sAnchorId = aParameter[1];
                            } else if (aParameter[0] == "p") {
                                page = parseInt(aParameter[1]);
                            }
                        }
                    }
                }
                $.jreport.display(sContentId, true, sAnchorId, page);
            }
        }, 100);
    })();

    // http://stackoverflow.com/a/7842962/1128492
    (function () {
        // remove layerX and layerY (webkit/jquery issue workaround)
        var all = $.event.props, len = all.length, res = [];
        while (len--) {
            var el = all[len];
            if (el != 'layerX' && el != 'layerY') res.push(el);
        }
        $.event.props = res;
    } ());

    // internals 
    var internal = {};

    internal.buildParameterString = function (sNodeId, sAnchorId, page) {
        var result = "";
        if (sNodeId) {
            result += "n=" + sNodeId;
        }
        if (sAnchorId) {
            result += (result.length > 0 ? "&a=" : "a=") + sAnchorId;
        }
        if (page > 1) {
            result += (result.length > 0 ? "&p=" : "p=") + page;
        }
        return result;
    };

    /**
    * internal.widget(oWidget, oContainerElement)
    */
    internal.widget = (function () {

        var CSS$LOGICALCLASS = {
            alternate: "alt",
            browserPane: "browser-pane",
            card: "card",
            cardLabel: "card-label",
            contentPane: "content-pane",
            list: "list",
            listHeader: "list-header"
        };

        // pd report 16.1.x- css-compatibility

        var CSS$COMPATIBILITY = {}; 
        {
            CSS$COMPATIBILITY[CSS$LOGICALCLASS.alternate] = "TD2";
            CSS$COMPATIBILITY[CSS$LOGICALCLASS.browserPane] = "BROWSERBODY";
            CSS$COMPATIBILITY[CSS$LOGICALCLASS.card] = "Form";
            CSS$COMPATIBILITY[CSS$LOGICALCLASS.cardLabel] = "HEADER";
            CSS$COMPATIBILITY[CSS$LOGICALCLASS.contentPane] = "HOMEBODY";
            CSS$COMPATIBILITY[CSS$LOGICALCLASS.list] = "Grid";
            CSS$COMPATIBILITY[CSS$LOGICALCLASS.listHeader] = "HEADER";

            for (var logicalClass in CSS$COMPATIBILITY) {
                CSS$COMPATIBILITY[CSS$COMPATIBILITY[logicalClass]] = CSS$COMPATIBILITY[logicalClass];
            }
        };

        // prefix used for content browser item ids ( <item-id> := '@' <node-id> )
        var ContentBrowser$ITEMIDPREFIX = "@";

        /**
        * addClasses(oElement, aClasses)
        */
        function addClasses(oElement, aClasses) {
            if (aClasses) {
                $oElement = $(oElement);
                for (var i = 0; i < aClasses.length; i++) {
                    var sClass = aClasses[i];
                    var sLegacyClass = CSS$COMPATIBILITY[sClass];
                    if (sLegacyClass) {
                        $oElement.addClass(sLegacyClass);
                    }
                    $oElement.addClass(sClass);
                }
            }
        };

        /**
        * getLegacyClasses(aClasses)
        */
        function getLegacyClasses(aClasses) {
            var aResult = [];
            if (aClasses) {
                for (var i = 0; i < aClasses.length; i++) {
                    var sClass = aClasses[i];
                    var sLegacyClass = CSS$COMPATIBILITY[sClass];
                    if (sLegacyClass) {
                        aResult = aResult.concat([sLegacyClass]);
                    }
                }
            }
            return aResult;
        }

        /**
        * getWidgetClasses(oWidget)
        */
        function getWidgetClasses(oWidget) {
            if (oWidget) {
                for (var sComponent in oWidget) {
                    return oWidget[sComponent].classes;
                }
            }
            return undefined;
        }

        /**
        * computeBorderCSSText(owComponent)
        */
        function computeBorderCSSText(owComponent) {
            var cssFragment = "";
            if (owComponent.borderThickness) {
                var borderStyle = owComponent.borderStyle || "solid";
                var values = $.map(owComponent.borderThickness, function (v) { return v || 0; });
                if (values[0] > 0) cssFragment += "border-left:" + values[0] + "px " + borderStyle + " " + owComponent.border + ";";
                if (values[1] > 0) cssFragment += "border-top:" + values[1] + "px " + borderStyle + " " + owComponent.border + ";";
                if (values[2] > 0) cssFragment += "border-right:" + values[2] + "px " + borderStyle + " " + owComponent.border + ";";
                if (values[3] > 0) cssFragment += "border-bottom:" + values[3] + "px " + borderStyle + " " + owComponent.border + ";";
            }
            return cssFragment;
        }

        /**
        * computeMarginCSSText(owComponent)
        */
        function computeMarginCSSText(owComponent) {
            var cssFragment = "";
            if (owComponent.margin) {
                var margin = $.map(owComponent.margin, function (v) { return v || 0; });
                if (margin[0] > 0) cssFragment += "margin-left: " + margin[0] + "px;";
                if (margin[1] > 0) cssFragment += "margin-top: " + margin[1] + "px;";
                if (margin[2] > 0) cssFragment += "margin-right: " + margin[2] + "px;";
                if (margin[3] > 0) cssFragment += "margin-bottom: " + margin[3] + "px;";
            }
            return cssFragment;
        }

        /**
        * render(args : {owComponent, oRenderedElement?, noBoxing?}) : HTMLElement { attach: function(oContainerElement) }
        */
        function render(args) {
            var owComponent = args.owComponent;
            var oRenderedElement = args.oRenderedElement || oDocument.createElement("div"), oElementBox = null;
            // rendered element (border)
            var elementCssText = computeBorderCSSText(owComponent);
            // rendered element/element box (margin)
            if (args.noBoxing) {
                elementCssText += computeMarginCSSText(owComponent);
            }
            else {
                // necessary to create div for margins in order to allow for width: 100% elements (typically tables)
                oElementBox = oDocument.createElement("div");
                addClasses(oElementBox, owComponent.classes);
                // we are only interested in margin settings!
                oElementBox.style.cssText = "border: 0px; padding: 0px;" + computeMarginCSSText(owComponent);
                oElementBox.appendChild(oRenderedElement);
            }
            // rendered element (padding)
            if (owComponent.padding) {
                var padding = $.map(owComponent.padding, function (v) { return v || 0; });
                if (padding[0] > 0) elementCssText += "padding-left: " + padding[0] + "px;";
                if (padding[1] > 0) elementCssText += "padding-top: " + padding[1] + "px;";
                if (padding[2] > 0) elementCssText += "padding-right: " + padding[2] + "px;";
                if (padding[3] > 0) elementCssText += "padding-bottom: " + padding[3] + "px;";
            }
            // rendered element (text alignment)
            var textAlignment = null;
            if (owComponent.direction) {
                textAlignment = owComponent.direction == "rtl" ? "right" : "left";
            } else if (isRtl) {
                textAlignment = "right";
            }
            if (textAlignment) {
                elementCssText += "text-align:" + textAlignment + ";";
            }
            if (elementCssText) {
                oRenderedElement.style.cssText = elementCssText;
            }
            addClasses(oRenderedElement, owComponent.classes);
            oRenderedElement.attach = function (oContainerElement) {
                if (oElementBox != null) {
                    oContainerElement.appendChild(oElementBox);
                } else if (oRenderedElement != oContainerElement) {
                    oContainerElement.appendChild(oRenderedElement);
                }
            }
            return oRenderedElement;
        };

        var mWidgets = {
            // Anchor { id }
            Anchor: function (owAnchor, oContainerElement) {
                var oA = oDocument.createElement('a');
                oA.name = owAnchor.id;
                render({ owComponent: owAnchor, oRenderedElement: oA }).attach(oContainerElement);
            },

            // Component { children : Widget[], type?: string, class? : string }
            Component: function (owComponent, oContainerElement) {
                if (owComponent.children && owComponent.children.length > 0) {
                    var oRenderedElement = render({ owComponent: owComponent });
                    if (owComponent.children.length > 1) {
                        var cssFragment = "float:bottom;width:100%;";
                        // NOTE: "display:inline-block" is required by IE6
                        if ($.browser.msie && $.browser.version.substr(0, 1) <= 6) {
                            cssFragment += "display:inline-block";
                        }
                        $.each(owComponent.children, function (i, oChildWidget) {
                            var oChildDIV = oDocument.createElement("div");
                            if (cssFragment !== null) {
                                oChildDIV.style.cssText = cssFragment;
                            }
                            internal.widget(oChildWidget, oChildDIV, getLegacyClasses(owComponent.classes));
                            oRenderedElement.appendChild(oChildDIV);
                        });
                    } else {
                        internal.widget(owComponent.children[0], oRenderedElement, getLegacyClasses(owComponent.classes));
                    }
                    oRenderedElement.attach(oContainerElement);
                }
            },

            // ContentBreadCrumbs
            ContentBreadCrumbs: function (owContentPath, oContainerElement) {
                var oRenderedElement = render({ owComponent: owContentPath, noBoxing: true });
                oRenderedElement.className = "content-breadcrumbs";
                $(oRenderedElement).css({ overflow: "auto", width: "100%", height: "100%" });
                $(oDocument).bind(jreport$EVENT.contentchange, function (event) {
                    internal.forNode(mCurrentContent.id).forBranch(function (aBranch) {
                        $(oRenderedElement).empty();
                        internal.widget({ StackPanel: {
                            orientation: "Horizontal",
                            // with right-to-left language support
                            children: $.map(isRtl ? aBranch.reverse() : aBranch, function (oNode, i) {
                                return { StackPanel: { orientation: "Horizontal", children: [
                                    { Hyperlink: { url: "jreport://" + oNode.id, text: oNode.name || "Untitled"} },
                                    { HTMLPresenter: { html: (i < (aBranch.length - 1)) ? "&nbsp;" + ">" + "&nbsp;" : ""} }
                                ]
                                }
                                };
                            })
                        }
                        }, oRenderedElement);
                    });
                });
                oRenderedElement.attach(oContainerElement);
            },

            // ContentBrowser { roots : string[] }
            ContentBrowser: function (owContentBrowser, oContainerElement) {
                var oRenderedElement = render({ owComponent: owContentBrowser, noBoxing: true });
                // use scrollbars as necessary
                $(oRenderedElement).css({ overflow: "auto", width: "100%", height: "100%" });
                var oUL = oDocument.createElement("ul");
                oUL.className = "content-browser";
                oRenderedElement.appendChild(oUL);
                var mTreeProvider;
                mTreeProvider = {
                    getChildren: function (sItemId, yield_return) {
                        // extract node id-from item-id
                        var sNodeId = sItemId !== null ? sItemId.substring(ContentBrowser$ITEMIDPREFIX.length) : null;
                        internal.forNode(sNodeId, { fnCallback: function (oNode) {
                            var callbackSequence = new internal.CallbackSequence();
                            $.each(oNode !== null ? oNode.children : sItemId !== null ? [] : owContentBrowser.roots, function (i, childNode) {
                                internal.forNode(childNode, { fnCallback: function (oChildNode) {
                                    // use callback sequence to ensure child nodes are returned in proper order.
                                    callbackSequence.invoke(i, function () {
                                        if (oChildNode) {
                                            // Note: item-id should not match content-id so as to avoid automatic scrollIntoView on item click (as content id is used as fragment identifier)
                                            // we thus prepend ContentBrowser$ITEMIDPREFIX to the node-id
                                            var sChildItemid = ContentBrowser$ITEMIDPREFIX + (oChildNode.id ? oChildNode.id : "");
                                            var hasChildren = (oChildNode.children && oChildNode.children.length > 0);
                                            if (oChildNode.hidden) {
                                                //if (hasChildren) {
                                                //    mTreeProvider.getChildren(sChildItemid, yield_return);
                                                //}
                                            } else if (oChildNode.skip) {
                                                if (hasChildren) {
                                                    mTreeProvider.getChildren(sChildItemid, yield_return);
                                                }
                                            }
                                            else {
                                                yield_return({
                                                    id: sChildItemid,
                                                    label: oChildNode.name || "&lt;Untitled&gt;",
                                                    hasChildren: hasChildren
                                                });
                                            }
                                        }
                                    });
                                }
                                });
                            });
                        }
                        });
                    },
                    onClick: function (sItemId) {
                        // extract node-id/content-fragment from item-id
                        var sNodeId = sItemId.substring(ContentBrowser$ITEMIDPREFIX.length);
                        internal.resolve(sNodeId, function (sContentId, sAnchorId, page) {
                            var parameterString = internal.buildParameterString(sContentId, sAnchorId, page);
                            jreport.display(sContentId ? sContentId : "", /* bReveal: */true, sAnchorId, page);
                        });
                    },
                    isRtl: isRtl
                }
                $(oUL).treeControl(mTreeProvider);

                $(oDocument).bind(jreport$EVENT.contentchange, function (event) {
                    internal.forNode(mCurrentContent.id).forBranch(function (aBranch) {
                        $(oUL).treeControl().selectAndReveal($.map(aBranch, function (oNode) { return ContentBrowser$ITEMIDPREFIX + oNode.id; }), /* bReveal: */false);
                    });
                });
                $(oDocument).bind(jreport$EVENT.contentreveal, function (event) {
                    internal.forNode(mCurrentContent.id).forBranch(function (aBranch) {
                        $(oUL).treeControl().selectAndReveal($.map(aBranch, function (oNode) { return ContentBrowser$ITEMIDPREFIX + oNode.id; }), /* bReveal: */true);
                    });
                });
                oRenderedElement.attach(oContainerElement);
            },

            // ContentHolder
            ContentHolder: function (owContentHolder, oContainerElement) {
                // render without boxing so that overflow behaves properly
                var oRenderedElement = render({ owComponent: owContentHolder, noBoxing: true });
                oRenderedElement.className = "content-holder";
                // use scrollbars as necessary
                $(oRenderedElement).css({ height: "100%", overflow: "auto" });
                if (!mWidgets.StaticInit$ContentHolder) {
                    $(oDocument).bind(jreport$EVENT.contentchange, function (event) {
                        $("div.content-holder").each(function (index, oContentHolderDIV) {
                            $(oContentHolderDIV).empty();
                            jreport.apply((mCurrentContent.id || "") + ".content." + mCurrentContent.page, oContentHolderDIV);
                        });
                    });
                    $(oDocument).bind(jreport$EVENT.contentreveal, function (event) {
                        $("div.content-holder").each(function (index, oContentHolderDIV) {
                            if (mCurrentContent.anchor) {
                                var a = $(oContentHolderDIV).find("a[name='" + mCurrentContent.anchor + "']")[0];
                                if (a) {
                                    a.scrollIntoView(true);
                                }
                            }
                        });
                    });
                    mWidgets.StaticInit$ContentHolder = true;
                }
                oRenderedElement.attach(oContainerElement);
            },

            // DiagramView { { svgdata | { map, mapname, imgsrc } }, size: { width: int, height: int } }
            DiagramView: function (owDiagramView, oContainerElement) {
                var oRenderedElement;
                if (owDiagramView.svgdata) {
                    oRenderedElement = render({ owComponent: owDiagramView, oRenderedElement: oDocument.createElement("object") });
                    oRenderedElement.data = owDiagramView.svgdata;
                    oRenderedElement.type = "image/svg+xml";
                }
                else if (owDiagramView.imgsrc) {
                    var oIMG = oRenderedElement = render({ owComponent: owDiagramView, oRenderedElement: oDocument.createElement("img") });
                    oIMG.border = 0;
                    if (owDiagramView.map && owDiagramView.mapname) {
                        var oDIV = oDocument.createElement("div");
                        oDIV.innerHTML = owDiagramView.map;
                        oContainerElement.appendChild(oDIV);
                        var aAREAs = oDIV.firstChild.childNodes;
                        for (var i = 0; i < aAREAs.length; i++) {
                            aAREAs[i].onmouseover = function (e) {
                                var oAREA = this;
                                if (oAREA.id) {
                                    oDocument.jdata.resolve(oAREA.id, function (sContentId, sAnchorId, page) {
                                        if (sContentId != null) {
                                            // keep # even in case no parameter string is present to avoid page reload (thus losing treeview expansion state) upon clicking on hyperlink to root
                                            var parameterString = internal.buildParameterString(sContentId, sAnchorId, page);
                                            oAREA.href = sLocationHref + (parameterString ? ("#" + parameterString) : "#");
                                        }
                                    });
                                    if (!$.browser.msie) {
                                        oAREA.removeAttribute("id");
                                    }
                                }
                                this.onmouseover = null;
                            };
                        }
                        oIMG.useMap = "#" + owDiagramView.mapname;
                    }
                    oIMG.src = owDiagramView.imgsrc;
                }
                oRenderedElement.attach(oContainerElement);
            },

            // DockPanel { orientation? : { Vertical, Horizontal }, dimensions : int[1..2] left|top, right|bottom], children : Widget[dimensions.length + 1] where the last widget is the one with auto width/height }
            DockPanel: function (owDockPanel, oContainerElement) {
                var orientation = owDockPanel.orientation || "Vertical";
                var dimensions = owDockPanel.dimensions;
                var children = owDockPanel.children;
                if (!$.browser.webkit && orientation == "Vertical") {
                    $.each(children, function (i, owChild) {
                        var oDIV = oDocument.createElement("div");
                        var cssText = null;
                        var dimensionsSum = 0;
                        if (i < (children.length - 1)) {
                            // docked panel
                            if (dimensions[i]) {
                                dimensionsSum += dimensions[i];
                                if (i == 0) {
                                    cssText = "position:absolute;top:0px;height:" + dimensions[i] + "px;width:100%;";
                                } else if (i == 1) {
                                    cssText = "position:absolute;bottom:0px;height:" + dimensions[i] + "px;width:100%;";
                                }
                            }
                        } else {
                            // center panel
                            cssText = "position:absolute;width:100%;";
                            cssText += "top:" + ((dimensions[0] + 1) || 0) + "px;";
                            cssText += "bottom:" + ((dimensions[1] + 1) || 0) + "px;";
                        }
                        if (cssText) {
                            oDIV.style.cssText = cssText;
                        }
                        internal.widget(owChild, oDIV);
                        oContainerElement.appendChild(oDIV);
                    });
                } else {
                    // non-IE browser, use table panel for efficiency
                    internal.widget({ TablePanel: {
                        orientation: orientation,
                        dimensions: [dimensions[0], "*"].concat(dimensions.length == 2 ? [dimensions[1]] : []),
                        children: [children[0], children[children.length - 1]].concat(children.length == 3 ? [children[1]] : [])
                    }
                    }, oContainerElement);
                }
            },

            // Hyperlink { url, content : Widget | text : string }
            Hyperlink: function (owHyperlink, oContainerElement) {
                var createA = function (href) {
                    var oA = render({ owComponent: owHyperlink, oRenderedElement: oDocument.createElement("a") });
                    oA.href = href;
                    if (owHyperlink.content) {
                        internal.widget(owHyperlink.content, oA, owHyperlink.classes);
                    } else if (owHyperlink.text) {
                        internal.widget({ TextPresenter: owHyperlink }, oA);
                    } else {
                        oA.innerHTML = sUrl;
                    }
                    if (owHyperlink.direction) {
                        oA.dir = owHyperlink.direction;
                    }
                    oA.attach(oContainerElement);
                    return oA;
                }
                var sUrl = owHyperlink.url;
                if (sUrl.indexOf("jreport://") == 0) {
                    var sContentFragment = sUrl.substring("jreport://".length);
                    internal.resolve(sContentFragment, function (sContentId, sAnchorId, page) {
                        if (sContentId) {
                            var parameterString = internal.buildParameterString(sContentId, sAnchorId, page);
                            // keep # even in case no parameter string is present to avoid page reload (thus losing treeview expansion state) upon clicking on hyperlink to root
                            var oA = createA(sLocationHref + (parameterString ? ("#" + parameterString) : "#"));
                            oA.onclick = function () { $.jreport.display(sContentId ? sContentId : "", /* bReveal: */true, sAnchorId, page); };

                        } else {
                            internal.widget({ TextPresenter: owHyperlink }, oContainerElement);
                        }
                    });
                } else {
                    // standard url
                    createA(sUrl);
                }
            },

            // HTMLPresenter { html, head? }
            HTMLPresenter: function (owHTMLPresenter, oContainerElement) {
                oContainerElement.innerHTML = owHTMLPresenter.html;
                if (owHTMLPresenter.head) {
                    var oHead = document.getElementsByTagName("head").item(0);
                    if (oHead) {
                        $(oHead).append(owHTMLPresenter.head);
                    }
                }
                $(oContainerElement).find("div[class=dynamic]").jreport();
            },

            // ImageView { imgsrc }
            ImageView: function (owImageView, oContainerElement) {
                var oIMG = render({ owComponent: owImageView, oRenderedElement: oDocument.createElement("img") });
                oIMG.src = owImageView.imgsrc;
                //oIMG.border = 0;
                oIMG.attach(oContainerElement);
            },

            // ListView { columnCount, minColumnWidth, minRowHeight, columnHeaders : Widget[], rowHeaders : Widget[], cells : Widget[] }
            ListView: function (owListView, oContainerElement) {
                var oTABLE = render({ owComponent: owListView, oRenderedElement: oDocument.createElement("table") });
                var oTR, oTD, oTBODY;
                oTABLE.style.cssText += "border-spacing:0px; border-collapse:collapse; width: 100%;";
                var columnCount = owListView.columnCount;
                if (columnCount > 0) {
                    var rowCount = owListView.cells.length / columnCount;
                    // column definitions
                    var oCOLGROUP = oDocument.createElement("colgroup");
                    oTABLE.appendChild(oCOLGROUP);
                    var borderCssText = computeBorderCSSText(owListView);
                    for (var column = 0; column < columnCount; column++) {
                        var oCOL = oDocument.createElement("col");
                        addClasses(oCOL, owListView.classes);
                        if (borderCssText) {
                            oCOL.style.cssText = borderCssText;
                        }
                        if (!owListView.columnWidths || owListView.columnWidths[column] == "*") {
                            $(oCOL).css("width", "1*");
                        } else {
                            $(oCOL).css("width", owListView.columnWidths[column] + "px");
                        }
                        oCOLGROUP.appendChild(oCOL);
                    }
                    // msie compatibility
                    if ($.browser.msie) {
                        oTBODY = oDocument.createElement("tbody");
                        oTABLE.appendChild(oTBODY);
                    } else {
                        oTBODY = oTABLE;
                    }
                    // column headers
                    if (owListView.columnHeaders) {
                        oTR = oDocument.createElement("tr");
                        addClasses(oTR, owListView.classes);
                        if (borderCssText) {
                            oTR.style.cssText = borderCssText;
                        }
                        oTBODY.appendChild(oTR);
                        if (owListView.rowHeaders) {
                            // matrix origin: empty cell
                            oTD = oDocument.createElement("td");
                            oTR.appendChild(oTD);
                        }
                        $.each(owListView.columnHeaders, function (i, oHeaderWidget) {
                            oTD = oDocument.createElement("td");
                            var widgetClasses = getWidgetClasses(oHeaderWidget);
                            addClasses(oTD, getLegacyClasses(widgetClasses));
                            oDIV = oDocument.createElement("div");
                            addClasses(oDIV, widgetClasses);
                            oTD.appendChild(oDIV);
                            internal.widget(oHeaderWidget, oDIV);
                            oTR.appendChild(oTD);
                        });
                    }
                    // row headers and cells
                    var currentRow = -1;
                    $.each(owListView.cells, function (i, oCellWidget) {
                        var widgetClasses;
                        if ((i % columnCount) == 0) {
                            oTR = oDocument.createElement("tr");
                            oTBODY.appendChild(oTR);
                            currentRow++;
                            if (owListView.rowHeaders) {
                                // row header
                                addClasses(oTR, owListView.classes);
                                if (borderCssText) {
                                    oTR.style.cssText = borderCssText;
                                }
                                var oRowHeaderWidget = owListView.rowHeaders[currentRow];
                                widgetClasses = getWidgetClasses(oRowHeaderWidget);
                                oTD = oDocument.createElement("td");
                                addClasses(oTD, getLegacyClasses(widgetClasses));
                                oDIV = oDocument.createElement("div");
                                addClasses(oDIV, widgetClasses);
                                oTD.appendChild(oDIV);
                                internal.widget(oRowHeaderWidget, oDIV);
                                oTR.appendChild(oTD);
                            }
                        }
                        // cell
                        oTD = oDocument.createElement("td");
                        //oTD.style.cssText += "border-bottom:0px; border-top:0px;";
                        widgetClasses = getWidgetClasses(oCellWidget);
                        addClasses(oTD, getLegacyClasses(widgetClasses));
                        if (currentRow % 2 == 1) {
                            addClasses(oTD, [CSS$LOGICALCLASS.alternate]);
                        }
                        oDIV = oDocument.createElement("div");
                        addClasses(oDIV, widgetClasses);
                        oTD.appendChild(oDIV);
                        internal.widget(oCellWidget, oDIV);
                        oTR.appendChild(oTD);
                    });
                }
                oTABLE.attach(oContainerElement);
            },

            // NavigationBar
            NavigationBar: function (owNavigationBar, oContainerElement) {
                var oRenderedElement = render({ owComponent: owNavigationBar, noBoxing: true });
                var oSPAN = oDocument.createElement("span");
                oRenderedElement.appendChild(oSPAN);
                oSPAN.className = "content-nav-bar";
                oSPAN.pageCount = 1;
                if (isRtl) {
                    $(oSPAN).addClass(CSS$CLASS.flipped);
                }
                var aButtonSPANs = new Array(5);
                for (var i = 0; i < aButtonSPANs.length; i++) {
                    aButtonSPANs[i] = oDocument.createElement("span");
                }
                nextNodeButtonClass = isRtl ? "content-nav-prev-button" : "content-nav-next-button";
                nextPageButtonClass = isRtl ? "content-nav-back-button" : "content-nav-forward-button";
                previousNodeButtonClass = isRtl ? "content-nav-next-button" : "content-nav-prev-button";
                previousPageButtonClass = isRtl ? "content-nav-forward-button" : "content-nav-back-button";

                aButtonSPANs[0].className = previousNodeButtonClass;
                aButtonSPANs[1].className = previousPageButtonClass;
                aButtonSPANs[2].className = "content-nav-text";
                aButtonSPANs[3].className = nextPageButtonClass;
                aButtonSPANs[4].className = nextNodeButtonClass;

                aButtonSPANs[2].dir = "ltr";

                for (var i = 0; i < aButtonSPANs.length; i++) {
                    if (aButtonSPANs[i].className.indexOf("button") != -1) {
                        $(aButtonSPANs[i]).addClass("content-nav-bar-button");
                    }
                    oSPAN.appendChild(aButtonSPANs[i]);
                }
                oRenderedElement.attach(oContainerElement);
                $(oContainerElement).disableSelection();

                $(oSPAN).find("span." + previousNodeButtonClass).click(function (event) {
                    if (mCurrentContent.page > 1) {
                        $(oSPAN).find("span." + previousPageButtonClass).trigger("click");
                    } else {
                        internal.forNode(mCurrentContent.id).forPreviousWhere(
                            function (oPrevious) { if (oPrevious) { $.jreport.display(oPrevious.id, true, null, oPrevious.pagecount || 1); } },
                            function (oPrevious) { return oPrevious.id.indexOf('#') != 0; }
                        );
                    }
                });
                $(oSPAN).find("span." + nextNodeButtonClass).click(function (event) {
                    if (mCurrentContent.page < oSPAN.pageCount) {
                        $(oSPAN).find("span." + nextPageButtonClass).trigger("click");
                    } else {
                        internal.forNode(mCurrentContent.id).forNextWhere(
                            function (oNext) { if (oNext) { $.jreport.display(oNext.id, true); } },
                            function (oNext) { return oNext.id.indexOf('#') != 0; }
                        );
                    }
                });
                $(oSPAN).find("span." + previousPageButtonClass).click(function (event) {
                    if (mCurrentContent.page > 1) {
                        $.jreport.display(mCurrentContent.id, false, null, mCurrentContent.page - 1);
                    }
                });
                $(oSPAN).find("span." + nextPageButtonClass).click(function (event) {
                    if (mCurrentContent.page < oSPAN.pageCount) {
                        $.jreport.display(mCurrentContent.id, false, null, mCurrentContent.page + 1);
                    }
                });
                if (!mWidgets.StaticInit$PageBrowser) {
                    function enable(buttonClassName) {
                        $(oSPAN).find("span." + buttonClassName).removeClass(CSS$CLASS.disabled).addClass(CSS$CLASS.enabled);
                    }
                    function disable(buttonClassName) {
                        $(oSPAN).find("span." + buttonClassName).removeClass(CSS$CLASS.enabled).addClass(CSS$CLASS.disabled);
                    }
                    $(oDocument).bind(jreport$EVENT.contentchange, function (event) {
                        internal.forNode(mCurrentContent.id, { fnCallback: function (oNode) {
                            oSPAN.pageCount = oNode.pagecount || 1;
                            $("span.content-nav-bar").each(function (index, oSPAN) {
                                if (mCurrentContent.page == 1) {
                                    disable(previousPageButtonClass);
                                    internal.forNode(mCurrentContent.id).forPreviousWhere(
                                        function (oPrevious) { if (oPrevious) { enable(previousNodeButtonClass); } else { disable(previousNodeButtonClass); } },
                                        function (oPrevious) { return oPrevious.id.indexOf('#') != 0; }
                                    );
                                } else if (mCurrentContent.page > 1) {
                                    enable(previousPageButtonClass);
                                    enable(previousNodeButtonClass);
                                }
                                if (mCurrentContent.page == oSPAN.pageCount) {
                                    disable(nextPageButtonClass);
                                    internal.forNode(mCurrentContent.id).forNextWhere(
                                        function (oNext) { if (!oNext) { disable(nextNodeButtonClass); } else { enable(nextNodeButtonClass); } },
                                        function (oNext) { return oNext.id.indexOf('#') != 0; }
                                    );
                                } else if (mCurrentContent.page < oSPAN.pageCount) {
                                    enable(nextPageButtonClass);
                                    enable(nextNodeButtonClass);
                                }
                                $(oSPAN).find("span.content-nav-text").text(mCurrentContent.page + " / " + oSPAN.pageCount);
                            });
                        } 
                        });
                    });
                    mWidgets.StaticInit$PageBrowser = true;
                }
            },

            // PropertyGrid??
            PropertyGrid: function (owPropertyGrid, oContainerElement) {
                var oTABLE = render({ owComponent: owPropertyGrid, oRenderedElement: oDocument.createElement("table") });
                var oTR, oTD;
                $.each(owPropertyGrid.children, function (i, oProperty) {
                    oTR = oDocument.createElement("tr");
                    oTD = oDocument.createElement("td");
                    oTD.innerHTML = oProperty[0] + ":";
                    oTD.className = CSS$CLASS.label;
                    oTR.appendChild(oTD);
                    oTD = oDocument.createElement("td");
                    oTD.innerHTML = oProperty[1];
                    oTD.className = CSS$CLASS.value;
                    oTR.appendChild(oTD);
                    oTABLE.appendChild(oTR);
                });
                oTABLE.attach(oContainerElement);
            },

            // SplitPanel { orientation? : { Horizontal, Vertical}, ratio? : 0...1 float, minPaneSize? : int[2] }, children : Widget[2] }
            SplitPanel: function (owSplitPanel, oContainerElement) {
                var oRenderedElement = render({ owComponent: owSplitPanel, noBoxing: true });
                var orientation = (owSplitPanel.orientation || "Horizontal") == "Horizontal" ? "Vertical" : "Horizontal";
                var ratio = owSplitPanel.ratio || 0.5;
                var minPaneSize = owSplitPanel.minPaneSize || [0, 0];
                var doFlip = isRtl && orientation == "Vertical";
                if (doFlip) {
                    ratio = 1 - ratio;
                    minPaneSize = minPaneSize.reverse();
                }
                $.each(doFlip ? owSplitPanel.children.reverse() : owSplitPanel.children, function (i, oChildWidget) {
                    var oChildDIV = oDocument.createElement("div");
                    internal.widget(oChildWidget, oChildDIV);
                    oRenderedElement.appendChild(oChildDIV);
                });
                oRenderedElement.attach(oContainerElement);
                $(oRenderedElement).splitterControl(orientation, ratio, minPaneSize);
            },

            // StackPanel { orientation? : { Vertical, Horizontal }, itemSpacing? : int,  children : Widget[] }
            StackPanel: function (owStackPanel, oContainerElement) {
                var oRenderedElement = render({ owComponent: owStackPanel });
                var orientation = owStackPanel.orientation || "Vertical";
                var doFlip = false;
                var cssFragment = null;
                if (orientation == "Horizontal") {
                    doFlip = isRtl;
                    cssFragment = "float:" + (doFlip ? "right" : "left") + ";height:100%;";
                    if (owStackPanel.itemSpacing) {
                        cssFragment += "margin-" + (doFlip ? "right" : "left") + ":" + owStackPanel.itemSpacing + "px;";
                    }
                } else {
                    cssFragment = "float:bottom;width:100%;";
                    if (owStackPanel.itemSpacing) {
                        cssFragment += "margin-bottom:" + owStackPanel.itemSpacing + "px;";
                    }
                    // NOTE: "display:inline-block" is required by IE6
                    if ($.browser.msie && $.browser.version.substr(0, 1) <= 6) {
                        cssFragment += "display:inline-block;";
                    }
                }
                $.each(doFlip ? owStackPanel.children.reverse() : owStackPanel.children, function (i, oChildWidget) {
                    var oChildDIV = oDocument.createElement("div");
                    if (cssFragment !== null) {
                        oChildDIV.style.cssText = cssFragment;
                    }
                    internal.widget(oChildWidget, oChildDIV);
                    oRenderedElement.appendChild(oChildDIV);
                });
                oRenderedElement.attach(oContainerElement);
            },

            // TablePanel { orientation? : { Vertical, Horizontal }, dimensions : int[] width|height, children : Widget[] }
            TablePanel: function (owTablePanel, oContainerElement) {
                var orientation = owTablePanel.orientation || "Vertical";
                var isHorizontal = (orientation == "Horizontal")
                var oTABLE = render({ owComponent: owTablePanel, oRenderedElement: oDocument.createElement("table"), noBoxing: true }), oTBODY = oTABLE, oTR;
                if ($.browser.msie) {
                    oTBODY = oDocument.createElement("tbody");
                    oTABLE.appendChild(oTBODY);
                }
                $(oTABLE).css("height", "100%").css("width", "100%");
                if (isHorizontal) {
                    oTR = oDocument.createElement("tr");
                }
                $.each(owTablePanel.children, function (i, oChildWidget) {
                    var oChildTD = oDocument.createElement("td");
                    if (isHorizontal) {
                        $(oChildTD).css("width", owTablePanel.dimensions[i]);
                        if (i == (owTablePanel.children.length - 1)) {
                            $(oChildTD).css("text-align", isRtl ? "left" : "right");
                        }
                    } else {
                        oTR = oDocument.createElement("tr");
                        if (owTablePanel.dimensions[i] != "*") {
                            oTR.height = owTablePanel.dimensions[i] + "px";
                        }
                        oTBODY.appendChild(oTR);
                        $(oTR).css("height", owTablePanel.dimensions[i]);
                        $(oChildTD).css("height", owTablePanel.dimensions[i]);
                    }
                    oTR.appendChild(oChildTD);
                    internal.widget(oChildWidget, oChildTD);
                });
                if (isHorizontal) {
                    oTBODY.appendChild(oTR);
                }
                oTABLE.attach(oContainerElement);
            },

            // TextPresenter { text, background:htmlcolor, fontfamily, fontsize:int, fontstyle, fontweight, foreground }
            TextPresenter: function (owTextPresenter, oContainerElement) {
                var oRenderedElement = render({ owComponent: owTextPresenter, oRenderedElement: oContainerElement, noBoxing: true });
                var cssText = oRenderedElement.style.cssText || "";
                if (owTextPresenter.direction) {
                    oElement.dir = owTextPresenter.direction;
                }
                if (owTextPresenter.background) {
                    cssText += "background-color:" + owTextPresenter.background + ";";
                }
                if (owTextPresenter.fontfamily) {
                    cssText += "font-family:" + owTextPresenter.fontfamily + ";";
                }
                if (owTextPresenter.fontsize) {
                    cssText += "font-size:" + owTextPresenter.fontsize + "px;";
                }
                if (owTextPresenter.fontstyle) {
                    cssText += "font-style:" + owTextPresenter.fontstyle + ";";
                }
                if (owTextPresenter.fontweight) {
                    cssText += "font-weight:" + owTextPresenter.fontweight + ";";
                }
                if (owTextPresenter.foreground) {
                    cssText += "color:" + owTextPresenter.foreground + ";";
                }
                if (owTextPresenter.textdecoration) {
                    cssText += "text-decoration:" + owTextPresenter.textdecoration + ";";
                }
                if (owTextPresenter.textalign) {
                    cssText += "text-align:" + owTextPresenter.textalign + ";";
                }
                if (cssText) {
                    oRenderedElement.style.cssText = cssText;
                    // IE-specific: setting background-color does not seem to work properly
                    oRenderedElement.style.backgroundColor = owTextPresenter.background;
                }
                // escape html characters
                $(oRenderedElement).text(owTextPresenter.text);
                // handle newlines + tabs
                oRenderedElement.innerHTML = oRenderedElement.innerHTML.replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/ /g, "&nbsp;");
                oRenderedElement.attach(oContainerElement);
            }

        };
        // factory method
        return function (oWidget, oContainerElement, aAdditionalClasses) {
            if (oWidget) {
                for (var widgetType in oWidget) {
                    if (mWidgets[widgetType]) {
                        var mWidget = oWidget[widgetType];
                        var widgetClasses = mWidget.classes;
                        mWidget.classes = (widgetClasses || []).concat(aAdditionalClasses || []);
                        mWidgets[widgetType](mWidget, oContainerElement);
                        mWidget.classes = widgetClasses;
                    }
                }
            }
        };
    })();

    /**
    * internal.forNode(sNodeId|oNode, mOptions : { bRefresh, fnCallback(oNode) })
    */
    internal.forNode = oDocument.jdata.forNode;

    /**
    * internal.fetch(sResource, fnCallback(json), bUseCache)
    */
    internal.fetch = oDocument.jdata.fetch;

    /**
    * internal.resolve(sContentFragment, fnCallback(sContentId, sAnchorId, page))
    */
    internal.resolve = oDocument.jdata.resolve;

    /**
    * Use to guarantee invocation order in asynchronous code.
    *
    * Sample use:
    * var callbackSequence = new internal.CallbackSequence();
    * ...
    * callbackSequence.invoke(4, function() {});
    * callbackSequence.invoke(1, function() {});
    * callbackSequence.invoke(3, function() {});
    * callbackSequence.invoke(2, function() {});
    *
    */
    internal.CallbackSequence = function () {
        var next = 0;
        return {
            invoke: function (rank, fnCallback) {
                this[rank] = fnCallback;
                while (this[next]) {
                    this[next]();
                    delete this[next];
                    next++;
                }
            }
        };
    };

    /**
    * jreport() jQuery extension method
    */
    var jreport = function () {
        return this.each(function (index, oWidgetElement) {
            jreport.apply(oWidgetElement.id, oWidgetElement);
        });
    };

    /**
    * Loads the specified resource and renders its content inside the specified HTML element.
    *
    * @param sResource resource id
    * @param oWidgetElement target HTML element
    * @param optional callback invoked on success
    * @returns
    */
    jreport.apply = function (sResource, oWidgetElement, fnCallback) {
        internal.fetch(sResource, function (oWidget) {
            if (oWidget !== null) {
                internal.widget(oWidget, oWidgetElement);
                if (fnCallback) {
                    fnCallback();
                }
                if ($.browser.msie) {
                    $(window).trigger("resize");
                }
            } else {
                // display error widget?
            }
        }, true);
    };

    /**
    * Displays the content with the specified id, optional anchor id and/or page number.
    *
    * @param sContentId
    * @param bReveal? 
    * @param sAnchorId?
    * @param page?
    * @returns
    */
    jreport.display = function (sContentId, bReveal, sAnchorId, page) {
        oDocument.updateHash(internal.buildParameterString(sContentId, sAnchorId, page));
        sContentId = sContentId || "";
        page = page || 1;
        if (sContentId != mCurrentContent.id || page != mCurrentContent.page) {
            mCurrentContent.id = sContentId;
            mCurrentContent.page = page;
            $(oDocument).trigger(jreport$EVENT.contentchange);
        }
        mCurrentContent.anchor = sAnchorId;
        if (bReveal) {
            $(oDocument).trigger(jreport$EVENT.contentreveal);
        }
    };

    $.fn.jreport = jreport;

    $.jreport = jreport;

    // Common Helpers
    $.extend($.fn, {
        /**
        * Disables text selection on the elements in the jQuery wrapped set
        * @returns
        */
        disableSelection: function () {
            return this.bind("mousedown.ui-disableSelection selectstart.ui-disableSelection", function (e) { e.preventDefault(); });
        },

        /**
        * Adds the specified CSS class to the elements in the jQuery wrapped set on hover
        * 
        * @param sClass CSS hover class name
        * @returns original jQuery wrapped set
        */
        hoverClass: function (sClass) {
            sClass = sClass || CSS$CLASS.hovered;
            return this.hover(function () {
                $(this).addClass(sClass);
            }, function () {
                $(this).removeClass(sClass);
            });
        },

        /**
        * Swaps the CSS classes of elements in the jQuery wrapped set.
        *   
        * @param sClassA CSS class name
        * @param sClassB CSS class name
        * @returns original jQuery wrapped set
        */
        swapClass: function (sClassA, sClassB) {
            var aClassAElements = this.filter('.' + sClassA);
            this.filter('.' + sClassB).removeClass(sClassB).addClass(sClassA);
            aClassAElements.removeClass(sClassA).addClass(sClassB);
            return this;
        },

        /**
        * Toggles the visibility of elements in the jQuery wrapped set.
        * 
        * @param fnCallback? : $[].function(bShow) Callback invoked for each element in the jQuery wrapped set
        * @returns original jQuery wrapped set
        */
        toggleVisibility: function (fnCallback) {
            return this.each(function () {
                var bShow = $(this).is(":hidden");
                $(this)[bShow ? "show" : "hide"]();
                if (fnCallback) {
                    fnCallback.call(this, bShow);
                }
            });
        }
    });

    // Controls
    $.extend($.fn, {

        /**
        * Creates a splitter control to allow for interactive resizing of the two children of a DIV element.
        *
        * @param orientation? : { Horizontal, Vertical}
        * @param ratio? : float 0...1
        * @param minPaneSize? : string[2]
        * @param doFlip? : boolean
        * @see based on code by Kristaps Kukurs
        * @returns original jQuery wrapped set
        */
        splitterControl: function (orientation, ratio, minPaneSize) {
            // validate/initialize parameters
            orientation = orientation || "Vertical";
            ratio = ratio || 0.5;
            minPaneSize = minPaneSize || [0, 0];
            var inits = {
                collapsablePane: minPaneSize[0] == 0 ? 0 : (minPaneSize[1] == 0 ? 1 : -1),
                panelCssText: "width:100%;height:100%;margin:0;padding:0;"
            };
            if (orientation == "Vertical") {
                inits.cursor = "e-resize";
                inits.splitSide = "left";
                inits.splitDimension = "width";
                inits.splitOrthogonalDimension = "height";
                inits.mouseEventProperty = "pageX";
                inits.splitterClass = CSS$CLASS.vsplitter;
                inits.splitterButtonClass = CSS$CLASS.vsplitterButton;
                inits.paneCssText = ["position:absolute;height:100%;", "position:absolute;height:100%;"];
            } else {
                inits.cursor = "n-resize";
                inits.splitSide = "top";
                inits.splitDimension = "height";
                inits.splitOrthogonalDimension = "width";
                inits.mouseEventProperty = "pageY";
                inits.splitterClass = CSS$CLASS.hsplitter;
                inits.splitterButtonClass = CSS$CLASS.hsplitterButton;
                inits.paneCssText = ["position:absolute;width:100%;", "position:absolute;width:100%;"];
            }
            this.each(function () {
                var $panel = $(this);
                var $panes = $panel.children();
                var $firstPane = $panes.eq(0);
                var $secondPane = $panes.eq(1);
                var $splitter, $virtualSplitter, $toggleButton;
                var fCurrentRatio = ratio;
                var toggleButtonOffset = 2;
                var fnSplitTo = function (fSplitRatio, bAnimate) {
                    fCurrentRatio = fSplitRatio;
                    var panelSize = $panel[inits.splitDimension]();
                    var splitPos = Math.max(0, (panelSize * fCurrentRatio) - ($splitter[inits.splitDimension]() + toggleButtonOffset));
                    // msie bug partial workaround (will not work in some nesting scenarii!)
                    if ($.browser.msie && inits.splitDimension == "width") {
                        $panel.css(inits.splitOrthogonalDimension, $panel.parent()[inits.splitOrthogonalDimension]() + "px");
                    }
                    $splitter.add($firstPane).add($secondPane).css(inits.splitOrthogonalDimension, $panel[inits.splitOrthogonalDimension]() + "px");
                    if ($toggleButton) {
                        $toggleButton[$panel[inits.splitOrthogonalDimension]() > 100 ? "show" : "hide"]();
                    }
                    if (bAnimate) {
                        var animations = [{}, {}, {}];
                        animations[0][inits.splitSide] = splitPos + "px";
                        animations[1][inits.splitDimension] = splitPos + "px";
                        animations[2][inits.splitDimension] = (panelSize - (splitPos + $splitter[inits.splitDimension]())) + "px";
                        animations[2][inits.splitSide] = splitPos + $splitter[inits.splitDimension]() + toggleButtonOffset + "px";
                        $splitter.show().animate(animations[0], 250);
                        $firstPane.show().animate(animations[1], 250);
                        $secondPane.show().animate(animations[2], 250);
                        // required for non-msie browsers in nested splitter scenarii
                        // setTimeout(function() { $secondPane.trigger("resize"); }, 255);
                    } else {
                        $splitter.css(inits.splitSide, splitPos + "px");
                        $firstPane.css(inits.splitSide, "0px").css(inits.splitDimension, splitPos + "px");
                        $secondPane.css(inits.splitSide, splitPos + $splitter[inits.splitDimension]() + toggleButtonOffset + "px");
                        $secondPane.css(inits.splitDimension, (panelSize - (splitPos + $splitter[inits.splitDimension]())) + "px");
                        // required for non-msie browsers in nested splitter scenarii
                        // $secondPane.trigger("resize");
                    }
                };
                var fnBeginDrag = function (e) {
                    if (e.target != this)
                        return;
                    $virtualSplitter = $virtualSplitter || $splitter.clone(/*copyHandlers: */false).insertAfter($firstPane);
                    if ($.browser.msie) {
                        // hide virtual splitter button in IE (to avoid displaying a clipped button!)
                        $virtualSplitter.find("." + inits.splitterButtonClass).hide();
                    }
                    $splitter.initPos = $splitter.position()[inits.splitSide];
                    $virtualSplitter.addClass(CSS$CLASS.virtual)
                        .css({ "position": "absolute", "z-index": "250", "-webkit-user-select": "none" })
                        .css(inits.splitSide, $splitter.initPos)
                        .width($splitter.width())
                        .height($splitter.height());
                    $panes.css("-webkit-user-select", "none"); // disable pane text selection (Safari)
                    $firstPane.splitPos = e[inits.mouseEventProperty];
                    $(document).bind("mousemove", fnDoDrag).bind("mouseup", fnEndDrag);
                };
                var fnDoDrag = function (e) {
                    var newPos = $splitter.initPos + e[inits.mouseEventProperty] - $firstPane.splitPos;
                    newPos = Math.max(newPos, minPaneSize[0]);
                    newPos = Math.min(newPos, $panel[inits.splitDimension]() - minPaneSize[1]);
                    $virtualSplitter.css(inits.splitSide, newPos);
                };
                var fnEndDrag = function (e) {
                    var pos = $virtualSplitter.offset()[inits.splitSide];
                    $virtualSplitter.remove();
                    $virtualSplitter = null;
                    $panes.css("-webkit-user-select", "text"); // re-enable pane text selection (Safari)
                    $(document).unbind("mousemove", fnDoDrag).unbind("mouseup", fnEndDrag);
                    fnSplitTo((pos - $panel.offset()[inits.splitSide] + ($splitter[inits.splitDimension]() + toggleButtonOffset)) / $panel[inits.splitDimension]());
                };

                this.style.cssText = inits.panelCssText;
                $firstPane[0].style.cssText = inits.paneCssText[0];
                $secondPane[0].style.cssText = inits.paneCssText[1];
                $splitter = $('<div><span></span></div>');
                $firstPane.after($splitter);
                $splitter
                    .attr({ "class": inits.splitterClass, unselectable: "on", dir: "ltr" })
                    .css({ cursor: inits.cursor, "user-select": "none", "-webkit-user-select": "none", "-khtml-user-select": "none", "-moz-user-select": "none", position: "absolute" })
                    .bind("mousedown", fnBeginDrag);

                if (inits.collapsablePane != -1) {
                    var fOriginalRatio;
                    $toggleButton = $('<div></div>').css({ cursor: "pointer", position: "absolute", "z-index": 999 });
                    $splitter.append($toggleButton);
                    $toggleButton.attr({ "class": inits.splitterButtonClass, unselectable: "on" });
                    if (inits.collapsablePane == 1) {
                        $toggleButton.addClass(CSS$CLASS.flipped);
                    }
                    $toggleButton.hoverClass(CSS$CLASS.virtual);
                    $toggleButton.bind("mousedown", function () {
                        $toggleButton.toggleClass(CSS$CLASS.flipped);
                        var fCollapsedRatio = inits.collapsablePane == 0 ? 0 : 1;
                        var isCollapsed = fCurrentRatio == fCollapsedRatio;
                        if (!isCollapsed) {
                            fOriginalRatio = fCurrentRatio;
                        }
                        fnSplitTo(isCollapsed ? fOriginalRatio : fCollapsedRatio, true);
                    });
                    $toggleButton.hide();
                }
                $panel.bind("resize", function (e) { if (e.target == this) fnSplitTo(fCurrentRatio); });
                $(window).bind("resize", function () { fnSplitTo(fCurrentRatio); });
                // webkit & firefox require resize to be triggered right after.
                setTimeout(function () { $(window).trigger("resize") }, 0);
                // handle issue with IE
                if ($.browser.msie) {
                    $firstPane.css("overflow", "hidden");
                    $secondPane.css("overflow", "hidden");
                }

            });
            return this;
        },

        /**
        * Creates a basic tree control out of a UL element
        * 
        * @param mTreeProvider : {
        *    getChildren : function(sItemId : string, yield_return : function({ id : string, label : string, hasChildren : boolean }))
        *    onClick? : function(sItemId : string)
        *    isRtl? : boolean
        * } 
        * Supplies logic for retrieving children and handling treeitem-related user events
        * 
        * @returns original jQuery wrapped set
        */
        treeControl: function (mTreeProvider) {

            var $_treeControl = this;

            // process UL wrapped set
            this.not("." + CSS$CLASS.treecontrol).addClass(CSS$CLASS.treecontrol).each(function () {

                // fnCreateItem(this : parentUL)
                var fnCreateItem = function (mItem/*{ id : string, label : string, hasChildren : boolean }*/) {
                    // create HTML structure
                    var oLI = ($("<li>").attr("id", mItem.id || "").html("<span class=\"" + CSS$CLASS.hitarea + "\"/><span class=\"" + CSS$CLASS.label + "\">" + mItem.label + "</span>"))[0];
                    if (mItem.hasChildren) {
                        $("<ul>").appendTo(oLI).treeControl(mTreeProvider);
                    }
                    // update CSS style & plug event handlers
                    var $LI = $(oLI);

                    // collapsed on creation
                    $LI.find("ul").hide();

                    // disable text selection & add highlight on hover
                    $LI.find(">span").hoverClass();

                    // hasChildren => expandable
                    $LI.filter(":has(>ul:hidden)").addClass(CSS$CLASS.expandable).find("." + CSS$CLASS.hitarea).addClass(CSS$CLASS.expandableHitarea);

                    // attach click event on hit area
                    var fnToggleLI = function (fnCallback) {
                        $LI
                        .find(">.hitarea")
                        .swapClass(CSS$CLASS.collapsableHitarea, CSS$CLASS.expandableHitarea)
                        .end()
                        .swapClass(CSS$CLASS.collapsable, CSS$CLASS.expandable)
                        .find(">ul")
                        .toggleVisibility(function (bShow) {
                            if (bShow) {
                                // loading... animation???
                                var _this = this;
                                $(this).empty();
                                mTreeProvider.getChildren(oLI.id, function (mItem) {
                                    fnCreateItem.call(_this, mItem);
                                    if (fnCallback) {
                                        fnCallback.call(_this, oLI.id);
                                    }
                                });
                            }
                        });
                    };
                    $LI.find("." + CSS$CLASS.hitarea).click(function (event, fnOptionalCallback) {
                        fnToggleLI(fnOptionalCallback);
                    });

                    // attach click event on label area
                    $LI.find("." + CSS$CLASS.label).click(function (event) {
                        if (mTreeProvider.onClick) {
                            mTreeProvider.onClick(oLI.id);
                        }
                        $_treeControl.select(oLI.id);
                    });

                    $LI.find("." + CSS$CLASS.label).dblclick(function (event, fnOptionalCallback) {
                        fnToggleLI(fnOptionalCallback);
                    });

                    // append created LI to UL
                    this.appendChild(oLI);
                };

                // top-level UL, get root content
                if (this.parentNode === null || this.parentNode.nodeName.toLowerCase() !== "li") {
                    var _this = this;
                    mTreeProvider.getChildren(null, function (mItem) {
                        fnCreateItem.call(_this, mItem);
                        // select and expand root node
                        $LI = $_treeControl.find("li[id=\'" + mItem.id + "\']");
                        $LI.find("." + CSS$CLASS.expandableHitarea).triggerHandler("click");

                        //$LI.find("." + CSS$CLASS.label).triggerHandler("click");
                    });
                }
            })
            // disable text selection on parent
            .parent().disableSelection();

            // right-to-left language support
            if (mTreeProvider && mTreeProvider.isRtl) {
                this.find("." + CSS$CLASS.treecontrol).andSelf().addClass(CSS$CLASS.flipped);
            }

            return $.extend(this, {
                /**
                * Returns the root treeControl
                */
                root: function () {
                    return this.parents("ul").andSelf().not(function () {
                        return this.parentNode.nodeName.toLowerCase() === "li";
                    }).treeControl();
                },
                /**
                * Selects the tree item with the specified id and unselects any previously selected item
                * NOTE: assumes the item exists already!
                */
                select: function (sItemId) {
                    this.root().find("li." + CSS$CLASS.selected).removeClass(CSS$CLASS.selected);
                    this.find("li[id=\'" + sItemId + "\']").addClass(CSS$CLASS.selected);
                    return this;
                },
                /**
                * Selects and reveals the item identified by the given item id path
                * @param aItemIdPath array of item ids
                * @param bReveal true if item should be scrolled into view, false otherwise
                * @param i (internal use only) current index in aItemIdPath array
                */
                selectAndReveal: function (aItemIdPath, bReveal, i/* = 0*/) {
                    if (aItemIdPath) {
                        if (!i) i = 0;
                        while (i < aItemIdPath.length) {
                            var sItemId = aItemIdPath[i];
                            $LI = this.find("li[id=\'" + sItemId + "\']");
                            if ($LI.length > 0) {
                                if (i === (aItemIdPath.length - 1)) {
                                    // found item: select+reveal and return
                                    this.select(sItemId);
                                    if (bReveal) {
                                        $LI[0].scrollIntoView();
                                    }
                                } else if ($LI.find("ul").length > 0) {
                                    // node item
                                    if ($LI.hasClass(CSS$CLASS.expandable)) {
                                        // collapsed: expand (by triggering click event) and recurse (by specifying optional callback, see click handler on hitareas)
                                        $LI.find("." + CSS$CLASS.expandableHitarea).triggerHandler("click", function (sExpandedItemId) {
                                            if (sItemId === sExpandedItemId) {
                                                $(this).treeControl().selectAndReveal(aItemIdPath, bReveal, i + 1);
                                            }
                                        });
                                    } else {
                                        // expanded: move to next item in the branch
                                        i++;
                                        continue;
                                    }
                                }
                            }
                            break;
                        }
                    }
                    return this;
                }
            });
        }
    });

})(jQuery);
