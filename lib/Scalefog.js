(function () {
    var Scalefog, encode, handleResponse, request, defaultHeaders;
    request = require('request');
    querystring = require('querystring');
    encode = encodeURIComponent;
    defaultHeaders = {};
    Scalefog = (function () {
        function Scalefog() {
            this.basehost = 'https://api.scalefog.com/';
        }
        Scalefog.prototype.request = function (method, path, body, cb) {
            var req;
            defaultHeaders['Content-Type'] = "application/x-www-form-urlencoded";
            req = {
                uri: this.basehost + encodeURI(path),
                method: method,
                body: querystring.stringify(body),
                headers: defaultHeaders
            };
            return request(req, handleResponse(cb));
        }
        Scalefog.prototype.get = function (path, cb) {
            return this.request("GET", path, null, cb);
        };
        Scalefog.prototype.post = function (path, body, cb) {
            return this.request("POST", path, body, cb);
        };
        Scalefog.prototype.del = function (path, body, cb) {
            return this.request("DELETE", path, body, cb);
        };
        Scalefog.prototype.register = function (username, password, email, cb) {
            var postdata;
            postdata = {
                username,
                password,
                email
            }
            return this.post("user/register", postdata, cb);
        }
        Scalefog.prototype.getToken = function (username, password, cb) {
            var postdata;
            postdata = {
                username,
                password
            }
            return this.post("user/gettoken", postdata, cb);
        }
        Scalefog.prototype.get_regions = function (cb) {
            return this.get("regions", cb);
        };
        Scalefog.prototype.getRsa = function (cb) {
            return this.get("user/keys", cb);
        };
        Scalefog.prototype.addRsa = function (key, cb) {
            var postdata;
            postdata = {
                sshkey: key

            }
            return this.post("user/addkey", postdata, cb);
        }
        Scalefog.prototype.deleteRsa = function (token, cb) {
            return this.del("user/key", {
                token
            });
        };
        Scalefog.prototype.getInstance = function (instance, cb) {
            return this.get("instances/" + instance, cb);
        }
        Scalefog.prototype.getInstances = function (cb) {
            return this.get("instances/", cb);
        }
        Scalefog.prototype.CreateInstance = function (appname, region = '', cb) {
            var postdata;
            postdata = {
                appname,
                region
            };
            return this.post("instances", postdata, cb);
        }
        Scalefog.prototype.DeleteInstance = function (appname, cb) {
            return this.del("instances/" + appname, null, cb);
        }
        Scalefog.prototype.setToken = function (token) {
            defaultHeaders['authorization'] = "Bearer " + token;
        }

        return Scalefog;
    })();

    handleResponse = function (cb) {
        var _this = this;
        return function (err, res, body) {
            var errCause, errCode, error, success;
            success = JSON.parse(body);
            cb(success);
        };
    };
    module.exports.scalefog = Scalefog;

}).call(this);