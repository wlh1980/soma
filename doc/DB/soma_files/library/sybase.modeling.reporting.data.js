/*!
* Sybase.Modeling.Reporting.Data Content Management Library ('jdata')
*
* Copyright (c) 2012 SAP AG or an SAP affiliate company.
*
* @author gabriel.kevorkian@sap.com
*
* defines:
*  document.jdata
*
*/
;
(function ($/*document*/) {

    if ($.jdata)
        return;

    var oScriptContainer = $.toString() == "[object SVGDocument]" ? $.firstChild : $.getElementsByTagName("head").item(0);

    var internal = {};

    internal.clone = function (mObject) {
        var mClonedObject = null;
        if (mObject !== null) {
            mClonedObject = {};
            for (var member in mObject) {
                if (mObject.hasOwnProperty(member)) {
                    mClonedObject[member] = mObject[member];
                }
            }
        }
        return mClonedObject;
    };

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (element) {
            var len = this.length;
            for (var i = 0; i < len; i++) {
                if (i in this && this[i] === element)
                    return i;
            }
            return -1;
        };
    }

    var jdata = {};

    jdata.contentBase = null;

    /**
    * jdata.forNode(sNodeId|oNode, mOptions : { fnCallback(oNode), bRefresh })
    */
    jdata.forNode = (function () {
        // node cache (static mode)
        var mNodes = {};
        // hierarchy processing (loads hierarchy nodes into the cache)
        function processHierarchy(oNode) {
            mNodes[oNode.id] = oNode;
            if (oNode.children) {
                var aChildren = oNode.children;
                for (var i = 0; i < aChildren.length; i++) {
                    var oChildNode = aChildren[i];
                    if (oChildNode !== null) {
                        oChildNode.parent = oNode;
                        processHierarchy(oChildNode);
                    }
                }
            }
        };
        // given a node id, invokes the specified callback with the corresponding hierarchy root id as parameter 
        function forHierarchyRootId(sNodeId, fnCallback) {
            $.jdata.fetch("hierarchy.table", function (mTable) {
                var sHierarchyRootId = sNodeId == "" ? "" : ((mTable && mTable[sNodeId] != null) ? mTable[sNodeId] : null);
                if (fnCallback && sHierarchyRootId != null) {
                    fnCallback(sHierarchyRootId);
                }
            }, /* bUseCache: */true);
        };
        // (sNodeId|oNode), mOptions : { bRefresh, fnCallback(oNode) }
        return function (node, mOptions) {
            var oThisNode = null, aAsyncCallbacks = null;
            if (node === null || typeof (node) !== "string") {
                // node object was specified as input
                oThisNode = node;
            } else if ((!mOptions || !mOptions.bRefresh || !mOptions.bRefresh === true) && mNodes[node]) {
                // node id was found in cache / refresh off
                oThisNode = mNodes[node];
            } else {
                // node id does not match any node processed so far
                // asynchronous mode, put callback, if any, in local queue
                aAsyncCallbacks = [];
                if (mOptions && mOptions.fnCallback) {
                    aAsyncCallbacks.push(mOptions.fnCallback);
                }
                aAsyncCallbacks.invoke = function (oNode) {
                    while (aAsyncCallbacks.length > 0) {
                        aAsyncCallbacks.shift()(oNode);
                    }
                };
                // load/process hierarchy
                forHierarchyRootId(node, function (sHierarchyRootId) {
                    if (sHierarchyRootId === null) {
                        sHierarchyRootId = node;
                    }
                    var sHierarchyResource = sHierarchyRootId + ".hierarchy";
                    if (sHierarchyResource.indexOf("#") == 0) {
                        sHierarchyResource = sHierarchyResource.substring("#".length);
                    }
                    $.jdata.fetch(sHierarchyResource, function (oHierarchyRootNode) {
                        var oNode = null;
                        if (oHierarchyRootNode !== null) {
                            oHierarchyRootNode.id = sHierarchyRootId;
                            processHierarchy(oHierarchyRootNode);
                            // node should be in cache after hierarchy processing
                            if (mNodes[node]) {
                                oNode = mNodes[node];
                            }
                        }
                        aAsyncCallbacks.invoke(oNode);
                        aAsyncCallbacks = null;
                    }, /* bUseCache: */true);
                });
            }
            // synchronous mode => invoke callback, if any, before returning
            if (aAsyncCallbacks === null && mOptions && mOptions.fnCallback) {
                mOptions.fnCallback(oThisNode);
            }
            // return wrapped set supporting operation chains
            return {
                /**
                * Invokes the given callback on the wrapped set node
                */
                invoke: function (fnCallback) {
                    if (aAsyncCallbacks === null) {
                        fnCallback(oThisNode);
                    } else {
                        aAsyncCallbacks.push(fnCallback);
                    }
                },
                /**
                * Returns a wrapped set referencing the parent of this wrapped set node
                * Invokes the specified callback, if any, on the parent node object
                */
                forParent: function (fnCallback) {
                    var parent = internal.clone(this);
                    var outerInvoke = parent.invoke;
                    parent.invoke = function (fnCallback) {
                        outerInvoke(function (oNode) {
                            if (oNode && oNode.parent) {
                                jdata.forNode(oNode.parent, { fnCallback: fnCallback });
                            }
                        });
                    };
                    if (fnCallback) {
                        parent.invoke(fnCallback);
                    }
                    return parent;
                },
                /**
                * 
                */
                forPrevious: function (fnCallback) {
                    var previous = internal.clone(this);
                    var outerInvoke = previous.invoke;
                    previous.invoke = function (fnCallback) {
                        outerInvoke(function (oNode) {
                            if (oNode && oNode.parent) {
                                jdata.forNode(oNode.parent, { fnCallback: function (oParent) {
                                    if (oParent && oParent.children) {
                                        var index = oParent.children.indexOf(oNode.id);
                                        if (index == -1) {
                                            index = oParent.children.indexOf(oNode);
                                        }
                                        if (index > 0) {
                                            jdata.forNode(oParent.children[index - 1]).forRightMostLeaf(fnCallback);
                                        } else if (index == 0) {
                                            fnCallback(oParent);
                                        }
                                    }
                                }
                                });
                            }
                        });
                    };
                    if (fnCallback) {
                        previous.invoke(fnCallback);
                    }
                    return previous;
                },
                /**
                *
                */
                forPreviousWhere: function (fnCallback, fnPredicate) {
                    var previousWhere = internal.clone(this);
                    var outerInvoke = previousWhere.invoke;
                    previousWhere.invoke = function (fnCallback) {
                        outerInvoke(function (oNode) {
                            if (oNode) {
                                jdata.forNode(oNode).forPrevious(function (oPrevious) {
                                    if (!oPrevious || !fnPredicate || fnPredicate(oPrevious)) {
                                        fnCallback(oPrevious);
                                    } else {
                                        jdata.forNode(oPrevious).forPreviousWhere(fnCallback, fnPredicate);
                                    }
                                });
                            }
                        });
                    };
                    if (fnCallback) {
                        previousWhere.invoke(fnCallback);
                    }
                    return previousWhere;
                },
                /**
                * 
                */
                forNext: function (fnCallback) {
                    var next = internal.clone(this);
                    var outerInvoke = next.invoke;
                    next.invoke = function (fnCallback) {
                        outerInvoke(function (oNode) {
                            if (oNode) {
                                if (oNode.children && oNode.children.length > 0) {
                                    jdata.forNode(oNode.children[0], { fnCallback: fnCallback });
                                } else {
                                    function forFollowerUp(oFollowed, fnCallback) {
                                        if (oFollowed.parent) {
                                            jdata.forNode(oFollowed.parent, { fnCallback: function (oParent) {
                                                if (oParent && oParent.children) {
                                                    var index = oParent.children.indexOf(oFollowed.id);
                                                    if (index == -1) {
                                                        index = oParent.children.indexOf(oFollowed);
                                                    }
                                                    if (index < (oParent.children.length - 1)) {
                                                        jdata.forNode(oParent.children[index + 1], { fnCallback: fnCallback });
                                                    } else {
                                                        forFollowerUp(oParent, fnCallback);
                                                    }
                                                }
                                            } 
                                            });
                                        }
                                    }
                                    forFollowerUp(oNode, fnCallback);
                                }
                            }
                        });
                    };
                    if (fnCallback) {
                        next.invoke(fnCallback);
                    }
                    return next;
                },
                /**
                *
                */
                forNextWhere: function (fnCallback, fnPredicate) {
                    var nextWhere = internal.clone(this);
                    var outerInvoke = nextWhere.invoke;
                    nextWhere.invoke = function (fnCallback) {
                        outerInvoke(function (oNode) {
                            if (oNode) {
                                jdata.forNode(oNode).forNext(function (oNext) {
                                    if (!oNext || !fnPredicate || fnPredicate(oNext)) {
                                        fnCallback(oNext);
                                    } else {
                                        jdata.forNode(oNext).forNextWhere(fnCallback, fnPredicate);
                                    }
                                });
                            }
                        });
                    };
                    if (fnCallback) {
                        nextWhere.invoke(fnCallback);
                    }
                    return nextWhere;
                },
                /**
                *
                */
                forRightMostLeaf: function (fnCallback) {
                    var rightMostLeaf = internal.clone(this);
                    var outerInvoke = rightMostLeaf.invoke;
                    rightMostLeaf.invoke = function (fnCallback) {
                        outerInvoke(function (oNode) {
                            if (oNode) {
                                if (oNode.children && oNode.children.length > 0) {
                                    jdata.forNode(oNode.children[oNode.children.length - 1]).forRightMostLeaf(fnCallback);
                                } else {
                                    fnCallback(oNode);
                                }
                            }
                        });
                    }
                    if (fnCallback) {
                        rightMostLeaf.invoke(fnCallback);
                    }
                    return rightMostLeaf;
                },
                /**
                * Invokes the specified callback passing in as argument an array of the nodes
                * leading to this wrapped set node starting at the root
                */
                forBranch: function (fnCallback) {
                    this.invoke(function (oNode) {
                        if (oNode) {
                            if (oNode.parent) {
                                jdata.forNode(oNode).forParent().forBranch(function (branch) {
                                    branch.push(oNode);
                                    fnCallback(branch);
                                });
                            } else {
                                fnCallback([oNode]);
                            }
                        }
                    });
                }
            };
        };
    })();

    /**
    * jdata.fetch(sResource, fnCallback(json), bUseCache)
    *
    * Fetches the specified resource. If already cached, returns the cached version, otherwise initiates a data request
    * Note: the resource is responsible for invoking the 'onloadjson' callback attached to its script container element:
    * 
    * (function($){if($)$.onloadjson({ <json-object-body> });})(document.jdata.activeScript());
    */
    jdata.fetch = (function () {
        var aScriptQueue = [];
        var mResourceCache = {};

        // scripts are loaded one at a time to avoid race conditions
        // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
        setInterval(function () {
            if (aScriptQueue && aScriptQueue.length > 0) {
                var oScript = aScriptQueue[0];
                if (oScript.loaded || oScript.loadFailed) {
                    // IE does not seem to support this
                    if (navigator.appVersion.indexOf("MSIE") == -1) {
                        delete oScript["onerror"];
                        delete oScript["onloadjson"];
                    }
                    // removing running script from container crashes IE6
                    if (navigator.appVersion.indexOf("MSIE") == -1 || parseFloat(navigator.appVersion.split("MSIE")[1]) > 6) {
                        oScriptContainer.removeChild(oScript);
                    }
                    aScriptQueue.shift();
                    if (aScriptQueue.length > 0) {
                        oScriptContainer.appendChild(aScriptQueue[0]);
                    }
                }
            }
        }, 10);

        return function (sResource, fnCallback/* (json) */, bUseCache) {
            if (bUseCache && mResourceCache[sResource]) {
                if (fnCallback) {
                    fnCallback(mResourceCache[sResource]);
                }
                return;
            }
            // fetch() uses dynamic script-based JSON requests instead of XHR
            // in order to support local web sites (file:// protocol)
            // for some background on the JSON script request technique (pros & cons), see
            // http://developer.yahoo.com/javascript/json.html
            // http://www.xml.com/pub/a/2005/12/21/json-dynamic-script-tag.html
            var oScript;
            if ($.toString() == "[object SVGDocument]") {
                oScript = $.createElementNS("http://www.w3.org/2000/svg", "script");
                // avoid javascript caching (chrome) by appending ?date=<time>
                oScript.setAttributeNS("http://www.w3.org/1999/xlink", "href", (jdata.contentBase || "") + sResource + ".js?date=" + new Date().getTime());
                oScript.setAttribute("type", "text/javascript");
            }
            else {
                oScript = $.createElement("script");
                // avoid javascript caching (chrome) by appending ?date=<time>
                oScript.src = (jdata.contentBase || "") + sResource + ".js?date=" + new Date().getTime();
                oScript.type = "text/javascript";
            }
            oScript.onerror = function () {
                oScript.loadFailed = true;
            };
            oScript.onloadjson = function (json) {
                if (bUseCache) {
                    mResourceCache[sResource] = json;
                }
                if (fnCallback) {
                    fnCallback(json);
                }
                oScript.loaded = true;
            };
            // load scripts one at a time to avoid race conditions
            // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
            aScriptQueue.push(oScript);
            if (aScriptQueue.length == 1) {
                oScriptContainer.appendChild(oScript);
            }
        }
    })();

    jdata.activeScript = function () {
        var result = null;
        var scripts = oScriptContainer.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].onloadjson) {
                result = scripts[i];
                break;
            }
        }
        return result;
    };

    /**
    * jdata.resolve(sContentFragment, fnCallback(sContentId, sAnchorId, page))
    *
    * Attemps to resolve a content fragment (content-id|anchor-id).
    * Invokes fnCallback with a valid content id on success, or a null content id on failure.
    */
    jdata.resolve = function (sContentFragment, fnCallback/*, validate?*/) {
        if (fnCallback) {
            if (sContentFragment.indexOf("#") == 0) {
                // anchor-id
                var sAnchorId = sContentFragment.substring("#".length);
                $.jdata.fetch("anchor.table", function (mTable) {
                    var sContentId = null, page = 1;
                    var sContentPageId = (mTable && mTable[sAnchorId] !== null) ? mTable[sAnchorId] : null;
                    if (sContentPageId != null) {
                        var i = sContentPageId.indexOf(".");
                        if (i > -1) {
                            page = sContentPageId.substring(i + 1);
                            sContentId = sContentPageId.substring(0, i);
                        } else {
                            sContentId = sContentPageId;
                        }
                    }
                    fnCallback(sContentId, sAnchorId, page);
                }, /* bUseCache: */true);
            }
            else {
                // content-id
                fnCallback(sContentFragment, null, 1);
            }
        }
    };

    $.jdata = jdata;

})(window.document);
