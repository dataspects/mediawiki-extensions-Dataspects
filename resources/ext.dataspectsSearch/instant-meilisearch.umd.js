/*
0.8.2
https://www.jsdelivr.com/package/npm/@meilisearch/instant-meilisearch
*/
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(
        ((t =
          "undefined" != typeof globalThis ? globalThis : t || self).window =
          t.window || {})
      );
})(this, function (t) {
  "use strict";
  var e = function () {
    return (
      (e =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var i in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t;
        }),
      e.apply(this, arguments)
    );
  };
  function n(t, e, n, r) {
    return new (n || (n = Promise))(function (i, o) {
      function s(t) {
        try {
          u(r.next(t));
        } catch (t) {
          o(t);
        }
      }
      function a(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          o(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? i(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(s, a);
      }
      u((r = r.apply(t, e || [])).next());
    });
  }
  function r(t, e) {
    var n,
      r,
      i,
      o,
      s = {
        label: 0,
        sent: function () {
          if (1 & i[0]) throw i[1];
          return i[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (o = { next: a(0), throw: a(1), return: a(2) }),
      "function" == typeof Symbol &&
        (o[Symbol.iterator] = function () {
          return this;
        }),
      o
    );
    function a(o) {
      return function (a) {
        return (function (o) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; s; )
            try {
              if (
                ((n = 1),
                r &&
                  (i =
                    2 & o[0]
                      ? r.return
                      : o[0]
                      ? r.throw || ((i = r.return) && i.call(r), 0)
                      : r.next) &&
                  !(i = i.call(r, o[1])).done)
              )
                return i;
              switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                case 0:
                case 1:
                  i = o;
                  break;
                case 4:
                  return s.label++, { value: o[1], done: !1 };
                case 5:
                  s.label++, (r = o[1]), (o = [0]);
                  continue;
                case 7:
                  (o = s.ops.pop()), s.trys.pop();
                  continue;
                default:
                  if (
                    !((i = s.trys),
                    (i = i.length > 0 && i[i.length - 1]) ||
                      (6 !== o[0] && 2 !== o[0]))
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                    s.label = o[1];
                    break;
                  }
                  if (6 === o[0] && s.label < i[1]) {
                    (s.label = i[1]), (i = o);
                    break;
                  }
                  if (i && s.label < i[2]) {
                    (s.label = i[2]), s.ops.push(o);
                    break;
                  }
                  i[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }
              o = e.call(t, s);
            } catch (t) {
              (o = [6, t]), (r = 0);
            } finally {
              n = i = 0;
            }
          if (5 & o[0]) throw o[1];
          return { value: o[0] ? o[1] : void 0, done: !0 };
        })([o, a]);
      };
    }
  }
  function i(t, e, n) {
    if (n || 2 === arguments.length)
      for (var r, i = 0, o = e.length; i < o; i++)
        (!r && i in e) ||
          (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]));
    return t.concat(r || Array.prototype.slice.call(e));
  }
  var o =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  function s(t) {
    var e = { exports: {} };
    return t(e, e.exports), e.exports;
  }
  s(function (t) {
    !(function (t) {
      !(function (e) {
        var n = "URLSearchParams" in t,
          r = "Symbol" in t && "iterator" in Symbol,
          i =
            "FileReader" in t &&
            "Blob" in t &&
            (function () {
              try {
                return new Blob(), !0;
              } catch (t) {
                return !1;
              }
            })(),
          o = "FormData" in t,
          s = "ArrayBuffer" in t;
        if (s)
          var a = [
              "[object Int8Array]",
              "[object Uint8Array]",
              "[object Uint8ClampedArray]",
              "[object Int16Array]",
              "[object Uint16Array]",
              "[object Int32Array]",
              "[object Uint32Array]",
              "[object Float32Array]",
              "[object Float64Array]",
            ],
            u =
              ArrayBuffer.isView ||
              function (t) {
                return t && a.indexOf(Object.prototype.toString.call(t)) > -1;
              };
        function c(t) {
          if (
            ("string" != typeof t && (t = String(t)),
            /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))
          )
            throw new TypeError("Invalid character in header field name");
          return t.toLowerCase();
        }
        function h(t) {
          return "string" != typeof t && (t = String(t)), t;
        }
        function l(t) {
          var e = {
            next: function () {
              var e = t.shift();
              return { done: void 0 === e, value: e };
            },
          };
          return (
            r &&
              (e[Symbol.iterator] = function () {
                return e;
              }),
            e
          );
        }
        function d(t) {
          (this.map = {}),
            t instanceof d
              ? t.forEach(function (t, e) {
                  this.append(e, t);
                }, this)
              : Array.isArray(t)
              ? t.forEach(function (t) {
                  this.append(t[0], t[1]);
                }, this)
              : t &&
                Object.getOwnPropertyNames(t).forEach(function (e) {
                  this.append(e, t[e]);
                }, this);
        }
        function f(t) {
          if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
          t.bodyUsed = !0;
        }
        function p(t) {
          return new Promise(function (e, n) {
            (t.onload = function () {
              e(t.result);
            }),
              (t.onerror = function () {
                n(t.error);
              });
          });
        }
        function v(t) {
          var e = new FileReader(),
            n = p(e);
          return e.readAsArrayBuffer(t), n;
        }
        function y(t) {
          if (t.slice) return t.slice(0);
          var e = new Uint8Array(t.byteLength);
          return e.set(new Uint8Array(t)), e.buffer;
        }
        function b() {
          return (
            (this.bodyUsed = !1),
            (this._initBody = function (t) {
              var e;
              (this._bodyInit = t),
                t
                  ? "string" == typeof t
                    ? (this._bodyText = t)
                    : i && Blob.prototype.isPrototypeOf(t)
                    ? (this._bodyBlob = t)
                    : o && FormData.prototype.isPrototypeOf(t)
                    ? (this._bodyFormData = t)
                    : n && URLSearchParams.prototype.isPrototypeOf(t)
                    ? (this._bodyText = t.toString())
                    : s && i && (e = t) && DataView.prototype.isPrototypeOf(e)
                    ? ((this._bodyArrayBuffer = y(t.buffer)),
                      (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                    : s && (ArrayBuffer.prototype.isPrototypeOf(t) || u(t))
                    ? (this._bodyArrayBuffer = y(t))
                    : (this._bodyText = t = Object.prototype.toString.call(t))
                  : (this._bodyText = ""),
                this.headers.get("content-type") ||
                  ("string" == typeof t
                    ? this.headers.set(
                        "content-type",
                        "text/plain;charset=UTF-8"
                      )
                    : this._bodyBlob && this._bodyBlob.type
                    ? this.headers.set("content-type", this._bodyBlob.type)
                    : n &&
                      URLSearchParams.prototype.isPrototypeOf(t) &&
                      this.headers.set(
                        "content-type",
                        "application/x-www-form-urlencoded;charset=UTF-8"
                      ));
            }),
            i &&
              ((this.blob = function () {
                var t = f(this);
                if (t) return t;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer)
                  return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData)
                  throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]));
              }),
              (this.arrayBuffer = function () {
                return this._bodyArrayBuffer
                  ? f(this) || Promise.resolve(this._bodyArrayBuffer)
                  : this.blob().then(v);
              })),
            (this.text = function () {
              var t,
                e,
                n,
                r = f(this);
              if (r) return r;
              if (this._bodyBlob)
                return (
                  (t = this._bodyBlob),
                  (e = new FileReader()),
                  (n = p(e)),
                  e.readAsText(t),
                  n
                );
              if (this._bodyArrayBuffer)
                return Promise.resolve(
                  (function (t) {
                    for (
                      var e = new Uint8Array(t), n = new Array(e.length), r = 0;
                      r < e.length;
                      r++
                    )
                      n[r] = String.fromCharCode(e[r]);
                    return n.join("");
                  })(this._bodyArrayBuffer)
                );
              if (this._bodyFormData)
                throw new Error("could not read FormData body as text");
              return Promise.resolve(this._bodyText);
            }),
            o &&
              (this.formData = function () {
                return this.text().then(m);
              }),
            (this.json = function () {
              return this.text().then(JSON.parse);
            }),
            this
          );
        }
        (d.prototype.append = function (t, e) {
          (t = c(t)), (e = h(e));
          var n = this.map[t];
          this.map[t] = n ? n + ", " + e : e;
        }),
          (d.prototype.delete = function (t) {
            delete this.map[c(t)];
          }),
          (d.prototype.get = function (t) {
            return (t = c(t)), this.has(t) ? this.map[t] : null;
          }),
          (d.prototype.has = function (t) {
            return this.map.hasOwnProperty(c(t));
          }),
          (d.prototype.set = function (t, e) {
            this.map[c(t)] = h(e);
          }),
          (d.prototype.forEach = function (t, e) {
            for (var n in this.map)
              this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this);
          }),
          (d.prototype.keys = function () {
            var t = [];
            return (
              this.forEach(function (e, n) {
                t.push(n);
              }),
              l(t)
            );
          }),
          (d.prototype.values = function () {
            var t = [];
            return (
              this.forEach(function (e) {
                t.push(e);
              }),
              l(t)
            );
          }),
          (d.prototype.entries = function () {
            var t = [];
            return (
              this.forEach(function (e, n) {
                t.push([n, e]);
              }),
              l(t)
            );
          }),
          r && (d.prototype[Symbol.iterator] = d.prototype.entries);
        var g = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function w(t, e) {
          var n,
            r,
            i = (e = e || {}).body;
          if (t instanceof w) {
            if (t.bodyUsed) throw new TypeError("Already read");
            (this.url = t.url),
              (this.credentials = t.credentials),
              e.headers || (this.headers = new d(t.headers)),
              (this.method = t.method),
              (this.mode = t.mode),
              (this.signal = t.signal),
              i ||
                null == t._bodyInit ||
                ((i = t._bodyInit), (t.bodyUsed = !0));
          } else this.url = String(t);
          if (
            ((this.credentials =
              e.credentials || this.credentials || "same-origin"),
            (!e.headers && this.headers) || (this.headers = new d(e.headers)),
            (this.method =
              ((n = e.method || this.method || "GET"),
              (r = n.toUpperCase()),
              g.indexOf(r) > -1 ? r : n)),
            (this.mode = e.mode || this.mode || null),
            (this.signal = e.signal || this.signal),
            (this.referrer = null),
            ("GET" === this.method || "HEAD" === this.method) && i)
          )
            throw new TypeError("Body not allowed for GET or HEAD requests");
          this._initBody(i);
        }
        function m(t) {
          var e = new FormData();
          return (
            t
              .trim()
              .split("&")
              .forEach(function (t) {
                if (t) {
                  var n = t.split("="),
                    r = n.shift().replace(/\+/g, " "),
                    i = n.join("=").replace(/\+/g, " ");
                  e.append(decodeURIComponent(r), decodeURIComponent(i));
                }
              }),
            e
          );
        }
        function T(t, e) {
          e || (e = {}),
            (this.type = "default"),
            (this.status = void 0 === e.status ? 200 : e.status),
            (this.ok = this.status >= 200 && this.status < 300),
            (this.statusText = "statusText" in e ? e.statusText : "OK"),
            (this.headers = new d(e.headers)),
            (this.url = e.url || ""),
            this._initBody(t);
        }
        (w.prototype.clone = function () {
          return new w(this, { body: this._bodyInit });
        }),
          b.call(w.prototype),
          b.call(T.prototype),
          (T.prototype.clone = function () {
            return new T(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new d(this.headers),
              url: this.url,
            });
          }),
          (T.error = function () {
            var t = new T(null, { status: 0, statusText: "" });
            return (t.type = "error"), t;
          });
        var x = [301, 302, 303, 307, 308];
        (T.redirect = function (t, e) {
          if (-1 === x.indexOf(e)) throw new RangeError("Invalid status code");
          return new T(null, { status: e, headers: { location: t } });
        }),
          (e.DOMException = t.DOMException);
        try {
          new e.DOMException();
        } catch (t) {
          (e.DOMException = function (t, e) {
            (this.message = t), (this.name = e);
            var n = Error(t);
            this.stack = n.stack;
          }),
            (e.DOMException.prototype = Object.create(Error.prototype)),
            (e.DOMException.prototype.constructor = e.DOMException);
        }
        function R(t, n) {
          return new Promise(function (r, o) {
            var s = new w(t, n);
            if (s.signal && s.signal.aborted)
              return o(new e.DOMException("Aborted", "AbortError"));
            var a = new XMLHttpRequest();
            function u() {
              a.abort();
            }
            (a.onload = function () {
              var t,
                e,
                n = {
                  status: a.status,
                  statusText: a.statusText,
                  headers:
                    ((t = a.getAllResponseHeaders() || ""),
                    (e = new d()),
                    t
                      .replace(/\r?\n[\t ]+/g, " ")
                      .split(/\r?\n/)
                      .forEach(function (t) {
                        var n = t.split(":"),
                          r = n.shift().trim();
                        if (r) {
                          var i = n.join(":").trim();
                          e.append(r, i);
                        }
                      }),
                    e),
                };
              n.url =
                "responseURL" in a
                  ? a.responseURL
                  : n.headers.get("X-Request-URL");
              var i = "response" in a ? a.response : a.responseText;
              r(new T(i, n));
            }),
              (a.onerror = function () {
                o(new TypeError("Network request failed"));
              }),
              (a.ontimeout = function () {
                o(new TypeError("Network request failed"));
              }),
              (a.onabort = function () {
                o(new e.DOMException("Aborted", "AbortError"));
              }),
              a.open(s.method, s.url, !0),
              "include" === s.credentials
                ? (a.withCredentials = !0)
                : "omit" === s.credentials && (a.withCredentials = !1),
              "responseType" in a && i && (a.responseType = "blob"),
              s.headers.forEach(function (t, e) {
                a.setRequestHeader(e, t);
              }),
              s.signal &&
                (s.signal.addEventListener("abort", u),
                (a.onreadystatechange = function () {
                  4 === a.readyState &&
                    s.signal.removeEventListener("abort", u);
                })),
              a.send(void 0 === s._bodyInit ? null : s._bodyInit);
          });
        }
        (R.polyfill = !0),
          t.fetch ||
            ((t.fetch = R), (t.Headers = d), (t.Request = w), (t.Response = T)),
          (e.Headers = d),
          (e.Request = w),
          (e.Response = T),
          (e.fetch = R),
          Object.defineProperty(e, "__esModule", { value: !0 });
      })({});
    })("undefined" != typeof self ? self : o);
  });
  var a = s(function (t, e) {
    !(function (t) {
      /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.
          Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.
          THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            }),
          e(t, n)
        );
      };
      function n(t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      }
      var r = function () {
        return (
          (r =
            Object.assign ||
            function (t) {
              for (var e, n = 1, r = arguments.length; n < r; n++)
                for (var i in (e = arguments[n]))
                  Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
              return t;
            }),
          r.apply(this, arguments)
        );
      };
      function i(t, e, n, r) {
        function i(t) {
          return t instanceof n
            ? t
            : new n(function (e) {
                e(t);
              });
        }
        return new (n || (n = Promise))(function (n, o) {
          function s(t) {
            try {
              u(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            t.done ? n(t.value) : i(t.value).then(s, a);
          }
          u((r = r.apply(t, e || [])).next());
        });
      }
      function o(t, e) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function () {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function a(t) {
          return function (e) {
            return u([t, e]);
          };
        }
        function u(o) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; s; )
            try {
              if (
                ((n = 1),
                r &&
                  (i =
                    2 & o[0]
                      ? r.return
                      : o[0]
                      ? r.throw || ((i = r.return) && i.call(r), 0)
                      : r.next) &&
                  !(i = i.call(r, o[1])).done)
              )
                return i;
              switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                case 0:
                case 1:
                  i = o;
                  break;
                case 4:
                  return s.label++, { value: o[1], done: !1 };
                case 5:
                  s.label++, (r = o[1]), (o = [0]);
                  continue;
                case 7:
                  (o = s.ops.pop()), s.trys.pop();
                  continue;
                default:
                  if (
                    !(
                      (i = (i = s.trys).length > 0 && i[i.length - 1]) ||
                      (6 !== o[0] && 2 !== o[0])
                    )
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                    s.label = o[1];
                    break;
                  }
                  if (6 === o[0] && s.label < i[1]) {
                    (s.label = i[1]), (i = o);
                    break;
                  }
                  if (i && s.label < i[2]) {
                    (s.label = i[2]), s.ops.push(o);
                    break;
                  }
                  i[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }
              o = e.call(t, s);
            } catch (t) {
              (o = [6, t]), (r = 0);
            } finally {
              n = i = 0;
            }
          if (5 & o[0]) throw o[1];
          return { value: o[0] ? o[1] : void 0, done: !0 };
        }
      }
      var s = (function (t) {
          function e(n, r, i, o) {
            var s,
              a,
              u,
              c = this;
            return (
              (c = t.call(this, n) || this),
              Object.setPrototypeOf(c, e.prototype),
              (c.name = "MeiliSearchCommunicationError"),
              r instanceof Response &&
                ((c.message = r.statusText), (c.statusCode = r.status)),
              r instanceof Error && ((c.errno = r.errno), (c.code = r.code)),
              o
                ? ((c.stack = o),
                  (c.stack =
                    null === (s = c.stack) || void 0 === s
                      ? void 0
                      : s.replace(/(TypeError|FetchError)/, c.name)),
                  (c.stack =
                    null === (a = c.stack) || void 0 === a
                      ? void 0
                      : a.replace(
                          "Failed to fetch",
                          "request to ".concat(
                            i,
                            " failed, reason: connect ECONNREFUSED"
                          )
                        )),
                  (c.stack =
                    null === (u = c.stack) || void 0 === u
                      ? void 0
                      : u.replace("Not Found", "Not Found: ".concat(i))))
                : Error.captureStackTrace && Error.captureStackTrace(c, e),
              c
            );
          }
          return n(e, t), e;
        })(Error),
        a = (function (t) {
          function e(e, n) {
            var r = t.call(this, e.message) || this;
            return (
              Object.setPrototypeOf(r, a.prototype),
              (r.name = "MeiliSearchApiError"),
              (r.code = e.code),
              (r.type = e.type),
              (r.link = e.link),
              (r.message = e.message),
              (r.httpStatus = n),
              Error.captureStackTrace && Error.captureStackTrace(r, a),
              r
            );
          }
          return n(e, t), e;
        })(Error);
      function u(t) {
        return i(this, void 0, void 0, function () {
          var e;
          return o(this, function (n) {
            switch (n.label) {
              case 0:
                if (t.ok) return [3, 5];
                (e = void 0), (n.label = 1);
              case 1:
                return n.trys.push([1, 3, , 4]), [4, t.json()];
              case 2:
                return (e = n.sent()), [3, 4];
              case 3:
                throw (n.sent(), new s(t.statusText, t, t.url));
              case 4:
                throw new a(e, t.status);
              case 5:
                return [2, t];
            }
          });
        });
      }
      function c(t, e, n) {
        if ("MeiliSearchApiError" !== t.name) throw new s(t.message, t, n, e);
        throw t;
      }
      var h = (function (t) {
          function e(n) {
            var r = t.call(this, n) || this;
            return (
              Object.setPrototypeOf(r, e.prototype),
              (r.name = "MeiliSearchError"),
              Error.captureStackTrace && Error.captureStackTrace(r, e),
              r
            );
          }
          return n(e, t), e;
        })(Error),
        l = (function (t) {
          function e(n) {
            var r = t.call(this, n) || this;
            return (
              Object.setPrototypeOf(r, e.prototype),
              (r.name = "MeiliSearchTimeOutError"),
              Error.captureStackTrace && Error.captureStackTrace(r, e),
              r
            );
          }
          return n(e, t), e;
        })(Error);
      function d(t) {
        return Object.entries(t).reduce(function (t, e) {
          var n = e[0],
            r = e[1];
          return void 0 !== r && (t[n] = r), t;
        }, {});
      }
      function f(t) {
        return i(this, void 0, void 0, function () {
          return o(this, function (e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  new Promise(function (e) {
                    return setTimeout(e, t);
                  }),
                ];
              case 1:
                return [2, e.sent()];
            }
          });
        });
      }
      function p(t) {
        return t.startsWith("https://") || t.startsWith("http://")
          ? t
          : "http://".concat(t);
      }
      function v(t) {
        return t.endsWith("/") || (t += "/"), t;
      }
      var y = "0.27.0";
      function b(t) {
        try {
          return (t = v((t = p(t))));
        } catch (t) {
          throw new h("The provided host is not valid.");
        }
      }
      function g(t) {
        var e = "X-Meilisearch-Client",
          n = "Meilisearch JavaScript (v".concat(y, ")"),
          r = "Content-Type";
        t.headers = t.headers || {};
        var i = Object.assign({}, t.headers);
        if (
          (t.apiKey && (i.Authorization = "Bearer ".concat(t.apiKey)),
          t.headers[r] || (i["Content-Type"] = "application/json"),
          t.clientAgents && Array.isArray(t.clientAgents))
        ) {
          var o = t.clientAgents.concat(n);
          i[e] = o.join(" ; ");
        } else {
          if (t.clientAgents && !Array.isArray(t.clientAgents))
            throw new h(
              'Meilisearch: The header "'.concat(
                e,
                '" should be an array of string(s).\n'
              )
            );
          i[e] = n;
        }
        return i;
      }
      var w = (function () {
          function t(t) {
            this.headers = g(t);
            try {
              var e = b(t.host);
              this.url = new URL(e);
            } catch (t) {
              throw new h("The provided host is not valid.");
            }
          }
          return (
            (t.prototype.request = function (t) {
              var e = t.method,
                n = t.url,
                s = t.params,
                a = t.body,
                h = t.config;
              return i(this, void 0, void 0, function () {
                var t, i, l, d;
                return o(this, function (o) {
                  switch (o.label) {
                    case 0:
                      (t = new URL(n, this.url)),
                        s &&
                          ((i = new URLSearchParams()),
                          Object.keys(s)
                            .filter(function (t) {
                              return null !== s[t];
                            })
                            .map(function (t) {
                              return i.set(t, s[t]);
                            }),
                          (t.search = i.toString())),
                        (o.label = 1);
                    case 1:
                      return (
                        o.trys.push([1, 4, , 5]),
                        [
                          4,
                          fetch(
                            t.toString(),
                            r(r({}, h), {
                              method: e,
                              body: JSON.stringify(a),
                              headers: this.headers,
                            })
                          ).then(function (t) {
                            return u(t);
                          }),
                        ]
                      );
                    case 2:
                      return [
                        4,
                        o
                          .sent()
                          .json()
                          .catch(function () {}),
                      ];
                    case 3:
                      return [2, o.sent()];
                    case 4:
                      return (
                        (l = o.sent()),
                        (d = l.stack),
                        c(l, d, t.toString()),
                        [3, 5]
                      );
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (t.prototype.get = function (t, e, n) {
              return i(this, void 0, void 0, function () {
                return o(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return [
                        4,
                        this.request({
                          method: "GET",
                          url: t,
                          params: e,
                          config: n,
                        }),
                      ];
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (t.prototype.post = function (t, e, n, r) {
              return i(this, void 0, void 0, function () {
                return o(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [
                        4,
                        this.request({
                          method: "POST",
                          url: t,
                          body: e,
                          params: n,
                          config: r,
                        }),
                      ];
                    case 1:
                      return [2, i.sent()];
                  }
                });
              });
            }),
            (t.prototype.put = function (t, e, n, r) {
              return i(this, void 0, void 0, function () {
                return o(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [
                        4,
                        this.request({
                          method: "PUT",
                          url: t,
                          body: e,
                          params: n,
                          config: r,
                        }),
                      ];
                    case 1:
                      return [2, i.sent()];
                  }
                });
              });
            }),
            (t.prototype.patch = function (t, e, n, r) {
              return i(this, void 0, void 0, function () {
                return o(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [
                        4,
                        this.request({
                          method: "PATCH",
                          url: t,
                          body: e,
                          params: n,
                          config: r,
                        }),
                      ];
                    case 1:
                      return [2, i.sent()];
                  }
                });
              });
            }),
            (t.prototype.delete = function (t, e, n, r) {
              return i(this, void 0, void 0, function () {
                return o(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [
                        4,
                        this.request({
                          method: "DELETE",
                          url: t,
                          body: e,
                          params: n,
                          config: r,
                        }),
                      ];
                    case 1:
                      return [2, i.sent()];
                  }
                });
              });
            }),
            t
          );
        })(),
        m = (function () {
          function t(t) {
            this.httpRequest = new w(t);
          }
          return (
            (t.prototype.getTask = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "tasks/".concat(t)), [4, this.httpRequest.get(e)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.getTasks = function (t) {
              var e, n, r;
              return (
                void 0 === t && (t = {}),
                i(this, void 0, void 0, function () {
                  var i, s;
                  return o(this, function (o) {
                    switch (o.label) {
                      case 0:
                        return (
                          (i = "tasks"),
                          (s = {
                            indexUid:
                              null === (e = null == t ? void 0 : t.indexUid) ||
                              void 0 === e
                                ? void 0
                                : e.join(","),
                            type:
                              null === (n = null == t ? void 0 : t.type) ||
                              void 0 === n
                                ? void 0
                                : n.join(","),
                            status:
                              null === (r = null == t ? void 0 : t.status) ||
                              void 0 === r
                                ? void 0
                                : r.join(","),
                            from: t.from,
                            limit: t.limit,
                          }),
                          [4, this.httpRequest.get(i, d(s))]
                        );
                      case 1:
                        return [2, o.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.waitForTask = function (t, e) {
              var n = void 0 === e ? {} : e,
                r = n.timeOutMs,
                s = void 0 === r ? 5e3 : r,
                a = n.intervalMs,
                u = void 0 === a ? 50 : a;
              return i(this, void 0, void 0, function () {
                var e, n;
                return o(this, function (r) {
                  switch (r.label) {
                    case 0:
                      (e = Date.now()), (r.label = 1);
                    case 1:
                      return Date.now() - e < s ? [4, this.getTask(t)] : [3, 4];
                    case 2:
                      return (
                        (n = r.sent()),
                        ["enqueued", "processing"].includes(n.status)
                          ? [4, f(u)]
                          : [2, n]
                      );
                    case 3:
                      return r.sent(), [3, 1];
                    case 4:
                      throw new l(
                        "timeout of "
                          .concat(s, "ms has exceeded on process ")
                          .concat(t, " when waiting a task to be resolved.")
                      );
                  }
                });
              });
            }),
            (t.prototype.waitForTasks = function (t, e) {
              var n = void 0 === e ? {} : e,
                r = n.timeOutMs,
                s = void 0 === r ? 5e3 : r,
                a = n.intervalMs,
                u = void 0 === a ? 50 : a;
              return i(this, void 0, void 0, function () {
                var e, n, r, i, a;
                return o(this, function (o) {
                  switch (o.label) {
                    case 0:
                      (e = []), (n = 0), (r = t), (o.label = 1);
                    case 1:
                      return n < r.length
                        ? ((i = r[n]),
                          [
                            4,
                            this.waitForTask(i, {
                              timeOutMs: s,
                              intervalMs: u,
                            }),
                          ])
                        : [3, 4];
                    case 2:
                      (a = o.sent()), e.push(a), (o.label = 3);
                    case 3:
                      return n++, [3, 1];
                    case 4:
                      return [2, e];
                  }
                });
              });
            }),
            t
          );
        })(),
        T = (function () {
          function t(t, e, n) {
            (this.uid = e),
              (this.primaryKey = n),
              (this.httpRequest = new w(t)),
              (this.tasks = new m(t));
          }
          return (
            (t.prototype.search = function (t, e, n) {
              return i(this, void 0, void 0, function () {
                var i;
                return o(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return (
                        (i = "indexes/".concat(this.uid, "/search")),
                        [
                          4,
                          this.httpRequest.post(
                            i,
                            d(r({ q: t }, e)),
                            void 0,
                            n
                          ),
                        ]
                      );
                    case 1:
                      return [2, o.sent()];
                  }
                });
              });
            }),
            (t.prototype.searchGet = function (t, e, n) {
              var s, a, u, c, l;
              return i(this, void 0, void 0, function () {
                var i, f, p;
                return o(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return (
                        (i = "indexes/".concat(this.uid, "/search")),
                        (f = function (t) {
                          if ("string" == typeof t) return t;
                          if (Array.isArray(t))
                            throw new h(
                              "The filter query parameter should be in string format when using searchGet"
                            );
                        }),
                        (p = r(r({ q: t }, e), {
                          filter: f(null == e ? void 0 : e.filter),
                          sort:
                            null === (s = null == e ? void 0 : e.sort) ||
                            void 0 === s
                              ? void 0
                              : s.join(","),
                          facets:
                            null === (a = null == e ? void 0 : e.facets) ||
                            void 0 === a
                              ? void 0
                              : a.join(","),
                          attributesToRetrieve:
                            null ===
                              (u =
                                null == e ? void 0 : e.attributesToRetrieve) ||
                            void 0 === u
                              ? void 0
                              : u.join(","),
                          attributesToCrop:
                            null ===
                              (c = null == e ? void 0 : e.attributesToCrop) ||
                            void 0 === c
                              ? void 0
                              : c.join(","),
                          attributesToHighlight:
                            null ===
                              (l =
                                null == e ? void 0 : e.attributesToHighlight) ||
                            void 0 === l
                              ? void 0
                              : l.join(","),
                        })),
                        [4, this.httpRequest.get(i, d(p), n)]
                      );
                    case 1:
                      return [2, o.sent()];
                  }
                });
              });
            }),
            (t.prototype.getRawInfo = function () {
              return i(this, void 0, void 0, function () {
                var t, e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(this.uid)),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return (
                        (e = n.sent()),
                        (this.primaryKey = e.primaryKey),
                        (this.updatedAt = new Date(e.updatedAt)),
                        (this.createdAt = new Date(e.createdAt)),
                        [2, e]
                      );
                  }
                });
              });
            }),
            (t.prototype.fetchInfo = function () {
              return i(this, void 0, void 0, function () {
                return o(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [4, this.getRawInfo()];
                    case 1:
                      return t.sent(), [2, this];
                  }
                });
              });
            }),
            (t.prototype.fetchPrimaryKey = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (t = this), [4, this.getRawInfo()];
                    case 1:
                      return (
                        (t.primaryKey = e.sent().primaryKey),
                        [2, this.primaryKey]
                      );
                  }
                });
              });
            }),
            (t.create = function (t, e, n) {
              return (
                void 0 === e && (e = {}),
                i(this, void 0, void 0, function () {
                  var i;
                  return o(this, function (o) {
                    return (
                      (i = "indexes"),
                      [2, new w(n).post(i, r(r({}, e), { uid: t }))]
                    );
                  });
                })
              );
            }),
            (t.prototype.update = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(this.uid)),
                        [4, this.httpRequest.patch(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.delete = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(this.uid)),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getTasks = function (t) {
              return (
                void 0 === t && (t = {}),
                i(this, void 0, void 0, function () {
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [
                          4,
                          this.tasks.getTasks(
                            r(r({}, t), { indexUid: [this.uid] })
                          ),
                        ];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.getTask = function (t) {
              return i(this, void 0, void 0, function () {
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [4, this.tasks.getTask(t)];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.waitForTasks = function (t, e) {
              var n = void 0 === e ? {} : e,
                r = n.timeOutMs,
                s = void 0 === r ? 5e3 : r,
                a = n.intervalMs,
                u = void 0 === a ? 50 : a;
              return i(this, void 0, void 0, function () {
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.tasks.waitForTasks(t, {
                          timeOutMs: s,
                          intervalMs: u,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.waitForTask = function (t, e) {
              var n = void 0 === e ? {} : e,
                r = n.timeOutMs,
                s = void 0 === r ? 5e3 : r,
                a = n.intervalMs,
                u = void 0 === a ? 50 : a;
              return i(this, void 0, void 0, function () {
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.tasks.waitForTask(t, {
                          timeOutMs: s,
                          intervalMs: u,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getStats = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(this.uid, "/stats")),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getDocuments = function (t) {
              return (
                void 0 === t && (t = {}),
                i(this, void 0, void 0, function () {
                  var e, n;
                  return o(this, function (i) {
                    switch (i.label) {
                      case 0:
                        return (
                          (e = "indexes/".concat(this.uid, "/documents")),
                          (n = (function () {
                            var e;
                            if (Array.isArray(null == t ? void 0 : t.fields))
                              return null ===
                                (e = null == t ? void 0 : t.fields) ||
                                void 0 === e
                                ? void 0
                                : e.join(",");
                          })()),
                          [
                            4,
                            this.httpRequest.get(
                              e,
                              d(r(r({}, t), { fields: n }))
                            ),
                          ]
                        );
                      case 1:
                        return [2, i.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.getDocument = function (t, e) {
              return i(this, void 0, void 0, function () {
                var n, i;
                return o(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return (
                        (n = "indexes/"
                          .concat(this.uid, "/documents/")
                          .concat(t)),
                        (i = (function () {
                          var t;
                          if (Array.isArray(null == e ? void 0 : e.fields))
                            return null ===
                              (t = null == e ? void 0 : e.fields) ||
                              void 0 === t
                              ? void 0
                              : t.join(",");
                        })()),
                        [
                          4,
                          this.httpRequest.get(
                            n,
                            d(r(r({}, e), { fields: i }))
                          ),
                        ]
                      );
                    case 1:
                      return [2, o.sent()];
                  }
                });
              });
            }),
            (t.prototype.addDocuments = function (t, e) {
              return i(this, void 0, void 0, function () {
                var n;
                return o(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        (n = "indexes/".concat(this.uid, "/documents")),
                        [4, this.httpRequest.post(n, t, e)]
                      );
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (t.prototype.addDocumentsInBatches = function (t, e, n) {
              return (
                void 0 === e && (e = 1e3),
                i(this, void 0, void 0, function () {
                  var r, i, s, a;
                  return o(this, function (o) {
                    switch (o.label) {
                      case 0:
                        (r = []), (i = 0), (o.label = 1);
                      case 1:
                        return i < t.length
                          ? ((a = (s = r).push),
                            [4, this.addDocuments(t.slice(i, i + e), n)])
                          : [3, 4];
                      case 2:
                        a.apply(s, [o.sent()]), (o.label = 3);
                      case 3:
                        return (i += e), [3, 1];
                      case 4:
                        return [2, r];
                    }
                  });
                })
              );
            }),
            (t.prototype.updateDocuments = function (t, e) {
              return i(this, void 0, void 0, function () {
                var n;
                return o(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        (n = "indexes/".concat(this.uid, "/documents")),
                        [4, this.httpRequest.put(n, t, e)]
                      );
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateDocumentsInBatches = function (t, e, n) {
              return (
                void 0 === e && (e = 1e3),
                i(this, void 0, void 0, function () {
                  var r, i, s, a;
                  return o(this, function (o) {
                    switch (o.label) {
                      case 0:
                        (r = []), (i = 0), (o.label = 1);
                      case 1:
                        return i < t.length
                          ? ((a = (s = r).push),
                            [4, this.updateDocuments(t.slice(i, i + e), n)])
                          : [3, 4];
                      case 2:
                        a.apply(s, [o.sent()]), (o.label = 3);
                      case 3:
                        return (i += e), [3, 1];
                      case 4:
                        return [2, r];
                    }
                  });
                })
              );
            }),
            (t.prototype.deleteDocument = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/"
                          .concat(this.uid, "/documents/")
                          .concat(t)),
                        [4, this.httpRequest.delete(e)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.deleteDocuments = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(
                          this.uid,
                          "/documents/delete-batch"
                        )),
                        [4, this.httpRequest.post(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.deleteAllDocuments = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(this.uid, "/documents")),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getSettings = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(this.uid, "/settings")),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateSettings = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(this.uid, "/settings")),
                        [4, this.httpRequest.patch(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetSettings = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(this.uid, "/settings")),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getSynonyms = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(this.uid, "/settings/synonyms")),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateSynonyms = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(this.uid, "/settings/synonyms")),
                        [4, this.httpRequest.put(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetSynonyms = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(this.uid, "/settings/synonyms")),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getStopWords = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/stop-words"
                        )),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateStopWords = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(
                          this.uid,
                          "/settings/stop-words"
                        )),
                        [4, this.httpRequest.put(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetStopWords = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/stop-words"
                        )),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getRankingRules = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/ranking-rules"
                        )),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateRankingRules = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(
                          this.uid,
                          "/settings/ranking-rules"
                        )),
                        [4, this.httpRequest.put(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetRankingRules = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/ranking-rules"
                        )),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getDistinctAttribute = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/distinct-attribute"
                        )),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateDistinctAttribute = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(
                          this.uid,
                          "/settings/distinct-attribute"
                        )),
                        [4, this.httpRequest.put(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetDistinctAttribute = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/distinct-attribute"
                        )),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getFilterableAttributes = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/filterable-attributes"
                        )),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateFilterableAttributes = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(
                          this.uid,
                          "/settings/filterable-attributes"
                        )),
                        [4, this.httpRequest.put(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetFilterableAttributes = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/filterable-attributes"
                        )),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getSortableAttributes = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/sortable-attributes"
                        )),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateSortableAttributes = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(
                          this.uid,
                          "/settings/sortable-attributes"
                        )),
                        [4, this.httpRequest.put(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetSortableAttributes = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/sortable-attributes"
                        )),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getSearchableAttributes = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/searchable-attributes"
                        )),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateSearchableAttributes = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(
                          this.uid,
                          "/settings/searchable-attributes"
                        )),
                        [4, this.httpRequest.put(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetSearchableAttributes = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/searchable-attributes"
                        )),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getDisplayedAttributes = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/displayed-attributes"
                        )),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateDisplayedAttributes = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(
                          this.uid,
                          "/settings/displayed-attributes"
                        )),
                        [4, this.httpRequest.put(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetDisplayedAttributes = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/displayed-attributes"
                        )),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getTypoTolerance = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/typo-tolerance"
                        )),
                        [4, this.httpRequest.get(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.updateTypoTolerance = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = "indexes/".concat(
                          this.uid,
                          "/settings/typo-tolerance"
                        )),
                        [4, this.httpRequest.patch(e, t)]
                      );
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.resetTypoTolerance = function () {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return (
                        (t = "indexes/".concat(
                          this.uid,
                          "/settings/typo-tolerance"
                        )),
                        [4, this.httpRequest.delete(t)]
                      );
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            t
          );
        })(),
        x = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return n(e, t), e;
        })(
          (function () {
            function t(t) {
              (this.config = t),
                (this.httpRequest = new w(t)),
                (this.tasks = new m(t));
            }
            return (
              (t.prototype.index = function (t) {
                return new T(this.config, t);
              }),
              (t.prototype.getIndex = function (t) {
                return i(this, void 0, void 0, function () {
                  return o(this, function (e) {
                    return [2, new T(this.config, t).fetchInfo()];
                  });
                });
              }),
              (t.prototype.getRawIndex = function (t) {
                return i(this, void 0, void 0, function () {
                  return o(this, function (e) {
                    return [2, new T(this.config, t).getRawInfo()];
                  });
                });
              }),
              (t.prototype.getIndexes = function (t) {
                return (
                  void 0 === t && (t = {}),
                  i(this, void 0, void 0, function () {
                    var e,
                      n,
                      i = this;
                    return o(this, function (o) {
                      switch (o.label) {
                        case 0:
                          return [4, this.getRawIndexes(t)];
                        case 1:
                          return (
                            (e = o.sent()),
                            (n = e.results.map(function (t) {
                              return new T(i.config, t.uid, t.primaryKey);
                            })),
                            [2, r(r({}, e), { results: n })]
                          );
                      }
                    });
                  })
                );
              }),
              (t.prototype.getRawIndexes = function (t) {
                return (
                  void 0 === t && (t = {}),
                  i(this, void 0, void 0, function () {
                    var e;
                    return o(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return (
                            (e = "indexes"), [4, this.httpRequest.get(e, t)]
                          );
                        case 1:
                          return [2, n.sent()];
                      }
                    });
                  })
                );
              }),
              (t.prototype.createIndex = function (t, e) {
                return (
                  void 0 === e && (e = {}),
                  i(this, void 0, void 0, function () {
                    return o(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return [4, T.create(t, e, this.config)];
                        case 1:
                          return [2, n.sent()];
                      }
                    });
                  })
                );
              }),
              (t.prototype.updateIndex = function (t, e) {
                return (
                  void 0 === e && (e = {}),
                  i(this, void 0, void 0, function () {
                    return o(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return [4, new T(this.config, t).update(e)];
                        case 1:
                          return [2, n.sent()];
                      }
                    });
                  })
                );
              }),
              (t.prototype.deleteIndex = function (t) {
                return i(this, void 0, void 0, function () {
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [4, new T(this.config, t).delete()];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                });
              }),
              (t.prototype.deleteIndexIfExists = function (t) {
                return i(this, void 0, void 0, function () {
                  var e;
                  return o(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return (
                          n.trys.push([0, 2, , 3]), [4, this.deleteIndex(t)]
                        );
                      case 1:
                        return n.sent(), [2, !0];
                      case 2:
                        if ("index_not_found" === (e = n.sent()).code)
                          return [2, !1];
                        throw e;
                      case 3:
                        return [2];
                    }
                  });
                });
              }),
              (t.prototype.getTasks = function (t) {
                return (
                  void 0 === t && (t = {}),
                  i(this, void 0, void 0, function () {
                    return o(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return [4, this.tasks.getTasks(t)];
                        case 1:
                          return [2, e.sent()];
                      }
                    });
                  })
                );
              }),
              (t.prototype.getTask = function (t) {
                return i(this, void 0, void 0, function () {
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [4, this.tasks.getTask(t)];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                });
              }),
              (t.prototype.waitForTasks = function (t, e) {
                var n = void 0 === e ? {} : e,
                  r = n.timeOutMs,
                  s = void 0 === r ? 5e3 : r,
                  a = n.intervalMs,
                  u = void 0 === a ? 50 : a;
                return i(this, void 0, void 0, function () {
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [
                          4,
                          this.tasks.waitForTasks(t, {
                            timeOutMs: s,
                            intervalMs: u,
                          }),
                        ];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                });
              }),
              (t.prototype.waitForTask = function (t, e) {
                var n = void 0 === e ? {} : e,
                  r = n.timeOutMs,
                  s = void 0 === r ? 5e3 : r,
                  a = n.intervalMs,
                  u = void 0 === a ? 50 : a;
                return i(this, void 0, void 0, function () {
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [
                          4,
                          this.tasks.waitForTask(t, {
                            timeOutMs: s,
                            intervalMs: u,
                          }),
                        ];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                });
              }),
              (t.prototype.getKeys = function (t) {
                return (
                  void 0 === t && (t = {}),
                  i(this, void 0, void 0, function () {
                    var e;
                    return o(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return (e = "keys"), [4, this.httpRequest.get(e, t)];
                        case 1:
                          return [2, n.sent()];
                      }
                    });
                  })
                );
              }),
              (t.prototype.getKey = function (t) {
                return i(this, void 0, void 0, function () {
                  var e;
                  return o(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return (
                          (e = "keys/".concat(t)), [4, this.httpRequest.get(e)]
                        );
                      case 1:
                        return [2, n.sent()];
                    }
                  });
                });
              }),
              (t.prototype.createKey = function (t) {
                return i(this, void 0, void 0, function () {
                  var e;
                  return o(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return (e = "keys"), [4, this.httpRequest.post(e, t)];
                      case 1:
                        return [2, n.sent()];
                    }
                  });
                });
              }),
              (t.prototype.updateKey = function (t, e) {
                return i(this, void 0, void 0, function () {
                  var n;
                  return o(this, function (r) {
                    switch (r.label) {
                      case 0:
                        return (
                          (n = "keys/".concat(t)),
                          [4, this.httpRequest.patch(n, e)]
                        );
                      case 1:
                        return [2, r.sent()];
                    }
                  });
                });
              }),
              (t.prototype.deleteKey = function (t) {
                return i(this, void 0, void 0, function () {
                  var e;
                  return o(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return (
                          (e = "keys/".concat(t)),
                          [4, this.httpRequest.delete(e)]
                        );
                      case 1:
                        return [2, n.sent()];
                    }
                  });
                });
              }),
              (t.prototype.health = function () {
                return i(this, void 0, void 0, function () {
                  var t;
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return (t = "health"), [4, this.httpRequest.get(t)];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                });
              }),
              (t.prototype.isHealthy = function () {
                return i(this, void 0, void 0, function () {
                  var t;
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return (
                          e.trys.push([0, 2, , 3]),
                          (t = "health"),
                          [4, this.httpRequest.get(t)]
                        );
                      case 1:
                        return e.sent(), [2, !0];
                      case 2:
                        return e.sent(), [2, !1];
                      case 3:
                        return [2];
                    }
                  });
                });
              }),
              (t.prototype.getStats = function () {
                return i(this, void 0, void 0, function () {
                  var t;
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return (t = "stats"), [4, this.httpRequest.get(t)];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                });
              }),
              (t.prototype.getVersion = function () {
                return i(this, void 0, void 0, function () {
                  var t;
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return (t = "version"), [4, this.httpRequest.get(t)];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                });
              }),
              (t.prototype.createDump = function () {
                return i(this, void 0, void 0, function () {
                  var t;
                  return o(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return (t = "dumps"), [4, this.httpRequest.post(t)];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                });
              }),
              (t.prototype.generateTenantToken = function (t, e, n) {
                var r = new Error();
                throw new Error(
                  "Meilisearch: failed to generate a tenant token. Generation of a token only works in a node environment \n ".concat(
                    r.stack,
                    "."
                  )
                );
              }),
              t
            );
          })()
        );
      (t.Index = T),
        (t.MeiliSearch = x),
        (t.MeiliSearchApiError = a),
        (t.MeiliSearchCommunicationError = s),
        (t.MeiliSearchError = h),
        (t.MeiliSearchTimeOutError = l),
        (t.default = x),
        (t.httpErrorHandler = c),
        (t.httpResponseErrorHandler = u),
        Object.defineProperty(t, "__esModule", { value: !0 });
    })(e);
  });
  function u(t) {
    return t.replace(/:(.*)/i, '="$1"');
  }
  var c = function (t) {
    var e = t.match(/([^=]*)="?([^\\"]*)"?$/);
    return e ? (e[0], [{ filterName: e[1], value: e[2] }]) : [];
  };
  function h(t) {
    var n = (function (t) {
      return "string" == typeof t
        ? c(t)
        : Array.isArray(t)
        ? t
            .map(function (t) {
              return Array.isArray(t)
                ? t.map(function (t) {
                    return c(t);
                  })
                : c(t);
            })
            .flat(2)
        : [];
    })(t);
    return n
      .filter(function (t) {
        return void 0 !== t;
      })
      .reduce(function (t, n) {
        var r,
          o = n.filterName,
          s = n.value,
          a = t[o] || [];
        return (t = e(e({}, t), (((r = {})[o] = i(i([], a, !0), [s], !1)), r)));
      }, {});
  }
  function l(t, n) {
    return t.keepZeroFacets
      ? ((r = t.defaultFacetDistribution),
        Object.keys(r).reduce(function (t, n) {
          var i,
            o = Object.keys(r[n]);
          return e(e({}, t), (((i = {})[n] = o), i));
        }, {}))
      : h(null == n ? void 0 : n.filter);
    var r;
  }
  function d(t, e) {
    return {
      searchResponse: function (i, o) {
        return n(this, void 0, void 0, function () {
          var n, s, a, u, c, h, d, f;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return (
                  (n = i.placeholderSearch),
                  (s = i.query),
                  (a = i.pagination),
                  (u = i.finitePagination ? {} : a),
                  (c = e.formatKey([o, i.indexUid, i.query, u])),
                  (h = e.getEntry(c))
                    ? [2, h]
                    : ((d = l(i, o)),
                      [4, t.index(i.indexUid).search(i.query, o)])
                );
              case 1:
                return (
                  ((f = r.sent()).facetDistribution = (function (t, e) {
                    if (((e = e || {}), t && Object.keys(t).length > 0))
                      for (var n in t) {
                        e[n] || (e[n] = {});
                        for (var r = 0, i = t[n]; r < i.length; r++) {
                          var o = i[r];
                          Object.keys(e[n]).includes(o) || (e[n][o] = 0);
                        }
                      }
                    return e;
                  })(d, f.facetDistribution)),
                  n || s || (f.hits = []),
                  e.setEntry(c, f),
                  [2, f]
                );
            }
          });
        });
      },
    };
  }
  function f(t) {
    return (180 * t) / Math.PI;
  }
  function p(t) {
    return (t * Math.PI) / 180;
  }
  function v(t) {
    if (t) {
      var e,
        n,
        r = t.insideBoundingBox,
        i = t.aroundLatLng,
        o = t.aroundRadius,
        s = t.minimumAroundRadius;
      if (
        (i && (e = i),
        (null == o && null == s) || (n = null != o ? o : s),
        r && "string" == typeof r)
      ) {
        var a = r.split(","),
          u = a[0],
          c = a[1],
          h = a[2],
          l = a[3],
          d = [parseFloat(u), parseFloat(c), parseFloat(h), parseFloat(l)],
          v = d[0],
          y = d[1],
          b = d[2],
          g = d[3];
        (n =
          (function (t, e, n, r) {
            var i = (t * Math.PI) / 180,
              o = (n * Math.PI) / 180,
              s = ((n - t) * Math.PI) / 180,
              a = ((r - e) * Math.PI) / 180,
              u =
                Math.sin(s / 2) * Math.sin(s / 2) +
                Math.cos(i) * Math.cos(o) * Math.sin(a / 2) * Math.sin(a / 2);
            return 2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u)) * 6371e3;
          })(v, y, b, g) / 2),
          (e = (function (t, e, n, r) {
            (t = p(t)), (e = p(e));
            var i = Math.cos(t) * Math.cos(e),
              o = Math.cos(t) * Math.sin(e),
              s = Math.sin(t);
            (n = p(n)), (r = p(r));
            var a = i + Math.cos(n) * Math.cos(r),
              u = o + Math.cos(n) * Math.sin(r),
              c = s + Math.sin(n),
              h = Math.sqrt(a * a + u * u),
              l = Math.atan2(u, a),
              d = Math.atan2(c, h);
            return (
              e < r || (e > r && e > Math.PI && r < -Math.PI)
                ? ((d += Math.PI), (l += Math.PI))
                : ((d = f(d)), (l = f(l))),
              Math.abs(a) < Math.pow(10, -9) &&
                Math.abs(u) < Math.pow(10, -9) &&
                Math.abs(c) < Math.pow(10, -9) &&
                ((d = 0), (l = 0)),
              "".concat(d, ",").concat(l)
            );
          })(v, y, b, g));
      }
      if (null != e && null != n) {
        var w = e.split(","),
          m = w[0],
          T = w[1];
        return (
          (m = Number.parseFloat(m).toFixed(5)),
          (T = Number.parseFloat(T).toFixed(5)),
          {
            filter: "_geoRadius("
              .concat(m, ", ")
              .concat(T, ", ")
              .concat(n, ")"),
          }
        );
      }
    }
  }
  function y(t) {
    return "string" == typeof t
      ? u(t)
      : Array.isArray(t)
      ? t
          .map(function (t) {
            return Array.isArray(t)
              ? t
                  .map(function (t) {
                    return u(t);
                  })
                  .filter(function (t) {
                    return t;
                  })
              : u(t);
          })
          .filter(function (t) {
            return t;
          })
      : [];
  }
  function b(t) {
    return "" === t ? [] : "string" == typeof t ? [t] : t;
  }
  function g(t, e, n) {
    return (function (t, e, n) {
      var r = n.trim(),
        o = b(t),
        s = b(e);
      return i(i(i([], o, !0), s, !0), [r], !1).filter(function (t) {
        return Array.isArray(t) ? t.length : t;
      });
    })(y(n || []), y(e || []), t || "");
  }
  function w(t) {
    var e = {},
      n = t.facets,
      r = t.attributesToSnippet,
      i = t.snippetEllipsisText,
      o = t.attributesToRetrieve,
      s = t.filters,
      a = t.numericFilters,
      u = t.facetFilters,
      c = t.attributesToHighlight,
      h = t.highlightPreTag,
      l = t.highlightPostTag,
      d = t.placeholderSearch,
      f = t.query,
      p = t.finitePagination,
      y = t.sort,
      b = t.pagination;
    return {
      getParams: function () {
        return e;
      },
      addFacets: function () {
        (null == n ? void 0 : n.length) && (e.facets = n);
      },
      addAttributesToCrop: function () {
        r && (e.attributesToCrop = r);
      },
      addCropMarker: function () {
        null != i && (e.cropMarker = i);
      },
      addAttributesToRetrieve: function () {
        o && (e.attributesToRetrieve = o);
      },
      addFilters: function () {
        var t = g(s, a, u);
        t.length && (e.filter = t);
      },
      addAttributesToHighlight: function () {
        e.attributesToHighlight = c || ["*"];
      },
      addPreTag: function () {
        e.highlightPreTag = h || "__ais-highlight__";
      },
      addPostTag: function () {
        e.highlightPostTag = l || "__/ais-highlight__";
      },
      addPagination: function () {
        if ((!d && "" === f) || 0 === b.paginationTotalHits) e.limit = 0;
        else if (p) e.limit = b.paginationTotalHits;
        else {
          var t = (b.page + 1) * b.hitsPerPage + 1;
          t > b.paginationTotalHits
            ? (e.limit = b.paginationTotalHits)
            : (e.limit = t);
        }
      },
      addSort: function () {
        (null == y ? void 0 : y.length) && (e.sort = [y]);
      },
      addGeoSearchRules: function () {
        var n = (function (t) {
            var e = {},
              n = t.aroundLatLng,
              r = t.aroundLatLngViaIP,
              i = t.aroundRadius,
              o = t.aroundPrecision,
              s = t.minimumAroundRadius,
              a = t.insideBoundingBox,
              u = t.insidePolygon;
            return (
              n && (e.aroundLatLng = n),
              r &&
                console.warn(
                  "instant-meilisearch: `aroundLatLngViaIP` is not supported."
                ),
              i && (e.aroundRadius = i),
              o &&
                console.warn(
                  "instant-meilisearch: `aroundPrecision` is not supported.\n    See this discussion to track its implementation https://github.com/meilisearch/product/discussions/264"
                ),
              s && (e.minimumAroundRadius = s),
              a && (e.insideBoundingBox = a),
              u &&
                console.warn(
                  "instant-meilisearch: `insidePolygon` is not implented in instant-meilisearch."
                ),
              e
            );
          })(t),
          r = v(n);
        (null == r ? void 0 : r.filter) &&
          (e.filter ? e.filter.unshift(r.filter) : (e.filter = [r.filter]));
      },
    };
  }
  function m(t) {
    return "string" == typeof t
      ? t
      : void 0 === t
      ? JSON.stringify(null)
      : JSON.stringify(t);
  }
  function T(t) {
    return Array.isArray(t)
      ? t.map(function (t) {
          return T(t);
        })
      : "object" != typeof (e = t) || Array.isArray(e) || null === e
      ? { value: m(t) }
      : Object.keys(t).reduce(function (e, n) {
          return (e[n] = T(t[n])), e;
        }, {});
    var e;
  }
  function x(t, e, n) {
    var r = e.primaryKey,
      i = n.hitsPerPage,
      o = (function (t, e, n) {
        if (n < 0)
          throw new TypeError(
            'Value too small for "hitsPerPage" parameter, expected integer between 0 and 9223372036854775807'
          );
        var r = e * n;
        return t.slice(r, r + n);
      })(t, n.page, i),
      s = o.map(function (t) {
        if (Object.keys(t).length > 0) {
          var e = t._formatted;
          t._matchesPosition;
          var n = (function (t, e) {
              var n = {};
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) &&
                  e.indexOf(r) < 0 &&
                  (n[r] = t[r]);
              if (
                null != t &&
                "function" == typeof Object.getOwnPropertySymbols
              ) {
                var i = 0;
                for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
                  e.indexOf(r[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
                    (n[r[i]] = t[r[i]]);
              }
              return n;
            })(t, ["_formatted", "_matchesPosition"]),
            i = Object.assign(
              n,
              (function (t) {
                if (!t) return {};
                var e = T(t);
                return { _highlightResult: e, _snippetResult: e };
              })(e)
            );
          return r && (i.objectID = t[r]), i;
        }
        return t;
      });
    return (
      (s = (function (t) {
        for (var e = 0; e < t.length; e++)
          t[e]._geo &&
            ((t[e]._geoloc = { lat: t[e]._geo.lat, lng: t[e]._geo.lng }),
            (t[e].objectID = "".concat(e + 1e6 * Math.random())),
            delete t[e]._geo);
        return t;
      })(s)),
      s
    );
  }
  function R(t, n) {
    var r,
      i,
      o = t.facetDistribution,
      s = n.pagination,
      a = ((r = t.hits.length), (i = s.hitsPerPage) > 0 ? Math.ceil(r / i) : 0),
      u = x(t.hits, n, s),
      c = t.estimatedTotalHits,
      h = t.processingTimeMs,
      l = t.query,
      d = s.hitsPerPage,
      f = s.page;
    return {
      results: [
        e(
          {
            index: n.indexUid,
            hitsPerPage: d,
            page: f,
            facets: o,
            nbPages: a,
            nbHits: c,
            processingTimeMS: h,
            query: l,
            hits: u,
            params: "",
            exhaustiveNbHits: !1,
          },
          {}
        ),
      ],
    };
  }
  function A(t) {
    void 0 === t && (t = {});
    var e = t;
    return {
      getEntry: function (t) {
        if (e[t])
          try {
            return JSON.parse(e[t]);
          } catch (n) {
            return e[t];
          }
      },
      formatKey: function (t) {
        return t.reduce(function (t, e) {
          return t + JSON.stringify(e);
        }, "");
      },
      setEntry: function (t, n) {
        e[t] = JSON.stringify(n);
      },
      clearCache: function () {
        e = {};
      },
    };
  }
  function P(t, i) {
    return n(this, void 0, void 0, function () {
      var n, o;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return (
              (n = e(e({}, i), {
                placeholderSearch: !0,
                pagination: e(e({}, i.pagination), { paginationTotalHits: 0 }),
                query: "",
              })),
              (o = w(n)).addFacets(),
              o.addPagination(),
              [4, t.searchResponse(n, o.getParams())]
            );
          case 1:
            return [2, r.sent().facetDistribution || {}];
        }
      });
    });
  }
  (t.instantMeiliSearch = function (t, i, o) {
    void 0 === i && (i = ""), void 0 === o && (o = {});
    var s,
      u = (function (t) {
        void 0 === t && (t = []);
        var e = "Meilisearch instant-meilisearch (v".concat("0.8.2", ")");
        return t.concat(e);
      })(o.clientAgents),
      c = new a.MeiliSearch({ host: t, apiKey: i, clientAgents: u }),
      h = A(),
      l = d(c, h);
    return {
      clearCache: function () {
        return h.clearCache();
      },
      search: function (t) {
        return n(this, void 0, void 0, function () {
          var n, i, a, u, c;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return (
                  r.trys.push([0, 4, , 5]),
                  (n = t[0]),
                  (i = (function (t, n, r) {
                    var i = t.indexName.split(":"),
                      o = i[0],
                      s = i.slice(1),
                      a = t.params,
                      u = (function (t) {
                        var e = t.paginationTotalHits,
                          n = t.hitsPerPage;
                        return {
                          paginationTotalHits: null != e ? e : 200,
                          hitsPerPage: void 0 === n ? 20 : n,
                          page: t.page || 0,
                        };
                      })({
                        paginationTotalHits: n.paginationTotalHits,
                        hitsPerPage: null == a ? void 0 : a.hitsPerPage,
                        page: null == a ? void 0 : a.page,
                      });
                    return e(e(e({}, n), a), {
                      sort: s.join(":") || "",
                      indexUid: o,
                      pagination: u,
                      defaultFacetDistribution: r || {},
                      placeholderSearch: !1 !== n.placeholderSearch,
                      keepZeroFacets: !!n.keepZeroFacets,
                      finitePagination: !!n.finitePagination,
                    });
                  })(n, o, s)),
                  (a = (function (t) {
                    var e = w(t);
                    return (
                      e.addFacets(),
                      e.addAttributesToHighlight(),
                      e.addPreTag(),
                      e.addPostTag(),
                      e.addAttributesToRetrieve(),
                      e.addAttributesToCrop(),
                      e.addCropMarker(),
                      e.addPagination(),
                      e.addFilters(),
                      e.addSort(),
                      e.addGeoSearchRules(),
                      e.getParams()
                    );
                  })(i)),
                  void 0 !== s ? [3, 2] : [4, P(l, i)]
                );
              case 1:
                (s = r.sent()), (i.defaultFacetDistribution = s), (r.label = 2);
              case 2:
                return [4, l.searchResponse(i, a)];
              case 3:
                return (u = r.sent()), [2, R(u, i)];
              case 4:
                throw ((c = r.sent()), console.error(c), new Error(c));
              case 5:
                return [2];
            }
          });
        });
      },
      searchForFacetValues: function (t) {
        return n(this, void 0, void 0, function () {
          return r(this, function (t) {
            switch (t.label) {
              case 0:
                return [
                  4,
                  new Promise(function (t, e) {
                    e(
                      new Error(
                        "SearchForFacetValues is not compatible with Meilisearch"
                      )
                    ),
                      t([]);
                  }),
                ];
              case 1:
                return [2, t.sent()];
            }
          });
        });
      },
    };
  }),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
//# sourceMappingURL=instant-meilisearch.umd.min.js.map
