/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["public/assets/icons/card_icons/audio_folder_icon.svg","d5bd1cf1cac9185e26128fdfb58253bd"],["public/assets/icons/card_icons/audio_salmon_icon.svg","018dd5b9129c3a5a5d89f8ed68a44e71"],["public/assets/icons/card_icons/camera_salmon_icon.svg","a3de01cdc015bc8e4aae7be22f339c1b"],["public/assets/icons/card_icons/close.svg","ebb5848c9a47fd1b781d8d04f94dfd7c"],["public/assets/icons/card_icons/heart_icon_checked.svg","6c60e9b1da5ab164ff2183f3a39c3062"],["public/assets/icons/card_icons/heart_icon_unchecked.svg","a9952d29ad03817b8c90b9ed22a96397"],["public/assets/icons/card_icons/pencil_salmon_icon.svg","52070ab497f796b2f0a13e82417aecf3"],["public/assets/icons/card_icons/photo_folder_icon.svg","df37ef2e68eca35ebeac707a7480f2c7"],["public/assets/icons/menu/audio/audio_outline_icon_1.svg","0a586a33012eb7dac2a75bbd312c0b93"],["public/assets/icons/menu/audio/audio_outline_icon_2.svg","b074ac582dd2b00b55fffe1726ce1482"],["public/assets/icons/menu/notification/notification_glyph_icon_1.svg","2a2ab022ac288ce398890d852fafa5b8"],["public/assets/icons/menu/notification/notification_glyph_icon_2.svg","00c2239003eb0c9fa8a7e3e5aaa7895a"],["public/assets/icons/menu/notification/notification_outline_icon_1.svg","5b595c3385346a5008a3fdb8236dbbc7"],["public/assets/icons/menu/notification/notification_outline_icon_2.svg","dca0e2cc66e990e982b0982b1f16f43a"],["public/assets/icons/menu/settings/settings_glyph_icon_1.svg","88f0efa971f050f96c6844473def4131"],["public/assets/icons/menu/settings/settings_outline_icon_1.svg","71a88213a74dceb7537376cc4c595891"],["public/assets/icons/menu/settings/settings_outline_icon_2.svg","fff938a8a52e8248504ccbb3e5d38f28"],["public/assets/icons/menu/take_photo/camera_glyph_icon_1.svg","c64d168d6bf1567c9f8d66a8d84bacec"],["public/assets/icons/menu/take_photo/camera_glyph_icon_2.svg","be4b399617e9b1887d829edecca9cd52"],["public/assets/icons/menu/take_photo/camera_glyph_icon_3.svg","b2ab4248950140cfc71833d9c8c80972"],["public/assets/icons/menu/take_photo/camera_outline_icon.svg","83dbe10f3880fefb355e96366227ca76"],["public/assets/icons/menu/write/pencil_glyph_icon_1.svg","7f8f2b54a3e8d8d3ee84654a18a94993"],["public/assets/icons/menu/write/pencil_glyph_icon_2.svg","5d1d17a789c4a21ddab44f7172944f1d"],["public/assets/icons/menu/write/pencil_outline_icon_1.svg","e918e7d6ece1d7d786ae26e06e83d890"],["public/assets/icons/navigate/close_icon.svg","56e8f8d3e232d580c7402be15df9afc7"],["public/assets/icons/navigate/menu_icon.svg","12c980cef3bcb43838003aec1d8a86fd"],["public/assets/icons/top_bar/search_icon.svg","4c895ef08cebd9fc373a5ff0198071cd"],["public/assets/icons/top_bar/shuffle_icon.svg","10889b7bd12cb585c47eb7dcafef59f8"],["public/bundle.js","e2c94d28704824932d6ba48cec13bd35"],["public/index.html","aa867f25a787f6e15a40dc7ece7e7eca"],["public/main.css","23579d19ee8743894651c9381030a120"],["public/scripts/main.js","d8f57542ca14d334fbd3d54a564dc206"],["public/scripts/s3-uploads.js","4222ced1c59930cc8c11e4833209499b"],["public/scripts/sign-up.js","ccd66df844169c66df404ef7871ec53b"],["public/signup.html","32c38429ae0bdc6fc6d61bd9bd8a49ed"],["public/sw-precache-config.js","2c7c6c8afd3837f300e0cbfc66b755c3"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







