(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.window = global.window || {}));
}(this, (function (exports) { 'use strict';

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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var browserPolyfill = createCommonjsModule(function (module) {
      (function (self) {
        (function (exports) {
          var support = {
            searchParams: 'URLSearchParams' in self,
            iterable: 'Symbol' in self && 'iterator' in Symbol,
            blob: 'FileReader' in self && 'Blob' in self && function () {
              try {
                new Blob();
                return true;
              } catch (e) {
                return false;
              }
            }(),
            formData: 'FormData' in self,
            arrayBuffer: 'ArrayBuffer' in self
          };

          function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
          }

          if (support.arrayBuffer) {
            var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

            var isArrayBufferView = ArrayBuffer.isView || function (obj) {
              return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
            };
          }

          function normalizeName(name) {
            if (typeof name !== 'string') {
              name = String(name);
            }

            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
              throw new TypeError('Invalid character in header field name');
            }

            return name.toLowerCase();
          }

          function normalizeValue(value) {
            if (typeof value !== 'string') {
              value = String(value);
            }

            return value;
          } // Build a destructive iterator for the value list


          function iteratorFor(items) {
            var iterator = {
              next: function () {
                var value = items.shift();
                return {
                  done: value === undefined,
                  value: value
                };
              }
            };

            if (support.iterable) {
              iterator[Symbol.iterator] = function () {
                return iterator;
              };
            }

            return iterator;
          }

          function Headers(headers) {
            this.map = {};

            if (headers instanceof Headers) {
              headers.forEach(function (value, name) {
                this.append(name, value);
              }, this);
            } else if (Array.isArray(headers)) {
              headers.forEach(function (header) {
                this.append(header[0], header[1]);
              }, this);
            } else if (headers) {
              Object.getOwnPropertyNames(headers).forEach(function (name) {
                this.append(name, headers[name]);
              }, this);
            }
          }

          Headers.prototype.append = function (name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ', ' + value : value;
          };

          Headers.prototype['delete'] = function (name) {
            delete this.map[normalizeName(name)];
          };

          Headers.prototype.get = function (name) {
            name = normalizeName(name);
            return this.has(name) ? this.map[name] : null;
          };

          Headers.prototype.has = function (name) {
            return this.map.hasOwnProperty(normalizeName(name));
          };

          Headers.prototype.set = function (name, value) {
            this.map[normalizeName(name)] = normalizeValue(value);
          };

          Headers.prototype.forEach = function (callback, thisArg) {
            for (var name in this.map) {
              if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this);
              }
            }
          };

          Headers.prototype.keys = function () {
            var items = [];
            this.forEach(function (value, name) {
              items.push(name);
            });
            return iteratorFor(items);
          };

          Headers.prototype.values = function () {
            var items = [];
            this.forEach(function (value) {
              items.push(value);
            });
            return iteratorFor(items);
          };

          Headers.prototype.entries = function () {
            var items = [];
            this.forEach(function (value, name) {
              items.push([name, value]);
            });
            return iteratorFor(items);
          };

          if (support.iterable) {
            Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
          }

          function consumed(body) {
            if (body.bodyUsed) {
              return Promise.reject(new TypeError('Already read'));
            }

            body.bodyUsed = true;
          }

          function fileReaderReady(reader) {
            return new Promise(function (resolve, reject) {
              reader.onload = function () {
                resolve(reader.result);
              };

              reader.onerror = function () {
                reject(reader.error);
              };
            });
          }

          function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob);
            return promise;
          }

          function readBlobAsText(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsText(blob);
            return promise;
          }

          function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf);
            var chars = new Array(view.length);

            for (var i = 0; i < view.length; i++) {
              chars[i] = String.fromCharCode(view[i]);
            }

            return chars.join('');
          }

          function bufferClone(buf) {
            if (buf.slice) {
              return buf.slice(0);
            } else {
              var view = new Uint8Array(buf.byteLength);
              view.set(new Uint8Array(buf));
              return view.buffer;
            }
          }

          function Body() {
            this.bodyUsed = false;

            this._initBody = function (body) {
              this._bodyInit = body;

              if (!body) {
                this._bodyText = '';
              } else if (typeof body === 'string') {
                this._bodyText = body;
              } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body;
              } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body;
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString();
              } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

                this._bodyInit = new Blob([this._bodyArrayBuffer]);
              } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body);
              } else {
                this._bodyText = body = Object.prototype.toString.call(body);
              }

              if (!this.headers.get('content-type')) {
                if (typeof body === 'string') {
                  this.headers.set('content-type', 'text/plain;charset=UTF-8');
                } else if (this._bodyBlob && this._bodyBlob.type) {
                  this.headers.set('content-type', this._bodyBlob.type);
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                  this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                }
              }
            };

            if (support.blob) {
              this.blob = function () {
                var rejected = consumed(this);

                if (rejected) {
                  return rejected;
                }

                if (this._bodyBlob) {
                  return Promise.resolve(this._bodyBlob);
                } else if (this._bodyArrayBuffer) {
                  return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                } else if (this._bodyFormData) {
                  throw new Error('could not read FormData body as blob');
                } else {
                  return Promise.resolve(new Blob([this._bodyText]));
                }
              };

              this.arrayBuffer = function () {
                if (this._bodyArrayBuffer) {
                  return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                } else {
                  return this.blob().then(readBlobAsArrayBuffer);
                }
              };
            }

            this.text = function () {
              var rejected = consumed(this);

              if (rejected) {
                return rejected;
              }

              if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
              } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as text');
              } else {
                return Promise.resolve(this._bodyText);
              }
            };

            if (support.formData) {
              this.formData = function () {
                return this.text().then(decode);
              };
            }

            this.json = function () {
              return this.text().then(JSON.parse);
            };

            return this;
          } // HTTP methods whose capitalization should be normalized


          var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

          function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
          }

          function Request(input, options) {
            options = options || {};
            var body = options.body;

            if (input instanceof Request) {
              if (input.bodyUsed) {
                throw new TypeError('Already read');
              }

              this.url = input.url;
              this.credentials = input.credentials;

              if (!options.headers) {
                this.headers = new Headers(input.headers);
              }

              this.method = input.method;
              this.mode = input.mode;
              this.signal = input.signal;

              if (!body && input._bodyInit != null) {
                body = input._bodyInit;
                input.bodyUsed = true;
              }
            } else {
              this.url = String(input);
            }

            this.credentials = options.credentials || this.credentials || 'same-origin';

            if (options.headers || !this.headers) {
              this.headers = new Headers(options.headers);
            }

            this.method = normalizeMethod(options.method || this.method || 'GET');
            this.mode = options.mode || this.mode || null;
            this.signal = options.signal || this.signal;
            this.referrer = null;

            if ((this.method === 'GET' || this.method === 'HEAD') && body) {
              throw new TypeError('Body not allowed for GET or HEAD requests');
            }

            this._initBody(body);
          }

          Request.prototype.clone = function () {
            return new Request(this, {
              body: this._bodyInit
            });
          };

          function decode(body) {
            var form = new FormData();
            body.trim().split('&').forEach(function (bytes) {
              if (bytes) {
                var split = bytes.split('=');
                var name = split.shift().replace(/\+/g, ' ');
                var value = split.join('=').replace(/\+/g, ' ');
                form.append(decodeURIComponent(name), decodeURIComponent(value));
              }
            });
            return form;
          }

          function parseHeaders(rawHeaders) {
            var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
            // https://tools.ietf.org/html/rfc7230#section-3.2

            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
            preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
              var parts = line.split(':');
              var key = parts.shift().trim();

              if (key) {
                var value = parts.join(':').trim();
                headers.append(key, value);
              }
            });
            return headers;
          }

          Body.call(Request.prototype);

          function Response(bodyInit, options) {
            if (!options) {
              options = {};
            }

            this.type = 'default';
            this.status = options.status === undefined ? 200 : options.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = 'statusText' in options ? options.statusText : 'OK';
            this.headers = new Headers(options.headers);
            this.url = options.url || '';

            this._initBody(bodyInit);
          }

          Body.call(Response.prototype);

          Response.prototype.clone = function () {
            return new Response(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new Headers(this.headers),
              url: this.url
            });
          };

          Response.error = function () {
            var response = new Response(null, {
              status: 0,
              statusText: ''
            });
            response.type = 'error';
            return response;
          };

          var redirectStatuses = [301, 302, 303, 307, 308];

          Response.redirect = function (url, status) {
            if (redirectStatuses.indexOf(status) === -1) {
              throw new RangeError('Invalid status code');
            }

            return new Response(null, {
              status: status,
              headers: {
                location: url
              }
            });
          };

          exports.DOMException = self.DOMException;

          try {
            new exports.DOMException();
          } catch (err) {
            exports.DOMException = function (message, name) {
              this.message = message;
              this.name = name;
              var error = Error(message);
              this.stack = error.stack;
            };

            exports.DOMException.prototype = Object.create(Error.prototype);
            exports.DOMException.prototype.constructor = exports.DOMException;
          }

          function fetch(input, init) {
            return new Promise(function (resolve, reject) {
              var request = new Request(input, init);

              if (request.signal && request.signal.aborted) {
                return reject(new exports.DOMException('Aborted', 'AbortError'));
              }

              var xhr = new XMLHttpRequest();

              function abortXhr() {
                xhr.abort();
              }

              xhr.onload = function () {
                var options = {
                  status: xhr.status,
                  statusText: xhr.statusText,
                  headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                };
                options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
                var body = 'response' in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options));
              };

              xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
              };

              xhr.ontimeout = function () {
                reject(new TypeError('Network request failed'));
              };

              xhr.onabort = function () {
                reject(new exports.DOMException('Aborted', 'AbortError'));
              };

              xhr.open(request.method, request.url, true);

              if (request.credentials === 'include') {
                xhr.withCredentials = true;
              } else if (request.credentials === 'omit') {
                xhr.withCredentials = false;
              }

              if ('responseType' in xhr && support.blob) {
                xhr.responseType = 'blob';
              }

              request.headers.forEach(function (value, name) {
                xhr.setRequestHeader(name, value);
              });

              if (request.signal) {
                request.signal.addEventListener('abort', abortXhr);

                xhr.onreadystatechange = function () {
                  // DONE (success or failure)
                  if (xhr.readyState === 4) {
                    request.signal.removeEventListener('abort', abortXhr);
                  }
                };
              }

              xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
            });
          }

          fetch.polyfill = true;

          if (!self.fetch) {
            self.fetch = fetch;
            self.Headers = Headers;
            self.Request = Request;
            self.Response = Response;
          }

          exports.Headers = Headers;
          exports.Request = Request;
          exports.Response = Response;
          exports.fetch = fetch;
          Object.defineProperty(exports, '__esModule', {
            value: true
          });
          return exports;
        })({});
      })(typeof self !== 'undefined' ? self : commonjsGlobal);
    });

    var meilisearch_umd = createCommonjsModule(function (module, exports) {
      (function (global, factory) {
        factory(exports, browserPolyfill) ;
      })(commonjsGlobal, function (exports) {
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

        /* global Reflect, Promise */

        var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
          };

          return extendStatics(d, b);
        };

        function __extends(d, b) {
          if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        }

        var __assign = function () {
          __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];

              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }

            return t;
          };

          return __assign.apply(this, arguments);
        };

        function __awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function (resolve) {
              resolve(value);
            });
          }

          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }

            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }

            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }

            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        }

        function __generator(thisArg, body) {
          var _ = {
            label: 0,
            sent: function () {
              if (t[0] & 1) throw t[1];
              return t[1];
            },
            trys: [],
            ops: []
          },
              f,
              y,
              t,
              g;
          return g = {
            next: verb(0),
            "throw": verb(1),
            "return": verb(2)
          }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
            return this;
          }), g;

          function verb(n) {
            return function (v) {
              return step([n, v]);
            };
          }

          function step(op) {
            if (f) throw new TypeError("Generator is already executing.");

            while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];

              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;

                case 4:
                  _.label++;
                  return {
                    value: op[1],
                    done: false
                  };

                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;

                case 7:
                  op = _.ops.pop();

                  _.trys.pop();

                  continue;

                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }

                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }

                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }

                  if (t && _.label < t[2]) {
                    _.label = t[2];

                    _.ops.push(op);

                    break;
                  }

                  if (t[2]) _.ops.pop();

                  _.trys.pop();

                  continue;
              }

              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }

            if (op[0] & 5) throw op[1];
            return {
              value: op[0] ? op[1] : void 0,
              done: true
            };
          }
        }

        var MeiliSearchCommunicationError =
        /** @class */
        function (_super) {
          __extends(MeiliSearchCommunicationError, _super);

          function MeiliSearchCommunicationError(message, body, url, stack) {
            var _this = this;

            var _a, _b, _c;

            _this = _super.call(this, message) || this;
            _this.name = 'MeiliSearchCommunicationError';
            _this.type = 'MeiliSearchCommunicationError';

            if (body instanceof Response) {
              _this.message = body.statusText;
              _this.statusCode = body.status;
            }

            if (body instanceof Error) {
              _this.errno = body.errno;
              _this.code = body.code;
            }

            if (stack) {
              _this.stack = stack;
              _this.stack = (_a = _this.stack) === null || _a === void 0 ? void 0 : _a.replace(/(TypeError|FetchError)/, _this.name);
              _this.stack = (_b = _this.stack) === null || _b === void 0 ? void 0 : _b.replace('Failed to fetch', "request to ".concat(url, " failed, reason: connect ECONNREFUSED"));
              _this.stack = (_c = _this.stack) === null || _c === void 0 ? void 0 : _c.replace('Not Found', "Not Found: ".concat(url));
            } else {
              if (Error.captureStackTrace) {
                Error.captureStackTrace(_this, MeiliSearchCommunicationError);
              }
            }

            return _this;
          }

          return MeiliSearchCommunicationError;
        }(Error);

        var MeiliSearchApiError =
        /** @class */
        function (_super) {
          __extends(class_1, _super);

          function class_1(error, status) {
            var _this = _super.call(this, error.message) || this;

            _this.name = 'MeiliSearchApiError';
            _this.code = error.code;
            _this.type = error.type;
            _this.link = error.link;
            _this.message = error.message;
            _this.httpStatus = status; // Make errors comparison possible. ex: error instanceof MeiliSearchApiError.

            Object.setPrototypeOf(_this, MeiliSearchApiError.prototype);

            if (Error.captureStackTrace) {
              Error.captureStackTrace(_this, MeiliSearchApiError);
            }

            return _this;
          }

          return class_1;
        }(Error);

        function httpResponseErrorHandler(response) {
          return __awaiter(this, void 0, void 0, function () {
            var err;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (!!response.ok) return [3
                  /*break*/
                  , 5];
                  err = void 0;
                  _a.label = 1;

                case 1:
                  _a.trys.push([1, 3,, 4]);

                  return [4
                  /*yield*/
                  , response.json()];

                case 2:
                  err = _a.sent();
                  return [3
                  /*break*/
                  , 4];

                case 3:
                  _a.sent();

                  throw new MeiliSearchCommunicationError(response.statusText, response, response.url);

                case 4:
                  throw new MeiliSearchApiError(err, response.status);

                case 5:
                  return [2
                  /*return*/
                  , response];
              }
            });
          });
        }

        function httpErrorHandler(response, stack, url) {
          if (response.type !== 'MeiliSearchApiError') {
            throw new MeiliSearchCommunicationError(response.message, response, url, stack);
          }

          throw response;
        }

        var MeiliSearchError =
        /** @class */
        function (_super) {
          __extends(MeiliSearchError, _super);

          function MeiliSearchError(message) {
            var _this = _super.call(this, message) || this;

            _this.name = 'MeiliSearchError';
            _this.type = 'MeiliSearchError';

            if (Error.captureStackTrace) {
              Error.captureStackTrace(_this, MeiliSearchError);
            }

            return _this;
          }

          return MeiliSearchError;
        }(Error);

        var MeiliSearchTimeOutError =
        /** @class */
        function (_super) {
          __extends(MeiliSearchTimeOutError, _super);

          function MeiliSearchTimeOutError(message) {
            var _this = _super.call(this, message) || this;

            _this.name = 'MeiliSearchTimeOutError';
            _this.type = _this.constructor.name;

            if (Error.captureStackTrace) {
              Error.captureStackTrace(_this, MeiliSearchTimeOutError);
            }

            return _this;
          }

          return MeiliSearchTimeOutError;
        }(Error);
        /**
         * Removes undefined entries from object
         */


        function removeUndefinedFromObject(obj) {
          return Object.entries(obj).reduce(function (acc, curEntry) {
            var key = curEntry[0],
                val = curEntry[1];
            if (val !== undefined) acc[key] = val;
            return acc;
          }, {});
        }

        function sleep(ms) {
          return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [4
                  /*yield*/
                  , new Promise(function (resolve) {
                    return setTimeout(resolve, ms);
                  })];

                case 1:
                  return [2
                  /*return*/
                  , _a.sent()];
              }
            });
          });
        }

        function addProtocolIfNotPresent(host) {
          if (!(host.startsWith('https://') || host.startsWith('http://'))) {
            return "http://".concat(host);
          }

          return host;
        }

        function addTrailingSlash(url) {
          if (!url.endsWith('/')) {
            url += '/';
          }

          return url;
        }

        function constructHostURL(host) {
          try {
            host = addProtocolIfNotPresent(host);
            host = addTrailingSlash(host);
            return host;
          } catch (e) {
            throw new MeiliSearchError('The provided host is not valid.');
          }
        }

        var HttpRequests =
        /** @class */
        function () {
          function HttpRequests(config) {
            this.headers = Object.assign({}, config.headers || {}); // assign to avoid referencing

            this.headers['Content-Type'] = 'application/json';

            if (config.apiKey) {
              this.headers['Authorization'] = "Bearer ".concat(config.apiKey);
            }

            try {
              var host = constructHostURL(config.host);
              this.url = new URL(host);
            } catch (e) {
              throw new MeiliSearchError('The provided host is not valid.');
            }
          }

          HttpRequests.prototype.request = function (_a) {
            var method = _a.method,
                url = _a.url,
                params = _a.params,
                body = _a.body,
                config = _a.config;
            return __awaiter(this, void 0, void 0, function () {
              var constructURL, queryParams_1, response, parsedBody, parsedJson, e_1, stack;
              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    constructURL = new URL(url, this.url);

                    if (params) {
                      queryParams_1 = new URLSearchParams();
                      Object.keys(params).filter(function (x) {
                        return params[x] !== null;
                      }).map(function (x) {
                        return queryParams_1.set(x, params[x]);
                      });
                      constructURL.search = queryParams_1.toString();
                    }

                    _b.label = 1;

                  case 1:
                    _b.trys.push([1, 4,, 5]);

                    return [4
                    /*yield*/
                    , fetch(constructURL.toString(), __assign(__assign({}, config), {
                      method: method,
                      body: JSON.stringify(body),
                      headers: this.headers
                    })).then(function (res) {
                      return httpResponseErrorHandler(res);
                    })];

                  case 2:
                    response = _b.sent();
                    return [4
                    /*yield*/
                    , response.text()];

                  case 3:
                    parsedBody = _b.sent();

                    try {
                      parsedJson = JSON.parse(parsedBody);
                      return [2
                      /*return*/
                      , parsedJson];
                    } catch (_) {
                      return [2
                      /*return*/
                      ];
                    }

                    return [3
                    /*break*/
                    , 5];

                  case 4:
                    e_1 = _b.sent();
                    stack = e_1.stack;
                    httpErrorHandler(e_1, stack, constructURL.toString());
                    return [3
                    /*break*/
                    , 5];

                  case 5:
                    return [2
                    /*return*/
                    ];
                }
              });
            });
          };

          HttpRequests.prototype.get = function (url, params, config) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.request({
                      method: 'GET',
                      url: url,
                      params: params,
                      config: config
                    })];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };

          HttpRequests.prototype.post = function (url, data, params, config) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.request({
                      method: 'POST',
                      url: url,
                      body: data,
                      params: params,
                      config: config
                    })];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };

          HttpRequests.prototype.put = function (url, data, params, config) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.request({
                      method: 'PUT',
                      url: url,
                      body: data,
                      params: params,
                      config: config
                    })];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };

          HttpRequests.prototype.patch = function (url, data, params, config) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.request({
                      method: 'PATCH',
                      url: url,
                      body: data,
                      params: params,
                      config: config
                    })];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };

          HttpRequests.prototype["delete"] = function (url, data, params, config) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.request({
                      method: 'DELETE',
                      url: url,
                      body: data,
                      params: params,
                      config: config
                    })];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };

          return HttpRequests;
        }();

        var TaskClient =
        /** @class */
        function () {
          function TaskClient(config) {
            this.httpRequest = new HttpRequests(config);
          }

          TaskClient.prototype.getClientTask = function (uid) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "tasks/".concat(uid);
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };

          TaskClient.prototype.getClientTasks = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "tasks";
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };

          TaskClient.prototype.getIndexTask = function (indexUid, taskId) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(indexUid, "/tasks/").concat(taskId);
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };

          TaskClient.prototype.getIndexTasks = function (indexUid) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(indexUid, "/tasks");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Wait for a task to be processed.
           *
           * @param {number} uid Task identifier
           * @param {WaitOptions} options Additional configuration options
           * @returns {Promise<Task>} Promise returning a task after it has been processed
           */


          TaskClient.prototype.waitForClientTask = function (taskId, _a) {
            var _b = _a === void 0 ? {} : _a,
                _c = _b.timeOutMs,
                timeOutMs = _c === void 0 ? 5000 : _c,
                _d = _b.intervalMs,
                intervalMs = _d === void 0 ? 50 : _d;

            return __awaiter(this, void 0, void 0, function () {
              var startingTime, response;
              return __generator(this, function (_e) {
                switch (_e.label) {
                  case 0:
                    startingTime = Date.now();
                    _e.label = 1;

                  case 1:
                    if (!(Date.now() - startingTime < timeOutMs)) return [3
                    /*break*/
                    , 4];
                    return [4
                    /*yield*/
                    , this.getClientTask(taskId)];

                  case 2:
                    response = _e.sent();
                    if (!["enqueued"
                    /* TASK_ENQUEUED */
                    , "processing"
                    /* TASK_PROCESSING */
                    ].includes(response.status)) return [2
                    /*return*/
                    , response];
                    return [4
                    /*yield*/
                    , sleep(intervalMs)];

                  case 3:
                    _e.sent();

                    return [3
                    /*break*/
                    , 1];

                  case 4:
                    throw new MeiliSearchTimeOutError("timeout of ".concat(timeOutMs, "ms has exceeded on process ").concat(taskId, " when waiting a task to be resolved."));
                }
              });
            });
          };
          /**
           * Waits for multiple tasks to be processed
           *
           * @param {number} taskIds Tasks identifier list
           * @param {WaitOptions} options Wait options
           * @returns {Promise<Result<Task[]>>} Promise returning a list of tasks after they have been processed
           */


          TaskClient.prototype.waitForClientTasks = function (taskIds, _a) {
            var _b = _a === void 0 ? {} : _a,
                _c = _b.timeOutMs,
                timeOutMs = _c === void 0 ? 5000 : _c,
                _d = _b.intervalMs,
                intervalMs = _d === void 0 ? 50 : _d;

            return __awaiter(this, void 0, void 0, function () {
              var tasks, _i, taskIds_1, taskId, task;

              return __generator(this, function (_e) {
                switch (_e.label) {
                  case 0:
                    tasks = [];
                    _i = 0, taskIds_1 = taskIds;
                    _e.label = 1;

                  case 1:
                    if (!(_i < taskIds_1.length)) return [3
                    /*break*/
                    , 4];
                    taskId = taskIds_1[_i];
                    return [4
                    /*yield*/
                    , this.waitForClientTask(taskId, {
                      timeOutMs: timeOutMs,
                      intervalMs: intervalMs
                    })];

                  case 2:
                    task = _e.sent();
                    tasks.push(task);
                    _e.label = 3;

                  case 3:
                    _i++;
                    return [3
                    /*break*/
                    , 1];

                  case 4:
                    return [2
                    /*return*/
                    , {
                      results: tasks
                    }];
                }
              });
            });
          };
          /**
           * Waits for a task to be processed
           *
           * @param {number} taskId Task identifier
           * @param {WaitOptions} options Wait options
           * @returns {Promise<Task>} Promise returning a task after it has been processed
           */


          TaskClient.prototype.waitForIndexTask = function (indexUid, taskId, _a) {
            var _b = _a === void 0 ? {} : _a,
                _c = _b.timeOutMs,
                timeOutMs = _c === void 0 ? 5000 : _c,
                _d = _b.intervalMs,
                intervalMs = _d === void 0 ? 50 : _d;

            return __awaiter(this, void 0, void 0, function () {
              var startingTime, response;
              return __generator(this, function (_e) {
                switch (_e.label) {
                  case 0:
                    startingTime = Date.now();
                    _e.label = 1;

                  case 1:
                    if (!(Date.now() - startingTime < timeOutMs)) return [3
                    /*break*/
                    , 4];
                    return [4
                    /*yield*/
                    , this.getIndexTask(indexUid, taskId)];

                  case 2:
                    response = _e.sent();
                    if (!["enqueued"
                    /* TASK_ENQUEUED */
                    , "processing"
                    /* TASK_PROCESSING */
                    ].includes(response.status)) return [2
                    /*return*/
                    , response];
                    return [4
                    /*yield*/
                    , sleep(intervalMs)];

                  case 3:
                    _e.sent();

                    return [3
                    /*break*/
                    , 1];

                  case 4:
                    throw new MeiliSearchTimeOutError("timeout of ".concat(timeOutMs, "ms has exceeded on process ").concat(taskId, " when waiting for pending update to resolve."));
                }
              });
            });
          };

          return TaskClient;
        }();
        /*
         * Bundle: MeiliSearch / Indexes
         * Project: MeiliSearch - Javascript API
         * Author: Quentin de Quelen <quentin@meilisearch.com>
         * Copyright: 2019, MeiliSearch
         */


        var Index =
        /** @class */
        function () {
          /**
           * @param {Config} config Request configuration options
           * @param {string} uid UID of the index
           * @param {string} primaryKey? Primary Key of the index
           */
          function Index(config, uid, primaryKey) {
            this.uid = uid;
            this.primaryKey = primaryKey;
            this.httpRequest = new HttpRequests(config);
            this.tasks = new TaskClient(config);
          } ///
          /// SEARCH
          ///

          /**
           * Search for documents into an index
           * @memberof Index
           * @method search
           * @template T
           * @param {string | null} query? Query string
           * @param {SearchParams} options? Search options
           * @param {Partial<Request>} config? Additional request configuration options
           * @returns {Promise<SearchResponse<T>>} Promise containing the search response
           */


          Index.prototype.search = function (query, options, config) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/search");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, removeUndefinedFromObject(__assign(__assign({}, options), {
                      q: query
                    })), undefined, config)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Search for documents into an index using the GET method
           * @memberof Index
           * @method search
           * @template T
           * @param {string | null} query? Query string
           * @param {SearchParams} options? Search options
           * @param {Partial<Request>} config? Additional request configuration options
           * @returns {Promise<SearchResponse<T>>} Promise containing the search response
           */


          Index.prototype.searchGet = function (query, options, config) {
            var _a, _b, _c, _d, _e;

            return __awaiter(this, void 0, void 0, function () {
              var url, parseFilter, getParams;
              return __generator(this, function (_f) {
                switch (_f.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/search");

                    parseFilter = function parseFilter(filter) {
                      if (typeof filter === 'string') return filter;else if (Array.isArray(filter)) throw new MeiliSearchError('The filter query parameter should be in string format when using searchGet');else return undefined;
                    };

                    getParams = __assign(__assign({
                      q: query
                    }, options), {
                      filter: parseFilter(options === null || options === void 0 ? void 0 : options.filter),
                      sort: (_a = options === null || options === void 0 ? void 0 : options.sort) === null || _a === void 0 ? void 0 : _a.join(','),
                      facetsDistribution: (_b = options === null || options === void 0 ? void 0 : options.facetsDistribution) === null || _b === void 0 ? void 0 : _b.join(','),
                      attributesToRetrieve: (_c = options === null || options === void 0 ? void 0 : options.attributesToRetrieve) === null || _c === void 0 ? void 0 : _c.join(','),
                      attributesToCrop: (_d = options === null || options === void 0 ? void 0 : options.attributesToCrop) === null || _d === void 0 ? void 0 : _d.join(','),
                      attributesToHighlight: (_e = options === null || options === void 0 ? void 0 : options.attributesToHighlight) === null || _e === void 0 ? void 0 : _e.join(',')
                    });
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url, removeUndefinedFromObject(getParams), config)];

                  case 1:
                    return [2
                    /*return*/
                    , _f.sent()];
                }
              });
            });
          }; ///
          /// INDEX
          ///

          /**
           * Get index information.
           * @memberof Index
           * @method getRawInfo
           * @returns {Promise<IndexResponse>} Promise containing index information
           */


          Index.prototype.getRawInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url, res;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid);
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    res = _a.sent();
                    this.primaryKey = res.primaryKey;
                    return [2
                    /*return*/
                    , res];
                }
              });
            });
          };
          /**
           * Fetch and update Index information.
           * @memberof Index
           * @method fetchInfo
           * @returns {Promise<this>} Promise to the current Index object with updated information
           */


          Index.prototype.fetchInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.getRawInfo()];

                  case 1:
                    _a.sent();

                    return [2
                    /*return*/
                    , this];
                }
              });
            });
          };
          /**
           * Get Primary Key.
           * @memberof Index
           * @method fetchPrimaryKey
           * @returns {Promise<string | undefined>} Promise containing the Primary Key of the index
           */


          Index.prototype.fetchPrimaryKey = function () {
            return __awaiter(this, void 0, void 0, function () {
              var _a;

              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    _a = this;
                    return [4
                    /*yield*/
                    , this.getRawInfo()];

                  case 1:
                    _a.primaryKey = _b.sent().primaryKey;
                    return [2
                    /*return*/
                    , this.primaryKey];
                }
              });
            });
          };
          /**
           * Create an index.
           * @memberof Index
           * @method create
           * @template T
           * @param {string} uid Unique identifier of the Index
           * @param {IndexOptions} options Index options
           * @param {Config} config Request configuration options
           * @returns {Promise<Index<T>>} Newly created Index object
           */


          Index.create = function (uid, options, config) {
            if (options === void 0) {
              options = {};
            }

            return __awaiter(this, void 0, void 0, function () {
              var url, req;
              return __generator(this, function (_a) {
                url = "indexes";
                req = new HttpRequests(config);
                return [2
                /*return*/
                , req.post(url, __assign(__assign({}, options), {
                  uid: uid
                }))];
              });
            });
          };
          /**
           * Update an index.
           * @memberof Index
           * @method update
           * @param {IndexOptions} data Data to update
           * @returns {Promise<this>} Promise to the current Index object with updated information
           */


          Index.prototype.update = function (data) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid);
                    return [4
                    /*yield*/
                    , this.httpRequest.put(url, data)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Delete an index.
           * @memberof Index
           * @method delete
           * @returns {Promise<void>} Promise which resolves when index is deleted successfully
           */


          Index.prototype["delete"] = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid);
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// TASKS
          ///

          /**
           * Get the list of all the index tasks.
           *
           * @memberof Indexes
           * @method getTasks
           *
           * @returns {Promise<Result<Task[]>>} - Promise containing all tasks
           */


          Index.prototype.getTasks = function () {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.tasks.getIndexTasks(this.uid)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Get one task of the index.
           *
           * @memberof Indexes
           * @method getTask
           * @param {number} taskId - Task identifier
           *
           * @returns {Promise<Task>} - Promise containing a task
           */


          Index.prototype.getTask = function (taskId) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.tasks.getIndexTask(this.uid, taskId)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Wait for a batch of an index tasks to be processed.
           *
           * @memberof Indexes
           * @method waitForTasks
           * @param {number[]} taskIds - Tasks identifier
           * @param {WaitOptions} waitOptions - Options on timeout and interval
           *
           * @returns {Promise<Result<Task[]>>} - Promise containing an array of tasks
           */


          Index.prototype.waitForTasks = function (taskIds, _a) {
            var _b = _a === void 0 ? {} : _a,
                _c = _b.timeOutMs,
                timeOutMs = _c === void 0 ? 5000 : _c,
                _d = _b.intervalMs,
                intervalMs = _d === void 0 ? 50 : _d;

            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_e) {
                switch (_e.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.tasks.waitForClientTasks(taskIds, {
                      timeOutMs: timeOutMs,
                      intervalMs: intervalMs
                    })];

                  case 1:
                    return [2
                    /*return*/
                    , _e.sent()];
                }
              });
            });
          };
          /**
           * Wait for an index task to be processed.
           *
           * @memberof Indexes
           * @method waitForTask
           * @param {number} taskId - Task identifier
           * @param {WaitOptions} waitOptions - Options on timeout and interval
           *
           * @returns {Promise<Task>} - Promise containing an array of tasks
           */


          Index.prototype.waitForTask = function (taskId, _a) {
            var _b = _a === void 0 ? {} : _a,
                _c = _b.timeOutMs,
                timeOutMs = _c === void 0 ? 5000 : _c,
                _d = _b.intervalMs,
                intervalMs = _d === void 0 ? 50 : _d;

            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_e) {
                switch (_e.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.tasks.waitForClientTask(taskId, {
                      timeOutMs: timeOutMs,
                      intervalMs: intervalMs
                    })];

                  case 1:
                    return [2
                    /*return*/
                    , _e.sent()];
                }
              });
            });
          }; ///
          /// STATS
          ///

          /**
           * get stats of an index
           * @memberof Index
           * @method getStats
           * @returns {Promise<IndexStats>} Promise containing object with stats of the index
           */


          Index.prototype.getStats = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/stats");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// DOCUMENTS
          ///

          /**
           * get documents of an index
           * @memberof Index
           * @method getDocuments
           * @template T
           * @param {GetDocumentsParams<T>} options? Options to browse the documents
           * @returns {Promise<GetDocumentsResponse<T>>} Promise containing Document responses
           */


          Index.prototype.getDocuments = function (options) {
            return __awaiter(this, void 0, void 0, function () {
              var url, attr;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/documents");

                    if (options !== undefined && Array.isArray(options.attributesToRetrieve)) {
                      attr = options.attributesToRetrieve.join(',');
                    }

                    return [4
                    /*yield*/
                    , this.httpRequest.get(url, __assign(__assign({}, options), attr !== undefined ? {
                      attributesToRetrieve: attr
                    } : {}))];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Get one document
           * @memberof Index
           * @method getDocument
           * @template T
           * @param {string | number} documentId Document ID
           * @returns {Promise<Document<T>>} Promise containing Document response
           */


          Index.prototype.getDocument = function (documentId) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/documents/").concat(documentId);
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Add or replace multiples documents to an index
           * @memberof Index
           * @method addDocuments
           * @template T
           * @param {Array<Document<T>>} documents Array of Document objects to add/replace
           * @param {AddDocumentParams} options? Query parameters
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.addDocuments = function (documents, options) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/documents");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, documents, options)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Add or replace multiples documents to an index in batches
           * @memberof Index
           * @method addDocumentsInBatches
           * @template T
           * @param {Array<Document<T>>} documents Array of Document objects to add/replace
           * @param {number} batchSize Size of the batch
           * @param {AddDocumentParams} options? Query parameters
           * @returns {Promise<EnqueuedTasks>} Promise containing array of enqueued update objects for each batch
           */


          Index.prototype.addDocumentsInBatches = function (documents, batchSize, options) {
            if (batchSize === void 0) {
              batchSize = 1000;
            }

            return __awaiter(this, void 0, void 0, function () {
              var updates, i, _a, _b;

              return __generator(this, function (_c) {
                switch (_c.label) {
                  case 0:
                    updates = [];
                    i = 0;
                    _c.label = 1;

                  case 1:
                    if (!(i < documents.length)) return [3
                    /*break*/
                    , 4];
                    _b = (_a = updates).push;
                    return [4
                    /*yield*/
                    , this.addDocuments(documents.slice(i, i + batchSize), options)];

                  case 2:
                    _b.apply(_a, [_c.sent()]);

                    _c.label = 3;

                  case 3:
                    i += batchSize;
                    return [3
                    /*break*/
                    , 1];

                  case 4:
                    return [2
                    /*return*/
                    , updates];
                }
              });
            });
          };
          /**
           * Add or update multiples documents to an index
           * @memberof Index
           * @method updateDocuments
           * @param {Array<Document<Partial<T>>>} documents Array of Document objects to add/update
           * @param {AddDocumentParams} options? Query parameters
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.updateDocuments = function (documents, options) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/documents");
                    return [4
                    /*yield*/
                    , this.httpRequest.put(url, documents, options)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Add or update multiples documents to an index in batches
           * @memberof Index
           * @method updateDocuments
           * @template T
           * @param {Array<Document<T>>} documents Array of Document objects to add/update
           * @param {number} batchSize Size of the batch
           * @param {AddDocumentParams} options? Query parameters
           * @returns {Promise<EnqueuedTasks>} Promise containing array of enqueued update objects for each batch
           */


          Index.prototype.updateDocumentsInBatches = function (documents, batchSize, options) {
            if (batchSize === void 0) {
              batchSize = 1000;
            }

            return __awaiter(this, void 0, void 0, function () {
              var updates, i, _a, _b;

              return __generator(this, function (_c) {
                switch (_c.label) {
                  case 0:
                    updates = [];
                    i = 0;
                    _c.label = 1;

                  case 1:
                    if (!(i < documents.length)) return [3
                    /*break*/
                    , 4];
                    _b = (_a = updates).push;
                    return [4
                    /*yield*/
                    , this.updateDocuments(documents.slice(i, i + batchSize), options)];

                  case 2:
                    _b.apply(_a, [_c.sent()]);

                    _c.label = 3;

                  case 3:
                    i += batchSize;
                    return [3
                    /*break*/
                    , 1];

                  case 4:
                    return [2
                    /*return*/
                    , updates];
                }
              });
            });
          };
          /**
           * Delete one document
           * @memberof Index
           * @method deleteDocument
           * @param {string | number} documentId Id of Document to delete
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.deleteDocument = function (documentId) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/documents/").concat(documentId);
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Delete multiples documents of an index
           * @memberof Index
           * @method deleteDocuments
           * @param {string[] | number[]} documentsIds Array of Document Ids to delete
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.deleteDocuments = function (documentsIds) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/documents/delete-batch");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, documentsIds)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Delete all documents of an index
           * @memberof Index
           * @method deleteAllDocuments
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.deleteAllDocuments = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/documents");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// SETTINGS
          ///

          /**
           * Retrieve all settings
           * @memberof Index
           * @method getSettings
           * @returns {Promise<Settings>} Promise containing Settings object
           */


          Index.prototype.getSettings = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update all settings
           * Any parameters not provided will be left unchanged.
           * @memberof Index
           * @method updateSettings
           * @param {Settings} settings Object containing parameters with their updated values
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.updateSettings = function (settings) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, settings)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset settings.
           * @memberof Index
           * @method resetSettings
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.resetSettings = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// SYNONYMS
          ///

          /**
           * Get the list of all synonyms
           * @memberof Index
           * @method getSynonyms
           * @returns {Promise<object>} Promise containing object of synonym mappings
           */


          Index.prototype.getSynonyms = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/synonyms");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update the list of synonyms. Overwrite the old list.
           * @memberof Index
           * @method updateSynonyms
           * @param {Synonyms} synonyms Mapping of synonyms with their associated words
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.updateSynonyms = function (synonyms) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/synonyms");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, synonyms)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset the synonym list to be empty again
           * @memberof Index
           * @method resetSynonyms
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.resetSynonyms = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/synonyms");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// STOP WORDS
          ///

          /**
           * Get the list of all stop-words
           * @memberof Index
           * @method getStopWords
           * @returns {Promise<string[]>} Promise containing array of stop-words
           */


          Index.prototype.getStopWords = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/stop-words");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update the list of stop-words. Overwrite the old list.
           * @memberof Index
           * @method updateStopWords
           * @param {StopWords} stopWords Array of strings that contains the stop-words.
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.updateStopWords = function (stopWords) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/stop-words");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, stopWords)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset the stop-words list to be empty again
           * @memberof Index
           * @method resetStopWords
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.resetStopWords = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/stop-words");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// RANKING RULES
          ///

          /**
           * Get the list of all ranking-rules
           * @memberof Index
           * @method getRankingRules
           * @returns {Promise<string[]} Promise containing array of ranking-rules
           */


          Index.prototype.getRankingRules = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/ranking-rules");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update the list of ranking-rules. Overwrite the old list.
           * @memberof Index
           * @method updateRankingRules
           * @param {RankingRules} rankingRules Array that contain ranking rules sorted by order of importance.
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.updateRankingRules = function (rankingRules) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/ranking-rules");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, rankingRules)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset the ranking rules list to its default value
           * @memberof Index
           * @method resetRankingRules
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.resetRankingRules = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/ranking-rules");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// DISTINCT ATTRIBUTE
          ///

          /**
           * Get the distinct-attribute
           * @memberof Index
           * @method getDistinctAttribute
           * @returns {Promise<string | null>} Promise containing the distinct-attribute of the index
           */


          Index.prototype.getDistinctAttribute = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/distinct-attribute");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update the distinct-attribute.
           * @memberof Index
           * @method updateDistinctAttribute
           * @param {DistinctAttribute} distinctAttribute Field name of the distinct-attribute
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.updateDistinctAttribute = function (distinctAttribute) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/distinct-attribute");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, distinctAttribute)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset the distinct-attribute.
           * @memberof Index
           * @method resetDistinctAttribute
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.resetDistinctAttribute = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/distinct-attribute");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// FILTERABLE ATTRIBUTES
          ///

          /**
           * Get the filterable-attributes
           * @memberof Index
           * @method getFilterableAttributes
           * @returns {Promise<string[]>} Promise containing an array of filterable-attributes
           */


          Index.prototype.getFilterableAttributes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/filterable-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update the filterable-attributes.
           * @memberof Index
           * @method updateFilterableAttributes
           * @param {FilterableAttributes} filterableAttributes Array of strings containing the attributes that can be used as filters at query time
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.updateFilterableAttributes = function (filterableAttributes) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/filterable-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, filterableAttributes)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset the filterable-attributes.
           * @memberof Index
           * @method resetFilterableAttributes
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.resetFilterableAttributes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/filterable-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// SORTABLE ATTRIBUTES
          ///

          /**
           * Get the sortable-attributes
           * @memberof Index
           * @method getSortableAttributes
           * @returns {Promise<string[]>} Promise containing array of sortable-attributes
           */


          Index.prototype.getSortableAttributes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/sortable-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update the sortable-attributes.
           * @memberof Index
           * @method updateSortableAttributes
           * @param {SortableAttributes} sortableAttributes Array of strings containing the attributes that can be used to sort search results at query time
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.updateSortableAttributes = function (sortableAttributes) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/sortable-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, sortableAttributes)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset the sortable-attributes.
           * @memberof Index
           * @method resetSortableAttributes
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.resetSortableAttributes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/sortable-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// SEARCHABLE ATTRIBUTE
          ///

          /**
           * Get the searchable-attributes
           * @memberof Index
           * @method getSearchableAttributes
           * @returns {Promise<string[]>} Promise containing array of searchable-attributes
           */


          Index.prototype.getSearchableAttributes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/searchable-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update the searchable-attributes.
           * @memberof Index
           * @method updateSearchableAttributes
           * @param {SearchableAttributes} searchableAttributes Array of strings that contains searchable attributes sorted by order of importance(most to least important)
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.updateSearchableAttributes = function (searchableAttributes) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/searchable-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, searchableAttributes)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset the searchable-attributes.
           * @memberof Index
           * @method resetSearchableAttributes
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued task
           */


          Index.prototype.resetSearchableAttributes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/searchable-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// DISPLAYED ATTRIBUTE
          ///

          /**
           * Get the displayed-attributes
           * @memberof Index
           * @method getDisplayedAttributes
           * @returns {Promise<string[]>} Promise containing array of displayed-attributes
           */


          Index.prototype.getDisplayedAttributes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/displayed-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update the displayed-attributes.
           * @memberof Index
           * @method updateDisplayedAttributes
           * @param {DisplayedAttributes} displayedAttributes Array of strings that contains attributes of an index to display
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.updateDisplayedAttributes = function (displayedAttributes) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/displayed-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, displayedAttributes)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset the displayed-attributes.
           * @memberof Index
           * @method resetDisplayedAttributes
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.resetDisplayedAttributes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/displayed-attributes");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// TYPO TOLERANCE
          ///

          /**
           * Get the typo tolerance settings.
           * @memberof Index
           * @method getTypoTolerance
           * @returns {Promise<string[]>} Promise containing the typo tolerance settings.
           */


          Index.prototype.getTypoTolerance = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/typo-tolerance");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update the typo tolerance settings.
           * @memberof Index
           * @method updateTypoTolerance
           * @param {TypoTolerance} typoTolerance Object containing the custom typo tolerance settings.
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.updateTypoTolerance = function (typoTolerance) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/typo-tolerance");
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, typoTolerance)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Reset the typo tolerance settings.
           * @memberof Index
           * @method resetTypoTolerance
           * @returns {Promise<EnqueuedTask>} Promise containing object of the enqueued update
           */


          Index.prototype.resetTypoTolerance = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes/".concat(this.uid, "/settings/typo-tolerance");
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };

          return Index;
        }();
        /*
         * Bundle: MeiliSearch
         * Project: MeiliSearch - Javascript API
         * Author: Quentin de Quelen <quentin@meilisearch.com>
         * Copyright: 2019, MeiliSearch
         */


        var Client =
        /** @class */
        function () {
          /**
           * Creates new MeiliSearch instance
           * @param {Config} config Configuration object
           */
          function Client(config) {
            this.config = config;
            this.httpRequest = new HttpRequests(config);
            this.tasks = new TaskClient(config);
          }
          /**
           * Return an Index instance
           * @memberof MeiliSearch
           * @method index
           * @template T
           * @param {string} indexUid The index UID
           * @returns {Index<T>} Instance of Index
           */


          Client.prototype.index = function (indexUid) {
            return new Index(this.config, indexUid);
          };
          /**
           * Gather information about an index by calling MeiliSearch and
           * return an Index instance with the gathered information
           * @memberof MeiliSearch
           * @method getIndex
           * @template T
           * @param {string} indexUid The index UID
           * @returns {Promise<Index<T>>} Promise returning Index instance
           */


          Client.prototype.getIndex = function (indexUid) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                return [2
                /*return*/
                , new Index(this.config, indexUid).fetchInfo()];
              });
            });
          };
          /**
           * Gather information about an index by calling MeiliSearch and
           * return the raw JSON response
           * @memberof MeiliSearch
           * @method getRawIndex
           * @param {string} indexUid The index UID
           * @returns {Promise<IndexResponse>} Promise returning index information
           */


          Client.prototype.getRawIndex = function (indexUid) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                return [2
                /*return*/
                , new Index(this.config, indexUid).getRawInfo()];
              });
            });
          };
          /**
           * Get all the indexes as Index instances.
           * @memberof MeiliSearch
           * @method getIndexes
           * @returns {Promise<Index[]>} Promise returning array of raw index information
           */


          Client.prototype.getIndexes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var response, indexes;

              var _this = this;

              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.getRawIndexes()];

                  case 1:
                    response = _a.sent();
                    indexes = response.map(function (index) {
                      return new Index(_this.config, index.uid, index.primaryKey);
                    });
                    return [2
                    /*return*/
                    , indexes];
                }
              });
            });
          };
          /**
           * Get all the indexes in their raw value (no Index instances).
           * @memberof MeiliSearch
           * @method getRawIndexes
           * @returns {Promise<IndexResponse[]>} Promise returning array of raw index information
           */


          Client.prototype.getRawIndexes = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "indexes";
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Create a new index
           * @memberof MeiliSearch
           * @method createIndex
           * @template T
           * @param {string} uid The index UID
           * @param {IndexOptions} options Index options
           * @returns {Promise<Index<T>>} Promise returning Index instance
           */


          Client.prototype.createIndex = function (uid, options) {
            if (options === void 0) {
              options = {};
            }

            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , Index.create(uid, options, this.config)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update an index
           * @memberof MeiliSearch
           * @method updateIndex
           * @template T
           * @param {string} uid The index UID
           * @param {IndexOptions} options Index options to update
           * @returns {Promise<Index<T>>} Promise returning Index instance after updating
           */


          Client.prototype.updateIndex = function (uid, options) {
            if (options === void 0) {
              options = {};
            }

            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , new Index(this.config, uid).update(options)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Delete an index
           * @memberof MeiliSearch
           * @method deleteIndex
           * @param {string} uid The index UID
           * @returns {Promise<void>} Promise which resolves when index is deleted successfully
           */


          Client.prototype.deleteIndex = function (uid) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , new Index(this.config, uid)["delete"]()];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Deletes an index if it already exists.
           * @memberof MeiliSearch
           * @method deleteIndexIfExists
           * @param {string} uid The index UID
           * @returns {Promise<boolean>} Promise which resolves to true when index exists and is deleted successfully, otherwise false if it does not exist
           */


          Client.prototype.deleteIndexIfExists = function (uid) {
            return __awaiter(this, void 0, void 0, function () {
              var e_1;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    _a.trys.push([0, 2,, 3]);

                    return [4
                    /*yield*/
                    , this.deleteIndex(uid)];

                  case 1:
                    _a.sent();

                    return [2
                    /*return*/
                    , true];

                  case 2:
                    e_1 = _a.sent();

                    if (e_1.code === "index_not_found"
                    /* INDEX_NOT_FOUND */
                    ) {
                      return [2
                      /*return*/
                      , false];
                    }

                    throw e_1;

                  case 3:
                    return [2
                    /*return*/
                    ];
                }
              });
            });
          }; ///
          /// TASKS
          ///

          /**
           * Get the list of all client tasks
           * @memberof MeiliSearch
           * @method getTasks
           * @returns {Promise<Result<Task[]>>} - Promise returning all tasks
           */


          Client.prototype.getTasks = function () {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.tasks.getClientTasks()];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Get one task on the client scope
           * @memberof MeiliSearch
           * @method getTask
           * @param {number} taskId - Task identifier
           * @returns {Promise<Task>} - Promise returning a task
           */


          Client.prototype.getTask = function (taskId) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.tasks.getClientTask(taskId)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Wait for a batch of tasks to be processed.
           * @memberof MeiliSearch
           * @method waitForTasks
           * @param {number[]} taskIds - Tasks identifier
           * @param {WaitOptions} waitOptions - Options on timeout and interval
           *
           * @returns {Promise<Result<Task[]>>} - Promise returning an array of tasks
           */


          Client.prototype.waitForTasks = function (taskIds, _a) {
            var _b = _a === void 0 ? {} : _a,
                _c = _b.timeOutMs,
                timeOutMs = _c === void 0 ? 5000 : _c,
                _d = _b.intervalMs,
                intervalMs = _d === void 0 ? 50 : _d;

            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_e) {
                switch (_e.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.tasks.waitForClientTasks(taskIds, {
                      timeOutMs: timeOutMs,
                      intervalMs: intervalMs
                    })];

                  case 1:
                    return [2
                    /*return*/
                    , _e.sent()];
                }
              });
            });
          };
          /**
           * Wait for a task to be processed.
           *
           * @memberof MeiliSearch
           * @method waitForTask
           * @param {number} taskId - Task identifier
           * @param {WaitOptions} waitOptions - Options on timeout and interval
           *
           * @returns {Promise<Task>} - Promise returning an array of tasks
           */


          Client.prototype.waitForTask = function (taskId, _a) {
            var _b = _a === void 0 ? {} : _a,
                _c = _b.timeOutMs,
                timeOutMs = _c === void 0 ? 5000 : _c,
                _d = _b.intervalMs,
                intervalMs = _d === void 0 ? 50 : _d;

            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_e) {
                switch (_e.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , this.tasks.waitForClientTask(taskId, {
                      timeOutMs: timeOutMs,
                      intervalMs: intervalMs
                    })];

                  case 1:
                    return [2
                    /*return*/
                    , _e.sent()];
                }
              });
            });
          }; ///
          /// KEYS
          ///

          /**
           * Get all API keys
           * @memberof MeiliSearch
           * @method getKeys
           * @returns {Promise<Keys>} Promise returning an object with keys
           */


          Client.prototype.getKeys = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "keys";
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Get one API key
           * @memberof MeiliSearch
           * @method getKey
           *
           * @param {string} key - Key
           * @returns {Promise<Keys>} Promise returning a key
           */


          Client.prototype.getKey = function (key) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "keys/".concat(key);
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Create one API key
           * @memberof MeiliSearch
           * @method createKey
           *
           * @param {KeyPayload} options - Key options
           * @returns {Promise<Key>} Promise returning an object with keys
           */


          Client.prototype.createKey = function (options) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "keys";
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url, options)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Update one API key
           * @memberof MeiliSearch
           * @method updateKey
           *
           * @param {string} key - Key
           * @param {KeyPayload} options - Key options
           * @returns {Promise<Key>} Promise returning an object with keys
           */


          Client.prototype.updateKey = function (key, options) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "keys/".concat(key);
                    return [4
                    /*yield*/
                    , this.httpRequest.patch(url, options)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Delete one API key
           * @memberof MeiliSearch
           * @method deleteKey
           *
           * @param {string} key - Key
           * @returns {Promise<Void>}
           */


          Client.prototype.deleteKey = function (key) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "keys/".concat(key);
                    return [4
                    /*yield*/
                    , this.httpRequest["delete"](url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// HEALTH
          ///

          /**
           * Checks if the server is healthy, otherwise an error will be thrown.
           * @memberof MeiliSearch
           * @method health
           * @returns {Promise<Health>} Promise returning an object with health details
           */


          Client.prototype.health = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "health";
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Checks if the server is healthy, return true or false.
           * @memberof MeiliSearch
           * @method isHealthy
           * @returns {Promise<boolean>} Promise returning a boolean
           */


          Client.prototype.isHealthy = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    _a.trys.push([0, 2,, 3]);

                    url = "health";
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    _a.sent();

                    return [2
                    /*return*/
                    , true];

                  case 2:
                    _a.sent();

                    return [2
                    /*return*/
                    , false];

                  case 3:
                    return [2
                    /*return*/
                    ];
                }
              });
            });
          }; ///
          /// STATS
          ///

          /**
           * Get the stats of all the database
           * @memberof MeiliSearch
           * @method getStats
           * @returns {Promise<Stats>} Promise returning object of all the stats
           */


          Client.prototype.getStats = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "stats";
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// VERSION
          ///

          /**
           * Get the version of MeiliSearch
           * @memberof MeiliSearch
           * @method getVersion
           * @returns {Promise<Version>} Promise returning object with version details
           */


          Client.prototype.getVersion = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "version";
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          }; ///
          /// DUMPS
          ///

          /**
           * Triggers a dump creation process
           * @memberof MeiliSearch
           * @method createDump
           * @returns {Promise<EnqueuedDump>} Promise returning object of the enqueued update
           */


          Client.prototype.createDump = function () {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "dumps";
                    return [4
                    /*yield*/
                    , this.httpRequest.post(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Get the status of a dump creation process
           * @memberof MeiliSearch
           * @method getDumpStatus
           * @param {string} dumpUid Dump UID
           * @returns {Promise<EnqueuedDump>} Promise returning object of the enqueued update
           */


          Client.prototype.getDumpStatus = function (dumpUid) {
            return __awaiter(this, void 0, void 0, function () {
              var url;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    url = "dumps/".concat(dumpUid, "/status");
                    return [4
                    /*yield*/
                    , this.httpRequest.get(url)];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          };
          /**
           * Generate a tenant token
           *
           * @memberof MeiliSearch
           * @method generateTenantToken
           * @param {SearchRules} searchRules Search rules that are applied to every search.
           * @param {TokenOptions} options Token options to customize some aspect of the token.
           * @returns {String} The token in JWT format.
           */


          Client.prototype.generateTenantToken = function (_searchRules, _options) {
            var error = new Error();
            throw new Error("Meilisearch: failed to generate a tenant token. Generation of a token only works in a node environment \n ".concat(error.stack, "."));
          };

          return Client;
        }();

        var MeiliSearch =
        /** @class */
        function (_super) {
          __extends(MeiliSearch, _super);

          function MeiliSearch(config) {
            return _super.call(this, config) || this;
          }

          return MeiliSearch;
        }(Client);

        exports.HttpRequests = HttpRequests;
        exports.Index = Index;
        exports.MeiliSearch = MeiliSearch;
        exports.MeiliSearchApiError = MeiliSearchApiError;
        exports.MeiliSearchCommunicationError = MeiliSearchCommunicationError;
        exports.MeiliSearchError = MeiliSearchError;
        exports.MeiliSearchTimeOutError = MeiliSearchTimeOutError;
        exports.addProtocolIfNotPresent = addProtocolIfNotPresent;
        exports.addTrailingSlash = addTrailingSlash;
        exports["default"] = MeiliSearch;
        exports.httpErrorHandler = httpErrorHandler;
        exports.httpResponseErrorHandler = httpResponseErrorHandler;
        exports.removeUndefinedFromObject = removeUndefinedFromObject;
        exports.sleep = sleep;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    });

    var removeUndefined = function (arr) {
        return arr.filter(function (x) { return x !== undefined; });
    };

    /**
     * @param  {any} str
     * @returns {boolean}
     */
    /**
     * @param  {string} filter
     * @returns {string}
     */
    function replaceColonByEqualSign(filter) {
        // will only change first occurence of `:`
        return filter.replace(/:(.*)/i, '="$1"');
    }
    /**
     * @param  {any[]} arr
     * @returns {string}
     */
    function stringifyArray(arr) {
        return arr.reduce(function (acc, curr) {
            return (acc += JSON.stringify(curr));
        }, '');
    }

    /**
     * @param  {number} dividend
     * @param  {number} divisor
     * @returns number
     */
    function ceiledDivision(dividend, divisor) {
        if (divisor > 0) {
            var NumberPages = Math.ceil(dividend / divisor); // total number of pages rounded up to the next largest integer.
            return NumberPages;
        }
        return 0;
    }

    function isPureObject(data) {
        return typeof data === 'object' && !Array.isArray(data) && data !== null;
    }

    /**
     * @param  {string} filter
     */
    var adaptFilterSyntax = function (filter) {
        var matches = filter.match(/([^=]*)="?([^\\"]*)"?$/);
        if (matches) {
            matches[0]; var filterName = matches[1], value = matches[2];
            return [{ filterName: filterName, value: value }];
        }
        return [];
    };
    /**
     * @param  {Filter} filters?
     * @returns {Array}
     */
    function extractFilters(filters) {
        if (typeof filters === 'string') {
            return adaptFilterSyntax(filters);
        }
        else if (Array.isArray(filters)) {
            return filters
                .map(function (nestedFilter) {
                if (Array.isArray(nestedFilter)) {
                    return nestedFilter.map(function (filter) { return adaptFilterSyntax(filter); });
                }
                return adaptFilterSyntax(nestedFilter);
            })
                .flat(2);
        }
        return [];
    }
    /**
     * @param  {Filter} filters?
     * @returns {FacetsCache}
     */
    function getFacetsFromFilter(filters) {
        var extractedFilters = extractFilters(filters);
        var cleanFilters = removeUndefined(extractedFilters);
        return cleanFilters.reduce(function (cache, parsedFilter) {
            var _a;
            var filterName = parsedFilter.filterName, value = parsedFilter.value;
            var prevFields = cache[filterName] || [];
            cache = __assign(__assign({}, cache), (_a = {}, _a[filterName] = __spreadArray(__spreadArray([], prevFields, true), [value]), _a));
            return cache;
        }, {});
    }
    function getFacetsFromDefaultDistribution(facetsDistribution) {
        return Object.keys(facetsDistribution).reduce(function (cache, facet) {
            var _a;
            var facetValues = Object.keys(facetsDistribution[facet]);
            return __assign(__assign({}, cache), (_a = {}, _a[facet] = facetValues, _a));
        }, {});
    }
    /**
     * @param  {Filter} filters?
     * @returns {FacetsCache}
     */
    function extractFacets(searchContext, searchParams) {
        if (searchContext.keepZeroFacets) {
            return getFacetsFromDefaultDistribution(searchContext.defaultFacetDistribution);
        }
        else {
            return getFacetsFromFilter(searchParams === null || searchParams === void 0 ? void 0 : searchParams.filter);
        }
    }
    /**
     * Assign missing filters to facetsDistribution.
     * All facet passed as filter should appear in the facetsDistribution.
     * If not present, the facet is added with 0 as value.
     *
     *
     * @param  {FacetsCache} cache?
     * @param  {FacetsDistribution} distribution?
     * @returns {FacetsDistribution}
     */
    function addMissingFacets(cachedFacets, distribution) {
        distribution = distribution || {};
        // If cachedFacets contains something
        if (cachedFacets && Object.keys(cachedFacets).length > 0) {
            // for all filters in cached filters
            for (var cachedFacet in cachedFacets) {
                // if facet does not exist on returned distribution, add an empty object
                if (!distribution[cachedFacet])
                    distribution[cachedFacet] = {};
                // for all fields in every filter
                for (var _i = 0, _a = cachedFacets[cachedFacet]; _i < _a.length; _i++) {
                    var cachedField = _a[_i];
                    // if the field is not present in the returned distribution
                    // set it at 0
                    if (!Object.keys(distribution[cachedFacet]).includes(cachedField)) {
                        // add 0 value
                        distribution[cachedFacet][cachedField] = 0;
                    }
                }
            }
        }
        return distribution;
    }

    var emptySearch = {
        hits: [],
        query: '',
        facetsDistribution: {},
        limit: 0,
        offset: 0,
        exhaustiveNbHits: false,
        nbHits: 0,
        processingTimeMs: 0
    };
    /**
     * @param  {ResponseCacher} cache
     */
    function SearchResolver(cache) {
        return {
            /**
             * @param  {SearchContext} searchContext
             * @param  {MeiliSearchParams} searchParams
             * @param  {MeiliSearch} client
             * @returns {Promise}
             */
            searchResponse: function (searchContext, searchParams, client) {
                return __awaiter(this, void 0, void 0, function () {
                    var placeholderSearch, query, pagination, paginationCache, key, cachedResponse, facetsCache, searchResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                placeholderSearch = searchContext.placeholderSearch, query = searchContext.query;
                                // query can be: empty string, undefined or null
                                // all of them are falsy's
                                if (!placeholderSearch && !query) {
                                    return [2 /*return*/, emptySearch];
                                }
                                pagination = searchContext.pagination;
                                paginationCache = searchContext.finitePagination ? {} : pagination;
                                key = cache.formatKey([
                                    searchParams,
                                    searchContext.indexUid,
                                    searchContext.query,
                                    paginationCache,
                                ]);
                                cachedResponse = cache.getEntry(key);
                                // Check if specific request is already cached with its associated search response.
                                if (cachedResponse)
                                    return [2 /*return*/, cachedResponse];
                                facetsCache = extractFacets(searchContext, searchParams);
                                return [4 /*yield*/, client
                                        .index(searchContext.indexUid)
                                        .search(searchContext.query, searchParams)
                                    // Add missing facets back into facetsDistribution
                                ];
                            case 1:
                                searchResponse = _a.sent();
                                // Add missing facets back into facetsDistribution
                                searchResponse.facetsDistribution = addMissingFacets(facetsCache, searchResponse.facetsDistribution);
                                // Cache response
                                cache.setEntry(key, searchResponse);
                                return [2 /*return*/, searchResponse];
                        }
                    });
                });
            }
        };
    }

    /**
     * @param  {number} rad
     * @returns {number}
     */
    function rad2degr(rad) {
        return (rad * 180) / Math.PI;
    }
    /**
     * @param  {number} degr
     * @returns {number}
     */
    function degr2rad(degr) {
        return (degr * Math.PI) / 180;
    }
    /**
     * @param  {number} lat1
     * @param  {number} lng1
     * @param  {number} lat2
     * @param  {number} lng2
     * @returns {string}
     */
    function middleGeoPoints(lat1, lng1, lat2, lng2) {
        // convert to radians
        lat1 = degr2rad(lat1);
        lng1 = degr2rad(lng1);
        var x1 = Math.cos(lat1) * Math.cos(lng1);
        var y1 = Math.cos(lat1) * Math.sin(lng1);
        var z1 = Math.sin(lat1);
        // convert to radians
        lat2 = degr2rad(lat2);
        lng2 = degr2rad(lng2);
        var x2 = Math.cos(lat2) * Math.cos(lng2);
        var y2 = Math.cos(lat2) * Math.sin(lng2);
        var z2 = Math.sin(lat2);
        var x = x1 + x2;
        var y = y1 + y2;
        var z = z1 + z2;
        var Hyp = Math.sqrt(x * x + y * y);
        var lng3 = Math.atan2(y, x);
        var lat3 = Math.atan2(z, Hyp);
        if (lng1 < lng2 || (lng1 > lng2 && lng1 > Math.PI && lng2 < -Math.PI)) {
            lat3 = lat3 + Math.PI;
            lng3 = lng3 + Math.PI;
        }
        else {
            lat3 = rad2degr(lat3);
            lng3 = rad2degr(lng3);
        }
        if (Math.abs(x) < Math.pow(10, -9) &&
            Math.abs(y) < Math.pow(10, -9) &&
            Math.abs(z) < Math.pow(10, -9)) {
            lat3 = 0;
            lng3 = 0;
        }
        return "".concat(lat3, ",").concat(lng3);
    }
    /**
     * @param  {number} lat1
     * @param  {number} lng1
     * @param  {number} lat2
     * @param  {number} lng2
     * @returns {number}
     */
    function getDistanceInMeter(lat1, lng1, lat2, lng2) {
        // Haversine Algorithm
        var R = 6371e3; // metres
        var latRad1 = (lat1 * Math.PI) / 180;
        var latRad2 = (lat2 * Math.PI) / 180;
        var latCenterRad = ((lat2 - lat1) * Math.PI) / 180;
        var lngCenterRad = ((lng2 - lng1) * Math.PI) / 180;
        var a = Math.sin(latCenterRad / 2) * Math.sin(latCenterRad / 2) +
            Math.cos(latRad1) *
                Math.cos(latRad2) *
                Math.sin(lngCenterRad / 2) *
                Math.sin(lngCenterRad / 2);
        var bearing = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = R * bearing; // in metres
        return distance;
    }

    function adaptGeoPointsRules(geoSearchContext) {
        if (!geoSearchContext) {
            return undefined;
        }
        var insideBoundingBox = geoSearchContext.insideBoundingBox, aroundLatLng = geoSearchContext.aroundLatLng, aroundRadius = geoSearchContext.aroundRadius, minimumAroundRadius = geoSearchContext.minimumAroundRadius;
        var middlePoint;
        var radius;
        if (aroundLatLng) {
            middlePoint = aroundLatLng;
        }
        if (aroundRadius != null || minimumAroundRadius != null) {
            if (aroundRadius != null)
                radius = aroundRadius;
            else
                radius = minimumAroundRadius;
        }
        // If insideBoundingBox is provided it takes precedent over all other options
        if (insideBoundingBox && typeof insideBoundingBox === 'string') {
            var _a = insideBoundingBox.split(','), lat1Raw = _a[0], lng1Raw = _a[1], lat2Raw = _a[2], lng2Raw = _a[3];
            var _b = [
                parseFloat(lat1Raw),
                parseFloat(lng1Raw),
                parseFloat(lat2Raw),
                parseFloat(lng2Raw),
            ], lat1 = _b[0], lng1 = _b[1], lat2 = _b[2], lng2 = _b[3];
            radius = getDistanceInMeter(lat1, lng1, lat2, lng2) / 2;
            middlePoint = middleGeoPoints(lat1, lng1, lat2, lng2);
        }
        if (middlePoint != null && radius != null) {
            var _c = middlePoint.split(','), lat3 = _c[0], lng3 = _c[1];
            lat3 = Number.parseFloat(lat3).toFixed(5);
            lng3 = Number.parseFloat(lng3).toFixed(5);
            var filter = "_geoRadius(".concat(lat3, ", ").concat(lng3, ", ").concat(radius, ")");
            return { filter: filter };
        }
        return undefined;
    }
    function createGeoSearchContext(searchContext) {
        var geoContext = {};
        var aroundLatLng = searchContext.aroundLatLng, aroundLatLngViaIP = searchContext.aroundLatLngViaIP, aroundRadius = searchContext.aroundRadius, aroundPrecision = searchContext.aroundPrecision, minimumAroundRadius = searchContext.minimumAroundRadius, insideBoundingBox = searchContext.insideBoundingBox, insidePolygon = searchContext.insidePolygon;
        if (aroundLatLng) {
            geoContext.aroundLatLng = aroundLatLng;
        }
        if (aroundLatLngViaIP) {
            console.warn('instant-meilisearch: `aroundLatLngViaIP` is not supported.');
        }
        if (aroundRadius) {
            geoContext.aroundRadius = aroundRadius;
        }
        if (aroundPrecision) {
            console.warn("instant-meilisearch: `aroundPrecision` is not supported.\n    See this discussion to track its implementation https://github.com/meilisearch/product/discussions/264");
        }
        if (minimumAroundRadius) {
            geoContext.minimumAroundRadius = minimumAroundRadius;
        }
        if (insideBoundingBox) {
            geoContext.insideBoundingBox = insideBoundingBox;
        }
        // See related issue: https://github.com/meilisearch/instant-meilisearch/issues/555
        if (insidePolygon) {
            console.warn("instant-meilisearch: `insidePolygon` is not implented in instant-meilisearch.");
        }
        return geoContext;
    }

    /**
     * Transform InstantSearch filter to Meilisearch filter.
     * Change sign from `:` to `=` in nested filter object.
     * example: [`genres:comedy`] becomes [`genres=comedy`]
     *
     * @param  {SearchContext['facetFilters']} filters?
     * @returns {Filter}
     */
    function transformFilter(filters) {
        if (typeof filters === 'string') {
            return replaceColonByEqualSign(filters);
        }
        else if (Array.isArray(filters))
            return filters
                .map(function (filter) {
                if (Array.isArray(filter))
                    return filter
                        .map(function (nestedFilter) { return replaceColonByEqualSign(nestedFilter); })
                        .filter(function (elem) { return elem; });
                else {
                    return replaceColonByEqualSign(filter);
                }
            })
                .filter(function (elem) { return elem; });
        return [];
    }
    /**
     * Return the filter in an array if it is a string
     * If filter is array, return without change.
     *
     * @param  {Filter} filter
     * @returns {Array}
     */
    function filterToArray(filter) {
        // Filter is a string
        if (filter === '')
            return [];
        else if (typeof filter === 'string')
            return [filter];
        // Filter is either an array of strings, or an array of array of strings
        return filter;
    }
    /**
     * Merge facetFilters, numericFilters and filters together.
     *
     * @param  {Filter} facetFilters
     * @param  {Filter} numericFilters
     * @param  {string} filters
     * @returns {Filter}
     */
    function mergeFilters(facetFilters, numericFilters, filters) {
        var adaptedFilters = filters.trim();
        var adaptedFacetFilters = filterToArray(facetFilters);
        var adaptedNumericFilters = filterToArray(numericFilters);
        var adaptedFilter = __spreadArray(__spreadArray(__spreadArray([], adaptedFacetFilters, true), adaptedNumericFilters, true), [
            adaptedFilters,
        ]);
        var cleanedFilters = adaptedFilter.filter(function (filter) {
            if (Array.isArray(filter)) {
                return filter.length;
            }
            return filter;
        });
        return cleanedFilters;
    }
    /**
     * Adapt instantsearch.js filters to Meilisearch filters by
     * combining and transforming all provided filters.
     *
     * @param  {string|undefined} filters
     * @param  {SearchContext['numericFilters']} numericFilters
     * @param  {SearchContext['facetFilters']} facetFilters
     * @returns {Filter}
     */
    function adaptFilters(filters, numericFilters, facetFilters) {
        var transformedFilter = transformFilter(facetFilters || []);
        var transformedNumericFilter = transformFilter(numericFilters || []);
        return mergeFilters(transformedFilter, transformedNumericFilter, filters || '');
    }

    /**
     * Adapt search request from instantsearch.js
     * to search request compliant with Meilisearch
     *
     * @param  {SearchContext} searchContext
     * @returns {MeiliSearchParams}
     */
    function adaptSearchParams(searchContext) {
        // Creates search params object compliant with Meilisearch
        var meiliSearchParams = {};
        // Facets
        var facets = searchContext === null || searchContext === void 0 ? void 0 : searchContext.facets;
        if (facets === null || facets === void 0 ? void 0 : facets.length) {
            meiliSearchParams.facetsDistribution = facets;
        }
        // Attributes To Crop
        var attributesToCrop = searchContext === null || searchContext === void 0 ? void 0 : searchContext.attributesToSnippet;
        if (attributesToCrop) {
            meiliSearchParams.attributesToCrop = attributesToCrop;
        }
        // Attributes To Crop marker
        var cropMarker = searchContext === null || searchContext === void 0 ? void 0 : searchContext.snippetEllipsisText;
        if (cropMarker != null) {
            meiliSearchParams.cropMarker = cropMarker;
        }
        // Attributes To Retrieve
        var attributesToRetrieve = searchContext === null || searchContext === void 0 ? void 0 : searchContext.attributesToRetrieve;
        if (attributesToRetrieve) {
            meiliSearchParams.attributesToRetrieve = attributesToRetrieve;
        }
        // Filter
        var filter = adaptFilters(searchContext === null || searchContext === void 0 ? void 0 : searchContext.filters, searchContext === null || searchContext === void 0 ? void 0 : searchContext.numericFilters, searchContext === null || searchContext === void 0 ? void 0 : searchContext.facetFilters);
        if (filter.length) {
            meiliSearchParams.filter = filter;
        }
        // Attributes To Retrieve
        if (attributesToRetrieve) {
            meiliSearchParams.attributesToCrop = attributesToRetrieve;
        }
        // Attributes To Highlight
        meiliSearchParams.attributesToHighlight = (searchContext === null || searchContext === void 0 ? void 0 : searchContext.attributesToHighlight) || [
            '*',
        ];
        // Highlight pre tag
        var highlightPreTag = searchContext === null || searchContext === void 0 ? void 0 : searchContext.highlightPreTag;
        if (highlightPreTag) {
            meiliSearchParams.highlightPreTag = highlightPreTag;
        }
        else {
            meiliSearchParams.highlightPreTag = '__ais-highlight__';
        }
        // Highlight post tag
        var highlightPostTag = searchContext === null || searchContext === void 0 ? void 0 : searchContext.highlightPostTag;
        if (highlightPostTag) {
            meiliSearchParams.highlightPostTag = highlightPostTag;
        }
        else {
            meiliSearchParams.highlightPostTag = '__/ais-highlight__';
        }
        var placeholderSearch = searchContext.placeholderSearch;
        var query = searchContext.query;
        // Pagination
        var pagination = searchContext.pagination;
        // Limit based on pagination preferences
        if ((!placeholderSearch && query === '') ||
            pagination.paginationTotalHits === 0) {
            meiliSearchParams.limit = 0;
        }
        else if (searchContext.finitePagination) {
            meiliSearchParams.limit = pagination.paginationTotalHits;
        }
        else {
            var limit = (pagination.page + 1) * pagination.hitsPerPage + 1;
            // If the limit is bigger than the total hits accepted
            // force the limit to that amount
            if (limit > pagination.paginationTotalHits) {
                meiliSearchParams.limit = pagination.paginationTotalHits;
            }
            else {
                meiliSearchParams.limit = limit;
            }
        }
        var sort = searchContext.sort;
        // Sort
        if (sort === null || sort === void 0 ? void 0 : sort.length) {
            meiliSearchParams.sort = [sort];
        }
        var geoSearchContext = createGeoSearchContext(searchContext);
        var geoRules = adaptGeoPointsRules(geoSearchContext);
        if (geoRules === null || geoRules === void 0 ? void 0 : geoRules.filter) {
            if (meiliSearchParams.filter) {
                meiliSearchParams.filter.unshift(geoRules.filter);
            }
            else {
                meiliSearchParams.filter = [geoRules.filter];
            }
        }
        return meiliSearchParams;
    }

    /**
     * Slice the requested hits based on the pagination position.
     *
     * @param  {Record<string} hits
     * @param  {number} page
     * @param  {number} hitsPerPage
     * @returns {Array}
     */
    function adaptPagination(hits, page, hitsPerPage) {
        if (hitsPerPage < 0) {
            throw new TypeError('Value too small for "hitsPerPage" parameter, expected integer between 0 and 9223372036854775807');
        }
        var start = page * hitsPerPage;
        return hits.slice(start, start + hitsPerPage);
    }

    /**
     * Stringify values following instantsearch practices.
     *
     * @param  {any} value - value that needs to be stringified
     */
    function stringifyValue(value) {
        if (typeof value === 'string') {
            // String
            return value;
        }
        else if (value === undefined) {
            // undefined
            return JSON.stringify(null);
        }
        else {
            return JSON.stringify(value);
        }
    }
    /**
     * Recursif function wrap the deepest possible value
     * the following way: { value: "xx" }.
     *
     * For example:
     *
     * {
     * "rootField": { "value": "x" }
     * "nestedField": { child: { value: "y" } }
     * }
     *
     * recursivity continues until the value is not an array or an object.
     *
     * @param  {any} value - value of a field
     *
     * @returns Record<string, any>
     */
    function wrapValue(value) {
        if (Array.isArray(value)) {
            // Array
            return value.map(function (elem) { return wrapValue(elem); });
        }
        else if (isPureObject(value)) {
            // Object
            return Object.keys(value).reduce(function (nested, key) {
                nested[key] = wrapValue(value[key]);
                return nested;
            }, {});
        }
        else {
            return { value: stringifyValue(value) };
        }
    }
    /**
     * Adapt Meilisearch formatted fields to a format compliant to instantsearch.js.
     *
     * @param  {Record<string} formattedHit
     * @param  {SearchContext} searchContext
     * @returns {Record}
     */
    function adaptFormattedFields(hit) {
        if (!hit)
            return {};
        var _formattedResult = wrapValue(hit);
        var highlightedHit = {
            // We could not determine what the differences are between those two fields.
            _highlightResult: _formattedResult,
            _snippetResult: _formattedResult
        };
        return highlightedHit;
    }

    /**
     * @param  {any[]} hits
     * @returns {Array<Record<string, any>>}
     */
    function adaptGeoResponse(hits) {
        for (var i = 0; i < hits.length; i++) {
            if (hits[i]._geo) {
                hits[i]._geoloc = {
                    lat: hits[i]._geo.lat,
                    lng: hits[i]._geo.lng
                };
                hits[i].objectID = "".concat(i + Math.random() * 1000000);
                delete hits[i]._geo;
            }
        }
        return hits;
    }

    /**
     * @param  {Array<Record<string} hits
     * @param  {SearchContext} searchContext
     * @param  {PaginationContext} paginationContext
     * @returns {any}
     */
    function adaptHits(hits, searchContext, paginationContext) {
        var primaryKey = searchContext.primaryKey;
        var hitsPerPage = paginationContext.hitsPerPage, page = paginationContext.page;
        var paginatedHits = adaptPagination(hits, page, hitsPerPage);
        var adaptedHits = paginatedHits.map(function (hit) {
            // Creates Hit object compliant with InstantSearch
            if (Object.keys(hit).length > 0) {
                var formattedHit = hit._formatted; hit._matchesInfo; var documentFields = __rest(hit, ["_formatted", "_matchesInfo"]);
                var adaptedHit = Object.assign(documentFields, adaptFormattedFields(formattedHit));
                if (primaryKey) {
                    adaptedHit.objectID = hit[primaryKey];
                }
                return adaptedHit;
            }
            return hit;
        });
        adaptedHits = adaptGeoResponse(adaptedHits);
        return adaptedHits;
    }

    /**
     * Adapt search response from Meilisearch
     * to search response compliant with instantsearch.js
     *
     * @param  {MeiliSearchResponse<Record<string} searchResponse
     * @param  {SearchContext} searchContext
     * @param  {PaginationContext} paginationContext
     * @returns {{ results: Array<AlgoliaSearchResponse<T>> }}
     */
    function adaptSearchResponse(searchResponse, searchContext) {
        var searchResponseOptionals = {};
        var facets = searchResponse.facetsDistribution;
        var pagination = searchContext.pagination;
        var exhaustiveFacetsCount = searchResponse === null || searchResponse === void 0 ? void 0 : searchResponse.exhaustiveFacetsCount;
        if (exhaustiveFacetsCount) {
            searchResponseOptionals.exhaustiveFacetsCount = exhaustiveFacetsCount;
        }
        var nbPages = ceiledDivision(searchResponse.hits.length, pagination.hitsPerPage);
        var hits = adaptHits(searchResponse.hits, searchContext, pagination);
        var exhaustiveNbHits = searchResponse.exhaustiveNbHits;
        var nbHits = searchResponse.nbHits;
        var processingTimeMs = searchResponse.processingTimeMs;
        var query = searchResponse.query;
        var hitsPerPage = pagination.hitsPerPage, page = pagination.page;
        // Create response object compliant with InstantSearch
        var adaptedSearchResponse = __assign({ index: searchContext.indexUid, hitsPerPage: hitsPerPage, page: page, facets: facets, nbPages: nbPages, exhaustiveNbHits: exhaustiveNbHits, nbHits: nbHits, processingTimeMS: processingTimeMs, query: query, hits: hits, params: '' }, searchResponseOptionals);
        return {
            results: [adaptedSearchResponse]
        };
    }

    /**
     * @param  {AlgoliaMultipleQueriesQuery} searchRequest
     * @param  {Context} options
     * @returns {SearchContext}
     */
    function createPaginationContext(_a) {
        var paginationTotalHits = _a.paginationTotalHits, hitsPerPage = _a.hitsPerPage, page = _a.page;
        return {
            paginationTotalHits: paginationTotalHits != null ? paginationTotalHits : 200,
            hitsPerPage: hitsPerPage === undefined ? 20 : hitsPerPage,
            page: page || 0
        };
    }

    /**
     * @param  {AlgoliaMultipleQueriesQuery} searchRequest
     * @param  {Context} options
     * @returns {SearchContext}
     */
    function createSearchContext(searchRequest, options, defaultFacetDistribution) {
        // Split index name and possible sorting rules
        var _a = searchRequest.indexName.split(':'), indexUid = _a[0], sortByArray = _a.slice(1);
        var instantSearchParams = searchRequest.params;
        var pagination = createPaginationContext({
            paginationTotalHits: options.paginationTotalHits,
            hitsPerPage: instantSearchParams === null || instantSearchParams === void 0 ? void 0 : instantSearchParams.hitsPerPage,
            page: instantSearchParams === null || instantSearchParams === void 0 ? void 0 : instantSearchParams.page
        });
        var searchContext = __assign(__assign(__assign({}, options), instantSearchParams), { sort: sortByArray.join(':') || '', indexUid: indexUid, pagination: pagination, defaultFacetDistribution: defaultFacetDistribution, placeholderSearch: options.placeholderSearch !== false, keepZeroFacets: !!options.keepZeroFacets, finitePagination: !!options.finitePagination });
        return searchContext;
    }

    /**
     * @param  {Record<string} cache
     * @returns {SearchCache}
     */
    function SearchCache(cache) {
        if (cache === void 0) { cache = {}; }
        var searchCache = cache;
        return {
            getEntry: function (key) {
                if (searchCache[key]) {
                    try {
                        return JSON.parse(searchCache[key]);
                    }
                    catch (_) {
                        return searchCache[key];
                    }
                }
                return undefined;
            },
            formatKey: function (components) {
                return stringifyArray(components);
            },
            setEntry: function (key, searchResponse) {
                searchCache[key] = JSON.stringify(searchResponse);
            }
        };
    }

    function cacheFirstFacetsDistribution(defaultFacetDistribution, searchResponse) {
        if (searchResponse.query === '' &&
            Object.keys(defaultFacetDistribution).length === 0) {
            return searchResponse.facetsDistribution;
        }
        return defaultFacetDistribution;
    }

    /**
     * Instanciate SearchClient required by instantsearch.js.
     *
     * @param  {string} hostUrl
     * @param  {string} apiKey
     * @param  {InstantMeiliSearchOptions={}} meiliSearchOptions
     * @returns {InstantMeiliSearchInstance}
     */
    function instantMeiliSearch(hostUrl, apiKey, instantMeiliSearchOptions) {
        if (apiKey === void 0) { apiKey = ''; }
        if (instantMeiliSearchOptions === void 0) { instantMeiliSearchOptions = {}; }
        // create search resolver with included cache
        var searchResolver = SearchResolver(SearchCache());
        // paginationTotalHits can be 0 as it is a valid number
        var defaultFacetDistribution = {};
        var meilisearchClient = new meilisearch_umd.MeiliSearch({ host: hostUrl, apiKey: apiKey });
        return {
            /**
             * @param  {readonlyAlgoliaMultipleQueriesQuery[]} instantSearchRequests
             * @returns {Array}
             */
            search: function (instantSearchRequests) {
                return __awaiter(this, void 0, void 0, function () {
                    var searchRequest, searchContext, adaptedSearchRequest, searchResponse, adaptedSearchResponse, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                searchRequest = instantSearchRequests[0];
                                searchContext = createSearchContext(searchRequest, instantMeiliSearchOptions, defaultFacetDistribution);
                                adaptedSearchRequest = adaptSearchParams(searchContext);
                                return [4 /*yield*/, searchResolver.searchResponse(searchContext, adaptedSearchRequest, meilisearchClient)
                                    // Cache first facets distribution of the instantMeilisearch instance
                                    // Needed to add in the facetsDistribution the fields that were not returned
                                    // When the user sets `keepZeroFacets` to true.
                                ];
                            case 1:
                                searchResponse = _a.sent();
                                // Cache first facets distribution of the instantMeilisearch instance
                                // Needed to add in the facetsDistribution the fields that were not returned
                                // When the user sets `keepZeroFacets` to true.
                                defaultFacetDistribution = cacheFirstFacetsDistribution(defaultFacetDistribution, searchResponse);
                                adaptedSearchResponse = adaptSearchResponse(searchResponse, searchContext);
                                return [2 /*return*/, adaptedSearchResponse];
                            case 2:
                                e_1 = _a.sent();
                                console.error(e_1);
                                throw new Error(e_1);
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
            searchForFacetValues: function (_) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    reject(new Error('SearchForFacetValues is not compatible with Meilisearch'));
                                    resolve([]); // added here to avoid compilation error
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            }
        };
    }

    exports.instantMeiliSearch = instantMeiliSearch;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
