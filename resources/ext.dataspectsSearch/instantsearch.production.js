/*! https://cdn.jsdelivr.net/npm/instantsearch.js@latest/dist/
InstantSearch.js 4.46.0 | © Algolia, Inc. and contributors; MIT License | https://github.com/algolia/instantsearch.js */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).instantsearch = t());
})(this, function () {
  "use strict";
  function C(e) {
    return (C =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function E(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r);
    }
  }
  function k(e, t, n) {
    return t && r(e.prototype, t), n && r(e, n), e;
  }
  function j(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function h() {
    return (h =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }).apply(this, arguments);
  }
  function i(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      e &&
        (r = r.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function W(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? i(Object(n), !0).forEach(function (e) {
            j(t, e, n[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : i(Object(n)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
          });
    }
    return t;
  }
  function L(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })),
      t && n(e, t);
  }
  function a(e) {
    return (a = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function n(e, t) {
    return (n =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
  }
  function M(e, t) {
    if (null == e) return {};
    var n,
      r,
      i = (function (e, t) {
        if (null == e) return {};
        var n,
          r,
          i = {},
          a = Object.keys(e);
        for (r = 0; r < a.length; r++)
          (n = a[r]), 0 <= t.indexOf(n) || (i[n] = e[n]);
        return i;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      for (r = 0; r < a.length; r++)
        (n = a[r]),
          0 <= t.indexOf(n) ||
            (Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]));
    }
    return i;
  }
  function H(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return e;
  }
  function O(r) {
    var i = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    })();
    return function () {
      var e,
        t = a(r);
      if (i) {
        var n = a(this).constructor;
        e = Reflect.construct(t, arguments, n);
      } else e = t.apply(this, arguments);
      return (function (e, t) {
        return !t || ("object" != typeof t && "function" != typeof t)
          ? H(e)
          : t;
      })(this, e);
    };
  }
  function D(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
          return;
        var n = [],
          r = !0,
          i = !1,
          a = void 0;
        try {
          for (
            var s, o = e[Symbol.iterator]();
            !(r = (s = o.next()).done) &&
            (n.push(s.value), !t || n.length !== t);
            r = !0
          );
        } catch (e) {
          (i = !0), (a = e);
        } finally {
          try {
            r || null == o.return || o.return();
          } finally {
            if (i) throw a;
          }
        }
        return n;
      })(e, t) ||
      v(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function P(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return s(e);
      })(e) ||
      (function (e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
          return Array.from(e);
      })(e) ||
      v(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function v(e, t) {
    if (e) {
      if ("string" == typeof e) return s(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      return (
        "Object" === n && e.constructor && (n = e.constructor.name),
        "Map" === n || "Set" === n
          ? Array.from(e)
          : "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? s(e, t)
          : void 0
      );
    }
  }
  function s(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function o(e) {
    return (
      "function" == typeof e ||
      Array.isArray(e) ||
      "[object Object]" === Object.prototype.toString.call(e)
    );
  }
  function c(e, t) {
    if (e === t) return e;
    for (var n in t)
      if (Object.prototype.hasOwnProperty.call(t, n) && "__proto__" !== n) {
        var r = t[n],
          i = e[n];
        (void 0 !== i && void 0 === r) ||
          (o(i) && o(r)
            ? (e[n] = c(i, r))
            : (e[n] =
                "object" == typeof (a = r) && null !== a
                  ? c(Array.isArray(a) ? [] : {}, a)
                  : a));
      }
    var a;
    return e;
  }
  var m = function (e) {
      o(e) || (e = {});
      for (var t = 1, n = arguments.length; t < n; t++) {
        var r = arguments[t];
        o(r) && c(e, r);
      }
      return e;
    },
    p = function () {
      return Array.prototype.slice.call(arguments).reduceRight(function (t, n) {
        return (
          Object.keys(Object(n)).forEach(function (e) {
            void 0 !== n[e] && (void 0 !== t[e] && delete t[e], (t[e] = n[e]));
          }),
          t
        );
      }, {});
    };
  var u = function (n, r) {
      return n.filter(function (e, t) {
        return -1 < r.indexOf(e) && n.indexOf(e) === t;
      });
    },
    g = function (e, t) {
      if (Array.isArray(e))
        for (var n = 0; n < e.length; n++) if (t(e[n])) return e[n];
    };
  var l = function e(t) {
    if ("number" == typeof t) return t;
    if ("string" == typeof t) return parseFloat(t);
    if (Array.isArray(t)) return t.map(e);
    throw new Error(
      "The value should be a number, a parsable string or an array of those."
    );
  };
  var d = function (e, t) {
    if (null === e) return {};
    var n,
      r,
      i = {},
      a = Object.keys(e);
    for (r = 0; r < a.length; r++)
      (n = a[r]), 0 <= t.indexOf(n) || (i[n] = e[n]);
    return i;
  };
  var f = function (e) {
      return e && 0 < Object.keys(e).length;
    },
    t = function (e) {
      return null !== e && /^[a-zA-Z0-9_-]{1,64}$/.test(e);
    },
    y = {
      addRefinement: function (e, t, n) {
        if (y.isRefined(e, t, n)) return e;
        var r = "" + n,
          i = e[t] ? e[t].concat(r) : [r],
          a = {};
        return (a[t] = i), p({}, a, e);
      },
      removeRefinement: function (e, n, t) {
        if (void 0 === t)
          return y.clearRefinement(e, function (e, t) {
            return n === t;
          });
        var r = "" + t;
        return y.clearRefinement(e, function (e, t) {
          return n === t && r === e;
        });
      },
      toggleRefinement: function (e, t, n) {
        if (void 0 === n)
          throw new Error("toggleRefinement should be used with a value");
        return y.isRefined(e, t, n)
          ? y.removeRefinement(e, t, n)
          : y.addRefinement(e, t, n);
      },
      clearRefinement: function (i, a, s) {
        if (void 0 === a) return f(i) ? {} : i;
        if ("string" == typeof a) return d(i, [a]);
        if ("function" == typeof a) {
          var o = !1,
            e = Object.keys(i).reduce(function (e, t) {
              var n = i[t] || [],
                r = n.filter(function (e) {
                  return !a(e, t, s);
                });
              return r.length !== n.length && (o = !0), (e[t] = r), e;
            }, {});
          return o ? e : i;
        }
      },
      isRefined: function (e, t, n) {
        var r = !!e[t] && 0 < e[t].length;
        if (void 0 === n || !r) return r;
        var i = "" + n;
        return -1 !== e[t].indexOf(i);
      },
    },
    b = y;
  function R(e, n) {
    return Array.isArray(e) && Array.isArray(n)
      ? e.length === n.length &&
          e.every(function (e, t) {
            return R(n[t], e);
          })
      : e === n;
  }
  function S(e) {
    var r = e ? S._parseNumbers(e) : {};
    void 0 === r.userToken ||
      t(r.userToken) ||
      console.warn(
        "[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}"
      ),
      (this.facets = r.facets || []),
      (this.disjunctiveFacets = r.disjunctiveFacets || []),
      (this.hierarchicalFacets = r.hierarchicalFacets || []),
      (this.facetsRefinements = r.facetsRefinements || {}),
      (this.facetsExcludes = r.facetsExcludes || {}),
      (this.disjunctiveFacetsRefinements =
        r.disjunctiveFacetsRefinements || {}),
      (this.numericRefinements = r.numericRefinements || {}),
      (this.tagRefinements = r.tagRefinements || []),
      (this.hierarchicalFacetsRefinements =
        r.hierarchicalFacetsRefinements || {});
    var i = this;
    Object.keys(r).forEach(function (e) {
      var t = -1 !== S.PARAMETERS.indexOf(e),
        n = void 0 !== r[e];
      !t && n && (i[e] = r[e]);
    });
  }
  (S.PARAMETERS = Object.keys(new S())),
    (S._parseNumbers = function (i) {
      if (i instanceof S) return i;
      var r = {};
      if (
        ([
          "aroundPrecision",
          "aroundRadius",
          "getRankingInfo",
          "minWordSizefor2Typos",
          "minWordSizefor1Typo",
          "page",
          "maxValuesPerFacet",
          "distinct",
          "minimumAroundRadius",
          "hitsPerPage",
          "minProximity",
        ].forEach(function (e) {
          var t = i[e];
          if ("string" == typeof t) {
            var n = parseFloat(t);
            r[e] = isNaN(n) ? t : n;
          }
        }),
        Array.isArray(i.insideBoundingBox) &&
          (r.insideBoundingBox = i.insideBoundingBox.map(function (e) {
            return Array.isArray(e)
              ? e.map(function (e) {
                  return parseFloat(e);
                })
              : e;
          })),
        i.numericRefinements)
      ) {
        var a = {};
        Object.keys(i.numericRefinements).forEach(function (n) {
          var r = i.numericRefinements[n] || {};
          (a[n] = {}),
            Object.keys(r).forEach(function (e) {
              var t = r[e].map(function (e) {
                return Array.isArray(e)
                  ? e.map(function (e) {
                      return "string" == typeof e ? parseFloat(e) : e;
                    })
                  : "string" == typeof e
                  ? parseFloat(e)
                  : e;
              });
              a[n][e] = t;
            });
        }),
          (r.numericRefinements = a);
      }
      return m({}, i, r);
    }),
    (S.make = function (e) {
      var n = new S(e);
      return (
        (e.hierarchicalFacets || []).forEach(function (e) {
          if (e.rootPath) {
            var t = n.getHierarchicalRefinement(e.name);
            0 < t.length &&
              0 !== t[0].indexOf(e.rootPath) &&
              (n = n.clearRefinements(e.name)),
              0 === (t = n.getHierarchicalRefinement(e.name)).length &&
                (n = n.toggleHierarchicalFacetRefinement(e.name, e.rootPath));
          }
        }),
        n
      );
    }),
    (S.validate = function (e, t) {
      var n = t || {};
      return e.tagFilters && n.tagRefinements && 0 < n.tagRefinements.length
        ? new Error(
            "[Tags] Cannot switch from the managed tag API to the advanced API. It is probably an error, if it is really what you want, you should first clear the tags with clearTags method."
          )
        : 0 < e.tagRefinements.length && n.tagFilters
        ? new Error(
            "[Tags] Cannot switch from the advanced tag API to the managed API. It is probably an error, if it is not, you should first clear the tags with clearTags method."
          )
        : e.numericFilters && n.numericRefinements && f(n.numericRefinements)
        ? new Error(
            "[Numeric filters] Can't switch from the advanced to the managed API. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
          )
        : f(e.numericRefinements) && n.numericFilters
        ? new Error(
            "[Numeric filters] Can't switch from the managed API to the advanced. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
          )
        : null;
    }),
    (S.prototype = {
      constructor: S,
      clearRefinements: function (e) {
        var t = {
          numericRefinements: this._clearNumericRefinements(e),
          facetsRefinements: b.clearRefinement(
            this.facetsRefinements,
            e,
            "conjunctiveFacet"
          ),
          facetsExcludes: b.clearRefinement(this.facetsExcludes, e, "exclude"),
          disjunctiveFacetsRefinements: b.clearRefinement(
            this.disjunctiveFacetsRefinements,
            e,
            "disjunctiveFacet"
          ),
          hierarchicalFacetsRefinements: b.clearRefinement(
            this.hierarchicalFacetsRefinements,
            e,
            "hierarchicalFacet"
          ),
        };
        return t.numericRefinements === this.numericRefinements &&
          t.facetsRefinements === this.facetsRefinements &&
          t.facetsExcludes === this.facetsExcludes &&
          t.disjunctiveFacetsRefinements ===
            this.disjunctiveFacetsRefinements &&
          t.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements
          ? this
          : this.setQueryParameters(t);
      },
      clearTags: function () {
        return void 0 === this.tagFilters && 0 === this.tagRefinements.length
          ? this
          : this.setQueryParameters({ tagFilters: void 0, tagRefinements: [] });
      },
      setIndex: function (e) {
        return e === this.index ? this : this.setQueryParameters({ index: e });
      },
      setQuery: function (e) {
        return e === this.query ? this : this.setQueryParameters({ query: e });
      },
      setPage: function (e) {
        return e === this.page ? this : this.setQueryParameters({ page: e });
      },
      setFacets: function (e) {
        return this.setQueryParameters({ facets: e });
      },
      setDisjunctiveFacets: function (e) {
        return this.setQueryParameters({ disjunctiveFacets: e });
      },
      setHitsPerPage: function (e) {
        return this.hitsPerPage === e
          ? this
          : this.setQueryParameters({ hitsPerPage: e });
      },
      setTypoTolerance: function (e) {
        return this.typoTolerance === e
          ? this
          : this.setQueryParameters({ typoTolerance: e });
      },
      addNumericRefinement: function (e, t, n) {
        var r = l(n);
        if (this.isNumericRefined(e, t, r)) return this;
        var i = m({}, this.numericRefinements);
        return (
          (i[e] = m({}, i[e])),
          i[e][t]
            ? ((i[e][t] = i[e][t].slice()), i[e][t].push(r))
            : (i[e][t] = [r]),
          this.setQueryParameters({ numericRefinements: i })
        );
      },
      getConjunctiveRefinements: function (e) {
        return (this.isConjunctiveFacet(e) && this.facetsRefinements[e]) || [];
      },
      getDisjunctiveRefinements: function (e) {
        return (
          (this.isDisjunctiveFacet(e) &&
            this.disjunctiveFacetsRefinements[e]) ||
          []
        );
      },
      getHierarchicalRefinement: function (e) {
        return this.hierarchicalFacetsRefinements[e] || [];
      },
      getExcludeRefinements: function (e) {
        return (this.isConjunctiveFacet(e) && this.facetsExcludes[e]) || [];
      },
      removeNumericRefinement: function (n, r, i) {
        return void 0 !== i
          ? this.isNumericRefined(n, r, i)
            ? this.setQueryParameters({
                numericRefinements: this._clearNumericRefinements(function (
                  e,
                  t
                ) {
                  return t === n && e.op === r && R(e.val, l(i));
                }),
              })
            : this
          : void 0 !== r
          ? this.isNumericRefined(n, r)
            ? this.setQueryParameters({
                numericRefinements: this._clearNumericRefinements(function (
                  e,
                  t
                ) {
                  return t === n && e.op === r;
                }),
              })
            : this
          : this.isNumericRefined(n)
          ? this.setQueryParameters({
              numericRefinements: this._clearNumericRefinements(function (
                e,
                t
              ) {
                return t === n;
              }),
            })
          : this;
      },
      getNumericRefinements: function (e) {
        return this.numericRefinements[e] || {};
      },
      getNumericRefinement: function (e, t) {
        return this.numericRefinements[e] && this.numericRefinements[e][t];
      },
      _clearNumericRefinements: function (s) {
        if (void 0 === s)
          return f(this.numericRefinements) ? {} : this.numericRefinements;
        if ("string" == typeof s) return d(this.numericRefinements, [s]);
        if ("function" == typeof s) {
          var o = !1,
            t = this.numericRefinements,
            e = Object.keys(t).reduce(function (e, r) {
              var i = t[r],
                a = {};
              return (
                (i = i || {}),
                Object.keys(i).forEach(function (t) {
                  var e = i[t] || [],
                    n = [];
                  e.forEach(function (e) {
                    s({ val: e, op: t }, r, "numeric") || n.push(e);
                  }),
                    n.length !== e.length && (o = !0),
                    (a[t] = n);
                }),
                (e[r] = a),
                e
              );
            }, {});
          return o ? e : this.numericRefinements;
        }
      },
      addFacet: function (e) {
        return this.isConjunctiveFacet(e)
          ? this
          : this.setQueryParameters({ facets: this.facets.concat([e]) });
      },
      addDisjunctiveFacet: function (e) {
        return this.isDisjunctiveFacet(e)
          ? this
          : this.setQueryParameters({
              disjunctiveFacets: this.disjunctiveFacets.concat([e]),
            });
      },
      addHierarchicalFacet: function (e) {
        if (this.isHierarchicalFacet(e.name))
          throw new Error(
            "Cannot declare two hierarchical facets with the same name: `" +
              e.name +
              "`"
          );
        return this.setQueryParameters({
          hierarchicalFacets: this.hierarchicalFacets.concat([e]),
        });
      },
      addFacetRefinement: function (e, t) {
        if (!this.isConjunctiveFacet(e))
          throw new Error(
            e +
              " is not defined in the facets attribute of the helper configuration"
          );
        return b.isRefined(this.facetsRefinements, e, t)
          ? this
          : this.setQueryParameters({
              facetsRefinements: b.addRefinement(this.facetsRefinements, e, t),
            });
      },
      addExcludeRefinement: function (e, t) {
        if (!this.isConjunctiveFacet(e))
          throw new Error(
            e +
              " is not defined in the facets attribute of the helper configuration"
          );
        return b.isRefined(this.facetsExcludes, e, t)
          ? this
          : this.setQueryParameters({
              facetsExcludes: b.addRefinement(this.facetsExcludes, e, t),
            });
      },
      addDisjunctiveFacetRefinement: function (e, t) {
        if (!this.isDisjunctiveFacet(e))
          throw new Error(
            e +
              " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        return b.isRefined(this.disjunctiveFacetsRefinements, e, t)
          ? this
          : this.setQueryParameters({
              disjunctiveFacetsRefinements: b.addRefinement(
                this.disjunctiveFacetsRefinements,
                e,
                t
              ),
            });
      },
      addTagRefinement: function (e) {
        if (this.isTagRefined(e)) return this;
        var t = { tagRefinements: this.tagRefinements.concat(e) };
        return this.setQueryParameters(t);
      },
      removeFacet: function (t) {
        return this.isConjunctiveFacet(t)
          ? this.clearRefinements(t).setQueryParameters({
              facets: this.facets.filter(function (e) {
                return e !== t;
              }),
            })
          : this;
      },
      removeDisjunctiveFacet: function (t) {
        return this.isDisjunctiveFacet(t)
          ? this.clearRefinements(t).setQueryParameters({
              disjunctiveFacets: this.disjunctiveFacets.filter(function (e) {
                return e !== t;
              }),
            })
          : this;
      },
      removeHierarchicalFacet: function (t) {
        return this.isHierarchicalFacet(t)
          ? this.clearRefinements(t).setQueryParameters({
              hierarchicalFacets: this.hierarchicalFacets.filter(function (e) {
                return e.name !== t;
              }),
            })
          : this;
      },
      removeFacetRefinement: function (e, t) {
        if (!this.isConjunctiveFacet(e))
          throw new Error(
            e +
              " is not defined in the facets attribute of the helper configuration"
          );
        return b.isRefined(this.facetsRefinements, e, t)
          ? this.setQueryParameters({
              facetsRefinements: b.removeRefinement(
                this.facetsRefinements,
                e,
                t
              ),
            })
          : this;
      },
      removeExcludeRefinement: function (e, t) {
        if (!this.isConjunctiveFacet(e))
          throw new Error(
            e +
              " is not defined in the facets attribute of the helper configuration"
          );
        return b.isRefined(this.facetsExcludes, e, t)
          ? this.setQueryParameters({
              facetsExcludes: b.removeRefinement(this.facetsExcludes, e, t),
            })
          : this;
      },
      removeDisjunctiveFacetRefinement: function (e, t) {
        if (!this.isDisjunctiveFacet(e))
          throw new Error(
            e +
              " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        return b.isRefined(this.disjunctiveFacetsRefinements, e, t)
          ? this.setQueryParameters({
              disjunctiveFacetsRefinements: b.removeRefinement(
                this.disjunctiveFacetsRefinements,
                e,
                t
              ),
            })
          : this;
      },
      removeTagRefinement: function (t) {
        if (!this.isTagRefined(t)) return this;
        var e = {
          tagRefinements: this.tagRefinements.filter(function (e) {
            return e !== t;
          }),
        };
        return this.setQueryParameters(e);
      },
      toggleRefinement: function (e, t) {
        return this.toggleFacetRefinement(e, t);
      },
      toggleFacetRefinement: function (e, t) {
        if (this.isHierarchicalFacet(e))
          return this.toggleHierarchicalFacetRefinement(e, t);
        if (this.isConjunctiveFacet(e))
          return this.toggleConjunctiveFacetRefinement(e, t);
        if (this.isDisjunctiveFacet(e))
          return this.toggleDisjunctiveFacetRefinement(e, t);
        throw new Error(
          "Cannot refine the undeclared facet " +
            e +
            "; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets"
        );
      },
      toggleConjunctiveFacetRefinement: function (e, t) {
        if (!this.isConjunctiveFacet(e))
          throw new Error(
            e +
              " is not defined in the facets attribute of the helper configuration"
          );
        return this.setQueryParameters({
          facetsRefinements: b.toggleRefinement(this.facetsRefinements, e, t),
        });
      },
      toggleExcludeFacetRefinement: function (e, t) {
        if (!this.isConjunctiveFacet(e))
          throw new Error(
            e +
              " is not defined in the facets attribute of the helper configuration"
          );
        return this.setQueryParameters({
          facetsExcludes: b.toggleRefinement(this.facetsExcludes, e, t),
        });
      },
      toggleDisjunctiveFacetRefinement: function (e, t) {
        if (!this.isDisjunctiveFacet(e))
          throw new Error(
            e +
              " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: b.toggleRefinement(
            this.disjunctiveFacetsRefinements,
            e,
            t
          ),
        });
      },
      toggleHierarchicalFacetRefinement: function (e, t) {
        if (!this.isHierarchicalFacet(e))
          throw new Error(
            e +
              " is not defined in the hierarchicalFacets attribute of the helper configuration"
          );
        var n = this._getHierarchicalFacetSeparator(
            this.getHierarchicalFacetByName(e)
          ),
          r = {};
        return (
          void 0 !== this.hierarchicalFacetsRefinements[e] &&
          0 < this.hierarchicalFacetsRefinements[e].length &&
          (this.hierarchicalFacetsRefinements[e][0] === t ||
            0 === this.hierarchicalFacetsRefinements[e][0].indexOf(t + n))
            ? -1 === t.indexOf(n)
              ? (r[e] = [])
              : (r[e] = [t.slice(0, t.lastIndexOf(n))])
            : (r[e] = [t]),
          this.setQueryParameters({
            hierarchicalFacetsRefinements: p(
              {},
              r,
              this.hierarchicalFacetsRefinements
            ),
          })
        );
      },
      addHierarchicalFacetRefinement: function (e, t) {
        if (this.isHierarchicalFacetRefined(e))
          throw new Error(e + " is already refined.");
        if (!this.isHierarchicalFacet(e))
          throw new Error(
            e +
              " is not defined in the hierarchicalFacets attribute of the helper configuration."
          );
        var n = {};
        return (
          (n[e] = [t]),
          this.setQueryParameters({
            hierarchicalFacetsRefinements: p(
              {},
              n,
              this.hierarchicalFacetsRefinements
            ),
          })
        );
      },
      removeHierarchicalFacetRefinement: function (e) {
        if (!this.isHierarchicalFacetRefined(e)) return this;
        var t = {};
        return (
          (t[e] = []),
          this.setQueryParameters({
            hierarchicalFacetsRefinements: p(
              {},
              t,
              this.hierarchicalFacetsRefinements
            ),
          })
        );
      },
      toggleTagRefinement: function (e) {
        return this.isTagRefined(e)
          ? this.removeTagRefinement(e)
          : this.addTagRefinement(e);
      },
      isDisjunctiveFacet: function (e) {
        return -1 < this.disjunctiveFacets.indexOf(e);
      },
      isHierarchicalFacet: function (e) {
        return void 0 !== this.getHierarchicalFacetByName(e);
      },
      isConjunctiveFacet: function (e) {
        return -1 < this.facets.indexOf(e);
      },
      isFacetRefined: function (e, t) {
        return (
          !!this.isConjunctiveFacet(e) &&
          b.isRefined(this.facetsRefinements, e, t)
        );
      },
      isExcludeRefined: function (e, t) {
        return (
          !!this.isConjunctiveFacet(e) && b.isRefined(this.facetsExcludes, e, t)
        );
      },
      isDisjunctiveFacetRefined: function (e, t) {
        return (
          !!this.isDisjunctiveFacet(e) &&
          b.isRefined(this.disjunctiveFacetsRefinements, e, t)
        );
      },
      isHierarchicalFacetRefined: function (e, t) {
        if (!this.isHierarchicalFacet(e)) return !1;
        var n = this.getHierarchicalRefinement(e);
        return t ? -1 !== n.indexOf(t) : 0 < n.length;
      },
      isNumericRefined: function (e, t, n) {
        if (void 0 === n && void 0 === t) return !!this.numericRefinements[e];
        var r =
          this.numericRefinements[e] &&
          void 0 !== this.numericRefinements[e][t];
        if (void 0 === n || !r) return r;
        var i = l(n),
          a =
            void 0 !==
            (function (e, t) {
              return g(e, function (e) {
                return R(e, t);
              });
            })(this.numericRefinements[e][t], i);
        return r && a;
      },
      isTagRefined: function (e) {
        return -1 !== this.tagRefinements.indexOf(e);
      },
      getRefinedDisjunctiveFacets: function () {
        var t = this,
          e = u(
            Object.keys(this.numericRefinements).filter(function (e) {
              return 0 < Object.keys(t.numericRefinements[e]).length;
            }),
            this.disjunctiveFacets
          );
        return Object.keys(this.disjunctiveFacetsRefinements)
          .filter(function (e) {
            return 0 < t.disjunctiveFacetsRefinements[e].length;
          })
          .concat(e)
          .concat(this.getRefinedHierarchicalFacets());
      },
      getRefinedHierarchicalFacets: function () {
        var t = this;
        return u(
          this.hierarchicalFacets.map(function (e) {
            return e.name;
          }),
          Object.keys(this.hierarchicalFacetsRefinements).filter(function (e) {
            return 0 < t.hierarchicalFacetsRefinements[e].length;
          })
        );
      },
      getUnrefinedDisjunctiveFacets: function () {
        var t = this.getRefinedDisjunctiveFacets();
        return this.disjunctiveFacets.filter(function (e) {
          return -1 === t.indexOf(e);
        });
      },
      managedParameters: [
        "index",
        "facets",
        "disjunctiveFacets",
        "facetsRefinements",
        "hierarchicalFacets",
        "facetsExcludes",
        "disjunctiveFacetsRefinements",
        "numericRefinements",
        "tagRefinements",
        "hierarchicalFacetsRefinements",
      ],
      getQueryParams: function () {
        var n = this.managedParameters,
          r = {},
          i = this;
        return (
          Object.keys(this).forEach(function (e) {
            var t = i[e];
            -1 === n.indexOf(e) && void 0 !== t && (r[e] = t);
          }),
          r
        );
      },
      setQueryParameter: function (e, t) {
        if (this[e] === t) return this;
        var n = {};
        return (n[e] = t), this.setQueryParameters(n);
      },
      setQueryParameters: function (e) {
        if (!e) return this;
        var t = S.validate(this, e);
        if (t) throw t;
        var n = this,
          i = S._parseNumbers(e),
          r = Object.keys(this).reduce(function (e, t) {
            return (e[t] = n[t]), e;
          }, {}),
          a = Object.keys(i).reduce(function (e, t) {
            var n = void 0 !== e[t],
              r = void 0 !== i[t];
            return n && !r ? d(e, [t]) : (r && (e[t] = i[t]), e);
          }, r);
        return new this.constructor(a);
      },
      resetPage: function () {
        return void 0 === this.page ? this : this.setPage(0);
      },
      _getHierarchicalFacetSortBy: function (e) {
        return e.sortBy || ["isRefined:desc", "name:asc"];
      },
      _getHierarchicalFacetSeparator: function (e) {
        return e.separator || " > ";
      },
      _getHierarchicalRootPath: function (e) {
        return e.rootPath || null;
      },
      _getHierarchicalShowParentLevel: function (e) {
        return "boolean" != typeof e.showParentLevel || e.showParentLevel;
      },
      getHierarchicalFacetByName: function (t) {
        return g(this.hierarchicalFacets, function (e) {
          return e.name === t;
        });
      },
      getHierarchicalFacetBreadcrumb: function (e) {
        if (!this.isHierarchicalFacet(e)) return [];
        var t = this.getHierarchicalRefinement(e)[0];
        if (!t) return [];
        var n = this._getHierarchicalFacetSeparator(
          this.getHierarchicalFacetByName(e)
        );
        return t.split(n).map(function (e) {
          return e.trim();
        });
      },
      toString: function () {
        return JSON.stringify(this, null, 2);
      },
    });
  var w = S;
  function _(e, t) {
    if (e !== t) {
      var n = void 0 !== e,
        r = null === e,
        i = void 0 !== t,
        a = null === t;
      if ((!a && t < e) || (r && i) || !n) return 1;
      if ((!r && e < t) || (a && n) || !i) return -1;
    }
    return 0;
  }
  function N(e) {
    return Array.isArray(e) ? e.filter(Boolean) : [];
  }
  function x(e, t) {
    if (!Array.isArray(e)) return -1;
    for (var n = 0; n < e.length; n++) if (t(e[n])) return n;
    return -1;
  }
  function I(e, t) {
    var i = (t || []).map(function (e) {
      return e.split(":");
    });
    return e.reduce(
      function (e, t) {
        var n = t.split(":"),
          r = g(i, function (e) {
            return e[0] === n[0];
          });
        return (
          1 < n.length || !r
            ? (e[0].push(n[0]), e[1].push(n[1]))
            : (e[0].push(r[0]), e[1].push(r[1])),
          e
        );
      },
      [[], []]
    );
  }
  var F = function (e, n, i) {
    if (!Array.isArray(e)) return [];
    Array.isArray(i) || (i = []);
    var t = e.map(function (t, e) {
      return {
        criteria: n.map(function (e) {
          return t[e];
        }),
        index: e,
        value: t,
      };
    });
    return (
      t.sort(function (e, t) {
        for (var n = -1; ++n < e.criteria.length; ) {
          var r = _(e.criteria[n], t.criteria[n]);
          if (r) return n >= i.length ? r : "desc" === i[n] ? -r : r;
        }
        return e.index - t.index;
      }),
      t.map(function (e) {
        return e.value;
      })
    );
  };
  var e = function (e) {
      return "string" != typeof e ? e : String(e).replace(/^-/, "\\-");
    },
    T = function (e) {
      return "string" != typeof e ? e : e.replace(/^\\-/, "-");
    },
    A = function (d) {
      return function (e, t) {
        var n = d.hierarchicalFacets[t],
          r =
            (d.hierarchicalFacetsRefinements[n.name] &&
              d.hierarchicalFacetsRefinements[n.name][0]) ||
            "",
          i = d._getHierarchicalFacetSeparator(n),
          a = d._getHierarchicalRootPath(n),
          s = d._getHierarchicalShowParentLevel(n),
          o = I(d._getHierarchicalFacetSortBy(n)),
          c = e.every(function (e) {
            return e.exhaustive;
          }),
          u = (function (o, c, u, l, d) {
            return function (e, n, t) {
              var r = e;
              if (0 < t) {
                var i = 0;
                for (r = e; i < t; ) {
                  var a = r && Array.isArray(r.data) ? r.data : [];
                  (r = g(a, function (e) {
                    return e.isRefined;
                  })),
                    i++;
                }
              }
              if (r) {
                var s = Object.keys(n.data)
                  .map(function (e) {
                    return [e, n.data[e]];
                  })
                  .filter(function (e) {
                    return (function (e, t, n, r, i, a) {
                      return (
                        (!i || (0 === e.indexOf(i) && i !== e)) &&
                        ((!i && -1 === e.indexOf(r)) ||
                          (i && e.split(r).length - i.split(r).length == 1) ||
                          (-1 === e.indexOf(r) && -1 === n.indexOf(r)) ||
                          0 === n.indexOf(e) ||
                          (0 === e.indexOf(t + r) && (a || 0 === e.indexOf(n))))
                      );
                    })(e[0], r.path || u, d, c, u, l);
                  });
                r.data = F(
                  s.map(function (e) {
                    var t = e[0];
                    return (function (e, t, n, r, i) {
                      var a = t.split(n);
                      return {
                        name: a[a.length - 1].trim(),
                        path: t,
                        escapedValue: B(t),
                        count: e,
                        isRefined: r === t || 0 === r.indexOf(t + n),
                        exhaustive: i,
                        data: null,
                      };
                    })(e[1], t, c, U(d), n.exhaustive);
                  }),
                  o[0],
                  o[1]
                );
              }
              return e;
            };
          })(o, i, a, s, r),
          l = e;
        return (
          a && (l = e.slice(a.split(i).length)),
          l.reduce(u, {
            name: d.hierarchicalFacets[t].name,
            count: null,
            isRefined: !0,
            path: null,
            escapedValue: null,
            exhaustive: c,
            data: null,
          })
        );
      };
    },
    B = e,
    U = T;
  var q = e,
    Q = T;
  function V(e) {
    var n = {};
    return (
      e.forEach(function (e, t) {
        n[e] = t;
      }),
      n
    );
  }
  function $(e, t, n) {
    t && t[n] && (e.stats = t[n]);
  }
  function K(l, t, n) {
    var c = t[0];
    this._rawResults = t;
    var d = this;
    Object.keys(c).forEach(function (e) {
      d[e] = c[e];
    }),
      Object.keys(n || {}).forEach(function (e) {
        d[e] = n[e];
      }),
      (this.processingTimeMS = t.reduce(function (e, t) {
        return void 0 === t.processingTimeMS ? e : e + t.processingTimeMS;
      }, 0)),
      (this.disjunctiveFacets = []),
      (this.hierarchicalFacets = l.hierarchicalFacets.map(function () {
        return [];
      })),
      (this.facets = []);
    var e = l.getRefinedDisjunctiveFacets(),
      u = V(l.facets),
      h = V(l.disjunctiveFacets),
      r = 1,
      f = c.facets || {};
    Object.keys(f).forEach(function (e) {
      var t = f[e],
        n = (function (e, t) {
          return g(e, function (e) {
            return -1 < (e.attributes || []).indexOf(t);
          });
        })(l.hierarchicalFacets, e);
      if (n) {
        var r = n.attributes.indexOf(e),
          i = x(l.hierarchicalFacets, function (e) {
            return e.name === n.name;
          });
        d.hierarchicalFacets[i][r] = {
          attribute: e,
          data: t,
          exhaustive: c.exhaustiveFacetsCount,
        };
      } else {
        var a,
          s = -1 !== l.disjunctiveFacets.indexOf(e),
          o = -1 !== l.facets.indexOf(e);
        s &&
          ((a = h[e]),
          (d.disjunctiveFacets[a] = {
            name: e,
            data: t,
            exhaustive: c.exhaustiveFacetsCount,
          }),
          $(d.disjunctiveFacets[a], c.facets_stats, e)),
          o &&
            ((a = u[e]),
            (d.facets[a] = {
              name: e,
              data: t,
              exhaustive: c.exhaustiveFacetsCount,
            }),
            $(d.facets[a], c.facets_stats, e));
      }
    }),
      (this.hierarchicalFacets = N(this.hierarchicalFacets)),
      e.forEach(function (e) {
        var a = t[r],
          s = a && a.facets ? a.facets : {},
          o = l.getHierarchicalFacetByName(e);
        Object.keys(s).forEach(function (t) {
          var n,
            e = s[t];
          if (o) {
            n = x(l.hierarchicalFacets, function (e) {
              return e.name === o.name;
            });
            var r = x(d.hierarchicalFacets[n], function (e) {
              return e.attribute === t;
            });
            if (-1 === r) return;
            d.hierarchicalFacets[n][r].data = m(
              {},
              d.hierarchicalFacets[n][r].data,
              e
            );
          } else {
            n = h[t];
            var i = (c.facets && c.facets[t]) || {};
            (d.disjunctiveFacets[n] = {
              name: t,
              data: p({}, e, i),
              exhaustive: a.exhaustiveFacetsCount,
            }),
              $(d.disjunctiveFacets[n], a.facets_stats, t),
              l.disjunctiveFacetsRefinements[t] &&
                l.disjunctiveFacetsRefinements[t].forEach(function (e) {
                  !d.disjunctiveFacets[n].data[e] &&
                    -1 < l.disjunctiveFacetsRefinements[t].indexOf(Q(e)) &&
                    (d.disjunctiveFacets[n].data[e] = 0);
                });
          }
        }),
          r++;
      }),
      l.getRefinedHierarchicalFacets().forEach(function (e) {
        var o = l.getHierarchicalFacetByName(e),
          c = l._getHierarchicalFacetSeparator(o),
          u = l.getHierarchicalRefinement(e);
        0 === u.length ||
          u[0].split(c).length < 2 ||
          t.slice(r).forEach(function (e) {
            var s = e && e.facets ? e.facets : {};
            Object.keys(s).forEach(function (t) {
              var e = s[t],
                n = x(l.hierarchicalFacets, function (e) {
                  return e.name === o.name;
                }),
                r = x(d.hierarchicalFacets[n], function (e) {
                  return e.attribute === t;
                });
              if (-1 !== r) {
                var i = {};
                if (0 < u.length) {
                  var a = u[0].split(c)[0];
                  i[a] = d.hierarchicalFacets[n][r].data[a];
                }
                d.hierarchicalFacets[n][r].data = p(
                  i,
                  e,
                  d.hierarchicalFacets[n][r].data
                );
              }
            }),
              r++;
          });
      }),
      Object.keys(l.facetsExcludes).forEach(function (t) {
        var e = l.facetsExcludes[t],
          n = u[t];
        (d.facets[n] = {
          name: t,
          data: c.facets[t],
          exhaustive: c.exhaustiveFacetsCount,
        }),
          e.forEach(function (e) {
            (d.facets[n] = d.facets[n] || { name: t }),
              (d.facets[n].data = d.facets[n].data || {}),
              (d.facets[n].data[e] = 0);
          });
      }),
      (this.hierarchicalFacets = this.hierarchicalFacets.map(A(l))),
      (this.facets = N(this.facets)),
      (this.disjunctiveFacets = N(this.disjunctiveFacets)),
      (this._state = l);
  }
  function z(e, t) {
    var n = g(e, function (e) {
      return e.name === t;
    });
    return n && n.stats;
  }
  function J(e, t, n, r, i) {
    var a = g(i, function (e) {
        return e.name === n;
      }),
      s = a && a.data && a.data[r] ? a.data[r] : 0,
      o = (a && a.exhaustive) || !1;
    return { type: t, attributeName: n, name: r, count: s, exhaustive: o };
  }
  (K.prototype.getFacetByName = function (t) {
    function e(e) {
      return e.name === t;
    }
    return (
      g(this.facets, e) ||
      g(this.disjunctiveFacets, e) ||
      g(this.hierarchicalFacets, e)
    );
  }),
    (K.DEFAULT_SORT = ["isRefined:desc", "count:desc", "name:asc"]),
    (K.prototype.getFacetValues = function (e, t) {
      var n = (function (n, r) {
        function e(e) {
          return e.name === r;
        }
        if (n._state.isConjunctiveFacet(r)) {
          var i = g(n.facets, e);
          return i
            ? Object.keys(i.data).map(function (e) {
                var t = q(e);
                return {
                  name: e,
                  escapedValue: t,
                  count: i.data[e],
                  isRefined: n._state.isFacetRefined(r, t),
                  isExcluded: n._state.isExcludeRefined(r, e),
                };
              })
            : [];
        }
        if (n._state.isDisjunctiveFacet(r)) {
          var a = g(n.disjunctiveFacets, e);
          return a
            ? Object.keys(a.data).map(function (e) {
                var t = q(e);
                return {
                  name: e,
                  escapedValue: t,
                  count: a.data[e],
                  isRefined: n._state.isDisjunctiveFacetRefined(r, t),
                };
              })
            : [];
        }
        if (n._state.isHierarchicalFacet(r)) return g(n.hierarchicalFacets, e);
      })(this, e);
      if (n) {
        var r,
          i = p({}, t, {
            sortBy: K.DEFAULT_SORT,
            facetOrdering: !(t && t.sortBy),
          }),
          a = this;
        if (Array.isArray(n)) r = [e];
        else r = a._state.getHierarchicalFacetByName(n.name).attributes;
        return (function t(n, e, r, i) {
          if (((i = i || 0), Array.isArray(e))) return n(e, r[i]);
          if (!e.data || 0 === e.data.length) return e;
          var a = e.data.map(function (e) {
              return t(n, e, r, i + 1);
            }),
            s = n(a, r[i]);
          return p({ data: s }, e);
        })(
          function (e, t) {
            if (i.facetOrdering) {
              var n = (function (e, t) {
                return (
                  e.renderingContent &&
                  e.renderingContent.facetOrdering &&
                  e.renderingContent.facetOrdering.values &&
                  e.renderingContent.facetOrdering.values[t]
                );
              })(a, t);
              if (Boolean(n))
                return (function (e, t) {
                  var n = [],
                    r = [],
                    i = (t.order || []).reduce(function (e, t, n) {
                      return (e[t] = n), e;
                    }, {});
                  e.forEach(function (e) {
                    var t = e.path || e.name;
                    void 0 !== i[t] ? (n[i[t]] = e) : r.push(e);
                  }),
                    (n = n.filter(function (e) {
                      return e;
                    }));
                  var a,
                    s = t.sortRemainingBy;
                  return "hidden" === s
                    ? n
                    : ((a =
                        "alpha" === s
                          ? [
                              ["path", "name"],
                              ["asc", "asc"],
                            ]
                          : [["count"], ["desc"]]),
                      n.concat(F(r, a[0], a[1])));
                })(e, n);
            }
            if (Array.isArray(i.sortBy)) {
              var r = I(i.sortBy, K.DEFAULT_SORT);
              return F(e, r[0], r[1]);
            }
            if ("function" == typeof i.sortBy)
              return (function (e, t) {
                return t.sort(e);
              })(i.sortBy, e);
            throw new Error(
              "options.sortBy is optional but if defined it must be either an array of string (predicates) or a sorting function"
            );
          },
          n,
          r
        );
      }
    }),
    (K.prototype.getFacetStats = function (e) {
      return this._state.isConjunctiveFacet(e)
        ? z(this.facets, e)
        : this._state.isDisjunctiveFacet(e)
        ? z(this.disjunctiveFacets, e)
        : void 0;
    }),
    (K.prototype.getRefinements = function () {
      var r = this._state,
        n = this,
        i = [];
      return (
        Object.keys(r.facetsRefinements).forEach(function (t) {
          r.facetsRefinements[t].forEach(function (e) {
            i.push(J(r, "facet", t, e, n.facets));
          });
        }),
        Object.keys(r.facetsExcludes).forEach(function (t) {
          r.facetsExcludes[t].forEach(function (e) {
            i.push(J(r, "exclude", t, e, n.facets));
          });
        }),
        Object.keys(r.disjunctiveFacetsRefinements).forEach(function (t) {
          r.disjunctiveFacetsRefinements[t].forEach(function (e) {
            i.push(J(r, "disjunctive", t, e, n.disjunctiveFacets));
          });
        }),
        Object.keys(r.hierarchicalFacetsRefinements).forEach(function (t) {
          r.hierarchicalFacetsRefinements[t].forEach(function (e) {
            i.push(
              (function (e, t, n, r) {
                var i = e.getHierarchicalFacetByName(t),
                  a = e._getHierarchicalFacetSeparator(i),
                  s = n.split(a),
                  o = g(r, function (e) {
                    return e.name === t;
                  }),
                  c = s.reduce(function (e, t) {
                    var n =
                      e &&
                      g(e.data, function (e) {
                        return e.name === t;
                      });
                    return void 0 !== n ? n : e;
                  }, o),
                  u = (c && c.count) || 0,
                  l = (c && c.exhaustive) || !1,
                  d = (c && c.path) || "";
                return {
                  type: "hierarchical",
                  attributeName: t,
                  name: d,
                  count: u,
                  exhaustive: l,
                };
              })(r, t, e, n.hierarchicalFacets)
            );
          });
        }),
        Object.keys(r.numericRefinements).forEach(function (n) {
          var e = r.numericRefinements[n];
          Object.keys(e).forEach(function (t) {
            e[t].forEach(function (e) {
              i.push({
                type: "numeric",
                attributeName: n,
                name: e,
                numericValue: e,
                operator: t,
              });
            });
          });
        }),
        r.tagRefinements.forEach(function (e) {
          i.push({ type: "tag", attributeName: "_tags", name: e });
        }),
        i
      );
    });
  var Y = K;
  function X() {
    (this._events = this._events || {}),
      (this._maxListeners = this._maxListeners || void 0);
  }
  var G = X;
  function Z(e) {
    return "function" == typeof e;
  }
  function ee(e) {
    return "object" == typeof e && null !== e;
  }
  function te(e) {
    return void 0 === e;
  }
  (X.prototype._events = void 0),
    (X.prototype._maxListeners = void 0),
    (X.defaultMaxListeners = 10),
    (X.prototype.setMaxListeners = function (e) {
      if (
        !(function (e) {
          return "number" == typeof e;
        })(e) ||
        e < 0 ||
        isNaN(e)
      )
        throw TypeError("n must be a positive number");
      return (this._maxListeners = e), this;
    }),
    (X.prototype.emit = function (e) {
      var t, n, r, i, a, s;
      if (
        (this._events || (this._events = {}),
        "error" === e &&
          (!this._events.error ||
            (ee(this._events.error) && !this._events.error.length)))
      ) {
        if ((t = arguments[1]) instanceof Error) throw t;
        var o = new Error('Uncaught, unspecified "error" event. (' + t + ")");
        throw ((o.context = t), o);
      }
      if (te((n = this._events[e]))) return !1;
      if (Z(n))
        switch (arguments.length) {
          case 1:
            n.call(this);
            break;
          case 2:
            n.call(this, arguments[1]);
            break;
          case 3:
            n.call(this, arguments[1], arguments[2]);
            break;
          default:
            (i = Array.prototype.slice.call(arguments, 1)), n.apply(this, i);
        }
      else if (ee(n))
        for (
          i = Array.prototype.slice.call(arguments, 1),
            r = (s = n.slice()).length,
            a = 0;
          a < r;
          a++
        )
          s[a].apply(this, i);
      return !0;
    }),
    (X.prototype.on = X.prototype.addListener =
      function (e, t) {
        var n;
        if (!Z(t)) throw TypeError("listener must be a function");
        return (
          this._events || (this._events = {}),
          this._events.newListener &&
            this.emit("newListener", e, Z(t.listener) ? t.listener : t),
          this._events[e]
            ? ee(this._events[e])
              ? this._events[e].push(t)
              : (this._events[e] = [this._events[e], t])
            : (this._events[e] = t),
          ee(this._events[e]) &&
            !this._events[e].warned &&
            (n = te(this._maxListeners)
              ? X.defaultMaxListeners
              : this._maxListeners) &&
            0 < n &&
            this._events[e].length > n &&
            ((this._events[e].warned = !0),
            console.error(
              "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
              this._events[e].length
            ),
            "function" == typeof console.trace && console.trace()),
          this
        );
      }),
    (X.prototype.once = function (e, t) {
      if (!Z(t)) throw TypeError("listener must be a function");
      var n = !1;
      function r() {
        this.removeListener(e, r), n || ((n = !0), t.apply(this, arguments));
      }
      return (r.listener = t), this.on(e, r), this;
    }),
    (X.prototype.removeListener = function (e, t) {
      var n, r, i, a;
      if (!Z(t)) throw TypeError("listener must be a function");
      if (!this._events || !this._events[e]) return this;
      if (
        ((i = (n = this._events[e]).length),
        (r = -1),
        n === t || (Z(n.listener) && n.listener === t))
      )
        delete this._events[e],
          this._events.removeListener && this.emit("removeListener", e, t);
      else if (ee(n)) {
        for (a = i; 0 < a--; )
          if (n[a] === t || (n[a].listener && n[a].listener === t)) {
            r = a;
            break;
          }
        if (r < 0) return this;
        1 === n.length
          ? ((n.length = 0), delete this._events[e])
          : n.splice(r, 1),
          this._events.removeListener && this.emit("removeListener", e, t);
      }
      return this;
    }),
    (X.prototype.removeAllListeners = function (e) {
      var t, n;
      if (!this._events) return this;
      if (!this._events.removeListener)
        return (
          0 === arguments.length
            ? (this._events = {})
            : this._events[e] && delete this._events[e],
          this
        );
      if (0 === arguments.length) {
        for (t in this._events)
          "removeListener" !== t && this.removeAllListeners(t);
        return (
          this.removeAllListeners("removeListener"), (this._events = {}), this
        );
      }
      if (Z((n = this._events[e]))) this.removeListener(e, n);
      else if (n) for (; n.length; ) this.removeListener(e, n[n.length - 1]);
      return delete this._events[e], this;
    }),
    (X.prototype.listeners = function (e) {
      return this._events && this._events[e]
        ? Z(this._events[e])
          ? [this._events[e]]
          : this._events[e].slice()
        : [];
    }),
    (X.prototype.listenerCount = function (e) {
      if (this._events) {
        var t = this._events[e];
        if (Z(t)) return 1;
        if (t) return t.length;
      }
      return 0;
    }),
    (X.listenerCount = function (e, t) {
      return e.listenerCount(t);
    });
  var ne = function (e, t) {
    e.prototype = Object.create(t.prototype, {
      constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
    });
  };
  function re(e, t) {
    (this.main = e), (this.fn = t), (this.lastResults = null);
  }
  ne(re, G),
    (re.prototype.detach = function () {
      this.removeAllListeners(), this.main.detachDerivedHelper(this);
    }),
    (re.prototype.getModifiedState = function (e) {
      return this.fn(e);
    });
  var ie = re;
  function ae(n) {
    return Object.keys(n)
      .sort(function (e, t) {
        return e.localeCompare(t);
      })
      .reduce(function (e, t) {
        return (e[t] = n[t]), e;
      }, {});
  }
  var se = {
      _getQueries: function (s, o) {
        var c = [];
        return (
          c.push({ indexName: s, params: se._getHitsSearchParams(o) }),
          o.getRefinedDisjunctiveFacets().forEach(function (e) {
            c.push({
              indexName: s,
              params: se._getDisjunctiveFacetSearchParams(o, e),
            });
          }),
          o.getRefinedHierarchicalFacets().forEach(function (e) {
            var r = o.getHierarchicalFacetByName(e),
              t = o.getHierarchicalRefinement(e),
              i = o._getHierarchicalFacetSeparator(r);
            if (0 < t.length && 1 < t[0].split(i).length) {
              var a = t[0]
                .split(i)
                .slice(0, -1)
                .reduce(function (e, t, n) {
                  return e.concat({
                    attribute: r.attributes[n],
                    value: 0 === n ? t : [e[e.length - 1].value, t].join(i),
                  });
                }, []);
              a.forEach(function (e, t) {
                var n = se._getDisjunctiveFacetSearchParams(
                    o,
                    e.attribute,
                    0 === t
                  ),
                  r = a[t - 1];
                (n.facetFilters =
                  0 < t ? [r.attribute + ":" + r.value] : void 0),
                  c.push({ indexName: s, params: n });
              });
            }
          }),
          c
        );
      },
      _getHitsSearchParams: function (e) {
        var t = e.facets
            .concat(e.disjunctiveFacets)
            .concat(se._getHitsHierarchicalFacetsAttributes(e)),
          n = se._getFacetFilters(e),
          r = se._getNumericFilters(e),
          i = se._getTagFilters(e),
          a = { facets: -1 < t.indexOf("*") ? ["*"] : t, tagFilters: i };
        return (
          0 < n.length && (a.facetFilters = n),
          0 < r.length && (a.numericFilters = r),
          ae(m({}, e.getQueryParams(), a))
        );
      },
      _getDisjunctiveFacetSearchParams: function (e, t, n) {
        var r = se._getFacetFilters(e, t, n),
          i = se._getNumericFilters(e, t),
          a = se._getTagFilters(e),
          s = { hitsPerPage: 0, page: 0, analytics: !1, clickAnalytics: !1 };
        0 < a.length && (s.tagFilters = a);
        var o = e.getHierarchicalFacetByName(t);
        return (
          (s.facets = o
            ? se._getDisjunctiveHierarchicalFacetAttribute(e, o, n)
            : t),
          0 < i.length && (s.numericFilters = i),
          0 < r.length && (s.facetFilters = r),
          ae(m({}, e.getQueryParams(), s))
        );
      },
      _getNumericFilters: function (e, i) {
        if (e.numericFilters) return e.numericFilters;
        var a = [];
        return (
          Object.keys(e.numericRefinements).forEach(function (r) {
            var t = e.numericRefinements[r] || {};
            Object.keys(t).forEach(function (n) {
              var e = t[n] || [];
              i !== r &&
                e.forEach(function (e) {
                  if (Array.isArray(e)) {
                    var t = e.map(function (e) {
                      return r + n + e;
                    });
                    a.push(t);
                  } else a.push(r + n + e);
                });
            });
          }),
          a
        );
      },
      _getTagFilters: function (e) {
        return e.tagFilters ? e.tagFilters : e.tagRefinements.join(",");
      },
      _getFacetFilters: function (o, c, u) {
        var l = [],
          e = o.facetsRefinements || {};
        Object.keys(e).forEach(function (t) {
          (e[t] || []).forEach(function (e) {
            l.push(t + ":" + e);
          });
        });
        var n = o.facetsExcludes || {};
        Object.keys(n).forEach(function (t) {
          (n[t] || []).forEach(function (e) {
            l.push(t + ":-" + e);
          });
        });
        var r = o.disjunctiveFacetsRefinements || {};
        Object.keys(r).forEach(function (t) {
          var e = r[t] || [];
          if (t !== c && e && 0 !== e.length) {
            var n = [];
            e.forEach(function (e) {
              n.push(t + ":" + e);
            }),
              l.push(n);
          }
        });
        var d = o.hierarchicalFacetsRefinements || {};
        return (
          Object.keys(d).forEach(function (e) {
            var t = (d[e] || [])[0];
            if (void 0 !== t) {
              var n,
                r,
                i = o.getHierarchicalFacetByName(e),
                a = o._getHierarchicalFacetSeparator(i),
                s = o._getHierarchicalRootPath(i);
              if (c === e) {
                if (
                  -1 === t.indexOf(a) ||
                  (!s && !0 === u) ||
                  (s && s.split(a).length === t.split(a).length)
                )
                  return;
                (t = s
                  ? ((r = s.split(a).length - 1), s)
                  : ((r = t.split(a).length - 2),
                    t.slice(0, t.lastIndexOf(a)))),
                  (n = i.attributes[r]);
              } else (r = t.split(a).length - 1), (n = i.attributes[r]);
              n && l.push([n + ":" + t]);
            }
          }),
          l
        );
      },
      _getHitsHierarchicalFacetsAttributes: function (s) {
        return s.hierarchicalFacets.reduce(function (e, t) {
          var n = s.getHierarchicalRefinement(t.name)[0];
          if (!n) return e.push(t.attributes[0]), e;
          var r = s._getHierarchicalFacetSeparator(t),
            i = n.split(r).length,
            a = t.attributes.slice(0, i + 1);
          return e.concat(a);
        }, []);
      },
      _getDisjunctiveHierarchicalFacetAttribute: function (e, t, n) {
        var r = e._getHierarchicalFacetSeparator(t);
        if (!0 === n) {
          var i = e._getHierarchicalRootPath(t),
            a = 0;
          return i && (a = i.split(r).length), [t.attributes[a]];
        }
        var s =
          (e.getHierarchicalRefinement(t.name)[0] || "").split(r).length - 1;
        return t.attributes.slice(0, 1 + s);
      },
      getSearchForFacetQuery: function (e, t, n, r) {
        var i = r.isDisjunctiveFacet(e) ? r.clearRefinements(e) : r,
          a = { facetQuery: t, facetName: e };
        return (
          "number" == typeof n && (a.maxFacetHits = n),
          ae(m({}, se._getHitsSearchParams(i), a))
        );
      },
    },
    oe = se,
    ce = "3.10.0",
    ue = e;
  function le(e, t, n) {
    "function" == typeof e.addAlgoliaAgent &&
      e.addAlgoliaAgent("JS Helper (3.10.0)"),
      this.setClient(e);
    var r = n || {};
    (r.index = t),
      (this.state = w.make(r)),
      (this.lastResults = null),
      (this._queryId = 0),
      (this._lastQueryIdReceived = -1),
      (this.derivedHelpers = []),
      (this._currentNbQueries = 0);
  }
  function de(e) {
    if (e < 0) throw new Error("Page requested below 0.");
    return (
      this._change({ state: this.state.setPage(e), isPageReset: !1 }), this
    );
  }
  function he() {
    return this.state.page;
  }
  ne(le, G),
    (le.prototype.search = function () {
      return this._search({ onlyWithDerivedHelpers: !1 }), this;
    }),
    (le.prototype.searchOnlyWithDerivedHelpers = function () {
      return this._search({ onlyWithDerivedHelpers: !0 }), this;
    }),
    (le.prototype.getQuery = function () {
      var e = this.state;
      return oe._getHitsSearchParams(e);
    }),
    (le.prototype.searchOnce = function (e, t) {
      var n = e ? this.state.setQueryParameters(e) : this.state,
        r = oe._getQueries(n.index, n),
        i = this;
      if ((this._currentNbQueries++, this.emit("searchOnce", { state: n }), !t))
        return this.client.search(r).then(
          function (e) {
            return (
              i._currentNbQueries--,
              0 === i._currentNbQueries && i.emit("searchQueueEmpty"),
              { content: new Y(n, e.results), state: n, _originalResponse: e }
            );
          },
          function (e) {
            throw (
              (i._currentNbQueries--,
              0 === i._currentNbQueries && i.emit("searchQueueEmpty"),
              e)
            );
          }
        );
      this.client
        .search(r)
        .then(function (e) {
          i._currentNbQueries--,
            0 === i._currentNbQueries && i.emit("searchQueueEmpty"),
            t(null, new Y(n, e.results), n);
        })
        .catch(function (e) {
          i._currentNbQueries--,
            0 === i._currentNbQueries && i.emit("searchQueueEmpty"),
            t(e, null, n);
        });
    }),
    (le.prototype.findAnswers = function (e) {
      var t = this.state,
        n = this.derivedHelpers[0];
      if (!n) return Promise.resolve([]);
      var r = n.getModifiedState(t),
        i = m(
          {
            attributesForPrediction: e.attributesForPrediction,
            nbHits: e.nbHits,
          },
          {
            params: d(oe._getHitsSearchParams(r), [
              "attributesToSnippet",
              "hitsPerPage",
              "restrictSearchableAttributes",
              "snippetEllipsisText",
            ]),
          }
        ),
        a =
          "search for answers was called, but this client does not have a function client.initIndex(index).findAnswers";
      if ("function" != typeof this.client.initIndex) throw new Error(a);
      var s = this.client.initIndex(r.index);
      if ("function" != typeof s.findAnswers) throw new Error(a);
      return s.findAnswers(r.query, e.queryLanguages, i);
    }),
    (le.prototype.searchForFacetValues = function (t, e, n, r) {
      var i = "function" == typeof this.client.searchForFacetValues,
        a = "function" == typeof this.client.initIndex;
      if (!i && !a && "function" != typeof this.client.search)
        throw new Error(
          "search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues"
        );
      var s = this.state.setQueryParameters(r || {}),
        o = s.isDisjunctiveFacet(t),
        c = oe.getSearchForFacetQuery(t, e, n, s);
      this._currentNbQueries++;
      var u,
        l = this;
      return (
        (u = i
          ? this.client.searchForFacetValues([
              { indexName: s.index, params: c },
            ])
          : a
          ? this.client.initIndex(s.index).searchForFacetValues(c)
          : (delete c.facetName,
            this.client
              .search([
                { type: "facet", facet: t, indexName: s.index, params: c },
              ])
              .then(function (e) {
                return e.results[0];
              }))),
        this.emit("searchForFacetValues", { state: s, facet: t, query: e }),
        u.then(
          function (e) {
            return (
              l._currentNbQueries--,
              0 === l._currentNbQueries && l.emit("searchQueueEmpty"),
              (e = Array.isArray(e) ? e[0] : e).facetHits.forEach(function (e) {
                (e.escapedValue = ue(e.value)),
                  (e.isRefined = o
                    ? s.isDisjunctiveFacetRefined(t, e.escapedValue)
                    : s.isFacetRefined(t, e.escapedValue));
              }),
              e
            );
          },
          function (e) {
            throw (
              (l._currentNbQueries--,
              0 === l._currentNbQueries && l.emit("searchQueueEmpty"),
              e)
            );
          }
        )
      );
    }),
    (le.prototype.setQuery = function (e) {
      return (
        this._change({
          state: this.state.resetPage().setQuery(e),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.clearRefinements = function (e) {
      return (
        this._change({
          state: this.state.resetPage().clearRefinements(e),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.clearTags = function () {
      return (
        this._change({
          state: this.state.resetPage().clearTags(),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.addDisjunctiveFacetRefinement = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().addDisjunctiveFacetRefinement(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.addDisjunctiveRefine = function () {
      return this.addDisjunctiveFacetRefinement.apply(this, arguments);
    }),
    (le.prototype.addHierarchicalFacetRefinement = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().addHierarchicalFacetRefinement(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.addNumericRefinement = function (e, t, n) {
      return (
        this._change({
          state: this.state.resetPage().addNumericRefinement(e, t, n),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.addFacetRefinement = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().addFacetRefinement(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.addRefine = function () {
      return this.addFacetRefinement.apply(this, arguments);
    }),
    (le.prototype.addFacetExclusion = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().addExcludeRefinement(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.addExclude = function () {
      return this.addFacetExclusion.apply(this, arguments);
    }),
    (le.prototype.addTag = function (e) {
      return (
        this._change({
          state: this.state.resetPage().addTagRefinement(e),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.removeNumericRefinement = function (e, t, n) {
      return (
        this._change({
          state: this.state.resetPage().removeNumericRefinement(e, t, n),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.removeDisjunctiveFacetRefinement = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().removeDisjunctiveFacetRefinement(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.removeDisjunctiveRefine = function () {
      return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
    }),
    (le.prototype.removeHierarchicalFacetRefinement = function (e) {
      return (
        this._change({
          state: this.state.resetPage().removeHierarchicalFacetRefinement(e),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.removeFacetRefinement = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().removeFacetRefinement(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.removeRefine = function () {
      return this.removeFacetRefinement.apply(this, arguments);
    }),
    (le.prototype.removeFacetExclusion = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().removeExcludeRefinement(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.removeExclude = function () {
      return this.removeFacetExclusion.apply(this, arguments);
    }),
    (le.prototype.removeTag = function (e) {
      return (
        this._change({
          state: this.state.resetPage().removeTagRefinement(e),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.toggleFacetExclusion = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().toggleExcludeFacetRefinement(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.toggleExclude = function () {
      return this.toggleFacetExclusion.apply(this, arguments);
    }),
    (le.prototype.toggleRefinement = function (e, t) {
      return this.toggleFacetRefinement(e, t);
    }),
    (le.prototype.toggleFacetRefinement = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().toggleFacetRefinement(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.toggleRefine = function () {
      return this.toggleFacetRefinement.apply(this, arguments);
    }),
    (le.prototype.toggleTag = function (e) {
      return (
        this._change({
          state: this.state.resetPage().toggleTagRefinement(e),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.nextPage = function () {
      var e = this.state.page || 0;
      return this.setPage(e + 1);
    }),
    (le.prototype.previousPage = function () {
      var e = this.state.page || 0;
      return this.setPage(e - 1);
    }),
    (le.prototype.setCurrentPage = de),
    (le.prototype.setPage = de),
    (le.prototype.setIndex = function (e) {
      return (
        this._change({
          state: this.state.resetPage().setIndex(e),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.setQueryParameter = function (e, t) {
      return (
        this._change({
          state: this.state.resetPage().setQueryParameter(e, t),
          isPageReset: !0,
        }),
        this
      );
    }),
    (le.prototype.setState = function (e) {
      return this._change({ state: w.make(e), isPageReset: !1 }), this;
    }),
    (le.prototype.overrideStateWithoutTriggeringChangeEvent = function (e) {
      return (this.state = new w(e)), this;
    }),
    (le.prototype.hasRefinements = function (e) {
      return (
        !!f(this.state.getNumericRefinements(e)) ||
        (this.state.isConjunctiveFacet(e)
          ? this.state.isFacetRefined(e)
          : this.state.isDisjunctiveFacet(e)
          ? this.state.isDisjunctiveFacetRefined(e)
          : !!this.state.isHierarchicalFacet(e) &&
            this.state.isHierarchicalFacetRefined(e))
      );
    }),
    (le.prototype.isExcluded = function (e, t) {
      return this.state.isExcludeRefined(e, t);
    }),
    (le.prototype.isDisjunctiveRefined = function (e, t) {
      return this.state.isDisjunctiveFacetRefined(e, t);
    }),
    (le.prototype.hasTag = function (e) {
      return this.state.isTagRefined(e);
    }),
    (le.prototype.isTagRefined = function () {
      return this.hasTagRefinements.apply(this, arguments);
    }),
    (le.prototype.getIndex = function () {
      return this.state.index;
    }),
    (le.prototype.getCurrentPage = he),
    (le.prototype.getPage = he),
    (le.prototype.getTags = function () {
      return this.state.tagRefinements;
    }),
    (le.prototype.getRefinements = function (e) {
      var n = [];
      if (this.state.isConjunctiveFacet(e))
        this.state.getConjunctiveRefinements(e).forEach(function (e) {
          n.push({ value: e, type: "conjunctive" });
        }),
          this.state.getExcludeRefinements(e).forEach(function (e) {
            n.push({ value: e, type: "exclude" });
          });
      else if (this.state.isDisjunctiveFacet(e)) {
        this.state.getDisjunctiveRefinements(e).forEach(function (e) {
          n.push({ value: e, type: "disjunctive" });
        });
      }
      var r = this.state.getNumericRefinements(e);
      return (
        Object.keys(r).forEach(function (e) {
          var t = r[e];
          n.push({ value: t, operator: e, type: "numeric" });
        }),
        n
      );
    }),
    (le.prototype.getNumericRefinement = function (e, t) {
      return this.state.getNumericRefinement(e, t);
    }),
    (le.prototype.getHierarchicalFacetBreadcrumb = function (e) {
      return this.state.getHierarchicalFacetBreadcrumb(e);
    }),
    (le.prototype._search = function (e) {
      var r = this.state,
        i = [],
        t = [];
      e.onlyWithDerivedHelpers ||
        ((t = oe._getQueries(r.index, r)),
        i.push({ state: r, queriesCount: t.length, helper: this }),
        this.emit("search", { state: r, results: this.lastResults }));
      var n = this.derivedHelpers.map(function (e) {
          var t = e.getModifiedState(r),
            n = oe._getQueries(t.index, t);
          return (
            i.push({ state: t, queriesCount: n.length, helper: e }),
            e.emit("search", { state: t, results: e.lastResults }),
            n
          );
        }),
        a = Array.prototype.concat.apply(t, n),
        s = this._queryId++;
      this._currentNbQueries++;
      try {
        this.client
          .search(a)
          .then(this._dispatchAlgoliaResponse.bind(this, i, s))
          .catch(this._dispatchAlgoliaError.bind(this, s));
      } catch (e) {
        this.emit("error", { error: e });
      }
    }),
    (le.prototype._dispatchAlgoliaResponse = function (e, t, n) {
      if (!(t < this._lastQueryIdReceived)) {
        (this._currentNbQueries -= t - this._lastQueryIdReceived),
          (this._lastQueryIdReceived = t),
          0 === this._currentNbQueries && this.emit("searchQueueEmpty");
        var s = n.results.slice();
        e.forEach(function (e) {
          var t = e.state,
            n = e.queriesCount,
            r = e.helper,
            i = s.splice(0, n),
            a = (r.lastResults = new Y(t, i));
          r.emit("result", { results: a, state: t });
        });
      }
    }),
    (le.prototype._dispatchAlgoliaError = function (e, t) {
      e < this._lastQueryIdReceived ||
        ((this._currentNbQueries -= e - this._lastQueryIdReceived),
        (this._lastQueryIdReceived = e),
        this.emit("error", { error: t }),
        0 === this._currentNbQueries && this.emit("searchQueueEmpty"));
    }),
    (le.prototype.containsRefinement = function (e, t, n, r) {
      return e || 0 !== t.length || 0 !== n.length || 0 !== r.length;
    }),
    (le.prototype._hasDisjunctiveRefinements = function (e) {
      return (
        this.state.disjunctiveRefinements[e] &&
        0 < this.state.disjunctiveRefinements[e].length
      );
    }),
    (le.prototype._change = function (e) {
      var t = e.state,
        n = e.isPageReset;
      t !== this.state &&
        ((this.state = t),
        this.emit("change", {
          state: this.state,
          results: this.lastResults,
          isPageReset: n,
        }));
    }),
    (le.prototype.clearCache = function () {
      return this.client.clearCache && this.client.clearCache(), this;
    }),
    (le.prototype.setClient = function (e) {
      return (
        this.client === e ||
          ("function" == typeof e.addAlgoliaAgent &&
            e.addAlgoliaAgent("JS Helper (3.10.0)"),
          (this.client = e)),
        this
      );
    }),
    (le.prototype.getClient = function () {
      return this.client;
    }),
    (le.prototype.derive = function (e) {
      var t = new ie(this, e);
      return this.derivedHelpers.push(t), t;
    }),
    (le.prototype.detachDerivedHelper = function (e) {
      var t = this.derivedHelpers.indexOf(e);
      if (-1 === t) throw new Error("Derived helper already detached");
      this.derivedHelpers.splice(t, 1);
    }),
    (le.prototype.hasPendingRequests = function () {
      return 0 < this._currentNbQueries;
    });
  var fe = le;
  function me(e, t, n) {
    return new fe(e, t, n);
  }
  (me.version = ce),
    (me.AlgoliaSearchHelper = fe),
    (me.SearchParameters = w),
    (me.SearchResults = Y);
  var pe = me;
  function ge(r) {
    function e() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      null === i &&
        (i = ve.then(function () {
          (i = null), a ? (a = !1) : r.apply(void 0, t);
        }));
    }
    var i = null,
      a = !1;
    return (
      (e.wait = function () {
        if (null === i)
          throw new Error(
            "The deferred function should be called before calling `wait()`"
          );
        return i;
      }),
      (e.cancel = function () {
        null !== i && (a = !0);
      }),
      e
    );
  }
  var ve = Promise.resolve();
  function ye(e) {
    var t = "string" == typeof e,
      n = t ? document.querySelector(e) : e;
    if (
      (function (e) {
        return e instanceof HTMLElement || (Boolean(e) && 0 < e.nodeType);
      })(n)
    )
      return n;
    var r = "Container must be `string` or `HTMLElement`.";
    throw (t && (r += " Unable to find ".concat(e)), new Error(r));
  }
  function be(e) {
    return 1 === e.button || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
  }
  function Re(e) {
    return e.filter(function (e, t, n) {
      return n.indexOf(e) === t;
    });
  }
  function Se(e) {
    var t = e.defaultTemplates,
      n = e.templates;
    return W(
      { templatesConfig: e.templatesConfig },
      (function (a, e) {
        var s = 1 < arguments.length && void 0 !== e ? e : {};
        return Re([].concat(P(Object.keys(a || {})), P(Object.keys(s)))).reduce(
          function (e, t) {
            var n = a ? a[t] : void 0,
              r = s[t],
              i = void 0 !== r && r !== n;
            return (
              (e.templates[t] = i ? r : n),
              (e.useCustomCompileOptions[t] = i),
              e
            );
          },
          { templates: {}, useCustomCompileOptions: {} }
        );
      })(t, n)
    );
  }
  function we(e, t) {
    return e((t = { exports: {} }), t.exports), t.exports;
  }
  var _e = we(function (e, t) {
      !(function (R) {
        var S = /\S/,
          t = /\"/g,
          n = /\n/g,
          r = /\r/g,
          i = /\\/g,
          a = /\u2028/,
          s = /\u2029/;
        function w(e) {
          "}" === e.n.substr(e.n.length - 1) &&
            (e.n = e.n.substring(0, e.n.length - 1));
        }
        function _(e) {
          return e.trim ? e.trim() : e.replace(/^\s*|\s*$/g, "");
        }
        function P(e, t, n) {
          if (t.charAt(n) != e.charAt(0)) return !1;
          for (var r = 1, i = e.length; r < i; r++)
            if (t.charAt(n + r) != e.charAt(r)) return !1;
          return !0;
        }
        (R.tags = {
          "#": 1,
          "^": 2,
          "<": 3,
          $: 4,
          "/": 5,
          "!": 6,
          ">": 7,
          "=": 8,
          _v: 9,
          "{": 10,
          "&": 11,
          _t: 12,
        }),
          (R.scan = function (e, t) {
            var n,
              r,
              i,
              a,
              s,
              o = e.length,
              c = 0,
              u = null,
              l = null,
              d = "",
              h = [],
              f = !1,
              m = 0,
              p = 0,
              g = "{{",
              v = "}}";
            function y() {
              0 < d.length &&
                (h.push({ tag: "_t", text: new String(d) }), (d = ""));
            }
            function b(e, t) {
              if (
                (y(),
                e &&
                  (function () {
                    for (var e = !0, t = p; t < h.length; t++)
                      if (
                        !(e =
                          R.tags[h[t].tag] < R.tags._v ||
                          ("_t" == h[t].tag && null === h[t].text.match(S)))
                      )
                        return !1;
                    return e;
                  })())
              )
                for (var n, r = p; r < h.length; r++)
                  h[r].text &&
                    ((n = h[r + 1]) &&
                      ">" == n.tag &&
                      (n.indent = h[r].text.toString()),
                    h.splice(r, 1));
              else t || h.push({ tag: "\n" });
              (f = !1), (p = h.length);
            }
            for (
              t && ((t = t.split(" ")), (g = t[0]), (v = t[1])), m = 0;
              m < o;
              m++
            )
              0 == c
                ? P(g, e, m)
                  ? (--m, y(), (c = 1))
                  : "\n" == e.charAt(m)
                  ? b(f)
                  : (d += e.charAt(m))
                : 1 == c
                ? ((m += g.length - 1),
                  (c =
                    "=" ==
                    (u = (l = R.tags[e.charAt(m + 1)]) ? e.charAt(m + 1) : "_v")
                      ? ((r = m),
                        void 0,
                        (i = "=" + v),
                        (a = (n = e).indexOf(i, r)),
                        (s = _(n.substring(n.indexOf("=", r) + 1, a)).split(
                          " "
                        )),
                        (g = s[0]),
                        (v = s[s.length - 1]),
                        (m = a + i.length - 1),
                        0)
                      : (l && m++, 2)),
                  (f = m))
                : P(v, e, m)
                ? (h.push({
                    tag: u,
                    n: _(d),
                    otag: g,
                    ctag: v,
                    i: "/" == u ? f - g.length : m + v.length,
                  }),
                  (d = ""),
                  (m += v.length - 1),
                  (c = 0),
                  "{" == u && ("}}" == v ? m++ : w(h[h.length - 1])))
                : (d += e.charAt(m));
            return b(f, !0), h;
          });
        var u = { _t: !0, "\n": !0, $: !0, "/": !0 };
        function l(e, t) {
          for (var n = 0, r = t.length; n < r; n++)
            if (t[n].o == e.n) return (e.tag = "#"), !0;
        }
        function d(e, t, n) {
          for (var r = 0, i = n.length; r < i; r++)
            if (n[r].c == e && n[r].o == t) return !0;
        }
        function o(e) {
          var t = [];
          for (var n in e.partials)
            t.push(
              '"' +
                h(n) +
                '":{name:"' +
                h(e.partials[n].name) +
                '", ' +
                o(e.partials[n]) +
                "}"
            );
          return (
            "partials: {" +
            t.join(",") +
            "}, subs: " +
            (function (e) {
              var t = [];
              for (var n in e)
                t.push('"' + h(n) + '": function(c,p,t,i) {' + e[n] + "}");
              return "{ " + t.join(",") + " }";
            })(e.subs)
          );
        }
        R.stringify = function (e, t, n) {
          return (
            "{code: function (c,p,i) { " +
            R.wrapMain(e.code) +
            " }," +
            o(e) +
            "}"
          );
        };
        var c = 0;
        function h(e) {
          return e
            .replace(i, "\\\\")
            .replace(t, '\\"')
            .replace(n, "\\n")
            .replace(r, "\\r")
            .replace(a, "\\u2028")
            .replace(s, "\\u2029");
        }
        function f(e) {
          return ~e.indexOf(".") ? "d" : "f";
        }
        function m(e, t) {
          var n = "<" + (t.prefix || "") + e.n + c++;
          return (
            (t.partials[n] = { name: e.n, partials: {} }),
            (t.code +=
              't.b(t.rp("' + h(n) + '",c,p,"' + (e.indent || "") + '"));'),
            n
          );
        }
        function e(e, t) {
          t.code += "t.b(t.t(t." + f(e.n) + '("' + h(e.n) + '",c,p,0)));';
        }
        function p(e) {
          return "t.b(" + e + ");";
        }
        (R.generate = function (e, t, n) {
          c = 0;
          var r = { code: "", subs: {}, partials: {} };
          return (
            R.walk(e, r),
            n.asString ? this.stringify(r, t, n) : this.makeTemplate(r, t, n)
          );
        }),
          (R.wrapMain = function (e) {
            return 'var t=this;t.b(i=i||"");' + e + "return t.fl();";
          }),
          (R.template = R.Template),
          (R.makeTemplate = function (e, t, n) {
            var r = this.makePartials(e);
            return (
              (r.code = new Function("c", "p", "i", this.wrapMain(e.code))),
              new this.template(r, t, this, n)
            );
          }),
          (R.makePartials = function (e) {
            var t,
              n = { subs: {}, partials: e.partials, name: e.name };
            for (t in n.partials)
              n.partials[t] = this.makePartials(n.partials[t]);
            for (t in e.subs)
              n.subs[t] = new Function("c", "p", "t", "i", e.subs[t]);
            return n;
          }),
          (R.codegen = {
            "#": function (e, t) {
              (t.code +=
                "if(t.s(t." +
                f(e.n) +
                '("' +
                h(e.n) +
                '",c,p,1),c,p,0,' +
                e.i +
                "," +
                e.end +
                ',"' +
                e.otag +
                " " +
                e.ctag +
                '")){t.rs(c,p,function(c,p,t){'),
                R.walk(e.nodes, t),
                (t.code += "});c.pop();}");
            },
            "^": function (e, t) {
              (t.code +=
                "if(!t.s(t." +
                f(e.n) +
                '("' +
                h(e.n) +
                '",c,p,1),c,p,1,0,0,"")){'),
                R.walk(e.nodes, t),
                (t.code += "};");
            },
            ">": m,
            "<": function (e, t) {
              var n = { partials: {}, code: "", subs: {}, inPartial: !0 };
              R.walk(e.nodes, n);
              var r = t.partials[m(e, t)];
              (r.subs = n.subs), (r.partials = n.partials);
            },
            $: function (e, t) {
              var n = { subs: {}, code: "", partials: t.partials, prefix: e.n };
              R.walk(e.nodes, n),
                (t.subs[e.n] = n.code),
                t.inPartial || (t.code += 't.sub("' + h(e.n) + '",c,p,i);');
            },
            "\n": function (e, t) {
              t.code += p('"\\n"' + (e.last ? "" : " + i"));
            },
            _v: function (e, t) {
              t.code += "t.b(t.v(t." + f(e.n) + '("' + h(e.n) + '",c,p,0)));';
            },
            _t: function (e, t) {
              t.code += p('"' + h(e.text) + '"');
            },
            "{": e,
            "&": e,
          }),
          (R.walk = function (e, t) {
            for (var n, r = 0, i = e.length; r < i; r++)
              (n = R.codegen[e[r].tag]) && n(e[r], t);
            return t;
          }),
          (R.parse = function (e, t, n) {
            return (function e(t, n, r, i) {
              var a,
                s = [],
                o = null,
                c = null;
              for (a = r[r.length - 1]; 0 < t.length; ) {
                if (((c = t.shift()), a && "<" == a.tag && !(c.tag in u)))
                  throw new Error("Illegal content in < super tag.");
                if (R.tags[c.tag] <= R.tags.$ || l(c, i))
                  r.push(c), (c.nodes = e(t, c.tag, r, i));
                else {
                  if ("/" == c.tag) {
                    if (0 === r.length)
                      throw new Error("Closing tag without opener: /" + c.n);
                    if (((o = r.pop()), c.n != o.n && !d(c.n, o.n, i)))
                      throw new Error("Nesting error: " + o.n + " vs. " + c.n);
                    return (o.end = c.i), s;
                  }
                  "\n" == c.tag && (c.last = 0 == t.length || "\n" == t[0].tag);
                }
                s.push(c);
              }
              if (0 < r.length)
                throw new Error("missing closing tag: " + r.pop().n);
              return s;
            })(e, 0, [], (n = n || {}).sectionTags || []);
          }),
          (R.cache = {}),
          (R.cacheKey = function (e, t) {
            return [
              e,
              !!t.asString,
              !!t.disableLambda,
              t.delimiters,
              !!t.modelGet,
            ].join("||");
          }),
          (R.compile = function (e, t) {
            t = t || {};
            var n = R.cacheKey(e, t),
              r = this.cache[n];
            if (r) {
              var i = r.partials;
              for (var a in i) delete i[a].instance;
              return r;
            }
            return (
              (r = this.generate(
                this.parse(this.scan(e, t.delimiters), e, t),
                e,
                t
              )),
              (this.cache[n] = r)
            );
          });
      })(t);
    }),
    Pe = we(function (e, t) {
      !(function (e) {
        function l(e, t, n) {
          var r;
          return (
            t &&
              "object" == typeof t &&
              (void 0 !== t[e]
                ? (r = t[e])
                : n && t.get && "function" == typeof t.get && (r = t.get(e))),
            r
          );
        }
        (e.Template = function (e, t, n, r) {
          (e = e || {}),
            (this.r = e.code || this.r),
            (this.c = n),
            (this.options = r || {}),
            (this.text = t || ""),
            (this.partials = e.partials || {}),
            (this.subs = e.subs || {}),
            (this.buf = "");
        }),
          (e.Template.prototype = {
            r: function (e, t, n) {
              return "";
            },
            v: function (e) {
              return (
                (e = o(e)),
                s.test(e)
                  ? e
                      .replace(t, "&amp;")
                      .replace(n, "&lt;")
                      .replace(r, "&gt;")
                      .replace(i, "&#39;")
                      .replace(a, "&quot;")
                  : e
              );
            },
            t: o,
            render: function (e, t, n) {
              return this.ri([e], t || {}, n);
            },
            ri: function (e, t, n) {
              return this.r(e, t, n);
            },
            ep: function (e, t) {
              var n = this.partials[e],
                r = t[n.name];
              if (n.instance && n.base == r) return n.instance;
              if ("string" == typeof r) {
                if (!this.c) throw new Error("No compiler available.");
                r = this.c.compile(r, this.options);
              }
              if (!r) return null;
              if (((this.partials[e].base = r), n.subs)) {
                for (key in (t.stackText || (t.stackText = {}), n.subs))
                  t.stackText[key] ||
                    (t.stackText[key] =
                      void 0 !== this.activeSub && t.stackText[this.activeSub]
                        ? t.stackText[this.activeSub]
                        : this.text);
                r = (function (e, t, n, r, i, a) {
                  function s() {}
                  function o() {}
                  var c;
                  o.prototype = (s.prototype = e).subs;
                  var u = new s();
                  for (c in ((u.subs = new o()),
                  (u.subsText = {}),
                  (u.buf = ""),
                  (r = r || {}),
                  (u.stackSubs = r),
                  (u.subsText = a),
                  t))
                    r[c] || (r[c] = t[c]);
                  for (c in r) u.subs[c] = r[c];
                  for (c in ((i = i || {}), (u.stackPartials = i), n))
                    i[c] || (i[c] = n[c]);
                  for (c in i) u.partials[c] = i[c];
                  return u;
                })(
                  r,
                  n.subs,
                  n.partials,
                  this.stackSubs,
                  this.stackPartials,
                  t.stackText
                );
              }
              return (this.partials[e].instance = r);
            },
            rp: function (e, t, n, r) {
              var i = this.ep(e, n);
              return i ? i.ri(t, n, r) : "";
            },
            rs: function (e, t, n) {
              var r = e[e.length - 1];
              if (d(r))
                for (var i = 0; i < r.length; i++)
                  e.push(r[i]), n(e, t, this), e.pop();
              else n(e, t, this);
            },
            s: function (e, t, n, r, i, a, s) {
              var o;
              return (
                (!d(e) || 0 !== e.length) &&
                ("function" == typeof e && (e = this.ms(e, t, n, r, i, a, s)),
                (o = !!e),
                !r &&
                  o &&
                  t &&
                  t.push("object" == typeof e ? e : t[t.length - 1]),
                o)
              );
            },
            d: function (e, t, n, r) {
              var i,
                a = e.split("."),
                s = this.f(a[0], t, n, r),
                o = this.options.modelGet,
                c = null;
              if ("." === e && d(t[t.length - 2])) s = t[t.length - 1];
              else
                for (var u = 1; u < a.length; u++)
                  s = void 0 !== (i = l(a[u], s, o)) ? ((c = s), i) : "";
              return (
                !(r && !s) &&
                (r ||
                  "function" != typeof s ||
                  (t.push(c), (s = this.mv(s, t, n)), t.pop()),
                s)
              );
            },
            f: function (e, t, n, r) {
              for (
                var i = !1, a = !1, s = this.options.modelGet, o = t.length - 1;
                0 <= o;
                o--
              )
                if (void 0 !== (i = l(e, t[o], s))) {
                  a = !0;
                  break;
                }
              return a
                ? (r || "function" != typeof i || (i = this.mv(i, t, n)), i)
                : !r && "";
            },
            ls: function (e, t, n, r, i) {
              var a = this.options.delimiters;
              return (
                (this.options.delimiters = i),
                this.b(this.ct(o(e.call(t, r)), t, n)),
                (this.options.delimiters = a),
                !1
              );
            },
            ct: function (e, t, n) {
              if (this.options.disableLambda)
                throw new Error("Lambda features disabled.");
              return this.c.compile(e, this.options).render(t, n);
            },
            b: function (e) {
              this.buf += e;
            },
            fl: function () {
              var e = this.buf;
              return (this.buf = ""), e;
            },
            ms: function (e, t, n, r, i, a, s) {
              var o,
                c = t[t.length - 1],
                u = e.call(c);
              return "function" == typeof u
                ? !!r ||
                    ((o =
                      this.activeSub &&
                      this.subsText &&
                      this.subsText[this.activeSub]
                        ? this.subsText[this.activeSub]
                        : this.text),
                    this.ls(u, c, n, o.substring(i, a), s))
                : u;
            },
            mv: function (e, t, n) {
              var r = t[t.length - 1],
                i = e.call(r);
              return "function" == typeof i ? this.ct(o(i.call(r)), r, n) : i;
            },
            sub: function (e, t, n, r) {
              var i = this.subs[e];
              i &&
                ((this.activeSub = e), i(t, n, this, r), (this.activeSub = !1));
            },
          });
        var t = /&/g,
          n = /</g,
          r = />/g,
          i = /\'/g,
          a = /\"/g,
          s = /[&<>\"\']/;
        function o(e) {
          return String(null == e ? "" : e);
        }
        var d =
          Array.isArray ||
          function (e) {
            return "[object Array]" === Object.prototype.toString.call(e);
          };
      })(t);
    });
  (_e.Template = Pe.Template), (_e.template = _e.Template);
  var Ne,
    xe,
    Ie,
    Fe,
    Te,
    Ce = _e,
    Ee = {},
    ke = [],
    je = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function Le(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }
  function Me(e) {
    var t = e.parentNode;
    t && t.removeChild(e);
  }
  function He(e, t, n) {
    var r,
      i,
      a,
      s = {};
    for (a in t)
      "key" == a ? (r = t[a]) : "ref" == a ? (i = t[a]) : (s[a] = t[a]);
    if (
      (2 < arguments.length &&
        (s.children = 3 < arguments.length ? Ne.call(arguments, 2) : n),
      "function" == typeof e && null != e.defaultProps)
    )
      for (a in e.defaultProps) void 0 === s[a] && (s[a] = e.defaultProps[a]);
    return Oe(e, s, r, i, null);
  }
  function Oe(e, t, n, r, i) {
    var a = {
      type: e,
      props: t,
      key: n,
      ref: r,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      __h: null,
      constructor: void 0,
      __v: null == i ? ++Ie : i,
    };
    return null == i && null != xe.vnode && xe.vnode(a), a;
  }
  function Ae(e) {
    return e.children;
  }
  function We(e, t) {
    (this.props = e), (this.context = t);
  }
  function De(e, t) {
    if (null == t) return e.__ ? De(e.__, e.__.__k.indexOf(e) + 1) : null;
    for (var n; t < e.__k.length; t++)
      if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
    return "function" == typeof e.type ? De(e) : null;
  }
  function Be(e) {
    var t, n;
    if (null != (e = e.__) && null != e.__c) {
      for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
        if (null != (n = e.__k[t]) && null != n.__e) {
          e.__e = e.__c.base = n.__e;
          break;
        }
      return Be(e);
    }
  }
  function Ue(e) {
    ((!e.__d && (e.__d = !0) && Fe.push(e) && !qe.__r++) ||
      Te !== xe.debounceRendering) &&
      ((Te = xe.debounceRendering) || setTimeout)(qe);
  }
  function qe() {
    for (var e; (qe.__r = Fe.length); )
      (e = Fe.sort(function (e, t) {
        return e.__v.__b - t.__v.__b;
      })),
        (Fe = []),
        e.some(function (e) {
          var t, n, r, i, a, s;
          e.__d &&
            ((a = (i = (t = e).__v).__e),
            (s = t.__P) &&
              ((n = []),
              ((r = Le({}, i)).__v = i.__v + 1),
              Xe(
                s,
                i,
                r,
                t.__n,
                void 0 !== s.ownerSVGElement,
                null != i.__h ? [a] : null,
                n,
                null == a ? De(i) : a,
                i.__h
              ),
              Ge(n, i),
              i.__e != a && Be(i)));
        });
  }
  function Qe(e, t, n, r, i, a, s, o, c, u) {
    var l,
      d,
      h,
      f,
      m,
      p,
      g,
      v = (r && r.__k) || ke,
      y = v.length;
    for (n.__k = [], l = 0; l < t.length; l++)
      if (
        null !=
        (f = n.__k[l] =
          null == (f = t[l]) || "boolean" == typeof f
            ? null
            : "string" == typeof f ||
              "number" == typeof f ||
              "bigint" == typeof f
            ? Oe(null, f, null, null, f)
            : Array.isArray(f)
            ? Oe(Ae, { children: f }, null, null, null)
            : 0 < f.__b
            ? Oe(f.type, f.props, f.key, null, f.__v)
            : f)
      ) {
        if (
          ((f.__ = n),
          (f.__b = n.__b + 1),
          null === (h = v[l]) || (h && f.key == h.key && f.type === h.type))
        )
          v[l] = void 0;
        else
          for (d = 0; d < y; d++) {
            if ((h = v[d]) && f.key == h.key && f.type === h.type) {
              v[d] = void 0;
              break;
            }
            h = null;
          }
        Xe(e, f, (h = h || Ee), i, a, s, o, c, u),
          (m = f.__e),
          (d = f.ref) &&
            h.ref != d &&
            ((g = g || []),
            h.ref && g.push(h.ref, null, f),
            g.push(d, f.__c || m, f)),
          null != m
            ? (null == p && (p = m),
              "function" == typeof f.type && f.__k === h.__k
                ? (f.__d = c = Ve(f, c, e))
                : (c = $e(e, f, h, v, m, c)),
              "function" == typeof n.type && (n.__d = c))
            : c && h.__e == c && c.parentNode != e && (c = De(h));
      }
    for (n.__e = p, l = y; l--; )
      null != v[l] &&
        ("function" == typeof n.type &&
          null != v[l].__e &&
          v[l].__e == n.__d &&
          (n.__d = De(r, l + 1)),
        et(v[l], v[l]));
    if (g) for (l = 0; l < g.length; l++) Ze(g[l], g[++l], g[++l]);
  }
  function Ve(e, t, n) {
    for (var r, i = e.__k, a = 0; i && a < i.length; a++)
      (r = i[a]) &&
        ((r.__ = e),
        (t =
          "function" == typeof r.type
            ? Ve(r, t, n)
            : $e(n, r, r, i, r.__e, t)));
    return t;
  }
  function $e(e, t, n, r, i, a) {
    var s, o, c;
    if (void 0 !== t.__d) (s = t.__d), (t.__d = void 0);
    else if (null == n || i != a || null == i.parentNode)
      e: if (null == a || a.parentNode !== e) e.appendChild(i), (s = null);
      else {
        for (o = a, c = 0; (o = o.nextSibling) && c < r.length; c += 2)
          if (o == i) break e;
        e.insertBefore(i, a), (s = a);
      }
    return void 0 !== s ? s : i.nextSibling;
  }
  function Ke(e, t, n) {
    "-" === t[0]
      ? e.setProperty(t, n)
      : (e[t] =
          null == n ? "" : "number" != typeof n || je.test(t) ? n : n + "px");
  }
  function ze(e, t, n, r, i) {
    var a;
    e: if ("style" === t)
      if ("string" == typeof n) e.style.cssText = n;
      else {
        if (("string" == typeof r && (e.style.cssText = r = ""), r))
          for (t in r) (n && t in n) || Ke(e.style, t, "");
        if (n) for (t in n) (r && n[t] === r[t]) || Ke(e.style, t, n[t]);
      }
    else if ("o" === t[0] && "n" === t[1])
      (a = t !== (t = t.replace(/Capture$/, ""))),
        (t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2)),
        e.l || (e.l = {}),
        (e.l[t + a] = n),
        n
          ? r || e.addEventListener(t, a ? Ye : Je, a)
          : e.removeEventListener(t, a ? Ye : Je, a);
    else if ("dangerouslySetInnerHTML" !== t) {
      if (i) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (
        "href" !== t &&
        "list" !== t &&
        "form" !== t &&
        "tabIndex" !== t &&
        "download" !== t &&
        t in e
      )
        try {
          e[t] = null == n ? "" : n;
          break e;
        } catch (e) {}
      "function" == typeof n ||
        (null != n && (!1 !== n || ("a" === t[0] && "r" === t[1]))
          ? e.setAttribute(t, n)
          : e.removeAttribute(t));
    }
  }
  function Je(e) {
    this.l[e.type + !1](xe.event ? xe.event(e) : e);
  }
  function Ye(e) {
    this.l[e.type + !0](xe.event ? xe.event(e) : e);
  }
  function Xe(e, t, n, r, i, a, s, o, c) {
    var u,
      l,
      d,
      h,
      f,
      m,
      p,
      g,
      v,
      y,
      b,
      R,
      S,
      w = t.type;
    if (void 0 !== t.constructor) return null;
    null != n.__h &&
      ((c = n.__h), (o = t.__e = n.__e), (t.__h = null), (a = [o])),
      (u = xe.__b) && u(t);
    try {
      e: if ("function" == typeof w) {
        if (
          ((g = t.props),
          (v = (u = w.contextType) && r[u.__c]),
          (y = u ? (v ? v.props.value : u.__) : r),
          n.__c
            ? (p = (l = t.__c = n.__c).__ = l.__E)
            : ("prototype" in w && w.prototype.render
                ? (t.__c = l = new w(g, y))
                : ((t.__c = l = new We(g, y)),
                  (l.constructor = w),
                  (l.render = tt)),
              v && v.sub(l),
              (l.props = g),
              l.state || (l.state = {}),
              (l.context = y),
              (l.__n = r),
              (d = l.__d = !0),
              (l.__h = [])),
          null == l.__s && (l.__s = l.state),
          null != w.getDerivedStateFromProps &&
            (l.__s == l.state && (l.__s = Le({}, l.__s)),
            Le(l.__s, w.getDerivedStateFromProps(g, l.__s))),
          (h = l.props),
          (f = l.state),
          d)
        )
          null == w.getDerivedStateFromProps &&
            null != l.componentWillMount &&
            l.componentWillMount(),
            null != l.componentDidMount && l.__h.push(l.componentDidMount);
        else {
          if (
            (null == w.getDerivedStateFromProps &&
              g !== h &&
              null != l.componentWillReceiveProps &&
              l.componentWillReceiveProps(g, y),
            (!l.__e &&
              null != l.shouldComponentUpdate &&
              !1 === l.shouldComponentUpdate(g, l.__s, y)) ||
              t.__v === n.__v)
          ) {
            (l.props = g),
              (l.state = l.__s),
              t.__v !== n.__v && (l.__d = !1),
              ((l.__v = t).__e = n.__e),
              (t.__k = n.__k),
              t.__k.forEach(function (e) {
                e && (e.__ = t);
              }),
              l.__h.length && s.push(l);
            break e;
          }
          null != l.componentWillUpdate && l.componentWillUpdate(g, l.__s, y),
            null != l.componentDidUpdate &&
              l.__h.push(function () {
                l.componentDidUpdate(h, f, m);
              });
        }
        if (
          ((l.context = y),
          (l.props = g),
          (l.__v = t),
          (l.__P = e),
          (b = xe.__r),
          (R = 0),
          "prototype" in w && w.prototype.render)
        )
          (l.state = l.__s),
            (l.__d = !1),
            b && b(t),
            (u = l.render(l.props, l.state, l.context));
        else
          for (
            ;
            (l.__d = !1),
              b && b(t),
              (u = l.render(l.props, l.state, l.context)),
              (l.state = l.__s),
              l.__d && ++R < 25;

          );
        (l.state = l.__s),
          null != l.getChildContext && (r = Le(Le({}, r), l.getChildContext())),
          d ||
            null == l.getSnapshotBeforeUpdate ||
            (m = l.getSnapshotBeforeUpdate(h, f)),
          (S =
            null != u && u.type === Ae && null == u.key ? u.props.children : u),
          Qe(e, Array.isArray(S) ? S : [S], t, n, r, i, a, s, o, c),
          (l.base = t.__e),
          (t.__h = null),
          l.__h.length && s.push(l),
          p && (l.__E = l.__ = null),
          (l.__e = !1);
      } else
        null == a && t.__v === n.__v
          ? ((t.__k = n.__k), (t.__e = n.__e))
          : (t.__e = (function (e, t, n, r, i, a, s, o) {
              var c,
                u,
                l,
                d = n.props,
                h = t.props,
                f = t.type,
                m = 0;
              if (("svg" === f && (i = !0), null != a))
                for (; m < a.length; m++)
                  if (
                    (c = a[m]) &&
                    "setAttribute" in c == !!f &&
                    (f ? c.localName === f : 3 === c.nodeType)
                  ) {
                    (e = c), (a[m] = null);
                    break;
                  }
              if (null == e) {
                if (null === f) return document.createTextNode(h);
                (e = i
                  ? document.createElementNS("http://www.w3.org/2000/svg", f)
                  : document.createElement(f, h.is && h)),
                  (a = null),
                  (o = !1);
              }
              if (null === f) d === h || (o && e.data === h) || (e.data = h);
              else {
                if (
                  ((a = a && Ne.call(e.childNodes)),
                  (u = (d = n.props || Ee).dangerouslySetInnerHTML),
                  (l = h.dangerouslySetInnerHTML),
                  !o)
                ) {
                  if (null != a)
                    for (d = {}, m = 0; m < e.attributes.length; m++)
                      d[e.attributes[m].name] = e.attributes[m].value;
                  (l || u) &&
                    ((l &&
                      ((u && l.__html == u.__html) ||
                        l.__html === e.innerHTML)) ||
                      (e.innerHTML = (l && l.__html) || ""));
                }
                if (
                  ((function (e, t, n, r, i) {
                    var a;
                    for (a in n)
                      "children" === a ||
                        "key" === a ||
                        a in t ||
                        ze(e, a, null, n[a], r);
                    for (a in t)
                      (i && "function" != typeof t[a]) ||
                        "children" === a ||
                        "key" === a ||
                        "value" === a ||
                        "checked" === a ||
                        n[a] === t[a] ||
                        ze(e, a, t[a], n[a], r);
                  })(e, h, d, i, o),
                  l)
                )
                  t.__k = [];
                else if (
                  ((m = t.props.children),
                  Qe(
                    e,
                    Array.isArray(m) ? m : [m],
                    t,
                    n,
                    r,
                    i && "foreignObject" !== f,
                    a,
                    s,
                    a ? a[0] : n.__k && De(n, 0),
                    o
                  ),
                  null != a)
                )
                  for (m = a.length; m--; ) null != a[m] && Me(a[m]);
                o ||
                  ("value" in h &&
                    void 0 !== (m = h.value) &&
                    (m !== e.value ||
                      ("progress" === f && !m) ||
                      ("option" === f && m !== d.value)) &&
                    ze(e, "value", m, d.value, !1),
                  "checked" in h &&
                    void 0 !== (m = h.checked) &&
                    m !== e.checked &&
                    ze(e, "checked", m, d.checked, !1));
              }
              return e;
            })(n.__e, t, n, r, i, a, s, c));
      (u = xe.diffed) && u(t);
    } catch (e) {
      (t.__v = null),
        (!c && null == a) ||
          ((t.__e = o), (t.__h = !!c), (a[a.indexOf(o)] = null)),
        xe.__e(e, t, n);
    }
  }
  function Ge(e, t) {
    xe.__c && xe.__c(t, e),
      e.some(function (t) {
        try {
          (e = t.__h),
            (t.__h = []),
            e.some(function (e) {
              e.call(t);
            });
        } catch (e) {
          xe.__e(e, t.__v);
        }
      });
  }
  function Ze(e, t, n) {
    try {
      "function" == typeof e ? e(t) : (e.current = t);
    } catch (e) {
      xe.__e(e, n);
    }
  }
  function et(e, t, n) {
    var r, i;
    if (
      (xe.unmount && xe.unmount(e),
      (r = e.ref) && ((r.current && r.current !== e.__e) || Ze(r, null, t)),
      null != (r = e.__c))
    ) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount();
        } catch (e) {
          xe.__e(e, t);
        }
      r.base = r.__P = null;
    }
    if ((r = e.__k))
      for (i = 0; i < r.length; i++)
        r[i] && et(r[i], t, "function" != typeof e.type);
    n || null == e.__e || Me(e.__e), (e.__e = e.__d = void 0);
  }
  function tt(e, t, n) {
    return this.constructor(e, n);
  }
  function nt(e, t, n) {
    var r, i, a;
    xe.__ && xe.__(e, t),
      (i = (r = "function" == typeof n) ? null : (n && n.__k) || t.__k),
      (a = []),
      Xe(
        t,
        (e = ((!r && n) || t).__k = He(Ae, null, [e])),
        i || Ee,
        Ee,
        void 0 !== t.ownerSVGElement,
        !r && n ? [n] : i ? null : t.firstChild ? Ne.call(t.childNodes) : null,
        a,
        !r && n ? n : i ? i.__e : t.firstChild,
        r
      ),
      Ge(a, e);
  }
  function rt() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return t.filter(Boolean).join(" ") || void 0;
  }
  (Ne = ke.slice),
    (xe = {
      __e: function (e, t, n, r) {
        for (var i, a, s; (t = t.__); )
          if ((i = t.__c) && !i.__)
            try {
              if (
                ((a = i.constructor) &&
                  null != a.getDerivedStateFromError &&
                  (i.setState(a.getDerivedStateFromError(e)), (s = i.__d)),
                null != i.componentDidCatch &&
                  (i.componentDidCatch(e, r || {}), (s = i.__d)),
                s)
              )
                return (i.__E = i);
            } catch (t) {
              e = t;
            }
        throw e;
      },
    }),
    (Ie = 0),
    (We.prototype.setState = function (e, t) {
      var n;
      (n =
        null != this.__s && this.__s !== this.state
          ? this.__s
          : (this.__s = Le({}, this.state))),
        "function" == typeof e && (e = e(Le({}, n), this.props)),
        e && Le(n, e),
        null != e && this.__v && (t && this.__h.push(t), Ue(this));
    }),
    (We.prototype.forceUpdate = function (e) {
      this.__v && ((this.__e = !0), e && this.__h.push(e), Ue(this));
    }),
    (We.prototype.render = Ae),
    (Fe = []),
    (qe.__r = 0);
  var it = we(function (e) {
    function t() {
      return (
        (e.exports = t =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
        t.apply(this, arguments)
      );
    }
    e.exports = t;
  });
  var at = function (e, t) {
    if (null == e) return {};
    var n,
      r,
      i = {},
      a = Object.keys(e);
    for (r = 0; r < a.length; r++)
      (n = a[r]), 0 <= t.indexOf(n) || (i[n] = e[n]);
    return i;
  };
  var st = function (e, t) {
      if (null == e) return {};
      var n,
        r,
        i = at(e, t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        for (r = 0; r < a.length; r++)
          (n = a[r]),
            0 <= t.indexOf(n) ||
              (Object.prototype.propertyIsEnumerable.call(e, n) &&
                (i[n] = e[n]));
      }
      return i;
    },
    ot = [
      "parts",
      "highlightedTagName",
      "nonHighlightedTagName",
      "separator",
      "className",
      "classNames",
    ];
  var ct,
    ut,
    lt,
    dt,
    ht =
      ((ut = (ct = { createElement: He, Fragment: Ae }).createElement),
      (lt = ct.Fragment),
      (dt = (function (e) {
        var s = e.createElement;
        return function (e) {
          var t = e.classNames,
            n = e.children,
            r = e.highlightedTagName,
            i = e.isHighlighted,
            a = e.nonHighlightedTagName;
          return s(
            i ? r : a,
            { className: i ? t.highlighted : t.nonHighlighted },
            n
          );
        };
      })({ createElement: ut, Fragment: lt })),
      function (e) {
        var r = e.parts,
          t = e.highlightedTagName,
          i = void 0 === t ? "mark" : t,
          n = e.nonHighlightedTagName,
          a = void 0 === n ? "span" : n,
          s = e.separator,
          o = void 0 === s ? ", " : s,
          c = e.className,
          u = e.classNames,
          l = void 0 === u ? {} : u,
          d = st(e, ot);
        return ut(
          "span",
          it({}, d, { className: rt(l.root, c) }),
          r.map(function (e, t) {
            var n = t === r.length - 1;
            return ut(
              lt,
              { key: t },
              e.map(function (e, t) {
                return ut(
                  dt,
                  {
                    key: t,
                    classNames: l,
                    highlightedTagName: i,
                    nonHighlightedTagName: a,
                    isHighlighted: e.isHighlighted,
                  },
                  e.value
                );
              }),
              !n && ut("span", { className: l.separator }, o)
            );
          })
        );
      });
  function ft(e) {
    var t = e.classNames,
      n = void 0 === t ? {} : t,
      r = M(e, ["classNames"]);
    return He(
      ht,
      h(
        {
          classNames: {
            root: rt("ais-Highlight", n.root),
            highlighted: rt("ais-Highlight-highlighted", n.highlighted),
            nonHighlighted: rt(
              "ais-Highlight-nonHighlighted",
              n.nonHighlighted
            ),
            separator: rt("ais-Highlight-separator", n.separator),
          },
        },
        r
      )
    );
  }
  var mt = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    },
    pt = /[&<>"']/g,
    gt = RegExp(pt.source);
  function vt(e) {
    if (
      !(function (e) {
        return "object" === C(e) && null !== e;
      })(e) ||
      "[object Object]" !==
        (function (e) {
          return null === e
            ? void 0 === e
              ? "[object Undefined]"
              : "[object Null]"
            : Object.prototype.toString.call(e);
        })(e)
    )
      return !1;
    if (null === Object.getPrototypeOf(e)) return !0;
    for (var t = e; null !== Object.getPrototypeOf(t); )
      t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
  }
  var yt = {
      highlightPreTag: "__ais-highlight__",
      highlightPostTag: "__/ais-highlight__",
    },
    bt = { highlightPreTag: "<mark>", highlightPostTag: "</mark>" };
  function Rt(e) {
    return (function (e) {
      return e && gt.test(e)
        ? e.replace(pt, function (e) {
            return mt[e];
          })
        : e;
    })(e)
      .replace(new RegExp(yt.highlightPreTag, "g"), bt.highlightPreTag)
      .replace(new RegExp(yt.highlightPostTag, "g"), bt.highlightPostTag);
  }
  function St(n) {
    return vt(n) && "string" != typeof n.value
      ? Object.keys(n).reduce(function (e, t) {
          return W(W({}, e), {}, j({}, t, St(n[t])));
        }, {})
      : Array.isArray(n)
      ? n.map(St)
      : W(W({}, n), {}, { value: Rt(n.value) });
  }
  function wt(e) {
    return (
      void 0 === e.__escaped &&
        ((e = e.map(function (e) {
          var t = h({}, e);
          return (
            t._highlightResult && (t._highlightResult = St(t._highlightResult)),
            t._snippetResult && (t._snippetResult = St(t._snippetResult)),
            t
          );
        })).__escaped = !0),
      e
    );
  }
  function _t(e) {
    var n = bt.highlightPostTag,
      t = bt.highlightPreTag,
      r = e.split(t),
      i = r.shift(),
      a = i ? [{ value: i, isHighlighted: !1 }] : [];
    return (
      r.forEach(function (e) {
        var t = e.split(n);
        a.push({ value: t[0], isHighlighted: !0 }),
          "" !== t[1] && a.push({ value: t[1], isHighlighted: !1 });
      }),
      a
    );
  }
  function Pt(e, t) {
    return (Array.isArray(t) ? t : t.split(".")).reduce(function (e, t) {
      return e && e[t];
    }, e);
  }
  var Nt = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
    },
    xt = /&(amp|quot|lt|gt|#39);/g,
    It = RegExp(xt.source);
  function Ft(e) {
    return e && It.test(e)
      ? e.replace(xt, function (e) {
          return Nt[e];
        })
      : e;
  }
  function Tt() {}
  function Ct(e, t) {
    return e;
  }
  function Et(e) {
    var t = e.hit,
      n = e.attribute,
      r = e.cssClasses,
      i = M(e, ["hit", "attribute", "cssClasses"]),
      a = Pt(t._highlightResult, n) || [];
    return He(
      ft,
      h({}, i, {
        parts: (Array.isArray(a) ? a : [a]).map(function (e) {
          return _t(Ft(e.value || ""));
        }),
        classNames: r,
      })
    );
  }
  function kt(e) {
    var t = e.classNames,
      n = void 0 === t ? {} : t,
      r = M(e, ["classNames"]);
    return He(
      ht,
      h(
        {
          classNames: {
            root: rt("ais-ReverseHighlight", n.root),
            highlighted: rt("ais-ReverseHighlight-highlighted", n.highlighted),
            nonHighlighted: rt(
              "ais-ReverseHighlight-nonHighlighted",
              n.nonHighlighted
            ),
            separator: rt("ais-ReverseHighlight-separator", n.separator),
          },
        },
        r
      )
    );
  }
  function jt(e) {
    var t = e.hit,
      n = e.attribute,
      r = e.cssClasses,
      i = M(e, ["hit", "attribute", "cssClasses"]),
      a = Pt(t._highlightResult, n) || [];
    return He(
      kt,
      h({}, i, {
        parts: (Array.isArray(a) ? a : [a]).map(function (e) {
          return _t(Ft(e.value || "")).map(function (e) {
            var t = e.isHighlighted;
            return W(W({}, M(e, ["isHighlighted"])), {}, { isHighlighted: !t });
          });
        }),
        classNames: r,
      })
    );
  }
  function Lt(e) {
    var t = e.classNames,
      n = void 0 === t ? {} : t,
      r = M(e, ["classNames"]);
    return He(
      ht,
      h(
        {
          classNames: {
            root: rt("ais-ReverseSnippet", n.root),
            highlighted: rt("ais-ReverseSnippet-highlighted", n.highlighted),
            nonHighlighted: rt(
              "ais-ReverseSnippet-nonHighlighted",
              n.nonHighlighted
            ),
            separator: rt("ais-ReverseSnippet-separator", n.separator),
          },
        },
        r
      )
    );
  }
  function Mt(e) {
    var t = e.hit,
      n = e.attribute,
      r = e.cssClasses,
      i = M(e, ["hit", "attribute", "cssClasses"]),
      a = Pt(t._snippetResult, n) || [];
    return He(
      Lt,
      h({}, i, {
        parts: (Array.isArray(a) ? a : [a]).map(function (e) {
          return _t(Ft(e.value || "")).map(function (e) {
            var t = e.isHighlighted;
            return W(W({}, M(e, ["isHighlighted"])), {}, { isHighlighted: !t });
          });
        }),
        classNames: r,
      })
    );
  }
  function Ht(e) {
    var t = e.classNames,
      n = void 0 === t ? {} : t,
      r = M(e, ["classNames"]);
    return He(
      ht,
      h(
        {
          classNames: {
            root: rt("ais-Snippet", n.root),
            highlighted: rt("ais-Snippet-highlighted", n.highlighted),
            nonHighlighted: rt("ais-Snippet-nonHighlighted", n.nonHighlighted),
            separator: rt("ais-Snippet-separator", n.separator),
          },
        },
        r
      )
    );
  }
  function Ot(e) {
    var t = e.hit,
      n = e.attribute,
      r = e.cssClasses,
      i = M(e, ["hit", "attribute", "cssClasses"]),
      a = Pt(t._snippetResult, n) || [];
    return He(
      Ht,
      h({}, i, {
        parts: (Array.isArray(a) ? a : [a]).map(function (e) {
          return _t(Ft(e.value || ""));
        }),
        classNames: r,
      })
    );
  }
  var At = function (e, t, n, r) {
      var i;
      t[0] = 0;
      for (var a = 1; a < t.length; a++) {
        var s = t[a++],
          o = t[a] ? ((t[0] |= s ? 1 : 2), n[t[a++]]) : t[++a];
        3 === s
          ? (r[0] = o)
          : 4 === s
          ? (r[1] = Object.assign(r[1] || {}, o))
          : 5 === s
          ? ((r[1] = r[1] || {})[t[++a]] = o)
          : 6 === s
          ? (r[1][t[++a]] += o + "")
          : s
          ? ((i = e.apply(o, At(e, o, n, ["", null]))),
            r.push(i),
            o[0] ? (t[0] |= 2) : ((t[a - 2] = 0), (t[a] = i)))
          : r.push(o);
      }
      return r;
    },
    Wt = new Map();
  var Dt = function (e) {
    var t = Wt.get(this);
    return (
      t || ((t = new Map()), Wt.set(this, t)),
      1 <
      (t = At(
        this,
        t.get(e) ||
          (t.set(
            e,
            (t = (function (e) {
              for (
                var t,
                  n,
                  r = 1,
                  i = "",
                  a = "",
                  s = [0],
                  o = function (e) {
                    1 === r &&
                    (e || (i = i.replace(/^\s*\n\s*|\s*\n\s*$/g, "")))
                      ? s.push(0, e, i)
                      : 3 === r && (e || i)
                      ? (s.push(3, e, i), (r = 2))
                      : 2 === r && "..." === i && e
                      ? s.push(4, e, 0)
                      : 2 === r && i && !e
                      ? s.push(5, 0, !0, i)
                      : 5 <= r &&
                        ((i || (!e && 5 === r)) &&
                          (s.push(r, 0, i, n), (r = 6)),
                        e && (s.push(r, e, 0, n), (r = 6))),
                      (i = "");
                  },
                  c = 0;
                c < e.length;
                c++
              ) {
                c && (1 === r && o(), o(c));
                for (var u = 0; u < e[c].length; u++)
                  (t = e[c][u]),
                    1 === r
                      ? "<" === t
                        ? (o(), (s = [s]), (r = 3))
                        : (i += t)
                      : 4 === r
                      ? (i = "--" === i && ">" === t ? ((r = 1), "") : t + i[0])
                      : a
                      ? t === a
                        ? (a = "")
                        : (i += t)
                      : '"' === t || "'" === t
                      ? (a = t)
                      : ">" === t
                      ? (o(), (r = 1))
                      : r &&
                        ("=" === t
                          ? ((r = 5), (n = i), (i = ""))
                          : "/" === t && (r < 5 || ">" === e[c][u + 1])
                          ? (o(),
                            3 === r && (s = s[0]),
                            (s = (r = s)[0]).push(2, 0, r),
                            (r = 0))
                          : " " === t || "\t" === t || "\n" === t || "\r" === t
                          ? (o(), (r = 2))
                          : (i += t)),
                    3 === r && "!--" === i && ((r = 4), (s = s[0]));
              }
              return o(), s;
            })(e))
          ),
          t),
        arguments,
        []
      )).length
        ? t
        : t[0]
    );
  }.bind(He);
  function Bt(e) {
    var t = e.templates,
      n = e.templateKey,
      r = e.compileOptions,
      i = e.helpers,
      a = e.data,
      s = e.bindEvent,
      o = e.sendEvent,
      c = t[n];
    if ("string" != typeof c && "function" != typeof c)
      throw new Error(
        "Template must be 'string' or 'function', was '"
          .concat(C(c), "' (key: ")
          .concat(n, ")")
      );
    if ("function" == typeof c) {
      var u = s || {};
      return (
        (u.html = Dt),
        (u.sendEvent = o),
        (u.components = {
          Highlight: Et,
          ReverseHighlight: jt,
          Snippet: Ot,
          ReverseSnippet: Mt,
        }),
        c(a, u)
      );
    }
    var l = (function (e, t, n) {
      var r = 0 < arguments.length && void 0 !== e ? e : {},
        i = 1 < arguments.length ? t : void 0,
        a = 2 < arguments.length ? n : void 0;
      return Object.keys(r).reduce(function (e, n) {
        return W(
          W({}, e),
          {},
          j({}, n, function () {
            var t = this;
            return function (e) {
              return r[n].call(a, e, function (e) {
                return Ce.compile(e, i).render(t);
              });
            };
          })
        );
      }, {});
    })(i, r, a);
    return Ce.compile(c, r)
      .render(W(W({}, a), {}, { helpers: l }))
      .replace(/[ \n\r\t\f\xA0]+/g, function (e) {
        return e.replace(/(^|\xA0+)[^\xA0]+/g, "$1 ");
      })
      .trim();
  }
  function Ut(e, t) {
    for (var n, r = 0; r < e.length; r++) if (t((n = e[r]), r, e)) return n;
  }
  function qt(e) {
    return ("number" == typeof e && e < 0) || "string" == typeof e
      ? String(e).replace(/^-/, "\\-")
      : e;
  }
  function Qt(i, e, a, s, t) {
    var o,
      n = 4 < arguments.length && void 0 !== t ? t : [],
      r = { type: e, attribute: a, name: s, escapedValue: qt(s) },
      c = Ut(n, function (e) {
        return e.name === a;
      });
    return (
      "hierarchical" === e
        ? (function () {
            for (
              var e = i.getHierarchicalFacetByName(a),
                n = s.split(e.separator),
                t = function (t) {
                  c =
                    c &&
                    c.data &&
                    Ut(
                      Object.keys(c.data).map(
                        (function (t) {
                          return function (e) {
                            return t[e];
                          };
                        })(c.data)
                      ),
                      function (e) {
                        return e.name === n[t];
                      }
                    );
                },
                r = 0;
              void 0 !== c && r < n.length;
              ++r
            )
              t(r);
            o = c && c.count;
          })()
        : (o = c && c.data && c.data[r.name]),
      void 0 !== o && (r.count = o),
      c && void 0 !== c.exhaustive && (r.exhaustive = c.exhaustive),
      r
    );
  }
  function Vt(n, r, e) {
    var t = 2 < arguments.length && void 0 !== e && e,
      a = [],
      i = r.facetsRefinements,
      s = void 0 === i ? {} : i,
      o = r.facetsExcludes,
      c = void 0 === o ? {} : o,
      u = r.disjunctiveFacetsRefinements,
      l = void 0 === u ? {} : u,
      d = r.hierarchicalFacetsRefinements,
      h = void 0 === d ? {} : d,
      f = r.numericRefinements,
      m = void 0 === f ? {} : f,
      p = r.tagRefinements,
      g = void 0 === p ? [] : p;
    return (
      Object.keys(s).forEach(function (t) {
        s[t].forEach(function (e) {
          a.push(Qt(r, "facet", t, e, n.facets));
        });
      }),
      Object.keys(c).forEach(function (t) {
        c[t].forEach(function (e) {
          a.push({ type: "exclude", attribute: t, name: e, exclude: !0 });
        });
      }),
      Object.keys(l).forEach(function (t) {
        l[t].forEach(function (e) {
          a.push(
            Qt(
              r,
              "disjunctive",
              t,
              (function (e) {
                return "string" == typeof e ? e.replace(/^\\-/, "-") : e;
              })(e),
              n.disjunctiveFacets
            )
          );
        });
      }),
      Object.keys(h).forEach(function (t) {
        h[t].forEach(function (e) {
          a.push(Qt(r, "hierarchical", t, e, n.hierarchicalFacets));
        });
      }),
      Object.keys(m).forEach(function (r) {
        var i = m[r];
        Object.keys(i).forEach(function (e) {
          var t = e,
            n = i[t];
          (Array.isArray(n) ? n : [n]).forEach(function (e) {
            a.push({
              type: "numeric",
              attribute: r,
              name: "".concat(e),
              numericValue: e,
              operator: t,
            });
          });
        });
      }),
      g.forEach(function (e) {
        a.push({ type: "tag", attribute: "_tags", name: e });
      }),
      t &&
        r.query &&
        r.query.trim() &&
        a.push({
          attribute: "query",
          type: "query",
          name: r.query,
          query: r.query,
        }),
      a
    );
  }
  function $t(e) {
    var t = e.helper,
      n = e.attributesToClear,
      r = void 0 === n ? [] : n,
      i = t.state.setPage(0);
    return (
      (i = r.reduce(function (e, t) {
        return i.isNumericRefined(t)
          ? e.removeNumericRefinement(t)
          : i.isHierarchicalFacet(t)
          ? e.removeHierarchicalFacetRefinement(t)
          : i.isDisjunctiveFacet(t)
          ? e.removeDisjunctiveFacetRefinement(t)
          : i.isConjunctiveFacet(t)
          ? e.removeFacetRefinement(t)
          : e;
      }, i)),
      -1 !== r.indexOf("query") && (i = i.setQuery("")),
      i
    );
  }
  function Kt(e, t) {
    if (void 0 === e || "function" != typeof e)
      throw new Error(
        "The render function is not valid (received type "
          .concat(
            (function (e) {
              return Object.prototype.toString.call(e).slice(8, -1);
            })(e),
            ").\n\n"
          )
          .concat(t)
      );
  }
  function zt(e) {
    return "number" == typeof e && isFinite(e);
  }
  function Jt(e) {
    var t = e.start,
      n = void 0 === t ? 0 : t,
      r = e.end,
      i = e.step,
      a = void 0 === i ? 1 : i,
      s = 0 === a ? 1 : a,
      o = Math.round((r - n) / s);
    return P(Array(o)).map(function (e, t) {
      return n + t * s;
    });
  }
  function Yt(e) {
    return e !== Object(e);
  }
  function Xt(e, t) {
    if (e === t) return !0;
    if (Yt(e) || Yt(t) || "function" == typeof e || "function" == typeof t)
      return e === t;
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (var n = 0, r = Object.keys(e); n < r.length; n++) {
      var i = r[n];
      if (!(i in t)) return !1;
      if (!Xt(e[i], t[i])) return !1;
    }
    return !0;
  }
  function Gt(e) {
    var t = bt.highlightPreTag,
      n = bt.highlightPostTag;
    return e
      .map(function (e) {
        return e.isHighlighted ? t + e.value + n : e.value;
      })
      .join("");
  }
  var Zt = new RegExp(/\w/i);
  function en(n) {
    return n.some(function (e) {
      return e.isHighlighted;
    })
      ? n.map(function (e, t) {
          return W(
            W({}, e),
            {},
            {
              isHighlighted: !(function (e, t) {
                var n,
                  r,
                  i = e[t],
                  a =
                    (null === (n = e[t + 1]) || void 0 === n
                      ? void 0
                      : n.isHighlighted) || !0,
                  s =
                    (null === (r = e[t - 1]) || void 0 === r
                      ? void 0
                      : r.isHighlighted) || !0;
                return Zt.test(Ft(i.value)) || s !== a ? i.isHighlighted : s;
              })(n, t),
            }
          );
        })
      : n.map(function (e) {
          return W(W({}, e), {}, { isHighlighted: !1 });
        });
  }
  function tn(e, t) {
    return e.setQueryParameters({
      hierarchicalFacets: t.hierarchicalFacets.reduce(function (e, t) {
        var n = (function (e, t) {
          if (!Array.isArray(e)) return -1;
          for (var n = 0; n < e.length; n++) if (t(e[n])) return n;
          return -1;
        })(e, function (e) {
          return e.name === t.name;
        });
        if (-1 === n) return e.concat(t);
        var r = e.slice();
        return r.splice(n, 1, t), r;
      }, e.hierarchicalFacets),
    });
  }
  function nn() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return t.reduce(function (e, t) {
      var n = (function (e, t) {
        return e.setQueryParameters({
          hierarchicalFacetsRefinements: W(
            W({}, e.hierarchicalFacetsRefinements),
            t.hierarchicalFacetsRefinements
          ),
        });
      })(e, t);
      return (function (e, t) {
        t.facets,
          t.disjunctiveFacets,
          t.facetsRefinements,
          t.facetsExcludes,
          t.disjunctiveFacetsRefinements,
          t.numericRefinements,
          t.tagRefinements,
          t.hierarchicalFacets,
          t.hierarchicalFacetsRefinements,
          t.ruleContexts;
        var n = M(t, [
          "facets",
          "disjunctiveFacets",
          "facetsRefinements",
          "facetsExcludes",
          "disjunctiveFacetsRefinements",
          "numericRefinements",
          "tagRefinements",
          "hierarchicalFacets",
          "hierarchicalFacetsRefinements",
          "ruleContexts",
        ]);
        return e.setQueryParameters(n);
      })(
        (function (e, t) {
          return t.facets.reduce(function (e, t) {
            return e.addFacet(t);
          }, e);
        })(
          (function (e, t) {
            var n = Re(
              [].concat(e.ruleContexts).concat(t.ruleContexts).filter(Boolean)
            );
            return 0 < n.length ? e.setQueryParameters({ ruleContexts: n }) : e;
          })(
            (function (e, t) {
              return t.disjunctiveFacets.reduce(function (e, t) {
                return e.addDisjunctiveFacet(t);
              }, e);
            })(
              (function (e, t) {
                return e.setQueryParameters({
                  facetsRefinements: W(
                    W({}, e.facetsRefinements),
                    t.facetsRefinements
                  ),
                });
              })(
                (function (e, t) {
                  return e.setQueryParameters({
                    facetsExcludes: W(
                      W({}, e.facetsExcludes),
                      t.facetsExcludes
                    ),
                  });
                })(
                  (function (e, t) {
                    return e.setQueryParameters({
                      disjunctiveFacetsRefinements: W(
                        W({}, e.disjunctiveFacetsRefinements),
                        t.disjunctiveFacetsRefinements
                      ),
                    });
                  })(
                    (function (e, t) {
                      return e.setQueryParameters({
                        numericRefinements: W(
                          W({}, e.numericRefinements),
                          t.numericRefinements
                        ),
                      });
                    })(
                      (function (e, t) {
                        return t.tagRefinements.reduce(function (e, t) {
                          return e.addTagRefinement(t);
                        }, e);
                      })(tn(n, t), t),
                      t
                    ),
                    t
                  ),
                  t
                ),
                t
              ),
              t
            ),
            t
          ),
          t
        ),
        t
      );
    });
  }
  function rn(e) {
    return Array.isArray(e) ? e : [e];
  }
  function an() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    var r = t
      .map(function (e) {
        return (function (e) {
          var t = e.name,
            n = e.connector;
          return [
            "https://www.algolia.com/doc/api-reference/widgets/",
            t,
            "/js/",
            void 0 !== n && n ? "#connector" : "",
          ].join("");
        })(e);
      })
      .join(", ");
    return function (e) {
      return [e, "See documentation: ".concat(r)].filter(Boolean).join("\n\n");
    };
  }
  var sn = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/;
  function on(e) {
    return Array.isArray(e)
      ? (function (e) {
          var t = D(e, 1)[0],
            n = D((t = void 0 === t ? [void 0, void 0, void 0, void 0] : t), 4),
            r = n[0],
            i = n[1],
            a = n[2],
            s = n[3];
          if (!(r && i && a && s))
            throw new Error(
              'Invalid value for "insideBoundingBox" parameter: ['.concat(
                e,
                "]"
              )
            );
          return {
            northEast: { lat: r, lng: i },
            southWest: { lat: a, lng: s },
          };
        })(e)
      : (function (e) {
          var t = D(e.split(",").map(parseFloat), 4),
            n = t[0],
            r = t[1],
            i = t[2],
            a = t[3];
          if (!(n && r && i && a))
            throw new Error(
              'Invalid value for "insideBoundingBox" parameter: "'.concat(
                e,
                '"'
              )
            );
          return {
            northEast: { lat: n, lng: r },
            southWest: { lat: i, lng: a },
          };
        })(e);
  }
  function cn(e, n, r) {
    return e.map(function (e, t) {
      return W(W({}, e), {}, { __position: r * n + t + 1 });
    });
  }
  function un(e, t) {
    return t
      ? e.map(function (e) {
          return W(W({}, e), {}, { __queryID: t });
        })
      : e;
  }
  function ln(e) {
    var o = e.instantSearchInstance,
      c = e.helper,
      u = e.attribute,
      l = e.widgetType;
    return function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      var r = t[0],
        i = t[1],
        a = t[2],
        s = void 0 === a ? "Filter Applied" : a;
      1 === t.length && "object" === C(t[0])
        ? o.sendEventToInsights(t[0])
        : "click" !== r ||
          (2 !== t.length && 3 !== t.length) ||
          (function (e, t, n) {
            return e.state.isHierarchicalFacet(t)
              ? e.state.isHierarchicalFacetRefined(t, n)
              : e.state.isConjunctiveFacet(t)
              ? e.state.isFacetRefined(t, n)
              : e.state.isDisjunctiveFacetRefined(t, n);
          })(c, u, i) ||
          o.sendEventToInsights({
            insightsMethod: "clickedFilters",
            widgetType: l,
            eventType: r,
            payload: {
              eventName: s,
              index: c.getIndex(),
              filters: ["".concat(u, ":").concat(i)],
            },
            attribute: u,
          });
    };
  }
  function dn(e) {
    return btoa(encodeURIComponent(JSON.stringify(e)));
  }
  function hn(e) {
    return JSON.parse(decodeURIComponent(atob(e)));
  }
  function fn(e) {
    var n = e.index,
      r = e.widgetType,
      t = (e.methodName, e.args),
      i = e.isSearchStalled;
    if (1 === t.length && "object" === C(t[0])) return [t[0]];
    var a = t[0],
      s = t[1],
      o = t[2];
    if (!s) return [];
    if (("click" === a || "conversion" === a) && !o) return [];
    var c = Array.isArray(s)
      ? (function (e) {
          return e.slice();
        })(s)
      : [s];
    if (0 === c.length) return [];
    var u = c[0].__queryID,
      l = (function (e, t) {
        for (
          var n = 1 < arguments.length && void 0 !== t ? t : 20, r = [], i = 0;
          i < Math.ceil(e.length / n);
          i++
        )
          r.push(e.slice(i * n, (i + 1) * n));
        return r;
      })(c),
      d = l.map(function (e) {
        return e.map(function (e) {
          return e.objectID;
        });
      }),
      h = l.map(function (e) {
        return e.map(function (e) {
          return e.__position;
        });
      });
    return "view" === a
      ? i
        ? []
        : l.map(function (e, t) {
            return {
              insightsMethod: "viewedObjectIDs",
              widgetType: r,
              eventType: a,
              payload: {
                eventName: o || "Hits Viewed",
                index: n,
                objectIDs: d[t],
              },
              hits: e,
            };
          })
      : "click" === a
      ? l.map(function (e, t) {
          return {
            insightsMethod: "clickedObjectIDsAfterSearch",
            widgetType: r,
            eventType: a,
            payload: {
              eventName: o,
              index: n,
              queryID: u,
              objectIDs: d[t],
              positions: h[t],
            },
            hits: e,
          };
        })
      : "conversion" === a
      ? l.map(function (e, t) {
          return {
            insightsMethod: "convertedObjectIDsAfterSearch",
            widgetType: r,
            eventType: a,
            payload: { eventName: o, index: n, queryID: u, objectIDs: d[t] },
            hits: e,
          };
        })
      : [];
  }
  function mn(e) {
    var r = e.instantSearchInstance,
      i = e.index,
      a = e.widgetType;
    return function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      fn({
        widgetType: a,
        index: i,
        methodName: "sendEvent",
        args: t,
        isSearchStalled: r._isSearchStalled,
      }).forEach(function (e) {
        return r.sendEventToInsights(e);
      });
    };
  }
  function pn(e) {
    var i = e.index,
      a = e.widgetType;
    return function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      var r = fn({
        widgetType: a,
        index: i,
        methodName: "bindEvent",
        args: t,
        isSearchStalled: !1,
      });
      return r.length ? "data-insights-event=".concat(dn(r)) : "";
    };
  }
  function gn(r, i) {
    var a = null;
    return function () {
      for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
        n[t] = arguments[t];
      return new Promise(function (e, t) {
        a && clearTimeout(a),
          (a = setTimeout(function () {
            (a = null),
              Promise.resolve(r.apply(void 0, n))
                .then(e)
                .catch(t);
          }, i));
      });
    };
  }
  function vn(e, t) {
    var n,
      r =
        null === (n = e.getWidgetRenderState) || void 0 === n
          ? void 0
          : n.call(e, t),
      i = null;
    if (r && r.widgetParams) {
      var a = r.widgetParams;
      a.attribute
        ? (i = a.attribute)
        : Array.isArray(a.attributes) && (i = a.attributes[0]);
    }
    if ("string" != typeof i)
      throw new Error(
        "Could not find the attribute of the widget:\n\n".concat(
          JSON.stringify(e),
          "\n\nPlease check whether the widget's getWidgetRenderState returns widgetParams.attribute correctly."
        )
      );
    return i;
  }
  function yn(e, t) {
    var n = (
      1 < arguments.length && void 0 !== t ? t : { fallback: function () {} }
    ).fallback;
    return "undefined" == typeof window ? n() : e({ window: window });
  }
  function bn(e) {
    return Array.isArray(e) ? e.filter(Boolean).join(" ") : e || "";
  }
  var Rn = an({ name: "index-widget" });
  function Sn(e) {
    return "ais.index" === e.$$type;
  }
  function wn(e, t) {
    var n = t.state,
      r = t.isPageReset,
      i = t._uiState;
    n !== e.state &&
      ((e.state = n),
      e.emit("change", {
        state: e.state,
        results: e.lastResults,
        isPageReset: r,
        _uiState: i,
      }));
  }
  function _n(e, n, t) {
    var r = 2 < arguments.length && void 0 !== t ? t : {};
    return e.reduce(function (e, t) {
      return Sn(t)
        ? e
        : t.getWidgetUiState || t.getWidgetState
        ? t.getWidgetUiState
          ? t.getWidgetUiState(e, n)
          : t.getWidgetState(e, n)
        : e;
    }, r);
  }
  function Pn(e, t) {
    var n = t.initialSearchParameters,
      r = M(t, ["initialSearchParameters"]);
    return e
      .filter(function (e) {
        return !Sn(e);
      })
      .reduce(function (e, t) {
        return t.getWidgetSearchParameters
          ? t.getWidgetSearchParameters(e, r)
          : e;
      }, n);
  }
  function Nn(e) {
    if (void 0 === e || void 0 === e.indexName)
      throw new Error(Rn("The `indexName` option is required."));
    var l = e.indexName,
      t = e.indexId,
      d = void 0 === t ? l : t,
      h = [],
      f = {},
      m = null,
      p = null,
      g = null,
      v = null;
    return {
      $$type: "ais.index",
      $$widgetType: "ais.index",
      getIndexName: function () {
        return l;
      },
      getIndexId: function () {
        return d;
      },
      getHelper: function () {
        return g;
      },
      getResults: function () {
        return v && v.lastResults;
      },
      getScopedResults: function () {
        var e = this.getParent();
        return (function n(e) {
          return e.filter(Sn).reduce(function (e, t) {
            return e.concat.apply(
              e,
              [
                {
                  indexId: t.getIndexId(),
                  results: t.getResults(),
                  helper: t.getHelper(),
                },
              ].concat(P(n(t.getWidgets())))
            );
          }, []);
        })(e ? e.getWidgets() : [this]);
      },
      getParent: function () {
        return p;
      },
      createURL: function (e) {
        return m._createURL(
          j({}, d, _n(h, { searchParameters: e, helper: g }))
        );
      },
      getWidgets: function () {
        return h;
      },
      addWidgets: function (e) {
        var t = this;
        if (!Array.isArray(e))
          throw new Error(
            Rn("The `addWidgets` method expects an array of widgets.")
          );
        if (
          e.some(function (e) {
            return "function" != typeof e.init && "function" != typeof e.render;
          })
        )
          throw new Error(
            Rn(
              "The widget definition expects a `render` and/or an `init` method."
            )
          );
        return (
          (h = h.concat(e)),
          m &&
            Boolean(e.length) &&
            (wn(g, {
              state: Pn(h, { uiState: f, initialSearchParameters: g.state }),
              _uiState: f,
            }),
            e.forEach(function (e) {
              e.getRenderState &&
                xn({
                  renderState: e.getRenderState(
                    m.renderState[t.getIndexId()] || {},
                    {
                      uiState: m._initialUiState,
                      helper: t.getHelper(),
                      parent: t,
                      instantSearchInstance: m,
                      state: g.state,
                      renderState: m.renderState,
                      templatesConfig: m.templatesConfig,
                      createURL: t.createURL,
                      scopedResults: [],
                      searchMetadata: { isSearchStalled: m._isSearchStalled },
                    }
                  ),
                  instantSearchInstance: m,
                  parent: t,
                });
            }),
            e.forEach(function (e) {
              e.init &&
                e.init({
                  helper: g,
                  parent: t,
                  uiState: m._initialUiState,
                  instantSearchInstance: m,
                  state: g.state,
                  renderState: m.renderState,
                  templatesConfig: m.templatesConfig,
                  createURL: t.createURL,
                  scopedResults: [],
                  searchMetadata: { isSearchStalled: m._isSearchStalled },
                });
            }),
            m.scheduleSearch()),
          this
        );
      },
      removeWidgets: function (t) {
        var n = this;
        if (!Array.isArray(t))
          throw new Error(
            Rn("The `removeWidgets` method expects an array of widgets.")
          );
        if (
          t.some(function (e) {
            return "function" != typeof e.dispose;
          })
        )
          throw new Error(
            Rn("The widget definition expects a `dispose` method.")
          );
        if (
          ((h = h.filter(function (e) {
            return -1 === t.indexOf(e);
          })),
          m && Boolean(t.length))
        ) {
          var e = t.reduce(function (e, t) {
            return t.dispose({ helper: g, state: e, parent: n }) || e;
          }, g.state);
          (f = _n(h, { searchParameters: e, helper: g })),
            g.setState(Pn(h, { uiState: f, initialSearchParameters: e })),
            h.length && m.scheduleSearch();
        }
        return this;
      },
      init: function (e) {
        var t,
          n = this,
          r = e.instantSearchInstance,
          i = e.parent,
          a = e.uiState;
        if (null === g) {
          (m = r), (p = i), (f = a[d] || {});
          var s = r.mainHelper,
            o = Pn(h, {
              uiState: f,
              initialSearchParameters: new pe.SearchParameters({ index: l }),
            });
          ((g = pe({}, o.index, o)).search = function () {
            return r.onStateChange
              ? (r.onStateChange({
                  uiState: r.mainIndex.getWidgetUiState({}),
                  setUiState: r.setUiState.bind(r),
                }),
                s)
              : s.search();
          }),
            (g.searchWithoutTriggeringOnStateChange = function () {
              return s.search();
            }),
            (g.searchForFacetValues = function (e, t, n, r) {
              var i = g.state.setQueryParameters(r);
              return s.searchForFacetValues(e, t, n, i);
            }),
            (v = s.derive(function () {
              return nn.apply(
                void 0,
                P(
                  (function (e) {
                    for (
                      var t = e.getParent(), n = [e.getHelper().state];
                      null !== t;

                    )
                      (n = [t.getHelper().state].concat(n)),
                        (t = t.getParent());
                    return n;
                  })(n)
                )
              );
            }));
          var c =
            null === (t = r._initialResults) || void 0 === t
              ? void 0
              : t[this.getIndexId()];
          if (c) {
            var u = new pe.SearchResults(
              new pe.SearchParameters(c.state),
              c.results
            );
            (v.lastResults = u), (g.lastResults = u);
          }
          g.on("change", function (e) {
            e.isPageReset &&
              !(function n(e) {
                var t = e.filter(Sn);
                0 !== t.length &&
                  t.forEach(function (e) {
                    var t = e.getHelper();
                    wn(t, { state: t.state.resetPage(), isPageReset: !0 }),
                      n(e.getWidgets());
                  });
              })(h);
          }),
            v.on("search", function () {
              r.scheduleStalledRender();
            }),
            v.on("result", function (e) {
              var t = e.results;
              r.scheduleRender(), (g.lastResults = t);
            }),
            h.forEach(function (e) {
              e.getRenderState &&
                xn({
                  renderState: e.getRenderState(
                    r.renderState[n.getIndexId()] || {},
                    {
                      uiState: a,
                      helper: g,
                      parent: n,
                      instantSearchInstance: r,
                      state: g.state,
                      renderState: r.renderState,
                      templatesConfig: r.templatesConfig,
                      createURL: n.createURL,
                      scopedResults: [],
                      searchMetadata: { isSearchStalled: r._isSearchStalled },
                    }
                  ),
                  instantSearchInstance: r,
                  parent: n,
                });
            }),
            h.forEach(function (e) {
              e.init &&
                e.init({
                  uiState: a,
                  helper: g,
                  parent: n,
                  instantSearchInstance: r,
                  state: g.state,
                  renderState: r.renderState,
                  templatesConfig: r.templatesConfig,
                  createURL: n.createURL,
                  scopedResults: [],
                  searchMetadata: { isSearchStalled: r._isSearchStalled },
                });
            }),
            g.on("change", function (e) {
              var t = e.state,
                n = e._uiState;
              (f = _n(h, { searchParameters: t, helper: g }, n || {})),
                r.onStateChange || r.onInternalStateChange();
            }),
            c && r.scheduleRender();
        }
      },
      render: function (e) {
        var t = this,
          n = e.instantSearchInstance;
        this.getResults() &&
          (h.forEach(function (e) {
            e.getRenderState &&
              xn({
                renderState: e.getRenderState(
                  n.renderState[t.getIndexId()] || {},
                  {
                    helper: t.getHelper(),
                    parent: t,
                    instantSearchInstance: n,
                    results: t.getResults(),
                    scopedResults: t.getScopedResults(),
                    state: t.getResults()._state,
                    renderState: n.renderState,
                    templatesConfig: n.templatesConfig,
                    createURL: t.createURL,
                    searchMetadata: { isSearchStalled: n._isSearchStalled },
                  }
                ),
                instantSearchInstance: n,
                parent: t,
              });
          }),
          h.forEach(function (e) {
            e.render &&
              e.render({
                helper: g,
                parent: t,
                instantSearchInstance: n,
                results: t.getResults(),
                scopedResults: t.getScopedResults(),
                state: t.getResults()._state,
                renderState: n.renderState,
                templatesConfig: n.templatesConfig,
                createURL: t.createURL,
                searchMetadata: { isSearchStalled: n._isSearchStalled },
              });
          }));
      },
      dispose: function () {
        var t = this;
        h.forEach(function (e) {
          e.dispose && e.dispose({ helper: g, state: g.state, parent: t });
        }),
          (p = m = null),
          g.removeAllListeners(),
          (g = null),
          v.detach(),
          (v = null);
      },
      getWidgetUiState: function (e) {
        return h.filter(Sn).reduce(function (e, t) {
          return t.getWidgetUiState(e);
        }, W(W({}, e), {}, j({}, this.getIndexId(), f)));
      },
      getWidgetState: function (e) {
        return this.getWidgetUiState(e);
      },
      getWidgetSearchParameters: function (e, t) {
        var n = t.uiState;
        return Pn(h, { uiState: n, initialSearchParameters: e });
      },
      refreshUiState: function () {
        f = _n(
          h,
          {
            searchParameters: this.getHelper().state,
            helper: this.getHelper(),
          },
          f
        );
      },
    };
  }
  function xn(e) {
    var t = e.renderState,
      n = e.instantSearchInstance,
      r = e.parent,
      i = r ? r.getIndexId() : n.mainIndex.getIndexId();
    n.renderState = W(
      W({}, n.renderState),
      {},
      j({}, i, W(W({}, n.renderState[i]), t))
    );
  }
  function In(a) {
    return function () {
      var e =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.descendantName,
        n = e.modifierName,
        r = t ? "-".concat(t) : "",
        i = n ? "--".concat(n) : "";
      return "".concat("ais", "-").concat(a).concat(r).concat(i);
    };
  }
  var Fn = In("Highlight");
  function Tn(e) {
    var t = e.attribute,
      n = e.highlightedTagName,
      r = void 0 === n ? "mark" : n,
      i = e.hit,
      a = e.cssClasses,
      s = void 0 === a ? {} : a,
      o = (Pt(i._highlightResult, t) || {}).value,
      c = void 0 === o ? "" : o,
      u =
        Fn({ descendantName: "highlighted" }) +
        (s.highlighted ? " ".concat(s.highlighted) : "");
    return c
      .replace(
        new RegExp(bt.highlightPreTag, "g"),
        "<".concat(r, ' class="').concat(u, '">')
      )
      .replace(new RegExp(bt.highlightPostTag, "g"), "</".concat(r, ">"));
  }
  var Cn = In("ReverseHighlight");
  function En(e) {
    var t = e.attribute,
      n = e.highlightedTagName,
      r = void 0 === n ? "mark" : n,
      i = e.hit,
      a = e.cssClasses,
      s = void 0 === a ? {} : a,
      o = (Pt(i._highlightResult, t) || {}).value,
      c = void 0 === o ? "" : o,
      u =
        Cn({ descendantName: "highlighted" }) +
        (s.highlighted ? " ".concat(s.highlighted) : "");
    return Gt(en(_t(c)))
      .replace(
        new RegExp(bt.highlightPreTag, "g"),
        "<".concat(r, ' class="').concat(u, '">')
      )
      .replace(new RegExp(bt.highlightPostTag, "g"), "</".concat(r, ">"));
  }
  var kn = In("Snippet");
  function jn(e) {
    var t = e.attribute,
      n = e.highlightedTagName,
      r = void 0 === n ? "mark" : n,
      i = e.hit,
      a = e.cssClasses,
      s = void 0 === a ? {} : a,
      o = (Pt(i._snippetResult, t) || {}).value,
      c = void 0 === o ? "" : o,
      u =
        kn({ descendantName: "highlighted" }) +
        (s.highlighted ? " ".concat(s.highlighted) : "");
    return c
      .replace(
        new RegExp(bt.highlightPreTag, "g"),
        "<".concat(r, ' class="').concat(u, '">')
      )
      .replace(new RegExp(bt.highlightPostTag, "g"), "</".concat(r, ">"));
  }
  var Ln = In("ReverseSnippet");
  function Mn(e) {
    var t = e.attribute,
      n = e.highlightedTagName,
      r = void 0 === n ? "mark" : n,
      i = e.hit,
      a = e.cssClasses,
      s = void 0 === a ? {} : a,
      o = (Pt(i._snippetResult, t) || {}).value,
      c = void 0 === o ? "" : o,
      u =
        Ln({ descendantName: "highlighted" }) +
        (s.highlighted ? " ".concat(s.highlighted) : "");
    return Gt(en(_t(c)))
      .replace(
        new RegExp(bt.highlightPreTag, "g"),
        "<".concat(r, ' class="').concat(u, '">')
      )
      .replace(new RegExp(bt.highlightPostTag, "g"), "</".concat(r, ">"));
  }
  function Hn(e, t) {
    return (function (e) {
      var t,
        n = e.method,
        r = e.payload;
      if ("object" !== C(r))
        throw new Error(
          "The insights helper expects the payload to be an object."
        );
      try {
        t = dn(r);
      } catch (e) {
        throw new Error("Could not JSON serialize the payload object.");
      }
      return 'data-insights-method="'
        .concat(n, '" data-insights-payload="')
        .concat(t, '"');
    })({ method: e, payload: t });
  }
  function On() {
    return (function (e) {
      for (
        var t = "".concat(e, "="), n = document.cookie.split(";"), r = 0;
        r < n.length;
        r++
      ) {
        for (var i = n[r]; " " === i.charAt(0); ) i = i.substring(1);
        if (0 === i.indexOf(t)) return i.substring(t.length, i.length);
      }
    })("_ALGOLIA");
  }
  function An(e, t) {
    return e.toLocaleString(t);
  }
  function Wn(e) {
    e.configure;
    return M(e, ["configure"]);
  }
  function Dn() {
    return {
      stateToRoute: function (n) {
        return Object.keys(n).reduce(function (e, t) {
          return W(W({}, e), {}, j({}, t, Wn(n[t])));
        }, {});
      },
      routeToState: function (e) {
        var n = 0 < arguments.length && void 0 !== e ? e : {};
        return Object.keys(n).reduce(function (e, t) {
          return W(W({}, e), {}, j({}, t, Wn(n[t])));
        }, {});
      },
    };
  }
  function Bn(e, t) {
    for (
      var n = t && t.plainObjects ? Object.create(null) : {}, r = 0;
      r < e.length;
      ++r
    )
      void 0 !== e[r] && (n[r] = e[r]);
    return n;
  }
  function Un(e, t) {
    ir.apply(e, rr(t) ? t : [t]);
  }
  function qn(e, t, n, r, i, a, s, o, c, u, l, d, h, f) {
    var m = e;
    if (
      ("function" == typeof s
        ? (m = s(t, m))
        : m instanceof Date
        ? (m = u(m))
        : "comma" === n &&
          rr(m) &&
          (m = er.maybeMap(m, function (e) {
            return e instanceof Date ? u(e) : e;
          })),
      null === m)
    ) {
      if (r) return a && !h ? a(t, or.encoder, f, "key", l) : t;
      m = "";
    }
    if (
      (function (e) {
        return (
          "string" == typeof e ||
          "number" == typeof e ||
          "boolean" == typeof e ||
          "symbol" == typeof e ||
          "bigint" == typeof e
        );
      })(m) ||
      er.isBuffer(m)
    )
      return a
        ? [
            d(h ? t : a(t, or.encoder, f, "key", l)) +
              "=" +
              d(a(m, or.encoder, f, "value", l)),
          ]
        : [d(t) + "=" + d(String(m))];
    var p,
      g = [];
    if (void 0 === m) return g;
    if ("comma" === n && rr(m))
      p = [{ value: 0 < m.length ? m.join(",") || null : void 0 }];
    else if (rr(s)) p = s;
    else {
      var v = Object.keys(m);
      p = o ? v.sort(o) : v;
    }
    for (var y = 0; y < p.length; ++y) {
      var b = p[y],
        R = "object" == typeof b && void 0 !== b.value ? b.value : m[b];
      if (!i || null !== R) {
        var S = rr(m)
          ? "function" == typeof n
            ? n(t, b)
            : t
          : t + (c ? "." + b : "[" + b + "]");
        Un(g, qn(R, S, n, r, i, a, s, o, c, u, l, d, h, f));
      }
    }
    return g;
  }
  function Qn(e, t) {
    return e && "string" == typeof e && t.comma && -1 < e.indexOf(",")
      ? e.split(",")
      : e;
  }
  function Vn(e, t, n, r) {
    if (e) {
      var i = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
        a = /(\[[^[\]]*])/g,
        s = 0 < n.depth && /(\[[^[\]]*])/.exec(i),
        o = s ? i.slice(0, s.index) : i,
        c = [];
      if (o) {
        if (
          !n.plainObjects &&
          cr.call(Object.prototype, o) &&
          !n.allowPrototypes
        )
          return;
        c.push(o);
      }
      for (
        var u = 0;
        0 < n.depth && null !== (s = a.exec(i)) && u < n.depth;

      ) {
        if (
          ((u += 1),
          !n.plainObjects &&
            cr.call(Object.prototype, s[1].slice(1, -1)) &&
            !n.allowPrototypes)
        )
          return;
        c.push(s[1]);
      }
      return (
        s && c.push("[" + i.slice(s.index) + "]"),
        (function (e, t, n, r) {
          for (var i = r ? t : Qn(t, n), a = e.length - 1; 0 <= a; --a) {
            var s,
              o = e[a];
            if ("[]" === o && n.parseArrays) s = [].concat(i);
            else {
              s = n.plainObjects ? Object.create(null) : {};
              var c =
                  "[" === o.charAt(0) && "]" === o.charAt(o.length - 1)
                    ? o.slice(1, -1)
                    : o,
                u = parseInt(c, 10);
              n.parseArrays || "" !== c
                ? !isNaN(u) &&
                  o !== c &&
                  String(u) === c &&
                  0 <= u &&
                  n.parseArrays &&
                  u <= n.arrayLimit
                  ? ((s = [])[u] = i)
                  : (s[c] = i)
                : (s = { 0: i });
            }
            i = s;
          }
          return i;
        })(c, t, n, r)
      );
    }
  }
  function $n(e) {
    e && (window.document.title = e);
  }
  var Kn = String.prototype.replace,
    zn = /%20/g,
    Jn = "RFC3986",
    Yn = {
      default: Jn,
      formatters: {
        RFC1738: function (e) {
          return Kn.call(e, zn, "+");
        },
        RFC3986: function (e) {
          return String(e);
        },
      },
      RFC1738: "RFC1738",
      RFC3986: Jn,
    },
    Xn = Object.prototype.hasOwnProperty,
    Gn = Array.isArray,
    Zn = (function () {
      for (var e = [], t = 0; t < 256; ++t)
        e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
      return e;
    })(),
    er = {
      arrayToObject: Bn,
      assign: function (e, n) {
        return Object.keys(n).reduce(function (e, t) {
          return (e[t] = n[t]), e;
        }, e);
      },
      combine: function (e, t) {
        return [].concat(e, t);
      },
      compact: function (e) {
        for (
          var t = [{ obj: { o: e }, prop: "o" }], n = [], r = 0;
          r < t.length;
          ++r
        )
          for (
            var i = t[r], a = i.obj[i.prop], s = Object.keys(a), o = 0;
            o < s.length;
            ++o
          ) {
            var c = s[o],
              u = a[c];
            "object" == typeof u &&
              null !== u &&
              -1 === n.indexOf(u) &&
              (t.push({ obj: a, prop: c }), n.push(u));
          }
        return (
          (function (e) {
            for (; 1 < e.length; ) {
              var t = e.pop(),
                n = t.obj[t.prop];
              if (Gn(n)) {
                for (var r = [], i = 0; i < n.length; ++i)
                  void 0 !== n[i] && r.push(n[i]);
                t.obj[t.prop] = r;
              }
            }
          })(t),
          e
        );
      },
      decode: function (e, t, n) {
        var r = e.replace(/\+/g, " ");
        if ("iso-8859-1" === n) return r.replace(/%[0-9a-f]{2}/gi, unescape);
        try {
          return decodeURIComponent(r);
        } catch (e) {
          return r;
        }
      },
      encode: function (e, t, n, r, i) {
        if (0 === e.length) return e;
        var a = e;
        if (
          ("symbol" == typeof e
            ? (a = Symbol.prototype.toString.call(e))
            : "string" != typeof e && (a = String(e)),
          "iso-8859-1" === n)
        )
          return escape(a).replace(/%u[0-9a-f]{4}/gi, function (e) {
            return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
          });
        for (var s = "", o = 0; o < a.length; ++o) {
          var c = a.charCodeAt(o);
          45 === c ||
          46 === c ||
          95 === c ||
          126 === c ||
          (48 <= c && c <= 57) ||
          (65 <= c && c <= 90) ||
          (97 <= c && c <= 122) ||
          (i === Yn.RFC1738 && (40 === c || 41 === c))
            ? (s += a.charAt(o))
            : c < 128
            ? (s += Zn[c])
            : c < 2048
            ? (s += Zn[192 | (c >> 6)] + Zn[128 | (63 & c)])
            : c < 55296 || 57344 <= c
            ? (s +=
                Zn[224 | (c >> 12)] +
                Zn[128 | ((c >> 6) & 63)] +
                Zn[128 | (63 & c)])
            : ((o += 1),
              (c = 65536 + (((1023 & c) << 10) | (1023 & a.charCodeAt(o)))),
              (s +=
                Zn[240 | (c >> 18)] +
                Zn[128 | ((c >> 12) & 63)] +
                Zn[128 | ((c >> 6) & 63)] +
                Zn[128 | (63 & c)]));
        }
        return s;
      },
      isBuffer: function (e) {
        return (
          !(!e || "object" != typeof e) &&
          !!(
            e.constructor &&
            e.constructor.isBuffer &&
            e.constructor.isBuffer(e)
          )
        );
      },
      isRegExp: function (e) {
        return "[object RegExp]" === Object.prototype.toString.call(e);
      },
      maybeMap: function (e, t) {
        if (Gn(e)) {
          for (var n = [], r = 0; r < e.length; r += 1) n.push(t(e[r]));
          return n;
        }
        return t(e);
      },
      merge: function r(i, a, s) {
        if (!a) return i;
        if ("object" != typeof a) {
          if (Gn(i)) i.push(a);
          else {
            if (!i || "object" != typeof i) return [i, a];
            ((s && (s.plainObjects || s.allowPrototypes)) ||
              !Xn.call(Object.prototype, a)) &&
              (i[a] = !0);
          }
          return i;
        }
        if (!i || "object" != typeof i) return [i].concat(a);
        var e = i;
        return (
          Gn(i) && !Gn(a) && (e = Bn(i, s)),
          Gn(i) && Gn(a)
            ? (a.forEach(function (e, t) {
                if (Xn.call(i, t)) {
                  var n = i[t];
                  n && "object" == typeof n && e && "object" == typeof e
                    ? (i[t] = r(n, e, s))
                    : i.push(e);
                } else i[t] = e;
              }),
              i)
            : Object.keys(a).reduce(function (e, t) {
                var n = a[t];
                return Xn.call(e, t) ? (e[t] = r(e[t], n, s)) : (e[t] = n), e;
              }, e)
        );
      },
    },
    tr = Object.prototype.hasOwnProperty,
    nr = {
      brackets: function (e) {
        return e + "[]";
      },
      comma: "comma",
      indices: function (e, t) {
        return e + "[" + t + "]";
      },
      repeat: function (e) {
        return e;
      },
    },
    rr = Array.isArray,
    ir = Array.prototype.push,
    ar = Date.prototype.toISOString,
    sr = Yn.default,
    or = {
      addQueryPrefix: !1,
      allowDots: !1,
      charset: "utf-8",
      charsetSentinel: !1,
      delimiter: "&",
      encode: !0,
      encoder: er.encode,
      encodeValuesOnly: !1,
      format: sr,
      formatter: Yn.formatters[sr],
      indices: !1,
      serializeDate: function (e) {
        return ar.call(e);
      },
      skipNulls: !1,
      strictNullHandling: !1,
    },
    cr = Object.prototype.hasOwnProperty,
    ur = Array.isArray,
    lr = {
      allowDots: !1,
      allowPrototypes: !1,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: !1,
      comma: !1,
      decoder: er.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: !1,
      interpretNumericEntities: !1,
      parameterLimit: 1e3,
      parseArrays: !0,
      plainObjects: !1,
      strictNullHandling: !1,
    },
    dr = {
      formats: Yn,
      parse: function (e, t) {
        var n = (function (e) {
          if (!e) return lr;
          if (
            null !== e.decoder &&
            void 0 !== e.decoder &&
            "function" != typeof e.decoder
          )
            throw new TypeError("Decoder has to be a function.");
          if (
            void 0 !== e.charset &&
            "utf-8" !== e.charset &&
            "iso-8859-1" !== e.charset
          )
            throw new TypeError(
              "The charset option must be either utf-8, iso-8859-1, or undefined"
            );
          var t = void 0 === e.charset ? lr.charset : e.charset;
          return {
            allowDots: void 0 === e.allowDots ? lr.allowDots : !!e.allowDots,
            allowPrototypes:
              "boolean" == typeof e.allowPrototypes
                ? e.allowPrototypes
                : lr.allowPrototypes,
            arrayLimit:
              "number" == typeof e.arrayLimit ? e.arrayLimit : lr.arrayLimit,
            charset: t,
            charsetSentinel:
              "boolean" == typeof e.charsetSentinel
                ? e.charsetSentinel
                : lr.charsetSentinel,
            comma: "boolean" == typeof e.comma ? e.comma : lr.comma,
            decoder: "function" == typeof e.decoder ? e.decoder : lr.decoder,
            delimiter:
              "string" == typeof e.delimiter || er.isRegExp(e.delimiter)
                ? e.delimiter
                : lr.delimiter,
            depth:
              "number" == typeof e.depth || !1 === e.depth
                ? +e.depth
                : lr.depth,
            ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
            interpretNumericEntities:
              "boolean" == typeof e.interpretNumericEntities
                ? e.interpretNumericEntities
                : lr.interpretNumericEntities,
            parameterLimit:
              "number" == typeof e.parameterLimit
                ? e.parameterLimit
                : lr.parameterLimit,
            parseArrays: !1 !== e.parseArrays,
            plainObjects:
              "boolean" == typeof e.plainObjects
                ? e.plainObjects
                : lr.plainObjects,
            strictNullHandling:
              "boolean" == typeof e.strictNullHandling
                ? e.strictNullHandling
                : lr.strictNullHandling,
          };
        })(t);
        if ("" === e || null == e)
          return n.plainObjects ? Object.create(null) : {};
        for (
          var r =
              "string" == typeof e
                ? (function (e, t) {
                    var n,
                      r = {},
                      i = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
                      a =
                        t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
                      s = i.split(t.delimiter, a),
                      o = -1,
                      c = t.charset;
                    if (t.charsetSentinel)
                      for (n = 0; n < s.length; ++n)
                        0 === s[n].indexOf("utf8=") &&
                          ("utf8=%E2%9C%93" === s[n]
                            ? (c = "utf-8")
                            : "utf8=%26%2310003%3B" === s[n] &&
                              (c = "iso-8859-1"),
                          (o = n),
                          (n = s.length));
                    for (n = 0; n < s.length; ++n)
                      if (n !== o) {
                        var u,
                          l,
                          d = s[n],
                          h = d.indexOf("]="),
                          f = -1 === h ? d.indexOf("=") : h + 1;
                        (l =
                          -1 === f
                            ? ((u = t.decoder(d, lr.decoder, c, "key")),
                              t.strictNullHandling ? null : "")
                            : ((u = t.decoder(
                                d.slice(0, f),
                                lr.decoder,
                                c,
                                "key"
                              )),
                              er.maybeMap(Qn(d.slice(f + 1), t), function (e) {
                                return t.decoder(e, lr.decoder, c, "value");
                              }))) &&
                          t.interpretNumericEntities &&
                          "iso-8859-1" === c &&
                          (l = l.replace(/&#(\d+);/g, function (e, t) {
                            return String.fromCharCode(parseInt(t, 10));
                          })),
                          -1 < d.indexOf("[]=") && (l = ur(l) ? [l] : l),
                          cr.call(r, u)
                            ? (r[u] = er.combine(r[u], l))
                            : (r[u] = l);
                      }
                    return r;
                  })(e, n)
                : e,
            i = n.plainObjects ? Object.create(null) : {},
            a = Object.keys(r),
            s = 0;
          s < a.length;
          ++s
        ) {
          var o = a[s],
            c = Vn(o, r[o], n, "string" == typeof e);
          i = er.merge(i, c, n);
        }
        return er.compact(i);
      },
      stringify: function (e, t) {
        var n,
          r = e,
          i = (function (e) {
            if (!e) return or;
            if (
              null !== e.encoder &&
              void 0 !== e.encoder &&
              "function" != typeof e.encoder
            )
              throw new TypeError("Encoder has to be a function.");
            var t = e.charset || or.charset;
            if (
              void 0 !== e.charset &&
              "utf-8" !== e.charset &&
              "iso-8859-1" !== e.charset
            )
              throw new TypeError(
                "The charset option must be either utf-8, iso-8859-1, or undefined"
              );
            var n = Yn.default;
            if (void 0 !== e.format) {
              if (!tr.call(Yn.formatters, e.format))
                throw new TypeError("Unknown format option provided.");
              n = e.format;
            }
            var r = Yn.formatters[n],
              i = or.filter;
            return (
              ("function" != typeof e.filter && !rr(e.filter)) ||
                (i = e.filter),
              {
                addQueryPrefix:
                  "boolean" == typeof e.addQueryPrefix
                    ? e.addQueryPrefix
                    : or.addQueryPrefix,
                allowDots:
                  void 0 === e.allowDots ? or.allowDots : !!e.allowDots,
                charset: t,
                charsetSentinel:
                  "boolean" == typeof e.charsetSentinel
                    ? e.charsetSentinel
                    : or.charsetSentinel,
                delimiter: void 0 === e.delimiter ? or.delimiter : e.delimiter,
                encode: "boolean" == typeof e.encode ? e.encode : or.encode,
                encoder:
                  "function" == typeof e.encoder ? e.encoder : or.encoder,
                encodeValuesOnly:
                  "boolean" == typeof e.encodeValuesOnly
                    ? e.encodeValuesOnly
                    : or.encodeValuesOnly,
                filter: i,
                format: n,
                formatter: r,
                serializeDate:
                  "function" == typeof e.serializeDate
                    ? e.serializeDate
                    : or.serializeDate,
                skipNulls:
                  "boolean" == typeof e.skipNulls ? e.skipNulls : or.skipNulls,
                sort: "function" == typeof e.sort ? e.sort : null,
                strictNullHandling:
                  "boolean" == typeof e.strictNullHandling
                    ? e.strictNullHandling
                    : or.strictNullHandling,
              }
            );
          })(t);
        "function" == typeof i.filter
          ? (r = (0, i.filter)("", r))
          : rr(i.filter) && (n = i.filter);
        var a,
          s = [];
        if ("object" != typeof r || null === r) return "";
        a =
          t && t.arrayFormat in nr
            ? t.arrayFormat
            : t && "indices" in t
            ? t.indices
              ? "indices"
              : "repeat"
            : "indices";
        var o = nr[a];
        (n = n || Object.keys(r)), i.sort && n.sort(i.sort);
        for (var c = 0; c < n.length; ++c) {
          var u = n[c];
          (i.skipNulls && null === r[u]) ||
            Un(
              s,
              qn(
                r[u],
                u,
                o,
                i.strictNullHandling,
                i.skipNulls,
                i.encode ? i.encoder : null,
                i.filter,
                i.sort,
                i.allowDots,
                i.serializeDate,
                i.format,
                i.formatter,
                i.encodeValuesOnly,
                i.charset
              )
            );
        }
        var l = s.join(i.delimiter),
          d = !0 === i.addQueryPrefix ? "?" : "";
        return (
          i.charsetSentinel &&
            ("iso-8859-1" === i.charset
              ? (d += "utf8=%26%2310003%3B&")
              : (d += "utf8=%E2%9C%93&")),
          0 < l.length ? d + l : ""
        );
      },
    },
    hr = (function () {
      function c(e) {
        var r = this,
          t = e.windowTitle,
          n = e.writeDelay,
          i = void 0 === n ? 400 : n,
          a = e.createURL,
          s = e.parseURL,
          o = e.getLocation;
        E(this, c),
          j(this, "windowTitle", void 0),
          j(this, "writeDelay", void 0),
          j(this, "_createURL", void 0),
          j(this, "parseURL", void 0),
          j(this, "getLocation", void 0),
          j(this, "writeTimer", void 0),
          j(this, "inPopState", !1),
          j(this, "isDisposed", !1),
          j(this, "latestAcknowledgedHistory", 0),
          (this.windowTitle = t),
          (this.writeTimer = void 0),
          (this.writeDelay = i),
          (this._createURL = a),
          (this.parseURL = s),
          (this.getLocation = o),
          yn(function (e) {
            var t = e.window,
              n = r.windowTitle && r.windowTitle(r.read());
            $n(n), (r.latestAcknowledgedHistory = t.history.length);
          });
      }
      return (
        k(c, [
          {
            key: "read",
            value: function () {
              return this.parseURL({
                qsModule: dr,
                location: this.getLocation(),
              });
            },
          },
          {
            key: "write",
            value: function (i) {
              var a = this;
              yn(function (e) {
                var t = e.window,
                  n = a.createURL(i),
                  r = a.windowTitle && a.windowTitle(i);
                a.writeTimer && clearTimeout(a.writeTimer),
                  (a.writeTimer = setTimeout(function () {
                    $n(r),
                      a.shouldWrite(n) &&
                        (t.history.pushState(i, r || "", n),
                        (a.latestAcknowledgedHistory = t.history.length)),
                      (a.inPopState = !1),
                      (a.writeTimer = void 0);
                  }, a.writeDelay));
              });
            },
          },
          {
            key: "onUpdate",
            value: function (n) {
              var r = this;
              (this._onPopState = function (e) {
                r.writeTimer &&
                  (clearTimeout(r.writeTimer), (r.writeTimer = void 0)),
                  (r.inPopState = !0);
                var t = e.state;
                n(t || r.read());
              }),
                yn(function (e) {
                  e.window.addEventListener("popstate", r._onPopState);
                });
            },
          },
          {
            key: "createURL",
            value: function (e) {
              return this._createURL({
                qsModule: dr,
                routeState: e,
                location: this.getLocation(),
              });
            },
          },
          {
            key: "dispose",
            value: function () {
              var n = this;
              (this.isDisposed = !0),
                yn(function (e) {
                  var t = e.window;
                  n._onPopState &&
                    t.removeEventListener("popstate", n._onPopState);
                }),
                this.writeTimer && clearTimeout(this.writeTimer),
                this.write({});
            },
          },
          {
            key: "shouldWrite",
            value: function (r) {
              var i = this;
              return yn(function (e) {
                var t = e.window,
                  n = !(
                    i.isDisposed &&
                    i.latestAcknowledgedHistory !== t.history.length
                  );
                return !i.inPopState && n && r !== t.location.href;
              });
            },
          },
        ]),
        c
      );
    })();
  function fr() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      t = e.createURL,
      n =
        void 0 === t
          ? function (e) {
              var t = e.qsModule,
                n = e.routeState,
                r = e.location,
                i = r.protocol,
                a = r.hostname,
                s = r.port,
                o = void 0 === s ? "" : s,
                c = r.pathname,
                u = r.hash,
                l = t.stringify(n),
                d = "" === o ? "" : ":".concat(o);
              return l
                ? ""
                    .concat(i, "//")
                    .concat(a)
                    .concat(d)
                    .concat(c, "?")
                    .concat(l)
                    .concat(u)
                : "".concat(i, "//").concat(a).concat(d).concat(c).concat(u);
            }
          : t,
      r = e.parseURL,
      i =
        void 0 === r
          ? function (e) {
              var t = e.qsModule,
                n = e.location;
              return t.parse(n.search.slice(1), { arrayLimit: 99 });
            }
          : r,
      a = e.writeDelay,
      s = void 0 === a ? 400 : a,
      o = e.windowTitle,
      c = e.getLocation;
    return new hr({
      createURL: n,
      parseURL: i,
      writeDelay: s,
      windowTitle: o,
      getLocation:
        void 0 === c
          ? function () {
              return yn(
                function (e) {
                  return e.window.location;
                },
                {
                  fallback: function () {
                    throw new Error(
                      "You need to provide `getLocation` to the `history` router in environments where `window` does not exist."
                    );
                  },
                }
              );
            }
          : c,
    });
  }
  function mr(e) {
    var t = 0 < arguments.length && void 0 !== e ? e : {},
      n = t.router,
      a = void 0 === n ? fr() : n,
      r = t.stateMapping,
      s = void 0 === r ? Dn() : r;
    return function (e) {
      var r = e.instantSearchInstance;
      r._createURL = function (n) {
        var e = Object.keys(n).reduce(function (e, t) {
            return W(W({}, e), {}, j({}, t, n[t]));
          }, r.mainIndex.getWidgetUiState({})),
          t = s.stateToRoute(e);
        return a.createURL(t);
      };
      var i = void 0,
        t = r._initialUiState;
      return {
        onStateChange: function (e) {
          var t = e.uiState,
            n = s.stateToRoute(t);
          (void 0 !== i && Xt(i, n)) || (a.write(n), (i = n));
        },
        subscribe: function () {
          (r._initialUiState = W(W({}, t), s.routeToState(a.read()))),
            a.onUpdate(function (e) {
              r.setUiState(s.routeToState(e));
            });
        },
        unsubscribe: function () {
          a.dispose();
        },
      };
    };
  }
  function pr() {
    return yn(
      function (e) {
        var t, n;
        return (
          -1 <
          (null === (t = e.window.navigator) || void 0 === t
            ? void 0
            : null === (n = t.userAgent) || void 0 === n
            ? void 0
            : n.indexOf("Algolia Crawler"))
        );
      },
      {
        fallback: function () {
          return !1;
        },
      }
    );
  }
  function gr() {
    return function (e) {
      var t = e.instantSearchInstance,
        n = { widgets: [] },
        r = document.createElement("meta"),
        i = document.querySelector("head");
      return (
        (r.name = "instantsearch:widgets"),
        {
          onStateChange: function () {},
          subscribe: function () {
            setTimeout(function () {
              var e = t.client;
              (n.ua =
                e.transporter && e.transporter.userAgent
                  ? e.transporter.userAgent.value
                  : e._ua),
                (function i(e, a, s) {
                  var t = a.mainIndex,
                    o = {
                      instantSearchInstance: a,
                      parent: t,
                      scopedResults: [],
                      state: t.getHelper().state,
                      helper: t.getHelper(),
                      createURL: t.createURL,
                      uiState: a._initialUiState,
                      renderState: a.renderState,
                      templatesConfig: a.templatesConfig,
                      searchMetadata: { isSearchStalled: a._isSearchStalled },
                    };
                  e.forEach(function (e) {
                    var t = {};
                    if (e.getWidgetRenderState) {
                      var n = e.getWidgetRenderState(o);
                      n && n.widgetParams && (t = n.widgetParams);
                    }
                    var r = Object.keys(t).filter(function (e) {
                      return void 0 !== t[e];
                    });
                    s.widgets.push({
                      type: e.$$type,
                      widgetType: e.$$widgetType,
                      params: r,
                    }),
                      "ais.index" === e.$$type && i(e.getWidgets(), a, s);
                  });
                })(t.mainIndex.getWidgets(), t, n),
                (r.content = JSON.stringify(n)),
                i.appendChild(r);
            }, 0);
          },
          unsubscribe: function () {
            r.remove();
          },
        }
      );
    };
  }
  var vr = an({ name: "instantsearch" });
  function yr() {
    return "#";
  }
  function br(i, e) {
    var h = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(i, Sr()),
      function (a) {
        var e = a || {},
          t = e.includedAttributes,
          s = void 0 === t ? [] : t,
          n = e.excludedAttributes,
          o = void 0 === n ? ["query"] : n,
          r = e.transformItems,
          c =
            void 0 === r
              ? function (e) {
                  return e;
                }
              : r;
        if (a && a.includedAttributes && a.excludedAttributes)
          throw new Error(
            Sr(
              "The options `includedAttributes` and `excludedAttributes` cannot be used together."
            )
          );
        function u() {
          return d.refine();
        }
        function l() {
          return d.createURL();
        }
        var d = {
          refine: Tt,
          createURL: function () {
            return "";
          },
          attributesToClear: [],
        };
        return {
          $$type: "ais.clearRefinements",
          init: function (e) {
            var t = e.instantSearchInstance;
            i(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            i(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          dispose: function () {
            h();
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              { clearRefinements: this.getWidgetRenderState(t) }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.createURL,
              n = e.scopedResults,
              r = e.results;
            (d.attributesToClear = n.reduce(function (e, t) {
              return e.concat(
                (function (e) {
                  var t = e.scopedResult,
                    n = e.includedAttributes,
                    r = e.excludedAttributes,
                    i = e.transformItems,
                    a = e.results,
                    s = -1 !== n.indexOf("query") || -1 === r.indexOf("query");
                  return {
                    helper: t.helper,
                    items: i(
                      Re(
                        Vt(t.results, t.helper.state, s)
                          .map(function (e) {
                            return e.attribute;
                          })
                          .filter(function (e) {
                            return 0 === n.length || -1 !== n.indexOf(e);
                          })
                          .filter(function (e) {
                            return ("query" === e && s) || -1 === r.indexOf(e);
                          })
                      ),
                      { results: a }
                    ),
                  };
                })({
                  scopedResult: t,
                  includedAttributes: s,
                  excludedAttributes: o,
                  transformItems: c,
                  results: r,
                })
              );
            }, [])),
              (d.refine = function () {
                d.attributesToClear.forEach(function (e) {
                  var t = e.helper,
                    n = e.items;
                  t.setState($t({ helper: t, attributesToClear: n })).search();
                });
              }),
              (d.createURL = function () {
                return t(
                  nn.apply(
                    void 0,
                    P(
                      d.attributesToClear.map(function (e) {
                        return $t({
                          helper: e.helper,
                          attributesToClear: e.items,
                        });
                      })
                    )
                  )
                );
              });
            var i = d.attributesToClear.some(function (e) {
              return 0 < e.items.length;
            });
            return {
              canRefine: i,
              hasRefinements: i,
              refine: u,
              createURL: l,
              widgetParams: a,
            };
          },
        };
      }
    );
  }
  var Rr = (function () {
      L(R, G);
      var b = O(R);
      function R(e) {
        var n;
        E(this, R),
          j(H((n = b.call(this))), "client", void 0),
          j(H(n), "indexName", void 0),
          j(H(n), "insightsClient", void 0),
          j(H(n), "onStateChange", null),
          j(H(n), "helper", void 0),
          j(H(n), "mainHelper", void 0),
          j(H(n), "mainIndex", void 0),
          j(H(n), "started", void 0),
          j(H(n), "templatesConfig", void 0),
          j(H(n), "renderState", {}),
          j(H(n), "_stalledSearchDelay", void 0),
          j(H(n), "_searchStalledTimer", void 0),
          j(H(n), "_isSearchStalled", void 0),
          j(H(n), "_initialUiState", void 0),
          j(H(n), "_initialResults", void 0),
          j(H(n), "_createURL", void 0),
          j(H(n), "_searchFunction", void 0),
          j(H(n), "_mainHelperSearch", void 0),
          j(H(n), "middleware", []),
          j(H(n), "sendEventToInsights", void 0),
          j(
            H(n),
            "scheduleSearch",
            ge(function () {
              n.started && n.mainHelper.search();
            })
          ),
          j(
            H(n),
            "scheduleRender",
            ge(function () {
              n.mainHelper.hasPendingRequests() ||
                (clearTimeout(n._searchStalledTimer),
                (n._searchStalledTimer = null),
                (n._isSearchStalled = !1)),
                n.mainIndex.render({ instantSearchInstance: H(n) }),
                n.emit("render");
            })
          ),
          j(
            H(n),
            "onInternalStateChange",
            ge(function () {
              var t = n.mainIndex.getWidgetUiState({});
              n.middleware.forEach(function (e) {
                e.instance.onStateChange({ uiState: t });
              });
            })
          );
        var t = e.indexName,
          r = void 0 === t ? null : t,
          i = e.numberLocale,
          a = e.initialUiState,
          s = void 0 === a ? {} : a,
          o = e.routing,
          c = void 0 === o ? null : o,
          u = e.searchFunction,
          l = e.stalledSearchDelay,
          d = void 0 === l ? 200 : l,
          h = e.searchClient,
          f = void 0 === h ? null : h,
          m = e.insightsClient,
          p = void 0 === m ? null : m,
          g = e.onStateChange,
          v = void 0 === g ? null : g;
        if (null === r)
          throw new Error(vr("The `indexName` option is required."));
        if (null === f)
          throw new Error(vr("The `searchClient` option is required."));
        if ("function" != typeof f.search)
          throw new Error(
            "The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/"
          );
        if (
          ("function" == typeof f.addAlgoliaAgent &&
            f.addAlgoliaAgent("instantsearch.js (".concat("4.46.0", ")")),
          p && "function" != typeof p)
        )
          throw new Error(
            vr("The `insightsClient` option should be a function.")
          );
        if (
          ((n.client = f),
          (n.insightsClient = p),
          (n.indexName = r),
          (n.helper = null),
          (n.mainHelper = null),
          (n.mainIndex = Nn({ indexName: r })),
          (n.onStateChange = v),
          (n.started = !1),
          (n.templatesConfig = {
            helpers: (function (e) {
              var n = e.numberLocale;
              return {
                formatNumber: function (e, t) {
                  return An(Number(t(e)), n);
                },
                highlight: function (e, t) {
                  try {
                    return t(Tn(W(W({}, JSON.parse(e)), {}, { hit: this })));
                  } catch (e) {
                    throw new Error(
                      '\nThe highlight helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }'
                    );
                  }
                },
                reverseHighlight: function (e, t) {
                  try {
                    return t(En(W(W({}, JSON.parse(e)), {}, { hit: this })));
                  } catch (e) {
                    throw new Error(
                      '\n  The reverseHighlight helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }'
                    );
                  }
                },
                snippet: function (e, t) {
                  try {
                    return t(jn(W(W({}, JSON.parse(e)), {}, { hit: this })));
                  } catch (e) {
                    throw new Error(
                      '\nThe snippet helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }'
                    );
                  }
                },
                reverseSnippet: function (e, t) {
                  try {
                    return t(Mn(W(W({}, JSON.parse(e)), {}, { hit: this })));
                  } catch (e) {
                    throw new Error(
                      '\n  The reverseSnippet helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }'
                    );
                  }
                },
                insights: function (e, t) {
                  try {
                    var n = JSON.parse(e),
                      r = n.method,
                      i = n.payload;
                    return t(Hn(r, W({ objectIDs: [this.objectID] }, i)));
                  } catch (e) {
                    throw new Error(
                      '\nThe insights helper expects a JSON object of the format:\n{ "method": "method-name", "payload": { "eventName": "name of the event" } }'
                    );
                  }
                },
              };
            })({ numberLocale: i }),
            compileOptions: {},
          }),
          (n._stalledSearchDelay = d),
          (n._searchStalledTimer = null),
          (n._isSearchStalled = !1),
          (n._createURL = yr),
          (n._initialUiState = s),
          (n._initialResults = null),
          u && (n._searchFunction = u),
          (n.sendEventToInsights = Tt),
          c)
        ) {
          var y = "boolean" == typeof c ? void 0 : c;
          n.use(mr(y));
        }
        return pr() && n.use(gr()), n;
      }
      return (
        k(R, [
          {
            key: "use",
            value: function () {
              for (
                var n = this, e = arguments.length, t = new Array(e), r = 0;
                r < e;
                r++
              )
                t[r] = arguments[r];
              var i = t.map(function (e) {
                var t = W(
                  { subscribe: Tt, unsubscribe: Tt, onStateChange: Tt },
                  e({ instantSearchInstance: n })
                );
                return n.middleware.push({ creator: e, instance: t }), t;
              });
              return (
                this.started &&
                  i.forEach(function (e) {
                    e.subscribe();
                  }),
                this
              );
            },
          },
          {
            key: "unuse",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return (
                this.middleware
                  .filter(function (e) {
                    return t.includes(e.creator);
                  })
                  .forEach(function (e) {
                    return e.instance.unsubscribe();
                  }),
                (this.middleware = this.middleware.filter(function (e) {
                  return !t.includes(e.creator);
                })),
                this
              );
            },
          },
          {
            key: "EXPERIMENTAL_use",
            value: function () {
              return this.use.apply(this, arguments);
            },
          },
          {
            key: "addWidget",
            value: function (e) {
              return this.addWidgets([e]);
            },
          },
          {
            key: "addWidgets",
            value: function (e) {
              if (!Array.isArray(e))
                throw new Error(
                  vr(
                    "The `addWidgets` method expects an array of widgets. Please use `addWidget`."
                  )
                );
              if (
                e.some(function (e) {
                  return (
                    "function" != typeof e.init && "function" != typeof e.render
                  );
                })
              )
                throw new Error(
                  vr(
                    "The widget definition expects a `render` and/or an `init` method."
                  )
                );
              return this.mainIndex.addWidgets(e), this;
            },
          },
          {
            key: "removeWidget",
            value: function (e) {
              return this.removeWidgets([e]);
            },
          },
          {
            key: "removeWidgets",
            value: function (e) {
              if (!Array.isArray(e))
                throw new Error(
                  vr(
                    "The `removeWidgets` method expects an array of widgets. Please use `removeWidget`."
                  )
                );
              if (
                e.some(function (e) {
                  return "function" != typeof e.dispose;
                })
              )
                throw new Error(
                  vr("The widget definition expects a `dispose` method.")
                );
              return this.mainIndex.removeWidgets(e), this;
            },
          },
          {
            key: "start",
            value: function () {
              var r = this;
              if (this.started)
                throw new Error(
                  vr("The `start` method has already been called once.")
                );
              var t = this.mainHelper || pe(this.client, this.indexName);
              if (
                ((t.search = function () {
                  return t.searchOnlyWithDerivedHelpers();
                }),
                this._searchFunction)
              ) {
                var i = {
                  search: function () {
                    return new Promise(Tt);
                  },
                };
                (this._mainHelperSearch = t.search.bind(t)),
                  (t.search = function () {
                    var n = r.mainIndex.getHelper(),
                      e = pe(i, n.state.index, n.state);
                    return (
                      e.once("search", function (e) {
                        var t = e.state;
                        n.overrideStateWithoutTriggeringChangeEvent(t),
                          r._mainHelperSearch();
                      }),
                      e.on("change", function (e) {
                        var t = e.state;
                        n.setState(t);
                      }),
                      r._searchFunction(e),
                      t
                    );
                  });
              }
              if (
                (t.on("error", function (e) {
                  var t = e.error;
                  if (!(t instanceof Error)) {
                    var n = t;
                    t = Object.keys(n).reduce(function (e, t) {
                      return (e[t] = n[t]), e;
                    }, new Error(n.message));
                  }
                  (t.error = t), r.emit("error", t);
                }),
                (this.mainHelper = t),
                this.middleware.forEach(function (e) {
                  e.instance.subscribe();
                }),
                this.mainIndex.init({
                  instantSearchInstance: this,
                  parent: null,
                  uiState: this._initialUiState,
                }),
                this._initialResults)
              ) {
                var e = this.scheduleSearch;
                (this.scheduleSearch = ge(Tt)),
                  ge(function () {
                    r.scheduleSearch = e;
                  })();
              } else
                0 < this.mainIndex.getWidgets().length && this.scheduleSearch();
              (this.helper = this.mainIndex.getHelper()), (this.started = !0);
            },
          },
          {
            key: "dispose",
            value: function () {
              this.scheduleSearch.cancel(),
                this.scheduleRender.cancel(),
                clearTimeout(this._searchStalledTimer),
                this.removeWidgets(this.mainIndex.getWidgets()),
                this.mainIndex.dispose(),
                (this.started = !1),
                this.removeAllListeners(),
                this.mainHelper.removeAllListeners(),
                (this.mainHelper = null),
                (this.helper = null),
                this.middleware.forEach(function (e) {
                  e.instance.unsubscribe();
                });
            },
          },
          {
            key: "scheduleStalledRender",
            value: function () {
              var e = this;
              this._searchStalledTimer ||
                (this._searchStalledTimer = setTimeout(function () {
                  (e._isSearchStalled = !0), e.scheduleRender();
                }, this._stalledSearchDelay));
            },
          },
          {
            key: "setUiState",
            value: function (e) {
              if (!this.mainHelper)
                throw new Error(
                  vr(
                    "The `start` method needs to be called before `setUiState`."
                  )
                );
              this.mainIndex.refreshUiState();
              var r =
                "function" == typeof e
                  ? e(this.mainIndex.getWidgetUiState({}))
                  : e;
              !(function e(t) {
                var n = r[t.getIndexId()] || {};
                t.getHelper().setState(
                  t.getWidgetSearchParameters(t.getHelper().state, {
                    uiState: n,
                  })
                ),
                  t.getWidgets().filter(Sn).forEach(e);
              })(this.mainIndex),
                this.scheduleSearch(),
                this.onInternalStateChange();
            },
          },
          {
            key: "getUiState",
            value: function () {
              return (
                this.started && this.mainIndex.refreshUiState(),
                this.mainIndex.getWidgetUiState({})
              );
            },
          },
          {
            key: "createURL",
            value: function (e) {
              var t = 0 < arguments.length && void 0 !== e ? e : {};
              if (!this.started)
                throw new Error(
                  vr(
                    "The `start` method needs to be called before `createURL`."
                  )
                );
              return this._createURL(t);
            },
          },
          {
            key: "refresh",
            value: function () {
              if (!this.mainHelper)
                throw new Error(
                  vr("The `start` method needs to be called before `refresh`.")
                );
              this.mainHelper.clearCache().search();
            },
          },
        ]),
        R
      );
    })(),
    Sr = an({ name: "clear-refinements", connector: !0 });
  function wr(r, e) {
    var i = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(r, _r()),
      function (s) {
        if ((s || {}).includedAttributes && (s || {}).excludedAttributes)
          throw new Error(
            _r(
              "The options `includedAttributes` and `excludedAttributes` cannot be used together."
            )
          );
        var e = s || {},
          o = e.includedAttributes,
          t = e.excludedAttributes,
          c = void 0 === t ? ["query"] : t,
          n = e.transformItems,
          u =
            void 0 === n
              ? function (e) {
                  return e;
                }
              : n;
        return {
          $$type: "ais.currentRefinements",
          init: function (e) {
            var t = e.instantSearchInstance;
            r(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            r(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          dispose: function () {
            i();
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              { currentRefinements: this.getWidgetRenderState(t) }
            );
          },
          getWidgetRenderState: function (e) {
            var n = e.results,
              t = e.scopedResults,
              r = e.createURL,
              i = e.helper;
            var a = n
              ? t.reduce(function (e, t) {
                  return e.concat(
                    u(
                      Pr({
                        results: t.results,
                        helper: t.helper,
                        includedAttributes: o,
                        excludedAttributes: c,
                      }),
                      { results: n }
                    )
                  );
                }, [])
              : u(
                  Pr({
                    results: {},
                    helper: i,
                    includedAttributes: o,
                    excludedAttributes: c,
                  }),
                  { results: n }
                );
            return {
              items: a,
              canRefine: 0 < a.length,
              refine: function (e) {
                return xr(i, e);
              },
              createURL: function (e) {
                return r(Nr(i.state, e));
              },
              widgetParams: s,
            };
          },
        };
      }
    );
  }
  var _r = an({ name: "current-refinements", connector: !0 });
  function Pr(e) {
    var t = e.results,
      n = e.helper,
      r = e.includedAttributes,
      i = e.excludedAttributes,
      a =
        -1 !== (r || []).indexOf("query") || -1 === (i || []).indexOf("query"),
      s = r
        ? function (e) {
            return -1 !== r.indexOf(e.attribute);
          }
        : function (e) {
            return -1 === i.indexOf(e.attribute);
          },
      o = Vt(t, n.state, a).map(Ir).filter(s);
    return o.reduce(function (e, t) {
      return [].concat(
        P(
          e.filter(function (e) {
            return e.attribute !== t.attribute;
          })
        ),
        [
          {
            indexName: n.state.index,
            attribute: t.attribute,
            label: t.attribute,
            refinements: o
              .filter(function (e) {
                return e.attribute === t.attribute;
              })
              .sort(function (e, t) {
                return "numeric" === e.type ? e.value - t.value : 0;
              }),
            refine: function (e) {
              return xr(n, e);
            },
          },
        ]
      );
    }, []);
  }
  function Nr(e, t) {
    switch (t.type) {
      case "facet":
        return e.removeFacetRefinement(t.attribute, String(t.value));
      case "disjunctive":
        return e.removeDisjunctiveFacetRefinement(t.attribute, String(t.value));
      case "hierarchical":
        return e.removeHierarchicalFacetRefinement(t.attribute);
      case "exclude":
        return e.removeExcludeRefinement(t.attribute, String(t.value));
      case "numeric":
        return e.removeNumericRefinement(
          t.attribute,
          t.operator,
          String(t.value)
        );
      case "tag":
        return e.removeTagRefinement(String(t.value));
      case "query":
        return e.setQueryParameter("query", "");
      default:
        return e;
    }
  }
  function xr(e, t) {
    e.setState(Nr(e.state, t)).search();
  }
  function Ir(e) {
    var t = (function (e) {
        if ("numeric" === e.type) return Number(e.name);
        if ("escapedValue" in e) return e.escapedValue;
        return e.name;
      })(e),
      n = e.operator
        ? ""
            .concat(
              (function (e) {
                switch (e) {
                  case ">=":
                    return "≥";
                  case "<=":
                    return "≤";
                  default:
                    return e;
                }
              })(e.operator),
              " "
            )
            .concat(e.name)
        : e.name,
      r = { attribute: e.attribute, type: e.type, value: t, label: n };
    return (
      void 0 !== e.operator && (r.operator = e.operator),
      void 0 !== e.count && (r.count = e.count),
      void 0 !== e.exhaustive && (r.exhaustive = e.exhaustive),
      r
    );
  }
  function Fr(x, e) {
    var I = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(x, Er()),
      function (d) {
        var e = d || {},
          c = e.attributes,
          t = e.separator,
          u = void 0 === t ? " > " : t,
          n = e.rootPath,
          l = void 0 === n ? null : n,
          r = e.showParentLevel,
          h = void 0 === r || r,
          i = e.limit,
          f = void 0 === i ? 10 : i,
          a = e.showMore,
          m = void 0 !== a && a,
          s = e.showMoreLimit,
          p = void 0 === s ? 20 : s,
          o = e.sortBy,
          g = void 0 === o ? kr : o,
          v = e.transformItems,
          y =
            void 0 === v
              ? function (e) {
                  return e;
                }
              : v;
        if (!c || !Array.isArray(c) || 0 === c.length)
          throw new Error(
            Er("The `attributes` option expects an array of strings.")
          );
        if (!0 === m && p <= f)
          throw new Error(
            Er("The `showMoreLimit` option must be greater than `limit`.")
          );
        var b,
          R,
          S = D(c, 1)[0],
          w = function () {};
        function _() {
          w();
        }
        var P = !1;
        function N() {
          return P ? p : f;
        }
        return {
          $$type: "ais.hierarchicalMenu",
          init: function (e) {
            var t = e.instantSearchInstance;
            x(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            (w = (function (e, t) {
              return function () {
                (P = !P), t.render(e);
              };
            })(e, this)),
              x(
                W(
                  W({}, this.getWidgetRenderState(e)),
                  {},
                  { instantSearchInstance: t }
                ),
                !1
              );
          },
          dispose: function (e) {
            var t = e.state;
            return (
              I(),
              t
                .removeHierarchicalFacet(S)
                .setQueryParameter("maxValuesPerFacet", void 0)
            );
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              {
                hierarchicalMenu: W(
                  W({}, e.hierarchicalMenu),
                  {},
                  j({}, S, this.getWidgetRenderState(t))
                ),
              }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.results,
              n = e.state,
              r = e.createURL,
              i = e.instantSearchInstance,
              a = e.helper,
              s = [],
              o = !1;
            if (
              ((b =
                b ||
                ln({
                  instantSearchInstance: i,
                  helper: a,
                  attribute: S,
                  widgetType: this.$$type,
                })),
              (R =
                R ||
                function (e) {
                  b("click", e), a.toggleFacetRefinement(S, e).search();
                }),
              t)
            ) {
              var c = t.getFacetValues(S, {
                  sortBy: g,
                  facetOrdering: g === kr,
                }),
                u = c && !Array.isArray(c) && c.data ? c.data : [],
                l =
                  (n.maxValuesPerFacet || 0) > N()
                    ? u.length <= N()
                    : u.length < N();
              (o = m && (P || !l)),
                (s = y(
                  (function a(e) {
                    return e.slice(0, N()).map(function (e) {
                      var t = e.name,
                        n = e.escapedValue,
                        r = e.data,
                        i =
                          (e.path,
                          W(
                            W(
                              {},
                              M(e, ["name", "escapedValue", "data", "path"])
                            ),
                            {},
                            { value: n, label: t, data: null }
                          ));
                      return Array.isArray(r) && (i.data = a(r)), i;
                    });
                  })(u),
                  { results: t }
                ));
            }
            return {
              items: s,
              refine: R,
              canRefine: 0 < s.length,
              createURL: function (e) {
                return r(n.resetPage().toggleFacetRefinement(S, e));
              },
              sendEvent: b,
              widgetParams: d,
              isShowingMore: P,
              toggleShowMore: _,
              canToggleShowMore: o,
            };
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters.getHierarchicalFacetBreadcrumb(S);
            return n.length
              ? W(
                  W({}, e),
                  {},
                  {
                    hierarchicalMenu: W(
                      W({}, e.hierarchicalMenu),
                      {},
                      j({}, S, n)
                    ),
                  }
                )
              : e;
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState,
              r = n.hierarchicalMenu && n.hierarchicalMenu[S];
            if (e.isHierarchicalFacet(S)) e.getHierarchicalFacetByName(S);
            var i = e.removeHierarchicalFacet(S).addHierarchicalFacet({
                name: S,
                attributes: c,
                separator: u,
                rootPath: l,
                showParentLevel: h,
              }),
              a = i.maxValuesPerFacet || 0,
              s = Math.max(a, m ? p : f),
              o = i.setQueryParameter("maxValuesPerFacet", s);
            return r
              ? o.addHierarchicalFacetRefinement(S, r.join(u))
              : o.setQueryParameters({
                  hierarchicalFacetsRefinements: W(
                    W({}, o.hierarchicalFacetsRefinements),
                    {},
                    j({}, S, [])
                  ),
                });
          },
        };
      }
    );
  }
  function Tr(r, e) {
    var i = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(r, jr()),
      function (a) {
        var s,
          o,
          e = a || {},
          t = e.escapeHTML,
          c = void 0 === t || t,
          n = e.transformItems,
          u =
            void 0 === n
              ? function (e) {
                  return e;
                }
              : n;
        return {
          $$type: "ais.hits",
          init: function (e) {
            r(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: e.instantSearchInstance }
              ),
              !0
            );
          },
          render: function (e) {
            var t = this.getWidgetRenderState(e);
            r(
              W(
                W({}, t),
                {},
                { instantSearchInstance: e.instantSearchInstance }
              ),
              !1
            ),
              t.sendEvent("view", t.hits);
          },
          getRenderState: function (e, t) {
            return W(W({}, e), {}, { hits: this.getWidgetRenderState(t) });
          },
          getWidgetRenderState: function (e) {
            var t = e.results,
              n = e.helper,
              r = e.instantSearchInstance;
            if (
              ((s =
                s ||
                mn({
                  instantSearchInstance: r,
                  index: n.getIndex(),
                  widgetType: this.$$type,
                })),
              (o = o || pn({ index: n.getIndex(), widgetType: this.$$type })),
              !t)
            )
              return {
                hits: [],
                results: void 0,
                sendEvent: s,
                bindEvent: o,
                widgetParams: a,
              };
            c && 0 < t.hits.length && (t.hits = wt(t.hits));
            var i = un(cn(t.hits, t.page, t.hitsPerPage), t.queryID);
            return {
              hits: u(i, { results: t }),
              results: t,
              sendEvent: s,
              bindEvent: o,
              widgetParams: a,
            };
          },
          dispose: function (e) {
            var t = e.state;
            return (
              i(),
              c
                ? t.setQueryParameters(
                    Object.keys(yt).reduce(function (e, t) {
                      return W(W({}, e), {}, j({}, t, void 0));
                    }, {})
                  )
                : t
            );
          },
          getWidgetSearchParameters: function (e) {
            return c ? e.setQueryParameters(yt) : e;
          },
        };
      }
    );
  }
  function Cr(e) {
    var t = e.method,
      n = e.results,
      r = e.hits,
      i = e.objectIDs,
      a = n.index,
      s = (function (n, e) {
        return e.map(function (t) {
          var e = Ut(n, function (e) {
            return e.objectID === t;
          });
          if (void 0 === e)
            throw new Error(
              'Could not find objectID "'.concat(
                t,
                '" passed to `clickedObjectIDsAfterSearch` in the returned hits. This is necessary to infer the absolute position and the query ID.'
              )
            );
          return e;
        });
      })(r, i),
      o = (function (e) {
        var t = Re(
          e.map(function (e) {
            return e.__queryID;
          })
        );
        if (1 < t.length)
          throw new Error(
            "Insights currently allows a single `queryID`. The `objectIDs` provided map to multiple `queryID`s."
          );
        var n = t[0];
        if ("string" != typeof n)
          throw new Error(
            "Could not infer `queryID`. Ensure InstantSearch `clickAnalytics: true` was added with the Configure widget.\n\nSee: https://alg.li/lNiZZ7"
          );
        return n;
      })(s);
    switch (t) {
      case "clickedObjectIDsAfterSearch":
        return {
          index: a,
          queryID: o,
          objectIDs: i,
          positions: (function (e) {
            return e.map(function (e) {
              return e.__position;
            });
          })(s),
        };
      case "convertedObjectIDsAfterSearch":
        return { index: a, queryID: o, objectIDs: i };
      default:
        throw new Error(
          'Unsupported method passed to insights: "'.concat(t, '".')
        );
    }
  }
  var Er = an({ name: "hierarchical-menu", connector: !0 }),
    kr = ["name:asc"],
    jr = an({ name: "hits", connector: !0 });
  function Lr(t) {
    return function (s, e) {
      return t(function (e, t) {
        var n = e.results,
          r = e.hits,
          i = e.instantSearchInstance;
        if (n && r && i) {
          var a = (function (o, c, u) {
            return function (e) {
              for (
                var t = arguments.length,
                  n = new Array(1 < t ? t - 1 : 0),
                  r = 1;
                r < t;
                r++
              )
                n[r - 1] = arguments[r];
              var i = n[0];
              if (!o) {
                var a = an({ name: "instantsearch" });
                throw new Error(
                  a(
                    "The `insightsClient` option has not been provided to `instantsearch`."
                  )
                );
              }
              if (!Array.isArray(i.objectIDs))
                throw new TypeError("Expected `objectIDs` to be an array.");
              var s = Cr({
                method: e,
                results: c,
                hits: u,
                objectIDs: i.objectIDs,
              });
              o(e, W(W({}, s), i));
            };
          })(i.insightsClient, n, r);
          return s(W(W({}, e), {}, { insights: a }), t);
        }
        return s(e, t);
      }, e);
    };
  }
  function Mr(e, t, n) {
    for (var r = e; r && !n(r); ) {
      if (r === t) return null;
      r = r.parentElement;
    }
    return r;
  }
  function Hr(e) {
    return function (s) {
      return He(
        "div",
        {
          onClick: function (e) {
            if (s.sendEvent) {
              var t = Mr(e.target, e.currentTarget, function (e) {
                return e.hasAttribute("data-insights-event");
              });
              if (t)
                (function (e) {
                  var t = e.getAttribute("data-insights-event");
                  if ("string" != typeof t)
                    throw new Error(
                      "The insights middleware expects `data-insights-event` to be a base64-encoded JSON string."
                    );
                  try {
                    return hn(t);
                  } catch (e) {
                    throw new Error(
                      "The insights middleware was unable to parse `data-insights-event`."
                    );
                  }
                })(t).forEach(function (e) {
                  return s.sendEvent(e);
                });
            }
            var n = Mr(e.target, e.currentTarget, function (e) {
              return (function (e) {
                return e.hasAttribute("data-insights-method");
              })(e);
            });
            if (n) {
              var r = (function (e) {
                  var t = e.getAttribute("data-insights-method"),
                    n = e.getAttribute("data-insights-payload");
                  if ("string" != typeof n)
                    throw new Error(
                      "The insights helper expects `data-insights-payload` to be a base64-encoded JSON string."
                    );
                  try {
                    return { method: t, payload: hn(n) };
                  } catch (e) {
                    throw new Error(
                      "The insights helper was unable to parse `data-insights-payload`."
                    );
                  }
                })(n),
                i = r.method,
                a = r.payload;
              s.insights(i, a);
            }
          },
        },
        He(e, s)
      );
    };
  }
  function Or(a, e) {
    var d = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(a, Wr()),
      function (s) {
        var e = s || {},
          t = e.items,
          n = e.transformItems,
          o =
            void 0 === n
              ? function (e) {
                  return e;
                }
              : n;
        if (!Array.isArray(t))
          throw new Error(
            Wr("The `items` option expects an array of objects.")
          );
        var c = t,
          r = c.filter(function (e) {
            return !0 === e.default;
          });
        if (0 === r.length)
          throw new Error(Wr("A default value must be specified in `items`."));
        if (1 < r.length)
          throw new Error(
            Wr("More than one default value is specified in `items`.")
          );
        var i = r[0],
          u = function (t) {
            return function (e) {
              return e || 0 === e
                ? t.setQueryParameter("hitsPerPage", e).search()
                : t.setQueryParameter("hitsPerPage", void 0).search();
            };
          },
          l = function (e) {
            var t = e.state,
              n = e.createURL;
            return function (e) {
              return n(
                t
                  .resetPage()
                  .setQueryParameter("hitsPerPage", e || 0 === e ? e : void 0)
              );
            };
          };
        return {
          $$type: "ais.hitsPerPage",
          init: function (e) {
            var t = e.state,
              n = e.instantSearchInstance;
            c.some(function (e) {
              return Number(t.hitsPerPage) === Number(e.value);
            }) || (c = [{ value: "", label: "" }].concat(P(c))),
              a(
                W(
                  W({}, this.getWidgetRenderState(e)),
                  {},
                  { instantSearchInstance: n }
                ),
                !0
              );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            a(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          dispose: function (e) {
            var t = e.state;
            return d(), t.setQueryParameter("hitsPerPage", void 0);
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              { hitsPerPage: this.getWidgetRenderState(t) }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.state,
              n = e.results,
              r = e.createURL,
              i = e.helper,
              a = !!n && 0 < n.nbHits;
            return {
              items: o(
                (function (e) {
                  var t = e.hitsPerPage;
                  return c.map(function (e) {
                    return W(
                      W({}, e),
                      {},
                      { isRefined: Number(e.value) === Number(t) }
                    );
                  });
                })(t),
                { results: n }
              ),
              refine: u(i),
              createURL: l({ state: t, createURL: r }),
              hasNoResults: !a,
              canRefine: a,
              widgetParams: s,
            };
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters.hitsPerPage;
            return void 0 === n || n === i.value
              ? e
              : W(W({}, e), {}, { hitsPerPage: n });
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState;
            return e.setQueryParameters({
              hitsPerPage: n.hitsPerPage || i.value,
            });
          },
        };
      }
    );
  }
  var Ar = Lr(Tr),
    Wr = an({ name: "hits-per-page", connector: !0 }),
    Dr = an({ name: "infinite-hits", connector: !0 });
  function Br(e) {
    var t = e || {};
    t.page;
    return M(t, ["page"]);
  }
  function Ur(i, e) {
    var a = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(i, Dr()),
      function (m) {
        function p(e, t) {
          var n = e.page,
            r = void 0 === n ? 0 : n,
            i = Object.keys(t).map(Number);
          return 0 === i.length ? r : Math.min.apply(Math, [r].concat(P(i)));
        }
        function g(e, t) {
          var n = e.page,
            r = void 0 === n ? 0 : n,
            i = Object.keys(t).map(Number);
          return 0 === i.length ? r : Math.max.apply(Math, [r].concat(P(i)));
        }
        var v,
          y,
          b,
          R,
          e = m || {},
          t = e.escapeHTML,
          S = void 0 === t || t,
          n = e.transformItems,
          w =
            void 0 === n
              ? function (e) {
                  return e;
                }
              : n,
          r = e.cache,
          _ =
            void 0 === r
              ? (function () {
                  var r = null,
                    i = null;
                  return {
                    read: function (e) {
                      var t = e.state;
                      return Xt(i, Br(t)) ? r : null;
                    },
                    write: function (e) {
                      var t = e.state,
                        n = e.hits;
                      (i = Br(t)), (r = n);
                    },
                  };
                })()
              : r;
        return {
          $$type: "ais.infiniteHits",
          init: function (e) {
            i(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: e.instantSearchInstance }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance,
              n = this.getWidgetRenderState(e);
            i(W(W({}, n), {}, { instantSearchInstance: t }), !1),
              b("view", n.currentPageHits);
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              { infiniteHits: this.getWidgetRenderState(t) }
            );
          },
          getWidgetRenderState: function (e) {
            var t,
              n = e.results,
              r = e.helper,
              i = e.state,
              a = e.instantSearchInstance,
              s = [],
              o = _.read({ state: i }) || {};
            if (n) {
              var c = i.page,
                u = void 0 === c ? 0 : c;
              S && 0 < n.hits.length && (n.hits = wt(n.hits));
              var l = un(cn(n.hits, n.page, n.hitsPerPage), n.queryID),
                d = w(l, { results: n });
              void 0 !== o[u] ||
                n.__isArtificial ||
                ((o[u] = d), _.write({ state: i, hits: o })),
                (s = d),
                (t = 0 === p(i, o));
            } else
              (v = (function (e) {
                return function () {
                  e.overrideStateWithoutTriggeringChangeEvent(
                    W(
                      W({}, e.state),
                      {},
                      { page: p(e.state, _.read({ state: e.state }) || {}) - 1 }
                    )
                  ).searchWithoutTriggeringOnStateChange();
                };
              })(r)),
                (y = (function (e) {
                  return function () {
                    e.setPage(
                      g(e.state, _.read({ state: e.state }) || {}) + 1
                    ).search();
                  };
                })(r)),
                (b = mn({
                  instantSearchInstance: a,
                  index: r.getIndex(),
                  widgetType: this.$$type,
                })),
                (R = pn({ index: r.getIndex(), widgetType: this.$$type })),
                (t = void 0 === i.page || 0 === p(i, o));
            var h = (function (n) {
                return Object.keys(n)
                  .map(Number)
                  .sort(function (e, t) {
                    return e - t;
                  })
                  .reduce(function (e, t) {
                    return e.concat(n[t]);
                  }, []);
              })(o),
              f = !n || n.nbPages <= g(i, o) + 1;
            return {
              hits: h,
              currentPageHits: s,
              sendEvent: b,
              bindEvent: R,
              results: n,
              showPrevious: v,
              showMore: y,
              isFirstPage: t,
              isLastPage: f,
              widgetParams: m,
            };
          },
          dispose: function (e) {
            var t = e.state;
            a();
            var n = t.setQueryParameter("page", void 0);
            return S
              ? n.setQueryParameters(
                  Object.keys(yt).reduce(function (e, t) {
                    return W(W({}, e), {}, j({}, t, void 0));
                  }, {})
                )
              : n;
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters.page || 0;
            return n ? W(W({}, e), {}, { page: n + 1 }) : e;
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState,
              r = e;
            S && (r = e.setQueryParameters(yt));
            var i = n.page ? n.page - 1 : 0;
            return r.setQueryParameter("page", i);
          },
        };
      }
    );
  }
  function qr(s, e) {
    var o = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(s, $r()),
      function (u) {
        var l,
          d,
          h,
          e = u || {},
          f = e.attribute,
          t = e.limit,
          c = void 0 === t ? 10 : t,
          n = e.showMore,
          m = void 0 !== n && n,
          r = e.showMoreLimit,
          p = void 0 === r ? 20 : r,
          i = e.sortBy,
          g = void 0 === i ? Kr : i,
          a = e.transformItems,
          v =
            void 0 === a
              ? function (e) {
                  return e;
                }
              : a;
        if (!f) throw new Error($r("The `attribute` option is required."));
        if (!0 === m && p <= c)
          throw new Error(
            $r("The `showMoreLimit` option must be greater than `limit`.")
          );
        var y = !1,
          b = function () {};
        function R() {
          b();
        }
        function S() {
          return y ? p : c;
        }
        return {
          $$type: "ais.menu",
          init: function (e) {
            var t = e.instantSearchInstance;
            s(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            s(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          dispose: function (e) {
            var t = e.state;
            return (
              o(),
              t
                .removeHierarchicalFacet(f)
                .setQueryParameter("maxValuesPerFacet", void 0)
            );
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              {
                menu: W(
                  W({}, e.menu),
                  {},
                  j({}, f, this.getWidgetRenderState(t))
                ),
              }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.results,
              n = e.createURL,
              r = e.instantSearchInstance,
              i = e.helper,
              a = [],
              s = !1;
            if (
              ((l =
                l ||
                ln({
                  instantSearchInstance: r,
                  helper: i,
                  attribute: f,
                  widgetType: this.$$type,
                })),
              (d =
                d ||
                function (e) {
                  return n(i.state.resetPage().toggleFacetRefinement(f, e));
                }),
              (h =
                h ||
                function (e) {
                  var t = D(i.getHierarchicalFacetBreadcrumb(f), 1)[0];
                  l("click", e || t),
                    i.toggleFacetRefinement(f, e || t).search();
                }),
              e.results &&
                (b = (function (e, t) {
                  return function () {
                    (y = !y), t.render(e);
                  };
                })(e, this)),
              t)
            ) {
              var o = t.getFacetValues(f, {
                  sortBy: g,
                  facetOrdering: g === Kr,
                }),
                c = o && !Array.isArray(o) && o.data ? o.data : [];
              (s = m && (y || c.length > S())),
                (a = v(
                  c.slice(0, S()).map(function (e) {
                    var t = e.name,
                      n = e.escapedValue;
                    e.path;
                    return W(
                      W({}, M(e, ["name", "escapedValue", "path"])),
                      {},
                      { label: t, value: n }
                    );
                  }),
                  { results: t }
                ));
            }
            return {
              items: a,
              createURL: d,
              refine: h,
              sendEvent: l,
              canRefine: 0 < a.length,
              widgetParams: u,
              isShowingMore: y,
              toggleShowMore: R,
              canToggleShowMore: s,
            };
          },
          getWidgetUiState: function (e, t) {
            var n = D(
              t.searchParameters.getHierarchicalFacetBreadcrumb(f),
              1
            )[0];
            return n
              ? W(W({}, e), {}, { menu: W(W({}, e.menu), {}, j({}, f, n)) })
              : e;
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState,
              r = n.menu && n.menu[f],
              i = e
                .removeHierarchicalFacet(f)
                .addHierarchicalFacet({ name: f, attributes: [f] }),
              a = i.maxValuesPerFacet || 0,
              s = Math.max(a, m ? p : c),
              o = i.setQueryParameter("maxValuesPerFacet", s);
            return r
              ? o.addHierarchicalFacetRefinement(f, r)
              : o.setQueryParameters({
                  hierarchicalFacetsRefinements: W(
                    W({}, o.hierarchicalFacetsRefinements),
                    {},
                    j({}, f, [])
                  ),
                });
          },
        };
      }
    );
  }
  function Qr(i, e) {
    var a = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(i, zr()),
      function (h) {
        var e = h || {},
          t = e.attribute,
          f = void 0 === t ? "" : t,
          n = e.items,
          m = void 0 === n ? [] : n,
          r = e.transformItems,
          p =
            void 0 === r
              ? function (e) {
                  return e;
                }
              : r;
        if ("" === f)
          throw new Error(zr("The `attribute` option is required."));
        if (!m || 0 === m.length)
          throw new Error(
            zr("The `items` option expects an array of objects.")
          );
        var g = {};
        return {
          $$type: "ais.numericMenu",
          init: function (e) {
            var t = e.instantSearchInstance;
            i(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            i(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          dispose: function (e) {
            var t = e.state;
            return a(), t.clearRefinements(f);
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters.getNumericRefinements(f),
              r = n["="] && n["="][0];
            if (r || 0 === r)
              return W(
                W({}, e),
                {},
                {
                  numericMenu: W(
                    W({}, e.numericMenu),
                    {},
                    j({}, f, "".concat(n["="]))
                  ),
                }
              );
            var i = (n[">="] && n[">="][0]) || "",
              a = (n["<="] && n["<="][0]) || "";
            return "" === i && "" === a
              ? e
              : W(
                  W({}, e),
                  {},
                  {
                    numericMenu: W(
                      W({}, e.numericMenu),
                      {},
                      j({}, f, "".concat(i, ":").concat(a))
                    ),
                  }
                );
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState,
              r = n.numericMenu && n.numericMenu[f],
              i = e.clearRefinements(f);
            if (!r)
              return i.setQueryParameters({
                numericRefinements: W(
                  W({}, i.numericRefinements),
                  {},
                  j({}, f, {})
                ),
              });
            if (-1 === r.indexOf(":"))
              return i.addNumericRefinement(f, "=", Number(r));
            var a = D(r.split(":").map(parseFloat), 2),
              s = a[0],
              o = a[1],
              c = zt(s) ? i.addNumericRefinement(f, ">=", s) : i;
            return zt(o) ? c.addNumericRefinement(f, "<=", o) : c;
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              {
                numericMenu: W(
                  W({}, e.numericMenu),
                  {},
                  j({}, f, this.getWidgetRenderState(t))
                ),
              }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.results,
              n = e.state,
              r = e.instantSearchInstance,
              i = e.helper,
              a = e.createURL;
            g.refine ||
              (g.refine = function (e) {
                var t = Yr(i.state, f, e);
                g.sendEvent("click", e), i.setState(t).search();
              }),
              g.createURL ||
                (g.createURL = function (t) {
                  return function (e) {
                    return a(Yr(t, f, e));
                  };
                }),
              g.sendEvent ||
                (g.sendEvent = (function (e) {
                  var t = e.instantSearchInstance;
                  return function () {
                    1 !== arguments.length ||
                      t.sendEventToInsights(
                        arguments.length <= 0 ? void 0 : arguments[0]
                      );
                  };
                })({ instantSearchInstance: r }));
            var s,
              o = !t || 0 === t.nbHits,
              c = (function (i) {
                return m.map(function (e) {
                  var t = e.start,
                    n = e.end,
                    r = e.label;
                  return {
                    label: r,
                    value: encodeURI(JSON.stringify({ start: t, end: n })),
                    isRefined: Jr(i, f, { start: t, end: n, label: r }),
                  };
                });
              })(n),
              u = !0,
              l = (function (e, t) {
                var n;
                if (
                  "undefined" == typeof Symbol ||
                  null == e[Symbol.iterator]
                ) {
                  if (
                    Array.isArray(e) ||
                    (n = v(e)) ||
                    (t && e && "number" == typeof e.length)
                  ) {
                    n && (e = n);
                    var r = 0,
                      i = function () {};
                    return {
                      s: i,
                      n: function () {
                        return r >= e.length
                          ? { done: !0 }
                          : { done: !1, value: e[r++] };
                      },
                      e: function (e) {
                        throw e;
                      },
                      f: i,
                    };
                  }
                  throw new TypeError(
                    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                  );
                }
                var a,
                  s = !0,
                  o = !1;
                return {
                  s: function () {
                    n = e[Symbol.iterator]();
                  },
                  n: function () {
                    var e = n.next();
                    return (s = e.done), e;
                  },
                  e: function (e) {
                    (o = !0), (a = e);
                  },
                  f: function () {
                    try {
                      s || null == n.return || n.return();
                    } finally {
                      if (o) throw a;
                    }
                  },
                };
              })(c);
            try {
              for (l.s(); !(s = l.n()).done; ) {
                var d = s.value;
                if (d.isRefined && "{}" !== decodeURI(d.value)) {
                  u = !1;
                  break;
                }
              }
            } catch (e) {
              l.e(e);
            } finally {
              l.f();
            }
            return {
              createURL: g.createURL(n),
              items: p(c, { results: t }),
              hasNoResults: o,
              canRefine: !(o && u),
              refine: g.refine,
              sendEvent: g.sendEvent,
              widgetParams: h,
            };
          },
        };
      }
    );
  }
  var Vr = Lr(Ur),
    $r = an({ name: "menu", connector: !0 }),
    Kr = ["isRefined", "name:asc"],
    zr = an({ name: "numeric-menu", connector: !0 });
  function Jr(e, t, n) {
    var r = e.getNumericRefinements(t);
    return void 0 !== n.start && void 0 !== n.end
      ? n.start === n.end
        ? Xr(r, "=", n.start)
        : Xr(r, ">=", n.start) && Xr(r, "<=", n.end)
      : void 0 !== n.start
      ? Xr(r, ">=", n.start)
      : void 0 !== n.end
      ? Xr(r, "<=", n.end)
      : void 0 === n.start &&
        void 0 === n.end &&
        Object.keys(r).every(function (e) {
          return 0 === (r[e] || []).length;
        });
  }
  function Yr(e, t, n) {
    var r = e,
      i = JSON.parse(decodeURI(n)),
      a = r.getNumericRefinements(t);
    if (void 0 === i.start && void 0 === i.end)
      return r.removeNumericRefinement(t);
    if (
      (Jr(r, t, i) || (r = r.removeNumericRefinement(t)),
      void 0 !== i.start && void 0 !== i.end)
    ) {
      if (i.start > i.end)
        throw new Error("option.start should be > to option.end");
      if (i.start === i.end)
        return (r = Xr(a, "=", i.start)
          ? r.removeNumericRefinement(t, "=", i.start)
          : r.addNumericRefinement(t, "=", i.start));
    }
    return (
      void 0 !== i.start &&
        (Xr(a, ">=", i.start) &&
          (r = r.removeNumericRefinement(t, ">=", i.start)),
        (r = r.addNumericRefinement(t, ">=", i.start))),
      void 0 !== i.end &&
        (Xr(a, "<=", i.end) && (r = r.removeNumericRefinement(t, "<=", i.end)),
        (r = r.addNumericRefinement(t, "<=", i.end))),
      "number" == typeof r.page && (r.page = 0),
      r
    );
  }
  function Xr(e, t, n) {
    return void 0 !== e[t] && e[t].includes(n);
  }
  function Gr(n, e) {
    var r = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(n, ei()),
      function (o) {
        var e = o || {},
          c = e.totalPages,
          t = e.padding,
          u = new Zr({
            currentPage: 0,
            total: 0,
            padding: void 0 === t ? 3 : t,
          }),
          l = {};
        return {
          $$type: "ais.pagination",
          init: function (e) {
            var t = e.instantSearchInstance;
            n(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            n(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          dispose: function (e) {
            var t = e.state;
            return r(), t.setQueryParameter("page", void 0);
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters.page || 0;
            return n ? W(W({}, e), {}, { page: n + 1 }) : e;
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState,
              r = n.page ? n.page - 1 : 0;
            return e.setQueryParameter("page", r);
          },
          getWidgetRenderState: function (e) {
            var t = e.results,
              n = e.helper,
              r = e.state,
              i = e.createURL;
            l.refine ||
              (l.refine = function (e) {
                n.setPage(e), n.search();
              }),
              l.createURL ||
                (l.createURL = function (t) {
                  return function (e) {
                    return i(t.setPage(e));
                  };
                });
            var a = r.page || 0,
              s = (function (e) {
                var t = e.nbPages;
                return void 0 !== c ? Math.min(c, t) : t;
              })(t || { nbPages: 0 });
            return (
              (u.currentPage = a),
              (u.total = s),
              {
                createURL: l.createURL(r),
                refine: l.refine,
                canRefine: 1 < s,
                currentRefinement: a,
                nbHits: (null == t ? void 0 : t.nbHits) || 0,
                nbPages: s,
                pages: t ? u.pages() : [],
                isFirstPage: u.isFirstPage(),
                isLastPage: u.isLastPage(),
                widgetParams: o,
              }
            );
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              { pagination: this.getWidgetRenderState(t) }
            );
          },
        };
      }
    );
  }
  var Zr = (function () {
      function t(e) {
        E(this, t),
          j(this, "currentPage", void 0),
          j(this, "total", void 0),
          j(this, "padding", void 0),
          (this.currentPage = e.currentPage),
          (this.total = e.total),
          (this.padding = e.padding);
      }
      return (
        k(t, [
          {
            key: "pages",
            value: function () {
              var e = this.total,
                t = this.currentPage,
                n = this.padding;
              if (0 === e) return [0];
              var r = this.nbPagesDisplayed(n, e);
              if (r === e) return Jt({ end: e });
              var i = this.calculatePaddingLeft(t, n, e, r);
              return Jt({ start: t - i, end: t + (r - i) });
            },
          },
          {
            key: "nbPagesDisplayed",
            value: function (e, t) {
              return Math.min(2 * e + 1, t);
            },
          },
          {
            key: "calculatePaddingLeft",
            value: function (e, t, n, r) {
              return e <= t ? e : n - t <= e ? r - (n - e) : t;
            },
          },
          {
            key: "isLastPage",
            value: function () {
              return this.currentPage === this.total - 1 || 0 === this.total;
            },
          },
          {
            key: "isFirstPage",
            value: function () {
              return 0 === this.currentPage;
            },
          },
        ]),
        t
      );
    })(),
    ei = an({ name: "pagination", connector: !0 }),
    ti = an(
      { name: "range-input", connector: !0 },
      { name: "range-slider", connector: !0 }
    );
  function ni(e) {
    var t = e.min,
      n = e.max,
      r = e.precision,
      i = Math.pow(10, r);
    return {
      min: t ? Math.floor(t * i) / i : t,
      max: n ? Math.ceil(n * i) / i : n,
    };
  }
  function ri(r, e) {
    var i = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(r, ti()),
      function (o) {
        var e = o || {},
          t = e.attribute,
          w = void 0 === t ? "" : t,
          _ = e.min,
          P = e.max,
          n = e.precision,
          N = void 0 === n ? 0 : n;
        if (!w) throw new Error(ti("The `attribute` option is required."));
        if (zt(_) && zt(P) && P < _)
          throw new Error(ti("The `max` option can't be lower than `min`."));
        var c = {
          from: function (e) {
            return e.toLocaleString();
          },
          to: function (e) {
            return (function (e) {
              return Number(Number(e).toFixed(N));
            })(e).toLocaleString();
          },
        };
        function u(i, a) {
          return function () {
            var e = D(
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : [void 0, void 0],
                2
              ),
              t = e[0],
              n = e[1],
              r = (function (e, t, n, r) {
                var i,
                  a,
                  s = e.state,
                  o = t.min,
                  c = t.max,
                  u = D(s.getNumericRefinement(w, ">=") || [], 1)[0],
                  l = D(s.getNumericRefinement(w, "<=") || [], 1)[0],
                  d = void 0 === n || "" === n,
                  h = void 0 === r || "" === r,
                  f = ni({
                    min: d ? void 0 : parseFloat(n),
                    max: h ? void 0 : parseFloat(r),
                    precision: N,
                  }),
                  m = f.min,
                  p = f.max;
                (i = zt(_) || o !== m ? (zt(_) && d ? _ : m) : void 0),
                  (a = zt(P) || c !== p ? (zt(P) && h ? P : p) : void 0);
                var g = void 0 === i,
                  v = zt(o) && o <= i,
                  y = g || (zt(i) && (!zt(o) || v)),
                  b = void 0 === a,
                  R = zt(a) && a <= c,
                  S = b || (zt(a) && (!zt(c) || R));
                return (u !== i || l !== a) && y && S
                  ? ((s = s.removeNumericRefinement(w)),
                    zt(i) && (s = s.addNumericRefinement(w, ">=", i)),
                    zt(a) && (s = s.addNumericRefinement(w, "<=", a)),
                    s.resetPage())
                  : null;
              })(i, a, t, n);
            r && i.setState(r).search();
          };
        }
        return {
          $$type: "ais.range",
          init: function (e) {
            r(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: e.instantSearchInstance }
              ),
              !0
            );
          },
          render: function (e) {
            r(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: e.instantSearchInstance }
              ),
              !1
            );
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              {
                range: W(
                  W({}, e.range),
                  {},
                  j({}, w, this.getWidgetRenderState(t))
                ),
              }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.results,
              n = e.helper,
              r = e.instantSearchInstance,
              i = Ut((t && t.disjunctiveFacets) || [], function (e) {
                return e.name === w;
              }),
              a = (function (e) {
                return ni({
                  min: zt(_) ? _ : zt(e.min) ? e.min : 0,
                  max: zt(P) ? P : zt(e.max) ? e.max : 0,
                  precision: N,
                });
              })((i && i.stats) || { min: void 0, max: void 0 }),
              s = (function (e) {
                var t = D(e.getNumericRefinement(w, ">=") || [], 1)[0],
                  n = D(e.getNumericRefinement(w, "<=") || [], 1)[0];
                return [zt(t) ? t : -1 / 0, zt(n) ? n : 1 / 0];
              })(n);
            return {
              refine: u(n, t ? a : { min: void 0, max: void 0 }),
              canRefine: a.min !== a.max,
              format: c,
              range: a,
              sendEvent: (function (e) {
                return function () {
                  1 !== arguments.length ||
                    e.sendEventToInsights(
                      arguments.length <= 0 ? void 0 : arguments[0]
                    );
                };
              })(r),
              widgetParams: W(W({}, o), {}, { precision: N }),
              start: s,
            };
          },
          dispose: function (e) {
            var t = e.state;
            return i(), t.removeDisjunctiveFacet(w).removeNumericRefinement(w);
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters.getNumericRefinements(w),
              r = n[">="],
              i = void 0 === r ? [] : r,
              a = n["<="],
              s = void 0 === a ? [] : a;
            return 0 === i.length && 0 === s.length
              ? e
              : W(
                  W({}, e),
                  {},
                  {
                    range: W(
                      W({}, e.range),
                      {},
                      j({}, w, "".concat(i, ":").concat(s))
                    ),
                  }
                );
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState,
              r = e.addDisjunctiveFacet(w).setQueryParameters({
                numericRefinements: W(
                  W({}, e.numericRefinements),
                  {},
                  j({}, w, {})
                ),
              });
            zt(_) && (r = r.addNumericRefinement(w, ">=", _)),
              zt(P) && (r = r.addNumericRefinement(w, "<=", P));
            var i = n.range && n.range[w];
            if (!i || -1 === i.indexOf(":")) return r;
            var a = D(i.split(":").map(parseFloat), 2),
              s = a[0],
              o = a[1];
            return (
              zt(s) &&
                (!zt(_) || _ < s) &&
                (r = (r = r.removeNumericRefinement(
                  w,
                  ">="
                )).addNumericRefinement(w, ">=", s)),
              zt(o) &&
                (!zt(P) || o < P) &&
                (r = (r = r.removeNumericRefinement(
                  w,
                  "<="
                )).addNumericRefinement(w, "<=", o)),
              r
            );
          },
        };
      }
    );
  }
  function ii(u, e) {
    var l = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(u, hi()),
      function (f) {
        var e = f || {},
          m = e.attribute,
          t = e.operator,
          d = void 0 === t ? "or" : t,
          n = e.limit,
          p = void 0 === n ? 10 : n,
          r = e.showMore,
          g = void 0 !== r && r,
          i = e.showMoreLimit,
          h = void 0 === i ? 20 : i,
          a = e.sortBy,
          v = void 0 === a ? fi : a,
          s = e.escapeFacetValues,
          o = void 0 === s || s,
          c = e.transformItems,
          y =
            void 0 === c
              ? function (e) {
                  return e;
                }
              : c;
        if (!m) throw new Error(hi("The `attribute` option is required."));
        if (!/^(and|or)$/.test(d))
          throw new Error(
            hi(
              'The `operator` must one of: `"and"`, `"or"` (got "'.concat(
                d,
                '").'
              )
            )
          );
        if (!0 === g && h <= p)
          throw new Error(
            hi("`showMoreLimit` should be greater than `limit`.")
          );
        function b(e) {
          var t = e.name,
            n = e.escapedValue;
          return W(
            W({}, M(e, ["name", "escapedValue"])),
            {},
            { value: n, label: t, highlighted: t }
          );
        }
        var R,
          S,
          w,
          _ = [],
          P = !0,
          N = !1,
          x = function () {};
        function I() {
          x();
        }
        function F() {
          return N ? h : p;
        }
        function T(n, s) {
          return function (a) {
            return function (e) {
              var r = a.instantSearchInstance,
                i = a.results;
              if ("" === e && _)
                u(
                  W(
                    W(
                      {},
                      s.getWidgetRenderState(W(W({}, a), {}, { results: R }))
                    ),
                    {},
                    { instantSearchInstance: r }
                  ),
                  !1
                );
              else {
                var t = {
                  highlightPreTag: o ? yt.highlightPreTag : bt.highlightPreTag,
                  highlightPostTag: o
                    ? yt.highlightPostTag
                    : bt.highlightPostTag,
                };
                n.searchForFacetValues(m, e, Math.min(F(), 100), t).then(
                  function (e) {
                    var t = o
                        ? (function (e) {
                            return e.map(function (e) {
                              return W(
                                W({}, e),
                                {},
                                { highlighted: Rt(e.highlighted) }
                              );
                            });
                          })(e.facetHits)
                        : e.facetHits,
                      n = y(
                        t.map(function (e) {
                          var t = e.escapedValue,
                            n = e.value;
                          return W(
                            W({}, M(e, ["escapedValue", "value"])),
                            {},
                            { value: t, label: n }
                          );
                        }),
                        { results: i }
                      );
                    u(
                      W(
                        W(
                          {},
                          s.getWidgetRenderState(
                            W(W({}, a), {}, { results: R })
                          )
                        ),
                        {},
                        {
                          items: n,
                          canToggleShowMore: !1,
                          canRefine: !0,
                          isFromSearch: !0,
                          instantSearchInstance: r,
                        }
                      ),
                      !1
                    );
                  }
                );
              }
            };
          };
        }
        var C = function () {
          return function () {};
        };
        return {
          $$type: "ais.refinementList",
          init: function (e) {
            u(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: e.instantSearchInstance }
              ),
              !0
            );
          },
          render: function (e) {
            u(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: e.instantSearchInstance }
              ),
              !1
            );
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              {
                refinementList: W(
                  W({}, e.refinementList),
                  {},
                  j({}, m, this.getWidgetRenderState(t))
                ),
              }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.results,
              n = e.state,
              r = e.createURL,
              i = e.instantSearchInstance,
              a = e.helper,
              s = [],
              o = [];
            if (
              ((w && S && C) ||
                ((w = ln({
                  instantSearchInstance: i,
                  helper: a,
                  attribute: m,
                  widgetType: this.$$type,
                })),
                (S = function (e) {
                  w("click", e), a.toggleFacetRefinement(m, e).search();
                }),
                (C = T(a, this))),
              t)
            ) {
              var c = t.getFacetValues(m, {
                sortBy: v,
                facetOrdering: v === fi,
              });
              (o = c && Array.isArray(c) ? c : []),
                (s = y(o.slice(0, F()).map(b), { results: t }));
              var u = n.maxValuesPerFacet,
                l = F();
              (P = l < u ? o.length <= l : o.length < l),
                (R = t),
                (_ = s),
                e.results &&
                  (x = (function (e, t) {
                    return function () {
                      (N = !N), t.render(e);
                    };
                  })(e, this));
            }
            var d = C && C(e),
              h = (N && _.length > p) || (g && !P);
            return {
              createURL: function (e) {
                return r(n.resetPage().toggleFacetRefinement(m, e));
              },
              items: s,
              refine: S,
              searchForItems: d,
              isFromSearch: !1,
              canRefine: 0 < s.length,
              widgetParams: f,
              isShowingMore: N,
              canToggleShowMore: h,
              toggleShowMore: I,
              sendEvent: w,
              hasExhaustiveItems: P,
            };
          },
          dispose: function (e) {
            var t = e.state;
            l();
            var n = t.setQueryParameter("maxValuesPerFacet", void 0);
            return "and" === d ? n.removeFacet(m) : n.removeDisjunctiveFacet(m);
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters,
              r =
                "or" === d
                  ? n.getDisjunctiveRefinements(m)
                  : n.getConjunctiveRefinements(m);
            return r.length
              ? W(
                  W({}, e),
                  {},
                  {
                    refinementList: W(W({}, e.refinementList), {}, j({}, m, r)),
                  }
                )
              : e;
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState,
              r = "or" === d,
              i = n.refinementList && n.refinementList[m],
              a = e.clearRefinements(m),
              s = r ? a.addDisjunctiveFacet(m) : a.addFacet(m),
              o = s.maxValuesPerFacet || 0,
              c = Math.max(o, g ? h : p),
              u = s.setQueryParameter("maxValuesPerFacet", c);
            if (i)
              return i.reduce(function (e, t) {
                return r
                  ? e.addDisjunctiveFacetRefinement(m, t)
                  : e.addFacetRefinement(m, t);
              }, u);
            var l = r ? "disjunctiveFacetsRefinements" : "facetsRefinements";
            return u.setQueryParameters(
              j({}, l, W(W({}, u[l]), {}, j({}, m, [])))
            );
          },
        };
      }
    );
  }
  function ai(e, t) {
    return t(e);
  }
  function si(n, e) {
    var r = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(n, mi()),
      function (i) {
        var a,
          s,
          e = (i || {}).queryHook,
          o = void 0 === e ? ai : e;
        return {
          $$type: "ais.searchBox",
          init: function (e) {
            var t = e.instantSearchInstance;
            n(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            n(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          dispose: function (e) {
            var t = e.state;
            return r(), t.setQueryParameter("query", void 0);
          },
          getRenderState: function (e, t) {
            return W(W({}, e), {}, { searchBox: this.getWidgetRenderState(t) });
          },
          getWidgetRenderState: function (e) {
            var t = e.helper,
              n = e.searchMetadata,
              r = e.state;
            return (
              a ||
                ((a = function (e) {
                  o(e, function (e) {
                    return t.setQuery(e).search();
                  });
                }),
                (s = function () {
                  t.setQuery("").search();
                })),
              {
                query: r.query || "",
                refine: a,
                clear: s,
                widgetParams: i,
                isSearchStalled: n.isSearchStalled,
              }
            );
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters.query || "";
            return "" === n || (e && e.query === n)
              ? e
              : W(W({}, e), {}, { query: n });
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState;
            return e.setQueryParameter("query", n.query || "");
          },
        };
      }
    );
  }
  function oi(i, e) {
    var n = 1 < arguments.length && void 0 !== e ? e : Tt;
    Kt(i, pi());
    var u = {};
    return function (s) {
      var e = s || {},
        o = e.items,
        t = e.transformItems,
        c =
          void 0 === t
            ? function (e) {
                return e;
              }
            : t;
      if (!Array.isArray(o))
        throw new Error(pi("The `items` option expects an array of objects."));
      return {
        $$type: "ais.sortBy",
        init: function (e) {
          var t = e.instantSearchInstance,
            n = this.getWidgetRenderState(e),
            r = n.currentRefinement;
          Ut(o, function (e) {
            return e.value === r;
          });
          i(W(W({}, n), {}, { instantSearchInstance: t }), !0);
        },
        render: function (e) {
          var t = e.instantSearchInstance;
          i(
            W(
              W({}, this.getWidgetRenderState(e)),
              {},
              { instantSearchInstance: t }
            ),
            !1
          );
        },
        dispose: function (e) {
          var t = e.state;
          return n(), u.initialIndex ? t.setIndex(u.initialIndex) : t;
        },
        getRenderState: function (e, t) {
          return W(W({}, e), {}, { sortBy: this.getWidgetRenderState(t) });
        },
        getWidgetRenderState: function (e) {
          var t = e.results,
            n = e.helper,
            r = e.state,
            i = e.parent;
          !u.initialIndex && i && (u.initialIndex = i.getIndexName()),
            u.setIndex ||
              (u.setIndex = function (e) {
                n.setIndex(e).search();
              });
          var a = !t || 0 === t.nbHits;
          return {
            currentRefinement: r.index,
            options: c(o, { results: t }),
            refine: u.setIndex,
            hasNoResults: a,
            canRefine: !a && 0 < o.length,
            widgetParams: s,
          };
        },
        getWidgetUiState: function (e, t) {
          var n = t.searchParameters.index;
          return W(W({}, e), {}, { sortBy: n !== u.initialIndex ? n : void 0 });
        },
        getWidgetSearchParameters: function (e, t) {
          var n = t.uiState;
          return e.setQueryParameter(
            "index",
            n.sortBy || u.initialIndex || e.index
          );
        },
      };
    };
  }
  function ci(n, e) {
    var i = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(n, gi()),
      function (m) {
        var p,
          e = m || {},
          g = e.attribute,
          t = e.max,
          v = void 0 === t ? 5 : t;
        if (!g) throw new Error(gi("The `attribute` option is required."));
        function y(e) {
          var t,
            n = e.getNumericRefinements(g);
          if (null !== (t = n[">="]) && void 0 !== t && t.length)
            return n[">="][0];
        }
        function r(e, t) {
          var n = y(e) === Number(t),
            r = e.resetPage().removeNumericRefinement(g);
          return n
            ? r
            : r
                .addNumericRefinement(g, "<=", v)
                .addNumericRefinement(g, ">=", Number(t));
        }
        var b = function (e) {
            return function (e, t) {
              p("click", t), e.setState(r(e.state, t)).search();
            }.bind(null, e);
          },
          R = function (e) {
            var t = e.state,
              n = e.createURL;
            return function (e) {
              return n(r(t, e));
            };
          };
        return {
          $$type: vi,
          init: function (e) {
            var t = e.instantSearchInstance;
            n(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            n(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              {
                ratingMenu: W(
                  W({}, e.ratingMenu),
                  {},
                  j({}, g, this.getWidgetRenderState(t))
                ),
              }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.helper,
              n = e.results,
              r = e.state,
              i = e.instantSearchInstance,
              a = e.createURL,
              s = [];
            p =
              p ||
              (function (e) {
                var o = e.instantSearchInstance,
                  c = e.helper,
                  u = e.getRefinedStar,
                  l = e.attribute;
                return function () {
                  for (
                    var e = arguments.length, t = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    t[n] = arguments[n];
                  if (1 !== t.length) {
                    var r = t[0],
                      i = t[1],
                      a = t[2],
                      s = void 0 === a ? "Filter Applied" : a;
                    if ("click" === r)
                      u() === Number(i) ||
                        o.sendEventToInsights({
                          insightsMethod: "clickedFilters",
                          widgetType: vi,
                          eventType: r,
                          payload: {
                            eventName: s,
                            index: c.getIndex(),
                            filters: ["".concat(l, ">=").concat(i)],
                          },
                          attribute: l,
                        });
                  } else o.sendEventToInsights(t[0]);
                };
              })({
                instantSearchInstance: i,
                helper: t,
                getRefinedStar: function () {
                  return y(t.state);
                },
                attribute: g,
              });
            var o = !1,
              c = 0,
              u = null == n ? void 0 : n.getFacetValues(g, {});
            if (n && u) {
              u.length,
                (function (e) {
                  var r = 0;
                  e.forEach(function (e) {
                    var t = D(e.name.split("."), 2)[1],
                      n = void 0 === t ? "" : t;
                    r = Math.max(r, n.length);
                  });
                })(u);
              for (
                var l = y(r),
                  d = function (n) {
                    var e = l === n;
                    o = o || e;
                    var t = u
                      .filter(function (e) {
                        return Number(e.name) >= n && Number(e.name) <= v;
                      })
                      .map(function (e) {
                        return e.count;
                      })
                      .reduce(function (e, t) {
                        return e + t;
                      }, 0);
                    if (((c += t), l && !e && 0 === t)) return "continue";
                    var r = P(new Array(Math.floor(v / 1))).map(function (
                      e,
                      t
                    ) {
                      return 1 * t < n;
                    });
                    s.push({
                      stars: r,
                      name: String(n),
                      label: String(n),
                      value: String(n),
                      count: t,
                      isRefined: e,
                    });
                  },
                  h = 1;
                h < v;
                h += 1
              )
                d(h);
            }
            s = s.reverse();
            var f = !n || 0 === n.nbHits;
            return {
              items: s,
              hasNoResults: f,
              canRefine: (!f || o) && 0 < c,
              refine: b(t),
              sendEvent: p,
              createURL: R({ state: r, createURL: a }),
              widgetParams: m,
            };
          },
          dispose: function (e) {
            var t = e.state;
            return i(), t.removeNumericRefinement(g);
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters,
              r = y(n);
            return "number" != typeof r
              ? e
              : W(
                  W({}, e),
                  {},
                  { ratingMenu: W(W({}, e.ratingMenu), {}, j({}, g, r)) }
                );
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState,
              r = n.ratingMenu && n.ratingMenu[g],
              i = e.clearRefinements(g).addDisjunctiveFacet(g);
            return r
              ? i
                  .addNumericRefinement(g, "<=", v)
                  .addNumericRefinement(g, ">=", r)
              : i.setQueryParameters({
                  numericRefinements: W(
                    W({}, i.numericRefinements),
                    {},
                    j({}, g, {})
                  ),
                });
          },
        };
      }
    );
  }
  function ui(n, e) {
    var t = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(n, yi()),
      function (r) {
        return {
          $$type: "ais.stats",
          init: function (e) {
            var t = e.instantSearchInstance;
            n(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            n(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          dispose: function () {
            t();
          },
          getRenderState: function (e, t) {
            return W(W({}, e), {}, { stats: this.getWidgetRenderState(t) });
          },
          getWidgetRenderState: function (e) {
            var t = e.results,
              n = e.state;
            return t
              ? {
                  hitsPerPage: t.hitsPerPage,
                  nbHits: t.nbHits,
                  nbSortedHits: t.nbSortedHits,
                  areHitsSorted:
                    void 0 !== t.appliedRelevancyStrictness &&
                    0 < t.appliedRelevancyStrictness &&
                    t.nbSortedHits !== t.nbHits,
                  nbPages: t.nbPages,
                  page: t.page,
                  processingTimeMS: t.processingTimeMS,
                  query: t.query,
                  widgetParams: r,
                }
              : {
                  hitsPerPage: n.hitsPerPage,
                  nbHits: 0,
                  nbSortedHits: void 0,
                  areHitsSorted: !1,
                  nbPages: 0,
                  page: n.page || 0,
                  processingTimeMS: -1,
                  query: n.query || "",
                  widgetParams: r,
                };
          },
        };
      }
    );
  }
  function li(i, e) {
    var a = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(i, bi()),
      function (m) {
        var e = m || {},
          p = e.attribute,
          t = e.on,
          n = void 0 === t || t,
          r = e.off;
        if (!p) throw new Error(bi("The `attribute` option is required."));
        var g,
          v = void 0 !== r,
          y = rn(n).map(qt),
          b = v ? rn(r).map(qt) : void 0,
          R = function (n, e) {
            var r = e.state,
              i = e.createURL;
            return function () {
              r = r.resetPage();
              var e = n ? y : b;
              e &&
                e.forEach(function (e) {
                  r = r.removeDisjunctiveFacetRefinement(p, e);
                });
              var t = n ? b : y;
              return (
                t &&
                  t.forEach(function (e) {
                    r = r.addDisjunctiveFacetRefinement(p, e);
                  }),
                i(r)
              );
            };
          };
        return {
          $$type: Ri,
          init: function (e) {
            var t = e.instantSearchInstance;
            i(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            i(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          dispose: function (e) {
            var t = e.state;
            return a(), t.removeDisjunctiveFacet(p);
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              {
                toggleRefinement: W(
                  W({}, e.toggleRefinement),
                  {},
                  j({}, p, this.getWidgetRenderState(t))
                ),
              }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.state,
              n = e.helper,
              r = e.results,
              i = e.createURL,
              a = e.instantSearchInstance,
              s = r
                ? y.every(function (e) {
                    return t.isDisjunctiveFacetRefined(p, e);
                  })
                : y.every(function (e) {
                    return t.isDisjunctiveFacetRefined(p, e);
                  }),
              o = { isRefined: s, count: 0 },
              c = { isRefined: v && !s, count: 0 };
            if (r) {
              var u = rn(b || !1),
                l = r.getFacetValues(p, {}) || [],
                d = y
                  .map(function (t) {
                    return Ut(l, function (e) {
                      return e.escapedValue === qt(String(t));
                    });
                  })
                  .filter(function (e) {
                    return void 0 !== e;
                  }),
                h = v
                  ? u
                      .map(function (t) {
                        return Ut(l, function (e) {
                          return e.escapedValue === qt(String(t));
                        });
                      })
                      .filter(function (e) {
                        return void 0 !== e;
                      })
                  : [];
              (o = {
                isRefined:
                  !!d.length &&
                  d.every(function (e) {
                    return e.isRefined;
                  }),
                count:
                  d.reduce(function (e, t) {
                    return e + t.count;
                  }, 0) || null,
              }),
                (c = {
                  isRefined:
                    !!h.length &&
                    h.every(function (e) {
                      return e.isRefined;
                    }),
                  count:
                    h.reduce(function (e, t) {
                      return e + t.count;
                    }, 0) ||
                    l.reduce(function (e, t) {
                      return e + t.count;
                    }, 0),
                });
            }
            g =
              g ||
              (function (e) {
                var o = e.instantSearchInstance,
                  c = e.helper,
                  u = e.attribute,
                  l = e.on;
                return function () {
                  for (
                    var e = arguments.length, t = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    t[n] = arguments[n];
                  if (1 !== t.length) {
                    var r = t[0],
                      i = t[1],
                      a = t[2],
                      s = void 0 === a ? "Filter Applied" : a;
                    "click" === r &&
                      void 0 !== l &&
                      (i ||
                        o.sendEventToInsights({
                          insightsMethod: "clickedFilters",
                          widgetType: Ri,
                          eventType: r,
                          payload: {
                            eventName: s,
                            index: c.getIndex(),
                            filters: l.map(function (e) {
                              return "".concat(u, ":").concat(e);
                            }),
                          },
                          attribute: u,
                        }));
                  } else o.sendEventToInsights(t[0]);
                };
              })({ instantSearchInstance: a, attribute: p, on: y, helper: n });
            var f = s ? c : o;
            return {
              value: {
                name: p,
                isRefined: s,
                count: r ? f.count : null,
                onFacetValue: o,
                offFacetValue: c,
              },
              createURL: R(s, { state: t, createURL: i }),
              sendEvent: g,
              canRefine: Boolean(r ? f.count : null),
              refine: (function (t) {
                return function () {
                  var e = (
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : { isRefined: !1 }
                  ).isRefined;
                  e
                    ? (y.forEach(function (e) {
                        return t.removeDisjunctiveFacetRefinement(p, e);
                      }),
                      v &&
                        b.forEach(function (e) {
                          return t.addDisjunctiveFacetRefinement(p, e);
                        }))
                    : (g("click", e),
                      v &&
                        b.forEach(function (e) {
                          return t.removeDisjunctiveFacetRefinement(p, e);
                        }),
                      y.forEach(function (e) {
                        return t.addDisjunctiveFacetRefinement(p, e);
                      })),
                    t.search();
                };
              })(n),
              widgetParams: m,
            };
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters,
              r =
                y &&
                y.every(function (e) {
                  return n.isDisjunctiveFacetRefined(p, e);
                });
            return r
              ? W(W({}, e), {}, { toggle: W(W({}, e.toggle), {}, j({}, p, r)) })
              : e;
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState,
              r = e.clearRefinements(p).addDisjunctiveFacet(p);
            return Boolean(n.toggle && n.toggle[p])
              ? (y &&
                  y.forEach(function (e) {
                    r = r.addDisjunctiveFacetRefinement(p, e);
                  }),
                r)
              : v
              ? (b &&
                  b.forEach(function (e) {
                    r = r.addDisjunctiveFacetRefinement(p, e);
                  }),
                r)
              : r.setQueryParameters({
                  disjunctiveFacetsRefinements: W(
                    W({}, e.disjunctiveFacetsRefinements),
                    {},
                    j({}, p, [])
                  ),
                });
          },
        };
      }
    );
  }
  function di(d, e) {
    var h = 1 < arguments.length && void 0 !== e ? e : Tt;
    Kt(d, Si());
    var f = {};
    return function (s) {
      var e = s || {},
        t = e.attributes,
        n = e.separator,
        r = void 0 === n ? " > " : n,
        i = e.rootPath,
        a = void 0 === i ? null : i,
        o = e.transformItems,
        c =
          void 0 === o
            ? function (e) {
                return e;
              }
            : o;
      if (!t || !Array.isArray(t) || 0 === t.length)
        throw new Error(
          Si("The `attributes` option expects an array of strings.")
        );
      var u = D(t, 1)[0];
      function l(e, t) {
        if (t) return e.resetPage().toggleFacetRefinement(u, t);
        var n = e.getHierarchicalFacetBreadcrumb(u);
        return 0 === n.length
          ? e
          : e.resetPage().toggleFacetRefinement(u, n[0]);
      }
      return {
        $$type: "ais.breadcrumb",
        init: function (e) {
          d(
            W(
              W({}, this.getWidgetRenderState(e)),
              {},
              { instantSearchInstance: e.instantSearchInstance }
            ),
            !0
          );
        },
        render: function (e) {
          d(
            W(
              W({}, this.getWidgetRenderState(e)),
              {},
              { instantSearchInstance: e.instantSearchInstance }
            ),
            !1
          );
        },
        dispose: function () {
          h();
        },
        getRenderState: function (e, t) {
          return W(
            W({}, e),
            {},
            {
              breadcrumb: W(
                W({}, e.breadcrumb),
                {},
                j({}, u, this.getWidgetRenderState(t))
              ),
            }
          );
        },
        getWidgetRenderState: function (e) {
          var t = e.helper,
            n = e.createURL,
            r = e.results,
            i = e.state;
          var a = (function () {
            if (!r || 0 === i.hierarchicalFacets.length) return [];
            var e = D(i.hierarchicalFacets, 1)[0].name,
              t = r.getFacetValues(e, {}),
              n = Array.isArray(t.data) ? t.data : [];
            return c(
              (function (n) {
                return n.map(function (e, t) {
                  return {
                    label: e.label,
                    value: t + 1 === n.length ? null : n[t + 1].value,
                  };
                });
              })(
                (function n(e) {
                  return e.reduce(function (e, t) {
                    return (
                      t.isRefined &&
                        (e.push({ label: t.name, value: t.escapedValue }),
                        Array.isArray(t.data) && (e = e.concat(n(t.data)))),
                      e
                    );
                  }, []);
                })(n)
              ),
              { results: r }
            );
          })();
          return (
            f.createURL ||
              (f.createURL = function (e) {
                return n(l(t.state, e));
              }),
            f.refine ||
              (f.refine = function (e) {
                t.setState(l(t.state, e)).search();
              }),
            {
              canRefine: 0 < a.length,
              createURL: f.createURL,
              items: a,
              refine: f.refine,
              widgetParams: s,
            }
          );
        },
        getWidgetSearchParameters: function (e) {
          if (e.isHierarchicalFacet(u)) {
            e.getHierarchicalFacetByName(u);
            return e;
          }
          return e.addHierarchicalFacet({
            name: u,
            attributes: t,
            separator: r,
            rootPath: a,
          });
        },
      };
    };
  }
  var hi = an({ name: "refinement-list", connector: !0 }),
    fi = ["isRefined", "count:desc", "name:asc"],
    mi = an({ name: "search-box", connector: !0 }),
    pi = an({ name: "sort-by", connector: !0 }),
    gi = an({ name: "rating-menu", connector: !0 }),
    vi = "ais.ratingMenu",
    yi = an({ name: "stats", connector: !0 }),
    bi = an({ name: "toggle-refinement", connector: !0 }),
    Ri = "ais.toggleRefinement",
    Si = an({ name: "breadcrumb", connector: !0 });
  var wi = an({ name: "geo-search", connector: !0 });
  function _i(e) {
    return e.insideBoundingBox || "";
  }
  function Pi(e, t) {
    return e.setQueryParameter("insideBoundingBox", t);
  }
  function Ni(v, e) {
    var i = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(v, wi()),
      function (s) {
        function o(e) {
          return e.aroundLatLng
            ? (function (e) {
                var t = e.match(sn);
                if (!t)
                  throw new Error(
                    'Invalid value for "aroundLatLng" parameter: "'.concat(
                      e,
                      '"'
                    )
                  );
                return { lat: parseFloat(t[1]), lng: parseFloat(t[2]) };
              })(e.aroundLatLng)
            : void 0;
        }
        function c() {
          return g.internalToggleRefineOnMapMove();
        }
        function u(e, t) {
          return function () {
            (g.isRefineOnMapMove = !g.isRefineOnMapMove), t(e);
          };
        }
        function l() {
          return g.isRefineOnMapMove;
        }
        function d() {
          return g.internalSetMapMoveSinceLastRefine();
        }
        function h(t, n) {
          return function () {
            var e = !0 !== g.hasMapMoveSinceLastRefine;
            (g.hasMapMoveSinceLastRefine = !0), e && n(t);
          };
        }
        function f() {
          return g.hasMapMoveSinceLastRefine;
        }
        var m,
          e = s || {},
          t = e.enableRefineOnMapMove,
          n = void 0 === t || t,
          r = e.transformItems,
          p =
            void 0 === r
              ? function (e) {
                  return e;
                }
              : r,
          g = {
            isRefineOnMapMove: n,
            hasMapMoveSinceLastRefine: !1,
            lastRefinePosition: "",
            lastRefineBoundingBox: "",
            internalToggleRefineOnMapMove: Tt,
            internalSetMapMoveSinceLastRefine: Tt,
          };
        return {
          $$type: Ii,
          init: function (e) {
            var t = e.instantSearchInstance;
            (g.internalToggleRefineOnMapMove = u(e, Tt)),
              (g.internalSetMapMoveSinceLastRefine = h(e, Tt)),
              v(
                W(
                  W({}, this.getWidgetRenderState(e)),
                  {},
                  { instantSearchInstance: t }
                ),
                !0
              );
          },
          render: function (e) {
            var t = e.helper,
              n = e.instantSearchInstance,
              r = t.state,
              i =
                Boolean(r.aroundLatLng) &&
                Boolean(g.lastRefinePosition) &&
                r.aroundLatLng !== g.lastRefinePosition,
              a =
                !r.insideBoundingBox &&
                Boolean(g.lastRefineBoundingBox) &&
                r.insideBoundingBox !== g.lastRefineBoundingBox;
            (i || a) && (g.hasMapMoveSinceLastRefine = !1),
              (g.lastRefinePosition = r.aroundLatLng || ""),
              (g.lastRefineBoundingBox = _i(r)),
              (g.internalToggleRefineOnMapMove = u(e, this.render.bind(this))),
              (g.internalSetMapMoveSinceLastRefine = h(
                e,
                this.render.bind(this)
              ));
            var s = this.getWidgetRenderState(e);
            m("view", s.items),
              v(W(W({}, s), {}, { instantSearchInstance: n }), !1);
          },
          getWidgetRenderState: function (e) {
            var t = e.helper,
              n = e.results,
              r = e.instantSearchInstance,
              i = t.state,
              a = n
                ? p(
                    n.hits.filter(function (e) {
                      return e._geoloc;
                    }),
                    { results: n }
                  )
                : [];
            return (
              (m =
                m ||
                mn({
                  instantSearchInstance: r,
                  index: t.getIndex(),
                  widgetType: Ii,
                })),
              {
                items: a,
                position: o(i),
                currentRefinement: (function (e) {
                  return e.insideBoundingBox && on(e.insideBoundingBox);
                })(i),
                refine: (function (i) {
                  return function (e) {
                    var t = e.northEast,
                      n = e.southWest,
                      r = [t.lat, t.lng, n.lat, n.lng].join();
                    i.setState(Pi(i.state, r).resetPage()).search(),
                      (g.hasMapMoveSinceLastRefine = !1),
                      (g.lastRefineBoundingBox = r);
                  };
                })(t),
                sendEvent: m,
                clearMapRefinement: (function (e) {
                  return function () {
                    e.setQueryParameter("insideBoundingBox", void 0).search();
                  };
                })(t),
                isRefinedWithMap: (function (e) {
                  return function () {
                    return Boolean(e.insideBoundingBox);
                  };
                })(i),
                toggleRefineOnMapMove: c,
                isRefineOnMapMove: l,
                setMapMoveSinceLastRefine: d,
                hasMapMoveSinceLastRefine: f,
                widgetParams: s,
              }
            );
          },
          getRenderState: function (e, t) {
            return W(W({}, e), {}, { geoSearch: this.getWidgetRenderState(t) });
          },
          dispose: function (e) {
            var t = e.state;
            return i(), t.setQueryParameter("insideBoundingBox", void 0);
          },
          getWidgetUiState: function (e, t) {
            var n = _i(t.searchParameters);
            return !n || (e && e.geoSearch && e.geoSearch.boundingBox === n)
              ? e
              : W(W({}, e), {}, { geoSearch: { boundingBox: n } });
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState;
            return n && n.geoSearch
              ? Pi(e, n.geoSearch.boundingBox)
              : e.setQueryParameter("insideBoundingBox", void 0);
          },
        };
      }
    );
  }
  function xi(r, e) {
    var i = 1 < arguments.length && void 0 !== e ? e : Tt;
    Kt(r, Fi());
    var a =
      "https://www.algolia.com/?utm_source=instantsearch.js&utm_medium=website&" +
      "utm_content=".concat(
        yn(
          function (e) {
            var t;
            return (
              (null === (t = e.window.location) || void 0 === t
                ? void 0
                : t.hostname) || ""
            );
          },
          {
            fallback: function () {
              return "";
            },
          }
        ),
        "&"
      ) +
      "utm_campaign=poweredby";
    return function (e) {
      var t = (e || {}).url,
        n = void 0 === t ? a : t;
      return {
        $$type: "ais.poweredBy",
        init: function (e) {
          var t = e.instantSearchInstance;
          r(
            W(
              W({}, this.getWidgetRenderState(e)),
              {},
              { instantSearchInstance: t }
            ),
            !0
          );
        },
        render: function (e) {
          var t = e.instantSearchInstance;
          r(
            W(
              W({}, this.getWidgetRenderState(e)),
              {},
              { instantSearchInstance: t }
            ),
            !1
          );
        },
        getRenderState: function (e, t) {
          return W(W({}, e), {}, { poweredBy: this.getWidgetRenderState(t) });
        },
        getWidgetRenderState: function () {
          return { url: n, widgetParams: e };
        },
        dispose: function () {
          i();
        },
      };
    };
  }
  var Ii = "ais.geoSearch",
    Fi = an({ name: "powered-by", connector: !0 }),
    Ti = an({ name: "configure", connector: !0 });
  function Ci(e, t) {
    return e.setQueryParameters(
      Object.keys(t.searchParameters).reduce(function (e, t) {
        return W(W({}, e), {}, j({}, t, void 0));
      }, {})
    );
  }
  function Ei(e, t) {
    var r = 0 < arguments.length && void 0 !== e ? e : Tt,
      a = 1 < arguments.length && void 0 !== t ? t : Tt;
    return function (i) {
      if (!i || !vt(i.searchParameters))
        throw new Error(Ti("The `searchParameters` option expects an object."));
      var n = {};
      return {
        $$type: "ais.configure",
        init: function (e) {
          var t = e.instantSearchInstance;
          r(
            W(
              W({}, this.getWidgetRenderState(e)),
              {},
              { instantSearchInstance: t }
            ),
            !0
          );
        },
        render: function (e) {
          var t = e.instantSearchInstance;
          r(
            W(
              W({}, this.getWidgetRenderState(e)),
              {},
              { instantSearchInstance: t }
            ),
            !1
          );
        },
        dispose: function (e) {
          var t = e.state;
          return a(), Ci(t, i);
        },
        getRenderState: function (e, t) {
          var n,
            r = this.getWidgetRenderState(t);
          return W(
            W({}, e),
            {},
            {
              configure: W(
                W({}, r),
                {},
                {
                  widgetParams: W(
                    W({}, r.widgetParams),
                    {},
                    {
                      searchParameters: nn(
                        new pe.SearchParameters(
                          null === (n = e.configure) || void 0 === n
                            ? void 0
                            : n.widgetParams.searchParameters
                        ),
                        new pe.SearchParameters(r.widgetParams.searchParameters)
                      ).getQueryParams(),
                    }
                  ),
                }
              ),
            }
          );
        },
        getWidgetRenderState: function (e) {
          var t = e.helper;
          return (
            n.refine ||
              (n.refine = (function (r) {
                return function (e) {
                  var t = Ci(r.state, i),
                    n = nn(t, new pe.SearchParameters(e));
                  (i.searchParameters = e), r.setState(n).search();
                };
              })(t)),
            { refine: n.refine, widgetParams: i }
          );
        },
        getWidgetSearchParameters: function (e, t) {
          var n = t.uiState;
          return nn(
            e,
            new pe.SearchParameters(W(W({}, n.configure), i.searchParameters))
          );
        },
        getWidgetUiState: function (e) {
          return W(
            W({}, e),
            {},
            { configure: W(W({}, e.configure), i.searchParameters) }
          );
        },
      };
    };
  }
  var ki = an({ name: "configure-related-items", connector: !0 });
  function ji(e) {
    var t = e.attributeName,
      n = e.attributeValue,
      r = e.attributeScore;
    return ""
      .concat(t, ":")
      .concat(n, "<score=")
      .concat(r || 1, ">");
  }
  function Li(c, u) {
    return function (e) {
      var t = e || {},
        a = t.hit,
        s = t.matchingPatterns,
        n = t.transformSearchParameters,
        r =
          void 0 === n
            ? function (e) {
                return e;
              }
            : n;
      if (!a) throw new Error(ki("The `hit` option is required."));
      if (!s) throw new Error(ki("The `matchingPatterns` option is required."));
      var i = Object.keys(s).reduce(function (e, t) {
          var n = s[t],
            r = Pt(a, t),
            i = n.score;
          return Array.isArray(r)
            ? [].concat(P(e), [
                r.map(function (e) {
                  return ji({
                    attributeName: t,
                    attributeValue: e,
                    attributeScore: i,
                  });
                }),
              ])
            : "string" == typeof r
            ? [].concat(P(e), [
                ji({ attributeName: t, attributeValue: r, attributeScore: i }),
              ])
            : e;
        }, []),
        o = W(
          {},
          r(
            new pe.SearchParameters({
              sumOrFiltersScores: !0,
              facetFilters: ["objectID:-".concat(a.objectID)],
              optionalFilters: i,
            })
          )
        );
      return W(
        W({}, Ei(c, u)({ searchParameters: o })),
        {},
        { $$type: "ais.configureRelatedItems" }
      );
    };
  }
  var Mi = an({ name: "autocomplete", connector: !0 }),
    Hi = an({ name: "query-rules", connector: !0 });
  function Oi(e) {
    var t = this.helper,
      n = this.initialRuleContexts,
      r = this.trackedFilters,
      i = this.transformRuleContexts,
      a = e.state,
      s = a.ruleContexts || [],
      o = (function (e) {
        var i = e.helper,
          a = e.sharedHelperState,
          s = e.trackedFilters;
        return Object.keys(s).reduce(function (e, t) {
          var n = Vt(i.lastResults || {}, a, !0)
              .filter(function (e) {
                return e.attribute === t;
              })
              .map(function (e) {
                return e.numericValue || e.name;
              }),
            r = (0, s[t])(n);
          return [].concat(
            P(e),
            P(
              n
                .filter(function (e) {
                  return r.includes(e);
                })
                .map(function (e) {
                  return (function (e) {
                    return e.replace(/[^a-z0-9-_]+/gi, "_");
                  })("ais-".concat(t, "-").concat(e));
                })
            )
          );
        }, []);
      })({ helper: t, sharedHelperState: a, trackedFilters: r }),
      c = i([].concat(P(n), P(o))).slice(0, 10);
    Xt(s, c) ||
      t.overrideStateWithoutTriggeringChangeEvent(
        W(W({}, a), {}, { ruleContexts: c })
      );
  }
  function Ai(d, e) {
    var h = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(d, Hi()),
      function (i) {
        var e = i || {},
          t = e.trackedFilters,
          a = void 0 === t ? {} : t,
          n = e.transformRuleContexts,
          s =
            void 0 === n
              ? function (e) {
                  return e;
                }
              : n,
          r = e.transformItems,
          o =
            void 0 === r
              ? function (e) {
                  return e;
                }
              : r;
        Object.keys(a).forEach(function (e) {
          if ("function" != typeof a[e])
            throw new Error(
              Hi(
                "'The \"".concat(
                  e,
                  '" filter value in the `trackedFilters` option expects a function.'
                )
              )
            );
        });
        var c,
          u = 0 < Object.keys(a).length,
          l = [];
        return {
          $$type: "ais.queryRules",
          init: function (e) {
            var t = e.helper,
              n = e.state,
              r = e.instantSearchInstance;
            (l = n.ruleContexts || []),
              (c = Oi.bind({
                helper: t,
                initialRuleContexts: l,
                trackedFilters: a,
                transformRuleContexts: s,
              })),
              u &&
                (((function (e) {
                  return [
                    e.disjunctiveFacetsRefinements,
                    e.facetsRefinements,
                    e.hierarchicalFacetsRefinements,
                    e.numericRefinements,
                  ].some(function (e) {
                    return Boolean(e && 0 < Object.keys(e).length);
                  });
                })(n) ||
                  Boolean(i.transformRuleContexts)) &&
                  c({ state: n }),
                t.on("change", c)),
              d(
                W(
                  W({}, this.getWidgetRenderState(e)),
                  {},
                  { instantSearchInstance: r }
                ),
                !0
              );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            d(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.results,
              n = (t || {}).userData;
            return {
              items: o(void 0 === n ? [] : n, { results: t }),
              widgetParams: i,
            };
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              { queryRules: this.getWidgetRenderState(t) }
            );
          },
          dispose: function (e) {
            var t = e.helper,
              n = e.state;
            return (
              h(),
              u
                ? (t.removeListener("change", c),
                  n.setQueryParameter("ruleContexts", l))
                : n
            );
          },
        };
      }
    );
  }
  function Wi(e) {
    function t(e) {
      return {
        status: e,
        transcript: "",
        isSpeechFinal: !1,
        errorCode: void 0,
      };
    }
    function n(e) {
      var t = 0 < arguments.length && void 0 !== e ? e : {};
      (p = W(W({}, p), t)), f();
    }
    function r(e) {
      n(t(0 < arguments.length && void 0 !== e ? e : "initial"));
    }
    function i() {
      n({ status: "waiting" });
    }
    function a(e) {
      n({ status: "error", errorCode: e.error });
    }
    function s(e) {
      n({
        status: "recognizing",
        transcript:
          (e.results[0] && e.results[0][0] && e.results[0][0].transcript) || "",
        isSpeechFinal: e.results[0] && e.results[0].isFinal,
      }),
        l && p.transcript && h(p.transcript);
    }
    function o() {
      p.errorCode || !p.transcript || l || h(p.transcript),
        "error" !== p.status && n({ status: "finished" });
    }
    function c() {
      u &&
        (u.stop(),
        u.removeEventListener("start", i),
        u.removeEventListener("error", a),
        u.removeEventListener("result", s),
        u.removeEventListener("end", o),
        (u = void 0));
    }
    var u,
      l = e.searchAsYouSpeak,
      d = e.language,
      h = e.onQueryChange,
      f = e.onStateChange,
      m = window.webkitSpeechRecognition || window.SpeechRecognition,
      p = t("initial");
    return {
      getState: function () {
        return p;
      },
      isBrowserSupported: function () {
        return Boolean(m);
      },
      isListening: function () {
        return (
          "askingPermission" === p.status ||
          "waiting" === p.status ||
          "recognizing" === p.status
        );
      },
      startListening: function () {
        (u = new m()) &&
          (r("askingPermission"),
          (u.interimResults = !0),
          d && (u.lang = d),
          u.addEventListener("start", i),
          u.addEventListener("error", a),
          u.addEventListener("result", s),
          u.addEventListener("end", o),
          u.start());
      },
      stopListening: function () {
        c(), r("finished");
      },
      dispose: c,
    };
  }
  function Di(p, e) {
    var a = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(p, Bi()),
      function (l) {
        var e = l.searchAsYouSpeak,
          d = void 0 !== e && e,
          h = l.language,
          f = l.additionalQueryParameters,
          t = l.createVoiceSearchHelper,
          m = void 0 === t ? Wi : t;
        return {
          $$type: "ais.voiceSearch",
          init: function (e) {
            var t = e.instantSearchInstance;
            p(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !0
            );
          },
          render: function (e) {
            var t = e.instantSearchInstance;
            p(
              W(
                W({}, this.getWidgetRenderState(e)),
                {},
                { instantSearchInstance: t }
              ),
              !1
            );
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              { voiceSearch: this.getWidgetRenderState(t) }
            );
          },
          getWidgetRenderState: function (e) {
            var t = this,
              n = e.helper,
              r = e.instantSearchInstance;
            this._refine ||
              (this._refine = function (e) {
                if (e !== n.state.query) {
                  var t = h ? [h.split("-")[0]] : void 0;
                  n.setQueryParameter("queryLanguages", t),
                    "function" == typeof f &&
                      n.setState(
                        n.state.setQueryParameters(
                          W(
                            {
                              ignorePlurals: !0,
                              removeStopWords: !0,
                              optionalWords: e,
                            },
                            f({ query: e })
                          )
                        )
                      ),
                    n.setQuery(e).search();
                }
              }),
              this._voiceSearchHelper ||
                (this._voiceSearchHelper = m({
                  searchAsYouSpeak: d,
                  language: h,
                  onQueryChange: function (e) {
                    return t._refine(e);
                  },
                  onStateChange: function () {
                    p(
                      W(
                        W({}, t.getWidgetRenderState(e)),
                        {},
                        { instantSearchInstance: r }
                      ),
                      !1
                    );
                  },
                }));
            var i = this._voiceSearchHelper,
              a = i.isBrowserSupported,
              s = i.isListening,
              o = i.startListening,
              c = i.stopListening,
              u = i.getState;
            return {
              isBrowserSupported: a(),
              isListening: s(),
              toggleListening: function () {
                a() && (s() ? c() : o());
              },
              voiceListeningState: u(),
              widgetParams: l,
            };
          },
          dispose: function (e) {
            var t = e.state;
            this._voiceSearchHelper.dispose(), a();
            var n = t;
            if ("function" == typeof f) {
              var r = f({ query: "" }),
                i = r
                  ? Object.keys(r).reduce(function (e, t) {
                      return (e[t] = void 0), e;
                    }, {})
                  : {};
              n = t.setQueryParameters(
                W(
                  {
                    queryLanguages: void 0,
                    ignorePlurals: void 0,
                    removeStopWords: void 0,
                    optionalWords: void 0,
                  },
                  i
                )
              );
            }
            return n.setQueryParameter("query", void 0);
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters.query || "";
            return n ? W(W({}, e), {}, { query: n }) : e;
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState;
            return e.setQueryParameter("query", n.query || "");
          },
        };
      }
    );
  }
  var Bi = an({ name: "voice-search", connector: !0 });
  function Ui(b, e) {
    var R = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(b, Vi()),
      function (e) {
        var t = e || {},
          i = t.queryLanguages,
          a = t.attributesForPrediction,
          n = t.nbHits,
          s = void 0 === n ? 1 : n,
          r = t.renderDebounceTime,
          o = void 0 === r ? 100 : r,
          c = t.searchDebounceTime,
          u = void 0 === c ? 100 : c,
          l = t.escapeHTML,
          d = void 0 === l || l,
          h = t.extraParameters,
          f = void 0 === h ? {} : h;
        if (!i || 0 === i.length)
          throw new Error(
            Vi("The `queryLanguages` expects an array of strings.")
          );
        var m,
          p = (function () {
            var n = -1,
              r = -1,
              i = void 0;
            return function (e) {
              var t = ++n;
              return Promise.resolve(e).then(function (e) {
                return i && t < r ? i : ((r = t), (i = e));
              });
            };
          })(),
          g = [],
          v = !1,
          y = gn(b, o);
        return {
          $$type: "ais.answers",
          init: function (e) {
            var t = e.state,
              n = e.instantSearchInstance.client.initIndex(t.index);
            if (
              !(function (e) {
                return "function" == typeof e.findAnswers;
              })(n)
            )
              throw new Error(Vi("`algoliasearch` >= 4.8.0 required."));
            (m = gn(n.findAnswers, u)),
              b(
                W(
                  W({}, this.getWidgetRenderState(e)),
                  {},
                  { instantSearchInstance: e.instantSearchInstance }
                ),
                !0
              );
          },
          render: function (n) {
            var r = this,
              e = n.state.query;
            if (!e)
              return (
                (v = !(g = [])),
                void b(
                  W(
                    W({}, this.getWidgetRenderState(n)),
                    {},
                    { instantSearchInstance: n.instantSearchInstance }
                  ),
                  !1
                )
              );
            (g = []),
              (v = !0),
              b(
                W(
                  W({}, this.getWidgetRenderState(n)),
                  {},
                  { instantSearchInstance: n.instantSearchInstance }
                ),
                !1
              ),
              p(
                m(
                  e,
                  i,
                  W(W({}, f), {}, { nbHits: s, attributesForPrediction: a })
                )
              ).then(function (e) {
                if (e) {
                  d && 0 < e.hits.length && (e.hits = wt(e.hits));
                  var t = un(cn(e.hits, 0, s), e.queryID);
                  (g = t),
                    (v = !1),
                    y(
                      W(
                        W({}, r.getWidgetRenderState(n)),
                        {},
                        { instantSearchInstance: n.instantSearchInstance }
                      ),
                      !1
                    );
                }
              });
          },
          getRenderState: function (e, t) {
            return W(W({}, e), {}, { answers: this.getWidgetRenderState(t) });
          },
          getWidgetRenderState: function () {
            return { hits: g, isLoading: v, widgetParams: e };
          },
          dispose: function (e) {
            var t = e.state;
            return R(), t;
          },
          getWidgetSearchParameters: function (e) {
            return e;
          },
        };
      }
    );
  }
  function qi(e, t) {
    var n = 0 < arguments.length && void 0 !== e ? e : Tt,
      r = 1 < arguments.length && void 0 !== t ? t : Tt;
    return function (a) {
      var s = {};
      return {
        $$type: "ais.relevantSort",
        init: function (e) {
          var t = e.instantSearchInstance;
          n(
            W(
              W({}, this.getWidgetRenderState(e)),
              {},
              { instantSearchInstance: t }
            ),
            !0
          );
        },
        render: function (e) {
          var t = e.instantSearchInstance;
          n(
            W(
              W({}, this.getWidgetRenderState(e)),
              {},
              { instantSearchInstance: t }
            ),
            !1
          );
        },
        dispose: function (e) {
          var t = e.state;
          return r(), t.setQueryParameter("relevancyStrictness", void 0);
        },
        getRenderState: function (e, t) {
          return W(
            W({}, e),
            {},
            { relevantSort: this.getWidgetRenderState(t) }
          );
        },
        getWidgetRenderState: function (e) {
          var t = e.results,
            n = e.helper;
          s.refine ||
            (s.refine = function (e) {
              n.setQueryParameter("relevancyStrictness", e).search();
            });
          var r = (t || {}).appliedRelevancyStrictness,
            i = void 0 !== r;
          return {
            isRelevantSorted: void 0 !== r && 0 < r,
            isVirtualReplica: i,
            canRefine: i,
            refine: s.refine,
            widgetParams: a,
          };
        },
        getWidgetSearchParameters: function (e, t) {
          var n,
            r = t.uiState;
          return e.setQueryParameter(
            "relevancyStrictness",
            null !== (n = r.relevantSort) && void 0 !== n
              ? n
              : e.relevancyStrictness
          );
        },
        getWidgetUiState: function (e, t) {
          var n = t.searchParameters;
          return W(
            W({}, e),
            {},
            { relevantSort: n.relevancyStrictness || e.relevantSort }
          );
        },
      };
    };
  }
  function Qi(d, e) {
    var s = 1 < arguments.length && void 0 !== e ? e : Tt;
    return (
      Kt(d, $i()),
      function (o) {
        var e = o.widgets,
          t = o.maxValuesPerFacet,
          n = void 0 === t ? 20 : t,
          r = o.facets,
          i = void 0 === r ? ["*"] : r,
          a = o.transformItems,
          c =
            void 0 === a
              ? function (e) {
                  return e;
                }
              : a,
          u = o.fallbackWidget;
        if (
          !(
            e &&
            Array.isArray(e) &&
            e.every(function (e) {
              return "object" === C(e);
            })
          )
        )
          throw new Error(
            $i("The `widgets` option expects an array of widgets.")
          );
        if (
          !(Array.isArray(i) && i.length <= 1) ||
          ("*" !== i[0] && void 0 !== i[0])
        )
          throw new Error(
            $i(
              'The `facets` option only accepts [] or ["*"], you passed '.concat(
                JSON.stringify(i)
              )
            )
          );
        var l = new Map();
        return {
          $$type: "ais.dynamicWidgets",
          init: function (n) {
            e.forEach(function (e) {
              var t = vn(e, n);
              l.set(t, { widget: e, isMounted: !1 });
            }),
              d(
                W(
                  W({}, this.getWidgetRenderState(n)),
                  {},
                  { instantSearchInstance: n.instantSearchInstance }
                ),
                !0
              );
          },
          render: function (e) {
            var t = e.parent,
              a = this.getWidgetRenderState(e),
              s = [],
              o = [];
            u &&
              a.attributesToRender.forEach(function (e) {
                if (!l.has(e)) {
                  var t = u({ attribute: e });
                  l.set(e, { widget: t, isMounted: !1 });
                }
              }),
              l.forEach(function (e, t) {
                var n = e.widget,
                  r = e.isMounted,
                  i = -1 < a.attributesToRender.indexOf(t);
                !r && i
                  ? (o.push(n), l.set(t, { widget: n, isMounted: !0 }))
                  : r &&
                    !i &&
                    (s.push(n), l.set(t, { widget: n, isMounted: !1 }));
              }),
              t.addWidgets(o),
              setTimeout(function () {
                return t.removeWidgets(s);
              }, 0),
              d(
                W(
                  W({}, a),
                  {},
                  { instantSearchInstance: e.instantSearchInstance }
                ),
                !1
              );
          },
          dispose: function (e) {
            var t = e.parent,
              n = [];
            l.forEach(function (e) {
              var t = e.widget;
              e.isMounted && n.push(t);
            }),
              t.removeWidgets(n),
              s();
          },
          getWidgetSearchParameters: function (e) {
            return i.reduce(
              function (e, t) {
                return e.addFacet(t);
              },
              e.setQueryParameters({
                maxValuesPerFacet: Math.max(n || 0, e.maxValuesPerFacet || 0),
              })
            );
          },
          getRenderState: function (e, t) {
            return W(
              W({}, e),
              {},
              { dynamicWidgets: this.getWidgetRenderState(t) }
            );
          },
          getWidgetRenderState: function (e) {
            var t,
              n,
              r,
              i,
              a = e.results;
            e.state;
            if (!a) return { attributesToRender: [], widgetParams: o };
            var s = c(
              null !==
                (t =
                  null === (n = a.renderingContent) || void 0 === n
                    ? void 0
                    : null === (r = n.facetOrdering) || void 0 === r
                    ? void 0
                    : null === (i = r.facets) || void 0 === i
                    ? void 0
                    : i.order) && void 0 !== t
                ? t
                : [],
              { results: a }
            );
            if (!Array.isArray(s))
              throw new Error(
                $i(
                  "The `transformItems` option expects a function that returns an Array."
                )
              );
            return { attributesToRender: s, widgetParams: o };
          },
        };
      }
    );
  }
  var Vi = an({ name: "answers", connector: !0 }),
    $i = an({ name: "dynamic-widgets", connector: !0 }),
    Ki = Ct(Qi),
    zi = Object.freeze({
      __proto__: null,
      connectDynamicWidgets: Qi,
      EXPERIMENTAL_connectDynamicWidgets: Ki,
      connectClearRefinements: br,
      connectCurrentRefinements: wr,
      connectHierarchicalMenu: Fr,
      connectHits: Tr,
      connectHitsWithInsights: Ar,
      connectHitsPerPage: Or,
      connectInfiniteHits: Ur,
      connectInfiniteHitsWithInsights: Vr,
      connectMenu: qr,
      connectNumericMenu: Qr,
      connectPagination: Gr,
      connectRange: ri,
      connectRefinementList: ii,
      connectSearchBox: si,
      connectSortBy: oi,
      connectRatingMenu: ci,
      connectStats: ui,
      connectToggleRefinement: li,
      connectBreadcrumb: di,
      connectGeoSearch: Ni,
      connectPoweredBy: xi,
      connectConfigure: Ei,
      EXPERIMENTAL_connectConfigureRelatedItems: Li,
      connectAutocomplete: function (r, e) {
        var i = 1 < arguments.length && void 0 !== e ? e : Tt;
        return (
          Kt(r, Mi()),
          function (o) {
            var e = (o || {}).escapeHTML,
              c = void 0 === e || e,
              u = {};
            return {
              $$type: "ais.autocomplete",
              init: function (e) {
                var t = e.instantSearchInstance;
                r(
                  W(
                    W({}, this.getWidgetRenderState(e)),
                    {},
                    { instantSearchInstance: t }
                  ),
                  !0
                );
              },
              render: function (e) {
                var t = e.instantSearchInstance,
                  n = this.getWidgetRenderState(e);
                n.indices.forEach(function (e) {
                  (0, e.sendEvent)("view", e.hits);
                }),
                  r(W(W({}, n), {}, { instantSearchInstance: t }), !1);
              },
              getRenderState: function (e, t) {
                return W(
                  W({}, e),
                  {},
                  { autocomplete: this.getWidgetRenderState(t) }
                );
              },
              getWidgetRenderState: function (e) {
                var n = this,
                  t = e.helper,
                  r = e.state,
                  i = e.scopedResults,
                  a = e.instantSearchInstance;
                u.refine ||
                  (u.refine = function (e) {
                    t.setQuery(e).search();
                  });
                var s = i.map(function (e) {
                  e.results.hits = c ? wt(e.results.hits) : e.results.hits;
                  var t = mn({
                    instantSearchInstance: a,
                    index: e.results.index,
                    widgetType: n.$$type,
                  });
                  return {
                    indexId: e.indexId,
                    indexName: e.results.index,
                    hits: e.results.hits,
                    results: e.results,
                    sendEvent: t,
                  };
                });
                return {
                  currentRefinement: r.query || "",
                  indices: s,
                  refine: u.refine,
                  widgetParams: o,
                };
              },
              getWidgetUiState: function (e, t) {
                var n = t.searchParameters.query || "";
                return "" === n || (e && e.query === n)
                  ? e
                  : W(W({}, e), {}, { query: n });
              },
              getWidgetSearchParameters: function (e, t) {
                var n = { query: t.uiState.query || "" };
                return c
                  ? e.setQueryParameters(W(W({}, n), yt))
                  : e.setQueryParameters(n);
              },
              dispose: function (e) {
                var t = e.state;
                i();
                var n = t.setQueryParameter("query", void 0);
                return c
                  ? n.setQueryParameters(
                      Object.keys(yt).reduce(function (e, t) {
                        return W(W({}, e), {}, j({}, t, void 0));
                      }, {})
                    )
                  : n;
              },
            };
          }
        );
      },
      connectQueryRules: Ai,
      connectVoiceSearch: Di,
      EXPERIMENTAL_connectAnswers: Ui,
      connectRelevantSort: qi,
    }),
    Ji = an({ name: "analytics" }),
    Yi = we(function (e) {
      function s() {
        for (var e = [], t = 0; t < arguments.length; t++) {
          var n = arguments[t];
          if (n) {
            var r = typeof n;
            if ("string" == r || "number" == r) e.push(n);
            else if (Array.isArray(n) && n.length) {
              var i = s.apply(null, n);
              i && e.push(i);
            } else if ("object" == r)
              for (var a in n) o.call(n, a) && n[a] && e.push(a);
          }
        }
        return e.join(" ");
      }
      var o;
      (o = {}.hasOwnProperty),
        e.exports
          ? ((s.default = s), (e.exports = s))
          : (window.classNames = s);
    }),
    Xi = (function () {
      L(t, We);
      var e = O(t);
      function t() {
        return E(this, t), e.apply(this, arguments);
      }
      return (
        k(t, [
          {
            key: "shouldComponentUpdate",
            value: function (e) {
              return (
                !Xt(this.props.data, e.data) ||
                this.props.templateKey !== e.templateKey ||
                !Xt(this.props.rootProps, e.rootProps)
              );
            },
          },
          {
            key: "render",
            value: function () {
              var e = this.props.rootTagName,
                t = this.props.useCustomCompileOptions[this.props.templateKey]
                  ? this.props.templatesConfig.compileOptions
                  : {},
                n = Bt({
                  templates: this.props.templates,
                  templateKey: this.props.templateKey,
                  compileOptions: t,
                  helpers: this.props.templatesConfig.helpers,
                  data: this.props.data,
                  bindEvent: this.props.bindEvent,
                  sendEvent: this.props.sendEvent,
                });
              return null === n
                ? null
                : "object" === C(n)
                ? He(e, this.props.rootProps, n)
                : He(
                    e,
                    h({}, this.props.rootProps, {
                      dangerouslySetInnerHTML: { __html: n },
                    })
                  );
            },
          },
        ]),
        t
      );
    })();
  j(Xi, "defaultProps", {
    data: {},
    rootTagName: "div",
    useCustomCompileOptions: {},
    templates: {},
    templatesConfig: {},
  });
  function Gi(e) {
    var r = e.items,
      i = e.cssClasses,
      a = e.templateProps,
      s = e.createURL,
      o = e.refine;
    return He(
      "div",
      { className: Yi(i.root, j({}, i.noRefinementRoot, 0 === r.length)) },
      He(
        "ul",
        { className: i.list },
        He(
          "li",
          { className: Yi(i.item, j({}, i.selectedItem, 0 === r.length)) },
          He(
            Xi,
            h({}, a, {
              templateKey: "home",
              rootTagName: "a",
              rootProps: {
                className: i.link,
                href: s(void 0),
                onClick: function (e) {
                  e.preventDefault(), o(void 0);
                },
              },
            })
          )
        ),
        r.map(function (t, e) {
          var n = e === r.length - 1;
          return He(
            "li",
            {
              key: t.label + e,
              className: Yi(i.item, j({}, i.selectedItem, n)),
            },
            He(
              Xi,
              h({}, a, {
                templateKey: "separator",
                rootTagName: "span",
                rootProps: { className: i.separator, "aria-hidden": !0 },
              })
            ),
            n
              ? t.label
              : He(
                  "a",
                  {
                    className: i.link,
                    href: s(t.value),
                    onClick: function (e) {
                      e.preventDefault(), o(t.value);
                    },
                  },
                  t.label
                )
          );
        })
      )
    );
  }
  function Zi(e) {
    var t = e.hasRefinements,
      n = e.refine,
      r = e.cssClasses,
      i = e.templateProps;
    return He(
      "div",
      { className: r.root },
      He(
        Xi,
        h({}, i, {
          templateKey: "resetLabel",
          rootTagName: "button",
          rootProps: {
            className: Yi(r.button, j({}, r.disabledButton, !t)),
            onClick: n,
            disabled: !t,
          },
          data: { hasRefinements: t },
        })
      )
    );
  }
  function ea(e) {
    var t = e.items,
      n = e.cssClasses;
    return He(
      "div",
      { className: n.root },
      He(
        "ul",
        { className: n.list },
        t.map(function (t, e) {
          return He(
            "li",
            {
              key: ""
                .concat(t.indexName, "-")
                .concat(t.attribute, "-")
                .concat(e),
              className: n.item,
            },
            He(
              "span",
              { className: n.label },
              (function (e) {
                return (
                  e.toString().charAt(0).toUpperCase() + e.toString().slice(1)
                );
              })(t.label),
              ":"
            ),
            t.refinements.map(function (e) {
              return He(
                "span",
                {
                  key: (function (e) {
                    var t = e.attribute,
                      n = e.value;
                    return [t, e.type, n, e.operator]
                      .map(function (e) {
                        return e;
                      })
                      .filter(Boolean)
                      .join(":");
                  })(e),
                  className: n.category,
                },
                He(
                  "span",
                  { className: n.categoryLabel },
                  "query" === e.attribute ? He("q", null, e.label) : e.label
                ),
                He(
                  "button",
                  {
                    className: n.delete,
                    onClick: (function (t) {
                      return function (e) {
                        be(e) || (e.preventDefault(), t());
                      };
                    })(t.refine.bind(null, e)),
                  },
                  "✕"
                )
              );
            })
          );
        })
      )
    );
  }
  function ta(e, t) {
    var n = e.items,
      r = e.widgetParams;
    if (!t) {
      var i = r,
        a = i.container,
        s = i.cssClasses;
      nt(He(ea, { cssClasses: s, items: n }), a);
    }
  }
  function na(e) {
    var t = e.hits,
      n = e.isLoading,
      r = e.cssClasses,
      i = e.templateProps;
    return He(
      "div",
      { className: Yi(r.root, j({}, r.emptyRoot, 0 === t.length)) },
      He(
        Xi,
        h({}, i, {
          templateKey: "header",
          rootProps: { className: r.header },
          data: { hits: t, isLoading: n },
        })
      ),
      n
        ? He(
            Xi,
            h({}, i, {
              templateKey: "loader",
              rootProps: { className: r.loader },
            })
          )
        : He(
            "ul",
            { className: r.list },
            t.map(function (e, t) {
              return He(
                Xi,
                h({}, i, {
                  templateKey: "item",
                  rootTagName: "li",
                  rootProps: { className: r.item },
                  key: e.objectID,
                  data: W(W({}, e), {}, { __hitIndex: t }),
                })
              );
            })
          )
    );
  }
  var ra = {
      home: function () {
        return "Home";
      },
      separator: function () {
        return ">";
      },
    },
    ia = an({ name: "breadcrumb" }),
    aa = In("Breadcrumb"),
    sa = {
      resetLabel: function () {
        return "Clear refinements";
      },
    },
    oa = an({ name: "clear-refinements" }),
    ca = In("ClearRefinements"),
    ua = an({ name: "current-refinements" }),
    la = In("CurrentRefinements"),
    da = {
      header: function () {
        return "";
      },
      loader: function () {
        return "";
      },
      item: function (e) {
        return JSON.stringify(e);
      },
    },
    ha = an({ name: "answers" }),
    fa = In("Answers"),
    ma = an({ name: "dynamic-widgets" }),
    pa = In("DynamicWidgets");
  function ga(e) {
    var t = document.createElement("div");
    return (
      (t.className = pa({ descendantName: "widget" })), e.appendChild(t), t
    );
  }
  function va(e) {
    var t = e || {},
      n = t.container,
      r = t.widgets,
      i = t.fallbackWidget,
      a = M(t, ["container", "widgets", "fallbackWidget"]);
    if (!n) throw new Error(ma("The `container` option is required."));
    if (
      !(
        r &&
        Array.isArray(r) &&
        r.every(function (e) {
          return "function" == typeof e;
        })
      )
    )
      throw new Error(
        ma("The `widgets` option expects an array of callbacks.")
      );
    var s = ye(n),
      o = document.createElement("div");
    o.className = pa();
    var c = new Map(),
      u = [],
      l = Qi(
        function (e, t) {
          var n = e.attributesToRender;
          t && s.appendChild(o),
            n.forEach(function (e) {
              if (c.has(e)) {
                var t = c.get(e);
                o.appendChild(t);
              }
            });
        },
        function () {
          s.removeChild(o);
        }
      )(
        W(
          W({}, a),
          {},
          {
            widgets: u,
            fallbackWidget:
              "function" == typeof i
                ? function (e) {
                    var t = e.attribute,
                      n = ga(o);
                    return c.set(t, n), i({ attribute: t, container: n });
                  }
                : void 0,
          }
        )
      );
    return W(
      W({}, l),
      {},
      {
        init: function (i) {
          r.forEach(function (e) {
            var t = ga(o),
              n = e(t),
              r = vn(n, i);
            c.set(r, t), u.push(n);
          }),
            l.init(i);
        },
        $$widgetType: "ais.dynamicWidgets",
      }
    );
  }
  function ya(e) {
    var t = e.className,
      n = e.disabled,
      r = void 0 !== n && n;
    return He(
      "button",
      { className: t, onClick: e.onClick, disabled: r },
      e.children
    );
  }
  function ba(e) {
    var t = e.classNameLabel,
      n = e.classNameInput,
      r = e.checked,
      i = e.onToggle,
      a = e.children;
    return He(
      "label",
      { className: t },
      He("input", { className: n, type: "checkbox", checked: r, onChange: i }),
      a
    );
  }
  function Ra(e) {
    var t = e.cssClasses,
      n = e.enableRefine,
      r = e.enableRefineControl,
      i = e.enableClearMapRefinement,
      a = e.isRefineOnMapMove,
      s = e.isRefinedWithMap,
      o = e.hasMapMoveSinceLastRefine,
      c = e.onRefineToggle,
      u = e.onRefineClick,
      l = e.onClearClick,
      d = e.templateProps;
    return He(
      Ae,
      null,
      n &&
        He(
          "div",
          null,
          r &&
            He(
              "div",
              { className: t.control },
              a || !o
                ? He(
                    ba,
                    {
                      classNameLabel: Yi(t.label, j({}, t.selectedLabel, a)),
                      classNameInput: t.input,
                      checked: a,
                      onToggle: c,
                    },
                    He(
                      Xi,
                      h({}, d, { templateKey: "toggle", rootTagName: "span" })
                    )
                  )
                : He(
                    ya,
                    { className: t.redo, disabled: !o, onClick: u },
                    He(
                      Xi,
                      h({}, d, { templateKey: "redo", rootTagName: "span" })
                    )
                  )
            ),
          !r &&
            !a &&
            He(
              "div",
              { className: t.control },
              He(
                ya,
                {
                  className: Yi(t.redo, j({}, t.disabledRedo, !o)),
                  disabled: !o,
                  onClick: u,
                },
                He(Xi, h({}, d, { templateKey: "redo", rootTagName: "span" }))
              )
            ),
          i &&
            s &&
            He(
              ya,
              { className: t.reset, onClick: l },
              He(Xi, h({}, d, { templateKey: "reset", rootTagName: "span" }))
            )
        )
    );
  }
  function Sa(e) {
    var t = e.refine,
      n = e.mapInstance;
    return t({
      northEast: n.getBounds().getNorthEast().toJSON(),
      southWest: n.getBounds().getSouthWest().toJSON(),
    });
  }
  function wa(e, t) {
    (e.isUserInteraction = !1), t(), (e.isUserInteraction = !0);
  }
  function _a(e, t) {
    var n = e.items,
      r = e.position,
      i = e.currentRefinement,
      a = e.refine,
      s = e.clearMapRefinement,
      o = e.toggleRefineOnMapMove,
      c = e.isRefineOnMapMove,
      u = e.setMapMoveSinceLastRefine,
      l = e.hasMapMoveSinceLastRefine,
      d = e.isRefinedWithMap,
      h = e.widgetParams,
      f = e.instantSearchInstance,
      m = h.container,
      p = h.googleReference,
      g = h.cssClasses,
      v = h.templates,
      y = h.initialZoom,
      b = h.initialPosition,
      R = h.enableRefine,
      S = h.enableClearMapRefinement,
      w = h.enableRefineControl,
      _ = h.mapOptions,
      P = h.createMarker,
      N = h.markerOptions,
      x = h.renderState;
    if (t) {
      (x.isUserInteraction = !0), (x.isPendingRefine = !1), (x.markers = []);
      var I = document.createElement("div");
      (I.className = g.root), m.appendChild(I);
      var F = document.createElement("div");
      (F.className = g.map), I.appendChild(F);
      var T = document.createElement("div");
      (T.className = g.tree),
        I.appendChild(T),
        (x.mapInstance = new p.maps.Map(
          F,
          W(
            {
              mapTypeControl: !1,
              fullscreenControl: !1,
              streetViewControl: !1,
              clickableIcons: !1,
              zoomControlOptions: { position: p.maps.ControlPosition.LEFT_TOP },
            },
            _
          )
        ));
      return (
        p.maps.event.addListenerOnce(x.mapInstance, "idle", function () {
          function e() {
            x.isUserInteraction && R && (u(), c() && (x.isPendingRefine = !0));
          }
          x.mapInstance.addListener("center_changed", e),
            x.mapInstance.addListener("zoom_changed", e),
            x.mapInstance.addListener("dragstart", e),
            x.mapInstance.addListener("idle", function () {
              x.isUserInteraction &&
                x.isPendingRefine &&
                ((x.isPendingRefine = !1),
                Sa({ mapInstance: x.mapInstance, refine: a }));
            });
        }),
        void (x.templateProps = Se({
          templatesConfig: f.templatesConfig,
          templates: v,
        }))
      );
    }
    var C = n.map(function (e) {
        return e.objectID;
      }),
      E = D(
        (function (e, a) {
          return e.reduce(
            function (e, t) {
              var n = D(e, 2),
                r = n[0],
                i = n[1];
              return a.includes(t.__id) ? [r.concat(t), i] : [r, i.concat(t)];
            },
            [[], []]
          );
        })(x.markers, C),
        2
      ),
      k = E[0],
      j = E[1],
      L = k.map(function (e) {
        return e.__id;
      }),
      M = n.filter(function (e) {
        return !L.includes(e.objectID);
      });
    j.forEach(function (e) {
      return e.setMap(null);
    }),
      (x.markers = k.concat(
        M.map(function (n) {
          var r = P({ map: x.mapInstance, item: n });
          return (
            Object.keys(N.events).forEach(function (t) {
              r.addListener(t, function (e) {
                N.events[t]({
                  map: x.mapInstance,
                  event: e,
                  item: n,
                  marker: r,
                });
              });
            }),
            r
          );
        })
      ));
    var H = !l(),
      O = i ? 0 : null,
      A =
        !i && Boolean(x.markers.length)
          ? (function (e, t) {
              var n = t.reduce(function (e, t) {
                return e.extend(t.getPosition());
              }, new e.maps.LatLngBounds());
              return {
                northEast: n.getNorthEast().toJSON(),
                southWest: n.getSouthWest().toJSON(),
              };
            })(p, x.markers)
          : i;
    A && H
      ? wa(x, function () {
          x.mapInstance.fitBounds(
            new p.maps.LatLngBounds(A.southWest, A.northEast),
            O
          );
        })
      : H &&
        wa(x, function () {
          x.mapInstance.setCenter(r || b), x.mapInstance.setZoom(y);
        }),
      nt(
        He(Ra, {
          cssClasses: g,
          enableRefine: R,
          enableRefineControl: w,
          enableClearMapRefinement: S,
          isRefineOnMapMove: c(),
          isRefinedWithMap: d(),
          hasMapMoveSinceLastRefine: l(),
          onRefineToggle: o,
          onRefineClick: function () {
            return Sa({ mapInstance: x.mapInstance, refine: a });
          },
          onClearClick: s,
          templateProps: x.templateProps,
        }),
        m.querySelector(".".concat(g.tree))
      );
  }
  var Pa = He("p", null, "Your custom HTML Marker"),
    Na = {
      HTMLMarker: function () {
        return Pa;
      },
      reset: function () {
        return "Clear the map refinement";
      },
      toggle: function () {
        return "Search as I move the map";
      },
      redo: function () {
        return "Redo search here";
      },
    },
    xa = an({ name: "geo-search" }),
    Ia = In("GeoSearch");
  function Fa(e) {
    var t = e.className,
      n = e.handleClick,
      r = e.facetValueToRefine,
      i = e.isRefined,
      a = e.templateProps,
      s = e.templateKey,
      o = e.templateData,
      c = e.subItems;
    return He(
      "li",
      {
        className: t,
        onClick: function (e) {
          n({ facetValueToRefine: r, isRefined: i, originalEvent: e });
        },
      },
      He(Xi, h({}, a, { templateKey: s, data: o })),
      c
    );
  }
  var Ta = {
      query: "",
      showSubmit: !0,
      showReset: !0,
      showLoadingIndicator: !0,
      autofocus: !1,
      searchAsYouType: !0,
      isSearchStalled: !1,
      disabled: !1,
      onChange: Tt,
      onSubmit: Tt,
      onReset: Tt,
      refine: Tt,
    },
    Ca = (function () {
      L(i, We);
      var r = O(i);
      function i() {
        var s;
        E(this, i);
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return (
          j(H((s = r.call.apply(r, [this].concat(t)))), "state", {
            query: s.props.query,
            focused: !1,
          }),
          j(H(s), "input", { current: null }),
          j(H(s), "onInput", function (e) {
            var t = s.props,
              n = t.searchAsYouType,
              r = t.refine,
              i = t.onChange,
              a = e.target.value;
            n && r(a), s.setState({ query: a }), i(e);
          }),
          j(H(s), "onSubmit", function (e) {
            var t = s.props,
              n = t.searchAsYouType,
              r = t.refine,
              i = t.onSubmit;
            return (
              e.preventDefault(),
              e.stopPropagation(),
              s.input.current && s.input.current.blur(),
              n || r(s.state.query),
              i(e),
              !1
            );
          }),
          j(H(s), "onReset", function (e) {
            var t = s.props,
              n = t.refine,
              r = t.onReset;
            s.input.current && s.input.current.focus(),
              n(""),
              s.setState({ query: "" }),
              r(e);
          }),
          j(H(s), "onBlur", function () {
            s.setState({ focused: !1 });
          }),
          j(H(s), "onFocus", function () {
            s.setState({ focused: !0 });
          }),
          s
        );
      }
      return (
        k(i, [
          {
            key: "resetInput",
            value: function () {
              this.setState({ query: "" });
            },
          },
          {
            key: "componentWillReceiveProps",
            value: function (e) {
              this.state.focused ||
                e.query === this.state.query ||
                this.setState({ query: e.query });
            },
          },
          {
            key: "render",
            value: function () {
              var e = this.props,
                t = e.cssClasses,
                n = e.placeholder,
                r = e.autofocus,
                i = e.showSubmit,
                a = e.showReset,
                s = e.showLoadingIndicator,
                o = e.templates,
                c = e.isSearchStalled;
              return He(
                "div",
                { className: t.root },
                He(
                  "form",
                  {
                    action: "",
                    role: "search",
                    className: t.form,
                    noValidate: !0,
                    onSubmit: this.onSubmit,
                    onReset: this.onReset,
                  },
                  He("input", {
                    ref: this.input,
                    value: this.state.query,
                    disabled: this.props.disabled,
                    className: t.input,
                    type: "search",
                    placeholder: n,
                    autoFocus: r,
                    autoComplete: "off",
                    autoCorrect: "off",
                    autoCapitalize: "off",
                    spellCheck: "false",
                    maxLength: 512,
                    onInput: this.onInput,
                    onBlur: this.onBlur,
                    onFocus: this.onFocus,
                  }),
                  He(Xi, {
                    templateKey: "submit",
                    rootTagName: "button",
                    rootProps: {
                      className: t.submit,
                      type: "submit",
                      title: "Submit the search query.",
                      hidden: !i,
                    },
                    templates: o,
                    data: { cssClasses: t },
                  }),
                  He(Xi, {
                    templateKey: "reset",
                    rootTagName: "button",
                    rootProps: {
                      className: t.reset,
                      type: "reset",
                      title: "Clear the search query.",
                      hidden: !(a && this.state.query.trim() && !c),
                    },
                    templates: o,
                    data: { cssClasses: t },
                  }),
                  s &&
                    He(Xi, {
                      templateKey: "loadingIndicator",
                      rootTagName: "span",
                      rootProps: { className: t.loadingIndicator, hidden: !c },
                      templates: o,
                      data: { cssClasses: t },
                    })
                )
              );
            },
          },
        ]),
        i
      );
    })();
  j(Ca, "defaultProps", Ta);
  function Ea(e) {
    return void 0 !== e.data;
  }
  var ka = (function () {
    L(u, We);
    var n = O(u);
    function u(e) {
      var t;
      return (
        E(this, u),
        j(H((t = n.call(this, e))), "searchBox", { current: null }),
        (t.handleItemClick = t.handleItemClick.bind(H(t))),
        t
      );
    }
    return (
      k(u, [
        {
          key: "shouldComponentUpdate",
          value: function (e) {
            return !Xt(this.props.facetValues, e.facetValues);
          },
        },
        {
          key: "refine",
          value: function (e) {
            this.props.toggleRefinement(e);
          },
        },
        {
          key: "_generateFacetItem",
          value: function (e) {
            var t, n;
            if (Ea(e) && Array.isArray(e.data) && 0 < e.data.length) {
              var r = this.props.cssClasses,
                i = (r.root, M(r, ["root"]));
              n = He(
                u,
                h({}, this.props, {
                  cssClasses: i,
                  depth: this.props.depth + 1,
                  facetValues: e.data,
                  showMore: !1,
                  className: this.props.cssClasses.childList,
                })
              );
            }
            var a = this.props.createURL(e.value),
              s = W(
                W({}, e),
                {},
                {
                  url: a,
                  attribute: this.props.attribute,
                  cssClasses: this.props.cssClasses,
                  isFromSearch: this.props.isFromSearch,
                }
              ),
              o = e.value;
            void 0 !== e.isRefined && (o += "/".concat(e.isRefined)),
              void 0 !== e.count && (o += "/".concat(e.count));
            var c = Yi(
              this.props.cssClasses.item,
              (j((t = {}), this.props.cssClasses.selectedItem, e.isRefined),
              j(t, this.props.cssClasses.disabledItem, !e.count),
              j(
                t,
                this.props.cssClasses.parentItem,
                Ea(e) && Array.isArray(e.data) && 0 < e.data.length
              ),
              t)
            );
            return He(Fa, {
              templateKey: "item",
              key: o,
              facetValueToRefine: e.value,
              handleClick: this.handleItemClick,
              isRefined: e.isRefined,
              className: c,
              subItems: n,
              templateData: s,
              templateProps: this.props.templateProps,
            });
          },
        },
        {
          key: "handleItemClick",
          value: function (e) {
            var t = e.facetValueToRefine,
              n = e.isRefined,
              r = e.originalEvent;
            if (
              !be(r) &&
              r.target instanceof HTMLElement &&
              r.target.parentNode instanceof HTMLElement &&
              (!n ||
                !r.target.parentNode.querySelector(
                  'input[type="radio"]:checked'
                ))
            )
              if ("INPUT" !== r.target.tagName) {
                for (var i = r.target; i !== r.currentTarget; ) {
                  if (
                    "LABEL" === i.tagName &&
                    (i.querySelector('input[type="checkbox"]') ||
                      i.querySelector('input[type="radio"]'))
                  )
                    return;
                  "A" === i.tagName && i.href && r.preventDefault(),
                    (i = i.parentNode);
                }
                r.stopPropagation(), this.refine(t);
              } else this.refine(t);
          },
        },
        {
          key: "componentWillReceiveProps",
          value: function (e) {
            this.searchBox.current &&
              !e.isFromSearch &&
              this.searchBox.current.resetInput();
          },
        },
        {
          key: "refineFirstValue",
          value: function () {
            var e = this.props.facetValues && this.props.facetValues[0];
            if (e) {
              var t = e.value;
              this.props.toggleRefinement(t);
            }
          },
        },
        {
          key: "render",
          value: function () {
            var t = this,
              e = Yi(
                this.props.cssClasses.showMore,
                j(
                  {},
                  this.props.cssClasses.disabledShowMore,
                  !(!0 === this.props.showMore && this.props.canToggleShowMore)
                )
              ),
              n =
                !0 === this.props.showMore &&
                He(
                  Xi,
                  h({}, this.props.templateProps, {
                    templateKey: "showMoreText",
                    rootTagName: "button",
                    rootProps: {
                      className: e,
                      disabled: !this.props.canToggleShowMore,
                      onClick: this.props.toggleShowMore,
                    },
                    data: { isShowingMore: this.props.isShowingMore },
                  })
                ),
              r =
                !0 !== this.props.searchIsAlwaysActive &&
                !(this.props.isFromSearch || !this.props.hasExhaustiveItems),
              i =
                this.props.searchFacetValues &&
                He(
                  "div",
                  { className: this.props.cssClasses.searchBox },
                  He(Ca, {
                    ref: this.searchBox,
                    placeholder: this.props.searchPlaceholder,
                    disabled: r,
                    cssClasses: this.props.cssClasses.searchable,
                    templates: this.props.searchBoxTemplateProps.templates,
                    onChange: function (e) {
                      return t.props.searchFacetValues(e.target.value);
                    },
                    onReset: function () {
                      return t.props.searchFacetValues("");
                    },
                    onSubmit: function () {
                      return t.refineFirstValue();
                    },
                    searchAsYouType: !1,
                  })
                ),
              a =
                this.props.facetValues &&
                0 < this.props.facetValues.length &&
                He(
                  "ul",
                  { className: this.props.cssClasses.list },
                  this.props.facetValues.map(this._generateFacetItem, this)
                ),
              s =
                this.props.searchFacetValues &&
                this.props.isFromSearch &&
                (!this.props.facetValues ||
                  0 === this.props.facetValues.length) &&
                He(
                  Xi,
                  h({}, this.props.templateProps, {
                    templateKey: "searchableNoResults",
                    rootProps: { className: this.props.cssClasses.noResults },
                  })
                );
            return He(
              "div",
              {
                className: Yi(
                  this.props.cssClasses.root,
                  j(
                    {},
                    this.props.cssClasses.noRefinementRoot,
                    !this.props.facetValues ||
                      0 === this.props.facetValues.length
                  ),
                  this.props.className
                ),
              },
              this.props.children,
              i,
              a,
              s,
              n
            );
          },
        },
      ]),
      u
    );
  })();
  j(ka, "defaultProps", { cssClasses: {}, depth: 0 });
  var ja = {
      item: function (e) {
        var t = e.url,
          n = e.label,
          r = e.count,
          i = e.cssClasses;
        return He(
          "a",
          { className: bn(i.link), href: t },
          He("span", { className: bn(i.label) }, n),
          He("span", { className: bn(i.count) }, An(r))
        );
      },
      showMoreText: function (e) {
        return e.isShowingMore ? "Show less" : "Show more";
      },
    },
    La = an({ name: "hierarchical-menu" }),
    Ma = In("HierarchicalMenu"),
    Ha = {
      empty: function () {
        return "No results";
      },
      item: function (e) {
        return JSON.stringify(e, null, 2);
      },
    },
    Oa = an({ name: "hits" }),
    Aa = In("Hits"),
    Wa = Hr(function (e) {
      var t = e.results,
        n = e.hits,
        r = e.bindEvent,
        i = e.sendEvent,
        a = e.cssClasses,
        s = e.templateProps;
      return 0 === t.hits.length
        ? He(
            Xi,
            h({}, s, {
              templateKey: "empty",
              rootProps: { className: Yi(a.root, a.emptyRoot) },
              data: t,
            })
          )
        : He(
            "div",
            { className: a.root },
            He(
              "ol",
              { className: a.list },
              n.map(function (e, t) {
                return He(
                  Xi,
                  h({}, s, {
                    templateKey: "item",
                    rootTagName: "li",
                    rootProps: { className: a.item },
                    key: e.objectID,
                    data: W(W({}, e), {}, { __hitIndex: t }),
                    bindEvent: r,
                    sendEvent: i,
                  })
                );
              })
            )
          );
    });
  function Da(e) {
    var t = e.currentValue,
      n = e.options,
      r = e.cssClasses,
      i = e.setValue;
    return He(
      "select",
      {
        className: Yi(r.select),
        onChange: function (e) {
          return i(e.target.value);
        },
        value: "".concat(t),
      },
      n.map(function (e) {
        return He(
          "option",
          {
            className: Yi(r.option),
            key: e.label + e.value,
            value: "".concat(e.value),
          },
          e.label
        );
      })
    );
  }
  var Ba = an({ name: "hits-per-page" }),
    Ua = In("HitsPerPage"),
    qa = {
      empty: function () {
        return "No results";
      },
      showPreviousText: function () {
        return "Show previous results";
      },
      showMoreText: function () {
        return "Show more results";
      },
      item: function (e) {
        return JSON.stringify(e, null, 2);
      },
    },
    Qa = an({ name: "infinite-hits" }),
    Va = In("InfiniteHits"),
    $a = Hr(function (e) {
      var t = e.results,
        n = e.hits,
        r = e.bindEvent,
        i = e.sendEvent,
        a = e.hasShowPrevious,
        s = e.showPrevious,
        o = e.showMore,
        c = e.isFirstPage,
        u = e.isLastPage,
        l = e.cssClasses,
        d = e.templateProps;
      return 0 === t.hits.length
        ? He(
            Xi,
            h({}, d, {
              templateKey: "empty",
              rootProps: { className: Yi(l.root, l.emptyRoot) },
              data: t,
            })
          )
        : He(
            "div",
            { className: l.root },
            a &&
              He(
                Xi,
                h({}, d, {
                  templateKey: "showPreviousText",
                  rootTagName: "button",
                  rootProps: {
                    className: Yi(
                      l.loadPrevious,
                      j({}, l.disabledLoadPrevious, c)
                    ),
                    disabled: c,
                    onClick: s,
                  },
                })
              ),
            He(
              "ol",
              { className: l.list },
              n.map(function (e, t) {
                return He(
                  Xi,
                  h({}, d, {
                    templateKey: "item",
                    rootTagName: "li",
                    rootProps: { className: l.item },
                    key: e.objectID,
                    data: W(W({}, e), {}, { __hitIndex: t }),
                    bindEvent: r,
                    sendEvent: i,
                  })
                );
              })
            ),
            He(
              Xi,
              h({}, d, {
                templateKey: "showMoreText",
                rootTagName: "button",
                rootProps: {
                  className: Yi(l.loadMore, j({}, l.disabledLoadMore, u)),
                  disabled: u,
                  onClick: o,
                },
              })
            )
          );
    }),
    Ka = {
      item: function (e) {
        var t = e.cssClasses,
          n = e.url,
          r = e.label,
          i = e.count;
        return He(
          "a",
          { className: bn(t.link), href: n },
          He("span", { className: bn(t.label) }, r),
          He("span", { className: bn(t.count) }, An(i))
        );
      },
      showMoreText: function (e) {
        return e.isShowingMore ? "Show less" : "Show more";
      },
    },
    za = an({ name: "menu" }),
    Ja = In("Menu");
  function Ya(e) {
    var t = e.cssClasses,
      n = e.templateProps,
      r = e.items,
      i = e.refine,
      a = (
        Ut(r, function (e) {
          return e.isRefined;
        }) || { value: "" }
      ).value;
    return He(
      "div",
      { className: Yi(t.root, j({}, t.noRefinementRoot, 0 === r.length)) },
      He(
        "select",
        {
          className: t.select,
          value: a,
          onChange: function (e) {
            i(e.target.value);
          },
        },
        He(
          Xi,
          h({}, n, {
            templateKey: "defaultOption",
            rootTagName: "option",
            rootProps: { value: "", className: t.option },
          })
        ),
        r.map(function (e) {
          return He(
            Xi,
            h({}, n, {
              templateKey: "item",
              rootTagName: "option",
              rootProps: { value: e.value, className: t.option },
              key: e.value,
              data: e,
            })
          );
        })
      )
    );
  }
  var Xa = {
      item: function (e) {
        var t = e.label,
          n = e.count;
        return "".concat(t, " (").concat(An(n), ")");
      },
      defaultOption: function () {
        return "See all";
      },
    },
    Ga = an({ name: "menu-select" }),
    Za = In("MenuSelect"),
    es = {
      item: function (e) {
        var t = e.cssClasses,
          n = e.attribute,
          r = e.label,
          i = e.isRefined;
        return He(
          "label",
          { className: t.label },
          He("input", {
            type: "radio",
            className: t.radio,
            name: n,
            defaultChecked: i,
          }),
          He("span", { className: t.labelText }, r)
        );
      },
    },
    ts = an({ name: "numeric-menu" }),
    ns = In("NumericMenu");
  function rs(n) {
    function t(t) {
      return function (e) {
        be(e) || (e.preventDefault(), n.setCurrentPage(t));
      };
    }
    return He(
      "div",
      {
        className: Yi(
          n.cssClasses.root,
          j({}, n.cssClasses.noRefinementRoot, n.nbPages <= 1)
        ),
      },
      He(
        "ul",
        { className: n.cssClasses.list },
        n.showFirst &&
          He(is, {
            ariaLabel: "First",
            className: n.cssClasses.firstPageItem,
            isDisabled: n.isFirstPage,
            label: n.templates.first,
            pageNumber: 0,
            createURL: n.createURL,
            cssClasses: n.cssClasses,
            createClickHandler: t,
          }),
        n.showPrevious &&
          He(is, {
            ariaLabel: "Previous",
            className: n.cssClasses.previousPageItem,
            isDisabled: n.isFirstPage,
            label: n.templates.previous,
            pageNumber: n.currentPage - 1,
            createURL: n.createURL,
            cssClasses: n.cssClasses,
            createClickHandler: t,
          }),
        n.pages.map(function (e) {
          return He(is, {
            key: e,
            ariaLabel: "".concat(e + 1),
            className: n.cssClasses.pageItem,
            isSelected: e === n.currentPage,
            label: "".concat(e + 1),
            pageNumber: e,
            createURL: n.createURL,
            cssClasses: n.cssClasses,
            createClickHandler: t,
          });
        }),
        n.showNext &&
          He(is, {
            ariaLabel: "Next",
            className: n.cssClasses.nextPageItem,
            isDisabled: n.isLastPage,
            label: n.templates.next,
            pageNumber: n.currentPage + 1,
            createURL: n.createURL,
            cssClasses: n.cssClasses,
            createClickHandler: t,
          }),
        n.showLast &&
          He(is, {
            ariaLabel: "Last",
            className: n.cssClasses.lastPageItem,
            isDisabled: n.isLastPage,
            label: n.templates.last,
            pageNumber: n.nbPages - 1,
            createURL: n.createURL,
            cssClasses: n.cssClasses,
            createClickHandler: t,
          })
      )
    );
  }
  function is(e) {
    var t = e.label,
      n = e.ariaLabel,
      r = e.pageNumber,
      i = e.className,
      a = e.isDisabled,
      s = void 0 !== a && a,
      o = e.isSelected,
      c = void 0 !== o && o,
      u = e.cssClasses,
      l = e.createURL,
      d = e.createClickHandler;
    return He(
      "li",
      { className: Yi(u.item, i, s && u.disabledItem, c && u.selectedItem) },
      s
        ? He("span", {
            className: u.link,
            dangerouslySetInnerHTML: { __html: t },
          })
        : He("a", {
            className: u.link,
            "aria-label": n,
            href: l(r),
            onClick: d(r),
            dangerouslySetInnerHTML: { __html: t },
          })
    );
  }
  var as,
    ss,
    os,
    cs,
    us = In("Pagination"),
    ls = an({ name: "pagination" }),
    ds = { previous: "‹", next: "›", first: "«", last: "»" },
    hs = 0,
    fs = [],
    ms = [],
    ps = xe.__b,
    gs = xe.__r,
    vs = xe.diffed,
    ys = xe.__c,
    bs = xe.unmount;
  function Rs(e, t) {
    xe.__h && xe.__h(ss, e, hs || t), (hs = 0);
    var n = ss.__H || (ss.__H = { __: [], __h: [] });
    return e >= n.__.length && n.__.push({ __V: ms }), n.__[e];
  }
  function Ss(e) {
    return (
      (hs = 1),
      (function (e, t, n) {
        var i = Rs(as++, 2);
        if (
          ((i.t = e),
          !i.__c &&
            ((i.__ = [
              n ? n(t) : Fs(void 0, t),
              function (e) {
                var t = i.__N ? i.__N[0] : i.__[0],
                  n = i.t(t, e);
                t !== n && ((i.__N = [n, i.__[1]]), i.__c.setState({}));
              },
            ]),
            !(i.__c = ss).u))
        ) {
          ss.u = !0;
          var a = ss.shouldComponentUpdate;
          ss.shouldComponentUpdate = function (e, t, n) {
            if (!i.__c.__H) return !0;
            var r = i.__c.__H.__.filter(function (e) {
              return e.__c;
            });
            return r.every(function (e) {
              return !e.__N;
            })
              ? !a || a.call(this, e, t, n)
              : !r.every(function (e) {
                  if (!e.__N) return !0;
                  var t = e.__[0];
                  return (e.__ = e.__N), (e.__N = void 0), t === e.__[0];
                }) &&
                  (!a || a.call(this, e, t, n));
          };
        }
        return i.__N || i.__;
      })(Fs, e)
    );
  }
  function ws(e) {
    return (
      (hs = 5),
      (function (e, t) {
        var n = Rs(as++, 7);
        return Is(n.__H, t)
          ? ((n.__V = e()), (n.i = t), (n.__h = e), n.__V)
          : n.__;
      })(function () {
        return { current: e };
      }, [])
    );
  }
  function _s() {
    for (var t; (t = fs.shift()); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(Ns), t.__H.__h.forEach(xs), (t.__H.__h = []);
        } catch (e) {
          (t.__H.__h = []), xe.__e(e, t.__v);
        }
  }
  (xe.__b = function (e) {
    (ss = null), ps && ps(e);
  }),
    (xe.__r = function (e) {
      gs && gs(e), (as = 0);
      var t = (ss = e.__c).__H;
      t &&
        (os === ss
          ? ((t.__h = []),
            (ss.__h = []),
            t.__.forEach(function (e) {
              e.__N && (e.__ = e.__N), (e.__V = ms), (e.__N = e.i = void 0);
            }))
          : (t.__h.forEach(Ns), t.__h.forEach(xs), (t.__h = []))),
        (os = ss);
    }),
    (xe.diffed = function (e) {
      vs && vs(e);
      var t = e.__c;
      t &&
        t.__H &&
        (t.__H.__h.length &&
          ((1 !== fs.push(t) && cs === xe.requestAnimationFrame) ||
            (
              (cs = xe.requestAnimationFrame) ||
              function (e) {
                function t() {
                  clearTimeout(r), Ps && cancelAnimationFrame(n), setTimeout(e);
                }
                var n,
                  r = setTimeout(t, 100);
                Ps && (n = requestAnimationFrame(t));
              }
            )(_s)),
        t.__H.__.forEach(function (e) {
          e.i && (e.__H = e.i),
            e.__V !== ms && (e.__ = e.__V),
            (e.i = void 0),
            (e.__V = ms);
        })),
        (os = ss = null);
    }),
    (xe.__c = function (e, n) {
      n.some(function (t) {
        try {
          t.__h.forEach(Ns),
            (t.__h = t.__h.filter(function (e) {
              return !e.__ || xs(e);
            }));
        } catch (e) {
          n.some(function (e) {
            e.__h && (e.__h = []);
          }),
            (n = []),
            xe.__e(e, t.__v);
        }
      }),
        ys && ys(e, n);
    }),
    (xe.unmount = function (e) {
      bs && bs(e);
      var t,
        n = e.__c;
      n &&
        n.__H &&
        (n.__H.__.forEach(function (e) {
          try {
            Ns(e);
          } catch (e) {
            t = e;
          }
        }),
        t && xe.__e(t, n.__v));
    });
  var Ps = "function" == typeof requestAnimationFrame;
  function Ns(e) {
    var t = ss,
      n = e.__c;
    "function" == typeof n && ((e.__c = void 0), n()), (ss = t);
  }
  function xs(e) {
    var t = ss;
    (e.__c = e.__()), (ss = t);
  }
  function Is(n, e) {
    return (
      !n ||
      n.length !== e.length ||
      e.some(function (e, t) {
        return e !== n[t];
      })
    );
  }
  function Fs(e, t) {
    return "function" == typeof t ? t(e) : t;
  }
  function Ts(t) {
    var e,
      n = D(Ss(t.isCollapsed), 2),
      r = n[0],
      i = n[1],
      a = D(Ss(!1), 2),
      s = a[0],
      o = a[1],
      c = ws(null);
    return (
      (function (e, t) {
        var n = Rs(as++, 3);
        !xe.__s && Is(n.__H, t) && ((n.__ = e), (n.i = t), ss.__H.__h.push(n));
      })(
        function () {
          var e = c.current;
          if (e)
            return (
              e.appendChild(t.bodyElement),
              function () {
                e.removeChild(t.bodyElement);
              }
            );
        },
        [c, t.bodyElement]
      ),
      s || t.isCollapsed === r || i(t.isCollapsed),
      He(
        "div",
        {
          className: Yi(
            t.cssClasses.root,
            ((e = {}),
            j(e, t.cssClasses.noRefinementRoot, t.hidden),
            j(e, t.cssClasses.collapsibleRoot, t.collapsible),
            j(e, t.cssClasses.collapsedRoot, r),
            e)
          ),
          hidden: t.hidden,
        },
        t.templates.header &&
          He(
            "div",
            { className: t.cssClasses.header },
            He(Xi, {
              templates: t.templates,
              templateKey: "header",
              rootTagName: "span",
              data: t.data,
            }),
            t.collapsible &&
              He(
                "button",
                {
                  className: t.cssClasses.collapseButton,
                  "aria-expanded": !r,
                  onClick: function (e) {
                    e.preventDefault(),
                      o(!0),
                      i(function (e) {
                        return !e;
                      });
                  },
                },
                He(Xi, {
                  templates: t.templates,
                  templateKey: "collapseButtonText",
                  rootTagName: "span",
                  data: { collapsed: r },
                })
              )
          ),
        He("div", { className: t.cssClasses.body, ref: c }),
        t.templates.footer &&
          He(Xi, {
            templates: t.templates,
            templateKey: "footer",
            rootProps: { className: t.cssClasses.footer },
            data: t.data,
          })
      )
    );
  }
  function Cs(e) {
    var t = e.url,
      n = e.theme,
      r = e.cssClasses;
    return He(
      "div",
      { className: r.root },
      He(
        "a",
        {
          href: t,
          target: "_blank",
          className: r.link,
          "aria-label": "Search by Algolia",
          rel: "noopener noreferrer",
        },
        He(
          "svg",
          {
            height: "1.2em",
            className: r.logo,
            viewBox: "0 0 168 24",
            style: { width: "auto" },
          },
          He("path", {
            fill: "dark" === n ? "#FFF" : "#5D6494",
            d: "M6.97 6.68V8.3a4.47 4.47 0 00-2.42-.67 2.2 2.2 0 00-1.38.4c-.34.26-.5.6-.5 1.02 0 .43.16.77.49 1.03.33.25.83.53 1.51.83a7.04 7.04 0 011.9 1.08c.34.24.58.54.73.89.15.34.23.74.23 1.18 0 .95-.33 1.7-1 2.24a4 4 0 01-2.6.81 5.71 5.71 0 01-2.94-.68v-1.71c.84.63 1.81.94 2.92.94.58 0 1.05-.14 1.39-.4.34-.28.5-.65.5-1.13 0-.29-.1-.55-.3-.8a2.2 2.2 0 00-.65-.53 23.03 23.03 0 00-1.64-.78 13.67 13.67 0 01-1.11-.64c-.12-.1-.28-.22-.46-.4a1.72 1.72 0 01-.39-.5 4.46 4.46 0 01-.22-.6c-.07-.23-.1-.48-.1-.75 0-.91.33-1.63 1-2.17a4 4 0 012.57-.8c.97 0 1.8.18 2.47.52zm7.47 5.7v-.3a2.26 2.26 0 00-.5-1.44c-.3-.35-.74-.53-1.32-.53-.53 0-.99.2-1.37.58a2.9 2.9 0 00-.72 1.68h3.91zm1 2.79v1.4c-.6.34-1.38.51-2.36.51a4.02 4.02 0 01-3-1.13 4.04 4.04 0 01-1.11-2.97c0-1.3.34-2.32 1.02-3.06a3.38 3.38 0 012.6-1.1c1.03 0 1.85.32 2.46.96.6.64.9 1.57.9 2.78 0 .33-.03.68-.09 1.04h-5.31c.1.7.4 1.24.89 1.61.49.38 1.1.56 1.85.56.86 0 1.58-.2 2.15-.6zm6.61-1.78h-1.21c-.6 0-1.05.12-1.35.36-.3.23-.46.53-.46.89 0 .37.12.66.36.88.23.2.57.32 1.02.32.5 0 .9-.15 1.2-.43.3-.28.44-.65.44-1.1v-.92zm-4.07-2.55V9.33a4.96 4.96 0 012.5-.55c2.1 0 3.17 1.03 3.17 3.08V17H22.1v-.96c-.42.68-1.15 1.02-2.19 1.02-.76 0-1.38-.22-1.84-.66-.46-.44-.7-1-.7-1.68 0-.78.3-1.38.88-1.81.59-.43 1.4-.65 2.46-.65h1.34v-.46c0-.55-.13-.97-.4-1.25-.26-.29-.7-.43-1.32-.43-.86 0-1.65.24-2.35.72zm9.34-1.93v1.42c.39-1 1.1-1.5 2.12-1.5.15 0 .31.02.5.05v1.53c-.23-.1-.48-.14-.76-.14-.54 0-.99.24-1.34.71a2.8 2.8 0 00-.52 1.71V17h-1.57V8.91h1.57zm5 4.09a3 3 0 00.76 2.01c.47.53 1.14.8 2 .8.64 0 1.24-.18 1.8-.53v1.4c-.53.32-1.2.48-2 .48a3.98 3.98 0 01-4.17-4.18c0-1.16.38-2.15 1.14-2.98a4 4 0 013.1-1.23c.7 0 1.34.15 1.92.44v1.44a3.24 3.24 0 00-1.77-.5A2.65 2.65 0 0032.33 13zm7.92-7.28v4.58c.46-1 1.3-1.5 2.5-1.5.8 0 1.42.24 1.9.73.48.5.72 1.17.72 2.05V17H43.8v-5.1c0-.56-.14-.99-.43-1.29-.28-.3-.65-.45-1.1-.45-.54 0-1 .2-1.42.6-.4.4-.61 1.02-.61 1.85V17h-1.56V5.72h1.56zM55.2 15.74c.6 0 1.1-.25 1.5-.76.4-.5.6-1.16.6-1.95 0-.92-.2-1.62-.6-2.12-.4-.5-.92-.74-1.55-.74-.56 0-1.05.22-1.5.67-.44.45-.66 1.13-.66 2.06 0 .96.22 1.67.64 2.14.43.47.95.7 1.57.7zM53 5.72v4.42a2.74 2.74 0 012.43-1.34c1.03 0 1.86.38 2.51 1.15.65.76.97 1.78.97 3.05 0 1.13-.3 2.1-.92 2.9-.62.81-1.47 1.21-2.54 1.21s-1.9-.45-2.46-1.34V17h-1.58V5.72H53zm9.9 11.1l-3.22-7.9h1.74l1 2.62 1.26 3.42c.1-.32.48-1.46 1.15-3.42l.91-2.63h1.66l-2.92 7.87c-.78 2.07-1.96 3.1-3.56 3.1-.28 0-.53-.02-.73-.07v-1.34c.17.04.35.06.54.06 1.03 0 1.76-.57 2.17-1.7z",
          }),
          Ls,
          Ms,
          He("path", {
            fill: "dark" === n ? "#FFF" : "#5468FF",
            d: "M120.92 18.8c-4.38.02-4.38-3.54-4.38-4.1V1.36l2.67-.42v13.25c0 .32 0 2.36 1.71 2.37v2.24zm-10.84-2.18c.82 0 1.43-.04 1.85-.12v-2.72a5.48 5.48 0 00-1.57-.2c-.3 0-.6.02-.9.07-.3.04-.57.12-.81.24-.24.11-.44.28-.58.49a.93.93 0 00-.22.65c0 .63.22 1 .61 1.23.4.24.94.36 1.62.36zm-.23-9.7c.88 0 1.62.11 2.23.33.6.22 1.09.53 1.44.92.36.4.61.92.76 1.48.16.56.23 1.17.23 1.85v6.87a21.69 21.69 0 01-4.68.5c-.69 0-1.32-.07-1.9-.2a4 4 0 01-1.46-.63 3.3 3.3 0 01-.96-1.13 4.3 4.3 0 01-.34-1.8 3.13 3.13 0 011.43-2.63c.45-.3.95-.5 1.54-.62a8.8 8.8 0 013.79.05v-.44c0-.3-.04-.6-.11-.87a1.78 1.78 0 00-1.1-1.22 3.2 3.2 0 00-1.15-.2 9.75 9.75 0 00-2.95.46l-.33-2.19a11.43 11.43 0 013.56-.53zm52.84 9.63c.82 0 1.43-.05 1.85-.13V13.7a5.42 5.42 0 00-1.57-.2c-.3 0-.6.02-.9.07-.3.04-.57.12-.81.24-.24.12-.44.28-.58.5a.93.93 0 00-.22.65c0 .63.22.99.61 1.23.4.24.94.36 1.62.36zm-.23-9.7c.88 0 1.63.11 2.23.33.6.22 1.1.53 1.45.92.35.39.6.92.76 1.48.15.56.23 1.18.23 1.85v6.88c-.41.08-1.03.19-1.87.31-.83.12-1.77.18-2.81.18-.7 0-1.33-.06-1.9-.2a4 4 0 01-1.47-.63c-.4-.3-.72-.67-.95-1.13a4.3 4.3 0 01-.34-1.8c0-.66.13-1.08.38-1.53.26-.45.61-.82 1.05-1.1.44-.3.95-.5 1.53-.62a8.8 8.8 0 013.8.05v-.43c0-.31-.04-.6-.12-.88-.07-.28-.2-.52-.38-.73a1.78 1.78 0 00-.73-.5c-.3-.1-.68-.2-1.14-.2a9.85 9.85 0 00-2.95.47l-.32-2.19a11.63 11.63 0 013.55-.53zm-8.03-1.27a1.62 1.62 0 000-3.24 1.62 1.62 0 100 3.24zm1.35 13.22h-2.7V7.27l2.7-.42V18.8zm-4.72 0c-4.38.02-4.38-3.54-4.38-4.1l-.01-13.34 2.67-.42v13.25c0 .32 0 2.36 1.72 2.37v2.24zm-8.7-5.9a4.7 4.7 0 00-.74-2.79 2.4 2.4 0 00-2.07-1 2.4 2.4 0 00-2.06 1 4.7 4.7 0 00-.74 2.8c0 1.16.25 1.94.74 2.62a2.4 2.4 0 002.07 1.02c.88 0 1.57-.34 2.07-1.02a4.2 4.2 0 00.73-2.63zm2.74 0a6.46 6.46 0 01-1.52 4.23c-.49.53-1.07.94-1.76 1.22-.68.29-1.73.45-2.26.45a6.6 6.6 0 01-2.25-.45 5.1 5.1 0 01-2.88-3.13 7.3 7.3 0 01-.01-4.84 5.13 5.13 0 012.9-3.1 5.67 5.67 0 012.22-.42c.81 0 1.56.14 2.24.42.69.29 1.28.69 1.75 1.22.49.52.87 1.15 1.14 1.89a7 7 0 01.43 2.5zm-20.14 0c0 1.11.25 2.36.74 2.88.5.52 1.13.78 1.91.78a4.07 4.07 0 002.12-.6V9.33c-.19-.04-.99-.2-1.76-.23a2.67 2.67 0 00-2.23 1 4.73 4.73 0 00-.78 2.8zm7.44 5.27c0 1.82-.46 3.16-1.4 4-.94.85-2.37 1.27-4.3 1.27-.7 0-2.17-.13-3.34-.4l.43-2.11c.98.2 2.27.26 2.95.26 1.08 0 1.84-.22 2.3-.66.46-.43.68-1.08.68-1.94v-.44a5.2 5.2 0 01-2.54.6 5.6 5.6 0 01-2.01-.36 4.2 4.2 0 01-2.58-2.71 9.88 9.88 0 01.02-5.35 4.92 4.92 0 012.93-2.96 6.6 6.6 0 012.43-.46 19.64 19.64 0 014.43.66v10.6z",
          })
        )
      )
    );
  }
  function Es(e) {
    var t = e.cssClasses,
      n = e.templates,
      r = e.items;
    return He(Xi, {
      templateKey: "default",
      templates: n,
      rootProps: { className: t.root },
      data: { items: r },
    });
  }
  var ks = an({ name: "panel" }),
    js = In("Panel"),
    Ls = He("path", {
      fill: "#5468FF",
      d: "M78.99.94h16.6a2.97 2.97 0 012.96 2.96v16.6a2.97 2.97 0 01-2.97 2.96h-16.6a2.97 2.97 0 01-2.96-2.96V3.9A2.96 2.96 0 0179 .94",
    }),
    Ms = He("path", {
      fill: "#FFF",
      d: "M89.63 5.97v-.78a.98.98 0 00-.98-.97h-2.28a.98.98 0 00-.97.97V6c0 .09.08.15.17.13a7.13 7.13 0 013.9-.02c.08.02.16-.04.16-.13m-6.25 1L83 6.6a.98.98 0 00-1.38 0l-.46.46a.97.97 0 000 1.38l.38.39c.06.06.15.04.2-.02a7.49 7.49 0 011.63-1.62c.07-.04.08-.14.02-.2m4.16 2.45v3.34c0 .1.1.17.2.12l2.97-1.54c.06-.03.08-.12.05-.18a3.7 3.7 0 00-3.08-1.87c-.07 0-.14.06-.14.13m0 8.05a4.49 4.49 0 110-8.98 4.49 4.49 0 010 8.98m0-10.85a6.37 6.37 0 100 12.74 6.37 6.37 0 000-12.74",
    }),
    Hs = In("PoweredBy"),
    Os = an({ name: "powered-by" }),
    As = an({ name: "query-rule-context" }),
    Ws = {
      default: function (e) {
        var t = e.items;
        return JSON.stringify(t, null, 2);
      },
    },
    Ds = an({ name: "query-rule-custom-data" }),
    Bs = In("QueryRuleCustomData"),
    Us = (function () {
      L(a, We);
      var i = O(a);
      function a() {
        var r;
        E(this, a);
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return (
          j(H((r = i.call.apply(i, [this].concat(t)))), "state", {
            min: r.props.values.min,
            max: r.props.values.max,
          }),
          j(H(r), "onInput", function (n) {
            return function (e) {
              var t = e.currentTarget.value;
              r.setState(j({}, n, Number(t)));
            };
          }),
          j(H(r), "onSubmit", function (e) {
            e.preventDefault(), r.props.refine([r.state.min, r.state.max]);
          }),
          r
        );
      }
      return (
        k(a, [
          {
            key: "componentWillReceiveProps",
            value: function (e) {
              this.setState({ min: e.values.min, max: e.values.max });
            },
          },
          {
            key: "render",
            value: function () {
              var e = this.state,
                t = e.min,
                n = e.max,
                r = this.props,
                i = r.min,
                a = r.max,
                s = r.step,
                o = r.cssClasses,
                c = r.templateProps,
                u = !(!i || !a) && a <= i,
                l = Boolean(t || n);
              return He(
                "div",
                { className: Yi(o.root, j({}, o.noRefinement, !l)) },
                He(
                  "form",
                  { className: o.form, onSubmit: this.onSubmit },
                  He(
                    "label",
                    { className: o.label },
                    He("input", {
                      className: Yi(o.input, o.inputMin),
                      type: "number",
                      min: i,
                      max: a,
                      step: s,
                      value: null != t ? t : "",
                      onInput: this.onInput("min"),
                      placeholder: null == i ? void 0 : i.toString(),
                      disabled: u,
                    })
                  ),
                  He(
                    Xi,
                    h({}, c, {
                      templateKey: "separatorText",
                      rootTagName: "span",
                      rootProps: { className: o.separator },
                    })
                  ),
                  He(
                    "label",
                    { className: o.label },
                    He("input", {
                      className: Yi(o.input, o.inputMax),
                      type: "number",
                      min: i,
                      max: a,
                      step: s,
                      value: null != n ? n : "",
                      onInput: this.onInput("max"),
                      placeholder: null == a ? void 0 : a.toString(),
                      disabled: u,
                    })
                  ),
                  He(
                    Xi,
                    h({}, c, {
                      templateKey: "submitText",
                      rootTagName: "button",
                      rootProps: {
                        type: "submit",
                        className: o.submit,
                        disabled: u,
                      },
                    })
                  )
                )
              );
            },
          },
        ]),
        a
      );
    })(),
    qs = an({ name: "range-input" }),
    Qs = In("RangeInput"),
    Vs = {
      separatorText: function () {
        return "to";
      },
      submitText: function () {
        return "Go";
      },
    },
    $s = 40,
    Ks = 35,
    zs = 27,
    Js = 36,
    Ys = 37,
    Xs = 34,
    Gs = 33,
    Zs = 39,
    eo = 38,
    to = 100;
  function no(e, t, n) {
    return ((e - t) / (n - t)) * 100;
  }
  function ro(e, t, n) {
    var r = e / 100;
    return 0 === e ? t : 100 === e ? n : Math.round((n - t) * r + t);
  }
  function io(e) {
    return [
      "rheostat",
      "vertical" === e.orientation
        ? "rheostat-vertical"
        : "rheostat-horizontal",
    ]
      .concat(e.className.split(" "))
      .join(" ");
  }
  function ao(e) {
    return Number(e.currentTarget.getAttribute("data-handle-key"));
  }
  function so(e) {
    e.stopPropagation(), e.preventDefault();
  }
  var oo = He("div", { className: "rheostat-background" }),
    co = (function () {
      L(r, We);
      var n = O(r);
      function r(e) {
        var t;
        return (
          E(this, r),
          j(H((t = n.call(this, e))), "state", {
            className: io(t.props),
            handlePos: t.props.values.map(function (e) {
              return no(e, t.props.min, t.props.max);
            }),
            handleDimensions: 0,
            mousePos: null,
            sliderBox: {},
            slidingIndex: null,
            values: t.props.values,
          }),
          j(H(t), "rheostat", { current: null }),
          (t.getPublicState = t.getPublicState.bind(H(t))),
          (t.getSliderBoundingBox = t.getSliderBoundingBox.bind(H(t))),
          (t.getProgressStyle = t.getProgressStyle.bind(H(t))),
          (t.getMinValue = t.getMinValue.bind(H(t))),
          (t.getMaxValue = t.getMaxValue.bind(H(t))),
          (t.getHandleDimensions = t.getHandleDimensions.bind(H(t))),
          (t.getClosestSnapPoint = t.getClosestSnapPoint.bind(H(t))),
          (t.getSnapPosition = t.getSnapPosition.bind(H(t))),
          (t.getNextPositionForKey = t.getNextPositionForKey.bind(H(t))),
          (t.getNextState = t.getNextState.bind(H(t))),
          (t.handleClick = t.handleClick.bind(H(t))),
          (t.getClosestHandle = t.getClosestHandle.bind(H(t))),
          (t.setStartSlide = t.setStartSlide.bind(H(t))),
          (t.startMouseSlide = t.startMouseSlide.bind(H(t))),
          (t.startTouchSlide = t.startTouchSlide.bind(H(t))),
          (t.handleMouseSlide = t.handleMouseSlide.bind(H(t))),
          (t.handleTouchSlide = t.handleTouchSlide.bind(H(t))),
          (t.handleSlide = t.handleSlide.bind(H(t))),
          (t.endSlide = t.endSlide.bind(H(t))),
          (t.handleKeydown = t.handleKeydown.bind(H(t))),
          (t.validatePosition = t.validatePosition.bind(H(t))),
          (t.validateValues = t.validateValues.bind(H(t))),
          (t.canMove = t.canMove.bind(H(t))),
          (t.fireChangeEvent = t.fireChangeEvent.bind(H(t))),
          (t.slideTo = t.slideTo.bind(H(t))),
          (t.updateNewValues = t.updateNewValues.bind(H(t))),
          t
        );
      }
      return (
        k(r, [
          {
            key: "componentWillReceiveProps",
            value: function (n) {
              var e = this.props,
                t = e.className,
                r = e.disabled,
                i = e.min,
                a = e.max,
                s = e.orientation,
                o = this.state,
                c = o.values,
                u = o.slidingIndex,
                l = n.min !== i || n.max !== a,
                d =
                  c.length !== n.values.length ||
                  c.some(function (e, t) {
                    return n.values[t] !== e;
                  }),
                h = n.className !== t || n.orientation !== s,
                f = n.disabled && !r;
              h && this.setState({ className: io(n) }),
                (l || d) && this.updateNewValues(n),
                f && null !== u && this.endSlide();
            },
          },
          {
            key: "getPublicState",
            value: function () {
              var e = this.props,
                t = e.min;
              return { max: e.max, min: t, values: this.state.values };
            },
          },
          {
            key: "getSliderBoundingBox",
            value: function () {
              var e = this.rheostat.current,
                t = e.getBoundingClientRect();
              return {
                height: t.height || e.clientHeight,
                left: t.left,
                top: t.top,
                width: t.width || e.clientWidth,
              };
            },
          },
          {
            key: "getProgressStyle",
            value: function (e) {
              var t = this.state.handlePos,
                n = t[e];
              if (0 === e)
                return "vertical" === this.props.orientation
                  ? { height: "".concat(n, "%"), top: 0 }
                  : { left: 0, width: "".concat(n, "%") };
              var r = t[e - 1],
                i = n - r;
              return "vertical" === this.props.orientation
                ? { height: "".concat(i, "%"), top: "".concat(r, "%") }
                : { left: "".concat(r, "%"), width: "".concat(i, "%") };
            },
          },
          {
            key: "getMinValue",
            value: function (e) {
              return this.state.values[e - 1]
                ? Math.max(this.props.min, this.state.values[e - 1])
                : this.props.min;
            },
          },
          {
            key: "getMaxValue",
            value: function (e) {
              return this.state.values[e + 1]
                ? Math.min(this.props.max, this.state.values[e + 1])
                : this.props.max;
            },
          },
          {
            key: "getHandleDimensions",
            value: function (e, t) {
              var n = e.currentTarget || null;
              return n
                ? "vertical" === this.props.orientation
                  ? ((n.clientHeight / t.height) * to) / 2
                  : ((n.clientWidth / t.width) * to) / 2
                : 0;
            },
          },
          {
            key: "getClosestSnapPoint",
            value: function (n) {
              return this.props.snapPoints.length
                ? this.props.snapPoints.reduce(function (e, t) {
                    return Math.abs(e - n) < Math.abs(t - n) ? e : t;
                  })
                : n;
            },
          },
          {
            key: "getSnapPosition",
            value: function (e) {
              if (!this.props.snap) return e;
              var t = this.props,
                n = t.max,
                r = t.min,
                i = ro(e, r, n);
              return no(this.getClosestSnapPoint(i), r, n);
            },
          },
          {
            key: "getNextPositionForKey",
            value: function (e, t) {
              var n,
                r = this.state,
                i = r.handlePos,
                a = r.values,
                s = this.props,
                o = s.max,
                c = s.min,
                u = s.snapPoints,
                l = this.props.snap,
                d = a[e],
                h = i[e],
                f = h,
                m = 1;
              100 <= o ? (h = Math.round(h)) : (m = 100 / (o - c));
              var p = null;
              l && (p = u.indexOf(this.getClosestSnapPoint(a[e])));
              var g =
                (j((n = {}), Ys, function (e) {
                  return -1 * e;
                }),
                j(n, Zs, function (e) {
                  return e;
                }),
                j(n, eo, function (e) {
                  return e;
                }),
                j(n, $s, function (e) {
                  return -1 * e;
                }),
                j(n, Xs, function (e) {
                  return 1 < e ? -e : -10 * e;
                }),
                j(n, Gs, function (e) {
                  return 1 < e ? e : 10 * e;
                }),
                n);
              if (Object.prototype.hasOwnProperty.call(g, t))
                (h += g[t](m)),
                  l &&
                    p &&
                    (f < h
                      ? p < u.length - 1 && (d = u[p + 1])
                      : 0 < p && (d = u[p - 1]));
              else if (t === Js) (h = 0), l && (d = u[0]);
              else {
                if (t !== Ks) return null;
                (h = to), l && (d = u[u.length - 1]);
              }
              return l ? no(d, c, o) : h;
            },
          },
          {
            key: "getNextState",
            value: function (n, e) {
              var t = this.state.handlePos,
                r = this.props,
                i = r.max,
                a = r.min,
                s = this.validatePosition(n, e),
                o = t.map(function (e, t) {
                  return t === n ? s : e;
                });
              return {
                handlePos: o,
                values: o.map(function (e) {
                  return ro(e, a, i);
                }),
              };
            },
          },
          {
            key: "getClosestHandle",
            value: function (r) {
              var i = this.state.handlePos;
              return i.reduce(function (e, t, n) {
                return Math.abs(i[n] - r) < Math.abs(i[e] - r) ? n : e;
              }, 0);
            },
          },
          {
            key: "setStartSlide",
            value: function (e, t, n) {
              var r = this.getSliderBoundingBox();
              this.setState({
                handleDimensions: this.getHandleDimensions(e, r),
                mousePos: { x: t, y: n },
                sliderBox: r,
                slidingIndex: ao(e),
              });
            },
          },
          {
            key: "startMouseSlide",
            value: function (e) {
              this.setStartSlide(e, e.clientX, e.clientY),
                document.addEventListener(
                  "mousemove",
                  this.handleMouseSlide,
                  !1
                ),
                document.addEventListener("mouseup", this.endSlide, !1),
                so(e);
            },
          },
          {
            key: "startTouchSlide",
            value: function (e) {
              if (!(1 < e.changedTouches.length)) {
                var t = e.changedTouches[0];
                this.setStartSlide(e, t.clientX, t.clientY),
                  document.addEventListener(
                    "touchmove",
                    this.handleTouchSlide,
                    !1
                  ),
                  document.addEventListener("touchend", this.endSlide, !1),
                  this.props.onSliderDragStart &&
                    this.props.onSliderDragStart(),
                  so(e);
              }
            },
          },
          {
            key: "handleMouseSlide",
            value: function (e) {
              null !== this.state.slidingIndex &&
                (this.handleSlide(e.clientX, e.clientY), so(e));
            },
          },
          {
            key: "handleTouchSlide",
            value: function (e) {
              if (null !== this.state.slidingIndex)
                if (1 < e.changedTouches.length) this.endSlide();
                else {
                  var t = e.changedTouches[0];
                  this.handleSlide(t.clientX, t.clientY), so(e);
                }
            },
          },
          {
            key: "handleSlide",
            value: function (e, t) {
              var n = this.state,
                r = n.slidingIndex,
                i = n.sliderBox,
                a =
                  "vertical" === this.props.orientation
                    ? ((t - i.top) / i.height) * to
                    : ((e - i.left) / i.width) * to;
              this.slideTo(r, a),
                this.canMove(r, a) &&
                  (this.setState({ mousePos: { x: e, y: t } }),
                  this.props.onSliderDragMove && this.props.onSliderDragMove());
            },
          },
          {
            key: "endSlide",
            value: function () {
              var e = this,
                t = this.state.slidingIndex;
              if (
                (this.setState({ slidingIndex: null }),
                document.removeEventListener("mouseup", this.endSlide, !1),
                document.removeEventListener("touchend", this.endSlide, !1),
                document.removeEventListener(
                  "touchmove",
                  this.handleTouchSlide,
                  !1
                ),
                document.removeEventListener(
                  "mousemove",
                  this.handleMouseSlide,
                  !1
                ),
                this.props.onSliderDragEnd && this.props.onSliderDragEnd(),
                this.props.snap)
              ) {
                var n = this.getSnapPosition(this.state.handlePos[t]);
                this.slideTo(t, n, function () {
                  return e.fireChangeEvent();
                });
              } else this.fireChangeEvent();
            },
          },
          {
            key: "handleClick",
            value: function (e) {
              var t = this;
              if (!e.target.getAttribute("data-handle-key")) {
                var n = this.getSliderBoundingBox(),
                  r =
                    ("vertical" === this.props.orientation
                      ? (e.clientY - n.top) / n.height
                      : (e.clientX - n.left) / n.width) * to,
                  i = this.getClosestHandle(r),
                  a = this.getSnapPosition(r);
                this.slideTo(i, a, function () {
                  return t.fireChangeEvent();
                }),
                  this.props.onClick && this.props.onClick();
              }
            },
          },
          {
            key: "handleKeydown",
            value: function (e) {
              var t = this,
                n = ao(e);
              if (e.keyCode !== zs) {
                var r = this.getNextPositionForKey(n, e.keyCode);
                null !== r &&
                  (this.canMove(n, r) &&
                    (this.slideTo(n, r, function () {
                      return t.fireChangeEvent();
                    }),
                    this.props.onKeyPress && this.props.onKeyPress()),
                  so(e));
              } else e.currentTarget.blur();
            },
          },
          {
            key: "validatePosition",
            value: function (e, t) {
              var n = this.state,
                r = n.handlePos,
                i = n.handleDimensions;
              return Math.max(
                Math.min(t, void 0 !== r[e + 1] ? r[e + 1] - i : to),
                void 0 !== r[e - 1] ? r[e - 1] + i : 0
              );
            },
          },
          {
            key: "validateValues",
            value: function (e, t) {
              var n = t || this.props,
                i = n.max,
                a = n.min;
              return e.map(function (e, t, n) {
                var r = Math.max(Math.min(e, i), a);
                return n.length && r < n[t - 1] ? n[t - 1] : r;
              });
            },
          },
          {
            key: "canMove",
            value: function (e, t) {
              var n = this.state,
                r = n.handlePos,
                i = n.handleDimensions;
              return (
                !(t < 0) &&
                !(to < t) &&
                !((void 0 !== r[e + 1] ? r[e + 1] - i : 1 / 0) < t) &&
                !(t < (void 0 !== r[e - 1] ? r[e - 1] + i : -1 / 0))
              );
            },
          },
          {
            key: "fireChangeEvent",
            value: function () {
              var e = this.props.onChange;
              e && e(this.getPublicState());
            },
          },
          {
            key: "slideTo",
            value: function (e, t, n) {
              var r = this,
                i = this.getNextState(e, t);
              this.setState(i, function () {
                var e = r.props.onValuesUpdated;
                e && e(r.getPublicState()), n && n();
              });
            },
          },
          {
            key: "updateNewValues",
            value: function (e) {
              var t = this;
              if (null === this.state.slidingIndex) {
                var n = e.max,
                  r = e.min,
                  i = e.values,
                  a = this.validateValues(i, e);
                this.setState(
                  {
                    handlePos: a.map(function (e) {
                      return no(e, r, n);
                    }),
                    values: a,
                  },
                  function () {
                    return t.fireChangeEvent();
                  }
                );
              }
            },
          },
          {
            key: "render",
            value: function () {
              var r = this,
                e = this.props,
                t = e.children,
                i = e.disabled,
                a = e.handle,
                s = e.max,
                o = e.min,
                c = e.orientation,
                u = e.pitComponent,
                n = e.pitPoints,
                l = e.progressBar,
                d = this.state,
                h = d.className,
                f = d.handlePos,
                m = d.values;
              return He(
                "div",
                {
                  className: h,
                  ref: this.rheostat,
                  onClick: i ? void 0 : this.handleClick,
                  style: { position: "relative" },
                },
                oo,
                f.map(function (e, t) {
                  var n =
                    "vertical" === c
                      ? { top: "".concat(e, "%"), position: "absolute" }
                      : { left: "".concat(e, "%"), position: "absolute" };
                  return He(a, {
                    "aria-valuemax": r.getMaxValue(t),
                    "aria-valuemin": r.getMinValue(t),
                    "aria-valuenow": m[t],
                    "aria-disabled": i,
                    "data-handle-key": t,
                    className: "rheostat-handle",
                    key: "handle-".concat(t),
                    onClick: so,
                    onKeyDown: i ? void 0 : r.handleKeydown,
                    onMouseDown: i ? void 0 : r.startMouseSlide,
                    onTouchStart: i ? void 0 : r.startTouchSlide,
                    role: "slider",
                    style: n,
                    tabIndex: 0,
                  });
                }),
                f.map(function (e, t, n) {
                  return 0 === t && 1 < n.length
                    ? null
                    : He(l, {
                        className: "rheostat-progress",
                        key: "progress-bar-".concat(t),
                        style: r.getProgressStyle(t),
                      });
                }),
                u &&
                  n.map(function (e) {
                    var t = no(e, o, s),
                      n =
                        "vertical" === c
                          ? { top: "".concat(t, "%"), position: "absolute" }
                          : { left: "".concat(t, "%"), position: "absolute" };
                    return He(u, { key: "pit-".concat(e), style: n }, e);
                  }),
                t
              );
            },
          },
        ]),
        r
      );
    })();
  j(co, "defaultProps", {
    className: "",
    children: null,
    disabled: !1,
    handle: function (e) {
      return He("button", h({}, e, { type: "button" }));
    },
    max: to,
    min: 0,
    onClick: null,
    onChange: null,
    onKeyPress: null,
    onSliderDragEnd: null,
    onSliderDragMove: null,
    onSliderDragStart: null,
    onValuesUpdated: null,
    orientation: "horizontal",
    pitComponent: null,
    pitPoints: [],
    progressBar: "div",
    snap: !1,
    snapPoints: [],
    values: [0],
  });
  function uo(e) {
    var t = e.style,
      n = e.children,
      r = Math.round(parseFloat(t.left)),
      i = [0, 50, 100].includes(r),
      a = n,
      s = Math.round(100 * parseInt(a, 10)) / 100;
    return He(
      "div",
      {
        style: W(W({}, t), {}, { marginLeft: 100 === r ? "-2px" : 0 }),
        className: Yi("rheostat-marker", "rheostat-marker-horizontal", {
          "rheostat-marker-large": i,
        }),
      },
      i && He("div", { className: "rheostat-value" }, s)
    );
  }
  var lo = (function () {
      L(a, We);
      var i = O(a);
      function a() {
        var n;
        E(this, a);
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return (
          j(
            H((n = i.call.apply(i, [this].concat(t)))),
            "handleChange",
            function (e) {
              var t = e.values;
              n.isDisabled || n.props.refine(t);
            }
          ),
          j(H(n), "createHandleComponent", function (r) {
            return function (e) {
              var t = Math.round(100 * parseFloat(e["aria-valuenow"])) / 100,
                n = "object" === C(r) && r.format ? r.format(t) : t;
              return He(
                "div",
                h({}, e, {
                  className: Yi(e.className, {
                    "rheostat-handle-lower": 0 === e["data-handle-key"],
                    "rheostat-handle-upper": 1 === e["data-handle-key"],
                  }),
                }),
                r && He("div", { className: "rheostat-tooltip" }, n)
              );
            };
          }),
          n
        );
      }
      return (
        k(a, [
          {
            key: "isDisabled",
            get: function () {
              return this.props.min >= this.props.max;
            },
          },
          {
            key: "computeDefaultPitPoints",
            value: function (e) {
              var t = e.min,
                n = e.max,
                r = (n - t) / 34;
              return [t].concat(
                P(
                  Jt({ end: 33 }).map(function (e) {
                    return t + r * (e + 1);
                  })
                ),
                [n]
              );
            },
          },
          {
            key: "computeSnapPoints",
            value: function (e) {
              var t = e.min,
                n = e.max,
                r = e.step;
              if (r)
                return [].concat(P(Jt({ start: t, end: n, step: r })), [n]);
            },
          },
          {
            key: "render",
            value: function () {
              var e = this.props,
                t = e.tooltips,
                n = e.step,
                r = e.pips,
                i = e.values,
                a = e.cssClasses,
                s = this.isDisabled
                  ? { min: this.props.min, max: this.props.max + 0.001 }
                  : this.props,
                o = s.min,
                c = s.max,
                u = this.computeSnapPoints({ min: o, max: c, step: n }),
                l =
                  !1 === r
                    ? []
                    : this.computeDefaultPitPoints({ min: o, max: c });
              return He(
                "div",
                {
                  className: Yi(a.root, j({}, a.disabledRoot, this.isDisabled)),
                },
                He(co, {
                  handle: this.createHandleComponent(t),
                  onChange: this.handleChange,
                  min: o,
                  max: c,
                  pitComponent: uo,
                  pitPoints: l,
                  snap: !0,
                  snapPoints: u,
                  values: this.isDisabled ? [o, c] : i,
                  disabled: this.isDisabled,
                })
              );
            },
          },
        ]),
        a
      );
    })(),
    ho = an({ name: "range-slider" }),
    fo = In("RangeSlider");
  function mo(e) {
    var t = e.children,
      n = e.count,
      r = e.value,
      i = e.url,
      a = e.cssClasses;
    return n
      ? He(
          "a",
          {
            className: bn(a.link),
            "aria-label": "".concat(r, " & up"),
            href: i,
          },
          t
        )
      : He(
          "div",
          {
            className: bn(a.link),
            "aria-label": "".concat(r, " & up"),
            disabled: !0,
          },
          t
        );
  }
  function po(e) {
    var t = e.cssClasses,
      n = e.templates,
      r = e.isRelevantSorted,
      i = e.isVirtualReplica,
      a = e.refine;
    return i
      ? He(
          "div",
          { className: t.root },
          He(Xi, {
            templateKey: "text",
            templates: n,
            rootProps: { className: t.text },
            data: { isRelevantSorted: r },
          }),
          He(
            "button",
            {
              type: "button",
              className: t.button,
              onClick: function () {
                a(r ? 0 : void 0);
              },
            },
            He(Xi, {
              rootTagName: "span",
              templateKey: "button",
              templates: n,
              data: { isRelevantSorted: r },
            })
          )
        )
      : null;
  }
  function go(e) {
    var t = e.nbHits,
      n = e.nbSortedHits,
      r = e.cssClasses,
      i = e.templateProps,
      a = M(e, ["nbHits", "nbSortedHits", "cssClasses", "templateProps"]);
    return He(
      "div",
      { className: Yi(r.root) },
      He(
        Xi,
        h({}, i, {
          templateKey: "text",
          rootTagName: "span",
          rootProps: { className: r.text },
          data: W(
            {
              hasManySortedResults: n && 1 < n,
              hasNoSortedResults: 0 === n,
              hasOneSortedResults: 1 === n,
              hasManyResults: 1 < t,
              hasNoResults: 0 === t,
              hasOneResult: 1 === t,
              nbHits: t,
              nbSortedHits: n,
              cssClasses: r,
            },
            a
          ),
        })
      )
    );
  }
  var vo = {
      item: function (e) {
        var t = e.count,
          n = e.value,
          r = e.url,
          i = e.stars,
          a = e.cssClasses;
        return He(
          mo,
          { count: t, value: n, url: r, cssClasses: a },
          i.map(function (e, t) {
            return He(
              "svg",
              {
                key: t,
                className: bn([
                  bn(a.starIcon),
                  bn(e ? a.fullStarIcon : a.emptyStarIcon),
                ]),
                "aria-hidden": "true",
                width: "24",
                height: "24",
              },
              He("use", {
                xlinkHref: e
                  ? "#ais-RatingMenu-starSymbol"
                  : "#ais-RatingMenu-starEmptySymbol",
              })
            );
          }),
          He("span", { className: bn(a.label) }, "& Up"),
          t && He("span", { className: bn(a.count) }, An(t))
        );
      },
    },
    yo = an({ name: "rating-menu" }),
    bo = In("RatingMenu"),
    Ro = He("path", {
      d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z",
    }),
    So = He("path", {
      d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z",
    }),
    wo = He("path", {
      d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z",
    }),
    _o = He("path", {
      d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z",
    }),
    Po = He(
      "g",
      { fill: "none", fillRule: "evenodd" },
      He(
        "g",
        { transform: "translate(1 1)", strokeWidth: "2" },
        He("circle", { strokeOpacity: ".5", cx: "18", cy: "18", r: "18" }),
        He(
          "path",
          { d: "M36 18c0-9.94-8.06-18-18-18" },
          He("animateTransform", {
            attributeName: "transform",
            type: "rotate",
            from: "0 18 18",
            to: "360 18 18",
            dur: "1s",
            repeatCount: "indefinite",
          })
        )
      )
    ),
    No = {
      reset: function (e) {
        return He(
          "svg",
          {
            className: e.cssClasses.resetIcon,
            viewBox: "0 0 20 20",
            width: "10",
            height: "10",
          },
          wo
        );
      },
      submit: function (e) {
        return He(
          "svg",
          {
            className: e.cssClasses.submitIcon,
            width: "10",
            height: "10",
            viewBox: "0 0 40 40",
          },
          _o
        );
      },
      loadingIndicator: function (e) {
        return He(
          "svg",
          {
            className: e.cssClasses.loadingIcon,
            width: "16",
            height: "16",
            viewBox: "0 0 38 38",
            stroke: "#444",
          },
          Po
        );
      },
    },
    xo = {
      item: function (e) {
        var t = e.cssClasses,
          n = e.count,
          r = e.value,
          i = e.highlighted,
          a = e.isRefined,
          s = e.isFromSearch;
        return He(
          "label",
          { className: bn(t.label) },
          He("input", {
            type: "checkbox",
            className: bn(t.checkbox),
            value: r,
            defaultChecked: a,
          }),
          He(
            "span",
            {
              className: bn(t.labelText),
              dangerouslySetInnerHTML: s ? { __html: i } : void 0,
            },
            !s && i
          ),
          He("span", { className: bn(t.count) }, An(n))
        );
      },
      showMoreText: function (e) {
        return e.isShowingMore ? "Show less" : "Show more";
      },
      searchableNoResults: function () {
        return "No results";
      },
    },
    Io = an({ name: "refinement-list" }),
    Fo = In("RefinementList"),
    To = In("SearchBox"),
    Co = {
      text: function () {
        return "";
      },
      button: function (e) {
        return e.isRelevantSorted ? "See all results" : "See relevant results";
      },
    },
    Eo = an({ name: "relevant-sort" }),
    ko = In("RelevantSort"),
    jo = an({ name: "search-box" }),
    Lo = In("SearchBox"),
    Mo = an({ name: "sort-by" }),
    Ho = In("SortBy"),
    Oo = an({ name: "stats" }),
    Ao = In("Stats"),
    Wo = {
      text: function (e) {
        return ""
          .concat(
            e.areHitsSorted
              ? (function (e) {
                  var t = e.nbHits,
                    n = e.hasNoSortedResults,
                    r = e.hasOneSortedResults,
                    i = e.hasManySortedResults,
                    a = e.nbSortedHits,
                    s = "sorted out of ".concat(An(t));
                  if (n) return "No relevant results ".concat(s);
                  if (r) return "1 relevant result ".concat(s);
                  if (i)
                    return ""
                      .concat(An(a || 0), " relevant results ")
                      .concat(s);
                  return "";
                })(e)
              : (function (e) {
                  var t = e.nbHits,
                    n = e.hasNoResults,
                    r = e.hasOneResult,
                    i = e.hasManyResults;
                  if (n) return "No results";
                  if (r) return "1 result";
                  if (i) return "".concat(An(t), " results");
                  return "";
                })(e),
            " found in "
          )
          .concat(e.processingTimeMS, "ms");
      },
    };
  function Do(e) {
    var t = e.currentRefinement,
      n = e.refine,
      r = e.cssClasses,
      i = e.templateProps;
    return He(
      "div",
      { className: r.root },
      He(
        "label",
        { className: r.label },
        He("input", {
          className: r.checkbox,
          type: "checkbox",
          checked: t.isRefined,
          onChange: function (e) {
            return n({ isRefined: !e.target.checked });
          },
        }),
        He(
          Xi,
          h({}, i, {
            rootTagName: "span",
            rootProps: { className: r.labelText },
            templateKey: "labelText",
            data: t,
          })
        )
      )
    );
  }
  function Bo(e) {
    var t = e.cssClasses,
      n = e.isBrowserSupported,
      r = e.isListening,
      i = e.toggleListening,
      a = e.voiceListeningState,
      s = e.templates,
      o = a.status,
      c = a.transcript,
      u = a.isSpeechFinal,
      l = a.errorCode;
    return He(
      "div",
      { className: t.root },
      He(Xi, {
        templateKey: "buttonText",
        rootTagName: "button",
        rootProps: {
          className: t.button,
          type: "button",
          title: "Search by voice".concat(
            n ? "" : " (not supported on this browser)"
          ),
          onClick: function (e) {
            e.currentTarget instanceof HTMLElement && e.currentTarget.blur(),
              i();
          },
          disabled: !n,
        },
        data: {
          status: o,
          errorCode: l,
          isListening: r,
          transcript: c,
          isSpeechFinal: u,
          isBrowserSupported: n,
        },
        templates: s,
      }),
      He(Xi, {
        templateKey: "status",
        rootProps: { className: t.status },
        data: {
          status: o,
          errorCode: l,
          isListening: r,
          transcript: c,
          isSpeechFinal: u,
          isBrowserSupported: n,
        },
        templates: s,
      })
    );
  }
  function Uo(e) {
    var t = e.status,
      n = e.errorCode,
      r = e.isListening;
    return "error" === t && "not-allowed" === n
      ? $o
      : He(
          Ae,
          null,
          He("path", {
            d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z",
            fill: r ? "currentColor" : "none",
          }),
          Ko,
          zo,
          Jo
        );
  }
  var qo = {
      labelText: function (e) {
        return e.name;
      },
    },
    Qo = an({ name: "toggle-refinement" }),
    Vo = In("ToggleRefinement"),
    $o = He(
      Ae,
      null,
      He("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
      He("path", {
        d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6",
      }),
      He("path", {
        d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23",
      }),
      He("line", { x1: "12", y1: "19", x2: "12", y2: "23" }),
      He("line", { x1: "8", y1: "23", x2: "16", y2: "23" })
    ),
    Ko = He("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
    zo = He("line", { x1: "12", y1: "19", x2: "12", y2: "23" }),
    Jo = He("line", { x1: "8", y1: "23", x2: "16", y2: "23" }),
    Yo = {
      buttonText: function (e) {
        var t = e.status,
          n = e.errorCode,
          r = e.isListening;
        return He(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          },
          He(Uo, { status: t, errorCode: n, isListening: r })
        );
      },
      status: function (e) {
        return He("p", null, e.transcript);
      },
    },
    Xo = an({ name: "voice-search" }),
    Go = In("VoiceSearch"),
    Zo = Ct(va),
    ec = Object.freeze({
      __proto__: null,
      dynamicWidgets: va,
      EXPERIMENTAL_dynamicWidgets: Zo,
      analytics: function (e) {
        var t = e || {},
          s = t.pushFunction,
          n = t.delay,
          r = void 0 === n ? 3e3 : n,
          i = t.triggerOnUIInteraction,
          a = void 0 !== i && i,
          o = t.pushInitialSearch,
          c = void 0 === o || o,
          u = t.pushPagination,
          l = void 0 !== u && u;
        if (!s) throw new Error(Ji("The `pushFunction` option is required."));
        function d(e) {
          if (null !== e) {
            var t = [],
              n = (function (e) {
                var t = [];
                for (var n in e)
                  if (e.hasOwnProperty(n)) {
                    var r = e[n].join("+");
                    t.push(
                      ""
                        .concat(encodeURIComponent(n), "=")
                        .concat(encodeURIComponent(n), "_")
                        .concat(encodeURIComponent(r))
                    );
                  }
                return t.join("&");
              })(
                W(
                  W(
                    W({}, e.state.disjunctiveFacetsRefinements),
                    e.state.facetsRefinements
                  ),
                  e.state.hierarchicalFacetsRefinements
                )
              ),
              r = (function (e) {
                var t = [];
                for (var n in e)
                  if (e.hasOwnProperty(n)) {
                    var r = e[n];
                    if (r.hasOwnProperty(">=") && r.hasOwnProperty("<="))
                      r[">="] && r[">="][0] === r["<="] && r["<="][0]
                        ? t.push(
                            "".concat(n, "=").concat(n, "_").concat(r[">="])
                          )
                        : t.push(
                            ""
                              .concat(n, "=")
                              .concat(n, "_")
                              .concat(r[">="], "to")
                              .concat(r["<="])
                          );
                    else if (r.hasOwnProperty(">="))
                      t.push(
                        "".concat(n, "=").concat(n, "_from").concat(r[">="])
                      );
                    else if (r.hasOwnProperty("<="))
                      t.push(
                        "".concat(n, "=").concat(n, "_to").concat(r["<="])
                      );
                    else if (r.hasOwnProperty("=")) {
                      var i = [];
                      for (var a in r["="])
                        r["="].hasOwnProperty(a) && i.push(r["="][a]);
                      t.push(
                        "".concat(n, "=").concat(n, "_").concat(i.join("-"))
                      );
                    }
                  }
                return t.join("&");
              })(e.state.numericRefinements);
            "" !== n && t.push(n), "" !== r && t.push(r);
            var i = t.join("&"),
              a = "Query: ".concat(e.state.query || "", ", ").concat(i);
            !0 === l && (a += ", Page: ".concat(e.state.page || 0)),
              m !== a && (s(i, e.state, e.results), (m = a));
          }
        }
        var h,
          f = null,
          m = "",
          p = !0;
        !0 === c && (p = !1);
        function g() {
          d(f);
        }
        function v() {
          d(f);
        }
        return {
          $$type: "ais.analytics",
          $$widgetType: "ais.analytics",
          init: function () {
            !0 === a &&
              (document.addEventListener("click", g),
              window.addEventListener("beforeunload", v));
          },
          render: function (e) {
            var t = e.results,
              n = e.state;
            !0 !== p
              ? ((f = { results: t, state: n }),
                h && clearTimeout(h),
                (h = window.setTimeout(function () {
                  return d(f);
                }, r)))
              : (p = !1);
          },
          dispose: function () {
            !0 === a &&
              (document.removeEventListener("click", g),
              window.removeEventListener("beforeunload", v));
          },
          getRenderState: function (e, t) {
            return W(W({}, e), {}, { analytics: this.getWidgetRenderState(t) });
          },
          getWidgetRenderState: function () {
            return { widgetParams: e };
          },
        };
      },
      breadcrumb: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attributes,
          i = t.separator,
          a = t.rootPath,
          s = t.transformItems,
          o = t.templates,
          c = void 0 === o ? {} : o,
          u = t.cssClasses,
          l = void 0 === u ? {} : u;
        if (!n) throw new Error(ia("The `container` option is required."));
        var d = ye(n),
          h = {
            root: Yi(aa(), l.root),
            noRefinementRoot: Yi(
              aa({ modifierName: "noRefinement" }),
              l.noRefinementRoot
            ),
            list: Yi(aa({ descendantName: "list" }), l.list),
            item: Yi(aa({ descendantName: "item" }), l.item),
            selectedItem: Yi(
              aa({ descendantName: "item", modifierName: "selected" }),
              l.selectedItem
            ),
            separator: Yi(aa({ descendantName: "separator" }), l.separator),
            link: Yi(aa({ descendantName: "link" }), l.link),
          },
          f = (function (e) {
            var o = e.containerNode,
              c = e.cssClasses,
              u = e.renderState,
              l = e.templates;
            return function (e, t) {
              var n = e.canRefine,
                r = e.createURL,
                i = e.instantSearchInstance,
                a = e.items,
                s = e.refine;
              t
                ? (u.templateProps = Se({
                    defaultTemplates: ra,
                    templatesConfig: i.templatesConfig,
                    templates: l,
                  }))
                : nt(
                    He(Gi, {
                      canRefine: n,
                      cssClasses: c,
                      createURL: r,
                      items: a,
                      refine: s,
                      templateProps: u.templateProps,
                    }),
                    o
                  );
            };
          })({
            containerNode: d,
            cssClasses: h,
            renderState: {},
            templates: c,
          });
        return W(
          W(
            {},
            di(f, function () {
              return nt(null, d);
            })({ attributes: r, separator: i, rootPath: a, transformItems: s })
          ),
          {},
          { $$widgetType: "ais.breadcrumb" }
        );
      },
      clearRefinements: function (e) {
        var t = e || {},
          n = t.container,
          r = t.templates,
          i = void 0 === r ? {} : r,
          a = t.includedAttributes,
          s = t.excludedAttributes,
          o = t.transformItems,
          c = t.cssClasses,
          u = void 0 === c ? {} : c;
        if (!n) throw new Error(oa("The `container` option is required."));
        var l = ye(n),
          d = {
            root: Yi(ca(), u.root),
            button: Yi(ca({ descendantName: "button" }), u.button),
            disabledButton: Yi(
              ca({ descendantName: "button", modifierName: "disabled" }),
              u.disabledButton
            ),
          },
          h = (function (e) {
            var a = e.containerNode,
              s = e.cssClasses,
              o = e.renderState,
              c = e.templates;
            return function (e, t) {
              var n = e.refine,
                r = e.canRefine,
                i = e.instantSearchInstance;
              t
                ? (o.templateProps = Se({
                    defaultTemplates: sa,
                    templatesConfig: i.templatesConfig,
                    templates: c,
                  }))
                : nt(
                    He(Zi, {
                      refine: n,
                      cssClasses: s,
                      hasRefinements: r,
                      templateProps: o.templateProps,
                    }),
                    a
                  );
            };
          })({
            containerNode: l,
            cssClasses: d,
            renderState: {},
            templates: i,
          });
        return W(
          W(
            {},
            br(h, function () {
              return nt(null, l);
            })({
              includedAttributes: a,
              excludedAttributes: s,
              transformItems: o,
            })
          ),
          {},
          { $$widgetType: "ais.clearRefinements" }
        );
      },
      configure: function (e) {
        return W(
          W({}, Ei(Tt)({ searchParameters: e })),
          {},
          { $$widgetType: "ais.configure" }
        );
      },
      currentRefinements: function (e) {
        var t = e || {},
          n = t.container,
          r = t.includedAttributes,
          i = t.excludedAttributes,
          a = t.cssClasses,
          s = void 0 === a ? {} : a,
          o = t.transformItems;
        if (!n) throw new Error(ua("The `container` option is required."));
        var c = ye(n),
          u = {
            root: Yi(la(), s.root),
            list: Yi(la({ descendantName: "list" }), s.list),
            item: Yi(la({ descendantName: "item" }), s.item),
            label: Yi(la({ descendantName: "label" }), s.label),
            category: Yi(la({ descendantName: "category" }), s.category),
            categoryLabel: Yi(
              la({ descendantName: "categoryLabel" }),
              s.categoryLabel
            ),
            delete: Yi(la({ descendantName: "delete" }), s.delete),
          };
        return W(
          W(
            {},
            wr(ta, function () {
              return nt(null, c);
            })({
              container: c,
              cssClasses: u,
              includedAttributes: r,
              excludedAttributes: i,
              transformItems: o,
            })
          ),
          {},
          { $$widgetType: "ais.currentRefinements" }
        );
      },
      EXPERIMENTAL_answers: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attributesForPrediction,
          i = t.queryLanguages,
          a = t.nbHits,
          s = t.searchDebounceTime,
          o = t.renderDebounceTime,
          c = t.escapeHTML,
          u = t.extraParameters,
          l = t.templates,
          d = void 0 === l ? {} : l,
          h = t.cssClasses,
          f = void 0 === h ? {} : h;
        if (!n) throw new Error(ha("The `container` option is required."));
        var m = ye(n),
          p = {
            root: Yi(fa(), f.root),
            emptyRoot: Yi(fa({ modifierName: "empty" }), f.emptyRoot),
            header: Yi(fa({ descendantName: "header" }), f.header),
            loader: Yi(fa({ descendantName: "loader" }), f.loader),
            list: Yi(fa({ descendantName: "list" }), f.list),
            item: Yi(fa({ descendantName: "item" }), f.item),
          },
          g = (function (e) {
            var a = e.containerNode,
              s = e.cssClasses,
              o = e.renderState,
              c = e.templates;
            return function (e, t) {
              var n = e.hits,
                r = e.isLoading,
                i = e.instantSearchInstance;
              t
                ? (o.templateProps = Se({
                    defaultTemplates: da,
                    templatesConfig: i.templatesConfig,
                    templates: c,
                  }))
                : nt(
                    He(na, {
                      cssClasses: s,
                      hits: n,
                      isLoading: r,
                      templateProps: o.templateProps,
                    }),
                    a
                  );
            };
          })({
            containerNode: m,
            cssClasses: p,
            templates: d,
            renderState: {},
          });
        return W(
          W(
            {},
            Ui(g, function () {
              return nt(null, m);
            })({
              attributesForPrediction: r,
              queryLanguages: i,
              nbHits: a,
              searchDebounceTime: s,
              renderDebounceTime: o,
              escapeHTML: c,
              extraParameters: u,
            })
          ),
          {},
          { $$widgetType: "ais.answers" }
        );
      },
      EXPERIMENTAL_configureRelatedItems: function (e) {
        return W(
          W({}, Li(Tt)(e)),
          {},
          { $$widgetType: "ais.configureRelatedItems" }
        );
      },
      geoSearch: function (e) {
        var t = e || {},
          n = t.initialZoom,
          r = void 0 === n ? 1 : n,
          i = t.initialPosition,
          a = void 0 === i ? { lat: 0, lng: 0 } : i,
          s = t.templates,
          o = void 0 === s ? {} : s,
          c = t.cssClasses,
          u = void 0 === c ? {} : c,
          l = t.builtInMarker,
          d = void 0 === l ? {} : l,
          h = t.customHTMLMarker,
          f = t.enableRefine,
          m = void 0 === f || f,
          p = t.enableClearMapRefinement,
          g = void 0 === p || p,
          v = t.enableRefineControl,
          y = void 0 === v || v,
          b = t.container,
          R = t.googleReference,
          S = M(t, [
            "initialZoom",
            "initialPosition",
            "templates",
            "cssClasses",
            "builtInMarker",
            "customHTMLMarker",
            "enableRefine",
            "enableClearMapRefinement",
            "enableRefineControl",
            "container",
            "googleReference",
          ]);
        if (!b) throw new Error(xa("The `container` option is required."));
        if (!R)
          throw new Error(xa("The `googleReference` option is required."));
        var w = ye(b),
          _ = {
            root: Yi(Ia(), u.root),
            tree: Ia({ descendantName: "tree" }),
            map: Yi(Ia({ descendantName: "map" }), u.map),
            control: Yi(Ia({ descendantName: "control" }), u.control),
            label: Yi(Ia({ descendantName: "label" }), u.label),
            selectedLabel: Yi(
              Ia({ descendantName: "label", modifierName: "selected" }),
              u.selectedLabel
            ),
            input: Yi(Ia({ descendantName: "input" }), u.input),
            redo: Yi(Ia({ descendantName: "redo" }), u.redo),
            disabledRedo: Yi(
              Ia({ descendantName: "redo", modifierName: "disabled" }),
              u.disabledRedo
            ),
            reset: Yi(Ia({ descendantName: "reset" }), u.reset),
          },
          P = W(W({}, Na), o),
          N = W(
            W(
              {},
              {
                createOptions: function () {
                  return {};
                },
                events: {},
              }
            ),
            d
          ),
          x =
            (Boolean(h) || Boolean(o.HTMLMarker)) &&
            W(
              W(
                {},
                {
                  createOptions: function () {
                    return {};
                  },
                  events: {},
                }
              ),
              h
            ),
          I = (function (d) {
            return (function () {
              L(l, d.maps.OverlayView);
              var u = O(l);
              function l(e) {
                var t,
                  n = e.__id,
                  r = e.position,
                  i = e.map,
                  a = e.template,
                  s = e.className,
                  o = e.anchor,
                  c = void 0 === o ? { x: 0, y: 0 } : o;
                return (
                  E(this, l),
                  j(H((t = u.call(this))), "__id", void 0),
                  j(H(t), "anchor", void 0),
                  j(H(t), "offset", void 0),
                  j(H(t), "listeners", void 0),
                  j(H(t), "latLng", void 0),
                  j(H(t), "element", void 0),
                  (t.__id = n),
                  (t.anchor = c),
                  (t.listeners = {}),
                  (t.latLng = new d.maps.LatLng(r)),
                  (t.element = document.createElement("div")),
                  (t.element.className = s),
                  (t.element.style.position = "absolute"),
                  "object" === C(a)
                    ? nt(a, t.element)
                    : (t.element.innerHTML = a),
                  t.setMap(i),
                  t
                );
              }
              return (
                k(l, [
                  {
                    key: "onAdd",
                    value: function () {
                      this.getPanes().overlayMouseTarget.appendChild(
                        this.element
                      );
                      var e = this.element.getBoundingClientRect();
                      (this.offset = {
                        x: this.anchor.x + e.width / 2,
                        y: this.anchor.y + e.height,
                      }),
                        (this.element.style.width = "".concat(e.width, "px"));
                    },
                  },
                  {
                    key: "draw",
                    value: function () {
                      var e = this.getProjection().fromLatLngToDivPixel(
                        this.latLng
                      );
                      (this.element.style.left = "".concat(
                        Math.round(e.x - this.offset.x),
                        "px"
                      )),
                        (this.element.style.top = "".concat(
                          Math.round(e.y - this.offset.y),
                          "px"
                        )),
                        (this.element.style.zIndex = String(
                          parseInt(this.element.style.top, 10)
                        ));
                    },
                  },
                  {
                    key: "onRemove",
                    value: function () {
                      var t = this;
                      this.element &&
                        (this.element.parentNode.removeChild(this.element),
                        Object.keys(this.listeners).forEach(function (e) {
                          t.element.removeEventListener(e, t.listeners[e]);
                        }),
                        delete this.element,
                        delete this.listeners);
                    },
                  },
                  {
                    key: "addListener",
                    value: function (e, t) {
                      this.listeners[e] = t;
                      var n = this.element;
                      return (
                        n.addEventListener(e, t),
                        {
                          remove: function () {
                            return n.removeEventListener(e, t);
                          },
                        }
                      );
                    },
                  },
                  {
                    key: "getPosition",
                    value: function () {
                      return this.latLng;
                    },
                  },
                ]),
                l
              );
            })();
          })(R),
          F = x
            ? function (e) {
                var t = e.item,
                  n = M(e, ["item"]);
                return new I(
                  W(
                    W(W({}, x.createOptions(t)), n),
                    {},
                    {
                      __id: t.objectID,
                      position: t._geoloc,
                      className: Yi(Ia({ descendantName: "marker" })),
                      template: Bt({
                        templateKey: "HTMLMarker",
                        templates: P,
                        data: t,
                      }),
                    }
                  )
                );
              }
            : function (e) {
                var t = e.item,
                  n = M(e, ["item"]);
                return new R.maps.Marker(
                  W(
                    W(W({}, N.createOptions(t)), n),
                    {},
                    { __id: t.objectID, position: t._geoloc }
                  )
                );
              },
          T = x || N;
        return W(
          W(
            {},
            Ni(_a, function () {
              return nt(null, w);
            })(
              W(
                W({}, S),
                {},
                {
                  renderState: {},
                  container: w,
                  googleReference: R,
                  initialZoom: r,
                  initialPosition: a,
                  templates: P,
                  cssClasses: _,
                  createMarker: F,
                  markerOptions: T,
                  enableRefine: m,
                  enableClearMapRefinement: g,
                  enableRefineControl: y,
                }
              )
            )
          ),
          {},
          { $$widgetType: "ais.geoSearch" }
        );
      },
      hierarchicalMenu: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attributes,
          i = t.separator,
          a = t.rootPath,
          s = t.showParentLevel,
          o = t.limit,
          c = t.showMore,
          u = void 0 !== c && c,
          l = t.showMoreLimit,
          d = t.sortBy,
          h = t.transformItems,
          f = t.templates,
          m = void 0 === f ? {} : f,
          p = t.cssClasses,
          g = void 0 === p ? {} : p;
        if (!n) throw new Error(La("The `container` option is required."));
        var v = ye(n),
          y = (function (e) {
            var u = e.cssClasses,
              l = e.containerNode,
              d = e.showMore,
              h = e.templates,
              f = e.renderState;
            return function (e, t) {
              var n = e.createURL,
                r = e.items,
                i = e.refine,
                a = e.instantSearchInstance,
                s = e.isShowingMore,
                o = e.toggleShowMore,
                c = e.canToggleShowMore;
              t
                ? (f.templateProps = Se({
                    defaultTemplates: ja,
                    templatesConfig: a.templatesConfig,
                    templates: h,
                  }))
                : nt(
                    He(ka, {
                      createURL: n,
                      cssClasses: u,
                      facetValues: r,
                      templateProps: f.templateProps,
                      toggleRefinement: i,
                      showMore: d,
                      toggleShowMore: o,
                      isShowingMore: s,
                      canToggleShowMore: c,
                    }),
                    l
                  );
            };
          })({
            cssClasses: {
              root: Yi(Ma(), g.root),
              noRefinementRoot: Yi(
                Ma({ modifierName: "noRefinement" }),
                g.noRefinementRoot
              ),
              list: Yi(Ma({ descendantName: "list" }), g.list),
              childList: Yi(
                Ma({ descendantName: "list", modifierName: "child" }),
                g.childList
              ),
              item: Yi(Ma({ descendantName: "item" }), g.item),
              selectedItem: Yi(
                Ma({ descendantName: "item", modifierName: "selected" }),
                g.selectedItem
              ),
              parentItem: Yi(
                Ma({ descendantName: "item", modifierName: "parent" }),
                g.parentItem
              ),
              link: Yi(Ma({ descendantName: "link" }), g.link),
              label: Yi(Ma({ descendantName: "label" }), g.label),
              count: Yi(Ma({ descendantName: "count" }), g.count),
              showMore: Yi(Ma({ descendantName: "showMore" }), g.showMore),
              disabledShowMore: Yi(
                Ma({ descendantName: "showMore", modifierName: "disabled" }),
                g.disabledShowMore
              ),
            },
            containerNode: v,
            templates: m,
            showMore: u,
            renderState: {},
          });
        return W(
          W(
            {},
            Fr(y, function () {
              return nt(null, v);
            })({
              attributes: r,
              separator: i,
              rootPath: a,
              showParentLevel: s,
              limit: o,
              showMore: u,
              showMoreLimit: l,
              sortBy: d,
              transformItems: h,
            })
          ),
          {},
          { $$widgetType: "ais.hierarchicalMenu" }
        );
      },
      hits: function (e) {
        var t = e || {},
          n = t.container,
          r = t.escapeHTML,
          i = t.transformItems,
          a = t.templates,
          s = void 0 === a ? {} : a,
          o = t.cssClasses,
          c = void 0 === o ? {} : o;
        if (!n) throw new Error(Oa("The `container` option is required."));
        var u = ye(n),
          l = {
            root: Yi(Aa(), c.root),
            emptyRoot: Yi(Aa({ modifierName: "empty" }), c.emptyRoot),
            list: Yi(Aa({ descendantName: "list" }), c.list),
            item: Yi(Aa({ descendantName: "item" }), c.item),
          },
          d = (function (e) {
            var o = e.renderState,
              c = e.cssClasses,
              u = e.containerNode,
              l = e.templates;
            return function (e, t) {
              var n = e.hits,
                r = e.results,
                i = e.instantSearchInstance,
                a = e.insights,
                s = e.bindEvent;
              t
                ? (o.templateProps = Se({
                    defaultTemplates: Ha,
                    templatesConfig: i.templatesConfig,
                    templates: l,
                  }))
                : nt(
                    He(Wa, {
                      cssClasses: c,
                      hits: n,
                      results: r,
                      templateProps: o.templateProps,
                      insights: a,
                      sendEvent: function (e) {
                        i.sendEventToInsights(e);
                      },
                      bindEvent: s,
                    }),
                    u
                  );
            };
          })({
            containerNode: u,
            cssClasses: l,
            renderState: {},
            templates: s,
          });
        return W(
          W(
            {},
            Lr(Tr)(d, function () {
              return nt(null, u);
            })({ escapeHTML: r, transformItems: i })
          ),
          {},
          { $$widgetType: "ais.hits" }
        );
      },
      hitsPerPage: function (e) {
        var t = e || {},
          n = t.container,
          r = t.items,
          i = t.cssClasses,
          a = void 0 === i ? {} : i,
          s = t.transformItems;
        if (!n) throw new Error(Ba("The `container` option is required."));
        var o = ye(n),
          c = {
            root: Yi(Ua(), a.root),
            select: Yi(Ua({ descendantName: "select" }), a.select),
            option: Yi(Ua({ descendantName: "option" }), a.option),
          },
          u = (function (e) {
            var a = e.containerNode,
              s = e.cssClasses;
            return function (e, t) {
              var n = e.items,
                r = e.refine;
              if (!t) {
                var i = (
                  Ut(n, function (e) {
                    return e.isRefined;
                  }) || {}
                ).value;
                nt(
                  He(
                    "div",
                    { className: s.root },
                    He(Da, {
                      cssClasses: s,
                      currentValue: i,
                      options: n,
                      setValue: r,
                    })
                  ),
                  a
                );
              }
            };
          })({ containerNode: o, cssClasses: c });
        return W(
          W(
            {},
            Or(u, function () {
              return nt(null, o);
            })({ items: r, transformItems: s })
          ),
          {},
          { $$widgetType: "ais.hitsPerPage" }
        );
      },
      index: Nn,
      infiniteHits: function (e) {
        var t = e || {},
          n = t.container,
          r = t.escapeHTML,
          i = t.transformItems,
          a = t.templates,
          s = void 0 === a ? {} : a,
          o = t.cssClasses,
          c = void 0 === o ? {} : o,
          u = t.showPrevious,
          l = t.cache;
        if (!n) throw new Error(Qa("The `container` option is required."));
        var d = ye(n),
          h = {
            root: Yi(Va(), c.root),
            emptyRoot: Yi(Va({ modifierName: "empty" }), c.emptyRoot),
            item: Yi(Va({ descendantName: "item" }), c.item),
            list: Yi(Va({ descendantName: "list" }), c.list),
            loadPrevious: Yi(
              Va({ descendantName: "loadPrevious" }),
              c.loadPrevious
            ),
            disabledLoadPrevious: Yi(
              Va({ descendantName: "loadPrevious", modifierName: "disabled" }),
              c.disabledLoadPrevious
            ),
            loadMore: Yi(Va({ descendantName: "loadMore" }), c.loadMore),
            disabledLoadMore: Yi(
              Va({ descendantName: "loadMore", modifierName: "disabled" }),
              c.disabledLoadMore
            ),
          },
          f = (function (e) {
            var d = e.containerNode,
              h = e.cssClasses,
              f = e.renderState,
              m = e.templates,
              p = e.showPrevious;
            return function (e, t) {
              var n = e.hits,
                r = e.results,
                i = e.showMore,
                a = e.showPrevious,
                s = e.isFirstPage,
                o = e.isLastPage,
                c = e.instantSearchInstance,
                u = e.insights,
                l = e.bindEvent;
              t
                ? (f.templateProps = Se({
                    defaultTemplates: qa,
                    templatesConfig: c.templatesConfig,
                    templates: m,
                  }))
                : nt(
                    He($a, {
                      cssClasses: h,
                      hits: n,
                      results: r,
                      hasShowPrevious: p,
                      showPrevious: a,
                      showMore: i,
                      templateProps: f.templateProps,
                      isFirstPage: s,
                      isLastPage: o,
                      insights: u,
                      sendEvent: function (e) {
                        c.sendEventToInsights(e);
                      },
                      bindEvent: l,
                    }),
                    d
                  );
            };
          })({
            containerNode: d,
            cssClasses: h,
            templates: s,
            showPrevious: u,
            renderState: {},
          });
        return W(
          W(
            {},
            Lr(Ur)(f, function () {
              return nt(null, d);
            })({ escapeHTML: r, transformItems: i, showPrevious: u, cache: l })
          ),
          {},
          { $$widgetType: "ais.infiniteHits" }
        );
      },
      menu: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attribute,
          i = t.sortBy,
          a = t.limit,
          s = t.showMore,
          o = t.showMoreLimit,
          c = t.cssClasses,
          u = void 0 === c ? {} : c,
          l = t.templates,
          d = void 0 === l ? {} : l,
          h = t.transformItems;
        if (!n) throw new Error(za("The `container` option is required."));
        var f = ye(n),
          m = {
            root: Yi(Ja(), u.root),
            noRefinementRoot: Yi(
              Ja({ modifierName: "noRefinement" }),
              u.noRefinementRoot
            ),
            list: Yi(Ja({ descendantName: "list" }), u.list),
            item: Yi(Ja({ descendantName: "item" }), u.item),
            selectedItem: Yi(
              Ja({ descendantName: "item", modifierName: "selected" }),
              u.selectedItem
            ),
            link: Yi(Ja({ descendantName: "link" }), u.link),
            label: Yi(Ja({ descendantName: "label" }), u.label),
            count: Yi(Ja({ descendantName: "count" }), u.count),
            showMore: Yi(Ja({ descendantName: "showMore" }), u.showMore),
            disabledShowMore: Yi(
              Ja({ descendantName: "showMore", modifierName: "disabled" }),
              u.disabledShowMore
            ),
          },
          p = (function (e) {
            var l = e.containerNode,
              d = e.cssClasses,
              h = e.renderState,
              f = e.templates,
              m = e.showMore;
            return function (e, t) {
              var n = e.refine,
                r = e.items,
                i = e.createURL,
                a = e.instantSearchInstance,
                s = e.isShowingMore,
                o = e.toggleShowMore,
                c = e.canToggleShowMore;
              if (t)
                h.templateProps = Se({
                  defaultTemplates: Ka,
                  templatesConfig: a.templatesConfig,
                  templates: f,
                });
              else {
                var u = r.map(function (e) {
                  return W(W({}, e), {}, { url: i(e.value) });
                });
                nt(
                  He(ka, {
                    createURL: i,
                    cssClasses: d,
                    facetValues: u,
                    showMore: m,
                    templateProps: h.templateProps,
                    toggleRefinement: n,
                    toggleShowMore: o,
                    isShowingMore: s,
                    canToggleShowMore: c,
                  }),
                  l
                );
              }
            };
          })({
            containerNode: f,
            cssClasses: m,
            renderState: {},
            templates: d,
            showMore: s,
          });
        return W(
          W(
            {},
            qr(p, function () {
              return nt(null, f);
            })({
              attribute: r,
              limit: a,
              showMore: s,
              showMoreLimit: o,
              sortBy: i,
              transformItems: h,
            })
          ),
          {},
          { $$widgetType: "ais.menu" }
        );
      },
      menuSelect: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attribute,
          i = t.sortBy,
          a = void 0 === i ? ["name:asc"] : i,
          s = t.limit,
          o = void 0 === s ? 10 : s,
          c = t.cssClasses,
          u = void 0 === c ? {} : c,
          l = t.templates,
          d = void 0 === l ? {} : l,
          h = t.transformItems;
        if (!n) throw new Error(Ga("The `container` option is required."));
        var f = ye(n),
          m = {
            root: Yi(Za(), u.root),
            noRefinementRoot: Yi(
              Za({ modifierName: "noRefinement" }),
              u.noRefinementRoot
            ),
            select: Yi(Za({ descendantName: "select" }), u.select),
            option: Yi(Za({ descendantName: "option" }), u.option),
          },
          p = (function (e) {
            var a = e.containerNode,
              s = e.cssClasses,
              o = e.renderState,
              c = e.templates;
            return function (e, t) {
              var n = e.refine,
                r = e.items,
                i = e.instantSearchInstance;
              t
                ? (o.templateProps = Se({
                    defaultTemplates: Xa,
                    templatesConfig: i.templatesConfig,
                    templates: c,
                  }))
                : nt(
                    He(Ya, {
                      cssClasses: s,
                      items: r,
                      refine: n,
                      templateProps: o.templateProps,
                    }),
                    a
                  );
            };
          })({
            containerNode: f,
            cssClasses: m,
            renderState: {},
            templates: d,
          });
        return W(
          W(
            {},
            qr(p, function () {
              return nt(null, f);
            })({ attribute: r, limit: o, sortBy: a, transformItems: h })
          ),
          {},
          { $$widgetType: "ais.menuSelect" }
        );
      },
      numericMenu: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attribute,
          i = t.items,
          a = t.cssClasses,
          s = void 0 === a ? {} : a,
          o = t.templates,
          c = void 0 === o ? {} : o,
          u = t.transformItems;
        if (!n) throw new Error(ts("The `container` option is required."));
        var l = ye(n),
          d = {
            root: Yi(ns(), s.root),
            noRefinementRoot: Yi(
              ns({ modifierName: "noRefinement" }),
              s.noRefinementRoot
            ),
            list: Yi(ns({ descendantName: "list" }), s.list),
            item: Yi(ns({ descendantName: "item" }), s.item),
            selectedItem: Yi(
              ns({ descendantName: "item", modifierName: "selected" }),
              s.selectedItem
            ),
            label: Yi(ns({ descendantName: "label" }), s.label),
            radio: Yi(ns({ descendantName: "radio" }), s.radio),
            labelText: Yi(ns({ descendantName: "labelText" }), s.labelText),
          },
          h = (function (e) {
            var s = e.containerNode,
              o = e.attribute,
              c = e.cssClasses,
              u = e.renderState,
              l = e.templates;
            return function (e, t) {
              var n = e.createURL,
                r = e.instantSearchInstance,
                i = e.refine,
                a = e.items;
              t
                ? (u.templateProps = Se({
                    defaultTemplates: es,
                    templatesConfig: r.templatesConfig,
                    templates: l,
                  }))
                : nt(
                    He(ka, {
                      createURL: n,
                      cssClasses: c,
                      facetValues: a,
                      templateProps: u.templateProps,
                      toggleRefinement: i,
                      attribute: o,
                    }),
                    s
                  );
            };
          })({
            containerNode: l,
            attribute: r,
            cssClasses: d,
            renderState: {},
            templates: c,
          });
        return W(
          W(
            {},
            Qr(h, function () {
              return nt(null, l);
            })({ attribute: r, items: i, transformItems: u })
          ),
          {},
          { $$widgetType: "ais.numericMenu" }
        );
      },
      pagination: function (e) {
        var t = e || {},
          n = t.container,
          r = t.templates,
          i = void 0 === r ? {} : r,
          a = t.cssClasses,
          s = void 0 === a ? {} : a,
          o = t.totalPages,
          c = t.padding,
          u = t.showFirst,
          l = void 0 === u || u,
          d = t.showLast,
          h = void 0 === d || d,
          f = t.showPrevious,
          m = void 0 === f || f,
          p = t.showNext,
          g = void 0 === p || p,
          v = t.scrollTo,
          y = void 0 === v ? "body" : v;
        if (!n) throw new Error(ls("The `container` option is required."));
        var b = ye(n),
          R = !0 === y ? "body" : y,
          S = !1 !== R && ye(R),
          w = {
            root: Yi(us(), s.root),
            noRefinementRoot: Yi(
              us({ modifierName: "noRefinement" }),
              s.noRefinementRoot
            ),
            list: Yi(us({ descendantName: "list" }), s.list),
            item: Yi(us({ descendantName: "item" }), s.item),
            firstPageItem: Yi(
              us({ descendantName: "item", modifierName: "firstPage" }),
              s.firstPageItem
            ),
            lastPageItem: Yi(
              us({ descendantName: "item", modifierName: "lastPage" }),
              s.lastPageItem
            ),
            previousPageItem: Yi(
              us({ descendantName: "item", modifierName: "previousPage" }),
              s.previousPageItem
            ),
            nextPageItem: Yi(
              us({ descendantName: "item", modifierName: "nextPage" }),
              s.nextPageItem
            ),
            pageItem: Yi(
              us({ descendantName: "item", modifierName: "page" }),
              s.pageItem
            ),
            selectedItem: Yi(
              us({ descendantName: "item", modifierName: "selected" }),
              s.selectedItem
            ),
            disabledItem: Yi(
              us({ descendantName: "item", modifierName: "disabled" }),
              s.disabledItem
            ),
            link: Yi(us({ descendantName: "link" }), s.link),
          },
          _ = W(W({}, ds), i),
          P = (function (e) {
            var u = e.containerNode,
              l = e.cssClasses,
              d = e.templates,
              h = e.showFirst,
              f = e.showLast,
              m = e.showPrevious,
              p = e.showNext,
              g = e.scrollToNode;
            return function (e, t) {
              var n = e.createURL,
                r = e.currentRefinement,
                i = e.nbPages,
                a = e.pages,
                s = e.isFirstPage,
                o = e.isLastPage,
                c = e.refine;
              if (!t) {
                nt(
                  He(rs, {
                    createURL: n,
                    cssClasses: l,
                    currentPage: r,
                    templates: d,
                    nbPages: i,
                    pages: a,
                    isFirstPage: s,
                    isLastPage: o,
                    setCurrentPage: function (e) {
                      c(e), !1 !== g && g.scrollIntoView();
                    },
                    showFirst: h,
                    showLast: f,
                    showPrevious: m,
                    showNext: p,
                  }),
                  u
                );
              }
            };
          })({
            containerNode: b,
            cssClasses: w,
            templates: _,
            showFirst: l,
            showLast: h,
            showPrevious: m,
            showNext: g,
            scrollToNode: S,
          });
        return W(
          W(
            {},
            Gr(P, function () {
              return nt(null, b);
            })({ totalPages: o, padding: c })
          ),
          {},
          { $$widgetType: "ais.pagination" }
        );
      },
      panel: function (e) {
        var t = e || {},
          n = t.templates,
          r = void 0 === n ? {} : n,
          i = t.hidden,
          c =
            void 0 === i
              ? function () {
                  return !1;
                }
              : i,
          a = t.collapsed,
          s = t.cssClasses,
          o = void 0 === s ? {} : s,
          u = document.createElement("div"),
          l = Boolean(a),
          d =
            "function" == typeof a
              ? a
              : function () {
                  return !1;
                },
          h = {
            root: Yi(js(), o.root),
            noRefinementRoot: Yi(
              js({ modifierName: "noRefinement" }),
              o.noRefinementRoot
            ),
            collapsibleRoot: Yi(
              js({ modifierName: "collapsible" }),
              o.collapsibleRoot
            ),
            collapsedRoot: Yi(
              js({ modifierName: "collapsed" }),
              o.collapsedRoot
            ),
            collapseButton: Yi(
              js({ descendantName: "collapseButton" }),
              o.collapseButton
            ),
            collapseIcon: Yi(
              js({ descendantName: "collapseIcon" }),
              o.collapseIcon
            ),
            body: Yi(js({ descendantName: "body" }), o.body),
            header: Yi(js({ descendantName: "header" }), o.header),
            footer: Yi(js({ descendantName: "footer" }), o.footer),
          };
        return function (t) {
          return function (e) {
            if (!e || !e.container)
              throw new Error(
                ks(
                  "The `container` option is required in the widget within the panel."
                )
              );
            var i = ye(e.container),
              s = (function (e) {
                var a = e.containerNode,
                  s = e.bodyContainerNode,
                  o = e.cssClasses,
                  c = e.templates;
                return function (e) {
                  var t = e.options,
                    n = e.hidden,
                    r = e.collapsible,
                    i = e.collapsed;
                  nt(
                    He(Ts, {
                      cssClasses: o,
                      hidden: n,
                      collapsible: r,
                      isCollapsed: i,
                      templates: c,
                      data: t,
                      bodyElement: s,
                    }),
                    a
                  );
                };
              })({
                containerNode: i,
                bodyContainerNode: u,
                cssClasses: h,
                templates: W(
                  W(
                    {},
                    {
                      header: "",
                      footer: "",
                      collapseButtonText: function (e) {
                        var t = e.collapsed;
                        return '<svg\n          class="'
                          .concat(
                            h.collapseIcon,
                            '"\n          width="1em"\n          height="1em"\n          viewBox="0 0 500 500"\n        >\n        <path d="'
                          )
                          .concat(
                            t
                              ? "M100 250l300-150v300z"
                              : "M250 400l150-300H100z",
                            '" fill="currentColor" />\n        </svg>'
                          );
                      },
                    }
                  ),
                  r
                ),
              }),
              o = t(W(W({}, e), {}, { container: u }));
            return W(
              W({}, o),
              {},
              {
                init: function () {
                  for (
                    var e = arguments.length, t = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    t[n] = arguments[n];
                  var r,
                    i = t[0],
                    a = W(
                      W(
                        {},
                        o.getWidgetRenderState ? o.getWidgetRenderState(i) : {}
                      ),
                      i
                    );
                  s({ options: a, hidden: !0, collapsible: l, collapsed: !1 }),
                    "function" == typeof o.init &&
                      (r = o.init).call.apply(r, [this].concat(t));
                },
                render: function () {
                  for (
                    var e = arguments.length, t = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    t[n] = arguments[n];
                  var r,
                    i = t[0],
                    a = W(
                      W(
                        {},
                        o.getWidgetRenderState ? o.getWidgetRenderState(i) : {}
                      ),
                      i
                    );
                  s({
                    options: a,
                    hidden: Boolean(c(a)),
                    collapsible: l,
                    collapsed: Boolean(d(a)),
                  }),
                    "function" == typeof o.render &&
                      (r = o.render).call.apply(r, [this].concat(t));
                },
                dispose: function () {
                  if ((nt(null, i), "function" == typeof o.dispose)) {
                    for (
                      var e, t = arguments.length, n = new Array(t), r = 0;
                      r < t;
                      r++
                    )
                      n[r] = arguments[r];
                    return (e = o.dispose).call.apply(e, [this].concat(n));
                  }
                },
              }
            );
          };
        };
      },
      places: function (e) {
        var t = e || {},
          n = t.placesReference,
          r = t.defaultPosition,
          o = void 0 === r ? [] : r,
          i = M(t, ["placesReference", "defaultPosition"]);
        if ("function" != typeof n)
          throw new Error(
            "The `placesReference` option requires a valid Places.js reference."
          );
        var c = n(i),
          u = {
            query: "",
            initialLatLngViaIP: void 0,
            isInitialLatLngViaIPSet: !1,
          };
        return {
          $$type: "ais.places",
          $$widgetType: "ais.places",
          init: function (e) {
            var s = e.helper;
            c.on("change", function (e) {
              var t = e.suggestion,
                n = t.value,
                r = t.latlng,
                i = r.lat,
                a = r.lng;
              (u.query = n),
                s
                  .setQueryParameter("insideBoundingBox", void 0)
                  .setQueryParameter("aroundLatLngViaIP", !1)
                  .setQueryParameter(
                    "aroundLatLng",
                    "".concat(i, ",").concat(a)
                  )
                  .search();
            }),
              c.on("clear", function () {
                (u.query = ""),
                  s.setQueryParameter("insideBoundingBox", void 0),
                  1 < o.length
                    ? s
                        .setQueryParameter("aroundLatLngViaIP", !1)
                        .setQueryParameter("aroundLatLng", o.join(","))
                    : s
                        .setQueryParameter(
                          "aroundLatLngViaIP",
                          u.initialLatLngViaIP
                        )
                        .setQueryParameter("aroundLatLng", void 0),
                  s.search();
              });
          },
          getWidgetUiState: function (e, t) {
            var n = t.searchParameters.aroundLatLng || o.join(",");
            if (n !== o.join(",") || u.query)
              return W(
                W({}, e),
                {},
                { places: { query: u.query, position: n } }
              );
            e.places;
            return M(e, ["places"]);
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState.places || {},
              r = n.query,
              i = void 0 === r ? "" : r,
              a = n.position,
              s = void 0 === a ? o.join(",") : a;
            return (
              (u.query = i),
              u.isInitialLatLngViaIPSet ||
                ((u.isInitialLatLngViaIPSet = !0),
                (u.initialLatLngViaIP = e.aroundLatLngViaIP)),
              c.setVal(i),
              c.close(),
              e
                .setQueryParameter("insideBoundingBox", void 0)
                .setQueryParameter("aroundLatLngViaIP", !1)
                .setQueryParameter("aroundLatLng", s || void 0)
            );
          },
          getRenderState: function (e, t) {
            return W(W({}, e), {}, { places: this.getWidgetRenderState(t) });
          },
          getWidgetRenderState: function () {
            return { widgetParams: e };
          },
        };
      },
      poweredBy: function (e) {
        var t = e || {},
          n = t.container,
          r = t.cssClasses,
          i = void 0 === r ? {} : r,
          a = t.theme,
          s = void 0 === a ? "light" : a;
        if (!n) throw new Error(Os("The `container` option is required."));
        var o = ye(n),
          c = {
            root: Yi(
              Hs(),
              Hs({ modifierName: "dark" === s ? "dark" : "light" }),
              i.root
            ),
            link: Yi(Hs({ descendantName: "link" }), i.link),
            logo: Yi(Hs({ descendantName: "logo" }), i.logo),
          },
          u = (function (e) {
            var a = e.containerNode,
              s = e.cssClasses;
            return function (e, t) {
              var n = e.url,
                r = e.widgetParams;
              if (t) {
                var i = r.theme;
                nt(
                  He(Cs, {
                    cssClasses: s,
                    url: n,
                    theme: void 0 === i ? "light" : i,
                  }),
                  a
                );
              } else;
            };
          })({ containerNode: o, cssClasses: c });
        return W(
          W(
            {},
            xi(u, function () {
              return nt(null, o);
            })({ theme: s })
          ),
          {},
          { $$widgetType: "ais.poweredBy" }
        );
      },
      queryRuleContext: function (e) {
        var t = 0 < arguments.length && void 0 !== e ? e : {};
        if (!t.trackedFilters)
          throw new Error(As("The `trackedFilters` option is required."));
        return W(
          W({}, Ai(Tt)(t)),
          {},
          { $$widgetType: "ais.queryRuleContext" }
        );
      },
      queryRuleCustomData: function (e) {
        var t = e || {},
          n = t.container,
          r = t.cssClasses,
          i = void 0 === r ? {} : r,
          a = t.templates,
          s = void 0 === a ? {} : a,
          o = t.transformItems,
          c =
            void 0 === o
              ? function (e) {
                  return e;
                }
              : o;
        if (!n) throw new Error(Ds("The `container` option is required."));
        var u = { root: Yi(Bs(), i.root) },
          l = ye(n),
          d = W(W({}, Ws), s),
          h = (function (e) {
            var n = e.containerNode,
              r = e.cssClasses,
              i = e.templates;
            return function (e) {
              var t = e.items;
              nt(He(Es, { cssClasses: r, templates: i, items: t }), n);
            };
          })({
            containerNode: l,
            cssClasses: u,
            renderState: {},
            templates: d,
          });
        return W(
          W(
            {},
            Ai(h, function () {
              nt(null, l);
            })({ transformItems: c })
          ),
          {},
          { $$widgetType: "ais.queryRuleCustomData" }
        );
      },
      rangeInput: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attribute,
          i = t.min,
          a = t.max,
          s = t.precision,
          o = void 0 === s ? 0 : s,
          c = t.cssClasses,
          u = void 0 === c ? {} : c,
          l = t.templates,
          d = void 0 === l ? {} : l;
        if (!n) throw new Error(qs("The `container` option is required."));
        var h = ye(n),
          f = {
            root: Yi(Qs(), u.root),
            noRefinement: Yi(Qs({ modifierName: "noRefinement" })),
            form: Yi(Qs({ descendantName: "form" }), u.form),
            label: Yi(Qs({ descendantName: "label" }), u.label),
            input: Yi(Qs({ descendantName: "input" }), u.input),
            inputMin: Yi(
              Qs({ descendantName: "input", modifierName: "min" }),
              u.inputMin
            ),
            inputMax: Yi(
              Qs({ descendantName: "input", modifierName: "max" }),
              u.inputMax
            ),
            separator: Yi(Qs({ descendantName: "separator" }), u.separator),
            submit: Yi(Qs({ descendantName: "submit" }), u.submit),
          },
          m = (function (e) {
            var f = e.containerNode,
              m = e.cssClasses,
              p = e.renderState,
              g = e.templates;
            return function (e, t) {
              var n = e.refine,
                r = e.range,
                i = e.start,
                a = e.widgetParams,
                s = e.instantSearchInstance;
              if (t)
                p.templateProps = Se({
                  defaultTemplates: Vs,
                  templatesConfig: s.templatesConfig,
                  templates: g,
                });
              else {
                var o = r.min,
                  c = r.max,
                  u = D(i, 2),
                  l = u[0],
                  d = u[1],
                  h = 1 / Math.pow(10, a.precision || 0);
                nt(
                  He(Us, {
                    min: o,
                    max: c,
                    step: h,
                    values: {
                      min: l !== -1 / 0 && l !== o ? l : void 0,
                      max: d !== 1 / 0 && d !== c ? d : void 0,
                    },
                    cssClasses: m,
                    refine: n,
                    templateProps: p.templateProps,
                  }),
                  f
                );
              }
            };
          })({
            containerNode: h,
            cssClasses: f,
            templates: d,
            renderState: {},
          });
        return W(
          W(
            {},
            ri(m, function () {
              return nt(null, h);
            })({ attribute: r, min: i, max: a, precision: o })
          ),
          {},
          { $$type: "ais.rangeInput", $$widgetType: "ais.rangeInput" }
        );
      },
      rangeSlider: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attribute,
          i = t.min,
          a = t.max,
          s = t.cssClasses,
          o = void 0 === s ? {} : s,
          c = t.step,
          u = t.pips,
          l = void 0 === u || u,
          d = t.precision,
          h = void 0 === d ? 0 : d,
          f = t.tooltips,
          m = void 0 === f || f;
        if (!n) throw new Error(ho("The `container` option is required."));
        var p = ye(n),
          g = {
            root: Yi(fo(), o.root),
            disabledRoot: Yi(fo({ modifierName: "disabled" }), o.disabledRoot),
          },
          v = (function (e) {
            var h = e.containerNode,
              f = e.cssClasses,
              m = e.pips,
              p = e.step,
              g = e.tooltips;
            return function (e, t) {
              var n = e.refine,
                r = e.range,
                i = e.start;
              if (!t) {
                var a = r.min,
                  s = r.max,
                  o = D(i, 2),
                  c = o[0],
                  u = o[1],
                  l = c === -1 / 0 ? a : c,
                  d = u === 1 / 0 ? s : u;
                nt(
                  He(lo, {
                    cssClasses: f,
                    refine: n,
                    min: a,
                    max: s,
                    values: [s < l ? s : l, d < a ? a : d],
                    tooltips: g,
                    step: p,
                    pips: m,
                  }),
                  h
                );
              }
            };
          })({
            containerNode: p,
            step: c,
            pips: l,
            tooltips: m,
            cssClasses: g,
          });
        return W(
          W(
            {},
            ri(v, function () {
              return nt(null, p);
            })({ attribute: r, min: i, max: a, precision: h })
          ),
          {},
          { $$type: "ais.rangeSlider", $$widgetType: "ais.rangeSlider" }
        );
      },
      ratingMenu: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attribute,
          i = t.max,
          a = void 0 === i ? 5 : i,
          s = t.cssClasses,
          o = void 0 === s ? {} : s,
          c = t.templates,
          u = void 0 === c ? {} : c;
        if (!n) throw new Error(yo("The `container` option is required."));
        var l = ye(n),
          d = {
            root: Yi(bo(), o.root),
            noRefinementRoot: Yi(
              bo({ modifierName: "noRefinement" }),
              o.noRefinementRoot
            ),
            list: Yi(bo({ descendantName: "list" }), o.list),
            item: Yi(bo({ descendantName: "item" }), o.item),
            selectedItem: Yi(
              bo({ descendantName: "item", modifierName: "selected" }),
              o.selectedItem
            ),
            disabledItem: Yi(
              bo({ descendantName: "item", modifierName: "disabled" }),
              o.disabledItem
            ),
            link: Yi(bo({ descendantName: "link" }), o.link),
            starIcon: Yi(bo({ descendantName: "starIcon" }), o.starIcon),
            fullStarIcon: Yi(
              bo({ descendantName: "starIcon", modifierName: "full" }),
              o.fullStarIcon
            ),
            emptyStarIcon: Yi(
              bo({ descendantName: "starIcon", modifierName: "empty" }),
              o.emptyStarIcon
            ),
            label: Yi(bo({ descendantName: "label" }), o.label),
            count: Yi(bo({ descendantName: "count" }), o.count),
          },
          h = (function (e) {
            var s = e.containerNode,
              o = e.cssClasses,
              c = e.templates,
              u = e.renderState;
            return function (e, t) {
              var n = e.refine,
                r = e.items,
                i = e.createURL,
                a = e.instantSearchInstance;
              t
                ? (u.templateProps = Se({
                    defaultTemplates: vo,
                    templatesConfig: a.templatesConfig,
                    templates: c,
                  }))
                : nt(
                    He(
                      ka,
                      {
                        createURL: i,
                        cssClasses: o,
                        facetValues: r,
                        templateProps: u.templateProps,
                        toggleRefinement: n,
                      },
                      He(
                        "svg",
                        { style: "display:none;" },
                        He(
                          "symbol",
                          {
                            id: bo({ descendantName: "starSymbol" }),
                            viewBox: "0 0 24 24",
                          },
                          Ro
                        ),
                        He(
                          "symbol",
                          {
                            id: bo({ descendantName: "starEmptySymbol" }),
                            viewBox: "0 0 24 24",
                          },
                          So
                        )
                      )
                    ),
                    s
                  );
            };
          })({
            containerNode: l,
            cssClasses: d,
            renderState: {},
            templates: u,
          });
        return W(
          W(
            {},
            ci(h, function () {
              return nt(null, l);
            })({ attribute: r, max: a })
          ),
          {},
          { $$widgetType: "ais.ratingMenu" }
        );
      },
      refinementList: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attribute,
          i = t.operator,
          a = t.sortBy,
          s = t.limit,
          o = t.showMore,
          c = t.showMoreLimit,
          u = t.searchable,
          l = void 0 !== u && u,
          d = t.searchablePlaceholder,
          h = void 0 === d ? "Search..." : d,
          f = t.searchableEscapeFacetValues,
          m = void 0 === f || f,
          p = t.searchableIsAlwaysActive,
          g = void 0 === p || p,
          v = t.cssClasses,
          y = void 0 === v ? {} : v,
          b = t.templates,
          R = void 0 === b ? {} : b,
          S = t.transformItems;
        if (!n) throw new Error(Io("The `container` option is required."));
        var w = !!l && Boolean(m),
          _ = ye(n),
          P = {
            root: Yi(Fo(), y.root),
            noRefinementRoot: Yi(
              Fo({ modifierName: "noRefinement" }),
              y.noRefinementRoot
            ),
            list: Yi(Fo({ descendantName: "list" }), y.list),
            item: Yi(Fo({ descendantName: "item" }), y.item),
            selectedItem: Yi(
              Fo({ descendantName: "item", modifierName: "selected" }),
              y.selectedItem
            ),
            searchBox: Yi(Fo({ descendantName: "searchBox" }), y.searchBox),
            label: Yi(Fo({ descendantName: "label" }), y.label),
            checkbox: Yi(Fo({ descendantName: "checkbox" }), y.checkbox),
            labelText: Yi(Fo({ descendantName: "labelText" }), y.labelText),
            count: Yi(Fo({ descendantName: "count" }), y.count),
            noResults: Yi(Fo({ descendantName: "noResults" }), y.noResults),
            showMore: Yi(Fo({ descendantName: "showMore" }), y.showMore),
            disabledShowMore: Yi(
              Fo({ descendantName: "showMore", modifierName: "disabled" }),
              y.disabledShowMore
            ),
            searchable: {
              root: Yi(To(), y.searchableRoot),
              form: Yi(To({ descendantName: "form" }), y.searchableForm),
              input: Yi(To({ descendantName: "input" }), y.searchableInput),
              submit: Yi(To({ descendantName: "submit" }), y.searchableSubmit),
              submitIcon: Yi(
                To({ descendantName: "submitIcon" }),
                y.searchableSubmitIcon
              ),
              reset: Yi(To({ descendantName: "reset" }), y.searchableReset),
              resetIcon: Yi(
                To({ descendantName: "resetIcon" }),
                y.searchableResetIcon
              ),
              loadingIndicator: Yi(
                To({ descendantName: "loadingIndicator" }),
                y.searchableLoadingIndicator
              ),
              loadingIcon: Yi(
                To({ descendantName: "loadingIcon" }),
                y.searchableLoadingIcon
              ),
            },
          },
          N = (function (e) {
            var h = e.containerNode,
              f = e.cssClasses,
              m = e.templates,
              p = e.searchBoxTemplates,
              g = e.renderState,
              v = e.showMore,
              y = e.searchable,
              b = e.searchablePlaceholder,
              R = e.searchableIsAlwaysActive;
            return function (e, t) {
              var n = e.refine,
                r = e.items,
                i = e.createURL,
                a = e.searchForItems,
                s = e.isFromSearch,
                o = e.instantSearchInstance,
                c = e.toggleShowMore,
                u = e.isShowingMore,
                l = e.hasExhaustiveItems,
                d = e.canToggleShowMore;
              if (t)
                return (
                  (g.templateProps = Se({
                    defaultTemplates: xo,
                    templatesConfig: o.templatesConfig,
                    templates: m,
                  })),
                  void (g.searchBoxTemplateProps = Se({
                    defaultTemplates: No,
                    templatesConfig: o.templatesConfig,
                    templates: p,
                  }))
                );
              nt(
                He(ka, {
                  createURL: i,
                  cssClasses: f,
                  facetValues: r,
                  templateProps: g.templateProps,
                  searchBoxTemplateProps: g.searchBoxTemplateProps,
                  toggleRefinement: n,
                  searchFacetValues: y ? a : void 0,
                  searchPlaceholder: b,
                  searchIsAlwaysActive: R,
                  isFromSearch: s,
                  showMore: v && !s && 0 < r.length,
                  toggleShowMore: c,
                  isShowingMore: u,
                  hasExhaustiveItems: l,
                  canToggleShowMore: d,
                }),
                h
              );
            };
          })({
            containerNode: _,
            cssClasses: P,
            templates: R,
            searchBoxTemplates: {
              submit: R.searchableSubmit,
              reset: R.searchableReset,
              loadingIndicator: R.searchableLoadingIndicator,
            },
            renderState: {},
            searchable: l,
            searchablePlaceholder: h,
            searchableIsAlwaysActive: g,
            showMore: o,
          });
        return W(
          W(
            {},
            ii(N, function () {
              return nt(null, _);
            })({
              attribute: r,
              operator: i,
              limit: s,
              showMore: o,
              showMoreLimit: c,
              sortBy: a,
              escapeFacetValues: w,
              transformItems: S,
            })
          ),
          {},
          { $$widgetType: "ais.refinementList" }
        );
      },
      relevantSort: function (e) {
        var t = e.container,
          n = e.templates,
          r = void 0 === n ? {} : n,
          i = e.cssClasses,
          a = void 0 === i ? {} : i;
        if (!t) throw new Error(Eo("The `container` option is required."));
        var s = ye(t),
          o = {
            root: Yi(ko(), a.root),
            text: Yi(ko({ descendantName: "text" }), a.text),
            button: Yi(ko({ descendantName: "button" }), a.button),
          },
          c = W(W({}, Co), r),
          u = (function (e) {
            var i = e.containerNode,
              a = e.cssClasses,
              s = e.templates;
            return function (e) {
              var t = e.isRelevantSorted,
                n = e.isVirtualReplica,
                r = e.refine;
              nt(
                He(po, {
                  cssClasses: a,
                  templates: s,
                  isRelevantSorted: t,
                  isVirtualReplica: n,
                  refine: r,
                }),
                i
              );
            };
          })({
            containerNode: s,
            cssClasses: o,
            renderState: {},
            templates: c,
          });
        return W(
          W(
            {},
            qi(u, function () {
              nt(null, s);
            })({})
          ),
          {},
          { $$widgetType: "ais.relevantSort" }
        );
      },
      searchBox: function (e) {
        var t = e || {},
          n = t.container,
          r = t.placeholder,
          i = void 0 === r ? "" : r,
          a = t.cssClasses,
          s = void 0 === a ? {} : a,
          o = t.autofocus,
          c = void 0 !== o && o,
          u = t.searchAsYouType,
          l = void 0 === u || u,
          d = t.showReset,
          h = void 0 === d || d,
          f = t.showSubmit,
          m = void 0 === f || f,
          p = t.showLoadingIndicator,
          g = void 0 === p || p,
          v = t.queryHook,
          y = t.templates,
          b = void 0 === y ? {} : y;
        if (!n) throw new Error(jo("The `container` option is required."));
        var R = ye(n),
          S = {
            root: Yi(Lo(), s.root),
            form: Yi(Lo({ descendantName: "form" }), s.form),
            input: Yi(Lo({ descendantName: "input" }), s.input),
            submit: Yi(Lo({ descendantName: "submit" }), s.submit),
            submitIcon: Yi(Lo({ descendantName: "submitIcon" }), s.submitIcon),
            reset: Yi(Lo({ descendantName: "reset" }), s.reset),
            resetIcon: Yi(Lo({ descendantName: "resetIcon" }), s.resetIcon),
            loadingIndicator: Yi(
              Lo({ descendantName: "loadingIndicator" }),
              s.loadingIndicator
            ),
            loadingIcon: Yi(
              Lo({ descendantName: "loadingIcon" }),
              s.loadingIcon
            ),
          },
          w = W(W({}, No), b),
          _ = (function (e) {
            var i = e.containerNode,
              a = e.cssClasses,
              s = e.placeholder,
              o = e.templates,
              c = e.autofocus,
              u = e.searchAsYouType,
              l = e.showReset,
              d = e.showSubmit,
              h = e.showLoadingIndicator;
            return function (e) {
              var t = e.refine,
                n = e.query,
                r = e.isSearchStalled;
              nt(
                He(Ca, {
                  query: n,
                  placeholder: s,
                  autofocus: c,
                  refine: t,
                  searchAsYouType: u,
                  templates: o,
                  showSubmit: d,
                  showReset: l,
                  showLoadingIndicator: h,
                  isSearchStalled: r,
                  cssClasses: a,
                }),
                i
              );
            };
          })({
            containerNode: R,
            cssClasses: S,
            placeholder: i,
            templates: w,
            autofocus: c,
            searchAsYouType: l,
            showReset: h,
            showSubmit: m,
            showLoadingIndicator: g,
          });
        return W(
          W(
            {},
            si(_, function () {
              return nt(null, R);
            })({ queryHook: v })
          ),
          {},
          { $$widgetType: "ais.searchBox" }
        );
      },
      sortBy: function (e) {
        var t = e || {},
          n = t.container,
          r = t.items,
          i = t.cssClasses,
          a = void 0 === i ? {} : i,
          s = t.transformItems;
        if (!n) throw new Error(Mo("The `container` option is required."));
        var o = ye(n),
          c = {
            root: Yi(Ho(), a.root),
            select: Yi(Ho({ descendantName: "select" }), a.select),
            option: Yi(Ho({ descendantName: "option" }), a.option),
          },
          u = (function (e) {
            var a = e.containerNode,
              s = e.cssClasses;
            return function (e, t) {
              var n = e.currentRefinement,
                r = e.options,
                i = e.refine;
              t ||
                nt(
                  He(
                    "div",
                    { className: s.root },
                    He(Da, {
                      cssClasses: s,
                      currentValue: n,
                      options: r,
                      setValue: i,
                    })
                  ),
                  a
                );
            };
          })({ containerNode: o, cssClasses: c });
        return W(
          W(
            {},
            oi(u, function () {
              return nt(null, o);
            })({ container: o, items: r, transformItems: s })
          ),
          {},
          { $$widgetType: "ais.sortBy" }
        );
      },
      stats: function (e) {
        var t = e || {},
          n = t.container,
          r = t.cssClasses,
          i = void 0 === r ? {} : r,
          a = t.templates,
          s = void 0 === a ? {} : a;
        if (!n) throw new Error(Oo("The `container` option is required."));
        var o = ye(n),
          c = {
            root: Yi(Ao(), i.root),
            text: Yi(Ao({ descendantName: "text" }), i.text),
          },
          u = (function (e) {
            var d = e.renderState,
              h = e.cssClasses,
              f = e.containerNode,
              m = e.templates;
            return function (e, t) {
              var n = e.hitsPerPage,
                r = e.nbHits,
                i = e.nbSortedHits,
                a = e.areHitsSorted,
                s = e.nbPages,
                o = e.page,
                c = e.processingTimeMS,
                u = e.query,
                l = e.instantSearchInstance;
              t
                ? (d.templateProps = Se({
                    defaultTemplates: Wo,
                    templatesConfig: l.templatesConfig,
                    templates: m,
                  }))
                : nt(
                    He(go, {
                      cssClasses: h,
                      hitsPerPage: n,
                      nbHits: r,
                      nbSortedHits: i,
                      areHitsSorted: a,
                      nbPages: s,
                      page: o,
                      processingTimeMS: c,
                      query: u,
                      templateProps: d.templateProps,
                    }),
                    f
                  );
            };
          })({
            containerNode: o,
            cssClasses: c,
            templates: s,
            renderState: {},
          });
        return W(
          W(
            {},
            ui(u, function () {
              return nt(null, o);
            })({})
          ),
          {},
          { $$widgetType: "ais.stats" }
        );
      },
      toggleRefinement: function (e) {
        var t = e || {},
          n = t.container,
          r = t.attribute,
          i = t.cssClasses,
          a = void 0 === i ? {} : i,
          s = t.templates,
          o = void 0 === s ? {} : s,
          c = t.on,
          u = void 0 === c || c,
          l = t.off;
        if (!n) throw new Error(Qo("The `container` option is required."));
        var d = ye(n),
          h = {
            root: Yi(Vo(), a.root),
            label: Yi(Vo({ descendantName: "label" }), a.label),
            checkbox: Yi(Vo({ descendantName: "checkbox" }), a.checkbox),
            labelText: Yi(Vo({ descendantName: "labelText" }), a.labelText),
          },
          f = (function (e) {
            var a = e.containerNode,
              s = e.cssClasses,
              o = e.renderState,
              c = e.templates;
            return function (e, t) {
              var n = e.value,
                r = e.refine,
                i = e.instantSearchInstance;
              t
                ? (o.templateProps = Se({
                    defaultTemplates: qo,
                    templatesConfig: i.templatesConfig,
                    templates: c,
                  }))
                : nt(
                    He(Do, {
                      cssClasses: s,
                      currentRefinement: n,
                      templateProps: o.templateProps,
                      refine: r,
                    }),
                    a
                  );
            };
          })({
            containerNode: d,
            cssClasses: h,
            renderState: {},
            templates: o,
          });
        return W(
          W(
            {},
            li(f, function () {
              return nt(null, d);
            })({ attribute: r, on: u, off: l })
          ),
          {},
          { $$widgetType: "ais.toggleRefinement" }
        );
      },
      voiceSearch: function (e) {
        var t = e || {},
          n = t.container,
          r = t.cssClasses,
          i = void 0 === r ? {} : r,
          a = t.templates,
          s = void 0 === a ? {} : a,
          o = t.searchAsYouSpeak,
          c = void 0 !== o && o,
          u = t.language,
          l = t.additionalQueryParameters,
          d = t.createVoiceSearchHelper;
        if (!n) throw new Error(Xo("The `container` option is required."));
        var h = ye(n),
          f = {
            root: Yi(Go(), i.root),
            button: Yi(Go({ descendantName: "button" }), i.button),
            status: Yi(Go({ descendantName: "status" }), i.status),
          },
          m = W(W({}, Yo), s),
          p = (function (e) {
            var a = e.containerNode,
              s = e.cssClasses,
              o = e.templates;
            return function (e) {
              var t = e.isBrowserSupported,
                n = e.isListening,
                r = e.toggleListening,
                i = e.voiceListeningState;
              nt(
                He(Bo, {
                  cssClasses: s,
                  templates: o,
                  isBrowserSupported: t,
                  isListening: n,
                  toggleListening: r,
                  voiceListeningState: i,
                }),
                a
              );
            };
          })({ containerNode: h, cssClasses: f, templates: m });
        return W(
          W(
            {},
            Di(p, function () {
              return nt(null, h);
            })({
              container: h,
              cssClasses: f,
              templates: m,
              searchAsYouSpeak: c,
              language: u,
              additionalQueryParameters: l,
              createVoiceSearchHelper: d,
            })
          ),
          {},
          { $$widgetType: "ais.voiceSearch" }
        );
      },
    }),
    tc = Object.freeze({
      __proto__: null,
      createInsightsMiddleware: function (e) {
        var t = e || {},
          d = t.insightsClient,
          h = t.insightsInitParams,
          f = t.onEvent;
        if (null !== d && !d)
          throw new Error(
            "The `insightsClient` option is required. To disable, set it to `null`."
          );
        var m = Boolean(d),
          p = null === d ? Tt : d;
        return function (e) {
          var n = e.instantSearchInstance,
            t = D(
              (function (e) {
                if (e.transporter) {
                  var t = e.transporter,
                    n = t.headers,
                    r = t.queryParameters,
                    i = "x-algolia-application-id",
                    a = "x-algolia-api-key";
                  return [n[i] || r[i], n[a] || r[a]];
                }
                return [e.applicationID, e.apiKey];
              })(n.client),
              2
            ),
            r = t[0],
            i = t[1],
            a = void 0,
            s = void 0;
          if (Array.isArray(p.queue)) {
            var o = D(
              Ut(p.queue.slice().reverse(), function (e) {
                return "setUserToken" === D(e, 1)[0];
              }) || [],
              2
            );
            a = o[1];
          }
          p("getUserToken", null, function (e, t) {
            s = t;
          }),
            p("init", W({ appId: r, apiKey: i }, h));
          var c,
            u,
            l = Ei(Tt);
          return {
            onStateChange: function () {},
            subscribe: function () {
              p("addAlgoliaAgent", "insights-middleware"),
                (c = l({ searchParameters: { clickAnalytics: !0 } })),
                n.addWidgets([c]);
              function e(e) {
                u && n.removeWidgets([u]),
                  (u = l({ searchParameters: { userToken: e } })),
                  n.addWidgets([u]);
              }
              var t = On();
              m && t && e(t),
                s ? p("setUserToken", s) : a && p("setUserToken", a),
                p("onUserTokenChange", e, { immediate: !0 }),
                (n.sendEventToInsights = function (e) {
                  if (f) f(e, d);
                  else if (e.insightsMethod) {
                    Boolean(
                      n.renderState[n.indexName].configure.widgetParams
                        .searchParameters.userToken
                    ) && p(e.insightsMethod, e.payload);
                  }
                });
            },
            unsubscribe: function () {
              p("onUserTokenChange", void 0),
                n.removeWidgets([c, u]),
                (u = c = void 0),
                (n.sendEventToInsights = Tt);
            },
          };
        };
      },
      createRouterMiddleware: mr,
      isMetadataEnabled: pr,
      createMetadataMiddleware: gr,
    }),
    nc = Object.freeze({ __proto__: null, history: fr });
  function rc(e) {
    e.configure;
    return M(e, ["configure"]);
  }
  var ic = Object.freeze({
    __proto__: null,
    simple: Dn,
    singleIndex: function (t) {
      return {
        stateToRoute: function (e) {
          return rc(e[t] || {});
        },
        routeToState: function (e) {
          return j({}, t, rc(0 < arguments.length && void 0 !== e ? e : {}));
        },
      };
    },
  });
  function ac(e) {
    var t = e || {};
    t.page;
    return M(t, ["page"]);
  }
  var sc = "ais.infiniteHits";
  function oc(e) {
    return new Rr(e);
  }
  return (
    (oc.version = "4.46.0"),
    (oc.connectors = zi),
    (oc.widgets = ec),
    (oc.middlewares = tc),
    (oc.routers = nc),
    (oc.stateMappings = ic),
    (oc.createInfiniteHitsSessionStorageCache = function () {
      return {
        read: function (e) {
          var t = e.state,
            n = yn(function (e) {
              return e.window.sessionStorage;
            });
          if (!n) return null;
          try {
            var r = JSON.parse(n.getItem(sc));
            return r && Xt(r.state, ac(t)) ? r.hits : null;
          } catch (e) {
            if (e instanceof SyntaxError)
              try {
                n.removeItem(sc);
              } catch (e) {}
            return null;
          }
        },
        write: function (e) {
          var t = e.state,
            n = e.hits,
            r = yn(function (e) {
              return e.window.sessionStorage;
            });
          if (r)
            try {
              r.setItem(sc, JSON.stringify({ state: ac(t), hits: n }));
            } catch (e) {}
        },
      };
    }),
    (oc.highlight = Tn),
    (oc.reverseHighlight = En),
    (oc.snippet = jn),
    (oc.reverseSnippet = Mn),
    (oc.insights = Hn),
    oc
  );
});
//# sourceMappingURL=instantsearch.production.min.js.map
